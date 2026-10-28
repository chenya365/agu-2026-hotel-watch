export const officialUrl='https://registration.experientevent.com/ShowAGU261/Flow/SHOW/EmbeddedWidget/RoomBrowse#!/registrant//RoomBrowse/';
// Inventory: observed in the official AGU widget, 2026-10-27 22:43 HKT.
// A=available, S=sold out, W=waitlist. Each character maps to Dec 6..11.
const rows=[
['Axiom Hotel',249,'AASAAA','18182.jpg',4.4,'精品酒店','Union Square','现代清洁，近 Parc 55；部分房间偏小、偏暗或空调声大。','7624213'],
['Beacon Grand',273,'SASAAA','27524.jpg',4.6,'精品酒店','Union Square','翻新设计、床品与服务有吸引力；需留意电车和临街噪声。','81377'],
['Fairmont Hotel',254,'AASSAA','8822.jpg',4.2,'Fairmont','Nob Hill','公共空间与经典酒店体验突出；房型差异和附加费用要核对。','81397'],
['Galleria Park Hotel',235,'AASAAA','23436.jpg',4.4,'精品酒店','Financial District','清洁、安静与服务评价好；部分房间紧凑，六晚需看面积。','80990'],
['Grand Hyatt San Francisco',295,'ASSASA','18040.PNG',4.2,'Hyatt','Union Square','舒适与位置均衡；部分评价提到老化、噪声和费用。','80999'],
['Handlery Union Square Hotel',260,'SSSAAA','14174.jpg',4.0,'独立酒店','Union Square','员工、床与泳池有好评；历史楼和 Premier 房间体验有差异。','81019'],
['Harbor Court Hotel',275,'SSAASW','27622.jpg',4.5,'精品酒店','Embarcadero','海滨、服务和睡眠评价好；房间可能较小，浴室布局需确认。','81022'],
['Hilton Financial District',285,'AAAAAA','27618.jpg',3.8,'Hilton','Financial District','交通餐饮方便；房间与服务体验分歧，价格优势不明显。','81038'],
['Hilton San Francisco Union Square',270,'AASAAA','17725.jpg',3.7,'Hilton','Union Square','规模大、设施多；客流较多，部分房间偏旧，服务评价不一。','81295'],
["Holiday Inn Express Fisherman's Wharf",226,'AAAAAA','30907.jpg',4.1,'IHG','Fisherman’s Wharf','实用型住宿、旅游餐饮方便；早餐包含情况须以 AGU 条款为准。','217813'],
['Holiday Inn Golden Gateway',240,'AAAAAA','8858.jpg',3.8,'IHG','Van Ness','位置实用；更适合预算比较，舒适度不作为本看板首选。','81049'],
['Hotel Abri',250,'WASSAA','22094.jpg',4.2,'精品酒店','Union Square','近 Parc 55，员工与床有好评；部分评价提到小、旧或房间气味。','81165'],
['Hotel Caza',254,'AAAAAA','24265.jpg',4.3,'独立酒店','Fisherman’s Wharf','清洁舒适、休闲氛围；留意冰箱费用和临街、雾笛声音。','19065465'],
['Hotel Fusion',199,'SSSSSW','24843.jpg',3.5,'独立酒店','Union Square','价格与位置是优势；空间、空调、隔音和房间新旧存在取舍。','243535'],
['Hotel G',239,'AASSAA','15730.jpg',4.2,'精品酒店','Union Square','清洁与设计不错；工业风、照明与隔音不一定适合所有人。','6383475'],
['Nikko San Francisco',269,'AASAAA','22122.jpg',4.2,'Nikko','Union Square','床、清洁、浴室与设施较好，近 Parc 55；附加费需核对。','80793'],
['Hotel Riu Plaza',259,'AAAAAA','31015.png',4.3,'RIU','Fisherman’s Wharf','早餐与旅游便利性获好评；AGU 是否含早餐尚未确认。','81375'],
['Hotel Spero',229,'AASAAA','26834.jpg',4.4,'IHG Vignette','Union Square','清洁、睡眠与设计评价好；房间可能小，周边体验有分歧。','80802'],
['Hotel Via',272,'SSSSSA','27811.JPG',4.2,'精品酒店','South Beach','现代、清洁、床舒适；部分浴室门的私密性和餐饮配套需留意。','12379692'],
['Hotel Zelos',275,'SSASAA','30890.jpg',4.4,'精品酒店','SOMA','房间与床有好评、食品购物方便；门口繁忙，当前房型为 King。','80797'],
["Hotel Zephyr Fisherman's Wharf",219,'AAAAAA','31063.jpg',4.1,'独立酒店','Fisherman’s Wharf','旅游、餐饮与游戏休闲空间方便；房间和噪声体验不一。','81222'],
['Hotel Zeppelin',239,'AASAAA','30892.jpg',4.2,'精品酒店','Union Square','摇滚风格、游戏空间有特色；噪声及服务体验有差异。','81215'],
['Hotel Zetta',281,'SASAAA','23166.jpg',4.4,'精品酒店','SOMA','宽敞现代、有休闲空间；维护与街区体验有取舍。不是 Parc 55。','112304'],
["Hyatt Centric Fisherman's Wharf",234,'AAAAAA','7504.jpg',4.0,'Hyatt','Fisherman’s Wharf','旅游便利；近期评价同时有翻新好评和电梯、空调噪声意见。','81087'],
['Hyatt Place San Francisco Downtown',264,'SSSSSA','25500.jpg',4.2,'Hyatt','South Beach','清洁、实用，近 Oracle Park；早餐与遮光、噪声需核对。','15521276'],
['Hyatt Regency San Francisco',274,'AAAAAA','16257.jpg',4.1,'Hyatt','Embarcadero','大型酒店设施完整，海滨与 Ferry Building 方便；推荐安静房。','81103'],
['Hyatt Regency San Francisco Downtown SOMA',274,'SSSSAA','26007.jpg',4.3,'Hyatt','SOMA','翻新、清洁、床舒适，近会场与 W；有电梯等待或噪声意见。','654030'],
['InterContinental Mark Hopkins',285,'AAAAAA','22307.jpg',4.0,'IHG','Nob Hill','经典酒店与位置有吸引力；房间新旧与维护体验存在差异。','115623'],
['Intercontinental San Francisco',277,'SSSAAA','8784.jpg',4.2,'IHG','SOMA','会场方便，服务舒适度总体可靠；部分设施细节与服务一致性有意见。','676408'],
['JW Marriott San Francisco',275,'SSASAA','8874.jpg',4.1,'Marriott','Union Square','门童与服务有好评；餐饮停车贵，豪华感未必符合品牌预期。','81444'],
['Kimpton Hotel Enso',239,'AAAAAA','27610.jpg',4.3,'IHG Kimpton','Japantown','精品氛围、清洁服务与餐饮环境好；部分门窗、走廊声音需留意。','80917'],
['Parc 55 San Francisco',270,'AASAAA','17723.jpg',3.9,'Hilton','Union Square','房间空间和景观有优势；装饰偏旧，服务与周边体验混合。','81192'],
['San Francisco Marriott Marquis',280,'AAASAA','16162.jpg',4.2,'Marriott','SOMA','床与房间舒适、参会便利；会议客流较多，附加费和服务需核对。','81315'],
['San Francisco Marriott Union Square',257,'AASASA','30743.jpg',4.0,'Marriott','Union Square','中心位置与日常购物方便，偏标准商务酒店体验。','124765'],
['The Stanford Court Hotel',254,'AAAAAA','22995.jpg',4.5,'独立酒店','Nob Hill','舒适与位置均衡，打车可降低坡度影响；临街电车噪声及目的地费需核对。','80747'],
['Staypineapple San Francisco',240,'AAAASA','2742.jpg',4.5,'Staypineapple','Union Square','床品和装饰好评；空间较小，近期网络电视问题与周边体验有分歧。','81363'],
['The Barnes San Francisco',249,'AASAAA','27522.jpg',4.3,'Hilton Tapestry','Union Square','位置、清洁与服务好评；房间面积及装饰新旧有差异。','81529'],
['The Clancy, Autograph Collection',285,'AASSAA','24617.jpg',3.9,'Marriott Autograph','SOMA','设计与庭院有吸引力；平台差异明显：Expedia 9.2/10，Tripadvisor 样本较少。','223955'],
['The Clift Royal Sonesta Hotel',251,'SSSASA','27526.jpg',4.2,'Sonesta','Union Square','房间宽敞现代，员工有好评；噪声、配套及周边体验有分歧。','112328'],
['The Marker San Francisco',224,'AASAAA','24672.jpg',4.3,'精品酒店','Union Square','历史建筑、床和服务不错；环境优先时不必特意等它。','81985'],
['Timbri Hotel San Francisco',229,'AASAAA','30921.jpg',4.2,'Hilton Curio','Mid-Market','房间现代、屋顶酒吧有吸引力；周边位置评价明显弱于内部舒适评价。','24151760'],
['W San Francisco',280,'ASASSA','27614.jpg',4.0,'Marriott W','SOMA','近会场、设计与服务有吸引力；大堂酒吧较活跃，不是安静度首选。','81669'],
['Westin St. Francis Hotel',260,'AASSAA','23531.jpg',4.0,'Marriott Westin','Union Square','床、历史建筑与位置有优势；楼翼和房型差异大，Standard 不等于 Tower。','81461'],
['Yotel San Francisco',261,'SAAASA','25539.png',3.9,'YOTEL','Mid-Market','清洁设计有好评；紧凑空间、部分浴室私密性与周边体验存在取舍。','12823020']
];
const top=[34,30,25,12,27,16,23,9,20,7,10];
const wait=[3,1,2,26,6,4,15,29,32,41];
export const catalog=rows.map((r,i)=>({id:String(i+1),name:r[0],price:r[1],pattern:r[2],image:'https://registration.experientevent.com/HTMLProduction/HotelImages/'+r[3],rating:r[4],brand:r[5],area:r[6],review:r[7],reviewUrl:r[8]?'https://www.tripadvisor.com/Hotel_Review-g60713-d'+r[8]+'-Reviews.html':null,rank:top.includes(i)?top.indexOf(i)+1:wait.includes(i)?20+wait.indexOf(i):50+i,tag:top.includes(i)?'现有候选':wait.includes(i)?'值得关注':'其他选择'}));
const extras={0:[['Standard Room-Double',249,'SSSSSW']],4:[['View Room',300,'SASAAA']],5:[['Premier Standard Room',290,'SASAAA']],13:[['Standard Room-Double',199,'SSSSSA']],32:[['Premier Room',299,'SSSSSS']],38:[['City/ Exec. Standard Room',271,'SAAAAA']]};
const special={0:'Standard Room-Single',5:'Historic Standard Room',13:'Standard Room-Single',14:'Standard Room-Single',19:'Deluxe King Standard Room',38:'Deluxe Standard Room'};
const room=(name,price,pattern)=>({room:name,nights:[...pattern].map((status,j)=>({day:j+6,price,status}))});
export const seed={checkedAt:'2026-10-27T14:43:00Z',reviewCheckedAt:'2026-10-27',source:officialUrl,monitor:'pending',hotels:catalog.map((h,i)=>({id:h.id,checkedAt:i===42?'2026-10-27T15:08:00Z':'2026-10-27T14:43:00Z',rooms:[room(special[i]||'Standard Room',h.price,h.pattern),...(extras[i]||[]).map(r=>room(...r))]}))};
