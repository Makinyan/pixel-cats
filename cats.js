const cats = [
  {name:'Персик', caption:'Утро на кухне', alt:'Рыжий полосатый кот на кухне рядом с чашкой, в окно светит солнце.', world:'kitchen', fur:'#ef9850', shade:'#bb563a', light:'#ffd78e', nose:'#a73960', eye:'#3d2944'},
  {name:'Полночь', caption:'Луна над крышами', alt:'Чёрный кот на черепичной крыше под большой луной.', world:'roof', fur:'#393755', shade:'#24213e', light:'#6a678d', nose:'#dc84ae', eye:'#fbe79a'},
  {name:'Плюшка', caption:'Полевые цветы', alt:'Трёхцветная кошка среди полевых цветов на фоне зелёных холмов.', world:'field', fur:'#fff0d8', shade:'#d3aab0', light:'#fffcf1', nose:'#c46c86', eye:'#304936'},
  {name:'Туман', caption:'Дождь за окном', alt:'Серый полосатый кот на подоконнике за дождевыми струями и рядом с растением.', world:'rain', fur:'#a0a2bd', shade:'#676985', light:'#d2d5e0', nose:'#a45b81', eye:'#392b4c'},
  {name:'Снежок', caption:'Зимний лес', alt:'Белый пушистый кот в синем шарфе сидит на снегу среди елей.', world:'snow', fur:'#fbf6f8', shade:'#bac6e4', light:'#ffffff', nose:'#bc739a', eye:'#35395d'},
  {name:'Тоффи', caption:'Закат у моря', alt:'Кремовый кот с тёмными ушами смотрит на берег моря на закате.', world:'beach', fur:'#e9bc93', shade:'#84546a', light:'#ffdfad', nose:'#954d71', eye:'#38294b'}
];

function sitting(canvas,i){
 const cat=cats[i],context=canvas.getContext('2d');
 canvas.width=40;canvas.height=39;
 context.translate(cat.world==='rain'?-24:-32,-17);
 const rect=(x,y,w,h,color)=>{context.fillStyle=color;context.fillRect(x,y,w,h)};
  const outline = '#352943';
  // A few offset rows create stepped silhouettes at the native pixel resolution.
  const stepped = (x,y,w,h,color) => {
    rect(x+2,y,w-4,1,color); rect(x+1,y+1,w-2,1,color);
    rect(x,y+2,w,h-4,color); rect(x+1,y+h-2,w-2,1,color); rect(x+2,y+h-1,w-4,1,color);
  };

  const mirror = cat.world==='rain' || cat.world==='beach';
  const pixel = (x,y,w,h,color) => rect(mirror ? 96-x-w : x,y,w,h,color);
  const shape = (x,y,w,h,color) => stepped(mirror ? 96-x-w : x,y,w,h,color);
  const fluffy = cat.world==='snow';
  const tall = cat.world==='roof';
  const bodyTop = tall ? 32 : 35;
  const earTop = tall ? 18 : 21;

  shape(45,bodyTop,fluffy ? 17 : 15,53-bodyTop,outline);
  shape(47,bodyTop+2,fluffy ? 13 : 11,51-bodyTop,cat.fur);
  pixel(60,46,6,7,outline); pixel(65,42,5,9,outline); pixel(66,40,4,4,outline);
  pixel(60,48,5,3,cat.shade); pixel(64,46,4,3,cat.fur); pixel(67,42,1,5,cat.shade);
  shape(36,45,13,9,outline); shape(38,46,9,6,cat.fur);
  shape(49,47,10,7,outline); shape(50,48,8,4,cat.shade);
  pixel(34,earTop,4,12,outline); pixel(38,earTop+3,3,9,outline);
  pixel(53,earTop+3,3,9,outline); pixel(56,earTop,4,12,outline);
  shape(33,earTop+8,28,20,outline);
  shape(35,earTop+10,24,16,cat.fur);
  pixel(36,earTop+2,2,11,cat.world==='beach' ? cat.shade : cat.fur);
  pixel(38,earTop+5,2,6,cat.fur);
  pixel(56,earTop+2,2,11,cat.world==='beach' ? cat.shade : cat.fur);
  pixel(54,earTop+5,2,6,cat.fur);
  pixel(36,earTop+5,1,4,cat.nose); pixel(57,earTop+5,1,4,cat.nose);
  if(cat.world==='kitchen' || cat.world==='rain'){
    for(let i=0;i<3;i++) pixel(42+i*4,earTop+10,2,i===1 ? 4 : 3,cat.shade);
    pixel(35,earTop+16,3,1,cat.shade); pixel(56,earTop+16,3,1,cat.shade);
  }
  if(cat.world==='field'){
    shape(36,earTop+10,9,11,'#c97753'); shape(51,earTop+10,8,11,'#625064');
    pixel(50,45,6,2,'#c97753'); pixel(54,47,3,2,'#625064');
  }
  if(cat.world==='beach'){
    shape(44,earTop+15,7,8,cat.shade); pixel(36,earTop+11,3,2,cat.shade); pixel(55,earTop+11,3,2,cat.shade);
  }
  pixel(40,earTop+17,3,4,cat.eye); pixel(52,earTop+17,3,4,cat.eye);
  pixel(40,earTop+17,1,1,cat.light); pixel(52,earTop+17,1,1,cat.light);
  if(cat.world!=='beach') shape(43,earTop+20,9,6,cat.light);
  pixel(46,earTop+21,3,2,cat.nose); pixel(47,earTop+23,1,1,outline);
  pixel(37,earTop+22,4,1,cat.light); pixel(54,earTop+22,4,1,cat.light);
  pixel(40,51,1,1,cat.shade); pixel(44,51,1,1,cat.shade);
  if(fluffy){
    pixel(39,47,18,2,'#5777ab'); pixel(41,49,15,2,'#7598c7'); pixel(52,50,4,5,'#5777ab');
  }
}

// Pixel keys share an outline so silhouettes stay legible on every paper colour.
const ink = '#33273c';
const colours = {x:ink, a:'#ce784e', b:'#f0ae73', c:'#ffe3b6', w:'#fcf0d7', g:'#706980', s:'#a7a1b4', p:'#e99caf', k:'#484154'};
const sprites = {
 walk: [
 '........................xx.....xx.',
 '........................xbx...xbx.',
 '.xxx....................xbcxxxbcx.',
 'xxax...................xbbbbabbbx.',
 'xabx.................xxbbxbbbbxbx.',
 'xabbxx....xxxxxxxxxxxbbbbbbpwbbbx.',
 '.xabbxxxxxbbbabbabbabbbbbbbwwwxx..',
 '..xxabbbbbbbbabbabbabbbbbbbccx....',
 '....xxxabbbbbbbbbbbbbbbbbbbcx.....',
 '.......xabbbbbbbbbbbbbbbcccx......',
 '.......xxaabbbccccccbbbbbxx.......',
 '.......xabbbxxx....xxbbbax........',
 '......xabbxx.........xabbbx.......',
 '.....xxbbx............xxbbxx......',
 '.....xxxx..............xxxxx......'],
 sleep: [
 '..................xx....xx.....',
 '.......xxxxxxxx...xgx..xgx.....',
 '....xxxssssssssxxxxgsxxsgx.....',
 '..xxssggssssssggssxsssssssx....',
 '.xsssssggssssssggsssxsssxssx...',
 'xgssssssssssggsssssssxpsxssx...',
 'xgggsssssssssxxxxssswwwwssx....',
 '.xxggggggggxxssssxxxwwwwxx.....',
 '...xxxxxxxxssssssxxxxxxx.......',
 '..........xxxxxxx..............'],
 paw:['..xxxxxxx..','..xggsssx..','..xgssssx..','..xgssssx..','..xsssssx..','.xsswwwwwx.','xwwwwwwwwwx','xwwpwpwpwwx','.xwwwpwwwx.','..xxxxxxx..'],
 ears:['xx..........xx','xsx........xsx','xspx......xpsx','xsspx....xpssx','xssssxxxxssssx','xsssssggsssssx','xssxssssssxssx','xssssssssssssx'],
 tail:['......xxxx','.....xabbx','.....xabbx','.....xabbx','....xabbbx','...xabbbx.','..xggbbx..','.xbbbxx...','xgbbx.....','xgbx......','xbbx......','xggbx.....','.xabbx....','..xbbbx...','...xxxx...']
};
function drawPixels(canvas, rows) {
  canvas.width = Math.max(...rows.map(row=>row.length));
  canvas.height = rows.length;
  const ctx=canvas.getContext('2d');
  rows.forEach((row,y)=>Array.from(row).forEach((cell,x)=>{
    if(colours[cell]){ctx.fillStyle=colours[cell];ctx.fillRect(x,y,1,1);}
  }));
}
const sittingCoats = {sit:0, tux:1, calico:2, mist:3, snow:4};
document.querySelectorAll('[data-sprite]').forEach(canvas=>{
  const kind=canvas.dataset.sprite;
  if(Object.hasOwn(sittingCoats,kind)) sitting(canvas,sittingCoats[kind]);
  else drawPixels(canvas,sprites[kind]);
});
const motion=document.getElementById('motion');
const root=document.documentElement;
const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
function setMotion(enabled){
  root.classList.toggle('still',!enabled);
  motion.setAttribute('aria-pressed',String(enabled));
  motion.textContent=enabled?'Ⅱ':'▶';
}
let saved;
try{saved=localStorage.getItem('portfolio-motion')}catch{}
setMotion(saved===null||saved===undefined?!preference.matches:saved==='on');
motion.addEventListener('click',()=>{
  const enabled=root.classList.contains('still');
  setMotion(enabled);
  try{localStorage.setItem('portfolio-motion',enabled?'on':'off')}catch{}
});
preference.addEventListener('change',ev=>setMotion(!ev.matches));const walker=document.querySelector('[data-sprite="walk"]');
const stride=sprites.walk.slice(0,-4).concat([
 '.......xxaabbbccccccbbbbbxx.......',
 '........xabbxx.....xxabbx.........',
 '.........xbbbx....xxabbx..........',
 '.........xxxxx....xxxxx...........']);
let step=false;
setInterval(()=>{
  if(root.classList.contains('still')||document.hidden)return;
  step=!step;
  drawPixels(walker,step?stride:sprites.walk);
},260);

const catButton=document.getElementById('cat-button');
let cancelVisit;
async function visitCat(){
  if(cancelVisit)return;
  const box=catButton.getBoundingClientRect();
  const visitor=document.createElement('div');
  visitor.className='visit';
  visitor.setAttribute('aria-hidden','true');
  Object.assign(visitor.style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px'});
  const sprite=document.createElement('canvas');
  const heart=document.createElement('span');
  heart.className='pixel-heart';
  heart.hidden=true;
  visitor.append(sprite,heart);
  document.body.append(visitor);
  catButton.classList.add('visiting');
  let animation;
  let timer;
  let release;
  let stopped=false;
  function cancel(){
    stopped=true;
    animation?.cancel();
    clearTimeout(timer);
    if(release)release();
  }
  cancelVisit=cancel;
  const wait=ms=>new Promise(resolve=>{release=resolve;timer=setTimeout(resolve,ms)});
  const dx=innerWidth*.5-box.left-box.width/2;
  const dy=innerHeight*.58-box.bottom;
  const near='translate('+dx+'px,'+dy+'px) scale(1.85)';
  const home='translate(0,0) scale(1)';
  const middle='translate('+dx*.5+'px,'+(dy*.5-12)+'px) scale(1.4)';
  function run(frames){
    animation=visitor.animate(frames.map(transform=>({transform})),{duration:580,easing:'ease-in-out',fill:'forwards'});
    return animation.finished;
  }
  const interruptEvents=['scroll','resize','pagehide'];
  interruptEvents.forEach(type=>window.addEventListener(type,cancel,{passive:true}));
  motion.addEventListener('click',cancel);
  try{
    const moving=!root.classList.contains('still');
    if(moving){
      drawPixels(sprite,sprites.walk);
      sprite.style.transform=dx<0?'scaleX(-1)':'';
      await run([home,middle,near]);
    }
    if(stopped)return;
    sprite.style.transform='';
    sitting(sprite,0);
    heart.hidden=false;
    await wait(950);
    if(stopped)return;
    if(moving){
      heart.hidden=true;
      drawPixels(sprite,stride);
      sprite.style.transform=dx<0?'':'scaleX(-1)';
      await run([near,middle,home]);
    }
  }catch(error){if(!stopped)throw error}
  finally{
    interruptEvents.forEach(type=>window.removeEventListener(type,cancel));
    motion.removeEventListener('click',cancel);
    visitor.remove();
    catButton.classList.remove('visiting');
    cancelVisit=undefined;
  }
}
catButton.addEventListener('click',visitCat);
