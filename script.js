const themeBtn=document.getElementById('themeToggle');
const ttSun=document.getElementById('ttSun');
const ttMoon=document.getElementById('ttMoon');
const menuToggle=document.getElementById('menuToggle');
let themeMode='light';
function riseIn(el){
  el.style.transition='none';
  el.style.transform='translateY(140%)';
  el.style.opacity='0';
  void el.offsetWidth;
  el.style.transition='transform .45s cubic-bezier(.34,1.56,.64,1),opacity .4s ease';
  requestAnimationFrame(()=>{el.style.transform='translateY(0)';el.style.opacity='1'});
}
function riseOut(el){
  el.style.transition='transform .45s cubic-bezier(.34,1.56,.64,1),opacity .4s ease';
  el.style.transform='translateY(-140%)';
  el.style.opacity='0';
}
function applyTheme(mode){
  document.documentElement.setAttribute('data-theme',mode);
  themeBtn.setAttribute('data-mode',mode);
}
applyTheme('light');
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('mousemove',e=>{
    const r=b.getBoundingClientRect();
    b.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    b.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
  });
});
themeBtn.addEventListener('click',()=>{
  if(themeMode==='light'){
    riseOut(ttSun);
    riseIn(ttMoon);
    themeMode='dark';
  } else {
    riseOut(ttMoon);
    riseIn(ttSun);
    themeMode='light';
  }
  applyTheme(themeMode);
});

const roles=['Java Full Stack Developer','Spring Boot Enthusiast','React.js Builder','REST API Developer'];
let ri=0,ci=0,del=false;
function type(){
  const el=document.getElementById('tw');
  const cur=roles[ri];
  if(!del){ci++;el.textContent=cur.slice(0,ci);if(ci===cur.length){del=true;setTimeout(type,1800);return}}
  else{ci--;el.textContent=cur.slice(0,ci);if(ci===0){del=false;ri=(ri+1)%roles.length}}
  setTimeout(type,del?35:75);
}
type();

function fsk(cat,btn){
  document.querySelectorAll('.sk-tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.sk-card').forEach(c=>{
    c.style.display=(cat==='all'||c.dataset.c===cat)?'':'none';
  });
}

function fpr(cat,btn){
  document.querySelectorAll('#prgrid .p-card').forEach(c=>{
    if(cat==='all'||c.dataset.c===cat){
      c.style.display='';
      c.style.opacity='0';c.style.transform='translateY(14px)';
      requestAnimationFrame(()=>{c.style.transition='opacity .35s ease,transform .35s ease';c.style.opacity='1';c.style.transform='none'});
    } else {
      c.style.display='none';
    }
  });
  btn.parentElement.querySelectorAll('.sk-tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}

menuToggle.addEventListener('click',()=>document.getElementById('mm').classList.toggle('open'));
document.querySelectorAll('[data-skill-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>fsk(btn.dataset.skillFilter,btn));
});
document.querySelectorAll('[data-project-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>fpr(btn.dataset.projectFilter,btn));
});
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
  a.addEventListener('click',()=>document.getElementById('mm').classList.remove('open'));
});

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(r=>io.observe(r));

/* count-up stats */
const statIo=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target, target=parseFloat(el.dataset.target), dec=parseInt(el.dataset.decimals||'0');
    let start=0, dur=1200, t0=null;
    function step(ts){
      if(!t0)t0=ts;
      const p=Math.min((ts-t0)/dur,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=(target*eased).toFixed(dec);
      if(p<1)requestAnimationFrame(step);else el.textContent=target.toFixed(dec);
    }
    requestAnimationFrame(step);
    statIo.unobserve(el);
  });
},{threshold:.4});
document.querySelectorAll('.stat-num').forEach(s=>statIo.observe(s));

/* staggered card entrance for skill & cert grids */
function staggerGrid(selector){
  const els=document.querySelectorAll(selector);
  const gridIo=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      els.forEach((el,i)=>{
        el.style.opacity='0';el.style.transform='translateY(16px)';
        setTimeout(()=>{
          el.style.transition='opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1)';
          el.style.opacity='1';el.style.transform='none';
        },i*45);
      });
      gridIo.disconnect();
    });
  },{threshold:.1});
  if(els.length)gridIo.observe(els[0]);
}
staggerGrid('#skgrid .sk-card');
staggerGrid('.cert-grid .cert-card');
