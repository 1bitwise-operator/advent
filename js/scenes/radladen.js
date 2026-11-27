/* Szene: Die stillgelegte Radlwerkstatt über dem Fairkehrt-Laden */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function bike(x, y, s, c) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M0,-60 V-30" stroke="${OL}" stroke-width="3"/>
      <circle cx="-50" cy="0" r="34" fill="none" stroke="${OL}" stroke-width="6"/><circle cx="-50" cy="0" r="34" fill="none" stroke="#3a3a3a" stroke-width="3"/>
      <circle cx="50" cy="0" r="34" fill="none" stroke="${OL}" stroke-width="6"/><circle cx="50" cy="0" r="34" fill="none" stroke="#3a3a3a" stroke-width="3"/>
      <path d="M-50,0 L-12,-2 L18,-36 L-26,-36 Z M-12,-2 L-26,-44 M18,-36 L50,0 M18,-36 L22,-52 M14,-54 h16" fill="none" stroke="${OL}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-50,0 L-12,-2 L18,-36 L-26,-36 Z M-12,-2 L-26,-44 M18,-36 L50,0 M18,-36 L22,-52 M14,-54 h16" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M-34,-48 h18" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M-50,0 l${(Math.cos(i * 0.8) * 32).toFixed(1)},${(Math.sin(i * 0.8) * 32).toFixed(1)} M50,0 l${(Math.cos(i * 0.8 + 0.4) * 32).toFixed(1)},${(Math.sin(i * 0.8 + 0.4) * 32).toFixed(1)}" stroke="#9aa3ad" stroke-width="1.2"/>`).join('')}
    </g>`;
  }

  function room(st) {
    let s = A.defs();
    s += `<rect x="0" y="0" width="1280" height="720" fill="#c9a77e"/>`;
    // Bretterwand
    for (let i = 0; i < 32; i++) s += `<rect x="${i * 40}" y="0" width="40" height="600" fill="${i % 3 ? '#c49a6c' : '#b98d60'}" stroke="${OL}" stroke-width="1.2" opacity=".9"/>`;
    // Dachschrägen
    s += `<path d="M0,0 L0,300 L260,0 Z" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<path d="M1280,0 L1280,300 L1020,0 Z" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/>`;
    for (let i = 0; i < 6; i++) s += `<path d="M0,${50 * i} L${260 - 43 * i * 1.0},0" stroke="${OL}" stroke-width="1.5" opacity=".3"/><path d="M1280,${50 * i} L${1020 + 43 * i},0" stroke="${OL}" stroke-width="1.5" opacity=".3"/>`;
    // Balken
    s += `<rect x="0" y="46" width="1280" height="30" fill="#6b4128" stroke="${OL}" stroke-width="3"/>`;
    for (const x of [300, 980]) s += `<rect x="${x}" y="76" width="30" height="524" fill="#6b4128" stroke="${OL}" stroke-width="3"/>`;
    // Gaubenfenster
    s += `<rect x="440" y="110" width="220" height="190" fill="#2a3358" stroke="${OL}" stroke-width="5"/>`;
    s += `<rect x="440" y="110" width="220" height="190" fill="url(#gCool)"/>`;
    s += `<path d="M440,250 L500,200 L540,225 L600,180 L660,215 V300 H440 Z" fill="#6b5f95"/><path d="M440,250 L500,200 L540,225 L600,180 L660,215" fill="none" stroke="#fff" stroke-width="5"/>`;
    s += `<rect x="574" y="226" width="10" height="16" fill="#ffd36e"/><rect x="510" y="232" width="8" height="12" fill="#ffd36e"/>`;
    s += `<path d="M550,110 V300 M440,205 H660" stroke="#e9dcc4" stroke-width="8"/>`;
    for (let i = 0; i < 10; i++) s += `<circle cx="${450 + (i * 41) % 200}" cy="${120 + (i * 59) % 170}" r="2" fill="#fff"/>`;
    s += `<path d="M440,300 q110,-16 220,0" fill="#fff" stroke="${OL}" stroke-width="2"/>`;
    s += `<rect x="430" y="298" width="240" height="14" fill="#a8744a" stroke="${OL}" stroke-width="3"/>`;
    // Plakat & Kalender
    s += `<rect x="330" y="110" width="100" height="140" fill="#f4ead6" stroke="${OL}" stroke-width="3" transform="rotate(-4 380 180)"/>`;
    s += A.text(380, 140, 'SPEICHLS', { fs: 15, fill: '#c0392b', rot: -4, maxw: 88 }) + A.text(380, 158, 'RADL-', { fs: 15, fill: '#c0392b', rot: -4, maxw: 88 }) + A.text(380, 176, 'WERKSTATT', { fs: 14, fill: '#c0392b', rot: -4, maxw: 88 }) + A.text(380, 236, 'seit 1961', { fs: 13, fill: OL, rot: -4, maxw: 88 });
    s += `<g transform="rotate(-4 380 200)">${bike(380, 204, 0.28, '#2f6fb5')}</g>`;
    s += `<rect x="690" y="130" width="70" height="90" fill="#fff" stroke="${OL}" stroke-width="2.5"/><rect x="690" y="130" width="70" height="22" fill="#c0392b" stroke="${OL}" stroke-width="2.5"/>` + A.text(725, 146, 'DEZ 2009', { fs: 11, fill: '#fff' });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) s += `<rect x="${695 + c * 10.5}" y="${158 + r * 14}" width="8" height="10" fill="#eee" stroke="${OL}" stroke-width=".6"/>`;
    // Werkzeugwand (Lochwand)
    s += `<rect x="800" y="110" width="170" height="220" fill="#d9c8a8" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 8; i++) for (let j = 0; j < 10; j++) s += `<circle cx="${810 + i * 21}" cy="${120 + j * 21}" r="1.6" fill="${OL}" opacity=".35"/>`;
    // Werkzeuge
    s += `<rect x="818" y="130" width="8" height="70" rx="3" fill="#9aa3ad" stroke="${OL}" stroke-width="2"/><path d="M812,124 h20 v14 h-6 v-6 h-8 v6 h-6 Z" fill="#9aa3ad" stroke="${OL}" stroke-width="2"/>`;
    s += `<rect x="846" y="130" width="10" height="60" rx="3" fill="#c0392b" stroke="${OL}" stroke-width="2"/><rect x="848" y="186" width="6" height="40" fill="#9aa3ad" stroke="${OL}" stroke-width="1.5"/>`;
    s += `<path d="M880,130 l20,0 l-6,60 l-8,0 Z" fill="#9aa3ad" stroke="${OL}" stroke-width="2"/><rect x="882" y="186" width="16" height="30" rx="4" fill="#2f6fb5" stroke="${OL}" stroke-width="2"/>`;
    // Umriss des fehlenden Kufenschlüssels
    if (!f('gave_schluessel')) s += `<g opacity=".8"><rect x="928" y="150" width="14" height="110" rx="5" fill="none" stroke="${OL}" stroke-width="2.5" stroke-dasharray="6 4"/><path d="M918,130 q17,-10 34,0 l-3,24 h-7 v-14 h-14 v14 h-7 Z" fill="none" stroke="${OL}" stroke-width="2.5" stroke-dasharray="6 4"/></g>`;
    else s += `<rect x="928" y="150" width="14" height="110" rx="5" fill="#b9c1cc" stroke="${OL}" stroke-width="2.5"/><path d="M918,130 q17,-10 34,0 l-3,24 h-7 v-14 h-14 v14 h-7 Z" fill="#b9c1cc" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<path d="M820,250 a20,20 0 1 1 40,0 a20,20 0 1 1 -40,0" fill="none" stroke="#3a3a3a" stroke-width="7"/>`;
    s += `<rect x="870" y="270" width="40" height="24" rx="3" fill="#e8c35a" stroke="${OL}" stroke-width="2"/>`;
    // Regal mit Helmen und Lampe
    s += `<rect x="40" y="330" width="250" height="12" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="40" y="240" width="250" height="12" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M90,236 q30,-50 60,0 Z" fill="#e8663d" stroke="${OL}" stroke-width="2.5"/><path d="M170,236 q30,-50 60,0 Z" fill="#2f6fb5" stroke="${OL}" stroke-width="2.5"/>`;
    if (!has('helm') && !f('helm_given')) s += `<path d="M60,326 q34,-58 68,0 Z" fill="#9cff3a" stroke="${OL}" stroke-width="2.8"/><path d="M76,316 l6,-24 M94,326 v-34 M112,316 l-6,-24" stroke="${OL}" stroke-width="1.8" opacity=".5"/>`;
    if (!has('lampe') && !f('lampe_taken')) {
      // alte Dynamo-Radllampe mit Handkurbel: Chromgehäuse, Glas mit Reflektor, Halterung
      s += `<g transform="translate(200,330)">
        ${A.glow(20, -30, 34, 'gWarm', 0.7)}
        <path d="M-10,0 L-4,-14 H8 L14,0 Z" fill="#5b5f6a" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M2,-14 V-20" stroke="${OL}" stroke-width="4"/>
        <path d="M-22,-46 Q-24,-22 -2,-18 L18,-18 L18,-50 L-2,-50 Q-20,-50 -22,-46 Z" fill="#c0392b" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M-14,-44 Q-16,-30 -4,-26" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>
        <path d="M-6,-50 V-18" stroke="${OL}" stroke-width="1.5" opacity=".4"/>
        <ellipse cx="18" cy="-34" rx="9" ry="17" fill="#c9ced8" stroke="${OL}" stroke-width="2.8"/>
        <ellipse cx="19" cy="-34" rx="6" ry="13" fill="#fff3c4" stroke="${OL}" stroke-width="1.5"/>
        <ellipse cx="20" cy="-34" rx="3" ry="6" fill="#ffd36e"/>
        <path d="M17,-44 l3,4 M16,-28 l3,4" stroke="#fff" stroke-width="1.5" opacity=".8"/>
        <circle cx="-10" cy="-34" r="5" fill="#9aa3ad" stroke="${OL}" stroke-width="2"/>
        <path d="M-10,-34 L-26,-24" stroke="${OL}" stroke-width="4" stroke-linecap="round"/><path d="M-10,-34 L-26,-24" stroke="#9aa3ad" stroke-width="2" stroke-linecap="round"/>
        <rect x="-32" y="-28" width="9" height="12" rx="3" fill="#2f3440" stroke="${OL}" stroke-width="2" transform="rotate(-30 -27 -22)"/>
      </g>`;
    }
    s += `<rect x="250" y="300" width="30" height="30" fill="#6b4128" stroke="${OL}" stroke-width="2"/><rect x="206" y="196" width="84" height="44" fill="#a8744a" stroke="${OL}" stroke-width="2"/>` + A.text(248, 215, 'Schrauben', { fs: 13, fill: OL, maxw: 78 }) + A.text(248, 232, '(fast sortiert)', { fs: 11, fill: OL, maxw: 78 });
    // Hängende Fahrräder
    s += bike(1152, 546, 1.55, "#c0392b");
    // Boden
    s += A.woodFloor(600, '#9a7048', '#7e5a38');
    // Treppenöffnung links
    s += `<path d="M40,600 L180,600 L150,690 L0,690 L0,640 Z" fill="#3a2518" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 3; i++) s += `<path d="M${30 + i * 8},${620 + i * 22} H${170 - i * 8}" stroke="#6b4128" stroke-width="7"/>`;
    s += `<path d="M180,600 V520 M40,600 V520 M30,520 H190" stroke="${OL}" stroke-width="7"/><path d="M180,600 V520 M40,600 V520 M30,520 H190" stroke="#8a5a36" stroke-width="3.5"/>`;
    s += A.vignette(0.45);
    return s;
  }

  function bench(st) {
    let s = '';
    s += `<rect x="-200" y="-150" width="400" height="22" rx="3" fill="#a8744a" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<path d="M-180,-128 V0 M180,-128 V0 M-180,-50 H180" stroke="${OL}" stroke-width="10"/><path d="M-180,-128 V0 M180,-128 V0 M-180,-50 H180" stroke="#8a5a36" stroke-width="6"/>`;
    // Schraubstock
    s += `<rect x="140" y="-186" width="50" height="36" fill="#2f6fb5" stroke="${OL}" stroke-width="2.5"/><path d="M190,-170 h20" stroke="${OL}" stroke-width="5"/>`;
    if (!f('sled_done')) {
      // Finis Schlitten, kopfüber
      s += `<g transform="translate(-10,-150)">
        <rect x="-150" y="-50" width="250" height="22" rx="4" fill="#d63a3a" stroke="${OL}" stroke-width="3"/>
        <path d="M-120,-44 l24,8 l-10,6 l26,6" stroke="#ffd36e" stroke-width="5" fill="none" stroke-linejoin="round"/>
        <path d="M-130,-28 V-6 M70,-28 V-6" stroke="${OL}" stroke-width="8"/><path d="M-130,-28 V-6 M70,-28 V-6" stroke="#8a5a36" stroke-width="4"/>
        <path d="M-170,-60 Q-176,-80 -158,-80 H90 Q110,-80 108,-64" fill="none" stroke="${OL}" stroke-width="9" transform="translate(0,64) scale(1,-1) translate(0,-4)"/>
        <path d="M-160,-6 H96 Q114,-6 110,-26" fill="none" stroke="${OL}" stroke-width="9"/><path d="M-160,-6 H96 Q114,-6 110,-26" fill="none" stroke="#9a5a3a" stroke-width="5" stroke-dasharray="14 6"/>
      </g>`;
    }
    // Lötlampe & Dose
    s += `<rect x="-196" y="-192" width="46" height="42" rx="4" fill="#e8c35a" stroke="${OL}" stroke-width="2.5"/>` + A.text(-173, -166, 'WACHS', { fs: 11, fill: OL, maxw: 40 });
    s += `<rect x="-60" y="-178" width="40" height="28" rx="6" fill="#c0392b" stroke="${OL}" stroke-width="2.5"/><path d="M-20,-170 l26,-6" stroke="${OL}" stroke-width="5"/>`;
    return s;
  }

  async function finishSled() {
    await G.say('gustl', 'So! Jetzt hab i ois beinand. Schlüssel, Wachs, Zimt. Pass auf, Fini, jetzt wird’s magisch.');
    G.setActor('gustl', { flip: false });
    await G.say('gustl', '*schraub* *klopf* *zisch*');
    await G.say('fini', 'Was machen Sie da?');
    await G.say('gustl', 'Wachs schmelzen, Zimt rein, rühren. Altes Speichl-Familienrezept. Dann auf die Kufen. Dünn. Mit Liebe.');
    await G.say('gustl', '*schab* *schab* *poliert*');
    G.flag('sled_done');
    G.refresh();
    await G.wait(300);
    await G.say('gustl', 'Fertig! Dei „Blitzbirne“. Frisch g’wachst mit Speichl’schem Zimtwachs.');
    await G.say('gustl', 'Die schnellsten Kufen diesseits von Ebersberg. Und sie riechen nach Weihnachten. Da verlieren die andern den Mut.');
    G.give('schlitten');
    await G.say('fini', 'Psychologische Kriegsführung mit Zimt. Gustl, Sie sind ein Genie!');
    await G.say('gustl', 'I woaß. Aber sag’s ned weiter, sonst wollen’s alle.');
  }

  async function checkParts() {
    if (f('gave_schluessel') && f('gave_kerze') && f('gave_zimt') && !f('sled_done')) await finishSled();
  }

  async function partsLeft() {
    const left = [];
    if (!f('gave_schluessel')) left.push('mei Kufenschlüssel – den hat d’Gerti an der Glühweinbude');
    if (!f('gave_kerze')) left.push('a Bienenwachskerze – gibt’s drunten im Fairkehrt');
    if (!f('gave_zimt')) left.push('a Zimtstang’');
    if (!left.length) return;
    await G.say('gustl', 'Was no fehlt: ' + left.join(', und ') + '.');
  }

  async function gustlTalk() {
    if (!f('met_gustl')) {
      G.flag('met_gustl');
      await G.say('gustl', 'Ja servus! Ja wen ham ma denn da? Die Fini! Mit am Schlitten-Notfall, nehm i an?');
      await G.say('fini', 'Woher wissen Sie das?');
      await G.say('gustl', 'Weil du im Juli mit deim Schlitten da warst und g’rufen hast: „Kufen-Tuning! Bis zum Rennen!“ Und dann bist wieder weg.');
      await G.say('gustl', 'Und jetzt is Rennen.');
      await G.say('fini', 'Juli-Fini war sehr vorausschauend. Leider auch sehr vergesslich.');
      await G.say('gustl', 'Dei „Blitzbirne“ is fast fertig. Da auf der Werkbank. I bräucht bloß no drei Sachen:');
      await G.say('gustl', 'Erstens mei Kufenschlüssel. Den hab i der Glühwein-Gerti g’liehen, für ihren tropfenden Hahn.');
      await G.say('gustl', 'Zweitens a Bienenwachskerze. Für mei Geheimwachs. Gibt’s drunten im Fairkehrt.');
      await G.say('gustl', 'Und drittens a Zimtstang’.');
      await G.say('fini', 'Zimt? Für einen SCHLITTEN?');
      await G.say('gustl', 'Wachs mit Zimt! Altes Rezept von meim Vater. Macht die Kufen schnell. Und riecht nach Weihnachten.');
      await G.say('gustl', 'Die andern riechen des, werden sentimental und bremsen. Glaub mir.');
      await G.say('fini', 'Psychologische Kriegsführung. Mit Zimt. Ich liebe es.');
    }
    await G.talk('gustl', () => [
      { t: 'Was fehlt nochmal für meinen Schlitten?', if: !f('sled_done'), run: partsLeft },
      { t: 'Haben Sie vielleicht einen Helm für mich?', if: f('met_wimmer') && !has('helm') && !f('helm_given'),
        run: async () => {
          await G.say('gustl', 'An Helm? Freilich! Nimm den da. Neongrün, Baujahr 1987.');
          await G.say('gustl', 'Sicherer als a Banktresor. Schöner als... na ja. Sicherer halt.');
          G.flag('helm_given'); G.give('helm');
          await G.say('fini', 'Man sieht mich damit aus dem Weltall. Perfekt.');
        } },
      { t: 'Darf ich mir Ihre Fahrradlampe ausleihen?', if: f('loft_dark_seen') && !has('lampe') && !f('lampe_taken'),
        run: async () => {
          await G.say('gustl', 'Die Dynamo-Lampe? Nimm’s mit! Baujahr ’79. Musst halt kurbeln, dann leucht’s.');
          G.flag('lampe_taken'); G.give('lampe');
        } },
      { t: 'Warum haben Sie die Werkstatt eigentlich zugemacht?', once: 'asked_closed',
        run: async () => {
          await G.say('gustl', '2009 hab i aufg’hört. Offiziell.');
          await G.say('gustl', 'Aber a Radlmechaniker hört nie richtig auf. Er schraubt halt nur no für sich. Und für vergessliche Madln.');
        } },
      { t: 'Kennen Sie das Kufen-Gaudi von früher?', once: 'asked_history_gustl',
        run: async () => {
          await G.say('gustl', 'Mei Vater, der Alois, hat des allererste g’wonnen. 1953, im selben Jahr, wo Grafing Stadt worden is.');
          await G.say('gustl', 'Mit am selbstgebauten Schlitten. Und mit Zimtwachs, logisch.');
          await G.say('gustl', 'I hab leider koa Foto mehr davon. Irgendwann verschlampt. Vielleicht hat’s der Taubenvater vom Kircherl, der hat damals ois aufg’hängt.');
          G.flag('know_foto');
        } },
      { t: 'Was machen Sie hier oben eigentlich den ganzen Tag?', once: 'asked_gustl_day',
        run: async () => {
          await G.say('gustl', 'Schrauben sortieren. Nach Größe, nach Farbe, nach Laune.');
          await G.say('fini', 'Und wie weit sind Sie?');
          await G.say('gustl', 'Bald fertig.');
          await G.say('fini', 'Seit wann?');
          await G.say('gustl', 'Seit 2011.');
        } },
      { t: 'Bis später, Gustl!', end: true, run: async () => { await G.say('gustl', 'Pfiat di, Fini. Und vergiss ned, was’d vergessen hast!'); } },
    ]);
  }

  const gustlItems = {
    kufenschluessel: async () => {
      await G.say('fini', 'Ihr Kufenschlüssel! Frisch befreit aus Gertis Glühwein-Gefangenschaft!');
      G.take('kufenschluessel'); G.flag('gave_schluessel');
      await G.say('gustl', 'Mei Schlüssel! Und er riecht nach Glühwein. Wie früher auf jeder Weihnachtsfeier.');
      await checkParts();
    },
    kerze: async () => {
      G.take('kerze'); G.flag('gave_kerze');
      await G.say('gustl', 'Bienenwachs, fair g’handelt! Des is guat. Die Bienen ham sich Mühe gebn, des merkt ma.');
      await checkParts();
    },
    zimt: async () => {
      G.take('zimt'); G.flag('gave_zimt');
      await G.say('gustl', '*schnupper* Aaah. Ceylon-Zimt. Vom glühenden Bären, gell? Den riecht ma raus.');
      await checkParts();
    },
    foto: async () => {
      G.take('foto'); G.flag('foto_given');
      await G.say('gustl', 'Des... des is mei Vater. 1953. Auf seim Schlitten.');
      await G.say('gustl', 'Wo hast des her? ... Im Taubenschlag? Da hat’s der alte Taubenvater aufg’hängt. Und i such’s seit vierzig Jahr.');
      await G.say('gustl', '...');
      await G.say('fini', 'Gustl? Weinen Sie?');
      await G.say('gustl', 'Na. Staub im Aug. Is a staubige Werkstatt.');
      await G.say('gustl', 'Da, nimm des. Die Klingel war an seim Schlitten. Bringt Glück. Häng’s dir an die Blitzbirne.');
      G.give('klingel');
    },
    prospekt: async () => {
      await G.say('gustl', 'An Motor? An am SCHLITTEN?! Pfui Deifi.');
      await G.say('gustl', 'A Schlitten braucht Schwerkraft und Mut. Sonst nix. Zeig des dem Wimmer, der kann den Paragraphen sieben auswendig.');
    },
    tasse: async () => { await G.say('gustl', 'A Pfandtass’n? Bring’s der Gerti, die gibt dir Geld dafür.'); },
    geld: async () => { await G.say('gustl', 'Geld? Na, Fini. Für di schraub i umsonst. Aber die Kerze musst scho selber kaufen, i hab koa mehr.'); },
    schlitten: async () => { await G.say('gustl', 'Pass guad auf auf’n! Und fahr ned gegen die Mariensäule. Des hat schon mal oaner probiert. 1974.'); },
    '*': async () => { await G.say('gustl', 'Was soll i damit, Madl? Damit kann ma ned amal an Schlitten tunen.'); },
  };

  G.scenes.radladen = {
    title: 'Speichls alte Radlwerkstatt',
    walk: { x1: 200, x2: 1160, y1: 622, y2: 704, s1: 0.92, s2: 1.0 },
    entry: { x: 230, y: 650 },
    draw: room,
    actors(st) {
      return [
        { id: 'werkbank', x: 760, y: 610, svg: bench(st) },
        { id: 'gustl', x: 975, y: 662, s: 1.1, svg: C.gustl(), head: -360, flip: true },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Gaubenfenster', r: [440, 110, 220, 190], walk: [550, 640], look: ['Von hier oben sieht man über die Dächer von Grafing. Alles verschneit.', 'Irgendwo da draußen wartet der Bärenbuckel. Und die Goldene Kufe. Und hoffentlich kein Schnupfen.'] },
        { name: 'Werbeplakat', r: [334, 114, 92, 132], walk: [380, 640], look: '„Speichls Radlwerkstatt – seit 1961“. Das Plakat ist älter als meine Eltern. Und besser erhalten.' },
        { name: 'Kalender', r: [686, 126, 78, 98], walk: [720, 640], look: 'Ein Kalender vom Dezember 2009. Gustl hat die Zeit einfach angehalten. Ich wünschte, das könnte ich vor Mathe-Tests auch.' },
        { name: 'Werkzeugwand', r: [800, 110, 170, 220], walk: [880, 640],
          look: () => f('gave_schluessel') ? 'Die Werkzeugwand. Der Kufenschlüssel hängt wieder an seinem Platz. Alles ist gut in der Welt der Werkzeuge.'
            : ['Eine Lochwand mit Werkzeugen. Ganz rechts ist nur ein gestrichelter Umriss.', 'Da fehlt ein riesiger Schraubenschlüssel. Ich hab ihn nicht genommen. Glaub ich. Diesmal wirklich nicht.'] },
        { name: 'Schraubenkiste', r: [206, 196, 84, 44], walk: [260, 640], look: '„Schrauben (fast sortiert)“. Das „fast“ ist mit Bleistift dazugeschrieben. Mehrmals.' },
        { name: 'Alte Helme', r: [86, 190, 150, 50], walk: [180, 640], look: 'Ein orangefarbener und ein blauer Fahrradhelm. Beide sehen aus, als hätten sie schon einiges abgekriegt. Respekt.' },
        !has('helm') && !f('helm_given') && { name: 'Neongrüner Helm', r: [56, 266, 76, 62], walk: [180, 640],
          look: 'Ein neongrüner Fahrradhelm. Ich bin nicht sicher, ob er schützt oder ob man nur nicht hinschauen kann.',
          use: async () => {
            if (!f('met_wimmer')) { await G.say('fini', 'Wozu bräuchte ich einen Helm? Ich fahr doch Schlitten, nicht Fahrrad. ...Oder?'); return; }
            await G.say('fini', 'Gustl, darf ich den Helm haben? Wegen Paragraph 11. Helmpflicht.');
            await G.say('gustl', 'Freilich! Neongrün, Baujahr 1987. Sicherer als a Banktresor.');
            G.flag('helm_given'); G.give('helm');
          } },
        !has('lampe') && !f('lampe_taken') && { name: 'Dynamo-Radllampe', r: [164, 270, 76, 64], walk: [200, 640],
          look: 'Eine alte rote Fahrradlampe mit Handkurbel. Leuchtet, wenn man kurbelt. Wie ein Hamsterrad, nur heller.',
          use: async () => {
            await G.say('fini', 'Darf ich mir die Lampe ausleihen, Gustl?');
            await G.say('gustl', 'Nimm’s mit! Baujahr ’79. Musst halt kurbeln, dann leucht’s.');
            G.flag('lampe_taken'); G.give('lampe');
            if (!f('loft_dark_seen')) await G.say('fini', 'Man weiß ja nie, wann man im Dunkeln steht. Bei mir eher öfter.');
          } },
        { name: 'Werkbank', r: [560, 450, 400, 160], walk: [700, 650],
          look: () => f('sled_done') ? 'Die Werkbank. Leer. Meine Blitzbirne ist bereit für den Ruhm.'
            : ['Mein Schlitten! Die „Blitzbirne“! Kopfüber auf der Werkbank.', 'Die Kufen sind ein bisschen rostig. Gustl sagt, ihm fehlen noch drei Sachen.'],
          use: async () => {
            if (f('sled_done')) { await G.say('fini', 'Hier gibt’s nichts mehr zu tun. Außer Staub. Viel Staub.'); return; }
            await G.say('fini', 'Ich will nicht an Gustls Arbeit rumpfuschen. Wenn ICH an Kufen schraube, fallen hinterher Teile vom Himmel.');
          },
          items: { kerze: gustlItems.kerze, zimt: gustlItems.zimt, kufenschluessel: gustlItems.kufenschluessel } },
        { name: "Altes Rennrad", r: [1025, 450, 255, 150], walk: [1080, 660], look: "Ein altes rotes Rennrad mit Staubschicht. Es wartet auf den Frühling. Seit 2009." },
        { name: 'Gustl Speichl', r: [925, 262, 105, 400], walk: [860, 668], face: 'r',
          look: 'Gustl Speichl. Groß, dünn, freundlich, mit Hut. Er hat Hände, die aussehen, als könnten sie aus einer Gabel ein Fahrrad bauen.',
          use: gustlTalk,
          items: gustlItems },
        { name: 'Treppe runter zum Fairkehrt', p: [40, 600, 180, 600, 150, 690, 0, 690, 0, 640], walk: [220, 650], exit: { to: 'fairkehrt', x: 1252, y: 198, face: -1 } },
      ];
    },
  };
})();
