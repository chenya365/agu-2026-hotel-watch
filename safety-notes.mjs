// Safety editorial reviewed 2026-10-29. This is contextual guidance, not a hotel risk score.
export const safetyReviewedOn='2026-10-29';
export const safetyAreaNotes={
  "Financial District": {
    context: "旧金山市府 2023 居民调查将 Financial District / South Beach 列为居民安全感评分较低的区域之一。该调查反映居民主观感受，不是酒店门口的犯罪概率，也不是游客个体风险预测。",
    level: "需要留意路线与时段"
  },
  "South Beach": {
    context: "旧金山市府 2023 居民调查将 Financial District / South Beach 列为居民安全感评分较低的区域之一。该调查反映居民主观感受，不是酒店门口的犯罪概率，也不是游客个体风险预测。",
    level: "需要留意路线与时段"
  }
};

// These are dated first-hand reports already retained in review-notes.mjs.
// Do not treat an individual impression as verified crime data or a neighborhood-wide conclusion.
export const safetyGuestReports={
  "23": "2026 年 7 月 19 日的一条住客评论提到独自外出时对周边感到不安；这是个人感受，未核实为犯罪事件，也不能代表 SOMA 整体或当前情况。",
  "36": "2026 年 8 月 25 日评论提到因靠近 Tenderloin 而对周边有所顾虑；2025 年 4 月 6 日另有住客表示进出时不安。两者都是主观经历，不能据此给酒店或街区定性。",
  "41": "住客评论曾提及夜间街道声音及周边体验分歧；这是环境感受，不等于犯罪报告。选择房间时可同时考虑入口周边、街噪与晚间出行路线。"
};

export const safetySources=[
  ["SFPD 犯罪数据仪表板", "https://www.sanfranciscopolice.org/stay-safe/crime-data/crime-dashboard"],
  ["市府居民安全感调查（2023）", "https://www.sf.gov/data--city-survey-safety-and-policing"],
  ["San Francisco Travel 访客安全建议", "https://www.sftravel.com/meetings/article/tips-attendees"],
  ["San Francisco Travel 会展安全资源", "https://www.sftravel.com/meetings/san-franciscos-safety-security-measures-conventions-self-contained-groups"]
];
