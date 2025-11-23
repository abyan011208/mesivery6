// script.js — handles login, sparkle mouse, hearts rain, custom cursor, parallax, loader
// Login
function login(){
  const u=document.getElementById('username').value.trim();
  const p=document.getElementById('password').value.trim();
  const err=document.getElementById('error');
  if(u==='rana' && p==='240525'){
    // small fade then go
    document.body.classList.add('fade-page');
    setTimeout(()=> location.href='home.html', 350);
  } else {
    err.textContent='Username / Password salah 💚';
  }
}

// remove loader after short time
window.addEventListener('load', ()=> {
  const loader = document.getElementById('loader');
  if(loader) setTimeout(()=> loader.style.display='none', 800);
});

// Sparkle canvas that follows mouse (green sparkles)
(function(){
  const c = document.getElementById('sparkle-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth, h = c.height = innerHeight;
  window.addEventListener('resize', ()=>{ w=c.width=innerWidth; h=c.height=innerHeight; });
  const sparks = [];
  addEventListener('mousemove', (ev)=>{
    for(let i=0;i<3;i++){
      sparks.push({x:ev.clientX + (Math.random()*12-6), y:ev.clientY + (Math.random()*12-6), r:Math.random()*3+1, life:30+Math.random()*20});
    }
  });
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(let i=sparks.length-1;i>=0;i--){
      const s = sparks[i];
      ctx.beginPath();
      ctx.fillStyle = 'rgba(153,255,204,'+(s.life/60)+')';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
      s.y -= 0.4;
      s.life--;
      if(s.life<=0) sparks.splice(i,1);
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// custom cursor
(function(){
  const cur = document.createElement('div');
  cur.className = 'cursor';
  document.body.appendChild(cur);
  addEventListener('mousemove', e=> { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
})();

// simple parallax effect for .parallax elements
(function(){
  addEventListener('scroll', ()=> {
    document.querySelectorAll('.parallax').forEach(el=>{
      const rect = el.getBoundingClientRect();
      const offset = window.scrollY;
      el.style.backgroundPosition = 'center ' + (offset * 0.08) + 'px';
    });
  });
})();

// hearts rain on background (subtle, uses CSS created elements)
(function(){
  // create few hearts that float down
  const num = 12;
  for(let i=0;i<num;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.position='fixed';
    heart.style.left = Math.random()*100 + '%';
    heart.style.top = (-Math.random()*80) + 'vh';
    heart.style.fontSize = (8 + Math.random()*18) + 'px';
    heart.style.opacity = 0.15 + Math.random()*0.45;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = 5;
    heart.textContent = '💚';
    document.body.appendChild(heart);
    (function animate(h){
      const dur = 8000 + Math.random()*6000;
      h.animate([{transform:'translateY(0) rotate(0deg)'},{transform:'translateY(110vh) rotate(180deg)'}], {duration:dur, iterations:Infinity, delay:Math.random()*2000});
    })(heart);
  }
})();

/* NOTE: For autoplay music many browsers require user interaction.
Put a file named 'music.mp3' in the folder and uncomment below to create a player.

window.addEventListener('click', ()=> {
  if(!document.getElementById('bgm')){
    const a = document.createElement('audio');
    a.id='bgm';
    a.src='music.mp3';
    a.loop=true; a.volume=0.45; a.play();
    document.body.appendChild(a);
  }
}, {once:true});
*/
