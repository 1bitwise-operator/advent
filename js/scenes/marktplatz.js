/* Szene: Marktplatz – vor dem Café Kreitmampf */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function kreitmampf() {
    // Treppengiebelhaus nach Foto: ockergelb, 7 Stufen je Seite, Fenster 1-2-3, verglaste Ladenfront
    const x = 410, w = 460, base = 522, eave = 272, top = 40, steps = 7;
    const col = '#e8c266', cap = '#f4f1ea';
    const sw = (w / 2) / (steps + 0.5), sh = (eave - top) / steps;
    // Kontur
    let d = `M${x},${base} V${eave}`;
    const caps = [];
    let cx = x, cy = eave;
    for (let i = 0; i < steps; i++) { caps.push([cx, cy, sw]); cx += sw; d += ` H${cx.toFixed(1)}`; cy -= sh; d += ` V${cy.toFixed(1)}`; }
    const topW = w - 2 * (cx - x);
    caps.push([cx, cy, topW]);
    d += ` H${(cx + topW).toFixed(1)}`;
    cx += topW;
    for (let i = 0; i < steps; i++) { cy += sh; d += ` V${cy.toFixed(1)}`; caps.push([cx, cy, sw]); cx += sw; d += ` H${cx.toFixed(1)}`; }
    d += ` V${base} Z`;
    let s = `<path d="${d}" fill="${col}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
    s += `<path d="M${x + w * 0.8},${eave} H${x + w} V${base} H${x + w * 0.8} Z" fill="#000" opacity=".05"/>`;
    // weiße Stufenabdeckungen mit Schnee
    for (const [px, py, pw] of caps) {
      s += `<rect x="${(px - 4).toFixed(1)}" y="${(py - 5).toFixed(1)}" width="${(pw + 8).toFixed(1)}" height="7" fill="${cap}" stroke="${OL}" stroke-width="2.2"/>`;
      s += A.snowLine(`M${(px - 2).toFixed(1)},${(py - 8).toFixed(1)} H${(px + pw + 2).toFixed(1)}`, 6);
    }
    // Taube auf dem First
    s += `<g transform="translate(${x + w / 2 - 8},${top - 5}) scale(0.22)">${C.gurrbert()}</g>`;
    // weiße Eckpilaster
    s += `<rect x="${x}" y="${eave + 36}" width="16" height="${base - eave - 36}" fill="${cap}" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<rect x="${x + w - 16}" y="${eave + 36}" width="16" height="${base - eave - 36}" fill="${cap}" stroke="${OL}" stroke-width="2.5"/>`;
    // Fenster: 1 oben, 2 darunter, 3 im Hauptgeschoss
    const win = (wx, wy, lit) => A.window(wx, wy, 46, 54, { lit, frame: '#fbf8f0', glow: lit });
    s += win(x + w / 2 - 23, 108, false);
    s += win(x + w / 2 - 70, 196, true) + win(x + w / 2 + 24, 196, false);
    s += win(x + 64, 342, true) + win(x + w / 2 - 23, 342, false) + win(x + w - 110, 342, true);
    // Schriftzug
    s += A.text(x + w / 2, 320, 'Bäckerei · Café · Konditorei · Bistro', { fs: 19, fill: '#4a2c1b', font: 'Georgia, \'Times New Roman\', serif', italic: true });
    // Ladenfront
    s += A.glow(x + w / 2, 475, 220, 'gWarm', 0.9);
    const fx = x + 44, fw = w - 88;
    s += `<rect x="${fx}" y="438" width="${fw}" height="${base - 438}" fill="url(#gWinLit)" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 1; i < 8; i++) s += `<path d="M${fx + fw * i / 8},438 V${base}" stroke="#4a2c1b" stroke-width="2.5"/>`;
    // Theke/Gebäck im Fenster
    s += `<rect x="${fx + 6}" y="488" width="${fw - 12}" height="8" fill="#a8744a" stroke="${OL}" stroke-width="1.5"/>`;
    for (let i = 0; i < Math.floor((fw - 20) / 34); i++) s += `<ellipse cx="${fx + 20 + i * 34}" cy="482" rx="10" ry="6" fill="${i % 2 ? '#c27a44' : '#b86a35'}" stroke="${OL}" stroke-width="1.5"/>`;
    // Kreidetafeln zwischen den Fenstern
    for (const tx of [fx - 2, fx + fw * 0.25 - 14, fx + fw * 0.75 - 14, fx + fw - 26]) {
      s += `<rect x="${tx}" y="446" width="28" height="56" rx="2" fill="#2b2f2a" stroke="${OL}" stroke-width="2"/>`;
      s += `<path d="M${tx + 5},458 h18 M${tx + 5},468 h14 M${tx + 5},478 h18 M${tx + 5},488 h10" stroke="#fff" stroke-width="1.6" opacity=".75"/>`;
    }
    // Tür
    s += A.door(x + w / 2 - 28, 442, 56, base - 442, { color: '#4a2c1b', glass: true, lit: true, arch: false });
    // Zwei verschneite Sonnenschirme
    for (const ux of [x + 118, x + w - 118]) {
      s += `<path d="M${ux},404 V${base}" stroke="${OL}" stroke-width="5"/><path d="M${ux},404 V${base}" stroke="#9aa3ad" stroke-width="2.5"/>`;
      s += `<path d="M${ux - 100},426 L${ux},392 L${ux + 100},426 Z" fill="#ece8df" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      s += A.snowLine(`M${ux - 92},420 L${ux},390 L${ux + 92},420`, 7);
      s += `<rect x="${ux - 100}" y="426" width="200" height="16" fill="#ece8df" stroke="${OL}" stroke-width="2.5"/>` + A.text(ux, 440, "KREITMAMPF", { fs: 15, fill: "#4a2c1b", font: "Georgia, serif", maxw: 184 });
    }
    // Tannengirlande an der Hauswand, direkt unter dem Schriftzug
    const gy = 330, n = 4, gx0 = x + 40, gx1 = x + w - 40;
    let gd = `M${gx0},${gy}`;
    for (let i = 0; i < n; i++) { const a = gx0 + (gx1 - gx0) * i / n, b = gx0 + (gx1 - gx0) * (i + 1) / n; gd += ` Q${(a + b) / 2},${gy + 10} ${b},${gy}`; }
    s += `<path d="${gd}" fill="none" stroke="#1f5a37" stroke-width="10" stroke-linecap="round"/><path d="${gd}" fill="none" stroke="#2f7d4f" stroke-width="6" stroke-linecap="round" stroke-dasharray="3 4"/>`;
    for (let i = 0; i <= n; i++) {
      const hx = gx0 + (gx1 - gx0) * i / n;
      s += `<circle cx="${hx}" cy="${gy + 8}" r="5" fill="${i % 2 ? '#ffd36e' : '#d63a3a'}" stroke="${OL}" stroke-width="1.5"/>`;
      s += `<path d="M${hx - 7},${gy - 4} l7,4 l7,-4 v8 l-7,-4 l-7,4 Z" fill="#d63a3a" stroke="${OL}" stroke-width="1.2"/>`;
    }
    return s;
  }

  function ohmeier(st) {
    let s = A.gableHouse({ x: 0, base: 525, w: 260, h: 330, gh: 150, color: '#eaa7b4', gable: 'stepped', rows: 2, cols: 3, groundH: 150, shutters: '#7b3fa0', seed: 2, trim: '#fbeef2' });
    s += `<rect x="6" y="372" width="248" height="153" fill="#5a2d6e" stroke="${OL}" stroke-width="3"/>`;
    s += A.sign(4, 342, 236, 32, 'OHMEIER MODEN', { fs: 19, bg: '#7b3fa0', fg: '#ffe08a', ls: 2 });
    // Schaufenster
    s += `<rect x="18" y="390" width="174" height="116" fill="#f9d3e6" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M18,390 L105,470 L192,390" fill="#fff" opacity=".35"/>`;
    s += A.glow(105, 470, 80, 'gSoft', 1);
    s += `<rect x="78" y="478" width="54" height="22" rx="4" fill="#c0392b" stroke="${OL}" stroke-width="2.5"/>`;
    if (!f('lebkuchen_given')) {
      // Christkind im Kaschmir-Poncho
      s += `<ellipse cx="105" cy="470" rx="22" ry="11" fill="#e6c18f" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<path d="M86,468 Q105,442 124,468 L120,476 Q105,482 90,476 Z" fill="#d8b4e8" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<circle cx="105" cy="447" r="10" fill="#f6d5b8" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<circle cx="105" cy="440" r="15" fill="none" stroke="#ffd36e" stroke-width="2.5"/>`;
      s += A.text(105, 420, '„Christkind Couture“', { fs: 15, fill: '#7b3fa0', font: 'Georgia, serif', italic: true, maxw: 166 });
    } else {
      s += `<g transform="translate(105,478) scale(0.62)"><path d="M0,-80 a14,14 0 1 1 -0.1,0 Z M-16,-56 H16 L36,-46 L33,-34 L16,-40 L18,-14 L12,0 L2,0 L0,-12 L-8,-12 L-14,-32 L-32,-32 L-32,-44 Z" fill="#b86a35" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="-5" cy="-68" r="2.5" fill="#fff"/><circle cx="5" cy="-68" r="2.5" fill="#fff"/></g>`;
      s += A.text(105, 420, '„Avantgarde mit Kante“', { fs: 15, fill: '#7b3fa0', font: 'Georgia, serif', italic: true, maxw: 166 });
    }
    s += `<path d="M24,398 l30,-6 M150,398 l34,-4" stroke="#fff" stroke-width="3" opacity=".5"/>`;
    s += A.door(198, 404, 50, 121, { color: '#7b3fa0', glass: true, lit: true });
    return s;
  }

  function fairkehrt() {
    let s = A.gableHouse({ x: 928, base: 525, w: 380, h: 320, gh: 160, color: '#a9d3b2', gable: 'curved', rows: 2, cols: 4, groundH: 150, seed: 5, trim: '#eef8ef', curtain: '#f4c542' });
    s += `<rect x="934" y="372" width="346" height="153" fill="#5b4a2f" stroke="${OL}" stroke-width="3"/>`;
    s += A.sign(950, 340, 300, 34, 'FAIRKEHRTE · Weltladen', { fs: 19, bg: '#2f6e4a', fg: '#f4efe6', ls: 1 });
    // Schaufenster
    s += A.glow(1030, 450, 110, 'gWarm', 0.7);
    s += `<rect x="942" y="392" width="182" height="114" fill="url(#gWinLit)" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="948" y="470" width="170" height="8" fill="#a8744a" stroke="${OL}" stroke-width="2"/>`;
    const cols = ['#c0392b', '#2f8f8b', '#f4c542', '#7b3fa0', '#e8663d'];
    for (let i = 0; i < 6; i++) s += `<rect x="${956 + i * 26}" y="${444 - (i % 2) * 8}" width="18" height="${26 + (i % 2) * 8}" rx="2" fill="${cols[i % 5]}" stroke="${OL}" stroke-width="2"/>`;
    s += `<circle cx="1090" cy="418" r="16" fill="#5aa0d8" stroke="${OL}" stroke-width="2.5"/><path d="M1080,410 q6,4 4,10 q8,2 10,-6 M1094,424 q4,-2 6,2" fill="#7cc47a" stroke="${OL}" stroke-width="1.5"/>`;
    for (let i = 0; i < 4; i++) s += `<path d="M${966 + i * 40},492 v-10 m-4,10 h8" stroke="${OL}" stroke-width="2"/><path d="M${966 + i * 40},478 q-4,-8 0,-12 q4,4 0,12" fill="#ffb347" stroke="${OL}" stroke-width="1.5" class="flicker"/>`;
    s += A.door(1136, 404, 56, 121, { color: '#2f6e4a', glass: true, lit: true, wreath: true });
    return s;
  }

  function mariensaeule() {
    const x = 318;
    let s = '';
    s += `<rect x="${x - 34}" y="512" width="68" height="40" fill="#cfc8bc" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="${x - 26}" y="478" width="52" height="36" fill="#ddd6ca" stroke="${OL}" stroke-width="3"/>`;
    s += A.snowLine(`M${x - 33},509 H${x + 33}`, 6) + A.snowLine(`M${x - 25},475 H${x + 25}`, 5);
    s += `<rect x="${x - 11}" y="236" width="22" height="242" fill="#e6dfd2" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M${x - 4},240 V474" stroke="#fff" stroke-width="3" opacity=".6"/>`;
    s += `<rect x="${x - 20}" y="224" width="40" height="14" rx="3" fill="#ddd6ca" stroke="${OL}" stroke-width="3"/>`;
    s += A.snowLine(`M${x - 18},221 H${x + 18}`, 5);
    s += A.glow(x, 190, 60, 'gWarm', 0.6);
    // goldene Madonna
    s += `<path d="M${x - 15},222 Q${x - 12},190 ${x},176 Q${x + 12},190 ${x + 15},222 Z" fill="#e8c35a" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<circle cx="${x}" cy="172" r="8" fill="#f2d47a" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<circle cx="${x}" cy="170" r="14" fill="none" stroke="#ffd36e" stroke-width="2"/>`;
    for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; s += `<circle cx="${(x + Math.cos(a) * 14).toFixed(1)}" cy="${(170 + Math.sin(a) * 14).toFixed(1)}" r="1.6" fill="#fff8d0"/>`; }
    // Zaun
    s += `<path d="M${x - 46},552 V528 M${x + 46},552 V528 M${x - 46},532 H${x + 46}" stroke="#2f3a4a" stroke-width="3"/>`;
    return s;
  }

  function bench(st) {
    let s = `<rect x="690" y="560" width="150" height="10" rx="3" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="690" y="536" width="150" height="10" rx="3" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M700,570 V592 M830,570 V592 M705,546 V560 M825,546 V560" stroke="#2f3a4a" stroke-width="5"/>`;
    s += A.snowLine('M694,557 H836', 5) + A.snowLine('M694,533 H836', 5);
    if (!f('tasse_taken')) {
      s += `<g transform="translate(796,532)"><path d="M0,0 H20 L18,24 Q10,28 2,24 Z" fill="#b8322b" stroke="${OL}" stroke-width="2.5"/><path d="M19,6 q8,2 6,9 q-2,5 -7,4" fill="none" stroke="${OL}" stroke-width="2.5"/><path d="M5,12 l3,-4 l3,4 l3,-4" stroke="#fff" stroke-width="1.6" fill="none"/></g>`;
      s += `<path class="steam s2" d="M806,526 q-5,-8 0,-14" stroke="#fff" stroke-width="2" fill="none" opacity=".0"/>`;
    }
    return s;
  }

  /** Kreidetafel-Aufsteller (A-Ständer) vor dem Weltladen, steht auf dem Boden */
  function aufsteller() {
    const font = 'Segoe Print, Comic Sans MS, cursive';
    let s = A.shadow(1237, 550, 46);
    // hinteres Bein
    s += `<path d="M1226,462 L1214,550" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M1226,462 L1214,550" stroke="#6b4128" stroke-width="3.5" stroke-linecap="round"/>`;
    // Rahmen vorne mit Füßen
    s += `<path d="M1210,460 L1194,550 M1264,460 L1280,550" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M1210,460 L1194,550 M1264,460 L1280,550" stroke="#8a5a36" stroke-width="5" stroke-linecap="round"/>`;
    s += `<rect x="1200" y="466" width="74" height="74" fill="#2b2f2a" stroke="#8a5a36" stroke-width="5"/><rect x="1200" y="466" width="74" height="74" fill="none" stroke="${OL}" stroke-width="1.5"/>`;
    s += `<rect x="1206" y="454" width="62" height="10" rx="4" fill="#8a5a36" stroke="${OL}" stroke-width="2.5"/>`;
    s += A.snowLine('M1208,452 H1266', 4);
    s += A.text(1237, 488, 'Heute', { fs: 13, fill: '#fff', font, maxw: 62 }) + A.text(1237, 507, 'fair:', { fs: 13, fill: '#fff', font, maxw: 62 }) + A.text(1237, 528, 'Kerzen!', { fs: 14, fill: '#ffd36e', font, maxw: 62 });
    s += `<path d="M1206,536 h20" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/>`;
    return s;
  }

  const trashSVG = (st) => `
    ${A.shadow(0, 0, 30)}
    <path d="M-24,-80 L24,-80 L20,0 L-20,0 Z" fill="#3f6b45" stroke="${OL}" stroke-width="3"/>
    <path d="M-12,-74 V-8 M0,-74 V-8 M12,-74 V-8" stroke="${OL}" stroke-width="1.6" opacity=".4"/>
    ${!f('prospekt_taken') ? `<g transform="rotate(-14 4 -88)"><rect x="-6" y="-104" width="26" height="34" fill="#23252e" stroke="${OL}" stroke-width="2.5"/><path d="M-2,-86 L16,-92" stroke="#e9ff3a" stroke-width="3"/></g>` : ''}
    <rect x="-28" y="-88" width="56" height="10" rx="4" fill="#2f5236" stroke="${OL}" stroke-width="3"/>
    ${A.snowLine('M-24,-90 H24', 5)}
    <circle cx="0" cy="-44" r="11" fill="#f4efe6" stroke="${OL}" stroke-width="1.5"/>
    <path d="M-5,-48 q5,-6 10,0 M0,-48 v10 M-4,-38 h8" stroke="#3f6b45" stroke-width="2" fill="none" stroke-linecap="round"/>`;

  const snowmanSVG = () => `
    ${A.shadow(0, 0, 50)}
    <ellipse cx="0" cy="-40" rx="48" ry="42" fill="url(#gSnowShade)" stroke="${OL}" stroke-width="3"/>
    <ellipse cx="0" cy="-108" rx="36" ry="32" fill="url(#gSnowShade)" stroke="${OL}" stroke-width="3"/>
    <circle cx="0" cy="-160" r="26" fill="url(#gSnowShade)" stroke="${OL}" stroke-width="3"/>
    <circle cx="-9" cy="-166" r="4" fill="${OL}"/><circle cx="9" cy="-166" r="4" fill="${OL}"/>
    <path d="M-9,-174 l8,3 M9,-174 l-8,3" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
    <path d="M0,-158 L26,-152 L0,-150 Z" fill="#e8663d" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-10,-144 q10,-4 20,0" stroke="${OL}" stroke-width="3" fill="none" stroke-dasharray="1 5" stroke-linecap="round"/>
    <circle cx="0" cy="-118" r="3.5" fill="${OL}"/><circle cx="0" cy="-102" r="3.5" fill="${OL}"/><circle cx="0" cy="-60" r="3.5" fill="${OL}"/>
    <path d="M-28,-132 Q0,-120 28,-132 L30,-122 Q0,-110 -30,-122 Z" fill="#c0392b" stroke="${OL}" stroke-width="2.5"/>
    <path d="M14,-124 L22,-96 L32,-98 L24,-126 Z" fill="#c0392b" stroke="${OL}" stroke-width="2.5"/>
    <path d="M-34,-112 L-70,-138 M-56,-128 l-6,-14 M34,-112 L66,-130 M54,-124 l4,-14" stroke="#6b4128" stroke-width="5" stroke-linecap="round"/>
    <path d="M-22,-182 H22 L18,-186 V-214 H-18 V-186 Z" fill="#2a2433" stroke="${OL}" stroke-width="3"/>
    <rect x="-28" y="-188" width="56" height="8" rx="3" fill="#2a2433" stroke="${OL}" stroke-width="3"/>
    <rect x="-18" y="-196" width="36" height="7" fill="#c0392b"/>`;

  G.scenes.marktplatz = {
    title: 'Marktplatz – vor dem Café Kreitmampf',
    outdoor: true,
    walk: { x1: 40, x2: 1240, y1: 572, y2: 702, s1: 0.64, s2: 0.78 },
    entry: { x: 640, y: 640 },
    draw(st) {
      let s = A.defs();
      s += A.sky('skyMP', [[0, '#202a57'], [0.4, '#4b4a86'], [0.72, '#b8789f'], [1, '#f0b38c']]);
      s += A.stars(60, 11, 240);
      // tief stehende Wintersonne (16 Uhr)
      s += A.glow(910, 96, 110, 'gCool', 0.75);
      s += `<circle cx="910" cy="96" r="30" fill="#fff6d8" stroke="${OL}" stroke-width="3"/>`;
      // ferne Dächer
      s += `<path d="M0,330 L60,300 L120,330 L120,300 L190,260 L260,300 L320,280 L380,310 L900,310 L960,270 L1030,300 L1100,250 L1180,300 L1280,280 L1280,520 L0,520 Z" fill="#7b6aa0" opacity=".55"/>`;
      // Häuserzeile
      s += `<g>${A.gableHouse({ x: 248, base: 522, w: 140, h: 300, gh: 90, color: '#b9d1e4', gable: 'plain', rows: 3, cols: 2, ww: 28, seed: 4, trim: '#eef5fb' })}</g>`;
      s += ohmeier(st);
      s += kreitmampf();
      s += fairkehrt();
      // Sockel bis unter die Schneedecke: kein Spalt zwischen Häusern und Boden
      for (const [x1, x2, b, c] of [[0, 254, 525, '#5a2d6e'], [248, 388, 522, '#b9d1e4'], [410, 870, 522, '#e8c266'], [934, 1280, 525, '#5b4a2f']]) {
        s += `<rect x="${x1}" y="${b - 2}" width="${x2 - x1}" height="${560 - b}" fill="${c}" stroke="${OL}" stroke-width="3"/>`;
        s += `<rect x="${x1}" y="${b + 2}" width="${x2 - x1}" height="${560 - b}" fill="#000" opacity=".18"/>`;
      }
      // Lichterketten
      // Lichterketten hängen an Fensterbrettern (Haken an beiden Enden)
      const hook = (x, y) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#3a2c2c" stroke="${OL}" stroke-width="1.5"/>`;
      s += A.lights(236, 269, 368, 284, 24, 8, 4) + hook(236, 269) + hook(368, 284);
      s += A.lights(712, 251, 956, 281, 34, 11, 12) + hook(712, 251) + hook(956, 281);
      // Boden
      s += A.snowGround(530, 3);
      s += `<path d="M0,560 C300,548 900,548 1280,560" fill="none" stroke="#c9d8ec" stroke-width="3"/>`;
      s += A.footprints([[600, 620], [622, 640], [646, 662], [672, 684], [700, 704], [380, 600], [356, 618], [334, 640]]);
      s += mariensaeule();
      s += A.xmasTree(884, 566, 300, 9);
      // Schneehaufen
      s += A.snowPile(-20, 575, 170, 45);
      s += A.exitArrow(26, 610, 'l', 'Christkindlmarkt');
      s += A.exitArrow(1254, 610, 'r', 'Zum Kircherl');
      return s;
    },
    actors(st) {
      return [
        // Laternen als Figuren, damit Fini dahinter vorbeigehen kann
        { id: 'laterne0', x: 0, y: 0, z: 590, svg: A.lamp(372, 590, 230) },
        { id: 'laterne1', x: 0, y: 0, z: 588, svg: A.lamp(1110, 588, 220) },
        // Bank samt Mülleimer weiter vorne (größer)
        { id: 'bank', x: 805, y: 650, s: 1.2, svg: `${A.shadow(0, 2, 80)}<g transform="translate(-765,-592)">${bench(st)}</g>` },
        { id: 'aufsteller', x: 0, y: 0, z: 550, svg: aufsteller() },
        { id: 'muell', x: 930, y: 652, s: 1.15, svg: trashSVG(st) },
        { id: 'schneemann', x: 262, y: 690, s: 0.88, svg: snowmanSVG(), head: -230 },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Café Kreitmampf', r: [404, 30, 472, 330],
          look: ['Das Café Kreitmampf. Das markanteste Haus am ganzen Marktplatz. Mit einem Giebel wie eine Treppe in den Himmel!', 'Ganz oben sitzt sogar eine Taube. Wer so einen Giebel hat, hat auch gute Krapfen. Das ist Wissenschaft.'] },
        { name: 'Häuschen', r: [250, 230, 60, 290], look: 'Ein schmales Haus. Es sieht aus, als würde es zwischen den großen Häusern ein bisschen die Luft anhalten.' },
        { name: 'Schaufenster von Ohmeier Moden', r: [16, 388, 178, 120], walk: [110, 585],
          look: () => {
            if (f('lebkuchen_given')) return 'Mein einbeiniger Lebkuchenmann. Im Spotlight. Er hat es geschafft. Ich bin so stolz auf ihn.';
            if (f('christkind_missing')) { G.flag('seen_christkind'); return ['Moment mal. Das Christkind im Schaufenster...', 'Das ist doch das Christkind aus Herrn Glöckls Krippe! In einem Kaschmir-Poncho!', 'Frau Ohmeier, was haben Sie getan?!']; }
            return ['„Ohmeier Moden – Kollektion Christkind Couture“.', 'Eine kleine Krippenfigur im Kaschmir-Poncho. Auf einem Samtkissen. Mit Spotlight.', 'Das ist entweder Kunst oder ein Hilferuf.'];
          },
          use: async () => { await G.say('fini', 'Ich kann ja schlecht durchs Schaufenster greifen. Da müsste ich rein in den Laden.'); } },
        { name: 'Ohmeier Moden', r: [196, 400, 56, 125], walk: [222, 582], exit: { to: 'ohmeier', x: 200, y: 650, face: 1 },
          look: 'Ohmeier Moden. „Mode, bei der man Oh mei sagt.“ Der Slogan ist ehrlich, das muss man ihm lassen.' },
        { name: 'Schaufenster Kreitmampf', r: [444, 420, 152, 92], walk: [520, 585],
          look: ['Brezn, Krapfen, Nussschnecken...', 'Ich darf da nicht zu lange reinschauen, sonst vergess ich, was ich eigentlich wollte.', '...was wollte ich eigentlich?'] },
        { name: 'Schaufenster Kreitmampf', r: [684, 420, 152, 92], walk: [760, 585],
          look: 'Ein Schaufenster voller Gebäck. Mein Magen macht Geräusche wie ein Schneepflug.' },
        { name: 'Bäckerei & Café Kreitmampf', r: [608, 400, 64, 122], walk: [640, 580], exit: { to: 'baeckerei', x: 1120, y: 660, face: -1 },
          look: 'Die Tür zum Kreitmampf. Aus dem Spalt riecht es nach frischen Brezn. Und nach Klatsch und Tratsch.' },
        { name: 'Schaufenster Fairkehrte', r: [940, 390, 186, 118], walk: [1030, 585],
          look: 'Der Fairkehrte-Laden. Kaffee, Schokolade, Kerzen – alles fair gehandelt. Sogar das Schaufenster wirkt irgendwie gerecht.' },
        { name: 'Kreidetafel', r: [1192, 450, 92, 102], walk: [1170, 600], look: ['„Heute fair: Kerzen!“', 'Was heute wohl unfair ist?'] },
        { name: 'Fairkehrte-Laden', r: [1134, 400, 60, 125], walk: [1164, 582], exit: { to: 'fairkehrt', x: 170, y: 660, face: 1 },
          look: 'Fairkehrte – der Weltladen. Über dem Laden war früher eine Radlwerkstatt, glaub ich.' },
        { name: 'Mariensäule', r: [282, 156, 72, 400], walk: [318, 590],
          look: ['Die Mariensäule. Steht hier seit 1923 und hat schon jedes Kufen-Gaudi gesehen.', 'Wenn sie reden könnte, würde sie wahrscheinlich sagen: „Fini, du hast deinen Schlitten vergessen.“'],
          use: async () => { await G.say('fini', 'Draufklettern? Damit ich das ganze Rennen von oben sehe? ... Nein. Ich will mitfahren, nicht zuschauen.'); } },
        { name: 'Christbaum', p: [884, 240, 1026, 560, 742, 560], walk: [884, 590],
          look: ['Der Christbaum vom Marktplatz. Wunderschön.', 'Und definitiv zu groß für jedes Wohnzimmer in Grafing. Ich hab gefragt. Mehrmals.'],
          use: async () => { await G.say('fini', 'Eine Kugel klauen? Nein. Ich bin chaotisch, aber nicht kriminell.'); } },
        { name: "Straßenlaterne", r: [350, 356, 46, 232], walk: [420, 600], look: 'Eine Laterne mit Tannenzweig. Grafing gibt sich echt Mühe mit der Gemütlichkeit.' },
        { name: 'Bank', r: [710, 578, 130, 74], walk: [805, 700],
          look: 'Eine Bank mit Schneepolster. Hier sitzen nur Leute, die sehr wenig Wert auf trockene Hosen legen.',
          use: async () => { await G.say('fini', 'Hinsetzen? Keine Zeit! Das Rennen wartet. Und meine Hose ist mir heilig.'); } },
        !f('tasse_taken') && { name: 'Glühweintasse', r: [837, 558, 52, 52], walk: [855, 700],
          look: ['Eine leere Glühweintasse. Irgendwer hat sie hier stehen lassen.', 'Da ist Pfand drauf! Pfand ist quasi Geld, das herumsteht und auf mich wartet.'],
          use: async () => {
            await G.say('fini', 'Die nehm ich mit. Das ist kein Diebstahl. Das ist... Pfand-Rettung.');
            G.flag('tasse_taken'); G.give('tasse');
          } },
        { name: 'Mülleimer', r: [893, 530, 74, 124], walk: [975, 700],
          look: () => f('prospekt_taken') ? 'Ein Mülleimer. Ich hab genug darin gewühlt für ein ganzes Leben.' : 'Ein Mülleimer. Da schaut ein glänzender Prospekt raus. Glänzend. Im Müll. Verdächtig.',
          use: async () => {
            if (f('prospekt_taken')) { await G.say('fini', 'Da ist nur noch Müll drin. Normaler, ehrlicher Müll.'); return; }
            await G.say('fini', 'Ich wühle nicht im Müll. ... Okay, kurz. Nur mit zwei Fingern.');
            G.flag('prospekt_taken'); G.give('prospekt');
            await G.say('fini', 'Ein Prospekt für einen Hightech-Schlitten. Den sollte ich mir mal genauer anschauen.');
          } },
        { name: 'Schneemann', r: [218, 494, 88, 196], walk: [380, 680],
          look: ['Ein Schneemann mit Kohle-Augen und einer sehr ernsten Miene.', 'Er sieht aus, als hätte er auch was vergessen. Vielleicht seinen Sommer.'],
          use: async () => {
            await G.say('fini', 'Hallo, Herr Schneemann. Haben Sie zufällig einen roten Schlitten gesehen?');
            await G.wait(700);
            await G.say('fini', '...Er schweigt. Er weiß was. Ich seh’s an seinen Kohlen.');
          },
          items: { '*': async () => { await G.say('fini', 'Der Schneemann will keine Geschenke. Er ist wunschlos glücklich. Und gefroren.'); } } },
        { name: 'Zum Christkindlmarkt (Glühweinbude)', r: [0, 420, 48, 300], walk: [42, 640], exit: { to: 'gluehwein', x: 1150, y: 650, face: -1 } },
        { name: 'Zum Kircherl', r: [1232, 420, 48, 300], walk: [1238, 640], exit: { to: 'marktost', x: 110, y: 650, face: 1 } },
      ];
    },
  };
})();
