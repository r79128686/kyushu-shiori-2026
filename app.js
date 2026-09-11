const icons={
map:'<path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 3v15"/>',
bus:'<rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 11h14M8 19v2m8-2v2M8 7h8"/><path d="M8 15h.01M16 15h.01"/>',
food:'<path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v19M20 22V3c-4 2-5 8-5 11h5"/>',
stay:'<path d="M3 21V8h18v13M3 17h18M7 8V3h10v5M7 12h2m6 0h2"/>',
arrow:'<path d="M7 17 17 7M7 7h10v10"/>',
pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
share:'<path d="M12 16V3m-5 5 5-5 5 5M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/>',
car:'<path d="m5 8 2-5h10l2 5M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8H3v-8ZM6 18v3m12-3v3M6 12h2m8 0h2"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
check:'<path d="m5 12 4 4L19 6"/>'
};
const icon=(name)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||icons.pin)+'</svg>';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const map=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
const dir=(from,to,mode='driving',waypoint='')=>'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(from)+'&destination='+encodeURIComponent(to)+'&travelmode='+mode+(waypoint?'&waypoints='+encodeURIComponent(waypoint):'');
const link=(label,url,primary=false)=>'<a class="action '+(primary?'primary':'')+'" href="'+esc(url)+'"'+(url.startsWith('#')?'':' target="_blank" rel="noopener noreferrer"')+'>'+label+icon(url.startsWith('#')?'bus':'arrow')+'</a>';
const source=(label,url)=>'<a class="source" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>';
const sources={
airport:'https://www.kumamoto-airport.co.jp/access/',
sakura:'https://www.sankobus.jp/busportal/wp-content/uploads/noriba_kuma-bt.pdf',
nanpu:'https://www.miyakoh.co.jp/express/mediafile/nanpu_20260301.pdf',
dentetsu:'https://www.kumamotodentetsu.co.jp/bus/select/cgi/table/program/kdstap.cgi?bs=238',
morning:'https://www.kumamotodentetsu.co.jp/bus/select/cgi/table/program/kdroutep.cgi?bn=13&bs=28',
hotel:'https://kikunan-ublhotel.jp/access/',
seagaia:'https://seagaia.co.jp/access/',
imakin:'https://aso-imakin.com/',
kusasenri:'https://newkusasenri.com/',
sushi:'https://hero-umi.com/brands/ushibukamaru_sakuramachi/',
kouran:'https://www.kourantei.com/',
times:'https://share.timescar.jp/view/sp/station/search.jsp',
timesHokubu:'https://share.timescar.jp/view/station/detail.jsp?scd=MF06'
};
const hotel='菊南温泉ユウベルホテル';
const seagaia='フェニックス・シーガイア・オーシャン・タワー';
const days=[
{n:13,day:'日',area:'熊本',en:'SUNDAY',title:'熊本に着いたら、<br>おいしい旅のはじまり。',desc:'到着日は市内でお寿司、そのあと菊南温泉へ。',note:'寿司を食べる前に、桜町1階の「5番」を下見しておくと15日の朝が安心。',events:[
{time:'10:40',end:'→12:30',type:'booked',status:'予約済み',title:'羽田 → 熊本',text:'ソラシドエア 013便。時刻は予約メールの記載。搭乗口・運航状況は当日の案内で確認。',actions:[['空港到着後の道順','#travel/airport']]},
{time:'到着後',type:'proposed',status:'移動案',title:'4番から、空港リムジン',text:'1階の屋外バスのりばへ。「桜町バスターミナル・熊本駅方面」に乗車し、桜町で下車。',mini:'4',minilabel:'阿蘇くまもと空港',actions:[['乗り場をくわしく','#travel/airport']]},
{time:'遅めの昼',type:'proposed',status:'お店の候補・未予約',title:'天草の魚を、熊本で。',text:'天草 牛深丸 SAKURA MACHI店でお寿司。バスターミナルと同じ建物の3階なので、移動が少なくて楽。',image:'coastal-sushi',imageAlt:'握り寿司のイメージイラスト',actions:[['お店の詳細','#food/sushi']]},
{time:'夕方',type:'shared',status:'宿泊先共有済み',title:hotel,text:'桜町からホテルへ移動。チェックイン15:00〜。部屋・食事プラン・予約時刻は未確認です。',actions:[['ホテルへの行き方','#travel/kikunan'],['宿の情報','#stays']]},
{time:'夜',type:'proposed',status:'過ごし方の提案',title:'温泉で、ひとやすみ。',text:'移動した日は、のんびり。翌日の阿蘇ドライブに向けて、カーシェアの貸出場所と予約時間を確認。',actions:[['カーシェアの準備','#travel/drive']]}
]},
{n:14,day:'月',area:'阿蘇',en:'MONDAY',title:'草千里の風と、<br>念願のあか牛丼。',desc:'タイムズカーで阿蘇へ。朝早めに出て、ゆとりを残す一日。',note:'この日の時刻は計画用の目安。貸出場所・空き状況・道路状況によって調整します。',events:[
{time:'08:00',type:'proposed',status:'出発目安・車は未予約',title:'カーシェアを借りて出発',text:'候補は北区四方寄町の「北部病院」ステーション。ホテル敷地内ではありません。空き・受取場所までの移動を確認してから出発時刻を調整。',actions:[['貸出・返却の確認','#travel/drive']]},
{time:'10:00',type:'proposed',status:'昼食候補・未予約',title:'いまきん食堂のあか牛丼',text:'阿蘇・内牧の老舗へ。10:00開店の公式案内に合わせる案。待ち時間が長ければ、草千里の「ニュー草千里」に切り替えて景色を優先。',image:'akaushi-bowl',imageAlt:'あか牛丼のイメージイラスト',actions:[['お店と代案を見る','#food/imakin'],['いまきんへナビ',dir(hotel,'いまきん食堂 阿蘇市内牧290')]]},
{time:'13:00',end:'目安',type:'proposed',status:'行きたい場所',title:'草千里ヶ浜を、ふたりで歩く',text:'草原と池、阿蘇の山並みを眺めて散策。まずは草千里駐車場へ。滞在は1〜2時間を目安に、写真やコーヒーもゆっくり。',image:'aso-hero',imageAlt:'阿蘇の草原を描いたイメージイラスト',actions:[['草千里へナビ',dir('いまきん食堂 阿蘇市内牧290','草千里駐車場')],['現地の公式案内',sources.kusasenri]]},
{time:'14:30',end:'目安',type:'proposed',status:'休憩の提案',title:'草千里珈琲焙煎所でひと息',text:'ニュー草千里の1階で休憩。天気が崩れたら無理に散策せず、カフェ中心に切り替える。',actions:[['施設の案内',sources.kusasenri]]},
{time:'15:30',end:'出発目安',type:'proposed',status:'帰路の提案',title:'熊本へ戻って、同じ場所へ返却',text:'山道と市街地の渋滞を見込み、帰りは余裕を持って。返却時刻は移動に予備時間を加えて設定。ホテルからの移動も含めて確認。',actions:[['ホテルへナビ',dir('草千里駐車場',hotel)],['返却の確認','#travel/drive']]},
{time:'夜',type:'shared',status:'連泊予定',title:'菊南温泉で、もう一泊',text:'夕食はホテルの食事プランを確認してから。熊本市内で食べるなら、太平燕の紅蘭亭も候補に。',actions:[['熊本のごはん候補','#food']]}
]},
{n:15,day:'火',area:'宮崎',en:'TUESDAY',title:'熊本から宮崎へ。<br>午後はリゾート時間。',desc:'朝は「菊南温泉前」→ 桜町5番。午後は宮崎駅東口へ。',note:'10:00の高速バスは決済済み。予約メールのリンクから本物の乗車券を開く（スクリーンショット不可）。',events:[
{time:'07:50',end:'出発目安',type:'proposed',status:'朝の移動案',title:'チェックアウトして、菊南温泉前へ',text:'ホテル玄関前の「菊南温泉ユウベルホテル」停留所とは別。坂を下りた「菊南温泉前」へ、荷物を持って早めに出発。',actions:[['バス停までの道順','#travel/morning']]},
{time:'08:15',end:'→09:00',type:'proposed',status:'公式平日ダイヤ・未予約',title:'C3-3で、桜町へ',text:'菊南温泉前から「熊本駅・蓮台寺入口行き」に乗車。山室経由、桜町9:00着予定。早い便で余裕を確保。',actions:[['乗り方を見る','#travel/morning']]},
{time:'09:30',end:'集合目安',type:'proposed',status:'早めの準備',title:'赤ホーム・5番のりばへ',text:'1階の赤ホームで「宮崎・なんぷう号」を確認。飲み物とトイレを済ませて、乗車券を表示。',mini:'5',minilabel:'桜町バスターミナル 1F',actions:[['5番への行き方','#travel/sakuramachi']]},
{time:'10:00',end:'→13:35',type:'booked',status:'予約・決済済み',title:'なんぷう号で、宮崎駅へ',text:'53507便。宮崎駅13:35着は2026年3月改正の時刻表による予定。交通状況で遅れる場合があります。',actions:[['乗り場と乗車券の準備','#travel/sakuramachi']]},
{time:'14:00',end:'→14:30',type:'proposed',status:'無料送迎の候補',title:'宮崎駅東口からシーガイアへ',text:'駅東口のホテル無料送迎バス。先着順・予約不要。高速バスが遅れたら、路線バスかタクシーへ切り替える。',actions:[['東口の乗り場を見る','#travel/seagaia']]},
{time:'午後',type:'booked',status:'宿泊予約済み',title:seagaia,text:'2泊・朝夕食付き。到着後に荷物を預けて、チェックイン手続き。',actions:[['宿の情報','#stays']]},
{time:'19:30',type:'booked',status:'確定・時間変更あり',title:'鉄板焼き「ふかみ」',text:'ホテルからの案内で19:00希望→19:30に確定。追加料金は2人で20,000円。',actions:[['夕食メモ','#stays']]}
]},
{n:16,day:'水',area:'宮崎',en:'WEDNESDAY',title:'予定を詰めない、<br>海辺の休日。',desc:'今日はシーガイアでのんびり。夜のディナーだけ時間を決めて。',note:'日中の外出やアクティビティは未予約。天気と気分に合わせて選ぼう。',events:[
{time:'朝',type:'booked',status:'朝食付きプラン',title:'ゆっくり朝ごはん',text:'朝食の会場と時間は、チェックイン時に案内を確認。'},
{time:'午前',type:'proposed',status:'過ごし方の提案',title:'ホテルでゆっくり過ごす',text:'景色を眺めたり、温泉やカフェへ。無理に遠出を入れず、ふたりのペースで。',image:'miyazaki-coast',imageAlt:'宮崎の海辺をイメージした架空の風景イラスト',actions:[['リゾート公式サイト','https://seagaia.co.jp/']]},
{time:'午後',type:'proposed',status:'自由時間',title:'お土産も、休憩も。',text:'明日は14:10発の飛行機。空港までの車を手配するなら、この日のうちにフロントへ相談。',actions:[['帰りの移動','#travel/airport-return']]},
{time:'19:00',type:'booked',status:'夕食予約済み',title:'リストランテアルコ',text:'2人でゆっくりディナー。追加料金は2人で4,600円。',actions:[['夕食メモ','#stays']]}
]},
{n:17,day:'木',area:'帰路',en:'THURSDAY',title:'最後までゆったり。<br>また、九州に来よう。',desc:'荷物をまとめて、昼には宮崎空港へ。',note:'木曜はホテル〜空港の土日祝限定直行バスに頼らず、タクシー案を基本に。',events:[
{time:'朝',type:'booked',status:'朝食付きプラン',title:'最後の朝食と荷造り',text:'チェックアウト締切はホテルで確認。追加の夕食料金や税などを精算。'},
{time:'12:00',end:'出発目安',type:'proposed',status:'タクシーは未手配',title:'ホテルから宮崎空港へ',text:'車で約25分の公式目安に余裕を加え、12:00出発を提案。空港到着は12:30頃を目標に。',actions:[['帰りの移動ガイド','#travel/airport-return']]},
{time:'12:30',end:'到着目標',type:'proposed',status:'余裕を持った到着案',title:'空港で荷物・お土産・保安検査',text:'搭乗口と締切を当日の案内で確認して、早めに手続きを。'},
{time:'14:10',end:'→15:55',type:'booked',status:'予約済み',title:'宮崎 → 羽田',text:'ソラシドエア 060便。帰りの時刻は予約メールの記載。おつかれさま、また次の旅へ。'}
]}
];
const photo=(file,alt,cls='')=>'<figure class="illustration '+cls+'"><img src="assets/'+file+'.webp" alt="'+esc(alt)+'" loading="lazy" width="1536" height="1024"><figcaption>旅のイメージイラスト · 実景・実際の料理の写真ではありません</figcaption></figure>';
const timeline=day=>'<div class="day-intro"><p class="eyebrow">SEPTEMBER '+day.n+' · '+day.en+'</p><h3>'+day.title+'</h3><p>'+day.desc+'</p></div><p class="day-note">'+icon('pin')+'<span>'+day.note+'</span></p><ol class="timeline">'+day.events.map(e=>'<li><div class="time">'+e.time+(e.end?'<span>'+e.end+'</span>':'')+'</div><article class="event"><span class="badge '+e.type+'">'+e.status+'</span><h4>'+e.title+'</h4>'+(e.image?photo(e.image,e.imageAlt,'event-photo'):'')+'<p>'+e.text+'</p>'+(e.mini?'<div class="mini-platform"><strong>'+e.mini+'</strong><span>'+e.minilabel+'<br>のりば</span></div>':'')+(e.actions?'<div class="actions">'+e.actions.map(a=>link(a[0],a[1])).join('')+'</div>':'')+'</article></li>').join('')+'</ol>';
const step=(title,body)=>'<li><strong>'+title+'</strong><p>'+body+'</p></li>';
const routeHead=(key,title,sub,n,klass='')=>'<details class="route-card '+klass+'" id="guide-'+key+'"><summary><span class="route-summary-icon">'+icon(key==='drive'?'car':'bus')+'</span><span><small>'+sub+'</small><strong>'+title+'</strong></span><span class="route-chevron">+</span></summary><div class="route-body">'+(n?'<div class="platform-board"><div><small>'+sub+'</small><strong>'+title+'</strong></div><div class="platform-number">'+n+'<small>のりば</small></div></div>':'');
const closeRoute='</div></details>';
const travelHTML='<div class="section-heading"><div><p class="eyebrow">GETTING THERE</p><h2>迷わない移動ガイド</h2></div></div><p class="view-lead">乗り場、乗る方向、降りる場所。<br>移動のたびに、ここを開けば大丈夫。</p><div class="route-chips">'+[['airport','空港 → 熊本'],['morning','ホテル → 桜町'],['sakuramachi','宮崎行き5番'],['drive','阿蘇ドライブ'],['seagaia','宮崎駅 → 宿'],['airport-return','帰りの空港']].map(x=>'<a href="#travel/'+x[0]+'">'+x[1]+'</a>').join('')+'</div>'+
routeHead('airport','熊本市内行き','9/13 · 阿蘇くまもと空港 1F','4')+'<ol class="steps">'+step('到着後、1階で荷物を受け取る','「バス・タクシー」の案内に従って屋外へ。')+step('4番のりばの表示を確認','空港リムジン「桜町バスターミナル・熊本駅方面」。現地の行先表示を優先。')+step('「桜町バスターミナル」で降りる','牛深丸は同じ建物の3階。ホテルへ先に行く場合も、市内からの移動を確認。')+'</ol><div class="actions">'+link('公式の空港案内',sources.airport,true)+link('空港のバス停地図','https://transfer.navitime.biz/sankobus-customer/pc/diagram/BusAboardMap?stCode=00270898')+'</div><p class="fine">発車便は手荷物受取後に選択。航空便との接続保証はありません。</p>'+closeRoute+
routeHead('kikunan','桜町から菊南温泉へ','9/13 · ホテルまでの移動案','')+'<ol class="steps">'+step('荷物が多ければタクシーが分かりやすい','行先は「菊南温泉ユウベルホテル」。ホテルは熊本市北部です。配車時に所要時間と料金を確認。')+step('バスなら、桜町の17番を確認','C系統の北熊本・菊池方面。「菊南温泉前」に止まる便か、運転手さんに確認。17番には別経路の便もあるので、行先だけで判断しない。')+step('「菊南温泉前」で下車してホテルへ','ホテル公式案内では徒歩約5分。坂道と荷物の分を見込もう。「菊南温泉ユウベルホテル」停留所とは別です。')+'</ol><div class="actions">'+link('ホテルまでの経路',dir('熊本桜町バスターミナル',hotel,'transit'),true)+link('ホテル公式アクセス',sources.hotel)+link('桜町の構内図',sources.sakura)+'</div>'+closeRoute+
routeHead('morning','菊南温泉前 → 桜町','9/15 火 · 早めに着くバス案','')+'<div class="transfer-ticket"><div><small>菊南温泉前</small><strong>08:15</strong></div><span>→</span><div><small>桜町バスターミナル</small><strong>09:00</strong></div></div><div class="alert-box"><strong>ホテル玄関前の停留所とは別です</strong><p>「菊南温泉ユウベルホテル」停留所の平日桜町方面は、公式時刻表では10:06発。予約した10:00の高速バスには間に合いません。</p></div><ol class="steps">'+step('07:50頃にホテルを出る案','先に精算を済ませる。坂を下りて「菊南温泉前」へ。乗り場までの徒歩経路を地図で確認。')+step('市内へ向かう側で「C3-3」を確認','08:15発・山室経由「熊本駅（蓮台寺入口）行き」。運転手さんに「桜町に行きますか？」と確認すると確実。')+step('09:00頃、桜町で下車','公式平日ダイヤの予定。1階赤ホームの5番へ移動。遅れが大きい場合はタクシーへの切り替えを検討。')+'</ol><div class="fare">運賃目安 <strong>1人510円</strong><span>現金・対応クレジットカードのタッチ決済など。Suicaだけで行かない。</span></div><div class="actions">'+link('バス停まで歩く',dir(hotel,'菊南温泉前 バス停 熊本電鉄','walking'),true)+link('08:15便の公式経路',sources.morning)+link('平日バス時刻表',sources.dentetsu)+'</div>'+source('決済方法の公式案内','https://jmpo.kumamoto-toshibus.co.jp/iclp/')+closeRoute+
routeHead('sakuramachi','宮崎行き・なんぷう号','9/15 火 · 桜町バスターミナル 1F','5','important-route')+'<div class="transfer-ticket"><div><small>桜町 発</small><strong>10:00</strong></div><span>→</span><div><small>宮崎駅 着予定</small><strong>13:35</strong></div></div><div class="terminal-key"><span>1階</span><span class="red-home">赤ホーム</span><strong>5番</strong><span>「宮崎」を確認</span></div><ol class="steps">'+step('赤色の案内サインを探す','宮崎方面は1階の赤ホーム・5番。青ホームから移るときは、構内図に従って2階コンコース経由で移動する。車道は横断しない。')+step('09:30頃までに5番へ行く案','発車案内の「10:00 宮崎・なんぷう号」を確認。飲み物、トイレ、乗車券表示を済ませる。')+step('メールから本物の乗車券を表示','決済完了メールのリンクを開き、乗務員さんに提示。スクリーンショットや予約確認画面では乗車できません。')+'</ol><div class="actions">'+link('公式の構内図を開く',sources.sakura,true)+link('ターミナルへナビ',map('熊本桜町バスターミナル'))+link('なんぷう号の公式時刻表',sources.nanpu)+'</div><p class="fine">発車時刻は予約メール、到着時刻は2026年3月改正時刻表を確認。乗り場が変更された場合は現地案内を優先。</p>'+closeRoute+
routeHead('drive','ホテルを起点に、阿蘇ドライブ','9/14 月 · タイムズカーシェア','')+'<div class="route-ribbon"><span>菊南温泉</span><b>→</b><span>内牧・あか牛</span><b>→</b><span>草千里</span><b>→</b><span>熊本へ</span></div><div class="alert-box neutral"><strong>車はまだ予約していません</strong><p>公式ページで確認できた候補は「北部病院」（熊本市北区四方寄町）。ホテル敷地内ではありません。最寄りとは未確認です。9/14の空き・車種・利用条件と、ホテルから受取場所への移動を確認してから確定。</p></div><ol class="steps">'+step('出発と返却は同じステーション','一般的なタイムズカー利用では、借りた場所に戻す。宮崎へ乗り捨てる旅程にはしない。')+step('08:00出発、10:00内牧到着を目標に','貸出場所が決まったらナビで再計算。いまきんの待ち時間が長い日は、ニュー草千里のあか牛へ切り替える。')+step('草千里を主役に、午後は余裕を残す','徒歩散策・カフェで約1〜2時間。帰りは渋滞と山道を見込み、早めに戻る。')+'</ol><div class="actions">'+link('北部病院ステーションの詳細',sources.timesHokubu,true)+link('ホテルから受取場所へ',dir(hotel,'タイムズカー 北部病院 熊本市北区四方寄町'))+link('ほかのステーションを探す',sources.times)+link('ホテル → 内牧 → 草千里',dir(hotel,'草千里駐車場','driving','いまきん食堂 阿蘇市内牧290'))+'</div><p class="fine">運転免許証・ETCカード・返却時間を確認。実際のルートと所要時間は当日のナビを優先。</p><details class="sub-details"><summary>車が借りられない場合</summary><p>熊本駅からJRで阿蘇駅へ、阿蘇駅前から阿蘇登山線で「草千里阿蘇火山博物館前」へ。いまきんへの寄り道は外し、草千里周辺で昼食にすると組みやすい。</p>'+link('阿蘇登山線の公式時刻表','https://www.sankobus.jp/bus/asosen/jikoku/')+'<p class="fine">JRの便と乗継時間は未確定。車が取れなかった時点で組み直す代案です。</p></details>'+closeRoute+
routeHead('seagaia','宮崎駅 → シーガイア','9/15 火 · 無料送迎バスの候補','')+'<div class="transfer-ticket"><div><small>宮崎駅 東口</small><strong>14:00</strong></div><span>→</span><div><small>ホテル 着</small><strong>14:30</strong></div></div><ol class="steps">'+step('高速バスを宮崎駅で降りる','13:35着予定。降車した場所の駅案内を見て「東口」へ移動。西口に出た場合は駅の東西通路を使う。')+step('東口のホテル無料送迎バスへ','予約不要・先着順。ホテル名を確認して乗車。公式の乗り場図を開くと場所を確認できます。')+step('遅れた・満席だったら切り替える','タクシー、または西口「西2」からシーガイア方面の路線バスへ。無料送迎とは出口が違います。')+'</ol><div class="actions">'+link('公式の乗り場・時刻表',sources.seagaia,true)+link('宮崎駅東口の地図',map('宮崎駅 東口'))+'</div><p class="fine">無料送迎は11:00・14:00の駅発を公式案内で確認。予約した高速バスとの接続保証はありません。</p>'+closeRoute+
routeHead('airport-return','ホテル → 宮崎空港','9/17 木 · 帰りの移動案','')+'<div class="transfer-ticket"><div><small>ホテル 出発目安</small><strong>12:00</strong></div><span>→</span><div><small>空港 到着目標</small><strong>12:30</strong></div></div><ol class="steps">'+step('前日までにタクシーを相談','フロントに「17日、14:10発の飛行機」と伝える。配車はまだしていません。')+step('12:00頃、ホテルを出発する案','公式案内では空港まで車で約25分。道路状況に応じて、さらに早める。')+step('14:10発 ソラシドエア060便','羽田15:55着予定。保安検査・搭乗口へは余裕を持って。')+'</ol><div class="alert-box neutral"><strong>空港直行バスは土日祝限定の案内</strong><p>17日は木曜。平日はタクシー、または宮崎駅経由の鉄道・路線バスで考える。</p></div><div class="actions">'+link('空港までのルート',dir(seagaia,'宮崎空港'),true)+link('ホテル公式アクセス',sources.seagaia)+'</div>'+closeRoute;
const foods=[
{id:'imakin',title:'いまきん食堂',category:'あか牛丼',area:'阿蘇・内牧',image:'akaushi-bowl',desc:'あか牛を食べるなら、まず候補にしたい阿蘇・内牧の老舗。14日のドライブで、開店に合わせて向かう案。',detail:'公式案内：10:00〜16:00受付終了。混雑・臨時休業・当日の受付はお店で確認。',tip:'長く待つ日は、草千里の滞在時間を優先して次の候補へ。',map:'いまきん食堂 阿蘇市内牧290',url:sources.imakin},
{id:'sushi',title:'天草 牛深丸',sub:'SAKURA MACHI店',category:'天草の寿司',area:'桜町・同じ建物の3F',image:'coastal-sushi',desc:'天草・牛深の魚を熊本市内で。初日の空港バスを降りたら、同じ建物の3階へ行ける、今回の旅に合う寿司候補。',detail:'11:00〜22:00、入店受付21:00まで・L.O.21:30。店のおすすめは「牛深丸5貫盛り」。',tip:'15日は10:00出発で開店前。食べるなら13日の遅い昼がおすすめ。',map:'天草 牛深丸 SAKURA MACHI店',url:sources.sushi},
{id:'kusasenri',title:'ニュー草千里',category:'あか牛・カフェ',area:'草千里の目の前',desc:'草千里を眺めながら、あか牛丼や郷土料理を。いまきんで待ちそうな日は、移動を減らせるこちらへ。',detail:'1階には草千里珈琲焙煎所と物産館。食事・カフェの営業時間は当日の公式案内を確認。',tip:'草千里が旅の主役なら、こちらを最初から昼食にしても。',map:'ニュー草千里 阿蘇',url:sources.kusasenri},
{id:'kouran',title:'紅蘭亭',sub:'下通本店',category:'熊本名物・太平燕',area:'熊本市中心部',desc:'熊本らしい一杯なら、野菜や海鮮と春雨の「太平燕」。あか牛や寿司とは違う郷土の味を楽しむ候補。',detail:'営業日・時間・メニューは公式サイトの下通本店案内で確認。ホテルからは市内への移動が必要。',tip:'13日の寿司の代案、または14日に市内で夕食を取る場合に。',map:'紅蘭亭 下通本店',url:sources.kouran}
];
const foodHTML='<div class="section-heading"><div><p class="eyebrow">GOOD FOOD, GOOD MEMORIES</p><h2>熊本で食べたいもの</h2></div></div><p class="view-lead">あか牛、天草の魚、熊本の名物。<br>今回の動線に合うお店を、少しだけ厳選。</p><p class="caption-note">掲載店はすべて候補・未予約。写真風の絵は料理のイメージです。</p>'+foods.map((f,i)=>'<article class="food-card" id="food-'+f.id+'">'+(f.image?photo(f.image,f.category+'のイメージイラスト','food-photo'):'')+'<div class="food-copy"><p class="food-category"><span>0'+(i+1)+' / '+f.category+'</span>'+f.area+'</p><h3>'+f.title+(f.sub?'<small>'+f.sub+'</small>':'')+'</h3><p>'+f.desc+'</p><p class="food-tip">'+f.tip+'</p><details class="sub-details"><summary>営業情報・お店の確認</summary><p>'+f.detail+'</p>'+source('公式サイト',f.url)+'</details><div class="actions">'+link('地図を開く',map(f.map),true)+link('公式サイト',f.url)+'</div></div></article>').join('')+'<p class="fine">空席・臨時休業は未確認です。候補を選んでから予約・営業確認を。</p>';
const staysHTML='<div class="section-heading"><div><p class="eyebrow">STAY & UNWIND</p><h2>ふたりの宿とメモ</h2></div></div><p class="view-lead">熊本は温泉、宮崎はリゾート。<br>宿に着いてからも、ゆっくり楽しもう。</p><article class="stay-card"><div class="stay-top"><span class="stay-number">01</span><div><p class="eyebrow">KUMAMOTO · 2 NIGHTS</p><h3>菊南温泉<br>ユウベルホテル</h3></div></div><span class="badge shared">宿泊先は本人共有・予約内容未確認</span><dl class="facts"><div><dt>日程</dt><dd>9/13（日）〜9/15（火）</dd></div><div><dt>施設案内</dt><dd>IN 15:00 ／ OUT 10:00</dd></div><div><dt>朝の出発</dt><dd>15日は07:50頃に出る案</dd></div><div><dt>住所</dt><dd>熊本市北区鶴羽田3-10-1</dd></div></dl><p>部屋・食事・宿泊料金は未確認。15日は朝食と精算を早めに済ませる。</p><div class="actions">'+link('ホテルの地図',map(hotel),true)+link('公式サイト','https://kikunan-ublhotel.jp/')+link('15日朝の移動','#travel/morning')+'</div></article><article class="stay-card">'+photo('miyazaki-coast','宮崎の海辺を描いた架空のイメージイラスト','stay-photo')+'<div class="stay-top"><span class="stay-number">02</span><div><p class="eyebrow">MIYAZAKI · 2 NIGHTS</p><h3>フェニックス・シーガイア<br>オーシャン・タワー</h3></div></div><span class="badge booked">予約メール確認済み</span><dl class="facts"><div><dt>日程</dt><dd>9/15（火）〜9/17（木）</dd></div><div><dt>お部屋</dt><dd>スタンダードツイン・禁煙</dd></div><div><dt>食事</dt><dd>朝食・夕食付き</dd></div><div><dt>到着案</dt><dd>15日 14:30頃</dd></div></dl><div class="dinner"><div><small>9/15 火</small><strong>19:30</strong></div><div><h4>鉄板焼き「ふかみ」</h4><p>19:00希望から変更・確定<br>追加 20,000円／2人</p></div></div><div class="dinner"><div><small>9/16 水</small><strong>19:00</strong></div><div><h4>リストランテアルコ</h4><p>予約確定<br>追加 4,600円／2人</p></div></div><details class="sub-details"><summary>現地精算のメモ</summary><p>宿泊予約額70,680円＋夕食追加24,600円＝95,280円（2人分・別途税）。予約メール記載の入湯税・宿泊税、追加利用分はホテルで精算。</p><p>熊本の宿・カーシェア・その他の食事代は含みません。</p></details><div class="actions">'+link('ホテルの地図',map(seagaia),true)+link('公式アクセス',sources.seagaia)+'</div></article><div class="memo-card"><h3>出発までに決めること</h3><ul><li>14日のカーシェア：貸出場所・時間・空き</li><li>菊南温泉の予約内容：朝夕食とチェックイン予定</li><li>17日の空港行きタクシー</li></ul><p class="fine">このページには予約番号・個人の連絡先・乗車券URLは載せていません。</p></div>';
document.getElementById('share').innerHTML=icon('share');
document.getElementById('cover-image').innerHTML='<img src="assets/aso-hero.webp" alt="阿蘇の草原を望むふたりのイメージイラスト" width="1536" height="1024" fetchpriority="high"><span class="cover-art-label">旅のイメージイラスト</span>';
const main=document.getElementById('main');
main.insertAdjacentHTML('beforeend','<section id="travel" class="view" hidden>'+travelHTML+'</section><section id="food" class="view" hidden>'+foodHTML+'</section><section id="stays" class="view" hidden>'+staysHTML+'</section>');
document.querySelector('.day-tabs').innerHTML=days.map((d,i)=>'<button role="tab" aria-selected="'+(i===0)+'" tabindex="'+(i===0?0:-1)+'" data-day="'+d.n+'" id="tab-'+d.n+'" aria-controls="day-panel"><small>DAY '+(i+1)+'</small><strong>'+d.n+'</strong><span>'+d.day+'・'+d.area+'</span></button>').join('');
document.querySelector('.section-heading').insertAdjacentHTML('beforebegin','<a class="quick-guide" href="#travel/sakuramachi"><span class="quick-icon">'+icon('bus')+'</span><span><small>15日、熊本から宮崎へ</small><strong>10:00発 ／ 桜町 <b>5</b>番のりば</strong></span>'+icon('arrow')+'</a>');
document.body.insertAdjacentHTML('beforeend','<nav class="bottom-nav" aria-label="しおりのメニュー">'+[['itinerary','map','旅の予定'],['travel','bus','移動ガイド'],['food','food','食べたい'],['stays','stay','宿とメモ']].map(x=>'<a href="#'+x[0]+'" data-view="'+x[0]+'">'+icon(x[1])+'<span>'+x[2]+'</span></a>').join('')+'</nav>');
let selectedDay=13;
function renderDay(n){const d=days.find(x=>x.n===Number(n))||days[0];selectedDay=d.n;document.getElementById('day-panel').innerHTML=timeline(d);document.getElementById('day-panel').setAttribute('aria-labelledby','tab-'+d.n);document.querySelectorAll('[data-day]').forEach(b=>{const active=Number(b.dataset.day)===d.n;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});}
function route(){
const parts=location.hash.replace(/^#/,'').split('/');const valid=['itinerary','travel','food','stays'];const v=valid.includes(parts[0])?parts[0]:'itinerary';
document.querySelectorAll('.view').forEach(el=>el.hidden=el.id!==v);
document.querySelectorAll('[data-view]').forEach(a=>{if(a.dataset.view===v)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
document.body.dataset.view=v;
if(v==='itinerary')renderDay(parts[1]||selectedDay);
const dest=v==='travel'&&parts[1]?document.getElementById('guide-'+parts[1]):v==='food'&&parts[1]?document.getElementById('food-'+parts[1]):null;
if(dest){if(dest.tagName==='DETAILS')dest.open=true;requestAnimationFrame(()=>dest.scrollIntoView({block:'start',behavior:'smooth'}));}
else if(location.hash)requestAnimationFrame(()=>main.scrollIntoView({block:'start'}));
}
document.querySelector('.day-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(b){renderDay(b.dataset.day);history.replaceState(null,'','#itinerary/'+b.dataset.day);}});
document.querySelector('.day-tabs').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const list=[...document.querySelectorAll('[data-day]')];let i=list.indexOf(document.activeElement);if(e.key==='Home')i=0;else if(e.key==='End')i=4;else i=(i+(e.key==='ArrowRight'?1:-1)+5)%5;list[i].focus();list[i].click();});
let toastTimer;
const toast=(message)=>{clearTimeout(toastTimer);const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');toastTimer=setTimeout(()=>el.classList.remove('show'),4000);};
document.getElementById('share').addEventListener('click',async()=>{try{const url=location.origin+location.pathname;if(navigator.share)await navigator.share({title:'ふたりの九州旅',url});else if(navigator.clipboard){await navigator.clipboard.writeText(url);toast('しおりのURLをコピーしました');}else toast('ブラウザの共有メニューからURLを送れます');}catch(e){if(e.name!=='AbortError')toast('ブラウザの共有メニューからURLを送れます');}});
window.addEventListener('hashchange',route);
if(!location.hash){const jst=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());if(jst>='2026-09-13'&&jst<='2026-09-17')selectedDay=Number(jst.slice(-2));}
route();
