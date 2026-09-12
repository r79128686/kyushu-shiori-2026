// Personal packing state stays on this browser; the public itinerary has no accounts.
const PACKING_KEY='kyushu-packing-v1';
const packingDefaults=['財布・身分証','運転免許証','スマホ','充電器・ケーブル','モバイルバッテリー','着替え・下着（4泊分）','洗面用品・スキンケア','常備薬','折りたたみ傘','帽子・日焼け止め','歩きやすい靴','航空券・乗車券の確認'];
let packingItems=[],packingDraft='',packingMessage='',packingRemoved=null;
function loadPacking(){
 try{
  const raw=localStorage.getItem(PACKING_KEY);
  if(raw===null||raw===undefined){packingItems=packingDefaults.map((text,i)=>({id:'default-'+i,text,done:false}));return}
  const data=JSON.parse(raw);
  if(!Array.isArray(data)||data.length>200||data.some(x=>!x||typeof x.id!=='string'||!/^[a-zA-Z0-9-]{1,80}$/.test(x.id)||typeof x.text!=='string'||!x.text.trim()||x.text.length>120||typeof x.done!=='boolean')||new Set(data.map(x=>x.id)).size!==data.length)throw new Error('Invalid checklist');
  packingItems=data.map(({id,text,done})=>({id,text,done}));
  packingMessage='';
 }catch(e){
  packingItems=packingDefaults.map((text,i)=>({id:'default-'+i,text,done:false}));
  packingMessage='保存したリストを読み込めませんでした。この画面では操作できます。';
 }
}
function savePacking(){
 try{localStorage.setItem(PACKING_KEY,JSON.stringify(packingItems));packingMessage=''}
 catch(e){packingMessage='保存できませんでした。画面を閉じると変更が失われる場合があります。'}
}
function packingRow(item){return '<li class="packing-row'+(item.done?' is-packed':'')+'" data-packing-row="'+item.id+'"><label><input type="checkbox" data-packing-check="'+item.id+'"'+(item.done?' checked':'')+'><span>'+escapeHTML(item.text)+'</span></label><button type="button" class="packing-delete" data-packing-delete="'+item.id+'" aria-label="'+escapeHTML(item.text)+'を削除"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 8l8 8M16 8l-8 8"/></svg></button></li>'}
function packingHTML(){
 const done=packingItems.filter(x=>x.done).length,total=packingItems.length;
 return '<section class="packing-screen" aria-labelledby="packing-title"><header class="packing-heading"><div class="packing-bag" aria-hidden="true">'+icon('bag')+'</div><div><p class="eyebrow">READY TO GO</p><h2 id="packing-title">忘れ物チェック</h2><p>荷物に入れたら、チェック。</p></div></header><div class="packing-progress-card"><div class="packing-progress-top"><p id="packing-progress-label">'+packingProgressLabel(done,total)+'</p><p class="packing-counter"><strong id="packing-done">'+done+'</strong><span> / <span id="packing-total">'+total+'</span></span></p></div><progress id="packing-progress" max="'+Math.max(total,1)+'" value="'+done+'" aria-label="準備できた持ち物"></progress><p class="packing-save-note">この端末に自動保存</p></div><form id="packing-form" class="packing-form"><label for="packing-input">持ち物を追加</label><div class="packing-input-row"><input id="packing-input" type="text" maxlength="120" placeholder="例：サングラス" autocomplete="off" enterkeyhint="done" value="'+escapeHTML(packingDraft)+'"><button type="submit"><span aria-hidden="true">＋</span>追加</button></div></form><p id="packing-status" class="packing-status" role="status" aria-live="polite"></p><div class="packing-list-heading"><h3>持ち物リスト</h3><button type="button" id="packing-undo"'+(packingRemoved?'':' hidden')+'>削除を戻す</button></div><ul id="packing-list" class="packing-list">'+packingItems.map(packingRow).join('')+'</ul><p id="packing-empty" class="packing-empty"'+(total?' hidden':'')+'>持ち物を追加して、準備をはじめよう。</p><p id="packing-save-error" class="packing-save-error" role="alert"'+(packingMessage?'':' hidden')+'>'+escapeHTML(packingMessage)+'</p><p class="packing-local-note">追加した項目・チェックは、共有相手とは自動同期しません。</p></section>';
}
function packingProgressLabel(done,total){return total&&done===total?'準備できました。いってらっしゃい！':total?'あと '+(total-done)+' 個で準備完了':'持ち物を追加してスタート'}
function refreshPacking(message){
 const done=packingItems.filter(x=>x.done).length,total=packingItems.length;
 document.getElementById('packing-done').textContent=done;
 document.getElementById('packing-total').textContent=total;
 document.getElementById('packing-progress-label').textContent=packingProgressLabel(done,total);
 const progress=document.getElementById('packing-progress');progress.max=Math.max(total,1);progress.value=done;
 document.getElementById('packing-empty').hidden=total>0;
 document.getElementById('packing-undo').hidden=!packingRemoved;
 const error=document.getElementById('packing-save-error');error.hidden=!packingMessage;error.textContent=packingMessage;
 document.getElementById('packing-status').textContent=message||'';
}
function bindPacking(){
 const form=document.getElementById('packing-form'),input=document.getElementById('packing-input'),list=document.getElementById('packing-list');
 input.addEventListener('input',()=>{packingDraft=input.value});
 form.addEventListener('submit',e=>{
  e.preventDefault();const text=input.value.trim();
  if(!text){document.getElementById('packing-status').textContent='持ち物の名前を入力してください。';input.focus();return}
  if(text.length>120){document.getElementById('packing-status').textContent='120文字以内で入力してください。';return}
  if(packingItems.length>=200){document.getElementById('packing-status').textContent='200個まで追加できます。不要な項目を削除してください。';return}
  if(packingItems.some(x=>x.text===text)){document.getElementById('packing-status').textContent='その持ち物はリストにあります。';input.focus();return}
  const item={id:'p-'+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10)),text,done:false};
  packingItems.unshift(item);packingDraft='';input.value='';savePacking();list.insertAdjacentHTML('afterbegin',packingRow(item));refreshPacking('「'+text+'」を追加しました。');input.focus();
 });
 list.addEventListener('change',e=>{
  const checkbox=e.target.closest('[data-packing-check]');if(!checkbox)return;
  const item=packingItems.find(x=>x.id===checkbox.dataset.packingCheck);if(!item)return;
  item.done=checkbox.checked;savePacking();checkbox.closest('.packing-row').classList.toggle('is-packed',item.done);refreshPacking(packingProgressLabel(packingItems.filter(x=>x.done).length,packingItems.length));
 });
 list.addEventListener('click',e=>{
  const button=e.target.closest('[data-packing-delete]');if(!button)return;
  const index=packingItems.findIndex(x=>x.id===button.dataset.packingDelete);if(index<0)return;
  const row=button.closest('.packing-row'),next=(row.nextElementSibling||row.previousElementSibling)?.querySelector('input');
  packingRemoved={item:packingItems[index],index};packingItems.splice(index,1);row.remove();savePacking();refreshPacking('「'+packingRemoved.item.text+'」を削除しました。');(next||input).focus();
 });
 document.getElementById('packing-undo').addEventListener('click',()=>{
  if(!packingRemoved)return;
  if(packingItems.length>=200){refreshPacking('200個まで追加できます。不要な項目を削除してください。');return}
  const {item,index}=packingRemoved;packingItems.splice(Math.min(index,packingItems.length),0,item);packingRemoved=null;list.innerHTML=packingItems.map(packingRow).join('');savePacking();refreshPacking('「'+item.text+'」を戻しました。');list.querySelector('[data-packing-check="'+item.id+'"]').focus();
 });
}
loadPacking();
