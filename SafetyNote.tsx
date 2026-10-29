import React from 'react';
import {safetyReviewedOn,safetyGuestReports,safetySources} from './safety-notes.mjs';

function sourceLink(h:any){
 return h.reviewUrl?<a href={h.reviewUrl} target="_blank" rel="noreferrer">查看该酒店 Tripadvisor 评论 ↗</a>:null;
}

// A short, hotel-specific note appears only where a dated comment was found.
// This intentionally adds no repeated generic advice to hotels without evidence.
export function SafetyHotelNote({hotel,compact=false}:any){
 const note=(safetyGuestReports as any)[String(hotel.id)];
 if(!note)return null;
 return <section className={'safety-note'+(compact?' compact':'')} aria-label={hotel.name+'安全相关住客评价'}>
  <strong>安全相关住客评价</strong>
  {compact?<><p>{note.summary}</p><small>{note.entries.length} 条有日期记录 · 详情见酒店弹窗</small></>:<>
   <p className="muted">以下仅为该酒店评论页中少数住客的主观体验，不能代表发生率、当前治安或酒店安防水平；相反意见并列保留。</p>
   <ul>{note.entries.map((entry:any,i:number)=><li key={i}><b>{entry.date}</b>{entry.type&&<em> · {entry.type}</em>}：{entry.text}</li>)}</ul>
   {sourceLink(hotel)}
  </>}
 </section>;
}

// Keep the existing page import name while changing the content to specific reviews only.
export const SafetyNote=SafetyHotelNote;

export function SafetyOverview({hotels=[]}:any){
 const reportCount=hotels.filter((h:any)=>(safetyGuestReports as any)[String(h.id)]).length;
 return <section className="safety-panel" aria-label="旧金山住宿安全评价与出行建议">
  <div><span className="eyebrow">出行提醒 · {safetyReviewedOn} 整理</span><h2>安全相关住客评价与出行建议</h2>
   <p>已逐一检查 44 家酒店的住客评论；其中 {reportCount} 家找到可追溯的安全、夜间步行、门禁或客房隐私相关评价。具体内容只放在对应酒店卡片与详情中；未列出的酒店表示本轮没有找到可核实的相关评论，不代表没有风险。</p>
   <p>评论是个别且带日期的主观体验，不是犯罪记录、酒店审计或当前风险预测。通用建议只在此列一次：夜间优先走照明和人流较好的主路；留意路线与随身物品；不确定路线时直接叫车到酒店入口。</p>
  </div>
  <div className="safety-sources">{safetySources.map(([label,url]:any)=><a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div>
  <small>市府居民调查衡量主观感受，SFPD 仪表板记录的是事件数据；两者都不能推断单家酒店或某个时段的即时风险。复核日期：{safetyReviewedOn}。</small>
 </section>;
}

