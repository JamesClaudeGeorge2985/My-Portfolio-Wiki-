
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    navToggle && navToggle.addEventListener('click', ()=> mobileNav.classList.toggle('show'));

    // Filters for tracks
    document.querySelectorAll('#filters button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f=btn.dataset.filter;
        document.querySelectorAll('#tracksList .track').forEach(t=>{
          if(f==='all' || t.dataset.type===f) t.style.display='flex'; else t.style.display='none';
        })
      })
    })

    // Simple audio player logic (single audio element reused)
    let audio = new Audio();
    let currentButton = null;

    function setPlayingState(btn, playing){
      btn.textContent = playing ? '⏸' : '▶';
    }

    document.querySelectorAll('[data-action="play"]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const src = btn.dataset.src;
        if(currentButton && currentButton !== btn){
          setPlayingState(currentButton,false);
        }
        if(audio.src.endsWith(src) && !audio.paused){
          audio.pause(); setPlayingState(btn,false); return;
        }
        audio.src = src; // replace with real file paths
        try{
          await audio.play(); setPlayingState(btn,true); currentButton=btn;
        }catch(e){
          // in many dev previews audio won't autoplay — use user gesture; but we already clicked
          console.warn('playback error',e);
        }
        audio.onended = ()=> setPlayingState(btn,false);
      })
    })

    // Contact form basic validation + simulated submit
    document.getElementById('contactForm').addEventListener('submit',(e)=>{
      e.preventDefault();
      const name=document.getElementById('name').value.trim();
      const email=document.getElementById('email').value.trim();
      const message=document.getElementById('message').value.trim();
      if(!name||!email||!message){alert('Please fill all fields');return}
      // Simulate sending
      alert('Thanks '+name+' — message sent (simulated). Update the form handler to connect to your backend.');
      e.target.reset();
    })

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (ev)=>{
        ev.preventDefault(); const id=a.getAttribute('href').slice(1); const el=document.getElementById(id);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      })
    })
