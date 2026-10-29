# AGU inventory runner

This Selenium runner checks the official AGU room browser for Dec 6–11, 2026. It records the Include Sold Out unchecked hotel list, reads each visible hotel dialog, excludes the separate government-rate table, and preserves failed hotels' saved records and timestamps.

The scheduled job runs every 30 minutes on the user's HQLX62 account. It commits only verified inventory to docs/inventory.json and waits for GitHub Pages to return the new run timestamp. The public site only renders the saved JSON; it is not the scraper. The page polls the saved JSON every 10 minutes. OTA price snapshots are not refreshed by this job.

The runner uses the user's existing GitHub SSH setup. No credentials belong in this source tree. Python dependencies are listed in requirements.txt.
