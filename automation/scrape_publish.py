#!/usr/bin/env python3
"""Read AGU's public hotel inventory UI and publish dated facts to GitHub Pages."""
from __future__ import annotations

import json
import logging
import os
import re
import subprocess
import sys
import time
from datetime import datetime
from decimal import Decimal
from logging.handlers import RotatingFileHandler
from pathlib import Path
from zoneinfo import ZoneInfo

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

ROOT = Path(__file__).resolve().parent
REPO = Path(os.environ.get("AGU_REPO_DIR", str(ROOT / "repo"))).expanduser()
DOCS = REPO / "docs"
INVENTORY = DOCS / "inventory.json"
CATALOG_FILE = REPO / "hotel_catalog.json"
LOG_DIR = Path(os.environ.get("AGU_LOG_DIR", str(ROOT / "logs"))).expanduser()
SOURCE_URL = (
    "https://registration.experientevent.com/ShowAGU261/Flow/SHOW/"
    "EmbeddedWidget/RoomBrowse#!/registrant//RoomBrowse/"
)
PAGES_INVENTORY = "https://chenya365.github.io/agu-2026-hotel-watch/inventory.json"
TARGET_DATES = [f"2026-12-{day:02d}" for day in range(6, 12)]
TARGET_DAYS = list(range(6, 12))
TZ = ZoneInfo("Asia/Hong_Kong")

LOG_DIR.mkdir(parents=True, exist_ok=True)
handler = RotatingFileHandler(LOG_DIR / "monitor.log", maxBytes=2_000_000, backupCount=4, encoding="utf-8")
logging.basicConfig(level=logging.INFO, handlers=[handler, logging.StreamHandler(sys.stdout)],
                    format="%(asctime)s HKT %(levelname)s %(message)s")
log = logging.getLogger("agu-monitor")


def stamp() -> str:
    return datetime.now(TZ).replace(microsecond=0).isoformat()


def run_git(*args: str, capture: bool = True) -> str:
    proc = subprocess.run(
        ["git", *args], cwd=REPO, text=True, encoding="utf-8",
        stdout=subprocess.PIPE if capture else subprocess.DEVNULL,
        stderr=subprocess.PIPE if capture else subprocess.STDOUT,
        timeout=180,
    )
    if proc.returncode:
        raise RuntimeError(f"git {' '.join(args[:2])} failed: {(proc.stderr or '')[-800:]}")
    return proc.stdout.strip() if capture else ""


def prepare_repo() -> None:
    if run_git("status", "--porcelain"):
        raise RuntimeError("repository has unexpected local changes; refusing to overwrite")
    run_git("fetch", "origin", "main")
    run_git("pull", "--rebase", "origin", "main")
    if not INVENTORY.is_file() or not CATALOG_FILE.is_file():
        raise RuntimeError("required inventory or catalog file is missing")


def parse_money(text: str) -> int | float | None:
    match = re.search(r"\$\s*([\d,]+(?:\.\d{1,2})?)", text)
    if not match:
        return None
    value = Decimal(match.group(1).replace(",", ""))
    return int(value) if value == value.to_integral_value() else float(value)


def reassess_recommendations(data: dict, assessed_at: str) -> None:
    """Refresh eligibility against actual same-room six-night availability, not review claims."""
    recommendations = data.get("recommendations")
    if not isinstance(recommendations, dict):
        raise RuntimeError("recommendation metadata is missing")
    ids = [hotel["id"] for hotel in data["hotels"]]
    order = recommendations.get("order", [])
    if len(order) != 44 or len(set(order)) != 44 or set(order) != set(ids):
        raise RuntimeError("recommendation order must retain all 44 catalog IDs")
    by_id = {hotel["id"]: hotel for hotel in data["hotels"]}
    names = {hotel["id"]: hotel["name"] for hotel in json.loads(CATALOG_FILE.read_text(encoding="utf-8"))}
    full = []
    for hotel_id in order:
        hotel = by_id[hotel_id]
        has_full_room = any(
            len(room.get("nights", [])) == 6
            and [night.get("day") for night in room["nights"]] == TARGET_DAYS
            and all(night.get("status") == "A" for night in room["nights"])
            for room in hotel.get("rooms", [])
        )
        if has_full_room:
            full.append(names[hotel_id])
    picks = ", ".join(full[:3]) if full else "暂无满足连续六晚的酒店"
    recommendations["assessedAt"] = assessed_at
    recommendations["summary"] = (
        f"本轮已按同一普通房型逐夜复核可订资格：{len(full)} 家满足 6 晚，现有排序中的优先候选为 {picks}。编辑排序沿用现有评价与舒适度证据，房态变化会影响可订资格但不自动改变酒店顺序。差评、评论日期及第三方报价仍按各自已标注的来源日期展示；本轮没有重新核查评论或 Trip.com 价格。周边安全提示另列官方资料日期，不代表酒店实时治安评级。"
    )


def read_hotel(driver: webdriver.Firefox, wait: WebDriverWait, expected_name: str) -> list[dict]:
    card = next(
        (x for x in driver.find_elements(By.CSS_SELECTOR, ".hotel-name")
         if x.is_displayed() and x.text.strip() == expected_name),
        None,
    )
    if card is None:
        raise RuntimeError("hotel is not visible in the official list")
    rates_button = card.find_element(By.XPATH, "ancestor::li[1]//button[@data-exl-facility-inventory]")
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", rates_button)
    rates_button.click()

    modal_selector = "div.reveal-modal"
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, modal_selector)))
    modal = driver.find_element(By.CSS_SELECTOR, modal_selector)
    wait.until(lambda d: modal.text.strip().splitlines()[0].strip() == expected_name)
    table_selector = "div.reveal-modal ul.room-rates-charts table.table.utility"
    wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, table_selector)) > 0)
    wait.until(lambda d: all(
        len(t.find_elements(By.CSS_SELECTOR, "time[datetime]")) >= 6
        for t in d.find_elements(By.CSS_SELECTOR, table_selector)
    ))

    rooms = []
    for table in driver.find_elements(By.CSS_SELECTOR, table_selector):
        room_name = table.find_element(By.TAG_NAME, "caption").text.strip()
        if not room_name or "government" in room_name.lower() or "per diem" in room_name.lower():
            continue
        nights = []
        for date_string in TARGET_DATES:
            times = table.find_elements(By.CSS_SELECTOR, f'time[datetime="{date_string}"]')
            if len(times) != 1:
                raise RuntimeError(f"{room_name}: expected one {date_string} rate row, found {len(times)}")
            row = times[0].find_element(By.XPATH, "ancestor::tr[1]")
            cell = row.find_element(By.TAG_NAME, "td")
            price = parse_money(cell.text)
            status_icons = cell.find_elements(By.CSS_SELECTOR, "span[data-tooltip]")
            tooltip = status_icons[0].get_attribute("data-tooltip").strip() if len(status_icons) == 1 else ""
            status = {"Available": "A", "Sold Out": "S", "Waitlisted": "W"}.get(tooltip, "U")
            if price is None or status == "U":
                raise RuntimeError(f"{room_name} {date_string}: price/status could not be verified")
            nights.append({"day": int(date_string[-2:]), "price": price, "status": status})
        if len(nights) == 6:
            rooms.append({"room": room_name, "nights": nights})
    if not rooms:
        raise RuntimeError("no ordinary room table with six verified nights")

    close_buttons = driver.find_elements(By.CSS_SELECTOR, "div.reveal-modal button.close-reveal-modal")
    if close_buttons:
        close_buttons[0].click()
        wait.until(EC.invisibility_of_element_located((By.CSS_SELECTOR, modal_selector)))
    else:
        driver.find_element(By.TAG_NAME, "body").send_keys("\u001b")
        wait.until(EC.invisibility_of_element_located((By.CSS_SELECTOR, modal_selector)))
    return rooms


def open_browser() -> webdriver.Firefox:
    options = Options()
    options.add_argument("-headless")
    options.page_load_strategy = "eager"
    service = Service(log_output=os.devnull)
    driver = webdriver.Firefox(options=options, service=service)
    driver.set_page_load_timeout(75)
    driver.set_window_size(1600, 1200)
    return driver


def collect() -> tuple[dict[str, list[dict]], list[str], list[str], str]:
    catalog = json.loads(CATALOG_FILE.read_text(encoding="utf-8"))
    by_name = {x["name"]: x["id"] for x in catalog}
    if len(by_name) != 44 or len({x["id"] for x in catalog}) != 44:
        raise RuntimeError("catalog must contain 44 unique hotels")

    driver = open_browser()
    results: dict[str, dict] = {}
    listed_ids: list[str] = []
    failures: list[str] = []
    try:
        driver.get(SOURCE_URL)
        wait = WebDriverWait(driver, 35)
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".hotel-name")) >= 40)
        checkbox = driver.find_element(By.ID, "chkbox-id")
        if checkbox.is_selected():
            checkbox.click()
            wait.until(lambda d: not d.find_element(By.ID, "chkbox-id").is_selected())
            time.sleep(1)

        visible_names = []
        for element in driver.find_elements(By.CSS_SELECTOR, ".hotel-name"):
            name = element.text.strip()
            if element.is_displayed() and name and name not in visible_names:
                visible_names.append(name)
        unknown = [name for name in visible_names if name not in by_name]
        if unknown:
            raise RuntimeError("official hotel names do not match catalog: " + ", ".join(unknown[:5]))
        listed_ids = [by_name[name] for name in visible_names]
        list_checked_at = stamp()
        limit = max(1, int(os.environ.get("AGU_LIMIT", "44")))
        names_to_check = visible_names[:limit]
        log.info("Official list observed with Include Sold Out=%s: %d hotels",
                 driver.find_element(By.ID, "chkbox-id").is_selected(), len(listed_ids))
        if limit < len(visible_names):
            log.info("Test-only hotel limit set to %d; no inventory will be published in dry-run mode.", limit)

        for index, name in enumerate(names_to_check, 1):
            hotel_id = by_name[name]
            try:
                rooms = read_hotel(driver, wait, name)
                results[hotel_id] = {"rooms": rooms, "checkedAt": stamp()}
                log.info("Verified %d/%d %s (%d ordinary room types)", index, len(visible_names), name, len(rooms))
            except (Exception) as exc:
                failures.append(name)
                log.exception("Failed to verify %s: %s", name, exc)
                # A browser-level error can leave an overlay open; recover before trying the next card.
                try:
                    for button in driver.find_elements(By.CSS_SELECTOR, "div.reveal-modal button.close-reveal-modal"):
                        if button.is_displayed():
                            button.click()
                    if driver.find_elements(By.CSS_SELECTOR, "div.reveal-modal"):
                        WebDriverWait(driver, 5).until(
                            EC.invisibility_of_element_located((By.CSS_SELECTOR, "div.reveal-modal"))
                        )
                except Exception:
                    try:
                        driver.quit()
                    except Exception:
                        pass
                    driver = open_browser()
                    driver.get(SOURCE_URL)
                    wait = WebDriverWait(driver, 35)
                    wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".hotel-name")) >= 40)
                    if driver.find_element(By.ID, "chkbox-id").is_selected():
                        driver.find_element(By.ID, "chkbox-id").click()
                        time.sleep(1)
    finally:
        driver.quit()
    return results, listed_ids, failures, list_checked_at


def update_snapshot(results: dict[str, dict], listed_ids: list[str],
                    failures: list[str], attempted_at: str, list_checked_at: str) -> dict:
    data = json.loads(INVENTORY.read_text(encoding="utf-8"))
    if len(data.get("hotels", [])) != 44:
        raise RuntimeError("saved inventory must retain all 44 hotel records")
    by_id = {h["id"]: h for h in data["hotels"]}
    for hotel_id, observation in results.items():
        by_id[hotel_id] = {"id": hotel_id, "checkedAt": observation["checkedAt"], "rooms": observation["rooms"]}
    data["hotels"] = [by_id[h["id"]] for h in data["hotels"]]
    data["lastAttemptAt"] = attempted_at
    if results:
        data["lastSuccessAt"] = max(x["checkedAt"] for x in results.values())
    data["checkedHotels"] = len(results)
    data["officialListedIds"] = listed_ids
    data["officialListedCount"] = len(listed_ids)
    data["officialListCheckedAt"] = list_checked_at
    if len(results) == 44 and len(listed_ids) == 44 and not failures:
        reassess_recommendations(data, attempted_at)
    data["schedule"] = "每 10 分钟（香港时间）"
    data["runner"] = "HQLX69 后台任务；网页只展示已发布结果"
    if len(results) == len(listed_ids) == 44 and not failures:
        data["monitor"] = "publishing"
        data["coverageNote"] = f"本轮已逐一核验 44/44 家；官方页 Include Sold Out 未勾选，实际列出 44 家。普通房型逐晚状态已核对，政府价与候补不计作有房。最近核验 {attempted_at}。"
    elif results:
        data["monitor"] = "partial"
        data["coverageNote"] = f"本轮实际成功核验 {len(results)}/44 家；官方未勾选 Include Sold Out 名单含 {len(listed_ids)} 家。失败酒店保留旧记录与旧核验时间：{', '.join(failures) if failures else '无'}。"
    else:
        data["monitor"] = "failed"
        data["coverageNote"] = f"本轮未成功核验任何酒店；已保留旧库存与核验时间。官方列表观测 {len(listed_ids)} 家。失败请查看服务器运行日志。"
    timestamps = [h.get("checkedAt") for h in data["hotels"] if h.get("checkedAt")]
    if timestamps:
        data["checkedAt"] = min(
            timestamps,
            key=lambda value: datetime.fromisoformat(value.replace("Z", "+00:00")),
        )
    INVENTORY.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return data


def commit_and_push() -> str:
    run_git("add", "docs/inventory.json")
    run_git("-c", "user.name=AGU Hotel Watch", "-c",
            "user.email=agu-hotel-watch@users.noreply.github.com",
            "commit", "-m", "Refresh verified AGU hotel inventory")
    run_git("push", "origin", "main", capture=True)
    return run_git("rev-parse", "HEAD")


def wait_pages(expected_attempt: str, expected_monitor: str | None = None,
               timeout: int = 180) -> bool:
    import urllib.request

    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            url = f"{PAGES_INVENTORY}?refresh={int(time.time())}"
            req = urllib.request.Request(url, headers={"Cache-Control": "no-cache"})
            with urllib.request.urlopen(req, timeout=20) as response:
                live = json.loads(response.read().decode("utf-8"))
            if live.get("lastAttemptAt") == expected_attempt and (
                expected_monitor is None or live.get("monitor") == expected_monitor
            ):
                return True
        except Exception as exc:
            log.info("Waiting for GitHub Pages read-back: %s", exc)
        time.sleep(8)
    return False


def publish_failure(attempted_at: str, message: str) -> None:
    try:
        prepare_repo()
        data = json.loads(INVENTORY.read_text(encoding="utf-8"))
        data["lastAttemptAt"] = attempted_at
        data["monitor"] = "failed"
        data["checkedHotels"] = 0
        data["schedule"] = "每 10 分钟（香港时间）"
        data["runner"] = "HQLX69 后台任务；网页只展示已发布结果"
        data["coverageNote"] = "本轮采集失败，旧房态与酒店核验时间未变更。"
        INVENTORY.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        commit_and_push()
        if wait_pages(attempted_at, "failed"):
            log.error("Failure status published and read back.")
        else:
            log.error("Failure status pushed, but Pages read-back was not confirmed.")
    except Exception:
        log.exception("Could not publish failure status; local logs retain the error.")


def main() -> int:
    attempt = stamp()
    try:
        prepare_repo()
        results, listed_ids, failures, list_checked_at = collect()
        if os.environ.get("AGU_DRY_RUN") == "1":
            log.info("Dry run completed: parsed %d hotel(s), %d listed names, failures=%d; nothing published.",
                     len(results), len(listed_ids), len(failures))
            return 0 if results else 1
        snapshot = update_snapshot(results, listed_ids, failures, attempt, list_checked_at)
        commit = commit_and_push()
        log.info("Pushed %s; this run verified %d/44 hotels.", commit, len(results))
        if not wait_pages(attempt):
            log.error("GitHub Pages did not return this run's snapshot within the wait window.")
            return 2
        log.info("GitHub Pages returned the saved run snapshot.")
        if len(results) == len(listed_ids) == 44 and not failures:
            snapshot["monitor"] = "active"
            snapshot["scheduleValidation"] = stamp()
            INVENTORY.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            commit = commit_and_push()
            log.info("Published verified 44/44 run as active: %s", commit)
            if not wait_pages(attempt, "active"):
                log.error("Active status read-back was not confirmed.")
                return 2
            log.info("Confirmed active status through the public Pages inventory.")
        return 0 if results else 1
    except Exception as exc:
        log.exception("Run failed: %s", exc)
        publish_failure(attempt, str(exc))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
