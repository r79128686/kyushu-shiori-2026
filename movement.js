'use strict';
// A map belongs to its movement card. Instances are released on every view change.
const transportStyles={plane:{label:'飛行機',color:'#2c6ba0'},bus:{label:'バス',color:'#8555a5'},car:{label:'車',color:'#27796b'},walk:{label:'徒歩',color:'#ab6a25'},train:{label:'電車',color:'#b64e59'}};
let movementMaps=[],movementObserver=null,movementIndex=0;
function movementMap(from,to,kind){
 const key='move-map-'+(++movementIndex),a=point(from),b=point(to);
 return '<div class="movement-map" id="'+key+'" data-from="'+escapeHTML(from)+'" data-to="'+escapeHTML(to)+'" data-mode="'+kind+'" aria-label="'+escapeHTML(a.name+'から'+b.name+'への移動地図')+'"><div class="map-fallback"><span>A</span><i>······ → ······</i><span>B</span></div></div><p class="movement-caption">A 出発 → B 到着 · 点線は位置関係（道路の経路ではありません）</p>';
}
function moveStop(time,from,to,o={}){
 const kind=o.kind||'bus',style=transportStyles[kind],a=point(from),b=point(to);
 const h='<div class="movement-card mode-'+kind+'"><div class="transport-band">'+icon(kind)+'<b>'+escapeHTML(o.label||style.label)+'</b><span>'+(o.booked?'予約済み':o.duration||'移動の案')+'</span></div><div class="movement-endpoints"><div><small><i>A</i> ここから</small><strong>'+escapeHTML(o.start||'')+'</strong><b>'+escapeHTML(o.fromLabel||a.name)+'</b></div><span class="movement-arrow">→</span><div><small><i>B</i> ここへ</small><strong>'+escapeHTML(o.end||'')+'</strong><b>'+escapeHTML(o.toLabel||b.name)+'</b></div></div>'+movementMap(from,to,kind)+(o.note?'<p class="movement-note">'+escapeHTML(o.note)+'</p>':'')+(o.details||'')+'</div>';
 return '<li class="trip-stop move '+kind+'"><div class="stop-head"><span class="time">'+time+'</span><h3>'+icon(kind)+' '+escapeHTML(o.title||'移動')+'</h3></div>'+h+'</li>';
}
function releaseMovementMaps(){if(movementObserver)movementObserver.disconnect();movementObserver=null;movementMaps.forEach(m=>m.remove());movementMaps=[];movementIndex=0}
function initMovementMaps(){
 const mount=el=>{
  const a=point(el.dataset.from),b=point(el.dataset.to);if(!a.coords||!b.coords||!window.L)return;
  const kind=el.dataset.mode,color=transportStyles[kind].color;
  const m=L.map(el,{scrollWheelZoom:false,dragging:!L.Browser.mobile,tap:false,zoomControl:false,attributionControl:true});movementMaps.push(m);
  const line=[a.coords,b.coords];m.fitBounds(L.latLngBounds(line),{padding:[42,36],maxZoom:kind==='walk'?17:kind==='plane'?5:14,animate:false});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(m);
  L.polyline(line,{color,weight:4,dashArray:'7 8',opacity:.9}).addTo(m);
  [a,b].forEach((p,i)=>L.marker(p.coords,{icon:L.divIcon({className:'movement-pin',html:'<span style="background:'+color+'">'+(i?'B':'A')+'</span>',iconSize:[32,40],iconAnchor:[16,36]})}).addTo(m).bindTooltip(escapeHTML(p.name),{direction:i?'bottom':'top',permanent:true,className:'movement-place',offset:[0,i?7:-31]}));
  L.control.zoom({position:'topright'}).addTo(m);el.querySelector('.map-fallback')?.remove();
 };
 const els=document.querySelectorAll('.movement-map');
 if('IntersectionObserver'in window){movementObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){movementObserver.unobserve(e.target);mount(e.target)}}),{rootMargin:'100px'});els.forEach(el=>movementObserver.observe(el))}else els.forEach(mount);
}
function reservationCard(title,rows,note='',details=''){
 return '<section class="reservation-card"><div class="reservation-head"><span class="reservation-symbol">✓</span><h4>'+title+'</h4><span>予約メモ</span></div><dl>'+rows.map(([a,b])=>'<div><dt>'+a+'</dt><dd>'+b+'</dd></div>').join('')+'</dl>'+(note?'<p>'+note+'</p>':'')+(details?'<details><summary>メールの詳しい案内</summary>'+details+'</details>':'')+'</section>';
}
