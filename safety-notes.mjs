// Safety notes researched 2026-10-29. These are dated, individual guest impressions,
// not crime statistics, hotel audits, or predictions of current risk.
export const safetyReviewedOn='2026-10-29';
export const safetyAreaNotes={
  "Financial District": {
    context: "旧金山市府 2023 居民调查将 Financial District / South Beach 列为居民安全感评分较低的区域之一。调查记录居民主观感受，不是酒店门口的犯罪概率或游客个体风险预测。",
    level: "需要留意路线与时段"
  },
  "South Beach": {
    context: "旧金山市府 2023 居民调查将 Financial District / South Beach 列为居民安全感评分较低的区域之一。调查记录居民主观感受，不是酒店门口的犯罪概率或游客个体风险预测。",
    level: "需要留意路线与时段"
  }
};

// Only hotels with a specific safety/security-related guest comment found in the
// reviewed Tripadvisor material appear here. Keep this hotel-specific; do not
// infer a hotel's condition from nearby properties or city-level data.
export const safetyGuestReports={
  "1": {summary:"住客对夜间周边感受有分歧。", entries:[
    {date:"2026-07",text:"一位独行住客说夜间外出时感到不安；这是个人感受，并非犯罪记录。"},
    {date:"2026-02",text:"另一位住客称在酒店附近感到安全。两条体验并不一致。"}
  ]},
  "2": {summary:"有住客提及夜间街头喧闹；另有住客对步行感到安心。", entries:[
    {date:"2026-10",text:"一位独行住客称凌晨街头有人大声喧闹，评论同时提到较好的门窗隔音。"},
    {date:"2025-09",text:"另一位住客说在周边步行时感到安全。"}
  ]},
  "3": {summary:"住客曾表示在周边步行游览时感到安全。", entries:[
    {date:"2023-06",text:"一位住客表示在附近探索街区时感到安全；这只是当时的个人体验。"}
  ]},
  "4": {summary:"住客对步行环境有正面感受。", entries:[
    {date:"2025-06",text:"一位住客称周边步行方便，并表示感觉安全。"}
  ]},
  "5": {summary:"住客对酒店周边步行有正面反馈。", entries:[
    {date:"2026-05",text:"一位住客表示附近区域让其感到安全，并提到酒店入口有门禁。"}
  ]},
  "6": {summary:"较早的问答中，住客称自己在酒店附近没有安全顾虑。", entries:[
    {date:"日期未标出（页面显示一年多前）",text:"Tripadvisor 问答回复称，答主携带护照入住时不担心把证件留在房间；这是较早的个人经验。",type:"问答"}
  ]},
  "7": {summary:"住客提到酒店入口及电梯需要房卡。", entries:[
    {date:"2026-07",text:"一位住客称进出酒店及选择电梯楼层需要房卡，并据此觉得酒店较有安全感；这是住客对门禁的描述，不是独立安防检查。"}
  ]},
  "8": {summary:"一条近期评论提出酒店公共区域出入管理方面的安全疑虑。", entries:[
    {date:"2026-01",text:"一位住客报告曾有未经其认可的人进入酒店公共区域，并称因此担心酒店出入管理。此为单条评论中的陈述，未独立核实，也不代表普遍情况。"}
  ]},
  "9": {summary:"住客对夜间步行感受不一。", entries:[
    {date:"2026-04",text:"一位住客称到 Union Square 与 Moscone 一带时感觉安全。"},
    {date:"2024-10",text:"另一位住客称夜间部分街段让其觉得不舒服，但回酒店时并未觉得受到威胁。"}
  ]},
  "10": {summary:"住客曾表示在 Fisherman’s Wharf 一带感到安全。", entries:[
    {date:"2023-06",text:"一位住客称入住及周边活动时感到安全；这只是当时的个人体验。"}
  ]},
  "11": {summary:"较早评论对酒店附近区域评价正面。", entries:[
    {date:"2015-07",text:"一位住客称当时认为酒店周边安全；评论较旧，不能代表当前情况。"}
  ]},
  "12": {summary:"住客评论同时涉及夜间周边感受和房间隐私/安全。", entries:[
    {date:"2026-03",text:"一位住客报告客房门在其挂出请勿打扰标识并使用安全扣时仍被客房人员打开；酒店方在回复中表示会调查。此为单一住客报告。"},
    {date:"2025-08",text:"一位住客称白天与家人同行时感觉尚可，但不愿独自在深夜或清晨步行；评论提及大堂有保安。"}
  ]},
  "13": {summary:"住客对夜间街区和客房隐私有具体意见。", entries:[
    {date:"2026-05",text:"一位住客称与家人白天在周边活动时感觉安全。"},
    {date:"2026-05",text:"另一位住客报告客房人员在其挂出请勿打扰标识时进入房间；此为单一住客的隐私/安全投诉。"}
  ]},
  "14": {summary:"一位住客称酒店所在区域看起来安全。", entries:[
    {date:"2025-09",text:"一位住客称酒店离 Union Square 很近，并表示周边看起来安全；这是个人印象。"}
  ]},
  "15": {summary:"近期评论对步行安全感较正面，同时提醒留意周边街道差异。", entries:[
    {date:"2026-01",text:"一位商务旅客称步行到会场方便，相较附近街道感觉更安全，并提醒仍需留意周边。"},
    {date:"2026-05",text:"另一位住客称整个住宿期间感觉安全。"}
  ]},
  "16": {summary:"评论对周边步行和客房门锁都提供了具体反馈。", entries:[
    {date:"2026-10",text:"一位住客报告离房时客房门不能自行完全扣合，称这让其担心房间安全；酒店回复表示会交由工程和管理团队审查。"},
    {date:"2026-09",text:"另一位住客称在周边活动时没有不安感。"}
  ]},
  "17": {summary:"近期住客称在 Fisherman’s Wharf 附近活动时感觉安全。", entries:[
    {date:"2026-09",text:"一位住客表示酒店位置方便，入住期间感觉安全；这是个别体验。"}
  ]},
  "18": {summary:"周边步行感受有分歧，也有关于楼层门禁的投诉。", entries:[
    {date:"2025-09",text:"一位住客称夜间步行回酒店时感到不安全。"},
    {date:"2025-09",text:"另一位住客报告当时电梯楼层门禁没有正常工作，因而担心非住客可到达客房楼层；这是单一住客所述的设备状况。"}
  ]},
  "19": {summary:"住客对周边安全感评价正面，但评论较旧。", entries:[
    {date:"2024-03",text:"一位住客称周边看起来安全；该评论不代表目前情况。"}
  ]},
  "20": {summary:"住客对周边及酒店门禁有正面体验，评论时间较早。", entries:[
    {date:"2023-03",text:"一位住客称当时对旧金山治安有所顾虑，但入住后觉得酒店门锁和电梯房卡控制让其安心；这是几年前的个人体验。"}
  ]},
  "21": {summary:"近期住客对夜间步行提出谨慎意见。", entries:[
    {date:"2026-09",text:"一位住客建议夜间不要步行，并描述了自己看到的街头情况；这是个别住客的路线感受，不是酒店周边犯罪数据。"}
  ]},
  "23": {summary:"评论称周边总体尚可，但提醒深夜留意路线。", entries:[{date:"2025-05",text:"一位住客称附近街区还可以，但建议深夜保持留意；这是个人体验。"}]},
  "27": {summary:"评论涉及楼梯间出入问题，另有住客称区域安静、安全。", entries:[
    {date:"2026-09",text:"一位家庭住客报告电梯无法到达大堂，需依赖方向可变的扶梯；同行有行动不便者时尤其担心被困。属于该住客报告的通行与无障碍安全问题。"},
    {date:"2024-10",text:"另一位住客称当时觉得周边安全、安静。"}
  ]},
  "28": {summary:"有住客提醒不要把酒店位置与所有周边街段混为一谈。", entries:[
    {date:"2026-07",text:"一位住客评论特别提醒游客避开 Tenderloin 的部分区域，并用强烈措辞描述其个人看法；这不是酒店门口状况的证据。"}
  ]},
  "29": {summary:"一位近期住客对酒店周边位置感到不安。", entries:[
    {date:"2026-01",text:"一位家庭旅客称酒店周边让其感觉不太踏实，并表示走几条街后环境有所不同；这是个人印象。"}
  ]},
  "30": {summary:"近期住客对酒店周边安全感评价正面。", entries:[
    {date:"2026-06",text:"一位住客称周边感觉安全、整洁；这是个别体验。"}
  ]},
  "31": {summary:"住客对 Japantown 夜间步行及邻近街区感受有分歧。", entries:[
    {date:"2025-11",text:"一位住客称夜间步行时感觉安全。"},
    {date:"2025-02",text:"另一位住客称邻近 Tenderloin 的方向让其感觉环境较粗粝。"}
  ]},
  "32": {summary:"有独行女性住客分享了正面的安全感和门禁体验。", entries:[
    {date:"2026-05",text:"一位独行女性住客称入住期间感觉非常安全。"},
    {date:"2026-07",text:"另一位住客提到晚间有门禁/保安安排；该描述是住客观察，不是独立安防审计。"}
  ]},
  "33": {summary:"一位近期住客不建议夜间独自行走。", entries:[
    {date:"2026-03",text:"一位住客表示不建议独自在夜间步行，并称乘车时感觉相对安心；这是个人偏好和体验。"}
  ]},
  "34": {summary:"较早的住客称繁忙街道的人流让其感到安心。", entries:[
    {date:"2022-03",text:"一位住客称虽处繁忙街区，但因为有人流而感觉安全；评论较旧。"}
  ]},
  "35": {summary:"住客对 Nob Hill 步行安全感评价正面。", entries:[
    {date:"2026-07",text:"一位住客称当时步行方便且感觉安全。"},
    {date:"2024-06",text:"另一位住客也描述附近步行时感觉安全。"}
  ]},
  "36": {summary:"住客对周边氛围与夜间独行感受有分歧。", entries:[
    {date:"2026-10",text:"一位住客称初到时被街头无家可归者的场景吓到。"},
    {date:"2026-09",text:"另一位独行住客称虽然觉得周边需要留意，仍感到安全。"}
  ]},
  "38": {summary:"较早评论称酒店周围当时没有明显游荡或兜售现象。", entries:[
    {date:"2021-08",text:"一位住客称当时酒店门口没有无家可归者或兜售情况；时间较久，只能作为历史个人观察。"}
  ]},
  "39": {summary:"住客对夜间周边感受不一。", entries:[
    {date:"2026-08",text:"一位住客建议傍晚后保持一般城市出行警觉，并提到其在附近看到的情况；这是个人观察。"},
    {date:"2025-08",text:"另一位住客称即使靠近 Tenderloin，入住期间仍觉得安全。"}
  ]},
  "40": {summary:"评论既有感到安全的住客，也有提醒规划路线的住客。", entries:[
    {date:"2026-08",text:"一位家庭旅客称入住期间感觉安全，并建议先规划路线、避免漫无目的地走。"},
    {date:"2026-07",text:"另一位住客转述司机提醒避开某些街道；这是住客转述，不是酒店安全事件。"}
  ]},
  "41": {summary:"一位独行住客称夜间外出时感到不安。", entries:[{date:"2026-07",text:"一位独行住客表示夜间外出时感觉不安。"}]},
  "43": {summary:"住客称白天步行较安心，但提醒夜间保持谨慎。", entries:[
    {date:"2026-03",text:"一位住客称白天在附近步行较安全，并提醒仍要保持警觉。"},
    {date:"2026-07",text:"另一位住客称白天感觉较安全、夜间部分街段较不舒服。"}
  ]}
};

export const safetySources=[
  ["SFPD 犯罪数据仪表板", "https://www.sanfranciscopolice.org/stay-safe/crime-data/crime-dashboard"],
  ["市府居民安全感调查（2023）", "https://www.sf.gov/data--city-survey-safety-and-policing"],
  ["San Francisco Travel 访客安全建议", "https://www.sftravel.com/meetings/article/tips-attendees"],
  ["San Francisco Travel 会展安全资源", "https://www.sftravel.com/meetings/san-franciscos-safety-security-measures-conventions-self-contained-groups"]
];



