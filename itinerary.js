'use strict';
Object.assign(window.LOCATIONS,{
 kikunanStop:{name:'菊南温泉前 バス停',query:'菊南温泉前 熊本電鉄 バス停',coords:[32.8601261,130.7300689]},
 josaien:{name:'桜の馬場 城彩苑',query:'桜の馬場 城彩苑',coords:[32.8033338,130.7037621]},
 grassCafe:{name:'草千里珈琲焙煎所',query:'草千里珈琲焙煎所',coords:[32.886147,131.054318]}
});
symbols.train='<rect x="5" y="3" width="14" height="15" rx="4"/><path d="M5 10h14M8 14h.01M16 14h.01M8 18l-3 4m11-4 3 4M8 3V1m8 2V1"/>';
const flightBooking=n=>reservationCard('飛行機の予約',[
 ['搭乗日',n===13?'9月13日（日）':'9月17日（木）'],['便名',n===13?'ソラシドエア SNA013':'ソラシドエア SNA060'],['人数・運賃','大人2名 · 特典航空券'],['座席',n===13?'14A・14B':'15A・15B']
],'6月1日の予約完了メールで確認。搭乗口は当日の案内を確認。', '<p>メール記載の交換マイルは12,000マイル、国内線旅客施設使用料は'+(n===13?'¥1,540':'¥900')+'。搭乗時は元のメールの「ご搭乗のご案内」から手続き。</p>');
const seagaiaBooking=()=>reservationCard('シーガイアの宿泊予約',[
 ['宿泊','9/15（火）→ 9/17（木） · 2泊'],['お部屋','スタンダードツイン【禁煙】 · 1室'],['人数','大人2名'],['食事','夕食・朝食付き'],['支払い','¥70,680（税込） · 現地決済'],['到着予定','予約時の申告：14:00〜16:00台']
],'6月1日の予約確定メールで確認。夕食の差額と税は別途。','<p>宿泊料金 ¥70,680 ＋ 夕食差額 ¥24,600 ＝ <b>¥95,280／2人</b>（別途税・追加利用分）。</p><p>メール記載：入湯税は大人150円。宿泊税は1人1泊200円（2人×2泊で800円）。入湯税の適用日数・総額は現地精算時に確認。</p><p>キャンセル規定：11日前まで無料、10日前から20%、3日前から50%、当日80%、連絡なし100%。手続きは元の予約メールから。</p>');
const dinnerBooking=n=>reservationCard(n===15?'鉄板焼き「ふかみ」':'リストランテアルコ',[
 ['予約日時',n===15?'9/15（火）19:30〜':'9/16（水）19:00〜'],['人数','大人2名 · 席を確保済み'],['夕食の差額',n===15?'¥10,000 × 2人 ＝ ¥20,000':'¥2,300 × 2人 ＝ ¥4,600']
],'8月27日のホテルからの案内で確定。'+(n===15?'希望していた19:00から19:30に変更されています。':''));
function hotelBagStop(){return stop('○ 13:35','フロントに荷物を預ける',box('<div class="luggage-card"><img src="assets/hotel-kikunan.webp" alt="菊南温泉ユウベルホテルのロビー" width="800" height="658" loading="lazy"><div class="luggage-copy"><span class="action-badge">'+icon('bag')+' 荷物を預ける</span><h4>菊南温泉<br>ユウベルホテル</h4><p>チェックイン前も預かりOK。<br>身軽になって街へ。</p></div></div>'+pad(reservationCard('熊本で泊まるホテル',[['宿泊','9/13（日）→ 9/15（火） · 2泊'],['夕食','付いていないため、お店を選ぶ'],['チェックイン','15:00〜'],['チェックアウト','10:00まで']],'宿泊先・日程・夕食なしは共有いただいた内容。Gmailではこのホテルの予約メールが見つからないため、部屋・金額は未確認。'))+'<div class="luggage-footer">'+ext('ホテル公式FAQ',sourceURLs.hotel)+'</div><p class="source-credit hotel-credit">写真：菊南温泉ユウベルホテル 公式</p>'),'stay','','luggage13')}
function localTransfer(time,from,to,title){
 const a=point(from),b=point(to);if(from===to)return '';
 const dist=Math.hypot((a.coords[0]-b.coords[0])*111,(a.coords[1]-b.coords[1])*93),kind=dist>1.5?'car':'walk';
 return moveStop(time,from,to,{kind,title,label:kind==='car'?'タクシー案':'徒歩',duration:kind==='walk'?'街歩き':'市内移動',note:kind==='walk'?'歩く道は現地の歩道・案内サインに沿って。':'店の場所に合わせた移動案。タクシーは未手配。'});
}
function kikunanReturn(early=false){return moveStop(early?'○ 夕方':'○ 19:55','sakura','kikunanStop',{kind:'bus',title:'バスで菊南温泉へ',label:early?'路線バス · C系統':'路線バス · C1-2',start:early?'':'19:55',end:early?'':'20:19',duration:'¥510／人',fromLabel:'桜町BT · 1F 青17番',toLabel:'菊南温泉前',note:early?'夕食に間に合う便を当日の時刻表で確認。':'菊池プラザ行き（堀川・御代志経由）。現金などを用意。',details:terminalMap('17')})+moveStop(early?'到着後':'○ 20:19','kikunanStop','hotelK',{kind:'walk',title:'坂を上ってホテルへ',label:'徒歩',duration:'約5分',note:'バス停は道路沿い。ホテルの案内に沿って坂を上ります。地図は停留所付近の目印。'})+returnHotel13(early?'夕方':'○ 20:25')}
dayContent[13]=()=>{
 const l=picked('l13'),d=picked('d13');
 return '<ol class="trip-list">'+moveStop('10:40','haneda','airportK',{kind:'plane',title:'熊本へ',label:'ソラシドエア 013便',start:'10:40',end:'12:30',booked:true,details:flightBooking(13)})+
 moveStop('○ 13:00','airportK','hotelK',{kind:'car',title:'まずホテルへ直行',label:'タクシー案',start:'13:00',end:'13:35',duration:'約35分',note:'空港で荷物を受け取ってタクシーへ。ホテルに荷物を預けます。',details:'<details class="route-alternative"><summary>バスで行く場合の乗り換え</summary><p>熊本空港4番（特別快速は3番）→ 桜町BT → 青17番のC系統 → 菊南温泉前 → 徒歩約5分。</p>'+terminalMap('17')+'<p>所要時間が延びるので昼食・街歩きの時刻を調整。</p></details>'})+hotelBagStop()+
 moveStop('○ 13:50','hotelK',l.id,{kind:'car',title:'荷物を置いて、お昼ごはんへ',label:'タクシー案',duration:'市中心部まで約20〜25分',note:'所要時間は店の場所と交通状況で変わります。'})+mealStop('l13','○ 14:30')+
 localTransfer('食後',l.id,'josaien','城彩苑へ')+stop('午後','城彩苑で、さんぽとお土産',box('<button class="visit-teaser" data-go-guide="city"><img src="assets/josaien.webp" alt="城彩苑の街並み" width="300" height="160"><span>ほかにも熊本城・庭園・くまモン<b>熊本の観光候補を見る →</b></span></button>'),'sight')+
 (d.id==='kikusen'?localTransfer('夕方','josaien','sakura','桜町のバス乗り場へ')+kikunanReturn(true)+mealStop('d13','○ 18:00'):localTransfer('○ 17:30','josaien',d.id,'夜ごはんのお店へ')+mealStop('d13','○ 18:00')+localTransfer('○ 19:15',d.id,'sakura','ホテル行きのバス乗り場へ')+kikunanReturn())+
 '</ol>'+refs([['ホテルの荷物預かり',sourceURLs.hotel],['タクシーの所要時間','https://kikunan-ublhotel.jp/access/'],['桜町の乗り場',sourceURLs.terminal],['19:55便の時刻表','https://www.kumamotodentetsu.co.jp/bus/select/cgi/table/program/kdroutep.cgi?bn=791&bs=6']],'<p>○は提案時刻。予約済みは飛行機のみ。食事とタクシーは未予約。昼の荷物預け後は同じホテルに戻ります。</p>');
};
dayContent[14]=()=>{
 const l=picked('l14'),d=picked('d14');
 return '<ol class="trip-list">'+moveStop('○ 08:00','hotelK',l.id,{kind:'car',title:'車で阿蘇へ',label:'車 · 阿蘇ドライブ',duration:'出発時刻は目安',note:l.id==='imakin'?'10:00開店に合わせて内牧へ。待ち時間を見込んで出発。':'お店の開店まで、周辺で寄り道。営業時間に合わせて出発を調整。'})+mealStop('l14',l.id==='imakin'?'○ 10:00':'○ 11:30')+
 (l.id==='kusasenri'?'':moveStop('食後',l.id,'grass',{kind:'car',title:'草千里へ向かう',label:'車',duration:'阿蘇パノラマライン方面',note:'山道なので時間に余裕を。草千里の駐車場へ。'}))+
 stop('○ 13:00','草千里ヶ浜を歩く',box('<img class="scene-photo" src="assets/kusasenri-real.webp" alt="草千里ヶ浜の池と草原" width="960" height="640" loading="lazy">'+pad('<div class="scene-copy"><b>大きな空と、草原と、池。</b><span>散策1〜2時間 · 駐車場 普通車¥500</span></div><button class="guide-jump" data-go-guide="aso">阿蘇のほかの観光候補 →</button><p class="source-credit">写真：阿蘇市観光協会</p>')),'sight')+
 stop('○ 14:30','草千里でコーヒー休憩',box(pad('<b>草千里珈琲焙煎所 · ニュー草千里1F</b><p class="one-note">駐車場に面した建物。散策の帰りにひと休み。</p>'+way('駐車場周辺の位置関係',[{icon:'view',label:'草千里の草原'},{icon:'walk',label:'道路の横断箇所'},{icon:'food',label:'ニュー草千里1F',target:true}],'green','徒歩の目印図。横断箇所・現地案内に従って建物へ。'))),'sight')+
 moveStop('○ 15:30','grass',d.id==='kikusen'?'hotelK':d.id,{kind:'car',title:'熊本へ戻って夕食',label:'車',duration:'夕食・返却に余裕を',note:'車の返却場所・時間に合わせて夕食前後を調整。飲酒する場合は先に返却。'})+mealStop('d14','○ 18:30')+
 (d.id==='kikusen'?'':moveStop('食後',d.id,'hotelK',{kind:'car',title:'同じホテルに戻る',label:'タクシー案',duration:'車を返却した後',note:'車を返した後の移動案。翌朝は早めにチェックアウト。'}))+
 '</ol>'+refs([['草千里の営業案内','https://www.newkusasenri.com/info/?mode=dsp&no=44']],'<p>車・食事は未予約。草千里は9/6公式案内で通常営業。火口周辺の規制は当日の公式情報を確認。14日の食事候補は月曜営業を基に選定。</p>');
};
dayContent[15]=()=>'<ol class="trip-list">'+
 moveStop('○ 07:50','hotelK','kikunanStop',{kind:'walk',title:'チェックアウトしてバス停へ',label:'徒歩',duration:'約5分',note:'ホテル玄関前ではなく、坂下の「菊南温泉前」へ。桜町方面の乗り場を確認。'})+
 moveStop('○ 08:15','kikunanStop','sakura',{kind:'bus',title:'桜町へ',label:'路線バス · C3-3',start:'08:15',end:'09:00',duration:'¥510／人',note:'熊本駅／蓮台寺入口行き・山室経由。Suicaのみは不可。現金などを用意。'})+
 stop('○ 09:30','赤い5番乗り場へ',box('<div class="platform-tip"><div class="platform-sign"><small>1F 赤</small><strong>5</strong></div><div class="platform-copy"><b>宮崎行き・なんぷう号</b><small>10:00発 · 5番で待つ</small></div></div>'+terminalMap('5')),'walk')+
 moveStop('10:00','sakura','stationM',{kind:'bus',title:'高速バスで宮崎へ',label:'高速バス · なんぷう号',start:'10:00',end:'13:35',booked:true,fromLabel:'桜町BT · 赤5番',toLabel:'宮崎駅',note:'終点の「宮崎駅」で降りる。宮交シティでは降りません。',details:reservationCard('なんぷう号の予約',[['乗車日','9/15（火）'],['便・号車','53507便 · 1号車'],['座席','10A・10B'],['人数・支払い','大人2名 · ¥8,600 決済済み']],'8月17日のWEB決済完了メールで確認。13:35着は公式時刻表。','<p>元メールのリンク先から<b>スマホ乗車券を表示</b>して乗務員に提示。スクリーンショット・予約確認画面では乗車不可。</p><p>変更・キャンセル期限までは手数料110円／大人1名。期限は元の予約情報で確認。</p>')})+
 stop('到着後','駅の「東口」へ歩く',box(way('宮崎駅の乗り換え',[{icon:'bus',label:'高速バス降車'},{icon:'walk',label:'駅の東西通路'},{number:'東',label:'東口送迎乗り場',target:true}],'','西口に出た場合は、駅構内の東西通路を通って東口へ。')),'walk')+
 moveStop('○ 14:00','stationM','seagaia',{kind:'bus',title:'無料送迎でシーガイアへ',label:'ホテル無料シャトル',start:'14:00',end:'14:30',duration:'無料・予約不要',fromLabel:'宮崎駅 東口',note:'先着順。高速バスの遅延や満席で乗れなければタクシーへ。'})+
 stop('午後','チェックイン',box(pad('<h4 class="stay-name">フェニックス・シーガイア<br>オーシャン・タワー</h4>'+seagaiaBooking())),'stay','予約済み')+
 stop('19:30','ホテルで鉄板焼き',box(pad(dinnerBooking(15))),'meal','予約済み')+
 '</ol>'+refs([['朝の路線バス',sourceURLs.bus],['なんぷう号 時刻表',sourceURLs.nanpu],['送迎の時刻表',sourceURLs.seagaia]],'<p>朝の路線バス・無料送迎は乗り継ぎ案。高速バスは決済済み。道路状況により遅れることがあります。</p>');
dayContent[16]=()=>'<ol class="trip-list">'+stop('朝','ホテルの朝食',box(pad('<h4 class="stay-name">朝食付きプラン</h4><p class="one-note">会場・時間はチェックイン時の案内で確認。</p>')),'meal')+
 stop('昼間','ふたりの気分で、宮崎を楽しむ',box('<button class="visit-teaser" data-go-guide="miyazaki"><img src="assets/aoshima.webp" alt="青島の景色" width="300" height="160"><span>近くの庭園から、青島の海まで<b>宮崎の観光候補を選ぶ →</b></span></button>'+pad('<p class="one-note">ホテルの温泉でゆっくりするのも、街へランチに出るのも。19:00のディナーまでに戻ろう。</p>')+'<div class="food-links"><a class="mini-link" href="#explore/miyazaki/eat">宮崎の食事候補 →</a></div>'),'sight')+
 stop('19:00','ホテルでイタリアン',box(pad(dinnerBooking(16))),'meal','予約済み')+
 stop('夜','翌日の空港タクシーを相談',box(pad('<p class="one-note">フロントで、17日12:00ごろ出発の配車を相談。現在は未手配。</p>')),'stay')+'</ol>'+seagaiaBooking();
dayContent[17]=()=>'<ol class="trip-list">'+stop('朝','朝食・荷造り・精算',box(pad('<h4 class="stay-name">シーガイアをチェックアウト</h4><p class="one-note">チェックアウト時刻は宿泊案内で確認。夕食の差額・税・追加利用分を精算。</p>')),'stay')+
 moveStop('○ 12:00','seagaia','airportM',{kind:'car',title:'宮崎空港へ',label:'タクシー案',start:'12:00',end:'12:30',duration:'車で約25分',note:'17日（木）は空港直行バスの運行日ではないためタクシー案。配車は未手配。'})+
 stop('空港で','荷物・ランチ・保安検査',box(way('搭乗前に、この順番',[{icon:'bag',label:'荷物を預ける'},{icon:'food',label:'時間があれば昼食'},{icon:'plane',label:'保安検査・搭乗口',target:true}],'','時間に余裕がなければ食事より搭乗を優先。')+'<div class="food-links"><a class="mini-link" href="#explore/miyazaki/eat">空港の寿司・郷土料理を見る →</a></div>'),'walk')+
 moveStop('14:10','airportM','haneda',{kind:'plane',title:'羽田へ帰る',label:'ソラシドエア 060便',start:'14:10',end:'15:55',booked:true,details:flightBooking(17)})+'</ol>'+refs([['空港への公式アクセス',sourceURLs.seagaia]],'<p>搭乗口・保安検査の締切は当日の航空会社の案内で確認。</p>');
readChoices();render();
