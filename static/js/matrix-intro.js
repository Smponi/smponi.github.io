(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (sessionStorage.getItem('mx_intro')) return;
  sessionStorage.setItem('mx_intro', '1');

  var GLYPHS    = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
  var FONT_SIZE = 14;
  var RAIN_MS   = 1800;  // how long the rain runs at full speed
  var SLOW_MS   = 600;   // how long the rain takes to brake to a stop
  var FADE_MS   = 900;   // how long the canvas takes to fade out

  // ── Canvas setup ─────────────────────────────────────────────────────────
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Fill solid black immediately so the page beneath is covered from frame 1
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var cols  = Math.floor(canvas.width / FONT_SIZE);
  var drops = Array.from({ length: cols }, function () {
    return Math.floor(Math.random() * (canvas.height / FONT_SIZE));
  });

  // ── Animation state ──────────────────────────────────────────────────────
  var speed    = 0.5;   // current drop speed (cells/frame)
  var phase    = 'rain'; // 'rain' | 'slow' | 'fade'
  var phaseStart = 0;
  var raf;

  function tick(ts) {
    if (phaseStart === 0) phaseStart = ts;
    var elapsed = ts - phaseStart;

    if (phase === 'rain' && elapsed >= RAIN_MS) {
      phase = 'slow';
      phaseStart = ts;
      elapsed = 0;
    }

    if (phase === 'slow') {
      // Ease speed from 0.5 → 0 over SLOW_MS
      var t = Math.min(elapsed / SLOW_MS, 1);
      speed = 0.5 * (1 - t * t); // ease-in deceleration
      if (t >= 1) {
        phase = 'fade';
        phaseStart = ts;
        canvas.style.transition = 'opacity ' + (FADE_MS / 1000) + 's ease';
        canvas.style.opacity = '0';
      }
    }

    if (phase === 'fade') {
      if (elapsed >= FADE_MS + 100) {
        canvas.remove();
        return; // done — stop the loop
      }
    }

    // Draw rain frame
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = FONT_SIZE + 'px monospace';

    for (var i = 0; i < drops.length; i++) {
      var y  = drops[i] * FONT_SIZE;
      var ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

      if      (Math.random() > 0.97)    ctx.fillStyle = '#ffffff';
      else if (y < canvas.height * 0.4) ctx.fillStyle = '#00ff41';
      else                              ctx.fillStyle = '#009922';

      ctx.fillText(ch, i * FONT_SIZE, y);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += speed;
    }

    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);
})();
