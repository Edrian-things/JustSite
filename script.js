document.addEventListener('DOMContentLoaded', function() {
  // Create floating hearts background
  const floatingHeartsContainer = document.getElementById('floatingHearts');
  const heartCount = 5; // Reduced for better performance
  
  for (let i = 0; i < heartCount; i++) {
    createFloatingHeart();
  }
  
  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const size = 24 + Math.random() * 32; // 24px to 56px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * (window.innerWidth - size)}px`;
    heart.style.bottom = '0px';
    const colors = ['#e75480', '#ff85a2', '#fbb1bd', '#ffd6ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.innerHTML = `<svg viewBox="0 0 32 29.6" width="${size}" height="${size}"><path fill="${color}" d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,7.1,8.2,13.1,15.1,18.7c0.6,0.5,1.5,0.5,2.1,0C23.8,23.5,32,17.5,32,10.4C32,4.7,27.3,0,23.6,0z"/></svg>`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`; // 6s to 10s
    floatingHeartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => heart.remove(), 10000);
  }
  
  // Create hearts continuously
  setInterval(() => {
    for (let i = 0; i < 3; i++) { // Increase for more hearts per interval
      createFloatingHeart();
    }
  }, 800); // Lower interval for more frequent hearts
  
  // --- Replace the heart cursor trail section with this ---
  const cursorTrail = document.getElementById('cursorTrail');
  const trailLength = 8;
  const trailHearts = [];
  
  for (let i = 0; i < trailLength; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-cursor');
    heart.style.opacity = '0';
    cursorTrail.appendChild(heart);
    trailHearts.push({ el: heart, x: 0, y: 0 });
  }
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateTrail() {
    let prevX = mouseX, prevY = mouseY;
    trailHearts.forEach((heart, i) => {
      heart.x += (prevX - heart.x) * 0.25;
      heart.y += (prevY - heart.y) * 0.25;
      heart.el.style.left = `${heart.x}px`;
      heart.el.style.top = `${heart.y}px`;
      heart.el.style.opacity = `${0.8 - i * 0.08}`;
      heart.el.style.transform = `translate(-50%, -50%) scale(${1 - i * 0.12})`;
      prevX = heart.x;
      prevY = heart.y;
    });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
  
  // Enhanced Yes/No logic
  const noMessages = [
    "No", "Please?", "Are you sure?", "Think again!", "I'll bring chocolate! 🍫",
  ];
  const noImages = [
    'No.jpg',
    'Please.jpg',
    'Are you sure.gif',
    'ThinkAgain.jpg',
    'Chocolate.jpg',
  ];
  
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  let noClickCount = 0;
  let yesClickCount = 0;
  
  noBtn.addEventListener('click', function() {
    noClickCount++;
    this.textContent = noMessages[noClickCount % noMessages.length];
    this.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg)`;
    createHeartAnimation(this);

    // Show a new image below the buttons
    let imgContainer = document.getElementById('no-img-container');
    if (!imgContainer) {
      imgContainer = document.createElement('div');
      imgContainer.id = 'no-img-container';
      imgContainer.style.marginTop = '16px';
      imgContainer.style.textAlign = 'center';
      document.querySelector('.buttons').after(imgContainer);
    }
    const imgIndex = noClickCount % noImages.length;
    imgContainer.innerHTML = `<img src="${noImages[imgIndex]}" alt="Please?" style="width:120px;display:inline-block;">`;

    // If all rejection options have been clicked, redirect to thankyou.html
    if (noClickCount >= noMessages.length) {
      setTimeout(() => {
        window.location.href = 'thankyou.html';
      }, 1200); // 1.2 seconds delay for last image/message
    }
  });
  
  yesBtn.addEventListener('click', function() {
    yesClickCount++;
    createConfetti();
    showLoveMeter();
  });
  
  function createHeartAnimation(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    for (let i = 0; i < 3; i++) { // Reduced number for performance
      const heart = document.createElement('div');
      heart.classList.add('heart-cursor');
      heart.style.position = 'fixed';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.width = '16px';
      heart.style.height = '16px';
      heart.style.opacity = '1';
      document.body.appendChild(heart);
      
      const animation = heart.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: `translateY(-${Math.random() * 50 + 30}px) translateX(${Math.random() * 40 - 20}px) scale(0.5)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      animation.onfinish = () => heart.remove();
    }
  }
  
  function showDateOptions() {
    document.getElementById('main-container').innerHTML = `
      <svg class='heart' viewBox='0 0 32 29.6'>
        <path fill='#e75480' d='M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,7.1,8.2,13.1,15.1,18.7 c0.6,0.5,1.5,0.5,2.1,0C23.8,23.5,32,17.5,32,10.4C32,4.7,27.3,0,23.6,0z'/>
      </svg>
      <img class='teddy' src='yehey.jpg' alt='Teddy Bear' style="width:140px;display:block;margin:0 auto;" />
      <h1>Yay! 💕</h1>
      <p>I'm so happy! Can't wait for our date! 🥰<br>What kind of date would you like?</p>
      <div class='date-options'>
        <div class='date-choice'>
            <div class='date-card' data-type="Coffee">Coffee</div>
            <div class='date-card' data-type="Picnic">Picnic</div>
            <div class='date-card' data-type="Movie">Movie</div>
            <div class='date-card' data-type="Dinner">Dinner</div>
            <div class='date-card' data-type="Camping!">Camping!</div>
      </div>
        </div>
        <div class='availability'>
          <label for='date-when'>When are you available?</label>
          <input type='date' id='date-when' />
          <label for='date-time'>What time?</label>
          <input type='time' id='date-time' />
          <label style="display:block;margin:10px 0;">
            <input type="checkbox" id="pickup-checkbox" style="margin-right:8px;">
            Would you like me to pick you up?
          </label>
          <button id='submitDate' disabled>Send 💌</button>
        </div>
      </div>
    `;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-when').min = today;

    // Enable Send button only when both date and time are picked
    const dateInput = document.getElementById('date-when');
    const timeInput = document.getElementById('date-time');
    const sendBtn = document.getElementById('submitDate');
    function checkInputs() {
      sendBtn.disabled = !(dateInput.value && timeInput.value);
    }
    dateInput.addEventListener('input', checkInputs);
    timeInput.addEventListener('input', checkInputs);

    // ...rest of your code for date cards...
    document.querySelectorAll('.date-card').forEach(card => {
      card.addEventListener('click', function() {
        document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        createHeartAnimation(this);
      });
    });

    // Submit date choice
    sendBtn.addEventListener('click', function() {
      const selectedCard = document.querySelector('.date-card.selected');
      const dateType = selectedCard ? selectedCard.dataset.type : 'a surprise';
      const when = dateInput.value;
      const time = timeInput.value;
      const pickup = document.getElementById('pickup-checkbox').checked;

      let dateText = '';
      if (when) {
        const dateObj = new Date(when + 'T' + time);
        dateText = ` on <b>${dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</b> at <b>${time}</b>`;
      }

      let pickupText = pickup ? "<br>I'll pick you up! 🚗💕" : "<br>Let me know if you want me to pick you up!";

      createConfetti(true);

      document.getElementById('main-container').innerHTML = `
        <svg class='heart' viewBox='0 0 32 29.6'>
          <path fill='#e75480' d='M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,7.1,8.2,13.1,15.1,18.7 c0.6,0.5,1.5,0.5,2.1,0C23.8,23.5,32,17.5,32,10.4C32,4.7,27.3,0,23.6,0z'/>
        </svg>
        <img class='teddy' src='Thankyou.gif' alt='Teddy Bear' style="width:140px;display:block;margin:0 auto;" />
        <h1>Thank you! 💖</h1>
        <p>Can't wait for our <b>${dateType}</b> date${dateText}!${pickupText}<br>See you soon! 🥰</p>
      `;
    });
  }
  
  function createConfetti(intense = false) {
    const colors = ['#e75480', '#ff85a2', '#fbb1bd', '#ffd6ff'];
    const confettiCount = intense ? 50 : 30; // Reduced for performance
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.left = `${left}%`;
      confetti.style.top = '-10px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      document.body.appendChild(confetti);
      
      const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
      });
      
      animation.onfinish = () => confetti.remove();
    }
  }

  // Heart Rain button functionality
  const heartRainBtn = document.getElementById('heartRainBtn');
  heartRainBtn.addEventListener('click', function() {
    for (let i = 0; i < 40; i++) {
      setTimeout(createFloatingHeart, i * 80); // burst of hearts
    }
  });
  
  function showLoveMeter() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = "love-meter-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(255,221,225,0.85)";
    overlay.style.zIndex = "9999";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    overlay.innerHTML = `
      <div id="love-meter" style="margin:32px auto; width:220px; text-align:center;">
        <div style="font-size:1.3rem; color:#e75480; margin-bottom:8px;">Kilig Meter 💗</div>
        <div style="background:#ffd6ff; border-radius:16px; height:32px; width:100%; position:relative; overflow:hidden;">
          <div id="love-bar" style="background:linear-gradient(90deg,#e75480,#ff85a2); height:100%; width:0%; border-radius:16px; transition:width 1.2s;"></div>
        </div>
        <div id="love-meter-label" style="margin-top:8px; font-size:1.1rem; color:#e75480;">0%</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      document.getElementById('love-bar').style.width = '100%';
      let percent = 0;
      const label = document.getElementById('love-meter-label');
      const interval = setInterval(() => {
        percent += 5;
        label.textContent = percent + '%';
        if (percent >= 100) {
          label.textContent = '100% 💖';
          clearInterval(interval);
        }
      }, 60);
    }, 300);

    // After animation, remove overlay and show date options
    setTimeout(() => {
      overlay.remove();
      showDateOptions(); // <-- This will show the type of date options!
    }, 2200);
  }

  // Show love meter on first visit
  if (!sessionStorage.getItem('loveMeterShown')) {
    showLoveMeter();
    sessionStorage.setItem('loveMeterShown', 'true');
  }
});