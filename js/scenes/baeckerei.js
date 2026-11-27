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

  function room() {
    let s = A.defs();
    // Wände
    s += `<rect x="0" y="0" width="1280" height="720" fill="#efe4cf"/>`;
    // Decke mit Lichtschiene
    s += `<path d="M0,0 H1280 V60 L1100,90 H180 L0,60 Z" fill="#f7f1e4" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M260,96 H1060" stroke="#9aa3ad" stroke-width="8"/><path d="M260,96 H1060" stroke="${OL}" stroke-width="2" opacity=".5"/>`;
    for (let i = 0; i < 7; i++) {
      const x = 300 + i * 120;
      s += `<path d="M${x},96 V112" stroke="#9aa3ad" stroke-width="4"/><path d="M${x - 10},112 h20 l-4,16 h-12 Z" fill="#c9ced8" stroke="${OL}" stroke-width="2"/>`;
      s += `<path d="M${x - 6},128 L${x - 60},420 L${x + 60},420 L${x + 6},128 Z" fill="#fff6d0" opacity=".12"/>`;
    }
    for (const x of [640]) s += `<path d="M${x - 260},60 L${x - 230},96 M${x + 260},60 L${x + 230},96" stroke="#9aa3ad" stroke-width="2"/>`;
    // Holzregalwand
    s += `<rect x="230" y="130" width="820" height="320" fill="#d9b483" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="420" y="130" width="440" height="320" fill="#33413a" stroke="${OL}" stroke-width="3"/>`;
    for (const x of [230, 420, 860, 1050]) s += `<rect x="${x - 8}" y="130" width="16" height="320" fill="#c49a66" stroke="${OL}" stroke-width="2.5"/>`;
    // Kreidetafeln oben
    s += `<rect x="440" y="140" width="400" height="36" fill="#2b2f2a" stroke="${OL}" stroke-width="2"/>`;
    s += A.text(640, 166, 'Handwerk · Tradition · Liebe zum Detail', { fs: 17, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive' });
    // Regalböden mit Brot
    const kinds = ['laib', 'korn', 'hell', 'laib', 'korn', 'hell', 'laib'];
    [215, 290, 365].forEach((y, row) => {
      s += `<rect x="430" y="${y + 18}" width="420" height="10" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
      for (let i = 0; i < 6; i++) s += bread(470 + i * 68, y, kinds[(i + row) % kinds.length], 0.95);
      for (let i = 0; i < 3; i++) s += `<rect x="${470 + i * 140}" y="${y + 30}" width="54" height="24" fill="#1d201c" stroke="#fff" stroke-width="1"/>` + A.text(497 + i * 140, y + 46, ['Dinkel', 'Bauern', 'Roggen'][(i + row) % 3], { fs: 10, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive' });
    });
    // Seitenregale mit Brezn & Körben
    [[250, 230], [250, 330], [870, 230], [870, 330]].forEach(([x, y], i) => {
      s += `<rect x="${x}" y="${y + 18}" width="160" height="9" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
      if (i % 2 === 0) { s += bread(x + 40, y, 'brezn') + bread(x + 100, y, 'brezn') + bread(x + 140, y + 2, 'brezn', 0.8); }
      else { s += `<path d="M${x + 20},${y + 18} q60,-50 120,0 Z" fill="#c8a46a" stroke="${OL}" stroke-width="2.5"/><path d="M${x + 30},${y + 8} h100 M${x + 40},${y - 2} h80" stroke="${OL}" stroke-width="1.5" opacity=".4"/>`; }
    });
    // Kranz an der Wand
    s += A.wreath(640, 108, 22);
    // Fenster rechts mit Schnee
    s += `<rect x="1100" y="120" width="160" height="330" fill="#3d4d7a" stroke="${OL}" stroke-width="4"/>`;
    s += `<rect x="1100" y="120" width="160" height="330" fill="url(#gCool)"/>`;
    s += `<path d="M1180,120 V450 M1100,285 H1260" stroke="#f7f1e4" stroke-width="7"/>`;
    s += `<path d="M1100,420 q40,-18 80,0 q40,-14 80,0 V450 H1100 Z" fill="#fff" stroke="${OL}" stroke-width="2"/>`;
    for (let i = 0; i < 18; i++) s += `<circle cx="${1110 + (i * 37) % 140}" cy="${140 + (i * 53) % 260}" r="${1.5 + (i % 3)}" fill="#fff" opacity=".8"/>`;
    s += `<path d="M1112,210 q20,-30 50,-10 q10,-16 30,-6 q20,-4 22,16 Z" fill="#e8c35a" opacity=".25"/>`;
    // Tür links (Ausgang)
    s += `<rect x="20" y="210" width="130" height="380" fill="#d9c8a8" stroke="${OL}" stroke-width="4"/>`;
    s += `<rect x="36" y="226" width="98" height="210" fill="#3d4d7a" stroke="${OL}" stroke-width="3"/><path d="M36,410 q50,-20 98,0 V436 H36 Z" fill="#fff"/>`;
    s += A.text(85, 300, 'ZIEHEN', { fs: 13, fill: '#fff' });
    s += `<rect x="120" y="440" width="10" height="70" rx="4" fill="#c9ced8" stroke="${OL}" stroke-width="2"/>`;
    // Kreidetafel Frühstück
    s += `<rect x="160" y="150" width="62" height="270" fill="#2b2f2a" stroke="${OL}" stroke-width="3"/>`;
    s += A.text(191, 180, 'Früh-', { fs: 14, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive' }) + A.text(191, 198, 'stück', { fs: 14, fill: '#fff', font: 'Segoe Print, Comic Sans MS, cursive' });
    ['Kaffee', 'Kakao', 'Brezn', 'Krapfen', 'Semmel', 'Weißwurst'].forEach((t, i) => { s += A.text(191, 232 + i * 28, t, { fs: 10, fill: '#ffe7b8', font: 'Segoe Print, Comic Sans MS, cursive' }); });
    // Samowar
    s += `<g transform="translate(1000,0)">
      <rect x="-30" y="300" width="60" height="140" rx="12" fill="#b07a3a" stroke="${OL}" stroke-width="3.5"/>
      <path d="M-30,330 H30 M-30,400 H30" stroke="#7a4a22" stroke-width="4"/>
      <path d="M-20,300 Q0,260 20,300 Z" fill="#b07a3a" stroke="${OL}" stroke-width="3"/><circle cx="0" cy="262" r="8" fill="#c9a227" stroke="${OL}" stroke-width="2.5"/>
      <path d="M30,380 h16 v10" stroke="${OL}" stroke-width="5" fill="none"/><path d="M30,380 h16 v10" stroke="#c9a227" stroke-width="2.5" fill="none"/>
      <path d="M-24,310 q10,-6 16,10 V420 q-8,6 -16,0 Z" fill="#fff" opacity=".25"/>
      <path class="steam" d="M0,250 q-8,-14 0,-26" stroke="#fff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>
    </g>`;
    // Boden
    s += A.woodFloor(575, '#a58866', '#8f7354');
    s += `<rect x="0" y="575" width="1280" height="8" fill="#000" opacity=".1"/>`;
    s += A.vignette(0.35);
    return s;
  }

  function counter(st) {
    let s = '';
    // Glasvitrine
    s += `<rect x="230" y="426" width="840" height="14" rx="3" fill="#c9ced8" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M236,440 H1064 L1080,520 H220 Z" fill="#e9f4ff" fill-opacity=".35" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="228" y="468" width="844" height="8" fill="#9aa3ad" stroke="${OL}" stroke-width="2"/>`;
    // Gebäck in der Vitrine
    const row1 = ['krapfen', 'krapfen', 'kipferl', 'kipferl', 'schnecke', 'schnecke', 'torte', 'torte', 'krapfen', 'kipferl', 'schnecke', 'brezn'];
    row1.forEach((k, i) => { s += bread(270 + i * 66, 458, k, 0.85); });
    const row2 = ['brezn', 'brezn', 'schnecke', 'krapfen', 'torte', 'kipferl', 'brezn', 'krapfen', 'schnecke', 'torte', 'kipferl', 'brezn'];
    row2.forEach((k, i) => { s += bread(262 + i * 68, 500, k, 0.9); });
    s += `<path d="M260,446 l40,60 M700,446 l40,60" stroke="#fff" stroke-width="5" opacity=".35"/>`;
    // Preisschilder
    [['Krapfen', '1,80'], ['Vanillekipferl', '0,60'], ['Nussschnecke', '2,10'], ['Brezn', '1,10']].forEach(([t, p], i) => {
      s += `<rect x="${290 + i * 200}" y="520" width="96" height="26" fill="#1d201c" stroke="${OL}" stroke-width="1.5"/>` + A.text(338 + i * 200, 532, t, { fs: 9, fill: '#fff' }) + A.text(338 + i * 200, 543, '€ ' + p, { fs: 9, fill: '#ffd36e' });
    });
    // Holzfront
    s += `<rect x="216" y="520" width="868" height="66" fill="#c49a66" stroke="${OL}" stroke-width="3.5"/>`;
    for (let i = 1; i < 10; i++) s += `<path d="M${216 + i * 86.8},520 V586" stroke="${OL}" stroke-width="1.5" opacity=".3"/>`;
    // Kasse
    s += `<rect x="840" y="368" width="110" height="60" rx="8" fill="#2f3440" stroke="${OL}" stroke-width="3"/><rect x="856" y="378" width="60" height="18" rx="3" fill="#7cf0a0" stroke="${OL}" stroke-width="2"/>` + A.text(886, 392, '13,37', { fs: 11, fill: '#1d201c', font: 'Courier New, monospace' });
    // Lebkuchen-Bruch-Teller
    if (!f('got_lebkuchen')) {
      s += `<ellipse cx="330" cy="424" rx="52" ry="10" fill="#fff" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<g transform="translate(316,420) scale(0.42)"><path d="M0,-80 a14,14 0 1 1 -0.1,0 Z M-16,-56 H16 L36,-46 L33,-34 L16,-40 L18,-14 L12,0 L2,0 L0,-12 L-8,-12 L-14,-32 L-32,-32 L-32,-44 Z" fill="#b86a35" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/></g>`;
      s += `<path d="M346,418 l10,-6 l6,4 l-4,6 Z M360,420 l8,-2 l2,6 Z" fill="#b86a35" stroke="${OL}" stroke-width="2"/>`;
      s += `<rect x="356" y="384" width="60" height="22" fill="#fffaf0" stroke="${OL}" stroke-width="1.5" transform="rotate(6 386 395)"/>` + A.text(386, 399, 'BRUCH', { fs: 11, fill: '#c0392b', rot: 6 });
    }
    // Brösel-Schublade
    s += `<rect x="600" y="540" width="100" height="30" rx="3" fill="#b0875a" stroke="${OL}" stroke-width="2.5"/><rect x="636" y="552" width="28" height="6" rx="3" fill="#7a5233" stroke="${OL}" stroke-width="1.5"/>`;
    return s;
  }

  function cafeTable() {
    return `${A.shadow(0, 0, 70)}
      <path d="M0,-90 V0 M-34,0 H34" stroke="${OL}" stroke-width="8"/><path d="M0,-90 V0 M-34,0 H34" stroke="#5a4a3a" stroke-width="4"/>
      <ellipse cx="0" cy="-94" rx="62" ry="13" fill="#2a2a2a" stroke="${OL}" stroke-width="3"/>
      <path d="M-20,-104 h18 l-2,-12 h-14 Z" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M-3,-112 q6,0 4,6" fill="none" stroke="${OL}" stroke-width="2"/>
      <path class="steam" d="M-12,-122 q-6,-10 0,-20" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>
      <ellipse cx="22" cy="-104" rx="16" ry="4" fill="#fff" stroke="${OL}" stroke-width="2"/>${bread(22, -110, 'krapfen', 0.7)}
      <path d="M70,-60 V0 M70,-60 H110 V0 M70,-30 H110 M110,-60 V-120" stroke="${OL}" stroke-width="7" fill="none"/><path d="M70,-60 V0 M70,-60 H110 V0 M70,-30 H110 M110,-60 V-120" stroke="#8a5a36" stroke-width="3.5" fill="none"/>`;
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
    walk: { x1: 170, x2: 1160, y1: 612, y2: 704, s1: 0.74, s2: 0.84 },
    entry: { x: 200, y: 660 },
    draw: room,
    actors(st) {
      return [
        { id: 'resi', x: 640, y: 545, svg: C.resi(), head: -300 },
        { id: 'theke', x: 0, y: 0, z: 590, svg: counter(st) },
        { id: 'tisch', x: 1150, y: 706, svg: cafeTable() },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Brotregal', r: [430, 190, 420, 230], walk: [640, 620], look: ['Dinkel, Bauernbrot, Roggen. Mit Kreidetafeln wie im Museum.', 'Die Brote sehen so gemütlich aus. Wie kleine, knusprige Sofas.'] },
        { name: 'Brezn-Regal', r: [250, 200, 165, 150], walk: [330, 620], look: 'Brezn. Das bayerische Knoten-Gebäck. Wer es erfunden hat, hatte entweder Hunger oder Langeweile. Oder beides.' },
        { name: 'Brezn-Regal', r: [866, 200, 168, 150], walk: [950, 620], look: 'Noch mehr Brezn. Hier ist der Brezn-Bedarf von ganz Grafing gedeckt. Bis morgen früh.' },
        { name: 'Kreidetafel', r: [156, 146, 70, 280], walk: [250, 640], look: '„Frühstück: Kaffee, Kakao, Brezn, Krapfen, Semmel, Weißwurst.“ Weißwurst zum Frühstück. Nur in Bayern ist das ein Grundrecht.' },
        { name: 'Kupfer-Samowar', r: [966, 250, 76, 190], walk: [1000, 620], look: ['Ein riesiger Kupferkessel. Sieht aus wie eine Rakete aus dem 19. Jahrhundert.', 'Wenn ich da Kaffee rauszapfe, bin ich wahrscheinlich bis Ostern wach.'] },
        { name: 'Fenster', r: [1100, 120, 160, 330], walk: [1120, 640], look: 'Draußen schneit es. Perfektes Schlittenwetter. Wenn ich nur einen Schlitten hätte. Und eine Anmeldung. Und einen Plan.' },
        { name: 'Lichtschiene', r: [260, 88, 800, 46], walk: [640, 640], look: 'Strahler, die das Gebäck ins rechte Licht rücken. Ein Krapfen sollte immer gut ausgeleuchtet sein.' },
        { name: 'Vitrine mit Gebäck', r: [230, 438, 850, 82], walk: [560, 620],
          look: ['Krapfen, Vanillekipferl, Nussschnecken, Torten...', 'Ich muss mich konzentrieren. Konzentrieren! ...Wie viel kostet ein Krapfen?'],
          use: async () => { await G.say('fini', 'Ohne Bezahlung einfach was rausnehmen? Bei der Resi? Die erzählt das dann ganz Grafing. In drei Versionen.'); } },
        !f('got_lebkuchen') && { name: 'Teller mit Bruchware', r: [276, 380, 150, 54], walk: [340, 620],
          look: ['Ein Teller mit kaputten Lebkuchen. „BRUCH“.', 'Ein Lebkuchenmann hat nur ein Bein. Er schaut trotzdem tapfer. Ein Vorbild.'],
          use: async () => {
            if (!f('ohmeier_wants')) { await G.say('fini', 'Einfach nehmen? Nee. Und wozu bräuchte ich einen einbeinigen Lebkuchenmann? ...Außer als Freund.'); return; }
            await G.say('fini', 'Resi, darf ich den einbeinigen Lebkuchenmann haben? Für Frau Ohmeiers Schaufenster!');
            await G.say('resi', 'Den Bruch? Für die Ohmeier? Mei, nimm’n mit! Der hat eh scho g’nug mitg’macht.');
            G.flag('got_lebkuchen'); G.give('lebkuchen');
          } },
        { name: 'Kasse', r: [836, 364, 118, 66], walk: [890, 620], look: 'Die Kasse zeigt 13,37. Irgendwer hier ist ein Nerd. Ich tippe auf die Kasse.' },
        { name: 'Schublade', r: [596, 536, 108, 38], walk: [650, 625], look: 'Eine Schublade. Von Resis Seite aus. Da hebt sie bestimmt Sachen auf. Brösel. Geheimnisse. Brösel-Geheimnisse.' },
        { name: 'Café-Tisch', r: [1080, 590, 200, 120], walk: [1050, 690], look: 'Ein Café-Tisch mit einem halben Krapfen. Jemand hat ihn liegen lassen. Wer lässt einen halben Krapfen liegen?! Ein Monster.',
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
        { name: 'Zum Marktplatz', r: [20, 210, 130, 380], walk: [180, 650], exit: { to: 'marktplatz', x: 640, y: 590, face: 1 } },
      ];
    },
  };
})();
