/* Szene: Marktplatz – beim Kircherl (mit Apotheke und Taubenschlag-Tür) */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function kircherl() {
    const x = 330, w = 330, base = 548, top = 262;
    let s = '';
    // Dachreiter mit Zwiebelturm
    s += `<rect x="${x + w / 2 - 26}" y="70" width="52" height="80" fill="#f7f2e8" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<path d="M${x + w / 2 - 12},120 V92 A12,12 0 0 1 ${x + w / 2 + 12},92 V120 Z" fill="#3a3550" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<path d="M${x + w / 2},96 V112 M${x + w / 2 - 6},104 H${x + w / 2 + 6}" stroke="#e8c35a" stroke-width="2"/>`;
    s += `<path d="M${x + w / 2 - 34},72 Q${x + w / 2 - 34},40 ${x + w / 2},26 Q${x + w / 2 - 18},10 ${x + w / 2},-12 Q${x + w / 2 + 18},10 ${x + w / 2},26 Q${x + w / 2 + 34},40 ${x + w / 2 + 34},72 Z" fill="#b5622f" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    s += A.snowLine(`M${x + w / 2 - 30},62 Q${x + w / 2 - 28},38 ${x + w / 2},28 Q${x + w / 2 + 28},38 ${x + w / 2 + 30},62`, 8);
    s += `<path d="M${x + w / 2},-12 V-40 M${x + w / 2 - 9},-30 H${x + w / 2 + 9}" stroke="#e8c35a" stroke-width="4" stroke-linecap="round"/>`;
    // Fassade mit Volutengiebel
    const gp = A.curvedGable(x, top, w, 120);
    s += `<path d="${gp} L${x + w},${base} L${x},${base} Z" fill="#f7f2e8" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
    s += `<path d="M${x + w * 0.78},${top - 30} L${x + w},${top} V${base} H${x + w * 0.78} Z" fill="#000" opacity=".05"/>`;
    // Pilaster
    for (const px of [x + 14, x + 96, x + w - 110, x + w - 32]) s += `<rect x="${px}" y="${top}" width="18" height="${base - top}" fill="#e9c47a" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<rect x="${x - 8}" y="${top - 8}" width="${w + 16}" height="14" rx="3" fill="#e9c47a" stroke="${OL}" stroke-width="3"/>`;
    s += A.snowLine(`M${x - 6},${top - 11} H${x + w + 6}`, 7) + A.snowLine(gp, 9);
    // Giebel: Auge Gottes / Dreieck
    s += `<path d="M${x + w / 2 - 22},${top - 46} L${x + w / 2},${top - 86} L${x + w / 2 + 22},${top - 46} Z" fill="#ffe08a" stroke="${OL}" stroke-width="2.5"/>`;
    s += A.glow(x + w / 2, top - 60, 40, 'gWarm', 0.6);
    // Rundbogenfenster mit buntem Glas
    for (const wx of [x + 44, x + w - 84]) {
      s += A.glow(wx + 20, 380, 60, 'gWarm', 0.5);
      s += `<path d="M${wx},460 V330 A20,20 0 0 1 ${wx + 40},330 V460 Z" fill="#ffd36e" stroke="${OL}" stroke-width="3"/>`;
      s += `<path d="M${wx},380 H${wx + 40} M${wx + 20},310 V460 M${wx},420 H${wx + 40}" stroke="${OL}" stroke-width="2"/>`;
      s += `<path d="M${wx + 2},382 H${wx + 18} V418 H${wx + 2} Z" fill="#c0392b" opacity=".55"/><path d="M${wx + 22},422 H${wx + 38} V458 H${wx + 22} Z" fill="#2f6fb5" opacity=".55"/><path d="M${wx + 22},382 H${wx + 38} V418 H${wx + 22} Z" fill="#2f8f8b" opacity=".45"/>`;
      s += A.snowLine(`M${wx - 3},463 H${wx + 43}`, 5);
    }
    // Rundfenster über dem Portal
    s += `<circle cx="${x + w / 2}" cy="312" r="24" fill="#ffd36e" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="${A.starPath(x + w / 2, 312, 16, 7, 8)}" fill="#ffb347" stroke="${OL}" stroke-width="1.5"/>`;
    // Portal
    const dx = x + w / 2 - 44;
    s += `<path d="M${dx - 12},${base} V418 A56,56 0 0 1 ${dx + 100},418 V${base} Z" fill="#e9c47a" stroke="${OL}" stroke-width="3"/>`;
    s += A.door(dx, 362, 88, base - 362, { color: '#6b3a22', lit: false });
    s += `<path d="M${dx + 44},${362 + 44} V${base}" stroke="${OL}" stroke-width="3"/>`;
    s += A.wreath(dx + 44, 395, 16);
    // Stufen
    s += `<rect x="${dx - 30}" y="${base}" width="148" height="10" fill="#d9d2c5" stroke="${OL}" stroke-width="2.5"/><rect x="${dx - 46}" y="${base + 10}" width="180" height="10" fill="#d9d2c5" stroke="${OL}" stroke-width="2.5"/>`;
    s += A.snowLine(`M${dx - 44},${base + 8} H${dx + 132}`, 5);
    return s;
  }

  function apotheke() {
    // Bären-Apotheke links vom Kircherl
    const x = -10, w = 280, base = 552;
    let s = A.gableHouse({ x, base, w, h: 300, gh: 130, color: '#cfe3d6', gable: 'curved', rows: 2, cols: 3, groundH: 140, shutters: '#2f6e4a', seed: 6, trim: '#f2f8f3' });
    s += `<rect x="${x + 6}" y="${base - 136}" width="${w - 12}" height="136" fill="#2f5e45" stroke="${OL}" stroke-width="3"/>`;
    s += A.sign(x + 26, base - 172, w - 52, 30, 'Bären-Apotheke', { fs: 18, bg: '#f2f8f3', fg: '#2f5e45', font: 'Georgia, serif' });
    // Ausleger mit rotem Apotheken-A
    s += `<path d="M${x + w - 6},${base - 240} h34" stroke="${OL}" stroke-width="5"/><path d="M${x + w - 6},${base - 240} h34" stroke="#3a3a3a" stroke-width="2.5"/>`;
    s += A.glow(x + w + 22, base - 210, 46, 'gWarm', 0.6);
    s += `<rect x="${x + w + 2}" y="${base - 234}" width="40" height="46" rx="5" fill="#d63a3a" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M${x + w + 11},${base - 196} L${x + w + 22},${base - 228} L${x + w + 33},${base - 196} M${x + w + 15},${base - 207} H${x + w + 29}" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>`;
    // Schaufenster mit Fläschchen und Kräutern
    const wx = x + 26, ww = 150;
    s += A.glow(wx + ww / 2, base - 60, 100, 'gWarm', 0.6);
    s += `<rect x="${wx}" y="${base - 112}" width="${ww}" height="92" fill="url(#gWinLit)" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="${wx + 6}" y="${base - 58}" width="${ww - 12}" height="7" fill="#a8744a" stroke="${OL}" stroke-width="2"/>`;
    const cols = ['#7b3fa0', '#2f8f8b', '#c0392b', '#3f6fb5', '#e8c35a', '#2f6e4a'];
    for (let i = 0; i < 6; i++) {
      const bx = wx + 14 + i * 22, h = 22 + (i % 3) * 6;
      s += `<rect x="${bx}" y="${base - 58 - h}" width="14" height="${h}" rx="3" fill="${cols[i]}" stroke="${OL}" stroke-width="1.8"/><rect x="${bx + 3}" y="${base - 62 - h}" width="8" height="5" fill="#f4f4f4" stroke="${OL}" stroke-width="1.2"/>`;
    }
    for (let i = 0; i < 3; i++) s += `<path d="M${wx + 30 + i * 44},${base - 26} q-8,-14 0,-20 q8,6 0,20 M${wx + 30 + i * 44},${base - 26} q8,-12 14,-10" fill="#7cc47a" stroke="${OL}" stroke-width="1.5"/>`;
    s += `<path d="M${wx + ww / 2},${base - 112} V${base - 20}" stroke="#f2f8f3" stroke-width="3" opacity=".8"/>`;
    s += `<path d="M${wx - 2},${base - 114} q${ww / 2},10 ${ww + 4},0" fill="none" stroke="#2f7d4f" stroke-width="8" stroke-linecap="round"/>`;
    // Tür
    s += A.door(x + w - 96, base - 118, 62, 118, { color: '#2f5e45', glass: true, lit: true, wreath: true });
    return s;
  }

  function taubenhaus(st) {
    const x = 880, base = 552;
    let s = '';
    // Haus traufständig
    s += `<rect x="${x}" y="300" width="420" height="${base - 300}" fill="#dccfb6" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="${x}" y="300" width="420" height="96" fill="#7a5233" stroke="${OL}" stroke-width="3.5"/>`;
    for (let i = 1; i < 14; i++) s += `<path d="M${x + i * 30},300 V396" stroke="${OL}" stroke-width="1.6" opacity=".45"/>`;
    s += `<path d="M${x - 20},304 L${x + 60},190 L${x + 440},190 L${x + 460},304 Z" fill="#8c3b2c" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    for (let i = 0; i < 5; i++) s += `<path d="M${x - 10 + i * 6},${290 - i * 22} H${x + 452 - i * 4}" stroke="${OL}" stroke-width="1.5" opacity=".3"/>`;
    s += `<path d="M${x + 56},196 Q${x + 250},176 ${x + 436},196 L${x + 452},280 Q${x + 230},250 ${x - 6},284 Z" fill="#f7fbff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
    s += A.snowLine(`M${x - 18},302 H${x + 458}`, 7);
    // Taubenschlag-Gaube
    s += `<path d="M${x + 120},250 L${x + 120},190 L${x + 160},150 L${x + 200},190 L${x + 200},250 Z" fill="#7a5233" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
    s += A.snowLine(`M${x + 116},192 L${x + 160},150 L${x + 204},192`, 7);
    s += `<rect x="${x + 140}" y="200" width="40" height="34" fill="#1b1424" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="${x + 132}" y="232" width="56" height="8" fill="#a8744a" stroke="${OL}" stroke-width="2"/>`;
    // Tauben auf dem Brett
    s += `<g transform="translate(${x + 146},232) scale(0.32)"><g class="bob">${C.gurrbert()}</g></g>`;
    s += `<g transform="translate(${x + 178},232) scale(-0.3,0.3)">${C.gurrbert()}</g>`;
    s += `<g transform="translate(${x + 330},196) scale(0.28)">${C.gurrbert()}</g>`;
    // Fenster
    for (let i = 0; i < 4; i++) s += A.window(x + 250 + i * 50 - 80, 322, 28, 44, { lit: i % 2 === 0, shutters: '#2f6e4a', sill: true });
    s += A.window(x + 180, 440, 36, 52, { lit: true, curtain: '#c0392b' });
    s += A.window(x + 290, 440, 36, 52, { lit: false });
    // kleine Holztür (ca. 1 m)
    s += `<rect x="${x + 46}" y="${base - 112}" width="66" height="112" fill="#a8744a" stroke="${OL}" stroke-width="3" />`;
    s += `<path d="M${x + 50},${base} V${base - 82} Q${x + 79},${base - 104} ${x + 108},${base - 82} V${base} Z" fill="${f('loft_open') ? '#1b1424' : '#4f7d4a'}" stroke="${OL}" stroke-width="3"/>`;
    if (!f('loft_open')) {
      for (let i = 1; i < 4; i++) s += `<path d="M${x + 50 + i * 14.5},${base - 90 + (i === 2 ? -6 : 0)} V${base}" stroke="${OL}" stroke-width="1.6" opacity=".5"/>`;
      s += `<path d="M${x + 52},${base - 60} H${x + 92} M${x + 52},${base - 24} H${x + 92}" stroke="#3a3a3a" stroke-width="5" stroke-linecap="round"/>`;
      s += `<rect x="${x + 92}" y="${base - 50}" width="14" height="16" rx="3" fill="#c9a227" stroke="${OL}" stroke-width="2"/><path d="M${x + 95},${base - 50} v-6 a4,4 0 0 1 8,0 v6" fill="none" stroke="${OL}" stroke-width="2.5"/>`;
    } else {
      s += `<path d="M${x + 50},${base} V${base - 82} L${x + 30},${base - 90} L${x + 30},${base + 4} Z" fill="#4f7d4a" stroke="${OL}" stroke-width="3"/>`;
    }
    s += `<rect x="${x + 22}" y="${base - 164}" width="114" height="44" rx="4" fill="#f4ead6" stroke="${OL}" stroke-width="2.5"/>`;
    s += A.text(x + 79, base - 145, 'TAUBEN', { fs: 15, fill: '#6b2a20', maxw: 104 }) + A.text(x + 79, base - 127, 'Tür zu, bitte!', { fs: 13, fill: '#6b2a20', maxw: 104 });
    // Wegweiser
    s += `<rect x="1180" y="450" width="8" height="${base - 410}" fill="#6b4128" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<path d="M1120,456 H1236 L1252,470 L1236,484 H1120 Z" fill="#f4ead6" stroke="${OL}" stroke-width="2.5"/>` + A.text(1180, 475, 'Bärenbuckel', { fs: 14, fill: '#2f6e4a', maxw: 108 });
    s += `<path d="M1120,492 H1236 L1252,506 L1236,520 H1120 Z" fill="#f4ead6" stroke="${OL}" stroke-width="2.5"/>` + A.text(1180, 511, 'Schlittenhang', { fs: 14, fill: '#2f6e4a', maxw: 108 });
    s += A.snowLine('M1122,453 H1236', 4);
    return s;
  }

  G.scenes.marktost = {
    title: 'Marktplatz – beim Dreifaltigkeits-Kircherl',
    outdoor: true,
    walk: { x1: 40, x2: 1240, y1: 578, y2: 702, s1: 0.64, s2: 0.78 },
    entry: { x: 640, y: 650 },
    draw(st) {
      let s = A.defs();
      s += A.sky('skyMO', [[0, '#202a57'], [0.4, '#4b4a86'], [0.72, '#b8789f'], [1, '#f0b38c']]);
      s += A.stars(50, 23, 220);
      s += `<path d="M380,360 L440,320 L470,340 L520,300 L560,330 L900,320 L940,280 L1000,310 L1000,520 L380,520 Z" fill="#7b6aa0" opacity=".5"/>`;
      // St.-Ägidius-Turm in der Ferne
      s += `<rect x="880" y="160" width="40" height="200" fill="#8f82b4" stroke="${OL}" stroke-width="2" opacity=".8"/><path d="M872,162 L900,96 L928,162 Z" fill="#7568a0" stroke="${OL}" stroke-width="2" opacity=".85"/><circle cx="900" cy="190" r="9" fill="#ffe9a6" opacity=".8"/>`;
      s += A.lights(664, 268, 880, 300, 30, 9, 31);
      s += A.snowGround(545, 5);
      s += apotheke();
      s += kircherl();
      s += taubenhaus(st);
      s += A.footprints([[520, 600], [542, 620], [564, 642], [990, 590], [1010, 606], [1032, 624]]);
      s += A.snowPile(1180, 590, 120, 34) + A.snowPile(-30, 590, 120, 36);
      s += A.exitArrow(26, 620, 'l', 'Zum Café Kreitmampf');
      s += A.exitArrow(1254, 620, 'r', 'Schlittenhang');
      return s;
    },
    actors() {
      // Laternen als Figuren, damit Fini dahinter vorbeigehen kann
      return [
        { id: 'laterne0', x: 0, y: 0, z: 594, svg: A.lamp(760, 594, 220) },
        { id: 'laterne1', x: 0, y: 0, z: 600, svg: A.lamp(1098, 600, 210) },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Bären-Apotheke', r: [0, 250, 312, 300], walk: [160, 600],
          look: ['Die Bären-Apotheke. Mit einem roten A, das aussieht, als hätte es Schnupfen.', 'Ich hoffe, die binden einem keinen Bären auf.'],
          use: async () => { await G.say('fini', 'Ich bin nicht krank. Nur aufgeregt. Dagegen gibt es leider keine Tabletten. Nur Schlittenrennen.'); } },
        { name: 'Dreifaltigkeits-Kircherl', r: [326, -20, 338, 380], walk: [495, 600],
          look: ['Das Dreifaltigkeits-Kircherl am Marktplatz. Gebaut 1672 – also quasi brandneu für Grafinger Verhältnisse.', 'Oben auf dem Dach sitzt ein Türmchen mit Zwiebelhaube. Wie ein Sahnehäubchen. Ein heiliges Sahnehäubchen.'] },
        { name: 'Kirchenportal', r: [440, 362, 112, 188], walk: [495, 598], exit: { to: 'kapelle', x: 640, y: 690, face: -1 },
          look: 'Das Portal vom Kircherl. Mit Adventskranz. Sogar die Tür ist hier in Weihnachtsstimmung.' },
        { name: 'Taubenhaus', r: [880, 180, 400, 250], walk: [1050, 600],
          look: ['Ein altes Haus mit einem Taubenschlag unterm Dach.', 'Da oben sitzen Tauben. Eine davon schaut mich an, als würde ich ihr Geld schulden.'] },
        { name: 'Tauben', r: [1010, 190, 100, 60], walk: [1060, 600],
          look: 'Tauben. Die Ninjas der Innenstadt. Sie sehen alles. Sie wissen alles. Sie essen alles.',
          use: async () => { await G.say('fini', 'Gurr? ... Sie antworten nicht. Vielleicht spreche ich den falschen Dialekt.'); } },
        { name: 'Kleine Holztür', r: [920, 432, 72, 122], walk: [960, 590], face: 'r',
          look: () => f('loft_open') ? 'Die kleine Tür zum Taubenschlag. Jetzt offen. Etwa einen Meter hoch. Perfekt für Tauben, Gartenzwerge und mich – wenn ich mich klein mache.'
            : ['Eine winzige Holztür, vielleicht einen Meter hoch. „TAUBEN – Tür zu, bitte!“', 'Mit Vorhängeschloss. Ein ganz schön großes Schloss für eine ganz schön kleine Tür.'],
          use: async () => {
            if (f('loft_open')) { await G.say('fini', 'Kopf einziehen...'); await G.goto('taubenschlag', 200, 680, 1); return; }
            G.flag('door_locked_seen');
            await G.say('fini', 'Abgesperrt. Mit einem Vorhängeschloss so groß wie meine Faust.');
            if (f('met_wimmer')) await G.say('fini', 'Der Rennleiter hat gesagt, den Schlüssel hat der Mesner. Herr Glöckl. Im Kircherl.');
          },
          items: {
            schluessel_taube: async () => {
              await G.say('fini', 'Schlüssel rein, umdrehen... *Klack*! Offen!');
              G.flag('loft_open'); G.take('schluessel_taube');
              G.refresh();
              await G.say('fini', 'Ich lass den Schlüssel im Schloss. Sonst verlier ich ihn. Ich kenn mich.');
              await G.say('fini', 'Kopf einziehen...');
              await G.goto('taubenschlag', 200, 680, 1);
            },
            kaugummi: async () => { await G.say('fini', 'Ich könnte das Schloss mit Kaugummi verkleben. Dann ist es noch zuer. Das ist das Gegenteil von dem, was ich will.'); },
            kufenschluessel: async () => { await G.say('fini', 'Der Kufenschlüssel ist ein Schraubenschlüssel, kein Schlüssel-Schlüssel. Blöde deutsche Sprache.'); },
          } },
        { name: 'Wegweiser', r: [1108, 448, 148, 74], walk: [1180, 595], look: '„Bärenbuckel – Schlittenhang“. Dort ist das Rennen! Und dort wartet mein Ruhm.' },
        { name: 'Zum Café Kreitmampf', r: [0, 420, 48, 300], walk: [42, 640], exit: { to: 'marktplatz', x: 1190, y: 650, face: -1 } },
        { name: 'Zum Schlittenhang am Bärenbuckel', r: [1232, 420, 48, 300], walk: [1238, 640], exit: { to: 'schlittenhang', x: 1160, y: 660, face: -1 } },
      ];
    },
  };
})();
