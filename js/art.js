/* =========================================================
   Zeichen-Helfer: liefern SVG-Strings im Comic-Stil
   (dicke dunkle Konturen, flache Farben, warmes Licht)
   ========================================================= */
(function () {
  'use strict';
  const OL = '#2a1f2d';
  const A = window.A = { OL };

  /** deterministischer Zufall, damit Szenen bei jedem Rendern gleich aussehen */
  A.rng = function (seed) {
    let s = seed >>> 0 || 1;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  };

  A.defs = function (extra = '') {
    return `<defs>
      <radialGradient id="gWarm"><stop offset="0" stop-color="#ffd98a" stop-opacity=".85"/><stop offset=".45" stop-color="#ffb347" stop-opacity=".28"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>
      <radialGradient id="gSoft"><stop offset="0" stop-color="#fff2c4" stop-opacity=".6"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>
      <radialGradient id="gCool"><stop offset="0" stop-color="#cfe6ff" stop-opacity=".5"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></radialGradient>
      <linearGradient id="gSnowShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d4e2f3"/></linearGradient>
      <linearGradient id="gWinLit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a6"/><stop offset="1" stop-color="#ffb84d"/></linearGradient>
      <linearGradient id="gWinDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d4d7a"/><stop offset="1" stop-color="#2a3358"/></linearGradient>
      ${extra}
    </defs>`;
  };

  A.sky = function (id, stops, h = 720) {
    const st = stops.map((s) => `<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('');
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${st}</linearGradient></defs>
      <rect x="0" y="0" width="1280" height="${h}" fill="url(#${id})"/>`;
  };

  A.stars = function (n, seed, maxY = 260) {
    const r = A.rng(seed);
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = r() * 1280, y = r() * maxY, rad = 0.8 + r() * 1.6;
      s += `<circle class="twinkle t${1 + (i % 3)}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="#fffbe6" opacity=".9"/>`;
    }
    return s;
  };

  A.glow = (x, y, r, grad = 'gWarm', op = 1) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r}" fill="url(#${grad})" opacity="${op}" pointer-events="none"/>`;

  /** Schneekappe entlang eines Pfades (nur obere Kanten übergeben!) */
  A.snowLine = (d, w = 9) => `<path d="${d}" fill="none" stroke="${OL}" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fbfdff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  /** Schneehaufen (weiche Hügel) */
  A.snowPile = function (x, y, w, h, shade = true) {
    const d = `M${x},${y} C${x + w * 0.1},${y - h} ${x + w * 0.35},${y - h * 1.05} ${x + w * 0.5},${y - h * 0.75} C${x + w * 0.62},${y - h * 1.1} ${x + w * 0.9},${y - h * 0.9} ${x + w},${y} Z`;
    return `<path d="${d}" fill="${shade ? 'url(#gSnowShade)' : '#fbfdff'}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  };

  A.window = function (x, y, w, h, o = {}) {
    const lit = o.lit !== false;
    const frame = o.frame || '#fdf6e9';
    const arch = o.arch ? `M${x},${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} L${x + w},${y + h} L${x},${y + h} Z` : `M${x},${y} h${w} v${h} h${-w} Z`;
    let s = '';
    if (lit && o.glow !== false) s += A.glow(x + w / 2, y + h / 2, Math.max(w, h) * 0.9, 'gWarm', 0.55);
    s += `<path d="${arch}" fill="${lit ? 'url(#gWinLit)' : 'url(#gWinDark)'}" stroke="${OL}" stroke-width="3"/>`;
    if (o.curtain) s += `<path d="M${x + 2},${y + 3} q${w * 0.25},${h * 0.45} 0,${h - 6} M${x + w - 2},${y + 3} q${-w * 0.25},${h * 0.45} 0,${h - 6}" stroke="${o.curtain}" stroke-width="${w * 0.18}" fill="none" opacity=".85"/>`;
    if (o.cross !== false) {
      s += `<path d="M${x + w / 2},${y + (o.arch ? 2 : 0)} V${y + h} M${x},${y + h * 0.45} H${x + w}" stroke="${frame}" stroke-width="3.5"/>`;
    }
    s += `<path d="${arch}" fill="none" stroke="${frame}" stroke-width="3" transform="translate(0,0)" opacity=".0"/>`;
    if (o.sill !== false) s += `<rect x="${x - 4}" y="${y + h}" width="${w + 8}" height="6" rx="2" fill="#e9dcc4" stroke="${OL}" stroke-width="2.5"/>` + `<path d="M${x - 3},${y + h + 1} q${(w + 6) / 2},-7 ${w + 6},0" fill="#fbfdff" stroke="${OL}" stroke-width="2"/>`;
    if (o.shutters) {
      const c = o.shutters;
      s += `<rect x="${x - w * 0.42 - 3}" y="${y}" width="${w * 0.42}" height="${h}" fill="${c}" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<rect x="${x + w + 3}" y="${y}" width="${w * 0.42}" height="${h}" fill="${c}" stroke="${OL}" stroke-width="2.5"/>`;
      for (let i = 1; i < 5; i++) {
        const yy = y + h * i / 5;
        s += `<path d="M${x - w * 0.42},${yy} h${w * 0.42 - 6} M${x + w + 6},${yy} h${w * 0.42 - 6}" stroke="${OL}" stroke-width="1.2" opacity=".5"/>`;
      }
    }
    if (o.wreath) s += A.wreath(x + w / 2, y + h * 0.45, Math.min(w, h) * 0.28);
    return s;
  };

  A.wreath = function (x, y, r) {
    let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${OL}" stroke-width="${r * 0.62 + 3}"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#2f7d4f" stroke-width="${r * 0.62}"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#3f9a62" stroke-width="${r * 0.25}" stroke-dasharray="3 5"/>`;
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * 6.283 + 0.4;
      s += `<circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" r="${(r * 0.16).toFixed(1)}" fill="#d63a3a" stroke="${OL}" stroke-width="1"/>`;
    }
    s += `<path d="M${x - r * 0.35},${y + r * 0.9} l${r * 0.35},${-r * 0.25} l${r * 0.35},${r * 0.25} l-${r * 0.12},${r * 0.55} M${x},${y + r * 0.65} l-${r * 0.22},${r * 0.6}" fill="none" stroke="#d63a3a" stroke-width="${Math.max(2, r * 0.18)}" stroke-linecap="round"/>`;
    return s;
  };

  /** Lichterkette mit Durchhang */
  A.lights = function (x1, y1, x2, y2, sag, n, seed = 3) {
    const r = A.rng(seed);
    const cols = ['#ffd36e', '#ff8a5c', '#fff3c4', '#9be2ff', '#ffd36e'];
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag;
    let s = `<path d="M${x1},${y1} Q${mx},${my + sag} ${x2},${y2}" fill="none" stroke="#3a2c2c" stroke-width="2"/>`;
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
      const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * (my + sag) + t * t * y2;
      const c = cols[Math.floor(r() * cols.length)];
      s += `<circle cx="${x.toFixed(1)}" cy="${(y + 5).toFixed(1)}" r="9" fill="url(#gSoft)"/>`;
      s += `<circle class="twinkle t${1 + (i % 3)}" cx="${x.toFixed(1)}" cy="${(y + 5).toFixed(1)}" r="3.6" fill="${c}" stroke="${OL}" stroke-width="1"/>`;
    }
    return s;
  };

  /** Straßenlaterne */
  A.lamp = function (x, y, h = 210) {
    const top = y - h;
    return `${A.glow(x, top + 20, 90, 'gWarm', 0.9)}
      <rect x="${x - 4}" y="${top + 36}" width="8" height="${h - 36}" fill="#2f3a4a" stroke="${OL}" stroke-width="2.5"/>
      <rect x="${x - 11}" y="${y - 14}" width="22" height="14" rx="3" fill="#2f3a4a" stroke="${OL}" stroke-width="2.5"/>
      <path d="M${x - 17},${top + 36} L${x - 13},${top + 6} L${x + 13},${top + 6} L${x + 17},${top + 36} Z" fill="#ffe08a" stroke="${OL}" stroke-width="3"/>
      <path d="M${x},${top + 6} V${top + 36}" stroke="${OL}" stroke-width="2"/>
      <path d="M${x - 21},${top + 8} L${x},${top - 10} L${x + 21},${top + 8} Z" fill="#2f3a4a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
      ${A.snowLine(`M${x - 18},${top + 5} L${x},${top - 9} L${x + 18},${top + 5}`, 6)}
      <rect x="${x - 19}" y="${top + 34}" width="38" height="7" rx="2" fill="#2f3a4a" stroke="${OL}" stroke-width="2.5"/>
      <path d="M${x - 10},${top + 54} q10,10 20,0" fill="none" stroke="#2f7d4f" stroke-width="8" stroke-linecap="round"/>
      <circle cx="${x}" cy="${top + 60}" r="4" fill="#d63a3a" stroke="${OL}" stroke-width="1.5"/>`;
  };

  /** Christbaum */
  A.xmasTree = function (x, y, h, seed = 7) {
    const r = A.rng(seed);
    const w = h * 0.46;
    let s = `<rect x="${x - h * 0.03}" y="${y - h * 0.08}" width="${h * 0.06}" height="${h * 0.08}" fill="#6b4128" stroke="${OL}" stroke-width="3"/>`;
    const tiers = 4;
    for (let i = 0; i < tiers; i++) {
      const tb = y - h * 0.06 - i * h * 0.21;
      const tt = tb - h * 0.34;
      const tw = w * (1 - i * 0.2);
      s += `<path d="M${x - tw},${tb} Q${x - tw * 0.5},${tb - h * 0.03} ${x - tw * 0.08},${tt} Q${x},${tt - 6} ${x + tw * 0.08},${tt} Q${x + tw * 0.5},${tb - h * 0.03} ${x + tw},${tb} Q${x},${tb + h * 0.05} ${x - tw},${tb} Z" fill="#2f6e4a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      s += `<path d="M${x - tw * 0.9},${tb - 2} Q${x},${tb + h * 0.035} ${x + tw * 0.9},${tb - 2}" fill="none" stroke="#fbfdff" stroke-width="6" stroke-linecap="round"/>`;
      for (let k = 0; k < 5 - i; k++) {
        const bx = x + (r() - 0.5) * tw * 1.5, by = tb - r() * h * 0.2 - 6;
        const c = ['#ffd36e', '#fff3c4', '#ff8a5c'][k % 3];
        s += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="9" fill="url(#gSoft)"/><circle class="twinkle t${1 + (k % 3)}" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="3.5" fill="${c}"/>`;
      }
    }
    const st = y - h * 0.06 - (tiers - 1) * h * 0.21 - h * 0.34 - 8;
    s += A.glow(x, st, 50, 'gWarm', 1);
    s += `<path d="${A.starPath(x, st, 14, 6)}" fill="#ffd36e" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`;
    return s;
  };

  A.starPath = function (cx, cy, R, r, n = 5) {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const rad = i % 2 ? r : R;
      const a = -Math.PI / 2 + i * Math.PI / n;
      d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rad).toFixed(1) + ',' + (cy + Math.sin(a) * rad).toFixed(1);
    }
    return d + 'Z';
  };

  /** Neubarocker Volutengiebel – Pfad der Giebelkontur (ohne Unterkante) */
  A.curvedGable = function (x, y, w, gh) {
    const p = (fx, fy) => `${(x + w * fx).toFixed(1)},${(y - gh * fy).toFixed(1)}`;
    return `M${p(0, 0)} Q${p(0.02, 0.2)} ${p(0.12, 0.24)} L${p(0.17, 0.26)} Q${p(0.17, 0.42)} ${p(0.27, 0.5)} Q${p(0.31, 0.53)} ${p(0.31, 0.62)} Q${p(0.31, 0.78)} ${p(0.39, 0.84)} L${p(0.4, 0.97)} Q${p(0.5, 1.07)} ${p(0.6, 0.97)} L${p(0.61, 0.84)} Q${p(0.69, 0.78)} ${p(0.69, 0.62)} Q${p(0.69, 0.53)} ${p(0.73, 0.5)} Q${p(0.83, 0.42)} ${p(0.83, 0.26)} L${p(0.88, 0.24)} Q${p(0.98, 0.2)} ${p(1, 0)}`;
  };
  A.steppedGable = function (x, y, w, gh, steps = 4) {
    let d = `M${x},${y}`;
    const sw = w / 2 / (steps + 0.5), sh = gh / steps;
    let cx = x, cy = y;
    for (let i = 0; i < steps; i++) { cy -= sh; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`; cx += sw; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`; }
    const topW = w - 2 * steps * sw;
    cx += topW; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`;
    for (let i = 0; i < steps; i++) { cy += sh; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`; cx += sw; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`; }
    return d;
  };
  A.plainGable = (x, y, w, gh) => `M${x},${y} L${x + w / 2},${y - gh} L${x + w},${y}`;

  /** Giebelständiges Haus. o: {x, base, w, h, gh, color, gable:'curved'|'stepped'|'plain', rows, cols, lit, trim} */
  A.gableHouse = function (o) {
    const { x, base, w, h } = o;
    const gh = o.gh || w * 0.5;
    const top = base - h;
    const gp = o.gable === 'stepped' ? A.steppedGable(x, top, w, gh) : o.gable === 'plain' ? A.plainGable(x, top, w, gh) : A.curvedGable(x, top, w, gh);
    let s = `<path d="${gp} L${x + w},${base} L${x},${base} Z" fill="${o.color}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    // leichte Schattierung rechts
    s += `<path d="M${x + w * 0.78},${top} L${x + w},${top} L${x + w},${base} L${x + w * 0.78},${base} Z" fill="#000" opacity=".06"/>`;
    // Gesims
    s += `<rect x="${x - 6}" y="${top - 6}" width="${w + 12}" height="10" rx="2" fill="${o.trim || '#f4ead6'}" stroke="${OL}" stroke-width="2.5"/>`;
    s += A.snowLine(`M${x - 4},${top - 8} L${x + w + 4},${top - 8}`, 6);
    s += A.snowLine(gp, 8);
    // Giebelfenster
    if (o.gableWin !== false) {
      const gw = Math.min(30, w * 0.12);
      s += A.window(x + w / 2 - gw / 2, top - gh * 0.62, gw, gw * 1.4, { lit: o.gableLit, arch: true, sill: false, glow: false });
    }
    const rows = o.rows || 3, cols = o.cols || 3;
    const ww = o.ww || Math.min(38, w / cols * 0.42), wh = o.wh || ww * 1.45;
    const gapY = (h - (o.groundH || 0)) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = x + w * (c + 0.5) / cols - ww / 2;
        const wy = top + 20 + r * gapY;
        const lit = o.litFn ? o.litFn(r, c) : ((r * 7 + c * 3 + (o.seed || 0)) % 3 !== 0);
        s += A.window(wx, wy, ww, wh, { lit, shutters: o.shutters, curtain: o.curtain, wreath: o.wreaths && r === rows - 1 && c === 1 });
      }
    }
    return s;
  };

  /** Ladenschild */
  A.sign = function (x, y, w, h, text, o = {}) {
    const fs = o.fs || h * 0.52;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx || 6}" fill="${o.bg || '#2f3a4a'}" stroke="${OL}" stroke-width="3"/>
      ${o.inner !== false ? `<rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="${Math.max(2, (o.rx || 6) - 3)}" fill="none" stroke="${o.fg || '#ffd36e'}" stroke-width="1.5" opacity=".7"/>` : ''}
      <text data-maxw="${w - (o.inner !== false ? 16 : 10)}" data-cy="${y + h / 2}" x="${x + w / 2}" y="${y + h / 2 + fs * 0.36}" text-anchor="middle" font-family="${o.font || 'Georgia, \'Times New Roman\', serif'}" font-weight="${o.weight || 700}" font-size="${fs}" fill="${o.fg || '#ffd36e'}" ${o.italic ? 'font-style="italic"' : ''} letter-spacing="${o.ls || 0}">${text}</text>`;
  };

  A.text = (x, y, t, o = {}) => `<text ${o.maxw ? `data-maxw="${o.maxw}"` : ''} ${o.outline ? `stroke="${o.outline}" stroke-width="${o.outlineW || 5}" stroke-linejoin="round" paint-order="stroke"` : ''} x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" font-family="${o.font || 'Trebuchet MS, sans-serif'}" font-size="${o.fs || 16}" font-weight="${o.weight || 700}" fill="${o.fill || OL}" ${o.rot ? `transform="rotate(${o.rot} ${x} ${y})"` : ''} ${o.italic ? 'font-style="italic"' : ''}>${t}</text>`;

  /** Tür */
  A.door = function (x, y, w, h, o = {}) {
    const c = o.color || '#7a3b2e';
    const arch = o.arch !== false;
    const d = arch ? `M${x},${y + h} V${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} V${y + h} Z` : `M${x},${y + h} V${y} H${x + w} V${y + h} Z`;
    let s = '';
    if (o.lit) s += A.glow(x + w / 2, y + h * 0.6, w * 1.1, 'gWarm', 0.6);
    s += `<path d="${d}" fill="${c}" stroke="${OL}" stroke-width="3.5"/>`;
    if (o.glass) s += `<path d="M${x + w * 0.2},${y + h * 0.5} V${y + w * 0.55} A${w * 0.3},${w * 0.3} 0 0 1 ${x + w * 0.8},${y + w * 0.55} V${y + h * 0.5} Z" fill="url(#gWinLit)" stroke="${OL}" stroke-width="2.5"/>`;
    else s += `<rect x="${x + w * 0.18}" y="${y + h * 0.55}" width="${w * 0.64}" height="${h * 0.3}" rx="3" fill="none" stroke="${OL}" stroke-width="2" opacity=".45"/>`;
    s += `<rect x="${x + w * 0.18}" y="${y + (arch ? w * 0.6 : h * 0.12)}" width="${w * 0.64}" height="${h * 0.3}" rx="3" fill="none" stroke="${OL}" stroke-width="2" opacity="${o.glass ? 0 : 0.45}"/>`;
    s += `<circle cx="${x + w * 0.8}" cy="${y + h * 0.62}" r="4" fill="#e8c35a" stroke="${OL}" stroke-width="1.5"/>`;
    if (o.wreath) s += A.wreath(x + w / 2, y + (arch ? w * 0.55 : h * 0.25), w * 0.2);
    return s;
  };

  /** Pflaster-/Schneeboden */
  A.snowGround = function (y, seed = 1, color = '#f3f7fc') {
    const r = A.rng(seed);
    let s = `<path d="M0,${y} C200,${y - 10} 420,${y + 8} 640,${y - 4} C860,${y - 14} 1080,${y + 6} 1280,${y - 6} L1280,720 L0,720 Z" fill="${color}" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 26; i++) {
      const x = r() * 1280, yy = y + 20 + r() * (720 - y - 20), w = 30 + r() * 90;
      s += `<path d="M${x.toFixed(0)},${yy.toFixed(0)} q${w / 2},-6 ${w},0" fill="none" stroke="#c9d8ec" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    return s;
  };

  /** Spuren im Schnee */
  A.footprints = function (pts) {
    return pts.map(([x, y], i) => `<ellipse cx="${x + (i % 2 ? 7 : -7)}" cy="${y}" rx="5" ry="8" fill="#c9d8ec" transform="rotate(${i % 2 ? 10 : -10} ${x} ${y})"/>`).join('');
  };

  /** Holzbude (Weihnachtsmarkt) */
  A.booth = function (x, base, w, h, o = {}) {
    const top = base - h;
    const roofC = o.roof || '#8a3b2e';
    let s = '';
    s += A.glow(x + w / 2, top + h * 0.5, w * 0.8, 'gWarm', 0.65);
    s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 1; i < 6; i++) s += `<path d="M${x + w * i / 6},${top} V${base}" stroke="${OL}" stroke-width="1.5" opacity=".35"/>`;
    s += `<rect x="${x + 8}" y="${top + 24}" width="${w - 16}" height="${h * 0.5}" fill="#3d2618" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<rect x="${x + 8}" y="${top + 24}" width="${w - 16}" height="${h * 0.5}" fill="url(#gWarm)" opacity=".7"/>`;
    s += `<rect x="${x - 6}" y="${top + 24 + h * 0.5}" width="${w + 12}" height="12" fill="#a8744a" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M${x - 22},${top + 6} L${x + w / 2},${top - h * 0.38} L${x + w + 22},${top + 6} Z" fill="${roofC}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    s += A.snowLine(`M${x - 18},${top + 2} L${x + w / 2},${top - h * 0.34} L${x + w + 18},${top + 2}`, 10);
    s += A.lights(x - 10, top + 10, x + w + 10, top + 10, 6, 8, (o.seed || 5));
    if (o.label) s += A.sign(x + w * 0.15, top - h * 0.12, w * 0.7, 22, o.label, { fs: 13, bg: '#f4ead6', fg: '#6b2a20', inner: false });
    return s;
  };

  /** Einfache Personen-Silhouette für den Hintergrund */
  A.crowdPerson = function (x, y, s, coat, hat) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M-16,0 L-14,-58 Q0,-70 14,-58 L16,0 Z" fill="${coat}" stroke="${OL}" stroke-width="3"/>
      <circle cx="0" cy="-74" r="13" fill="#f0c4a0" stroke="${OL}" stroke-width="3"/>
      <path d="M-14,-78 Q0,-98 14,-78 Z" fill="${hat}" stroke="${OL}" stroke-width="3"/>
      <circle cx="0" cy="-94" r="5" fill="#fff" stroke="${OL}" stroke-width="2"/>
    </g>`;
  };

  /** Bodenschatten */
  A.shadow = (x, y, rx, ry = rx * 0.22) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#1a1530" opacity=".18"/>`;

  /** Innenraum-Holzboden */
  A.woodFloor = function (y, c1 = '#9a6a43', c2 = '#86593a') {
    let s = `<rect x="0" y="${y}" width="1280" height="${720 - y}" fill="${c1}"/>`;
    for (let i = 0; i < 12; i++) {
      const yy = y + Math.pow(i / 12, 1.6) * (720 - y);
      s += `<path d="M0,${yy.toFixed(1)} H1280" stroke="${c2}" stroke-width="${1 + i * 0.25}"/>`;
    }
    for (let i = -8; i <= 8; i++) s += `<path d="M${640 + i * 40},${y} L${640 + i * 160},720" stroke="${c2}" stroke-width="2" opacity=".6"/>`;
    s += `<path d="M0,${y} H1280" stroke="${OL}" stroke-width="3"/>`;
    return s;
  };

  /** Vignette für Innenräume */
  A.vignette = (op = 0.45) => `<defs><radialGradient id="gVig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140c1c" stop-opacity="${op}"/></radialGradient></defs><rect x="0" y="0" width="1280" height="720" fill="url(#gVig)" pointer-events="none"/>`;

  /** Pfeil für Ausgänge */
  A.exitArrow = function (x, y, dir = 'r', label) {
    const rot = { r: 0, l: 180, u: -90, d: 90 }[dir];
    return `<g class="exit-ui"><g transform="translate(${x},${y}) rotate(${rot})" opacity=".85"><path d="M-14,-12 L6,0 L-14,12" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M-14,-12 L6,0 L-14,12" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>` +
      (label ? A.text(x + (dir === 'l' ? 16 : dir === 'r' ? -16 : 0), y + (dir === 'u' ? 34 : -22), label, { fs: 17, fill: '#fff', outline: OL, outlineW: 5, anchor: dir === 'l' ? 'start' : dir === 'r' ? 'end' : 'middle' }) : '') + '</g>';
  };
})();
