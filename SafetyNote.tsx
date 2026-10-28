import React from 'react';
import {safetyReviewedOn,safetyAreaNotes,safetyGuestReports,safetySources} from './safety-notes.mjs';

export function SafetyNote({hotel,compact=false}:any){
 const area=safetyAreaNotes[hotel.area];
 const guest=safetyGuestReports[hotel.id];
 return <section className="safety-note" aria-label={hotel.name+' 周边安全信息'}>
  <strong>周边安全与出行</strong>
  {area&&<p><b>街区背景（主观调查）</b>{area.context}</p>}
  {guest&&<p><b>住客个案（非犯罪统计）</b>{guest}</p>}
  {!area&&!guest&&<p>本次未找到足够、可核对的酒店周边安全经历；这不代表没有风险。可按酒店准确地址查看近期官方资料。</p>}
  <p><b>建议</b>夜间优先走照明良好且有人流的主路；不边走边看手机，随身物品贴身保管。晚间或不熟悉路线时，可叫车到酒店入口并提前确认上车点。</p>
  {!compact&&<><small>安全资料整理：{safetyReviewedOn}。SFPD 事件记录可能随补录和更正而变化；居民调查衡量主观感受。两者都不能预测某家酒店或某条街此刻的风险。</small><div className="review-sources">{guest&&hotel.reviewUrl&&<a href={hotel.reviewUrl} target="_blank" rel="noreferrer">查看此酒店住客评价 ↗</a>}{safetySources.map(([label,url]:any)=><a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div></>}
 </section>;
}

export function SafetyOverview(){
 return <section className="safety-panel" aria-label="旧金山酒店周边安全与出行建议">
  <div><span className="eyebrow">出行提醒 · 2026/10/29 整理</span><h2>周边安全，按街区与时段判断</h2>
   <p>本页不把酒店或街区标成“安全/危险”。旧金山市府 2023 居民调查反映的是居民主观安全感；SFPD 犯罪数据是持续修订的事件记录，不等同于游客在酒店门口的即时风险。该调查将 Financial District / South Beach 的居民安全感列为较低一档；请同时考虑调查年份、酒店准确地址、路线和出行时段。</p>
   <p>实用做法：晚间走照明良好且有人流的主路；避免边走边看手机或展示贵重物品；不在车内留行李；不熟悉的夜间路线可直接叫车到酒店入口。详情弹窗会注明已核实评论中的周边感受个案，但个案不是犯罪统计。</p>
  </div>
  <div className="safety-sources">{safetySources.map(([label,url]:any)=><a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div>
  <small>数据与建议复核日：{safetyReviewedOn}。SFPD 提醒事件记录可能随补录、更正而变化；不用于给单家酒店评分。</small>
 </section>;
}
