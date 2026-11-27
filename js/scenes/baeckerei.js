/* Szene: In der Bäckerei Kreitmampf, vor der Theke */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function bread(x, y, kind, s = 1) {
    switch (kind) {
      case 'laib': return `<ellipse cx="${x}" cy="${y}" rx="${30 * s}" ry="${20 * s}" fill="#b5713b" stroke="${OL}" stroke-width="2.5"/><path d="M${x - 16 * s},${y - 6 * s} l10,8 M${x - 2 * s},${y - 10 * s} l10,8 M${x + 12 * s},${y - 8 * s} l8,7" stroke="#e7b77d" stroke-width="3" stroke-linecap="round"/>`;
      case 'korn': return `<ellipse cx="${x}" cy="${y}" rx="${26 * s}" ry="${19 * s}" fill="#8a5a2e" stroke="${OL}" stroke-width="2.5"/><path d="M${x - 14},${y - 6} h4 M${x},${y - 10} h4 M${x + 10},${y - 4} h4 M${x - 6},${y + 4} h4" stroke="#e9d3a6" stroke-width="2.5" stroke-linecap="round"/>`;
      case 'hell': return `<ellipse cx="${x}" cy="${y}" rx="${28 * s}" ry="${20 * s}" fill="#e2b06c" stroke="${OL}" stroke-width="2.5"/><path d="M${x - 18},${y} q18,-12 36,0" stroke="#fff3d6" stroke-width="3" fill="none"/>`;
      case 'brezn': return `<path d="M${x - 22},${y + 6} q-6,-24 14,-22 q8,2 8,14 q0,-12 8,-14 q20,-2 14,22 q-8,10 -22,-6 q-14,16 -22,6 Z" fill="#9a4f1e" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${x - 10}" cy="${y - 8}" r="1.6" fill="#fff"/><circle cx="${x + 8}" cy="${y - 10}" r="1.6" fill="#fff"/><circle cx="${x}" cy="${y}" r="1.6" fill="#fff"/>`;
      case 'krapfen': return `<ellipse cx="${x}" cy="${y}" rx="${18 * s}" ry="${12 * s}" fill="#d9944a" stroke="${OL}" stroke-width="2.2"/><path d="M${x - 16 * s},${y - 1} q${16 * s},-${10 * s} ${32 * s},0" stroke="#fff" stroke-width="4" fill="none" stroke-dasharray="1 3" stroke-linecap="round"/><circle cx="${x + 6}" cy="${y + 2}" r="3" fill="#c0392b"/>`;
      case 'kipferl': return `<path d="M${x - 16},${y + 4} q16,-22 32,0 q-6,-8 -16,-8 q-10,0 -16,8 Z" fill="#f0d29a" stroke="${OL}" stroke-width="2.2"/><path d="M${x - 12},${y} q12,-14 24,0" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="1 3" stroke-linecap="round"/>`;
      case 'schnecke': return `<circle cx="${x}" cy="${y}" r="${15 * s}" fill="#d9a05a" stroke="${OL}" stroke-width="2.2"/><path d="M${x},${y} m-2,0 a3,3 0 1 1 5,2 a7,7 0 1 1 -10,-4 a11,11 0 1 1 16,6" fill="none" stroke="#8a5a2e" stroke-width="2"/>`;
      case 'torte': return `<path d="M${x - 22},${y + 8} V${y - 6} L${x + 22},${y - 14} V${y + 8} Z" fill="#fff3e6" stroke="${OL}" stroke-width="2.2"/><path d="M${x - 22},${y - 6} L${x + 22},${y - 14} L${x + 22},${y - 6} L${x - 22},${y + 2} Z" fill="#e05a6a" stroke="${OL}" stroke-width="2"/><circle cx="${x + 10}" cy="${y - 16}" r="4" fill="#c0392b" stroke="${OL}" stroke-width="1.5"/>`;
      default: return '';
    }
  }

  function sideCounter() {
    // Ablage links: Kaffeemaschine, Kaffeezubehör und Geschirrrückgabe (ohne Beschriftung)
    let s = '';
    // Wandregal mit Tassen
    s += `<rect x="40" y="262" width="250" height="10" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
    for (let i = 0; i < 5; i++) {
      const x = 54 + i * 38;
      s += `<path d="M${x},262 h22 l-3,-20 h-16 Z" fill="${i % 2 ? '#f4efe6' : '#fffaf0'}" stroke="${OL}" stroke-width="2"/><path d="M${x + 21},248 q7,1 5,8" fill="none" stroke="${OL}" stroke-width="2"/>`;
    }
    // Unterschrank / Ablage
    s += `<rect x="24" y="420" width="286" height="155" fill="#6b4128" stroke="${OL}" stroke-width="3.5"/>`;
    for (const x of [24, 119, 214]) s += `<rect x="${x + 8}" y="440" width="80" height="120" rx="3" fill="none" stroke="${OL}" stroke-width="2" opacity=".45"/><rect x="${x + 70}" y="494" width="6" height="18" rx="2" fill="#c9a227" stroke="${OL}" stroke-width="1.2"/>`;
    s += `<rect x="18" y="408" width="298" height="16" rx="3" fill="#3a2418" stroke="${OL}" stroke-width="3"/>`;
    // Geschirrrückgabe: Regal mit Tabletts und benutztem Geschirr (links)
    s += `<rect x="28" y="300" width="70" height="108" fill="#4a2c1b" stroke="${OL}" stroke-width="3"/>`;
    for (let r = 0; r < 3; r++) {
      const y = 330 + r * 30;
      s += `<rect x="33" y="${y}" width="60" height="6" fill="#9aa3ad" stroke="${OL}" stroke-width="1.5"/>`;
      s += `<path d="M38,${y} h14 l-2,-11 h-10 Z" fill="#fff" stroke="${OL}" stroke-width="1.6"/><ellipse cx="74" cy="${y - 2}" rx="12" ry="3" fill="#fff" stroke="${OL}" stroke-width="1.4"/><path d="M80,${y - 2} l8,-9" stroke="#9aa3ad" stroke-width="2"/>`;
      if (r === 1) s += `<ellipse cx="74" cy="${y - 5}" rx="5" ry="1.5" fill="#b86a35"/>`;
    }
    // Siebträger-Kaffeemaschine (Mitte)
    s += `<g transform="translate(206,408)">
      <rect x="-62" y="-96" width="124" height="96" rx="8" fill="#c9ced8" stroke="${OL}" stroke-width="3"/>
      <rect x="-62" y="-96" width="124" height="22" rx="6" fill="#9aa3ad" stroke="${OL}" stroke-width="2.5"/>
      <rect x="-50" y="-70" width="100" height="30" rx="4" fill="#b07a3a" stroke="${OL}" stroke-width="2"/>
      <circle cx="-30" cy="-55" r="8" fill="#f4f4f4" stroke="${OL}" stroke-width="1.8"/><path d="M-30,-55 l4,-5" stroke="${OL}" stroke-width="1.5"/>
      <circle cx="30" cy="-55" r="8" fill="#f4f4f4" stroke="${OL}" stroke-width="1.8"/><path d="M30,-55 l-4,-5" stroke="${OL}" stroke-width="1.5"/>
      <path d="M-26,-40 v10 h-16 v6 h28 v-6 M26,-40 v10 h16 v6 h-28 v-6" fill="#2f3440" stroke="${OL}" stroke-width="2"/>
      <path d="M-44,-27 h-18 M44,-27 h18" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>
      <path d="M-26,-16 h-10 l-1,10 q6,4 12,0 Z M26,-16 h10 l1,10 q-6,4 -12,0 Z" fill="#fff" stroke="${OL}" stroke-width="1.8"/>
      <path d="M66,-60 q14,10 6,34" fill="none" stroke="${OL}" stroke-width="4"/><path d="M66,-60 q14,10 6,34" fill="none" stroke="#9aa3ad" stroke-width="2"/>
      <path class="steam" d="M72,-32 q-6,-10 0,-20" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>
      <rect x="-56" y="-6" width="112" height="6" fill="#2f3440" stroke="${OL}" stroke-width="1.5"/>
      ${[-40, -14, 12, 38].map((x) => `<path d="M${x - 8},-96 h16 l-2,-12 h-12 Z" fill="#fffaf0" stroke="${OL}" stroke-width="1.6"/>`).join('')}
    </g>`;
    // Kaffeemühle
    s += `<g transform="translate(290,408)">
      <rect x="-14" y="-30" width="28" height="30" rx="3" fill="#2f3440" stroke="${OL}" stroke-width="2.2"/>
      <path d="M-12,-30 L-16,-58 H16 L12,-30 Z" fill="#8a5a36" fill-opacity=".85" stroke="${OL}" stroke-width="2.2"/>
      <path d="M-10,-44 q10,-6 20,0" stroke="#3a2418" stroke-width="5" fill="none"/>
      <rect x="-12" y="-64" width="24" height="7" rx="3" fill="#2f3440" stroke="${OL}" stroke-width="1.8"/>
    </g>`;
    // Zubehör: Milchkännchen, Zuckerdose, Tassenstapel, Löffelbecher
    s += `<rect x="102" y="388" width="16" height="20" rx="2" fill="#9aa3ad" stroke="${OL}" stroke-width="1.8"/><path d="M106,388 l-3,-12 M110,388 v-14 M114,388 l3,-12" stroke="#c9ced8" stroke-width="2"/>`;
    for (let i = 0; i < 3; i++) s += `<ellipse cx="131" cy="${404 - i * 6}" rx="11" ry="3" fill="#fff" stroke="${OL}" stroke-width="1.6"/>`;
    // Zuckerdose im Wandregal
    s += `<rect x="252" y="246" width="26" height="16" rx="4" fill="#fffaf0" stroke="${OL}" stroke-width="2"/><ellipse cx="265" cy="246" rx="14" ry="3" fill="#fffaf0" stroke="${OL}" stroke-width="1.8"/><circle cx="265" cy="242" r="2.5" fill="#fffaf0" stroke="${OL}" stroke-width="1.5"/>`;
    return s;
  }

  function slidingDoor() {
    // Glas-Schiebetür rechts, halb geöffnet, draußen schneit es
    let s = '';
    const X = 1046, Y = 166, W = 222, H = 409;
    // Draußen
    s += `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="#2a3358"/>`;
    s += `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="url(#gCool)"/>`;
    s += `<path d="M${X},${Y + 230} L${X + 60},${Y + 200} L${X + 120},${Y + 226} L${X + 180},${Y + 190} L${X + W},${Y + 214} V${Y + H} H${X} Z" fill="#6b5f95"/>`;
    s += `<rect x="${X + 70}" y="${Y + 210}" width="10" height="14" fill="#ffd36e"/><rect x="${X + 150}" y="${Y + 204}" width="10" height="14" fill="#ffd36e"/>`;
    s += `<path d="M${X},${Y + 320} Q${X + W / 2},${Y + 300} ${X + W},${Y + 318} V${Y + H} H${X} Z" fill="#f3f7fc"/>`;
    for (let i = 0; i < 16; i++) s += `<circle cx="${X + 8 + (i * 37) % (W - 16)}" cy="${Y + 14 + (i * 53) % 290}" r="${1.5 + (i % 3)}" fill="#fff" opacity=".85"/>`;
    // feste Scheibe rechts, Schiebeflügel links (halb aufgeschoben)
    const pane = (px, pw, op) => `<rect x="${px}" y="${Y + 6}" width="${pw}" height="${H - 6}" fill="#cfe6ff" fill-opacity="${op}" stroke="#9aa3ad" stroke-width="8"/><rect x="${px}" y="${Y + 6}" width="${pw}" height="${H - 6}" fill="none" stroke="${OL}" stroke-width="2.5"/><path d="M${px + 14},${Y + 40} l${pw * 0.5},-24 M${px + 14},${Y + 80} l${pw * 0.7},-34" stroke="#fff" stroke-width="5" opacity=".5"/>`;
    s += pane(X + W / 2, W / 2, 0.16);
    s += pane(X + W / 2 - 46, W / 2, 0.22);
    s += A.text(X + W / 2 - 46 + W / 4, Y + 150, 'Kreitmampf', { fs: 16, fill: '#ffd36e', font: 'Georgia, serif', italic: true, maxw: W / 2 - 20, outline: '#4a2c1b', outlineW: 3 });
    s += A.text(X + W / 2 - 46 + W / 4, Y + 170, 'seit 1897', { fs: 12, fill: '#fff', font: 'Georgia, serif', italic: true, maxw: W / 2 - 20 });
    // Rahmen, Laufschiene, Sensor
    s += `<rect x="${X - 10}" y="${Y - 20}" width="${W + 20}" height="26" fill="#9aa3ad" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="${X + W / 2 - 18}" y="${Y - 14}" width="36" height="14" rx="3" fill="#2f3440" stroke="${OL}" stroke-width="1.5"/><circle cx="${X + W / 2}" cy="${Y - 7}" r="3" fill="#ff5a5a"/>`;
    s += `<path d="M${X - 6},${Y} V${Y + H} M${X + W + 6},${Y} V${Y + H}" stroke="${OL}" stroke-width="12"/><path d="M${X - 6},${Y} V${Y + H} M${X + W + 6},${Y} V${Y + H}" stroke="#b9c1cc" stroke-width="7"/>`;
    // Fußmatte
    s += `<path d="M${X - 10},${Y + H + 6} H${X + W + 10} L${X + W + 40},${Y + H + 40} H${X - 40} Z" fill="#5a3824" stroke="${OL}" stroke-width="2.5"/>`;
    return s;
  }

  function room() {
    let s = A.defs();
    // Wände in warmen Brauntönen
    s += `<rect x="0" y="0" width="1280" height="720" fill="#7a4a2c"/>`;
    for (let i = 0; i < 32; i++) s += `<rect x="${i * 40}" y="60" width="40" height="520" fill="${i % 2 ? '#80502f' : '#76472a'}"/>`;
    // Holzdecke mit Lichtschiene
    s += `<path d="M0,0 H1280 V60 L1100,90 H180 L0,60 Z" fill="#5a3824" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 9; i++) s += `<path d="M${180 + i * 115},90 L${i * 160},0" stroke="${OL}" stroke-width="1.5" opacity=".35"/>`;
    s += `<path d="M330,96 H990" stroke="#9aa3ad" stroke-width="8"/><path d="M330,96 H990" stroke="${OL}" stroke-width="2" opacity=".5"/>`;
    for (let i = 0; i < 6; i++) {
      const x = 370 + i * 116;
      s += `<path d="M${x},96 V112" stroke="#9aa3ad" stroke-width="4"/><path d="M${x - 10},112 h20 l-4,16 h-12 Z" fill="#c9ced8" stroke="${OL}" stroke-width="2"/>`;
      s += `<path d="M${x - 6},128 L${x - 60},420 L${x + 60},420 L${x + 6},128 Z" fill="#fff6d0" opacity=".1"/>`;
    }
    s += `<path d="M380,60 L400,96 M900,60 L880,96" stroke="#9aa3ad" stroke-width="2"/>`;
    // Regalwand hinter der Theke (dunkles Holz)
    s += `<rect x="312" y="124" width="720" height="326" fill="#4a2c1b" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="432" y="124" width="420" height="326" fill="#3a2418" stroke="${OL}" stroke-width="3"/>`;
    for (const x of [312, 432, 852, 1032]) s += `<rect x="${x - 8}" y="124" width="16" height="326" fill="#8a5a36" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<rect x="304" y="116" width="736" height="14" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    // Kreideleiste
    s += `<rect x="448" y="138" width="388" height="36" fill="#2b2f2a" stroke="${OL}" stroke-width="2"/>`;
    s += A.text(642, 163, 'Handwerk · Tradition · Liebe zum Detail', { fs: 17, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive', maxw: 370 });
    // Brotregal Mitte
    const kinds = ['laib', 'korn', 'hell', 'laib', 'korn', 'hell', 'laib'];
    [215, 290, 365].forEach((y, row) => {
      s += `<rect x="442" y="${y + 18}" width="400" height="10" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
      for (let i = 0; i < 6; i++) s += bread(478 + i * 66, y, kinds[(i + row) % kinds.length], 0.92);
      if (row < 2) for (const i of [0, 2]) s += `<rect x="${466 + i * 140}" y="${y + 29}" width="70" height="26" fill="#1d201c" stroke="#e9dcc4" stroke-width="1"/>` + A.text(501 + i * 140, y + 47, ['Dinkel', 'Bauern', 'Roggen'][(i + row) % 3], { fs: 13, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive', maxw: 62 });
    });
    // Seitenregale mit Brezn & Körben
    [[322, 230], [322, 330], [862, 230], [862, 330]].forEach(([x, y], i) => {
      s += `<rect x="${x}" y="${y + 18}" width="104" height="9" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
      if (i % 2 === 0) { s += bread(x + 28, y, 'brezn', 0.9) + bread(x + 76, y, 'brezn', 0.9); }
      else { s += `<path d="M${x + 12},${y + 18} q40,-44 80,0 Z" fill="#c8a46a" stroke="${OL}" stroke-width="2.5"/><path d="M${x + 22},${y + 8} h60 M${x + 30},${y - 2} h44" stroke="${OL}" stroke-width="1.5" opacity=".4"/>`; }
    });
    s += `<rect x="862" y="${330 + 18}" width="160" height="9" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
    // Kranz
    s += A.wreath(642, 104, 20);
    // Kreidetafel Frühstück links an der Wand
    s += `<rect x="30" y="112" width="264" height="106" rx="4" fill="#2b2f2a" stroke="#8a5a36" stroke-width="6"/>`;
    s += A.text(162, 142, 'Frühstück', { fs: 19, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive', maxw: 240 });
    s += A.text(162, 172, 'Kaffee · Kakao · Brezn', { fs: 14, fill: '#ffe7b8', font: 'Segoe Print, Comic Sans MS, cursive', maxw: 240 });
    s += A.text(162, 198, 'Krapfen · Semmel · Weißwurst', { fs: 14, fill: '#ffe7b8', font: 'Segoe Print, Comic Sans MS, cursive', maxw: 240 });
    s += sideCounter();
    s += slidingDoor();
    // Boden
    s += A.woodFloor(575, '#8a6040', '#74502f');
    s += `<rect x="0" y="575" width="1280" height="8" fill="#000" opacity=".12"/>`;
    s += A.vignette(0.35);
    return s;
  }

  function counter(st) {
    let s = '';
    const L = 322, R = 1010;
    // Glasvitrine
    s += `<rect x="${L}" y="426" width="${R - L}" height="14" rx="3" fill="#c9ced8" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M${L + 6},440 H${R - 6} L${R + 10},520 H${L - 10} Z" fill="#e9f4ff" fill-opacity=".35" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="${L - 2}" y="468" width="${R - L + 4}" height="8" fill="#9aa3ad" stroke="${OL}" stroke-width="2"/>`;
    const row1 = ['krapfen', 'krapfen', 'kipferl', 'kipferl', 'schnecke', 'schnecke', 'torte', 'torte', 'krapfen', 'kipferl'];
    row1.forEach((k, i) => { s += bread(L + 40 + i * 66, 458, k, 0.85); });
    const row2 = ['brezn', 'brezn', 'schnecke', 'krapfen', 'torte', 'kipferl', 'brezn', 'krapfen', 'schnecke', 'torte'];
    row2.forEach((k, i) => { s += bread(L + 34 + i * 67, 500, k, 0.9); });
    s += `<path d="${'M' + (L + 30)},446 l40,60 M${L + 420},446 l40,60" stroke="#fff" stroke-width="5" opacity=".35"/>`;
    // Preisschilder
    [['Krapfen', '1,80'], ['Vanillekipferl', '0,60'], ['Nussschnecke', '2,10'], ['Brezn', '1,10']].forEach(([t, p], i) => {
      const x = L + 18 + i * 170;
      s += `<rect x="${x}" y="520" width="124" height="34" fill="#1d201c" stroke="${OL}" stroke-width="1.5"/>` + A.text(x + 62, 535, t, { fs: 13, fill: '#fff', maxw: 116 }) + A.text(x + 62, 550, '€ ' + p, { fs: 12, fill: '#ffd36e', maxw: 116 });
    });
    // Holzfront (dunkel)
    s += `<rect x="${L - 14}" y="520" width="${R - L + 28}" height="66" fill="#6b4128" stroke="${OL}" stroke-width="3.5"/>`;
    for (let i = 1; i < 8; i++) s += `<path d="M${L - 14 + i * (R - L + 28) / 8},520 V586" stroke="${OL}" stroke-width="1.5" opacity=".35"/>`;
    // Kasse
    s += `<rect x="790" y="368" width="104" height="60" rx="8" fill="#2f3440" stroke="${OL}" stroke-width="3"/><rect x="804" y="378" width="60" height="18" rx="3" fill="#7cf0a0" stroke="${OL}" stroke-width="2"/>` + A.text(834, 392, '13,37', { fs: 11, fill: '#1d201c', font: 'Courier New, monospace' });
    // Kupfer-Samowar auf der Theke
    s += `<g transform="translate(960,0)">
      <rect x="-26" y="296" width="52" height="130" rx="12" fill="#b07a3a" stroke="${OL}" stroke-width="3.5"/>
      <path d="M-26,324 H26 M-26,392 H26" stroke="#7a4a22" stroke-width="4"/>
      <path d="M-18,296 Q0,260 18,296 Z" fill="#b07a3a" stroke="${OL}" stroke-width="3"/><circle cx="0" cy="262" r="7" fill="#c9a227" stroke="${OL}" stroke-width="2.5"/>
      <path d="M-26,378 h-14 v10" stroke="${OL}" stroke-width="5" fill="none"/><path d="M-26,378 h-14 v10" stroke="#c9a227" stroke-width="2.5" fill="none"/>
      <path d="M-20,306 q10,-6 14,10 V410 q-8,6 -14,0 Z" fill="#fff" opacity=".25"/>
      <path class="steam" d="M0,250 q-8,-14 0,-26" stroke="#fff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>
    </g>`;
    // Lebkuchen-Bruch-Teller
    if (!f('got_lebkuchen')) {
      s += `<ellipse cx="400" cy="424" rx="52" ry="10" fill="#fff" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<g transform="translate(386,420) scale(0.42)"><path d="M0,-80 a14,14 0 1 1 -0.1,0 Z M-16,-56 H16 L36,-46 L33,-34 L16,-40 L18,-14 L12,0 L2,0 L0,-12 L-8,-12 L-14,-32 L-32,-32 L-32,-44 Z" fill="#b86a35" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/></g>`;
      s += `<path d="M416,418 l10,-6 l6,4 l-4,6 Z M430,420 l8,-2 l2,6 Z" fill="#b86a35" stroke="${OL}" stroke-width="2"/>`;
      s += `<rect x="422" y="380" width="72" height="28" fill="#fffaf0" stroke="${OL}" stroke-width="1.5" transform="rotate(6 458 394)"/>` + A.text(458, 400, 'BRUCH', { fs: 15, fill: '#c0392b', rot: 6, maxw: 64 });
    }
    // Brösel-Schublade
    s += `<rect x="600" y="540" width="100" height="30" rx="3" fill="#8a5a36" stroke="${OL}" stroke-width="2.5"/><rect x="636" y="552" width="28" height="6" rx="3" fill="#4a2c1b" stroke="${OL}" stroke-width="1.5"/>`;
    return s;
  }

  function stehtisch() {
    // Stehtisch im Vordergrund, etwa hüfthoch für Erwachsene
    return `${A.shadow(0, 0, 80)}
      <path d="M0,-196 V0 M-46,0 H46" stroke="${OL}" stroke-width="11"/><path d="M0,-196 V0 M-46,0 H46" stroke="#3a2418" stroke-width="6"/>
      <ellipse cx="0" cy="-200" rx="82" ry="16" fill="#5a3824" stroke="${OL}" stroke-width="3.5"/>
      <path d="M-70,-204 q70,-12 140,0" stroke="#8a5a36" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-32,-206 h22 l-2,-18 h-18 Z" fill="#fff" stroke="${OL}" stroke-width="2.2"/><path d="M-11,-218 q8,0 5,8" fill="none" stroke="${OL}" stroke-width="2.2"/>
      <path class="steam" d="M-21,-230 q-6,-10 0,-20" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>
      <ellipse cx="26" cy="-208" rx="22" ry="5" fill="#fff" stroke="${OL}" stroke-width="2"/>${bread(26, -214, 'krapfen', 0.9)}`;
  }

  async function resiTalk() {
    if (!f('met_resi')) {
      G.flag('met_resi');
      await G.say('resi', 'Ja servus, Fini! Was darf’s sein? A Brezn? A Krapfen? A Neuigkeit?');
      await G.say('resi', 'Neuigkeiten hab i heut im Angebot. Zwei zum Preis von oana.');
    }
    await G.talk('resi', () => [
      { t: 'Resi, weißt du zufällig, wo mein Schlitten ist?', if: !f('resi_told_sled') && !f('met_gustl'),
        run: async () => {
          await G.say('resi', 'Dei Schlitten? Ja Moment... Im Juli bist du mit am Schlitten unterm Arm über’n Marktplatz g’rannt. Im JULI.');
          await G.say('resi', 'Mir ham uns alle g’wundert. Die Frau Ohmeier hat an Hitzeschlag vermutet.');
          await G.say('resi', 'Rauf bist zum Speichl Gustl, in die alte Radlwerkstatt über’m Fairkehrt-Laden. „Kufen-Tuning!“ hast g’rufen.');
          await G.say('fini', 'Kufen-Tuning... Im Juli... Das klingt leider sehr nach mir.');
          G.flag('resi_told_sled');
          await G.say('resi', 'Und, bist überhaupt ang’meldet fürs Rennen? Der Wimmer is da streng wie a Finanzamt.');
          await G.say('fini', 'Angemeldet? ... Man muss sich ANMELDEN?!');
          await G.say('resi', 'Frag halt den Wimmer. Der steht scho draußen am Bärenbuckel und probiert sei Megafon aus.');
          G.flag('resi_warned');
        } },
      { t: 'Hast du was mit Ecken und Kanten? Für Frau Ohmeiers Schaufenster?', if: f('ohmeier_wants') && !f('got_lebkuchen'),
        run: async () => {
          await G.say('resi', 'Mit Ecken und Kanten? Für die Ohmeier? Ja mei...');
          await G.say('resi', 'I hätt an Lebkuchenmann, dem fehlt a Haxn. Bruch. Den kann i ned verkaufen.');
          await G.say('resi', 'Den kannst haben. Gratis. Der hat eh scho g’nug mitg’macht, der arme Kerl.');
          G.flag('got_lebkuchen'); G.give('lebkuchen');
          await G.say('fini', 'Ein Lebkuchenmann mit Vergangenheit. Frau Ohmeier wird ihn lieben.');
        } },
      { t: 'Hast du Brezn-Brösel für eine Taube?', if: f('know_broesel') && !has('broesel') && !f('gurrbert_fed'),
        run: async () => {
          await G.say('resi', 'Für’n Gurrbert? Freilich! Der is Stammgast. Kriegt jeden Tag a Tüt’n.');
          await G.say('resi', 'Er zahlt halt nie. Aber er schaut so lieb. Mit dem oanen Aug.');
          G.give('broesel');
        } },
      { t: 'Was gibt’s Neues in Grafing?',
        run: async () => {
          const n = (G.fv('resi_gossip') || 0) % 5;
          G.flag('resi_gossip', n + 1);
          const lines = [
            ['Die Frau Ohmeier hat a neue Schaufensterdeko. Sehr... religiös. Sehr... Kaschmir.', 'Mehr sag i ned. Doch, eins no: Kaschmir!'],
            ['Der Protzinger-Bua hat an Schlitten, der hat mehr kost’ als mei Auto.', 'Sei Vater hat a Sportg’schäft in München. Da gibt’s Schlitten mit Bluetooth. Wozu braucht a Schlitten Bluetooth?'],
            ['Der Herr Glöckl, der Mesner, schaut heut so bleich. Der sucht was. Den ganzen Vormittag scho.', 'Wenn a Mesner was sucht, is des nie was Kleines. Oder doch was Kleines, aber was Heiliges.'],
            ['Der Gustl Speichl sortiert seit 2009 seine Schrauben. Er sagt, er is bald fertig.', 'Des sagt er seit 2011.'],
            ['Wusstest, dass 1942 drei Grafinger Buam die Kirchenglocken versteckt ham, damit’s ned eing’schmolzen werden?', 'In Grafing versteckt ma Sachen guat. Ganz guat. Manchmal zu guat. Gell, Fini?'],
          ];
          for (const l of lines[n]) await G.say('resi', l);
        } },
      { t: 'Ich hätte gern eine Brezn!', once: 'asked_brezn',
        run: async () => {
          await G.say('resi', 'Gern! Macht oa Euro zehn.');
          await G.say('fini', '...Ich hab mein Geld vergessen. Ich hab alles vergessen. Außer meinen Hunger.');
          await G.say('resi', 'Mei, Fini. Wennst des Rennen g’winnst, kriagst a Brezn aufs Haus. Versprochen.');
        } },
      { t: 'Seit wann gibt es den Kreitmampf eigentlich?', once: 'asked_history',
        run: async () => {
          await G.say('resi', 'Seit 1897! Erst Bäckerei, dann Café. Und seit 1953 offizieller Krapfen-Lieferant vom Kufen-Gaudi.');
          await G.say('resi', 'Der Sieger kriegt die Goldene Kufe. Und der Letzte an Krapfen. Zum Trost.');
          await G.say('fini', 'Hm. Eigentlich gewinnt man da beides.');
        } },
      { t: 'Tschüss, Resi!', end: true, run: async () => { await G.say('resi', 'Pfiat di, Fini! Und vergiss ned... ach, du vergisst eh alles. Viel Glück!'); } },
    ]);
  }

  G.scenes.baeckerei = {
    title: 'Bäckerei & Café Kreitmampf',
    walk: { x1: 250, x2: 1180, y1: 612, y2: 704, s1: 0.86, s2: 0.96 },
    entry: { x: 1120, y: 660 },
    draw: room,
    actors(st) {
      return [
        { id: 'resi', x: 640, y: 545, svg: C.resi(), head: -300 },
        { id: 'theke', x: 0, y: 0, z: 590, svg: counter(st) },
        { id: 'stehtisch', x: 160, y: 712, svg: stehtisch() },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Brotregal', r: [442, 190, 400, 230], walk: [640, 625], look: ['Dinkel, Bauernbrot, Roggen. Mit Kreidetafeln wie im Museum.', 'Die Brote sehen so gemütlich aus. Wie kleine, knusprige Sofas.'] },
        { name: 'Brezn-Regal', r: [322, 200, 104, 150], walk: [380, 625], look: 'Brezn. Das bayerische Knoten-Gebäck. Wer es erfunden hat, hatte entweder Hunger oder Langeweile. Oder beides.' },
        { name: 'Brezn-Regal', r: [862, 200, 104, 150], walk: [910, 625], look: 'Noch mehr Brezn. Hier ist der Brezn-Bedarf von ganz Grafing gedeckt. Bis morgen früh.' },
        { name: 'Kreidetafel', r: [30, 112, 264, 106], walk: [280, 650], look: '„Frühstück: Kaffee, Kakao, Brezn, Krapfen, Semmel, Weißwurst.“ Weißwurst zum Frühstück. Nur in Bayern ist das ein Grundrecht.' },
        { name: 'Kupfer-Samowar', r: [930, 250, 64, 180], walk: [960, 625], look: ['Ein riesiger Kupferkessel. Sieht aus wie eine Rakete aus dem 19. Jahrhundert.', 'Wenn ich da Kaffee rauszapfe, bin ich wahrscheinlich bis Ostern wach.'] },
        { name: 'Kaffeemaschine', r: [140, 300, 132, 112], walk: [300, 640],
          look: ['Eine riesige silberne Kaffeemaschine mit zwei Siebträgern. Sie zischt wie ein Drache mit Schluckauf.', 'Daneben eine Kaffeemühle. Hier wird der Grafinger Kaffee also geboren.'],
          use: async () => { await G.say('fini', 'Ich bedien doch nicht Resis Kaffeemaschine. Die hat mehr Knöpfe als ein Flugzeug-Cockpit.'); } },
        { name: 'Geschirrrückgabe', r: [26, 296, 76, 116], walk: [300, 640],
          look: 'Ein Regal für benutztes Geschirr. Eine Tasse hat noch einen Schluck Kaffee drin. Jemand hatte es eilig. Oder hat aufgegeben.' },
        { name: 'Tassenregal', r: [40, 236, 250, 40], walk: [300, 640], look: 'Saubere Tassen in Reih und Glied. Und eine Zuckerdose, die aussieht, als hätte sie schon viel erlebt.' },
        { name: 'Lichtschiene', r: [330, 88, 660, 46], walk: [640, 640], look: 'Strahler, die das Gebäck ins rechte Licht rücken. Ein Krapfen sollte immer gut ausgeleuchtet sein.' },
        { name: 'Vitrine mit Gebäck', r: [322, 438, 688, 82], walk: [560, 625],
          look: ['Krapfen, Vanillekipferl, Nussschnecken, Torten...', 'Ich muss mich konzentrieren. Konzentrieren! ...Wie viel kostet ein Krapfen?'],
          use: async () => { await G.say('fini', 'Ohne Bezahlung einfach was rausnehmen? Bei der Resi? Die erzählt das dann ganz Grafing. In drei Versionen.'); } },
        !f('got_lebkuchen') && { name: 'Teller mit Bruchware', r: [346, 380, 150, 54], walk: [400, 625],
          look: ['Ein Teller mit kaputten Lebkuchen. „BRUCH“.', 'Ein Lebkuchenmann hat nur ein Bein. Er schaut trotzdem tapfer. Ein Vorbild.'],
          use: async () => {
            if (!f('ohmeier_wants')) { await G.say('fini', 'Einfach nehmen? Nee. Und wozu bräuchte ich einen einbeinigen Lebkuchenmann? ...Außer als Freund.'); return; }
            await G.say('fini', 'Resi, darf ich den einbeinigen Lebkuchenmann haben? Für Frau Ohmeiers Schaufenster!');
            await G.say('resi', 'Den Bruch? Für die Ohmeier? Mei, nimm’n mit! Der hat eh scho g’nug mitg’macht.');
            G.flag('got_lebkuchen'); G.give('lebkuchen');
          } },
        { name: 'Kasse', r: [786, 364, 112, 66], walk: [840, 625], look: 'Die Kasse zeigt 13,37. Irgendwer hier ist ein Nerd. Ich tippe auf die Kasse.' },
        { name: 'Schublade', r: [596, 536, 108, 38], walk: [650, 625], look: 'Eine Schublade. Von Resis Seite aus. Da hebt sie bestimmt Sachen auf. Brösel. Geheimnisse. Brösel-Geheimnisse.' },
        { name: 'Stehtisch', r: [76, 494, 170, 220], walk: [320, 690], look: 'Ein Stehtisch mit einem Kaffee und einem halben Krapfen. Wer lässt einen halben Krapfen liegen?! Ein Monster.',
          use: async () => { await G.say('fini', 'Fremde Krapfen essen? ...Nein. Ich habe Prinzipien. Ziemlich wackelige, aber immerhin.'); } },
        { name: 'Resi', r: [588, 230, 106, 200], walk: [500, 632], face: 'r',
          look: 'Die Resi vom Kreitmampf. Sie weiß alles über jeden in Grafing. Wahrscheinlich auch, wo meine Socken sind.',
          use: resiTalk,
          items: {
            prospekt: async () => { await G.say('resi', '„Protzinger Sportwelt“... Des is der Vater vom Konstantin. Der kauft dem Buam ois, was an Motor hat. Sogar a elektrische Zahnbürste mit Turbo.'); },
            christkind: async () => { await G.say('resi', 'Ah, des Christkindl! Bring’s g’schwind zum Glöckl ins Kircherl, der sucht’s scho den ganzen Tag!'); },
            geld: async () => { await G.say('resi', 'Behalt’s, Fini. Heut is ois aufs Haus. ...Außer des, was was kost’.'); },
            tasse: async () => { await G.say('resi', 'A Glühweintass’n? Die nimmt d’Gerti z’ruck, an der Glühweinbude. Da gibt’s Pfand!'); },
            lebkuchen: async () => { await G.say('resi', 'Den bringst der Ohmeier, gell? Ned dass’d den unterwegs aufisst.'); },
            foto: async () => { await G.say('resi', '1953! Des is der alte Speichl, der Vater vom Gustl! Der hat damals des erste Kufen-Gaudi g’wonnen. Zeig’s dem Gustl, der freut si!'); },
            pokal: async () => { await G.say('resi', 'Die Goldene Kufe! Fini!! Jetzt kriagst dei Brezn!'); },
            '*': async () => { await G.say('resi', 'Fini, i bin Bäckerin, ned des Fundbüro. Obwohl... manchmal schon.'); },
          } },
        { name: 'Glas-Schiebetür zum Marktplatz', r: [1040, 150, 236, 430], walk: [1160, 655], exit: { to: 'marktplatz', x: 640, y: 590, face: 1 } },
      ];
    },
  };
})();
