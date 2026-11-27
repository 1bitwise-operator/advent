/* Szene: Christkindlmarkt – Glühweinbude „Zum glühenden Bären“ */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function bearSign() {
    // Bärenkopf-Schild auf dem Dach
    return `<g transform="translate(640,92)">
      ${A.glow(0, 0, 120, 'gWarm', 0.8)}
      <rect x="-170" y="-28" width="340" height="56" rx="12" fill="#3b2418" stroke="${OL}" stroke-width="4"/>
      <rect x="-162" y="-20" width="324" height="40" rx="8" fill="none" stroke="#ffd36e" stroke-width="2" opacity=".7"/>
      <text x="22" y="10" text-anchor="middle" font-family="Georgia, serif" font-size="27" font-weight="700" fill="#ffd36e">Zum glühenden Bären</text>
      <g transform="translate(-180,-4)">
        <circle cx="-22" cy="-30" r="14" fill="#7a4b2d" stroke="${OL}" stroke-width="3"/><circle cx="22" cy="-30" r="14" fill="#7a4b2d" stroke="${OL}" stroke-width="3"/>
        <circle cx="0" cy="0" r="38" fill="#7a4b2d" stroke="${OL}" stroke-width="3.5"/>
        <ellipse cx="0" cy="14" rx="18" ry="14" fill="#d9a77a" stroke="${OL}" stroke-width="2.5"/>
        <ellipse cx="0" cy="6" rx="7" ry="5" fill="${OL}"/>
        <circle cx="-14" cy="-10" r="4" fill="${OL}"/><circle cx="14" cy="-10" r="4" fill="${OL}"/>
        <ellipse cx="-24" cy="6" rx="7" ry="4" fill="#ff7b7b" opacity=".6"/><ellipse cx="24" cy="6" rx="7" ry="4" fill="#ff7b7b" opacity=".6"/>
        <path d="M-6,20 q6,6 12,0" stroke="${OL}" stroke-width="2.5" fill="none"/>
      </g>
    </g>`;
  }

  function booth(st) {
    let s = '';
    // Rückwand
    s += `<rect x="300" y="150" width="680" height="410" fill="#5a3824" stroke="${OL}" stroke-width="4"/>`;
    for (let i = 0; i < 14; i++) s += `<path d="M${300 + i * 50},150 V560" stroke="${OL}" stroke-width="2" opacity=".3"/>`;
    s += `<rect x="300" y="150" width="680" height="410" fill="url(#gWarm)" opacity=".5"/>`;
    // Regale mit Tassen
    for (const y of [250, 330]) {
      s += `<rect x="340" y="${y}" width="250" height="10" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
      for (let i = 0; i < 7; i++) {
        const mx = 352 + i * 34;
        s += `<path d="M${mx},${y} h22 l-2,-26 q-9,-4 -18,0 Z" fill="${['#b8322b', '#2f6e4a', '#2f6fb5'][(i + y) % 3]}" stroke="${OL}" stroke-width="2"/><path d="M${mx + 21},${y - 20} q8,2 5,9 q-2,4 -6,3" fill="none" stroke="${OL}" stroke-width="2"/>`;
      }
    }
    // Preistafel
    s += `<rect x="640" y="200" width="250" height="160" rx="6" fill="#2b2f2a" stroke="#8a5a36" stroke-width="8"/>`;
    s += A.text(765, 232, 'PREISE', { fs: 18, fill: '#ffd36e' });
    s += A.text(660, 262, 'Glühwein (ab 18) ....... 4,50', { fs: 13, fill: '#fff', anchor: 'start' });
    s += A.text(660, 286, 'Kinderpunsch ............. 3,50', { fs: 13, fill: '#fff', anchor: 'start' });
    s += A.text(660, 310, 'Bärentatzen-Punsch .... 5,00', { fs: 13, fill: '#fff', anchor: 'start' });
    s += A.text(660, 340, 'Tassenpfand: 3 €', { fs: 15, fill: '#9be2ff', anchor: 'start' });
    // Lichterkette innen
    s += A.lights(310, 172, 970, 172, 14, 20, 44);
    // Steckdose + Kabel
    s += `<rect x="928" y="400" width="26" height="30" rx="4" fill="#f4f4f4" stroke="${OL}" stroke-width="2.5"/><circle cx="936" cy="415" r="2.5" fill="${OL}"/><circle cx="946" cy="415" r="2.5" fill="${OL}"/>`;
    s += `<rect x="934" y="424" width="14" height="12" rx="3" fill="#ff8a00" stroke="${OL}" stroke-width="2"/>`;
    // Pfosten & Dach
    s += `<rect x="282" y="140" width="28" height="440" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/><rect x="970" y="140" width="28" height="440" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<path d="M230,160 L640,40 L1050,160 L1050,182 L230,182 Z" fill="#8c3b2c" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`;
    for (let i = 0; i < 16; i++) s += `<path d="M${240 + i * 51},182 v-14" stroke="${OL}" stroke-width="2" opacity=".4"/>`;
    s += A.snowLine('M236,156 L640,40 L1044,156', 14);
    s += `<path d="M232,182 H1048" stroke="#fff" stroke-width="7"/><path d="M240,182 q10,14 20,0 q10,18 20,0 q10,10 20,0 M960,182 q10,16 20,0 q10,10 20,0 q10,14 20,0" fill="#fff" stroke="${OL}" stroke-width="2"/>`;
    // Tannengirlande
    s += `<path d="M300,192 Q470,226 640,192 Q810,226 980,192" fill="none" stroke="#2f6e4a" stroke-width="16" stroke-linecap="round"/><path d="M300,192 Q470,226 640,192 Q810,226 980,192" fill="none" stroke="#3f9a62" stroke-width="6" stroke-dasharray="4 6"/>`;
    for (const x of [380, 520, 640, 760, 900]) s += `<circle cx="${x}" cy="${x === 640 ? 194 : 206}" r="7" fill="#d63a3a" stroke="${OL}" stroke-width="2"/>`;
    s += bearSign();
    return s;
  }

  function counter(st) {
    let s = '';
    // Theke (vor Gerti)
    s += `<rect x="296" y="470" width="688" height="18" rx="4" fill="#b98556" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="306" y="488" width="668" height="76" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/>`;
    for (let i = 1; i < 12; i++) s += `<path d="M${306 + i * 55.6},488 V564" stroke="${OL}" stroke-width="1.8" opacity=".4"/>`;
    s += `<path d="M330,500 q20,24 40,0 q20,24 40,0 q20,24 40,0" fill="none" stroke="#2f6e4a" stroke-width="10" stroke-linecap="round"/>`;
    // Zimtglas
    s += `<rect x="404" y="420" width="44" height="52" rx="6" fill="#dff0ff" fill-opacity=".55" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${410 + i * 7}" y="${404 + (i % 2) * 6}" width="6" height="60" rx="3" fill="#9a5a2e" stroke="${OL}" stroke-width="1.5" transform="rotate(${(i - 2) * 5} ${413 + i * 7} 460)"/>`;
    s += `<rect x="400" y="414" width="52" height="10" rx="3" fill="#c0392b" stroke="${OL}" stroke-width="2"/>`;
    s += A.text(426, 446, 'ZIMT', { fs: 10, fill: '#6b2a20' });
    // Glühweinkessel mit Hahn
    s += `<ellipse cx="790" cy="470" rx="64" ry="10" fill="#6b4128" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M730,470 V384 Q790,368 850,384 V470 Q790,482 730,470 Z" fill="#c8743c" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<path d="M730,408 Q790,394 850,408 M730,446 Q790,432 850,446" stroke="#8a4a22" stroke-width="5" fill="none"/>`;
    s += `<ellipse cx="790" cy="384" rx="60" ry="10" fill="#5b1f2a" stroke="${OL}" stroke-width="3"/>`;
    s += `<path class="steam" d="M770,370 q-10,-16 0,-30 q10,-14 0,-28" stroke="#fff" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;
    s += `<path class="steam s2" d="M800,372 q-10,-16 0,-30 q10,-14 0,-28" stroke="#fff" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;
    s += `<path class="steam s3" d="M826,374 q-10,-16 0,-30" stroke="#fff" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;
    s += A.text(790, 430, 'HEISS!', { fs: 12, fill: '#fff3c4' });
    // Hahn
    s += `<rect x="712" y="436" width="22" height="12" rx="3" fill="#c9a227" stroke="${OL}" stroke-width="2.5"/><path d="M714,448 v10" stroke="${OL}" stroke-width="5"/><path d="M714,448 v10" stroke="#c9a227" stroke-width="2.5"/>`;
    if (f('tap_fixed')) s += `<ellipse cx="714" cy="460" rx="7" ry="5" fill="#ff9ec4" stroke="${OL}" stroke-width="2"/><path d="M709,458 l3,2 M716,457 l2,3" stroke="#fff" stroke-width="1.5"/>`;
    else s += `<ellipse class="steam" cx="714" cy="466" rx="3" ry="4" fill="#7a1f2a" opacity=".9"/>`;
    // Tassen auf der Theke
    for (const [x, c] of [[560, '#2f6fb5'], [596, '#b8322b'], [900, '#2f6e4a']]) s += `<path d="M${x},468 h20 l-2,-22 q-8,-4 -16,0 Z" fill="${c}" stroke="${OL}" stroke-width="2"/>`;
    return s;
  }

  function sideBooths() {
    let s = '';
    s += A.booth(-40, 520, 210, 150, { label: 'Lebkuchen-Herzen', roof: '#2f6e4a', seed: 61 });
    s += A.booth(1100, 520, 220, 150, { label: 'Kräuterhexe', roof: '#7b3fa0', seed: 62 });
    const r = A.rng(5);
    const coats = ['#3f6fb5', '#7b3fa0', '#2f6e4a', '#b8322b', '#5b4a3a', '#e8663d'];
    for (let i = 0; i < 6; i++) s += A.crowdPerson(30 + r() * 230, 566 + r() * 6, 0.62 + r() * 0.1, coats[i], coats[(i + 2) % 6]);
    for (let i = 0; i < 5; i++) s += A.crowdPerson(1050 + r() * 200, 566 + r() * 6, 0.62 + r() * 0.1, coats[(i + 1) % 6], coats[(i + 4) % 6]);
    return s;
  }

  async function gertiTalk() {
    if (!f('met_gerti')) {
      G.flag('met_gerti');
      await G.say('gerti', 'Servus, Schatzerl! Glühwein gibt’s erst ab achtzehn – aber an Kinderpunsch hätt i!');
      await G.say('fini', 'Hallo, Gerti! Warum halten Sie einen Schraubenschlüssel an den Hahn?');
      await G.say('gerti', 'Weil der Hahn tropft, Madl! Seit drei Stund’ steh i so da. I spür mei Hand nimmer.');
      await G.say('gerti', 'Jeder Tropfen is a verlorener Euro. Und an Bärentatzen-Punsch verschütt’ ma ned. Des is Sünde.');
      G.flag('gerti_tap');
    }
    await G.talk('gerti', () => [
      { t: 'Haben Sie zufällig meinen Schlitten gesehen? Rot, mit einem Blitz drauf?', if: !f('met_gustl'),
        run: async () => {
          await G.say('gerti', 'Dei Schlitten? Mei, Madl. I hab heut scho drei Handschuh, a Gebiss und an Dackel g’funden.');
          await G.say('gerti', 'Den Dackel hab i z’ruckgeben. Des Gebiss ned, des hat koaner abg’holt.');
          await G.say('gerti', 'Frag doch mal die Resi im Kreitmampf. Die woaß alles, was in Grafing passiert. Meistens schon, bevor’s passiert.');
        } },
      { t: 'Der Schraubenschlüssel... gehört der zufällig dem Gustl?', if: f('met_gustl') && !f('tap_fixed'),
        run: async () => {
          await G.say('gerti', 'Freilich! Des is dem Gustl sei Kufenschlüssel. Hat er ma g’liehen, im Oktober.');
          await G.say('fini', 'Den bräucht er aber zurück. Für MEINEN Schlitten. Für das RENNEN.');
          await G.say('gerti', 'Und i bräucht an Hahn, der dicht is. Wenn i loslass, tropft’s.');
          await G.say('gerti', 'Bring ma was, des des Loch stopft – dann kriagst’n. Ehrenwort von der Gerti.');
          G.flag('gerti_deal');
        } },
      { t: 'Kann ich eine Zimtstange haben?', if: !has('zimt') && !f('gave_zimt'),
        run: async () => {
          await G.say('gerti', 'Nimm da oane aus’m Glasl, Schatzerl. Die san eh bloß zum Anschaun. Und zum Rumrühren. Und zum Anschaun.');
        } },
      { t: 'Wohin führt eigentlich das lange orange Kabel?', if: f('cable_seen') || f('cheat_suspected'),
        run: async () => {
          await G.say('gerti', 'Des? Da hat mi der Protzinger-Bua g’fragt, ob er sei „Handy“ laden derf.');
          await G.say('gerti', 'Des Kabel geht bis naus zum Bärenbuckel. Achthundert Meter. Für a Handy.');
          await G.say('fini', 'Was für ein Handy braucht achthundert Meter Kabel?!');
          await G.say('gerti', 'A großes, vermutlich. Die Jugend heut...');
          G.flag('cable_known');
          if (f('cheat_suspected') && !has('prospekt') && !f('cheat_exposed')) await G.say('fini', 'Das ist kein Handy. Aber für den Wimmer brauch ich was Schriftliches. Irgendeinen Beweis...');
        } },
      { t: 'Warum heißt die Bude „Zum glühenden Bären“?', once: 'asked_bear',
        run: async () => {
          await G.say('gerti', 'Wegen’m Grafinger Wappen, Madl! Da is a Bär drauf.');
          await G.say('gerti', 'Und weil mei Mann nach drei Glühwein ausschaut wie a glühender Bär. Brummt auch so.');
        } },
      { t: 'Wissen Sie was über das Schlittenrennen?', once: 'asked_gerti_race',
        run: async () => {
          await G.say('gerti', 'Des Kufen-Gaudi? Der Wimmer Schorsch is Rennleiter. Der kennt die Satzung auswendig. Von 1953!');
          await G.say('gerti', 'Letztes Jahr hat er an Buam disqualifiziert, weil sei Mütze ned „ortsüblich“ war.');
          await G.say('fini', 'Was ist eine ortsübliche Mütze?');
          await G.say('gerti', 'Des woaß bloß der Wimmer. Und der verrät’s ned.');
        } },
      { t: 'Tschüss, Gerti!', end: true, run: async () => { await G.say('gerti', 'Pfiat di, Schatzerl! Und ned zu schnell fahren! ...Doch. Schnell fahren!'); } },
    ]);
  }

  const gertiItems = {
    kaugummi: async () => {
      if (f('tap_fixed')) return;
      await G.say('fini', 'Darf ich mal? Ich hab da was. Es ist... gebraucht.');
      await G.say('fini', '*kau* *kau* *schmatz*... Und rein damit in den Hahn!');
      G.flag('tap_fixed'); G.take('kaugummi');
      G.setActor('gerti', { svg: C.gerti({ relaxed: true }) });
      G.refresh();
      await G.wait(400);
      await G.say('gerti', 'Ja Kruzitürken! Es tropft nimmer!');
      await G.say('gerti', 'Madl, du bist a Genie! A grausigs Genie, aber a Genie!');
      await G.say('gerti', 'Da, nimm dem Gustl sei Schlüssel mit. Und sag eahm an schöna Gruß. Und dass’d Hahn jetzt nach Minze schmeckt.');
      G.give('kufenschluessel');
      await G.say('fini', 'Mein Kaugummi. Er hat sein Leben für die gute Sache gegeben. Ich werde ihn nie vergessen. Wahrscheinlich bis morgen.');
    },
    tasse: async () => {
      await G.say('fini', 'Ich hab eine Tasse gefunden! Pfand-Rettung!');
      await G.say('gerti', 'A Tass’n vom Christkindlmarkt! Pfand san drei Euro, bittschön.');
      G.take('tasse'); G.give('geld'); G.flag('tasse_returned');
      await G.say('fini', 'Drei Euro! Ich bin reich! ...Für meine Verhältnisse.');
    },
    geld: async () => {
      await G.say('gerti', 'Magst an Kinderpunsch, Schatzerl?');
      await G.say('fini', 'Lieber nicht. Das Geld brauch ich für... was Wichtiges. Ich weiß nur gerade nicht mehr, was.');
    },
    prospekt: async () => {
      await G.say('gerti', 'A Schlitten mit Motor? Na, so was. Damit gehst zum Wimmer, Madl. Der kennt die Regeln.');
    },
    kufenschluessel: async () => { await G.say('gerti', 'Na, na, den behalt’st jetzt! Den bringst dem Gustl!'); },
    zimt: async () => { await G.say('gerti', 'Die Zimtstang’ darfst behalten, Schatzerl. Gschenkt.'); },
    '*': async () => { await G.say('gerti', 'Was soll i denn damit, Madl? I hab scho a Gebiss und drei Handschuh.'); },
  };

  G.scenes.gluehwein = {
    title: 'Christkindlmarkt – Glühweinbude „Zum glühenden Bären“',
    outdoor: true,
    snowDensity: 0.7,
    walk: { x1: 60, x2: 1230, y1: 596, y2: 702, s1: 0.66, s2: 0.78 },
    entry: { x: 1150, y: 650 },
    draw(st) {
      let s = A.defs();
      s += A.sky('skyGW', [[0, '#1d2550'], [0.5, '#46437e'], [1, '#a96c92']]);
      s += A.stars(40, 41, 160);
      s += A.xmasTree(1150, 400, 320, 3);
      s += A.xmasTree(130, 380, 280, 4);
      s += A.lights(0, 120, 300, 150, 30, 10, 51) + A.lights(980, 150, 1280, 120, 30, 10, 52);
      s += A.snowGround(560, 9);
      s += sideBooths();
      s += booth(st);
      // Kabel über den Boden nach rechts
      s += `<path d="M941,434 Q960,520 990,590 Q1060,640 1180,610 Q1240,596 1290,620" fill="none" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M941,434 Q960,520 990,590 Q1060,640 1180,610 Q1240,596 1290,620" fill="none" stroke="#ff8a00" stroke-width="4" stroke-linecap="round"/>`;
      // Stehtisch
      s += `<path d="M150,640 V700 M120,702 H180" stroke="${OL}" stroke-width="7"/><path d="M150,640 V700 M120,702 H180" stroke="#6b4128" stroke-width="4"/><ellipse cx="150" cy="636" rx="50" ry="10" fill="#a8744a" stroke="${OL}" stroke-width="3"/><path d="M110,632 q40,-8 80,0" stroke="#fff" stroke-width="5" fill="none"/>`;
      s += A.exitArrow(1254, 640, 'r', 'Zurück zum Marktplatz');
      return s;
    },
    actors(st) {
      return [
        { id: 'gerti', x: 640, y: 548, svg: C.gerti({ relaxed: f('tap_fixed') }), head: -300, s: 1.0 },
        { id: 'theke', x: 0, y: 0, z: 566, svg: counter(st) },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Preistafel', r: [636, 196, 258, 168], walk: [760, 610], look: () => [
          'Glühwein 4,50. Kinderpunsch 3,50. Bärentatzen-Punsch 5 Euro.', 'Was ist in einem Bärentatzen-Punsch? Ich will es wissen. Und gleichzeitig will ich es nicht wissen.',
          'Und: „Tassenpfand 3 €“. Gut zu wissen.'] },
        { name: 'Tassenregal', r: [336, 214, 260, 130], walk: [470, 610], look: 'Lauter Tassen. Rot, grün, blau. Gerti hat mehr Tassen als ich Socken. Und ich hab viele Socken. Einzelne.' },
        { name: 'Bärenschild', r: [440, 50, 400, 90], walk: [640, 610], look: '„Zum glühenden Bären“. Ein Bär, der glüht. Ich hoffe, das ist nur Werbung.' },
        { name: 'Zimtglas', r: [396, 398, 62, 76], walk: [430, 612],
          look: 'Ein Glas voller Zimtstangen. Es duftet nach Weihnachten. Und ein bisschen nach Gertis Strickmütze.',
          use: async () => {
            if (has('zimt') || f('gave_zimt')) { await G.say('fini', 'Eine Zimtstange reicht. Ich will Gerti nicht ausrauben. Nur ein kleines bisschen.'); return; }
            await G.say('fini', 'Gerti, darf ich mir eine Zimtstange nehmen?');
            await G.say('gerti', 'Freilich, Schatzerl! Nimm da oane.');
            G.give('zimt');
            await G.say('fini', 'Riecht nach Weihnachten. Und nach Sieg. Hoffentlich.');
          } },
        { name: 'Glühweinkessel', r: [728, 364, 126, 112], walk: [760, 612],
          look: () => f('tap_fixed') ? 'Der Kessel. Mit Kaugummi-Verschluss. Patentiert von mir. Nicht wirklich patentiert.' : ['Ein riesiger Kessel mit heißem Glühwein.', 'Der Hahn tropft. Gerti hält mit einem Schraubenschlüssel dagegen. Seit drei Stunden. Respekt.'],
          use: async () => { await G.say('fini', f('tap_fixed') ? 'Der Hahn ist dicht. Gute Arbeit, Fini.' : 'Ich könnte das Loch im Hahn stopfen. Aber womit? Mit meinem Finger? Der würde gekocht.'); },
          items: { kaugummi: gertiItems.kaugummi, '*': async () => { await G.say('fini', 'Damit stopf ich den Hahn bestimmt nicht.'); } } },
        { name: 'Wasserhahn am Kessel', r: [700, 430, 40, 40], walk: [740, 612],
          look: () => f('tap_fixed') ? 'Ein Hahn mit Kaugummi drin. Er hält. Kaugummi hält immer. Das ist das Problem mit Kaugummi.' : 'Tropf. Tropf. Tropf. Wie eine Uhr. Eine klebrige, nach Nelken riechende Uhr.',
          items: { kaugummi: gertiItems.kaugummi } },
        { name: 'Orangefarbenes Kabel', r: [926, 396, 40, 50], walk: [990, 630],
          look: async () => {
            G.flag('cable_seen');
            await G.say('fini', 'Ein Verlängerungskabel. Es steckt in Gertis Steckdose und läuft über den ganzen Markt...');
            await G.say('fini', '...Richtung Bärenbuckel. Wer braucht denn so ein langes Kabel?');
          } },
        { name: 'Langes Kabel', p: [990, 580, 1180, 596, 1280, 610, 1280, 640, 1180, 626, 990, 610], walk: [1100, 640],
          look: async () => {
            G.flag('cable_seen');
            await G.say('fini', 'Das Kabel führt raus aus dem Markt. Richtung Schlittenhang. Das ist doch kein Zufall. Das ist... ein Kabel.');
          },
          use: async () => { await G.say('fini', 'Rausziehen? Nein, dann krieg ich Ärger mit Gerti. Und das Kabel ist ja kein Beweis für irgendwas. Noch nicht.'); } },
        { name: 'Stehtisch', r: [96, 622, 110, 84], walk: [210, 660], look: 'Ein Stehtisch. Für Leute, die beim Glühwein lieber stehen. Oder nicht mehr sitzen können.' },
        { name: 'Lebkuchen-Bude', r: [-40, 370, 250, 170], walk: [140, 620], look: '„I mog di“, „Schatzi“, „Grafing 4ever“. Lebkuchenherzen mit Botschaften. Ich hätte gern eins mit „Kufenkönigin“.' },
        { name: 'Kräuterhexe', r: [1090, 370, 190, 170], walk: [1150, 620], look: 'Ein Stand mit Kräutern und Tees. „Gegen alles, was man hat. Und gegen alles, was man nicht hat.“ Klingt nach Vergesslichkeits-Tee. Brauch ich.' },
        { name: 'Glühwein-Gerti', r: [580, 250, 130, 230], walk: [510, 625], face: 'r',
          look: () => f('tap_fixed') ? 'Glühwein-Gerti. Entspannt, glücklich, mit beiden Händen frei. Ich hab einen Menschen befreit!' : 'Glühwein-Gerti. Mit Bärenmütze. Sie hält mit einer Hand einen Schraubenschlüssel an den Hahn. Sie sieht müde aus. Und tapfer.',
          use: gertiTalk,
          items: gertiItems },
        { name: 'Zurück zum Marktplatz', r: [1232, 420, 48, 300], walk: [1238, 650], exit: { to: 'marktplatz', x: 70, y: 645, face: 1 } },
      ];
    },
  };
})();
