/* =========================================================
   Musik und Geräusche – komplett im Browser erzeugt (Web Audio API).
   Keine Audiodateien. Startet erst nach dem ersten Klick (Browser-Regel).
   ========================================================= */
(function () {
  'use strict';
  const KEY = 'kufenkoenigin-audio';
  const MUSIC_VOL = 0.09, SFX_VOL = 0.75, MASTER = 1.5;
  const S = window.Sound = {};
  const supported = !!(window.AudioContext || window.webkitAudioContext);

  let prefs = { on: true, music: true, sfx: true };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { /* egal */ }
  const savePrefs = () => { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) { /* egal */ } };
  S.prefs = prefs;

  let ctx = null, master, musicBus, sfxBus, noiseBuf, timer = null;
  const quiet = () => !ctx || (window.G && G.fast);

  // ---------- Start (nach einer Nutzeraktion) ----------
  S.unlock = function () {
    if (!supported) return;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.ratio.value = 4;
      master = ctx.createGain(); master.gain.value = prefs.on ? MASTER : 0;
      master.connect(comp); comp.connect(ctx.destination);
      musicBus = ctx.createGain(); musicBus.gain.value = prefs.music ? MUSIC_VOL : 0; musicBus.connect(master);
      sfxBus = ctx.createGain(); sfxBus.gain.value = prefs.sfx ? SFX_VOL : 0; sfxBus.connect(master);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      // Tab im Hintergrund: Ton pausieren (spart Rechenzeit, stört niemanden)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) ctx.suspend(); else if (prefs.on) ctx.resume();
      });
      timer = setInterval(tick, 90);
    }
    if (ctx.state === 'suspended' && !document.hidden && prefs.on) ctx.resume();
  };

  // ---------- Bausteine ----------
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

  /** ein Oszillator-Ton mit Hüllkurve */
  function tone(type, freq, t, dur, vol, bus, o = {}) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (o.detune) osc.detune.value = o.detune;
    if (o.slide) osc.frequency.exponentialRampToValueAtTime(o.slide, t + dur);
    const g = ctx.createGain();
    const a = o.a === undefined ? 0.005 : o.a;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + a);
    if (o.perc) g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    else {
      const rel = o.r === undefined ? 0.08 : o.r;
      g.gain.setValueAtTime(vol, t + Math.max(a, dur - rel));
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
    }
    let node = osc;
    if (o.lp || o.hp || o.bp) {
      const f = ctx.createBiquadFilter();
      f.type = o.lp ? 'lowpass' : o.hp ? 'highpass' : 'bandpass';
      f.frequency.value = o.lp || o.hp || o.bp;
      f.Q.value = o.q || 0.8;
      osc.connect(f); node = f;
    }
    node.connect(g); g.connect(bus);
    if (o.vib) {
      const l = ctx.createOscillator(), lg = ctx.createGain();
      l.frequency.value = o.vib[0]; lg.gain.value = o.vib[1];
      l.connect(lg); lg.connect(osc.frequency); l.start(t); l.stop(t + dur + 0.05);
    }
    if (o.trem) {
      const l = ctx.createOscillator(), lg = ctx.createGain();
      l.frequency.value = o.trem[0]; lg.gain.value = vol * o.trem[1];
      l.connect(lg); lg.connect(g.gain); l.start(t); l.stop(t + dur + 0.05);
    }
    osc.start(t); osc.stop(t + dur + 0.05);
  }

  /** gefiltertes Rauschen (Schnee, Schritte, Jubel, Becken) */
  function noise(t, dur, vol, bus, o = {}) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = o.type || 'bandpass';
    f.frequency.setValueAtTime(o.f || 1500, t);
    if (o.f2) f.frequency.exponentialRampToValueAtTime(o.f2, t + dur);
    f.Q.value = o.q || 1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + (o.a || 0.004));
    if (o.hold) g.gain.setValueAtTime(vol, t + dur * o.hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(bus);
    src.start(t, Math.random() * 1.5); src.stop(t + dur + 0.05);
  }

  // ---------- Instrumente ----------
  const I = {
    bell(m, t, d, v, bus) { // Glockenspiel
      const fq = mtof(m);
      tone('sine', fq, t, Math.max(0.6, d * 1.6), v, bus, { perc: true });
      tone('sine', fq * 2.76, t, 0.35, v * 0.28, bus, { perc: true });
      tone('sine', fq * 5.4, t, 0.18, v * 0.12, bus, { perc: true });
    },
    pluck(m, t, d, v, bus) { // Pizzicato
      tone('triangle', mtof(m), t, Math.min(0.45, d + 0.2), v, bus, { perc: true, lp: 2400 });
    },
    acc(m, t, d, v, bus) { // Akkordeon-artig: zwei leicht verstimmte Zungen
      tone('sawtooth', mtof(m), t, d, v * 0.5, bus, { a: 0.03, r: 0.06, lp: 1500, detune: -7, vib: [5.5, 2.5] });
      tone('sawtooth', mtof(m), t, d, v * 0.5, bus, { a: 0.03, r: 0.06, lp: 1500, detune: 7 });
    },
    organ(m, t, d, v, bus) {
      const fq = mtof(m);
      tone('sine', fq, t, d, v, bus, { a: 0.09, r: 0.35 });
      tone('sine', fq * 2, t, d, v * 0.45, bus, { a: 0.09, r: 0.35 });
      tone('sine', fq * 3, t, d, v * 0.2, bus, { a: 0.09, r: 0.35 });
    },
    brass(m, t, d, v, bus) {
      tone('sawtooth', mtof(m), t, d, v, bus, { a: 0.025, r: 0.05, lp: 1700 });
    },
    tuba(m, t, d, v, bus) {
      tone('sawtooth', mtof(m), t, Math.min(d, 0.35), v, bus, { a: 0.015, r: 0.08, lp: 420 });
    },
    lead(m, t, d, v, bus) {
      tone('square', mtof(m), t, d * 0.92, v, bus, { a: 0.01, r: 0.04, lp: 2600 });
    },
    bass(m, t, d, v, bus) {
      tone('triangle', mtof(m), t, d * 0.9, v, bus, { a: 0.01, r: 0.05 });
    },
    kick(t, v, bus) { tone('sine', 130, t, 0.28, v, bus, { perc: true, slide: 42 }); },
    snare(t, v, bus) { noise(t, 0.16, v, bus, { f: 1900, q: 0.7 }); tone('triangle', 190, t, 0.08, v * 0.5, bus, { perc: true }); },
    hat(t, v, bus) { noise(t, 0.045, v, bus, { type: 'highpass', f: 7000 }); },
    sleigh(t, v, bus) { noise(t, 0.13, v, bus, { f: 6200, q: 4 }); noise(t + 0.03, 0.1, v * 0.6, bus, { f: 8200, q: 5 }); },
  };

  // ---------- Hauptthema: „Stille Nacht“ (Franz Gruber, 1818 – gemeinfrei), 3/4-Takt, 24 Takte ----------
  // Melodie als [Halbton über dem Grundton | null = Pause, Dauer in Schlägen]
  const MEL = [
    [7, 1.5], [9, 0.5], [7, 1], [4, 3], [7, 1.5], [9, 0.5], [7, 1], [4, 3], // Stille Nacht, heilige Nacht
    [14, 2], [14, 1], [11, 3], [12, 2], [12, 1], [7, 3], // alles schläft, einsam wacht
    [9, 2], [9, 1], [12, 1.5], [11, 0.5], [9, 1], [7, 1.5], [9, 0.5], [7, 1], [4, 3], // nur das traute, hochheilige Paar
    [9, 2], [9, 1], [12, 1.5], [11, 0.5], [9, 1], [7, 1.5], [9, 0.5], [7, 1], [4, 3], // holder Knabe im lockigen Haar
    [14, 2], [14, 1], [17, 1.5], [14, 0.5], [11, 1], [12, 3], [16, 3], // schlaf in himmlischer Ruh
    [12, 1.5], [7, 0.5], [4, 1], [7, 1.5], [5, 0.5], [2, 1], [0, 5], [null, 1], // schlaf in himmlischer Ruh
  ];
  const CH = [[0, 'M'], [0, 'M'], [0, 'M'], [0, 'M'], [7, '7'], [7, '7'], [0, 'M'], [0, 'M'],
    [5, 'M'], [5, 'M'], [0, 'M'], [0, 'M'], [5, 'M'], [5, 'M'], [0, 'M'], [0, 'M'],
    [7, 'M'], [7, '7'], [0, 'M'], [0, 'M'], [0, 'M'], [7, '7'], [0, 'M'], [0, 'M']];
  const tones = (c) => (c[1] === 'm' ? [0, 3, 7] : c[1] === '7' ? [0, 4, 7, 10] : [0, 4, 7]).map((x) => c[0] + x);
  // Moll-Fassung für Kapelle und Taubenschlag
  const minorDeg = (d) => { if (d === null) return d; const pc = ((d % 12) + 12) % 12; return [4, 9, 11].includes(pc) ? d - 1 : d; };
  const minorCh = (c) => (c[0] === 7 ? [7, c[1]] : [c[0], 'm']);

  // ---------- Varianten des Themas (alle im 3/4-Takt) ----------
  const V = {
    title: { bpm: 84, root: 62,
      lead(m, t, d, b) { I.bell(m + 12, t, d, 0.16, b); I.acc(m, t, d, 0.05, b); },
      acc(c, add) { add(0, 'pad', tones(c), 3); add(0, 'bass', c[0] - 12); for (let i = 0; i < 3; i++) add(i, 'sleigh'); } },
    town: { bpm: 116, root: 62,
      lead(m, t, d, b) { I.bell(m + 12, t, d, 0.17, b); I.pluck(m, t, d, 0.05, b); },
      acc(c, add) { add(0, 'pbass', c[0] - 12); add(1, 'pchord', tones(c)); add(2, 'pchord', tones(c)); for (let i = 0; i < 3; i++) add(i + 0.5, 'sleigh', null, 0, 0.5); } },
    inside: { bpm: 80, root: 62,
      lead(m, t, d, b) { I.acc(m, t, d, 0.055, b); },
      acc(c, add) { const tn = tones(c); add(0, 'pbass', c[0] - 12); add(1, 'arp', tn[1] + 12); add(2, 'arp', tn[2] + 12); } },
    waltz: { bpm: 160, root: 62,
      lead(m, t, d, b) { I.acc(m, t, d, 0.085, b); I.bell(m + 12, t, d, 0.05, b); },
      acc(c, add) { add(0, 'tuba', c[0] - 12); add(1, 'oom', tones(c)); add(2, 'oom', tones(c)); } },
    dark: { bpm: 56, root: 62, minor: true,
      lead(m, t, d, b) { I.organ(m, t, d, 0.04, b); },
      acc(c, add) { add(0, 'opad', tones(c), 3); add(0, 'obass', c[0] - 12, 3); } },
    hang: { bpm: 132, root: 62,
      lead(m, t, d, b) { I.acc(m, t, d, 0.05, b); I.bell(m + 12, t, d, 0.1, b); },
      acc(c, add) { add(0, 'pbass', c[0] - 12); add(1, 'pchord', tones(c)); add(2, 'snare', null, 0, 0.35); for (let i = 0; i < 6; i++) add(i / 2, 'sleigh', null, 0, 0.6); } },
    race: { bpm: 208, root: 62,
      lead(m, t, d, b) { I.lead(m + 12, t, d, 0.05, b); },
      acc(c, add) { for (let i = 0; i < 6; i++) add(i / 2, 'rbass', c[0] - 12 + (i % 2 ? 7 : 0)); add(0, 'kick'); add(1, 'snare'); add(2, 'snare', null, 0, 0.6); for (let i = 0; i < 6; i++) add(i / 2, 'hat'); } },
  };

  /** Ereignisliste für eine Variante bauen (Schläge innerhalb der Schleife) */
  function build(v) {
    const ev = [];
    let mel = MEL, ch = CH;
    if (v.minor) { mel = mel.map(([d, du]) => [minorDeg(d), du]); ch = ch.map(minorCh); }
    let b = 0;
    for (const [d, du] of mel) { if (d !== null) ev.push({ b, k: 'mel', m: d, d: du }); b += du; }
    ch.forEach((c, bar) => v.acc(c, (beat, k, m, d, vol) => ev.push({ b: bar * 3 + beat, k, m, d: d || 1, vol: vol || 1 })));
    ev.sort((x, y) => x.b - y.b);
    return { ev, len: ch.length * 3 };
  }

  function playEvent(tr, e, t) {
    const v = tr.v, spb = 60 / v.bpm, bus = tr.g, r = v.root;
    switch (e.k) {
      case 'mel': v.lead(r + e.m, t, e.d * spb, bus); break;
      case 'pad': for (const m of e.m) I.acc(r + m, t, e.d * spb, 0.02, bus); break;
      case 'bass': I.bass(r + e.m, t, spb * 1.6, 0.12, bus); break;
      case 'pbass': I.pluck(r + e.m, t, spb, 0.12, bus); break;
      case 'pchord': for (const m of e.m) I.pluck(r + m, t, spb * 0.5, 0.035, bus); break;
      case 'arp': I.pluck(r + e.m, t, spb, 0.04, bus); break;
      case 'tuba': I.tuba(r + e.m, t, spb, 0.11, bus); break;
      case 'oom': for (const m of e.m) I.brass(r + m, t, spb * 0.45, 0.022, bus); break;
      case 'opad': for (const m of e.m) I.organ(r + m, t, e.d * spb, 0.02, bus); break;
      case 'obass': I.organ(r + e.m, t, e.d * spb, 0.035, bus); break;
      case 'rbass': I.bass(r + e.m, t, spb * 0.5, 0.1, bus); break;
      case 'kick': I.kick(t, 0.22 * e.vol, bus); break;
      case 'snare': I.snare(t, 0.1 * e.vol, bus); break;
      case 'hat': I.hat(t, 0.04 * e.vol, bus); break;
      case 'sleigh': I.sleigh(t, 0.035 * e.vol, bus); break;
    }
  }

  // ---------- Musik-Steuerung ----------
  let current = null, wanted = null;
  const cache = {};
  function startTrack(name) {
    const v = V[name]; if (!v) return;
    if (!cache[name]) cache[name] = build(v);
    const g = ctx.createGain();
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(1, now + 1.4);
    g.connect(musicBus);
    current = { name, v, g, song: cache[name], idx: 0, start: now + 0.15 };
  }
  function stopTrack(tr, fade = 1.2) {
    if (!tr) return;
    const now = ctx.currentTime;
    tr.g.gain.cancelScheduledValues(now);
    tr.g.gain.setValueAtTime(tr.g.gain.value || 0.0001, now);
    tr.g.gain.exponentialRampToValueAtTime(0.0001, now + fade);
    setTimeout(() => tr.g.disconnect(), (fade + 0.6) * 1000);
  }
  function tick() {
    if (!ctx || ctx.state !== 'running') return;
    if (wanted !== (current && current.name)) {
      stopTrack(current); current = null;
      if (wanted) startTrack(wanted);
    }
    const tr = current; if (!tr) return;
    const spb = 60 / tr.v.bpm, now = ctx.currentTime;
    // Musik aus: nichts einplanen, Position mitlaufen lassen
    if (!prefs.on || !prefs.music || (window.G && G.fast)) { tr.start = now + 0.1; tr.idx = 0; return; }
    const horizon = now + 0.4;
    let guard = 0;
    while (guard++ < 200) {
      const e = tr.song.ev[tr.idx];
      const t = tr.start + e.b * spb;
      if (t > horizon) break;
      if (t >= now - 0.05) playEvent(tr, e, Math.max(t, now));
      tr.idx++;
      if (tr.idx >= tr.song.ev.length) { tr.idx = 0; tr.start += tr.song.len * spb; }
    }
  }

  const SCENE_MUSIC = { marktplatz: 'town', marktost: 'town', baeckerei: 'inside', ohmeier: 'inside', fairkehrt: 'inside', radladen: 'inside',
    gluehwein: 'waltz', kapelle: 'dark', taubenschlag: 'dark', schlittenhang: 'hang' };
  S.music = function (name) { wanted = name; };
  S.sceneMusic = function (sceneId) { wanted = SCENE_MUSIC[sceneId] || 'town'; };

  /** kurzer Siegestusch; die laufende Musik pausiert solange */
  S.fanfare = function () {
    if (quiet() || !prefs.on || !prefs.music) return;
    const held = wanted; wanted = null;
    const t = ctx.currentTime + 0.1, b = musicBus, r = 62;
    const seq = [[12, 0, 0.16], [16, 0.16, 0.16], [19, 0.32, 0.16], [24, 0.48, 1.4]];
    for (const [m, dt, d] of seq) { I.brass(r + m, t + dt, d, 0.09, b); I.bell(r + m + 12, t + dt, d, 0.08, b); }
    for (const m of [0, 4, 7, 12]) I.brass(r + m, t + 0.48, 1.4, 0.04, b);
    for (let i = 0; i < 10; i++) I.kick(t + i * 0.05, 0.08, b);
    I.kick(t + 0.48, 0.25, b);
    noise(t + 0.48, 1.2, 0.05, b, { type: 'highpass', f: 6000 });
    setTimeout(() => { if (wanted === null) wanted = held; }, 2600);
  };

  // ---------- Geräusche ----------
  const lastPlay = {};
  const FX = {
    click(t, b) { tone('sine', 1250, t, 0.05, 0.12, b, { perc: true }); },
    pickup(t, b) { [79, 83, 86, 91].forEach((m, i) => I.bell(m, t + i * 0.07, 0.3, 0.2, b)); },
    ok(t, b) { I.bell(84, t, 0.3, 0.22, b); I.bell(91, t + 0.11, 0.5, 0.22, b); },
    fail(t, b) { tone('square', 233, t, 0.22, 0.09, b, { perc: true, lp: 900, slide: 160 }); tone('square', 175, t + 0.18, 0.3, 0.09, b, { perc: true, lp: 800, slide: 120 }); },
    notes(t, b) { noise(t, 0.12, 0.08, b, { f: 3000, q: 0.6 }); I.bell(81, t + 0.06, 0.3, 0.12, b); I.bell(86, t + 0.15, 0.4, 0.12, b); },
    whoosh(t, b) { noise(t, 0.38, 0.09, b, { f: 400, f2: 1800, q: 0.8, a: 0.12 }); },
    doorbell(t, b) { [93, 98, 93, 98].forEach((m, i) => I.bell(m, t + i * 0.09, 0.2, 0.12, b)); },
    door(t, b) { noise(t, 0.25, 0.18, b, { type: 'lowpass', f: 300 }); tone('sawtooth', 95, t + 0.05, 0.6, 0.05, b, { lp: 650, slide: 150, vib: [11, 12] }); },
    stepSnow(t, b) { // dumpfes Knirschen: weicher Tritt plus viele kleine, gedämpfte Knackser
      tone('sine', 80 + Math.random() * 15, t, 0.09, 0.08, b, { perc: true });
      noise(t, 0.17, 0.055, b, { type: 'lowpass', f: 480 + Math.random() * 120, a: 0.015 });
      const n = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) noise(t + 0.01 + i * 0.013 + Math.random() * 0.008, 0.03, 0.042 * (1 - i / (n * 1.6)), b, { type: 'lowpass', f: 850 + Math.random() * 450, q: 1.5 });
    },
    knarz(t, b) { // leises Knarzen einer alten Holzstufe
      tone('sawtooth', 120, t, 0.24, 0.05, b, { a: 0.02, r: 0.08, lp: 750, q: 3, slide: 95, trem: [34, 0.9] });
      tone('sawtooth', 180, t + 0.04, 0.16, 0.025, b, { a: 0.02, r: 0.06, lp: 900, q: 4, slide: 150, trem: [41, 0.9] });
      noise(t, 0.2, 0.02, b, { f: 900, q: 6, a: 0.03 });
    },
    stepWood(t, b) { tone('sine', 150 + Math.random() * 30, t, 0.07, 0.07, b, { perc: true }); noise(t, 0.04, 0.03, b, { type: 'lowpass', f: 900 }); },
    klingel(t, b) {
      for (const dt of [0, 0.16]) for (const [fq, v] of [[2100, 0.12], [2100 * 1.49, 0.06], [2100 * 2.02, 0.04]]) tone('sine', fq, t + dt, 0.7, v, b, { perc: true });
    },
    gurr(t, b) {
      tone('sine', 340, t, 0.42, 0.2, b, { a: 0.04, r: 0.12, slide: 270, vib: [16, 45], lp: 900 });
      tone('sine', 300, t + 0.48, 0.3, 0.14, b, { a: 0.03, r: 0.1, slide: 250, vib: [16, 40], lp: 900 });
    },
    kasse(t, b) { noise(t, 0.05, 0.12, b, { type: 'highpass', f: 2500 }); tone('square', 600, t, 0.05, 0.04, b, { perc: true }); I.bell(96, t + 0.08, 0.6, 0.18, b); I.bell(100, t + 0.14, 0.8, 0.14, b); },
    kurbel(t, b) {
      for (let i = 0; i < 12; i++) noise(t + i * 0.06, 0.025, 0.08, b, { type: 'highpass', f: 3200 });
      tone('sawtooth', 70, t, 0.9, 0.05, b, { a: 0.2, r: 0.2, lp: 500, slide: 240 });
    },
    motor(t, b) { tone('sawtooth', 52, t, 1.7, 0.2, b, { a: 0.1, r: 0.4, lp: 380, slide: 78, trem: [24, 0.6] }); tone('square', 104, t, 1.7, 0.05, b, { a: 0.1, r: 0.4, lp: 300, slide: 150 }); },
    pfiff(t, b) { tone('sine', 2650, t, 1.1, 0.14, b, { a: 0.02, r: 0.12, vib: [28, 190] }); },
    kufen(t, b, o) { const d = (o && o.dur) || 3; noise(t, d, 0.07, b, { f: 700, f2: 1400, q: 0.7, a: 0.3, hold: 0.7 }); noise(t, d, 0.03, b, { type: 'highpass', f: 5000, a: 0.3, hold: 0.7 }); },
    jubel(t, b) {
      for (let i = 0; i < 26; i++) noise(t + Math.random() * 1.6, 0.4 + Math.random() * 0.6, 0.04, b, { f: 600 + Math.random() * 1600, q: 3, a: 0.08 });
      for (let i = 0; i < 4; i++) tone('sine', 1800 + Math.random() * 900, t + 0.3 + Math.random(), 0.5, 0.03, b, { a: 0.05, r: 0.15, slide: 2600 });
      for (let i = 0; i < 14; i++) noise(t + 0.2 + i * 0.11 + Math.random() * 0.04, 0.03, 0.06, b, { f: 1200, q: 1.5 });
    },
  };

  S.play = function (name, o) {
    if (quiet() || !prefs.on || !prefs.sfx || ctx.state !== 'running') return;
    const fx = FX[name]; if (!fx) return;
    const now = ctx.currentTime;
    if (lastPlay[name] && now - lastPlay[name] < 0.04) return; // nicht stapeln
    lastPlay[name] = now;
    fx(now + 0.01, sfxBus, o);
  };

  // ---------- Brabbeln beim Sprechen ----------
  // je Figur: Grundton (Hz), Tempo (ms pro Silbe), Klangfarbe, Lautstärke, optional { lp, dry, q2 } für hellere/klarere Stimmen
  const VOICES = {
    fini: [300, 95, 'triangle', 0.11], resi: [235, 105, 'triangle', 0.16], ohmeier: [270, 100, 'triangle', 0.13],
    fairhuber: [220, 115, 'triangle', 0.17], gustl: [140, 125, 'triangle', 0.27], gloeckl: [150, 120, 'triangle', 0.27],
    gerti: [190, 105, 'triangle', 0.24], wimmer: [135, 110, 'triangle', 0.28, { lp: 2600, dry: 0.6, q2: 0.45 }], konstantin: [210, 90, 'triangle', 0.21],
    schneemann: [110, 140, 'sine', 0.28],
  };
  // Vokal-Formanten (a, e, i, o, u) – geben jeder Silbe einen weichen, stimmähnlichen Klang
  const VOWELS = [[750, 1150], [500, 1750], [320, 2200], [500, 850], [330, 750]];
  /**
   * Brabbeln als eine durchgehende Stimme (ohne Vibrato): ein Oszillator läuft den ganzen Satz,
   * Tonhöhe und Vokal gleiten weich von Silbe zu Silbe, die Lautstärke wogt nur leicht.
   * Gibt eine Stopp-Funktion zurück (für „Text überspringen“).
   */
  S.babble = function (who, text) {
    const v = VOICES[who];
    if (!v || quiet() || !prefs.on || !prefs.sfx || ctx.state !== 'running') return () => {};
    const [base, ms, type, vol, extra = {}] = v;
    const plain = String(text).replace(/<[^>]+>/g, '').replace(/\*[^*]*\*/g, ' ');
    const words = plain.split(/\s+/).filter((w) => /[A-Za-zÄÖÜäöüß0-9]/.test(w));
    // Silbenfolge: 1 = Silbe, 0 = kurze Atempause zwischen Wörtern / nach Satzzeichen
    const seq = [];
    for (const w of words) {
      const n = Math.max(1, Math.min(3, Math.round(w.length / 3)));
      for (let i = 0; i < n; i++) seq.push(1);
      if (/[.!?…,;:]$/.test(w)) seq.push(0);
    }
    const steps = Math.min(seq.length, Math.floor(3000 / ms));
    if (!steps) return () => {};
    const st = ms / 1000;
    const t0 = ctx.currentTime + 0.01;
    // Klangkette: Oszillator -> zwei Formantfilter -> Hüllkurve -> Geräusche-Bus
    const osc = ctx.createOscillator(); osc.type = type;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0);
    // breite, sanfte Formanten und ein Tiefpass obendrauf: weich statt metallisch
    const f1 = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter(), g2 = ctx.createGain(), dry = ctx.createGain(), soft = ctx.createBiquadFilter();
    f1.type = f2.type = 'bandpass'; f1.Q.value = 1.6; f2.Q.value = 2.2; g2.gain.value = extra.q2 || 0.25; dry.gain.value = extra.dry || 0.35;
    soft.type = 'lowpass'; soft.frequency.value = extra.lp || 1500; soft.Q.value = 0.5;
    osc.connect(f1); osc.connect(f2); osc.connect(dry); f2.connect(g2);
    f1.connect(soft); g2.connect(soft); dry.connect(soft); soft.connect(g); g.connect(sfxBus);
    // Verlauf vorausplanen: weiche Übergänge statt einzelner Piepser
    let t = t0, pitch = base;
    osc.frequency.setValueAtTime(base, t0);
    for (let i = 0; i < steps; i++) {
      const on = seq[i];
      const [v1, v2] = VOWELS[Math.floor(Math.random() * VOWELS.length)];
      pitch = base * (0.9 + Math.random() * 0.25) * (i === steps - 1 ? 0.88 : 1); // am Satzende leicht absinken
      osc.frequency.setTargetAtTime(pitch, t, st * 0.35);
      f1.frequency.setTargetAtTime(v1, t, st * 0.3);
      f2.frequency.setTargetAtTime(v2, t, st * 0.3);
      // Silbe: Lautstärke schwillt rasch an und fällt zwischen den Silben deutlich ab; Pause: fast still
      // kein Nachklingen: zwischen Silben und in Pausen ganz leise
      g.gain.setTargetAtTime(on ? vol : 0.0001, t, on ? st * 0.08 : 0.015);
      if (on) g.gain.setTargetAtTime(0.0001, t + st * 0.55, st * 0.08);
      t += st;
    }
    g.gain.setTargetAtTime(0.0001, t, 0.015);
    osc.start(t0);
    const end = t + 0.1;
    osc.stop(end);
    let stopped = false;
    return () => {
      if (stopped) return; stopped = true;
      const now = ctx.currentTime;
      if (now < end) {
        g.gain.cancelScheduledValues(now);
        g.gain.setTargetAtTime(0.0001, now, 0.015);
        try { osc.stop(now + 0.08); } catch (e) { /* schon gestoppt */ }
      }
    };
  };

  // Geräusche passend zu bestimmten Sätzen
  S.onSay = function (who, text) {
    if (who === 'gurrbert') { S.play('gurr'); return; }
    if (/BRRR/.test(text)) S.play('motor');
    else if (/TRRR/.test(text)) S.play('pfiff');
    else if (/DING DING/.test(text)) S.play('klingel');
    else if (/Kurbel, kurbel/i.test(text)) S.play('kurbel');
  };

  const SHOPS = ['baeckerei', 'ohmeier', 'fairkehrt'], DOORS = ['kapelle', 'taubenschlag'];
  S.sceneChange = function (from, to) {
    if (SHOPS.includes(to) && !SHOPS.includes(from) && from !== 'radladen') S.play('doorbell');
    else if (SHOPS.includes(from) && !SHOPS.includes(to) && to !== 'radladen') S.play('doorbell');
    else if (DOORS.includes(to) || DOORS.includes(from)) S.play('door');
    S.sceneMusic(to);
  };

  /** Testhilfe: Zustand und aktuelle Lautstärke (0..1) */
  let analyser = null;
  S.debug = function () {
    if (!ctx) return { state: 'none' };
    if (!analyser) { analyser = ctx.createAnalyser(); analyser.fftSize = 2048; master.connect(analyser); }
    const buf = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(buf);
    let peak = 0; for (const x of buf) peak = Math.max(peak, Math.abs(x));
    return { state: ctx.state, track: current && current.name, wanted, peak: +peak.toFixed(3), prefs: Object.assign({}, prefs) };
  };

  // ---------- Schalter ----------
  function applyPrefs() {
    savePrefs();
    if (ctx) {
      const now = ctx.currentTime;
      master.gain.setTargetAtTime(prefs.on ? MASTER : 0, now, 0.05);
      musicBus.gain.setTargetAtTime(prefs.music ? MUSIC_VOL : 0, now, 0.1);
      sfxBus.gain.setTargetAtTime(prefs.sfx ? SFX_VOL : 0, now, 0.05);
      if (prefs.on && ctx.state === 'suspended' && !document.hidden) ctx.resume();
    }
    const b = document.getElementById('btn-sound');
    if (b) { b.innerHTML = prefs.on ? '🔊' : '🔇'; b.title = prefs.on ? 'Ton aus' : 'Ton an'; b.setAttribute('aria-label', b.title); }
    const bm = document.getElementById('menu-music'), bs = document.getElementById('menu-sfx');
    if (bm) bm.textContent = 'Musik: ' + (prefs.music ? 'an' : 'aus');
    if (bs) bs.textContent = 'Geräusche: ' + (prefs.sfx ? 'an' : 'aus');
  }
  S.toggle = function (k) { S.unlock(); prefs[k] = !prefs[k]; applyPrefs(); };

  S.initUI = function () {
    const b = document.getElementById('btn-sound');
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); S.toggle('on'); });
    const bm = document.getElementById('menu-music'), bs = document.getElementById('menu-sfx');
    if (bm) bm.addEventListener('click', () => S.toggle('music'));
    if (bs) bs.addEventListener('click', () => S.toggle('sfx'));
    // jeder erste Klick oder Tastendruck schaltet den Ton frei
    const first = () => S.unlock();
    document.addEventListener('pointerdown', first, { capture: true });
    document.addEventListener('keydown', first, { capture: true });
    applyPrefs();
  };
})();
