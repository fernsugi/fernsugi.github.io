/* Sugianto Wong — portfolio. Plain JavaScript, no dependencies.
   Everything here is an enhancement: the page reads fine without it. */

(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const $ = (sel, ctx = doc) => ctx.querySelector(sel);
  const $$ = (sel, ctx = doc) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const theme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

  // ── Theme ────────────────────────────────────────────────────────────────

  function initTheme() {
    const btn = $('[data-theme-toggle]');
    const paper = { light: '#f2f0ea', dark: '#11100d' };

    const sync = () => {
      const now = theme();
      if (btn) btn.setAttribute('aria-label', now === 'dark' ? btn.dataset.toLight : btn.dataset.toDark);
      $$('meta[name="theme-color"]').forEach((m) => {
        const own = /dark/.test(m.media) ? 'dark' : 'light';
        m.content = paper[root.dataset.theme || own];
      });
      doc.dispatchEvent(new CustomEvent('themechange'));
    };

    if (btn) {
      btn.addEventListener('click', () => {
        const next = theme() === 'dark' ? 'light' : 'dark';
        // Choosing what the system already prefers just hands control back to it.
        const followsSystem = next === (systemDark.matches ? 'dark' : 'light');
        if (followsSystem) delete root.dataset.theme;
        else root.dataset.theme = next;
        try {
          if (followsSystem) localStorage.removeItem('theme');
          else localStorage.setItem('theme', next);
        } catch (_) { /* storage can be unavailable; the toggle still works for this visit */ }
        sync();
      });
    }

    systemDark.addEventListener('change', sync);
    sync();
  }

  // ── Header: border on scroll, mobile menu, current section ───────────────

  function initHeader() {
    const head = $('[data-head]');
    if (!head) return;

    const onScroll = () => head.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const btn = $('[data-menu]', head);
    const nav = $('.nav', head);
    if (btn && nav) {
      const isOpen = () => head.classList.contains('is-open');
      const setOpen = (open) => {
        head.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      };
      btn.addEventListener('click', () => setOpen(!isOpen()));
      nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
      doc.addEventListener('click', (e) => { if (isOpen() && !head.contains(e.target)) setOpen(false); });
      doc.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); }
      });
      window.matchMedia('(min-width: 56.01rem)').addEventListener('change', () => setOpen(false));
    }

    const links = $$('.nav a[href^="#"]', head);
    if (!('IntersectionObserver' in window) || !links.length) return;
    const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const link = byId.get(en.target.id);
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach((s) => spy.observe(s));
  }

  // ── Reveal on scroll ─────────────────────────────────────────────────────

  function initReveal() {
    const items = $$('.reveal');
    if (!items.length || !('IntersectionObserver' in window) || reduceMotion.matches) return;
    root.classList.add('reveal-on');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
    // Printing, or motion being switched off mid-visit, must never leave content hidden.
    const showAll = () => items.forEach((el) => el.classList.add('is-in'));
    window.addEventListener('beforeprint', showAll);
    reduceMotion.addEventListener('change', showAll);
  }

  // ── Small conveniences ───────────────────────────────────────────────────

  function initLangLinks() {
    // Switching language keeps you in the section you were reading.
    $$('[data-lang-link]').forEach((a) => {
      a.addEventListener('click', () => {
        if (location.hash) a.href = a.getAttribute('href').split('#')[0] + location.hash;
      });
    });
  }

  function initCopy() {
    $$('[data-copy]').forEach((btn) => {
      if (!navigator.clipboard) { btn.hidden = true; return; }
      const label = btn.textContent;
      const status = doc.createElement('span');
      status.className = 'vh';
      status.setAttribute('role', 'status');
      btn.after(status);
      let timer = 0;
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
        } catch (_) {
          return;
        }
        btn.textContent = btn.dataset.copied;
        btn.classList.add('is-done');
        status.textContent = btn.dataset.copied;
        clearTimeout(timer);
        timer = setTimeout(() => {
          btn.textContent = label;
          btn.classList.remove('is-done');
          status.textContent = '';
        }, 1800);
      });
    });
  }

  function initClock() {
    const el = $('[data-clock]');
    if (!el || !window.Intl) return;
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat(root.lang || 'en', {
        timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
      });
    } catch (_) {
      return;
    }
    const tick = () => { el.textContent = `${fmt.format(new Date())} JST`; };
    tick();
    setInterval(tick, 20000);
  }

  // ── The scope: a two-operator FM voice you can see, shape and hear ───────
  //
  // One sine (the carrier) has its phase pushed around by a second sine (the
  // modulator):  y = sin(θ + index · sin(ratio · θ)).  `ratio` is the modulator's
  // frequency relative to the carrier, `index` is how hard it pushes. The canvas
  // draws that function; the sound button plays the same voice through Web Audio.

  const RATIO = [0.5, 5];
  const INDEX = [0.2, 5];
  const voice = { ratio: 2, index: 1.8, toRatio: 2, toIndex: 1.8 };

  function createSynth() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;

    const STEP = 60 / 92 / 2; // eighth notes at 92 bpm
    const LEVEL = 0.6; // master gain: present, but polite
    // vi–IV–I–V, each with its pentatonic scale (as pitch classes), so every note fits.
    const CHORDS = [
      { root: 45, scale: [9, 0, 2, 4, 7] },
      { root: 41, scale: [5, 7, 9, 0, 2] },
      { root: 48, scale: [0, 2, 4, 7, 9] },
      { root: 43, scale: [7, 9, 11, 2, 4] },
    ];
    const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
    const notesIn = (chord) => {
      const out = [];
      for (let m = 57; m <= 76; m++) if (chord.scale.includes(m % 12)) out.push(m);
      return out;
    };

    let ctx = null;
    let bus = null;
    let master = null;
    let timer = 0;
    let nextTime = 0;
    let step = 0;
    let degree = 4;
    let playing = false;
    let muted = false;
    let heard = []; // melody notes, kept briefly so the scope can follow them

    function build() {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;

      const limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -16;
      limiter.knee.value = 10;
      limiter.ratio.value = 8;
      limiter.attack.value = 0.004;
      limiter.release.value = 0.2;

      const tone = ctx.createBiquadFilter();
      tone.type = 'lowpass';
      tone.frequency.value = 6500;
      tone.Q.value = 0.3;

      // A dotted-eighth echo with a darkened feedback path gives the plucks some room.
      const delay = ctx.createDelay(1);
      delay.delayTime.value = STEP * 1.5;
      const damp = ctx.createBiquadFilter();
      damp.type = 'lowpass';
      damp.frequency.value = 1800;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.34;
      const wet = ctx.createGain();
      wet.gain.value = 0.3;

      bus = ctx.createGain();
      bus.connect(tone).connect(limiter);
      bus.connect(delay).connect(damp).connect(feedback).connect(delay);
      damp.connect(wet).connect(limiter);
      limiter.connect(master).connect(ctx.destination);
    }

    function pluck(midi, when, level, length, ratio, index) {
      const f = hz(midi);
      const carrier = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const depth = ctx.createGain();
      const amp = ctx.createGain();

      carrier.frequency.value = f;
      modulator.frequency.value = f * ratio;

      // Frequency deviation = index × modulator frequency. It decays quickly, so each
      // note starts bright and settles toward a plain sine, like a struck string.
      const deviation = Math.max(1, index * f * ratio);
      depth.gain.setValueAtTime(deviation, when);
      depth.gain.exponentialRampToValueAtTime(Math.max(0.5, deviation * 0.1), when + 0.5);

      amp.gain.setValueAtTime(0.0001, when);
      amp.gain.exponentialRampToValueAtTime(level, when + 0.006);
      amp.gain.exponentialRampToValueAtTime(0.0001, when + length);

      modulator.connect(depth).connect(carrier.frequency);
      carrier.connect(amp).connect(bus);
      carrier.start(when);
      modulator.start(when);
      carrier.stop(when + length + 0.05);
      modulator.stop(when + length + 0.05);
      carrier.onended = () => { amp.disconnect(); depth.disconnect(); };
    }

    function schedule(when) {
      const beat = step % 8;
      const chord = CHORDS[Math.floor(step / 16) % CHORDS.length];
      const scale = notesIn(chord);
      const ratio = Math.round(voice.toRatio * 4) / 4;
      const index = voice.toIndex;

      if (beat === 0) pluck(chord.root, when, 0.2, 2.6, 1, Math.min(2, index * 0.5));

      if (Math.random() < (beat % 2 ? 0.45 : 0.85)) {
        const moves = [-2, -1, -1, 1, 1, 2];
        degree = clamp(degree + moves[Math.floor(Math.random() * moves.length)], 0, scale.length - 1);
        const midi = scale[degree];
        const f = hz(midi);
        // Higher notes get a gentler index, which keeps them sweet and free of aliasing.
        const scaled = index * Math.min(1, 300 / f);
        const level = (0.1 + Math.random() * 0.05) / (1 + 0.1 * scaled);
        pluck(midi, when, level, 1.5, ratio, scaled);
        heard.push({ when, midi, f, ratio, index: scaled });
        if (heard.length > 24) heard.shift();
      }
      step++;
    }

    function pump() {
      if (!playing || muted) return;
      const now = ctx.currentTime;
      if (nextTime < now) nextTime = now + 0.05;
      while (nextTime < now + 0.12) {
        schedule(nextTime);
        nextTime += STEP;
      }
    }

    return {
      get playing() { return playing; },

      start() {
        if (!ctx) build();
        ctx.resume();
        playing = true;
        step = 0;
        heard = [];
        nextTime = ctx.currentTime + 0.08;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(muted ? 0 : LEVEL, ctx.currentTime, 0.05);
        clearInterval(timer);
        timer = setInterval(pump, 25);
        pump();
      },

      stop() {
        playing = false;
        clearInterval(timer);
        heard = [];
        if (!ctx) return;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.06);
        setTimeout(() => { if (!playing) ctx.suspend(); }, 700);
      },

      /** Fades out while the scope is off screen or the tab is hidden. */
      mute(on) {
        if (on === muted) return;
        muted = on;
        if (ctx && playing) master.gain.setTargetAtTime(on ? 0 : LEVEL, ctx.currentTime, 0.08);
      },

      /** The note sounding right now, with its envelopes, for the scope to draw. */
      now() {
        if (!ctx || !playing) return null;
        const t = ctx.currentTime - (ctx.outputLatency || ctx.baseLatency || 0);
        let note = null;
        for (let i = heard.length - 1; i >= 0; i--) {
          if (heard[i].when <= t) { note = heard[i]; break; }
        }
        if (!note) return { amp: 0.08, index: voice.index, ratio: voice.ratio, stretch: 1, name: '' };
        const age = t - note.when;
        return {
          amp: Math.max(0.08, Math.min(1, age / 0.03) * Math.exp(-age / 0.42)),
          index: note.index * (0.1 + 0.9 * Math.exp(-age / 0.22)),
          ratio: note.ratio,
          stretch: Math.sqrt(note.f / 262),
          name: NAMES[note.midi % 12] + (Math.floor(note.midi / 12) - 1),
        };
      },
    };
  }

  function initScope() {
    const wrap = $('[data-scope]');
    const canvas = wrap && $('canvas', wrap);
    const g = canvas && canvas.getContext && canvas.getContext('2d');
    if (!g) return;

    const out = {
      ratio: $('[data-ratio]', wrap),
      index: $('[data-index]', wrap),
      note: $('[data-note]', wrap),
      noteWrap: $('[data-note-wrap]', wrap),
    };
    const soundBtn = $('[data-sound]', wrap);
    const soundState = $('[data-sound-state]', wrap);
    const synth = createSynth();

    let W = 0;
    let H = 0;
    let colors = { trace: '#f0441e', grid: 'rgba(0,0,0,.14)', glow: false };
    let onScreen = true;
    let raf = 0;
    let last = 0;
    let phase = 0;
    let swell = 0; // the trace grows from a flat line when the page opens
    let lastPointer = -Infinity;
    const born = performance.now();

    const text = (el, value) => { if (el && el.textContent !== value) el.textContent = value; };
    const animating = () => onScreen && !doc.hidden && !reduceMotion.matches;

    function readColors() {
      const cs = getComputedStyle(wrap);
      colors = {
        trace: cs.getPropertyValue('--accent').trim() || colors.trace,
        grid: cs.getPropertyValue('--line').trim() || colors.grid,
        glow: theme() === 'dark',
      };
    }

    function resize() {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(box.width));
      H = Math.max(1, Math.round(box.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    // Left alone, the voice drifts through a few timbres by itself.
    const TOUR = [2, 3, 1.5, 2.5, 1, 4, 3.5, 0.5];
    function wander(now) {
      const t = Math.max(0, now - born) / 1000;
      voice.toRatio = TOUR[Math.floor(t / 6) % TOUR.length];
      voice.toIndex = 1.75 + 0.9 * Math.sin(t * 0.37) + 0.4 * Math.sin(t * 0.83 + 1.3);
    }

    function draw() {
      const mid = Math.round(H / 2) + 0.5;
      g.clearRect(0, 0, W, H);

      // Graticule: time divisions and a centre line, like a scope screen.
      const div = W / Math.max(4, Math.round(W / 110));
      g.beginPath();
      for (let x = div; x < W - 1; x += div) {
        const px = Math.round(x) + 0.5;
        g.moveTo(px, 0);
        g.lineTo(px, H);
      }
      g.moveTo(0, mid);
      g.lineTo(W, mid);
      for (let x = div / 5; x < W; x += div / 5) {
        const px = Math.round(x) + 0.5;
        g.moveTo(px, mid - 3);
        g.lineTo(px, mid + 3);
      }
      g.lineWidth = 1;
      g.strokeStyle = colors.grid;
      g.stroke();

      const note = synth ? synth.now() : null;
      const ratio = note ? note.ratio : voice.ratio;
      const index = note ? note.index : voice.index;
      const amp = H * 0.38 * swell * (note ? note.amp : 1);
      const k = 2 * Math.PI * Math.max(2, W / 300) * (note ? note.stretch : 1);

      g.beginPath();
      for (let px = 0; px <= W; px += 0.5) {
        const th = (k * px) / W - phase;
        const y = mid - amp * Math.sin(th + index * Math.sin(ratio * th));
        if (px) g.lineTo(px, y);
        else g.moveTo(px, y);
      }
      g.lineWidth = 2;
      g.lineJoin = 'round';
      g.strokeStyle = colors.trace;
      if (colors.glow) {
        g.shadowColor = colors.trace;
        g.shadowBlur = 12;
      }
      g.stroke();
      g.shadowBlur = 0;

      text(out.ratio, ratio.toFixed(2));
      text(out.index, index.toFixed(1));
      if (note && note.name) text(out.note, note.name);
    }

    function frame() {
      raf = 0;
      // One clock throughout: the timestamp rAF passes in can run slightly behind this one.
      const now = performance.now();
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;
      if (now - lastPointer > 2600) wander(now);
      voice.ratio += (voice.toRatio - voice.ratio) * (1 - Math.exp(-dt / 0.22));
      voice.index += (voice.toIndex - voice.index) * (1 - Math.exp(-dt / 0.16));
      swell += (1 - swell) * (1 - Math.exp(-dt / 0.55));
      phase += dt * 1.15;
      draw();
      if (animating()) raf = requestAnimationFrame(frame);
    }

    /** Starts the loop if it should run; otherwise paints one still frame. */
    function kick() {
      if (animating()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else if (reduceMotion.matches) {
        voice.ratio = voice.toRatio;
        voice.index = voice.toIndex;
        swell = 1;
        draw();
      }
    }

    // The canvas works as an XY pad: across sets the ratio, up and down sets the index.
    wrap.addEventListener('pointermove', (e) => {
      const box = canvas.getBoundingClientRect();
      const x = clamp((e.clientX - box.left) / box.width, 0, 1);
      const y = clamp((e.clientY - box.top) / box.height, 0, 1);
      voice.toRatio = Math.round((RATIO[0] + x * (RATIO[1] - RATIO[0])) * 4) / 4;
      voice.toIndex = INDEX[0] + (1 - y) * (INDEX[1] - INDEX[0]);
      lastPointer = performance.now();
      kick();
    }, { passive: true });

    if (soundBtn && synth) {
      soundBtn.addEventListener('click', () => {
        const on = !synth.playing;
        try {
          if (on) synth.start();
          else synth.stop();
        } catch (_) {
          soundBtn.hidden = true;
          return;
        }
        // The button's own text carries the state ("Sound on" / "Sound off").
        soundBtn.classList.toggle('is-on', on);
        text(soundState, on ? soundState.dataset.on : soundState.dataset.off);
        if (out.noteWrap) out.noteWrap.hidden = !on;
        kick();
      });
    } else if (soundBtn) {
      soundBtn.hidden = true;
    }

    const visibility = () => {
      if (synth) synth.mute(!onScreen || doc.hidden);
      kick();
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        onScreen = entries[entries.length - 1].isIntersecting;
        visibility();
      }).observe(wrap);
    }
    doc.addEventListener('visibilitychange', visibility);
    reduceMotion.addEventListener('change', kick);
    doc.addEventListener('themechange', () => { readColors(); draw(); });

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);

    readColors();
    resize();
    kick();
  }

  // ── Go ───────────────────────────────────────────────────────────────────

  const run = (fn) => { try { fn(); } catch (err) { console.error(err); } };
  [initScope, initTheme, initHeader, initReveal, initLangLinks, initCopy, initClock].forEach(run);
})();
