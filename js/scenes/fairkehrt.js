/* Szene: Fairkehrt – der Weltladen (mit Treppe zur alten Radlwerkstatt) */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function shelf(x, y, w, items) {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="10" fill="#a8744a" stroke="${OL}" stroke-width="2.5"/>`;
    items.forEach((it, i) => { s += it(x + 14 + i * ((w - 20) / items.length), y); });
    return s;
  }
  const coffee = (c) => (x, y) => `<path d="M${x},${y} V${y - 46} l6,-6 h20 l6,6 V${y} Z" fill="${c}" stroke="${OL}" stroke-width="2.2"/><rect x="${x + 4}" y="${y - 34}" width="24" height="14" fill="#fff7e8" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 10},${y - 27} q6,-6 12,0" stroke="#6b4128" stroke-width="2" fill="none"/>`;
  const choco = (c) => (x, y) => `<rect x="${x}" y="${y - 30}" width="18" height="30" fill="${c}" stroke="${OL}" stroke-width="2"/><rect x="${x + 2}" y="${y - 22}" width="14" height="8" fill="#fff7e8"/>`;
  const tin = (c) => (x, y) => `<rect x="${x}" y="${y - 34}" width="26" height="34" rx="3" fill="${c}" stroke="${OL}" stroke-width="2.2"/><ellipse cx="${x + 13}" cy="${y - 34}" rx="13" ry="3" fill="${c}" stroke="${OL}" stroke-width="2"/><path d="M${x + 4},${y - 18} h18" stroke="#ffd36e" stroke-width="2.5"/>`;
  const basket = (x, y) => `<path d="M${x - 4},${y} L${x},${y - 26} H${x + 36} L${x + 40},${y} Z" fill="#c8a46a" stroke="${OL}" stroke-width="2.2"/><path d="M${x},${y - 18} h36 M${x - 2},${y - 9} h40" stroke="${OL}" stroke-width="1.2" opacity=".5"/>`;

  function room(st) {
    let s = A.defs();
    s += `<rect x="0" y="0" width="1280" height="720" fill="#f0dcb8"/>`;
    // Holzbalken an der Decke
    s += `<rect x="0" y="0" width="1280" height="56" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 7; i++) s += `<rect x="${i * 210 - 10}" y="0" width="30" height="70" fill="#6b4128" stroke="${OL}" stroke-width="2.5"/>`;
    // Lampen
    for (const x of [300, 640]) s += `<path d="M${x},56 V100" stroke="${OL}" stroke-width="2.5"/>${A.glow(x, 130, 160, 'gWarm', 0.8)}<path d="M${x - 34},130 Q${x},90 ${x + 34},130 Z" fill="#c8a46a" stroke="${OL}" stroke-width="3"/><path d="M${x - 30},128 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6" stroke="${OL}" stroke-width="1.2" fill="none" opacity=".5"/>`;
    // Wandteppich
    s += `<rect x="40" y="90" width="150" height="210" fill="#c2603a" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 6; i++) s += `<path d="M40,${110 + i * 32} l25,14 l25,-14 l25,14 l25,-14 l25,14 l25,-14" stroke="${['#f4c542', '#2f8f8b', '#fff7e8'][i % 3]}" stroke-width="4" fill="none"/>`;
    s += `<path d="M40,300 v14 M60,300 v14 M80,300 v14 M100,300 v14 M120,300 v14 M140,300 v14 M160,300 v14 M180,300 v14" stroke="#c2603a" stroke-width="3"/>`;
    // Regale
    s += `<rect x="210" y="90" width="520" height="350" fill="#d9b483" stroke="${OL}" stroke-width="3"/>`;
    s += shelf(220, 170, 500, [coffee('#6b2a20'), coffee('#2f6e4a'), coffee('#c0392b'), coffee('#2f6fb5'), coffee('#6b2a20'), coffee('#e8663d'), coffee('#7b3fa0'), coffee('#2f6e4a'), coffee('#c0392b'), coffee('#6b4128'), coffee('#2f8f8b'), coffee('#f4c542'), coffee('#6b2a20'), coffee('#2f6e4a')].slice(0, 12));
    s += shelf(220, 250, 500, Array.from({ length: 16 }, (_, i) => choco(['#c0392b', '#2f6fb5', '#f4c542', '#7b3fa0', '#2f8f8b', '#e8663d'][i % 6])));
    s += shelf(220, 330, 500, Array.from({ length: 10 }, (_, i) => tin(['#2f6e4a', '#c0392b', '#2f6fb5', '#e8663d', '#7b3fa0'][i % 5])));
    s += shelf(220, 410, 500, Array.from({ length: 8 }, () => basket));
    s += A.text(470, 120, 'Kaffee · Schokolade · Tee', { fs: 16, fill: '#6b4128', font: 'Segoe Print, Comic Sans MS, cursive' });
    // Globus
    s += `<g transform="translate(790,380)"><path d="M-30,60 H30 M0,60 V36" stroke="${OL}" stroke-width="5"/><path d="M-30,60 H30 M0,60 V36" stroke="#c9a227" stroke-width="2.5"/><circle cx="0" cy="0" r="38" fill="#5aa0d8" stroke="${OL}" stroke-width="3"/><path d="M-26,-14 q10,-10 20,0 q6,12 -6,16 q-10,-2 -14,-16 Z M6,-26 q16,-4 22,10 q-4,18 -12,10 q-10,-6 -10,-20 Z M-8,14 q10,0 12,14 q-8,6 -14,-4 Z" fill="#7cc47a" stroke="${OL}" stroke-width="1.8"/><path d="M-40,0 A40,40 0 0 0 40,0" fill="none" stroke="#c9a227" stroke-width="3"/></g>`;
    // Poster
    s += `<rect x="760" y="110" width="140" height="180" fill="#fff7e8" stroke="${OL}" stroke-width="3" transform="rotate(-3 830 200)"/>`;
    s += A.text(830, 160, 'Fair statt', { fs: 20, fill: '#2f6e4a', rot: -3, font: 'Segoe Print, Comic Sans MS, cursive' }) + A.text(830, 192, 'mehr!', { fs: 26, fill: '#c0392b', rot: -3, font: 'Segoe Print, Comic Sans MS, cursive' });
    s += `<path d="M800,230 q30,-30 60,0 q-30,30 -60,0 Z" fill="#7cc47a" stroke="${OL}" stroke-width="2"/><path d="M800,230 h60" stroke="${OL}" stroke-width="1.5"/>`;
    // Treppe nach oben (rechts)
    s += `<path d="M960,600 L1280,110 L1280,600 Z" fill="#c49a66" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 11; i++) {
      const x = 960 + i * 30, y = 600 - i * 44;
      s += `<path d="M${x},${y} h40 v-44" fill="none" stroke="${OL}" stroke-width="3"/><rect x="${x}" y="${y - 6}" width="44" height="8" fill="#a8744a" stroke="${OL}" stroke-width="2"/>`;
    }
    s += `<path d="M930,560 L1250,70" stroke="${OL}" stroke-width="8"/><path d="M930,560 L1250,70" stroke="#8a5a36" stroke-width="4"/>`;
    for (let i = 0; i < 8; i++) s += `<path d="M${944 + i * 40},${538 - i * 61} V${600 - i * 61 - 10}" stroke="#6b4128" stroke-width="4"/>`;
    s += `<rect x="1060" y="170" width="190" height="62" rx="4" fill="#fff7e8" stroke="${OL}" stroke-width="2.5" transform="rotate(-4 1155 200)"/>`;
    s += A.text(1155, 194, '↑ Speichls Radlwerkstatt', { fs: 15, fill: '#6b2a20', rot: -4, maxw: 176 }) + A.text(1155, 214, '(geschlossen seit 2009)', { fs: 13, fill: '#6b2a20', rot: -4, maxw: 176 });
    s += `<rect x="986" y="464" width="132" height="38" rx="3" fill="#f4c542" stroke="${OL}" stroke-width="2" transform="rotate(8 1052 483)"/>` + A.text(1052, 489, '3. Stufe knarzt!', { fs: 15, fill: OL, rot: 8, maxw: 122 });
    // Tür links
    s += `<rect x="20" y="320" width="110" height="270" fill="#2f6e4a" stroke="${OL}" stroke-width="4"/><rect x="36" y="336" width="78" height="120" fill="#3d4d7a" stroke="${OL}" stroke-width="3"/><path d="M36,436 q40,-14 78,0 V456 H36 Z" fill="#fff"/><circle cx="116" cy="470" r="6" fill="#e8c35a" stroke="${OL}" stroke-width="2"/>`;
    // Boden
    s += A.woodFloor(590, '#b88a5a', '#9a7048');
    s += `<ellipse cx="560" cy="660" rx="260" ry="34" fill="#c2603a" opacity=".45"/><ellipse cx="560" cy="660" rx="230" ry="26" fill="none" stroke="#f4c542" stroke-width="3" stroke-dasharray="10 8" opacity=".6"/>`;
    s += A.vignette(0.32);
    return s;
  }

  function counter(st) {
    let s = `<rect x="-200" y="-110" width="400" height="110" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="-210" y="-124" width="420" height="16" rx="4" fill="#c49a66" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 1; i < 8; i++) s += `<path d="M${-200 + i * 50},-108 V0" stroke="${OL}" stroke-width="1.5" opacity=".35"/>`;
    s += `<path d="M-180,-60 q20,-20 40,0 q20,-20 40,0 M100,-60 q20,-20 40,0" stroke="#4f8a4a" stroke-width="5" fill="none"/>`;
    // Kerzen-Auslage
    s += `<rect x="-190" y="-150" width="120" height="28" rx="4" fill="#c49a66" stroke="${OL}" stroke-width="2.5"/>`;
    for (let i = 0; i < 4; i++) {
      const h = 40 + (i % 2) * 14;
      s += `<rect x="${-180 + i * 28}" y="${-150 - h}" width="20" height="${h}" rx="2" fill="#f2c14e" stroke="${OL}" stroke-width="2"/><path d="M${-170 + i * 28},${-150 - h} v-6" stroke="${OL}" stroke-width="2"/>`;
      if (i === 1) s += `<path class="flicker" d="M${-170 + i * 28},${-156 - h} q-5,-8 0,-14 q5,6 0,14" fill="#ffb347" stroke="${OL}" stroke-width="1.5"/>` + A.glow(-170 + i * 28, -166 - h, 30, 'gWarm', 1);
    }
    s += `<rect x="-196" y="-130" width="134" height="24" fill="#fff7e8" stroke="${OL}" stroke-width="1.5"/>` + A.text(-129, -112, 'Bienenwachs 3 €', { fs: 13, fill: '#6b2a20', maxw: 126 });
    // Jutebeutel-Stapel
    s += `<path d="M28,-124 h96 l-6,-40 h-84 Z" fill="#d9c49a" stroke="${OL}" stroke-width="2.5"/><path d="M46,-164 q30,-30 60,0" fill="none" stroke="${OL}" stroke-width="3"/>`;
    s += A.text(76, -139, "KEIN", { fs: 12, fill: "#4f8a4a", maxw: 80 }) + A.text(76, -127, "PLASTIK", { fs: 12, fill: "#4f8a4a", maxw: 80 });
    // Kasse
    s += `<rect x="130" y="-166" width="64" height="42" rx="6" fill="#6b4128" stroke="${OL}" stroke-width="3"/><rect x="140" y="-158" width="34" height="12" fill="#fff8d0" stroke="${OL}" stroke-width="1.5"/>`;
    return s;
  }

  async function buyCandle() {
    await G.say('fini', 'Ich nehm eine Bienenwachskerze! Hier, drei Euro!');
    G.take('geld');
    await G.say('fairhuber', 'Wunderbar! Fair gehandelt, aus einer Imkerei-Kooperative. Die Bienen lassen schön grüßen.');
    G.give('kerze');
    G.flag('kerze_bought');
    await G.say('fairhuber', 'Und dazu gibt’s gratis einen Jutebeutel. Plastik ist bei uns verboten. Sogar das Wort.');
    G.give('jute');
    await G.say('fini', 'Wie sagt man dann zu Plastik?');
    await G.say('fairhuber', '„Das P-Wort.“');
  }

  async function fairhuberTalk() {
    if (!f('met_fairhuber')) {
      G.flag('met_fairhuber');
      await G.say('fairhuber', 'Hallo Fini! Willkommen im Fairkehrt! Hier ist alles fair. Sogar die Preise. Na ja. Fast.');
    }
    await G.talk('fairhuber', () => [
      { t: 'Was ist eigentlich da oben, über dem Laden?', if: !f('met_gustl'),
        run: async () => {
          await G.say('fairhuber', 'Die alte Radlwerkstatt vom Gustl Speichl. Offiziell hat er 2009 zugemacht.');
          await G.say('fairhuber', 'Inoffiziell ist er jeden Tag da oben und sortiert Schrauben. Einfach die Treppe rauf. Die dritte Stufe knarzt wie ein Bär.');
          if (f('resi_told_sled')) await G.say('fini', 'Da muss mein Schlitten sein! Juli-Fini, was hast du dir nur dabei gedacht?');
        } },
      { t: 'Ich bräuchte eine Bienenwachskerze.', if: f('met_gustl') && !has('kerze') && !f('gave_kerze'),
        run: async () => {
          await G.say('fairhuber', 'Gute Wahl! Drei Euro das Stück.');
          if (has('geld')) { await buyCandle(); return; }
          await G.say('fini', 'Ich hab... kein Geld dabei. Ich hab nie Geld dabei. Ich hab nur Pläne. Und Kaugummi. Hatte.');
          await G.say('fairhuber', 'Tut mir leid, Fini. Fair heißt auch, dass die Imkerinnen fair bezahlt werden.');
          await G.say('fairhuber', 'Vielleicht findest du ja irgendwo ein bisschen Kleingeld? Auf dem Christkindlmarkt liegt manchmal mehr rum, als man denkt.');
          G.flag('need_money');
        } },
      { t: 'Kann ich einen Jutebeutel haben?', if: !has('jute') && !f('kerze_bought'),
        run: async () => {
          await G.say('fairhuber', 'Den gibt’s gratis zu jedem Einkauf! Und die Kerzen sind heute im Angebot.');
          await G.say('fini', 'Ein Gratis-Beutel, für den man was kaufen muss. Das ist wie ein Geschenk mit Hausaufgaben.');
        } },
      { t: 'Was heißt eigentlich „Fairkehrt“?', once: 'asked_fairkehrt',
        run: async () => {
          await G.say('fairhuber', 'Weil die Welt manchmal ganz schön verkehrt ist. Und wir sie ein kleines bisschen fairer machen wollen.');
          await G.say('fairhuber', 'Und weil „Weltladen“ schon jeder heißt.');
        } },
      { t: 'Haben Sie einen Helm?', if: f('met_wimmer') && !has('helm'),
        run: async () => {
          await G.say('fairhuber', 'Einen Helm? Nein... aber oben beim Gustl hängen bestimmt noch alte Radlhelme. Der wirft nie was weg.');
        } },
      { t: 'Tschüss!', end: true, run: async () => { await G.say('fairhuber', 'Tschüss, Fini! Viel Glück beim Rennen. Fair bleiben!'); } },
    ]);
  }

  G.scenes.fairkehrt = {
    title: 'Fairkehrt – der Weltladen',
    walk: { x1: 170, x2: 1080, y1: 618, y2: 704, s1: 0.76, s2: 0.86 },
    entry: { x: 190, y: 660 },
    draw: room,
    actors(st) {
      return [
        { id: 'fairhuber', x: 520, y: 570, svg: C.fairhuber(), head: -300 },
        { id: 'theke', x: 520, y: 600, svg: counter(st) },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Kaffeeregal', r: [220, 120, 500, 60], walk: [470, 630], look: 'Kaffee aus Äthiopien, Peru, Honduras. Fair gehandelt. Ich trink keinen Kaffee, aber ich respektiere ihn.' },
        { name: 'Schokolade', r: [220, 210, 500, 52], walk: [470, 630], look: ['Fair gehandelte Schokolade. 70 Prozent Kakao.', 'Und 30 Prozent gutes Gewissen, steht da. Klingt ausgewogen.'],
          use: async () => { await G.say('fini', 'Nicht ohne zu bezahlen. Das wäre das unfairste, was man in einem fairen Laden machen kann.'); } },
        { name: 'Teedosen', r: [220, 290, 500, 52], walk: [470, 630], look: '„Winterzauber“, „Sternschnuppe“, „Ruhepol“. Tees mit Namen wie Wellness-Hotels.' },
        { name: 'Körbe', r: [220, 380, 500, 44], walk: [470, 630], look: 'Handgeflochtene Körbe. Da würde mein Chaos perfekt reinpassen. In alle gleichzeitig.' },
        { name: 'Globus', r: [748, 336, 86, 110], walk: [790, 640], look: 'Ein Globus. Grafing ist nicht drauf. Skandal. Ich schreib einen Brief. Den ich dann vergesse.' },
        { name: 'Poster', r: [756, 106, 150, 186], walk: [830, 640], look: '„Fair statt mehr!“ Ich glaube, das ist ein Wortspiel. Hier gibt’s viele Wortspiele. Sogar der Laden ist eins.' },
        { name: 'Wandteppich', r: [36, 86, 158, 230], walk: [200, 640], look: 'Ein bunter Wandteppich mit Zickzack-Muster. Wenn ich zu lange draufschaue, wird mir schwindlig. Auf eine gemütliche Art.' },
        { name: 'Schild an der Treppe', r: [1056, 160, 200, 80], walk: [990, 630], look: '„Speichls Radlwerkstatt – geschlossen seit 2009.“ Und daneben: „3. Stufe knarzt!“ Gut zu wissen. Ich bin ja sehr leise. Nie.' },
        { name: 'Bienenwachskerzen', r: [320, 412, 130, 80], walk: [400, 640],
          look: 'Bienenwachskerzen, fair gehandelt. 3 Euro das Stück. Eine brennt schon. Es riecht nach Honig und Gemütlichkeit.',
          use: async () => {
            if (has('kerze') || f('gave_kerze')) { await G.say('fini', 'Eine Kerze reicht. Ich will ja keinen Altar bauen.'); return; }
            if (has('geld')) { await buyCandle(); return; }
            await G.say('fini', 'Drei Euro. Ich hab null Euro. Das ist ein Unterschied von genau... drei Euro. Mathe kann ich.');
            G.flag('need_money');
          },
          items: { geld: async () => { if (has('kerze') || f('gave_kerze')) return; await buyCandle(); } } },
        { name: 'Jutebeutel', r: [548, 430, 96, 50], walk: [580, 640], look: '„Ich bin kein Plastiksackerl.“ Ein Stapel selbstbewusster Jutebeutel.',
          use: async () => { await G.say('fairhuber', 'Die gibt’s gratis zu jedem Einkauf, Fini!'); } },
        { name: 'Frau Fairhuber', r: [470, 260, 100, 220], walk: [690, 645], face: 'l',
          look: 'Frau Fairhuber. Bunte Strickjacke, Stirnband, sehr freundliches Lächeln. Ich glaube, sie hat noch nie in ihrem Leben ein Plastiksackerl angefasst.',
          use: fairhuberTalk,
          items: {
            geld: async () => { if (has('kerze') || f('gave_kerze')) { await G.say('fairhuber', 'Behalt dein Geld, Fini. Du hast doch schon eine Kerze!'); return; } await buyCandle(); },
            tasse: async () => { await G.say('fairhuber', 'Eine Pfandtasse? Die nimmt die Gerti an der Glühweinbude zurück. Drei Euro Pfand, glaub ich!'); },
            prospekt: async () => { await G.say('fairhuber', 'Ein Schlitten mit Motor? Bei Schnee? Das ist ungefähr so fair wie ein Rennrad beim Sackhüpfen.'); },
            christkind: async () => { await G.say('fairhuber', 'Oh, das gehört doch in die Krippe vom Kircherl! Herr Glöckl sucht es bestimmt schon.'); },
            '*': async () => { await G.say('fairhuber', 'Das ist lieb gemeint, Fini. Aber das brauch ich nicht.'); },
          } },
        { name: 'Treppe zur Radlwerkstatt', p: [960, 600, 1280, 110, 1280, 600], walk: [1000, 630],
          exit: { to: 'radladen', x: 230, y: 650, face: 1 },
          use: async () => { await G.say('fini', 'Rauf da! ...*knarz*... Hallo, dritte Stufe.'); } },
        { name: 'Zum Marktplatz', r: [20, 320, 110, 270], walk: [180, 650], exit: { to: 'marktplatz', x: 1164, y: 595, face: -1 } },
      ];
    },
  };
})();
