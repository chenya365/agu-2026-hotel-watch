// Public, manually verified offer snapshots. Never advance dates after a failed lookup.
export const otaCheckedOn='2026-10-28';
export const otaQuotes=[
 {id:'17',platform:'Trip.com',total:2124,currency:'USD',room:'Deluxe Two Queen Room',beds:'2 张 Queen 床 · 29㎡',breakfast:'含 2 份早餐',cancel:'12 月 2 日 23:59 前免费取消',url:'https://www.trip.com/hotels/san-francisco-hotel-detail-2197623/riu-plaza-fisherman-s-wharf/'},
 {id:'13',platform:'Trip.com',total:2299,currency:'USD',room:'Deluxe Two Queen Room',beds:'2 张 Queen 床 · 29㎡',breakfast:'早餐未确认',cancel:'12 月 4 日 23:59 前免费取消',url:'https://www.trip.com/hotels/san-francisco-hotel-detail-45748742/hotel-caza-fisherman%E2%80%99s-wharf/'},
 {id:'35',platform:'Trip.com',total:3051,currency:'USD',room:'Standard Queen Room',beds:'1 张 Queen 床 · 16–23㎡',breakfast:'早餐另付，页面显示 US$36',cancel:'12 月 5 日 12:00 前免费取消',url:'https://www.trip.com/hotels/v2/san-francisco-hotel-detail-2197524/stanford-court-hotel/'}
].map(q=>({...q,checkedOn:otaCheckedOn,checkIn:'2026-12-06',checkOut:'2026-12-12',rooms:1,adults:2,tax:'页面标注含税及费用',payment:'在线预付',url:q.url+'?checkIn=2026-12-06&checkOut=2026-12-12&adult=2&room=1&curr=USD'}));
export const otaUnavailable={'26':'Trip.com 在所选日期页面显示暂不接受预订。'};
