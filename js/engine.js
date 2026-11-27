/* =========================================================
   Die Kufenkönigin von Grafing – Engine
   Kleine Point-and-Click-Engine: Szenen, Laufen, Sprechblasen,
   Dialoge, Inventar, Merkzettel, Speichern.
   ========================================================= */
(function () {
  'use strict';

  const W = 1280, H = 720;
  const SAVE_KEY = 'kufenkoenigin-save-v1';
  const PLAYER_H = 300; // Höhe von Fini bei Skalierung 1

  const G = window.G = {
    W, H,
    scenes: {},
    items: {},
    combos: {},
    tasks: [],
    state: null,
    busy: false,
    mode: 'use',
    selected: null,
    debug: /debug/.test(location.hash),
  };

  // ---------- DOM ----------
  const $ = (id) => document.getElementById(id);
  let svg, layerBg, layerActors, layerFg, layerHot, bubbles, hoverLabel, invEl, choicesEl,
    narrationEl, fadeEl, dragEl, sceneTitleEl, stageWrap;

  // ---------- Hilfen ----------
  const wait = G.wait = (ms) => (G.fast ? Promise.resolve() : new Promise((r) => setTimeout(r, ms)));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  G.clamp = clamp; G.lerp = lerp;
  G.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ---------- Zustand ----------
  G.newState = function () {
    return {
      scene: 'marktplatz', px: 640, py: 650, face: 1,
      inv: ['kaugummi', 'handschuh'],
      flags: {},
      seen: {},
      playMs: 0,
    };
  };
  G.f = (name) => !!(G.state && G.state.flags[name]);
  G.fv = (name) => G.state.flags[name];
  G.flag = (name, val = true) => { G.state.flags[name] = val; };
  G.has = (id) => G.state.inv.includes(id);

  G.give = function (id, silent) {
    if (!G.has(id)) G.state.inv.push(id);
    renderInventory(id);
    if (!silent) G.toastItem(id);
  };
  G.take = function (id) {
    G.state.inv = G.state.inv.filter((x) => x !== id);
    if (G.selected === id) selectItem(null);
    renderInventory();
  };

  G.save = function () {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(G.state)); } catch (e) { /* egal */ }
  };
  G.load = function () {
    try {
      const s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && s.scene && G.scenes[s.scene]) return s;
    } catch (e) { /* egal */ }
    return null;
  };
  G.clearSave = function () { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* egal */ } };

  // ---------- Szene ----------
  G.scene = () => G.scenes[G.state.scene];

  function scaleAt(y) {
    const w = G.scene().walk;
    const t = clamp((y - w.y1) / Math.max(1, w.y2 - w.y1), 0, 1);
    return lerp(w.s1, w.s2, t);
  }
  G.scaleAt = scaleAt;

  function clampToWalk(x, y) {
    const w = G.scene().walk;
    return [clamp(x, w.x1, w.x2), clamp(y, w.y1, w.y2)];
  }

  G.render = function () {
    const sc = G.scene();
    const st = G.state;
    layerBg.innerHTML = sc.draw(st);
    layerFg.innerHTML = sc.fg ? sc.fg(st) : '';
    liftUi();
    renderActors();
    renderHotspots();
    Snow.set(!!sc.outdoor, sc.snowDensity);
  };
  G.refresh = function () { renderActors(); renderHotspots(); layerBg.innerHTML = G.scene().draw(G.state); layerFg.innerHTML = G.scene().fg ? G.scene().fg(G.state) : ''; liftUi(); };
  /** Ausgangspfeile und -beschriftungen immer über Figuren und Gegenständen zeichnen */
  function liftUi() { layerBg.querySelectorAll('.exit-ui').forEach((el) => layerFg.appendChild(el)); }

  /** Beschriftungen mit data-maxw notfalls verkleinern, damit sie in ihre Fläche passen */
  function fitTexts() {
    if (!svg) return;
    svg.querySelectorAll('text[data-maxw]:not([data-fit])').forEach((t) => {
      t.setAttribute('data-fit', '1');
      const maxw = +t.dataset.maxw;
      let w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { return; }
      if (!w || w <= maxw) return;
      const fs = parseFloat(t.getAttribute('font-size')) || 16;
      const nfs = Math.max(6, fs * maxw / w * 0.98);
      t.setAttribute('font-size', nfs.toFixed(2));
      if (t.dataset.cy) t.setAttribute('y', (+t.dataset.cy + nfs * 0.36).toFixed(1));
    });
  }
  G.fitTexts = fitTexts;

  let actorDefs = [];
  function renderActors() {
    const sc = G.scene();
    actorDefs = sc.actors ? sc.actors(G.state).filter(Boolean) : [];
    const items = actorDefs.map((a) => ({ y: a.y + (a.z || 0), html: actorHTML(a) }));
    if (!sc.noPlayer) items.push({ y: G.state.py, html: '<g id="player" class="actor"></g>' });
    items.sort((a, b) => a.y - b.y);
    layerActors.innerHTML = items.map((i) => i.html).join('');
    if (!sc.noPlayer) buildPlayer();
  }
  function actorHTML(a) {
    const s = a.s || 1;
    return `<g class="actor ${a.cls || ''}" id="actor-${a.id}" transform="translate(${a.x},${a.y}) scale(${a.flip ? -s : s},${s})">${a.svg}</g>`;
  }
  G.actor = (id) => actorDefs.find((a) => a.id === id);
  G.setActor = function (id, patch) {
    const a = G.actor(id);
    if (!a) return;
    Object.assign(a, patch);
    const el = $('actor-' + id);
    if (el) {
      const s = a.s || 1;
      el.setAttribute('transform', `translate(${a.x},${a.y}) scale(${a.flip ? -s : s},${s})`);
      if (patch.svg) el.innerHTML = a.svg;
    }
  };

  let hotspots = [];
  function renderHotspots() {
    hotspots = (G.scene().hotspots(G.state) || []).filter(Boolean);
    layerHot.innerHTML = hotspots.map((h, i) => {
      const cls = 'hs' + (G.debug ? ' debug' : '');
      if (h.r) return `<rect class="${cls}" data-i="${i}" x="${h.r[0]}" y="${h.r[1]}" width="${h.r[2]}" height="${h.r[3]}"/>`;
      if (h.p) return `<polygon class="${cls}" data-i="${i}" points="${h.p.join(' ')}"/>`;
      if (h.e) return `<ellipse class="${cls}" data-i="${i}" cx="${h.e[0]}" cy="${h.e[1]}" rx="${h.e[2]}" ry="${h.e[3]}"/>`;
      return '';
    }).join('');
  }
  function hsCenter(h) {
    if (h.r) return [h.r[0] + h.r[2] / 2, h.r[1] + h.r[3] / 2];
    if (h.e) return [h.e[0], h.e[1]];
    if (h.p) {
      let x = 0, y = 0; const n = h.p.length / 2;
      for (let i = 0; i < h.p.length; i += 2) { x += h.p[i]; y += h.p[i + 1]; }
      return [x / n, y / n];
    }
    return [640, 500];
  }
  function hsBottom(h) {
    if (h.r) return h.r[1] + h.r[3];
    if (h.e) return h.e[1] + h.e[3];
    if (h.p) { let m = 0; for (let i = 1; i < h.p.length; i += 2) m = Math.max(m, h.p[i]); return m; }
    return 600;
  }

  // ---------- Spielerfigur ----------
  const P = { el: null, legL: null, legR: null, armL: null, armR: null, body: null, phase: 0, walking: false };
  function buildPlayer() {
    P.el = $('player');
    if (!P.el) return;
    P.el.innerHTML = C.fini(G.state);
    P.legL = P.el.querySelector('.leg-l');
    P.legR = P.el.querySelector('.leg-r');
    P.armL = P.el.querySelector('.arm-l');
    P.armR = P.el.querySelector('.arm-r');
    P.body = P.el.querySelector('.bodyall');
    placePlayer();
  }
  function placePlayer() {
    if (!P.el) return;
    const s = scaleAt(G.state.py) * (G.scene().playerScale || 1);
    P.el.setAttribute('transform', `translate(${G.state.px.toFixed(1)},${G.state.py.toFixed(1)}) scale(${G.state.face * s},${s})`);
    const sw = P.walking ? Math.sin(P.phase) : 0;
    const a = sw * 24, b = sw * 18;
    if (P.legL) P.legL.setAttribute('transform', `rotate(${a} ${P.legL.dataset.px} ${P.legL.dataset.py})`);
    if (P.legR) P.legR.setAttribute('transform', `rotate(${-a} ${P.legR.dataset.px} ${P.legR.dataset.py})`);
    if (P.armL) P.armL.setAttribute('transform', `rotate(${-b} ${P.armL.dataset.px} ${P.armL.dataset.py})`);
    if (P.armR) P.armR.setAttribute('transform', `rotate(${b} ${P.armR.dataset.px} ${P.armR.dataset.py})`);
    if (P.body) P.body.setAttribute('transform', `translate(0 ${P.walking ? -Math.abs(Math.cos(P.phase)) * 5 : 0})`);
  }
  function resortPlayer() {
    // Spieler in der Zeichenreihenfolge nach y einsortieren
    if (!P.el) return;
    const kids = Array.from(layerActors.children);
    const py = G.state.py;
    let before = null;
    for (const k of kids) {
      if (k === P.el) continue;
      const a = actorDefs.find((d) => 'actor-' + d.id === k.id);
      if (a && a.y + (a.z || 0) > py) { before = k; break; }
    }
    if (before) { if (P.el.nextSibling !== before) layerActors.insertBefore(P.el, before); }
    else if (layerActors.lastChild !== P.el) layerActors.appendChild(P.el);
  }

  let walkToken = 0;
  G.walk = function (x, y, opts = {}) {
    const sc = G.scene();
    if (sc.noPlayer) return Promise.resolve(true);
    [x, y] = opts.free ? [x, y] : clampToWalk(x, y);
    const token = ++walkToken;
    if (G.fast) { G.state.px = x; G.state.py = y; placePlayer(); resortPlayer(); return Promise.resolve(true); }
    return new Promise((resolve) => {
      const speed = (opts.speed || 330);
      let last = performance.now();
      const dx0 = x - G.state.px;
      if (Math.abs(dx0) > 2) G.state.face = dx0 < 0 ? -1 : 1;
      P.walking = true;
      function step(now) {
        if (token !== walkToken) { resolve(false); return; }
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        const dx = x - G.state.px, dy = (y - G.state.py) * 1.6;
        const dist = Math.hypot(dx, dy);
        const s = scaleAt(G.state.py);
        const v = speed * dt * (0.55 + 0.45 * s);
        if (dist <= v || dist < 1) {
          G.state.px = x; G.state.py = y; P.walking = false; placePlayer(); resortPlayer();
          resolve(true); return;
        }
        G.state.px += dx / dist * v;
        G.state.py += (dy / dist * v) / 1.6;
        P.phase += dt * 11;
        placePlayer(); resortPlayer();
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  };
  G.stopWalk = function () { walkToken++; P.walking = false; placePlayer(); };
  G.face = function (dir) {
    if (typeof dir === 'number' && Math.abs(dir) > 1) dir = dir < G.state.px ? -1 : 1; // x-Koordinate
    G.state.face = dir < 0 ? -1 : 1; placePlayer();
  };
  G.place = function (x, y, face) {
    G.state.px = x; G.state.py = y; if (face) G.state.face = face; placePlayer(); resortPlayer();
  };

  // ---------- Sprechen ----------
  let skipFn = null;
  function speakerAnchor(who) {
    if (who === 'fini') {
      const s = scaleAt(G.state.py) * (G.scene().playerScale || 1);
      return [G.state.px, G.state.py - PLAYER_H * s - 14];
    }
    const a = G.actor(who);
    if (a) return [a.x + (a.headX || 0) * (a.s || 1) * (a.flip ? -1 : 1), a.y + (a.head || -300) * (a.s || 1) - 12];
    const sp = G.scene().speakers;
    if (sp && sp[who]) return sp[who];
    return [640, 140];
  }
  const NAMES = {};
  G.names = NAMES;
  G.say = function (who, text, opts = {}) {
    if (who === 'narrator') return G.narrate(text);
    if (G.fast) { if (G.log) G.log.push((NAMES[who] ? NAMES[who].name : who) + ": " + text); return Promise.resolve(); }
    return new Promise((resolve) => {
      const [ax, ay] = speakerAnchor(who);
      const b = document.createElement('div');
      b.className = 'bubble';
      const info = NAMES[who] || { name: who, color: '#2a1f2d' };
      b.innerHTML = `<span class="who" style="color:${info.color}">${info.name}</span>${text}`;
      bubbles.appendChild(b);
      // Position (in % der Bühne), am Rand einklemmen
      const wrapW = stageWrap.clientWidth || 1;
      const bw = b.offsetWidth / wrapW * W;
      const bh = b.offsetHeight / wrapW * W;
      let cx = clamp(ax, bw / 2 + 12, W - bw / 2 - 12);
      let cy = clamp(ay, bh + 60, H - 10);
      b.style.left = (cx / W * 100) + '%';
      b.style.top = (cy / H * 100) + '%';
      const tail = clamp(50 + (ax - cx) / bw * 100, 12, 88);
      b.style.setProperty('--tail', tail + '%');
      const el = who === 'fini' ? P.el : $('actor-' + who);
      if (el) el.classList.add('talking');
      if (G.log) G.log.push((NAMES[who] ? NAMES[who].name : who) + ': ' + text);
      const dur = G.fast ? 5 : (opts.dur || clamp(900 + text.replace(/<[^>]+>/g, '').length * 52, 1700, 8500));
      let done = false;
      const finish = () => {
        if (done) return; done = true;
        clearTimeout(t);
        if (el) el.classList.remove('talking');
        b.remove();
        skipFn = null;
        setTimeout(resolve, 90);
      };
      const t = setTimeout(finish, dur);
      skipFn = finish;
    });
  };

  G.narrate = function (text) {
    if (G.fast) { if (G.log) G.log.push("[Erzähler] " + text); return Promise.resolve(); }
    return new Promise((resolve) => {
      narrationEl.innerHTML = text + '<span class="more">(klicken zum Weiterlesen)</span>';
      narrationEl.style.display = 'block';
      const dur = G.fast ? 5 : clamp(2500 + text.length * 55, 4000, 14000);
      let done = false;
      const finish = () => {
        if (done) return; done = true;
        clearTimeout(t);
        narrationEl.style.display = 'none';
        skipFn = null;
        setTimeout(resolve, 120);
      };
      const t = setTimeout(finish, dur);
      skipFn = finish;
    });
  };

  // ---------- Dialog-Auswahl ----------
  G.choose = function (options, key) {
    return new Promise((resolve) => {
      choicesEl.innerHTML = '';
      options.forEach((o) => {
        const btn = document.createElement('button');
        btn.textContent = o.t;
        const sk = (key || '') + '|' + o.t;
        if (G.state.seen[sk] && !o.end) btn.classList.add('seen');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          G.state.seen[sk] = 1;
          choicesEl.classList.remove('open');
          invEl.style.visibility = '';
          resolve(o);
        });
        choicesEl.appendChild(btn);
      });
      choicesEl.classList.add('open');
      invEl.style.visibility = 'hidden';
      // Test-Hook: automatische Auswahl
      if (G.chooseQueue) {
        const want = G.chooseQueue.shift();
        let o = want ? options.find((x) => x.t.includes(want)) : null;
        if (!o) { if (G.log) G.log.push('[choose] nicht gefunden: ' + want + ' | Optionen: ' + options.map((x) => x.t).join(' / ')); o = options.find((x) => x.end) || options[options.length - 1]; }
        Promise.resolve().then(() => { choicesEl.classList.remove("open"); invEl.style.visibility = ""; resolve(o); });
      }
    });
  };

  /** Gesprächsschleife: optsFn liefert Optionen {t, if, say, silent, once, run, end} */
  G.talk = async function (who, optsFn) {
    for (;;) {
      const opts = optsFn().filter((o) => o && (o.if === undefined || (typeof o.if === 'function' ? o.if() : o.if)));
      const o = await G.choose(opts, who);
      if (!o.silent) await G.say('fini', o.say || o.t);
      if (o.once) G.flag(o.once);
      if (o.run) {
        const r = await o.run();
        if (r === 'end') break;
      }
      if (o.end) break;
      checkTasks();
    }
  };

  // ---------- Szenenwechsel ----------
  G.goto = async function (sceneId, x, y, face) {
    fadeEl.classList.add('on');
    await wait(G.fast ? 1 : 360);
    G.stopWalk();
    G.state.scene = sceneId;
    const sc = G.scene();
    const e = sc.entry || {};
    G.state.px = x !== undefined ? x : (e.x || 640);
    G.state.py = y !== undefined ? y : (e.y || 650);
    if (face) G.state.face = face;
    G.render();
    showSceneTitle(sc.title);
    G.save();
    fadeEl.classList.remove('on');
    await wait(G.fast ? 1 : 300);
    if (sc.onEnter) await sc.onEnter(G.state);
  };

  let titleTimer = null;
  function showSceneTitle(t) {
    if (!t) return;
    sceneTitleEl.textContent = t;
    sceneTitleEl.classList.add('show');
    clearTimeout(titleTimer);
    titleTimer = setTimeout(() => sceneTitleEl.classList.remove('show'), 2600);
  }

  // ---------- Aktionen ----------
  const FAIL_USE = [
    'Das ergibt nicht mal in meinem Kopf Sinn. Und da drin ergibt viel Sinn. Meistens.',
    'Nö. Einfach nö.',
    'Ich glaube, das wollen beide nicht.',
    'Interessante Idee. Falsche Idee, aber interessant.',
    'Wenn ich das mache, schreibt die Grafinger Zeitung über mich. Und nicht nett.',
    'Hm. Nein. Mein Bauchgefühl sagt Nein. Mein Kopf auch. Sogar meine Mütze.',
    'Das funktioniert nur in Videospielen. Oh, Moment...',
  ];
  const FAIL_INTERACT = [
    'Damit kann ich gerade nichts anfangen.',
    'Ich wüsste nicht, was ich damit machen soll.',
    'Lieber nicht anfassen. Das sagt meine Mama auch immer. Über alles.',
  ];
  const FAIL_COMBINE = [
    'Die zwei passen zusammen wie Glühwein und Zahnpasta.',
    'Das kombinier ich lieber nicht. Ich hab schon genug kaputt gemacht. Heute.',
    'Nein. Das gibt höchstens Ärger.',
  ];

  async function doLook(h) {
    const [cx] = hsCenter(h);
    G.face(cx);
    const l = typeof h.look === 'function' ? h.look() : h.look;
    if (l === undefined || l === null) { await G.say('fini', 'Hm. ' + h.name + '.'); return; }
    if (typeof l === 'string') await G.say('fini', l);
    else if (Array.isArray(l)) for (const line of l) await G.say('fini', line);
    else if (l && l.then) await l;
  }

  async function walkToHotspot(h) {
    let wx, wy;
    if (h.walk) [wx, wy] = h.walk;
    else { const [cx] = hsCenter(h); wx = cx; wy = hsBottom(h) + 20; }
    if (h.walk !== false) {
      const ok = await G.walk(wx, wy);
      if (!ok) return false;
    }
    if (h.face) G.face(h.face === 'l' ? -1 : h.face === 'r' ? 1 : h.face);
    else { const [cx] = hsCenter(h); if (Math.abs(cx - G.state.px) > 30) G.face(cx); }
    return true;
  }

  async function doInteract(h) {
    if (!(await walkToHotspot(h))) return;
    if (h.exit) {
      if (h.use) { const r = await h.use(); if (r === false) return; }
      const ex = h.exit;
      await G.goto(ex.to, ex.x, ex.y, ex.face);
      return;
    }
    if (h.use) { await h.use(); return; }
    await G.say('fini', G.pick(FAIL_INTERACT));
  }

  async function doUseItem(itemId, h) {
    if (!(await walkToHotspot(h))) return;
    const fn = h.items && (h.items[itemId] || h.items['*']);
    if (fn) { await fn(itemId); return; }
    const it = G.items[itemId];
    if (it && it.onAny) { const r = await it.onAny(h); if (r !== undefined) return; }
    await G.say('fini', G.pick(FAIL_USE));
  }

  async function doCombine(a, b) {
    const key = [a, b].sort().join('+');
    const fn = G.combos[key];
    if (fn) { await fn(); return; }
    if (a === b) { await G.say('fini', 'Das ist dasselbe Ding. Ich bin chaotisch, aber nicht SO chaotisch.'); return; }
    await G.say('fini', G.pick(FAIL_COMBINE));
  }

  async function lookItem(id) {
    const it = G.items[id];
    const d = typeof it.desc === 'function' ? it.desc() : it.desc;
    if (Array.isArray(d)) { for (const l of d) await G.say('fini', l); }
    else await G.say('fini', d);
  }

  G.run = async function (fn) {
    if (G.busy) return;
    G.busy = true;
    hoverLabel.style.display = 'none';
    try { await fn(); }
    catch (err) { console.error(err); }
    finally {
      G.busy = false;
      if (skipFn) skipFn();
      renderActors(); renderHotspots();
      layerBg.innerHTML = G.scene().draw(G.state);
      layerFg.innerHTML = G.scene().fg ? G.scene().fg(G.state) : '';
      liftUi();
      renderInventory();
      checkTasks();
      G.save();
    }
  };

  // ---------- Inventar ----------
  function renderInventory(newId) {
    const inv = G.state.inv;
    if (!inv.length) { invEl.innerHTML = '<span class="empty-hint">Rucksack leer. Wie mein Kopf vor dem ersten Kaffee.</span>'; return; }
    invEl.innerHTML = inv.map((id) => {
      const it = G.items[id];
      return `<div class="slot${G.selected === id ? ' selected' : ''}${newId === id ? ' new' : ''}" data-id="${id}" title="${it.name}">${it.icon}</div>`;
    }).join('');
  }
  G.renderInventory = renderInventory;

  function selectItem(id) {
    G.selected = id;
    if (id) { dragEl.innerHTML = G.items[id].icon; dragEl.style.display = 'block'; }
    else { dragEl.style.display = 'none'; }
    renderInventory();
  }
  G.selectItem = selectItem;

  G.toastItem = function (id) {
    renderInventory(id);
  };

  // ---------- Merkzettel ----------
  let lastTaskSig = '';
  function visibleTasks() {
    const out = [];
    for (const t of G.tasks) {
      if (t.show && !t.show()) continue;
      const done = t.done ? !!t.done() : false;
      if (t.sub && done) continue; // erledigte Unterpunkte ausblenden
      out.push({ text: typeof t.text === 'function' ? t.text() : t.text, done, sub: !!t.sub });
    }
    return out;
  }
  function checkTasks() {
    const sig = visibleTasks().map((t) => t.text + t.done).join('|');
    if (lastTaskSig && sig !== lastTaskSig) {
      const b = $('btn-notes');
      b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
    }
    lastTaskSig = sig;
  }
  G.checkTasks = checkTasks;
  G.resetTaskSig = () => { lastTaskSig = ''; checkTasks(); };
  function openNotes() {
    const list = $('task-list');
    list.innerHTML = visibleTasks().map((t) => `<li class="${t.done ? 'done' : ''}${t.sub ? ' sub' : ''}">${t.text}</li>`).join('');
    $('notes').classList.remove('hidden');
  }

  // ---------- Eingabe ----------
  function toStage(e) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const m = svg.getScreenCTM();
    if (!m) return [0, 0];
    const p = pt.matrixTransform(m.inverse());
    return [p.x, p.y];
  }
  function hotspotFromEvent(e) {
    const t = e.target.closest && e.target.closest('.hs');
    if (!t) return null;
    return hotspots[+t.dataset.i] || null;
  }

  function labelFor(h) {
    if (!h) return '';
    if (G.selected) return `${G.items[G.selected].name} → ${h.name}`;
    if (G.mode === 'look') return 'Ansehen: ' + h.name;
    return h.name;
  }

  function onMove(e) {
    dragEl.style.left = e.clientX + 'px';
    dragEl.style.top = e.clientY + 'px';
    if (G.busy || overlayOpen()) { hoverLabel.style.display = 'none'; return; }
    const h = hotspotFromEvent(e);
    if (!h) { hoverLabel.style.display = 'none'; return; }
    const r = stageWrap.getBoundingClientRect();
    hoverLabel.textContent = labelFor(h);
    hoverLabel.style.left = (e.clientX - r.left) + 'px';
    hoverLabel.style.top = (e.clientY - r.top) + 'px';
    hoverLabel.style.display = 'block';
  }

  function overlayOpen() {
    return !$('notes').classList.contains('hidden') || !$('menu').classList.contains('hidden') ||
      !$('help').classList.contains('hidden') || !$('title').classList.contains('hidden') || !$('ending').classList.contains('hidden');
  }

  function onStageClick(e, look) {
    if (overlayOpen()) return;
    if (G.busy) { if (skipFn) skipFn(); return; }
    if (G.inputLock) return;
    const h = hotspotFromEvent(e);
    const [x, y] = toStage(e);
    if (h) {
      if (look || G.mode === 'look') { if (G.selected) selectItem(null); G.run(() => doLook(h)); return; }
      if (G.selected) { const it = G.selected; selectItem(null); G.run(() => doUseItem(it, h)); return; }
      G.run(() => doInteract(h));
      return;
    }
    if (G.selected) { selectItem(null); return; }
    if (look) return;
    if (!G.scene().noPlayer) G.walk(x, y);
  }

  function onInvClick(e, look) {
    const slot = e.target.closest('.slot');
    if (!slot || G.busy || overlayOpen()) { if (G.busy && skipFn) skipFn(); return; }
    const id = slot.dataset.id;
    if (look || G.mode === 'look') { selectItem(null); G.run(() => lookItem(id)); return; }
    if (G.selected && G.selected !== id) { const a = G.selected; selectItem(null); G.run(() => doCombine(a, id)); return; }
    if (G.selected === id) { selectItem(null); return; }
    selectItem(id);
  }

  function setMode(m) {
    G.mode = m;
    const b = $('btn-mode');
    b.classList.toggle('look', m === 'look');
    b.innerHTML = m === 'look' ? '👁 <span>Ansehen</span>' : '✋ <span>Benutzen</span>';
  }

  // ---------- Schnee ----------
  const Snow = {
    ctx: null, flakes: [], on: false, density: 1,
    init(c) {
      this.ctx = c.getContext('2d');
      for (let i = 0; i < 170; i++) this.flakes.push(this.mk(true));
      const loop = () => { this.tick(); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    },
    mk(any) {
      return { x: Math.random() * W, y: any ? Math.random() * H : -10, r: 1 + Math.random() * 3.2, v: 20 + Math.random() * 45, w: Math.random() * 6.28, d: 0.3 + Math.random() * 0.7 };
    },
    set(on, density) { this.on = on; this.density = density || 1; if (!on) this.ctx.clearRect(0, 0, W, H); },
    last: 0,
    tick() {
      const now = performance.now();
      const dt = Math.min(0.05, (now - (this.last || now)) / 1000); this.last = now;
      if (!this.on) return;
      const c = this.ctx;
      c.clearRect(0, 0, W, H);
      const n = Math.floor(this.flakes.length * this.density);
      for (let i = 0; i < n; i++) {
        const f = this.flakes[i];
        f.y += f.v * dt * f.d * 1.4; f.w += dt * 1.3; f.x += Math.sin(f.w) * 12 * dt;
        if (f.y > H + 5) Object.assign(f, this.mk(false));
        c.globalAlpha = 0.45 + f.d * 0.5;
        c.fillStyle = '#fff';
        c.beginPath(); c.arc(f.x, f.y, f.r * f.d + 0.6, 0, 6.283); c.fill();
      }
      c.globalAlpha = 1;
    },
  };

  // ---------- Spielzeit ----------
  let lastTick = performance.now();
  setInterval(() => {
    const now = performance.now();
    if (G.state && !overlayOpen() && !document.hidden) G.state.playMs += now - lastTick;
    lastTick = now;
  }, 1000);

  // ---------- Start ----------
  G.init = function () {
    svg = $('stage'); layerBg = $('layer-bg'); layerActors = $('layer-actors'); layerFg = $('layer-fg'); layerHot = $('layer-hot');
    bubbles = $('bubbles'); hoverLabel = $('hover-label'); invEl = $('inventory'); choicesEl = $('choices');
    narrationEl = $('narration'); fadeEl = $('fade'); dragEl = $('drag-item'); sceneTitleEl = $('scene-title');
    stageWrap = $('stage-wrap');
    Snow.init($('snow'));
    new MutationObserver(fitTexts).observe(svg, { childList: true, subtree: true });

    stageWrap.addEventListener('pointermove', onMove);
    document.addEventListener('pointermove', (e) => { dragEl.style.left = e.clientX + 'px'; dragEl.style.top = e.clientY + 'px'; });
    stageWrap.addEventListener('click', (e) => {
      if (e.target.closest('#topbar')) return;
      onStageClick(e, false);
    });
    stageWrap.addEventListener('contextmenu', (e) => { e.preventDefault(); if (e.target.closest('#topbar')) return; onStageClick(e, true); });
    invEl.addEventListener('click', (e) => onInvClick(e, false));
    invEl.addEventListener('contextmenu', (e) => { e.preventDefault(); onInvClick(e, true); });
    $('bottombar').addEventListener('click', (e) => { if (G.busy && skipFn && !e.target.closest('#choices')) skipFn(); });

    $('btn-mode').addEventListener('click', (e) => { e.stopPropagation(); setMode(G.mode === 'use' ? 'look' : 'use'); });
    $('btn-notes').addEventListener('click', (e) => { e.stopPropagation(); openNotes(); });
    $('btn-menu').addEventListener('click', (e) => { e.stopPropagation(); $('menu').classList.remove('hidden'); });
    document.querySelectorAll('.overlay .close').forEach((b) => b.addEventListener('click', () => b.closest('.overlay').classList.add('hidden')));
    $('notes').addEventListener('click', (e) => { if (e.target.id === 'notes') $('notes').classList.add('hidden'); });
    $('menu-resume').addEventListener('click', () => $('menu').classList.add('hidden'));
    $('menu-help').addEventListener('click', () => { $('menu').classList.add('hidden'); $('help').classList.remove('hidden'); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('notes').classList.contains('hidden')) { $('notes').classList.add('hidden'); return; }
        if (!$('help').classList.contains('hidden')) { $('help').classList.add('hidden'); return; }
        if ($('title').classList.contains('hidden') && $('ending').classList.contains('hidden')) $('menu').classList.toggle('hidden');
        if (G.selected) selectItem(null);
      } else if ((e.key === 'm' || e.key === 'M') && $('title').classList.contains('hidden')) {
        if ($('notes').classList.contains('hidden')) openNotes(); else $('notes').classList.add('hidden');
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === '.') {
        if (skipFn) { e.preventDefault(); skipFn(); }
      }
    });
  };

  // Test-Hooks (für automatisierte Durchläufe)
  G._act = {
    hs: (name) => { renderHotspots(); return hotspots.find((h) => h.name === name); },
    interact: (name) => G.run(() => doInteract(G._act.hs(name))),
    use: (item, name) => G.run(() => doUseItem(item, G._act.hs(name))),
    look: (name) => G.run(() => doLook(G._act.hs(name))),
    combine: (a, b) => G.run(() => doCombine(a, b)),
    lookItem: (id) => G.run(() => lookItem(id)),
  };

  G.start = function (state) {
    G.state = state;
    selectItem(null);
    setMode('use');
    G.render();
    renderInventory();
    G.resetTaskSig();
    showSceneTitle(G.scene().title);
  };
})();
