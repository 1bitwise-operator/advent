/* Szene: Im Dreifaltigkeits-Kircherl */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function figure(x, y, robe, head, s = 1, extra = '') {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M-24,0 L-18,-70 Q0,-86 18,-70 L24,0 Z" fill="${robe}" stroke="${OL}" stroke-width="3"/>
      <circle cx="0" cy="-86" r="15" fill="#f0d0b0" stroke="${OL}" stroke-width="3"/>
      <path d="M-16,-86 Q-16,-106 0,-106 Q16,-106 16,-86 L16,-60 L12,-60 L12,-86 Q0,-96 -12,-86 L-12,-60 L-16,-60 Z" fill="${head}" stroke="${OL}" stroke-width="2.5"/>
      <circle cx="-5" cy="-86" r="1.8" fill="${OL}"/><circle cx="5" cy="-86" r="1.8" fill="${OL}"/>
      ${extra}
    </g>`;
  }

  function animal(x, y, kind) {
    if (kind === 'ochs') return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="-26" rx="40" ry="24" fill="#8a5a36" stroke="${OL}" stroke-width="3"/><ellipse cx="-40" cy="-36" rx="18" ry="15" fill="#8a5a36" stroke="${OL}" stroke-width="3"/><ellipse cx="-50" cy="-30" rx="9" ry="7" fill="#d9a77a" stroke="${OL}" stroke-width="2"/><path d="M-48,-50 q-8,-10 -4,-16 M-32,-50 q6,-10 2,-16" stroke="#f4efe6" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-42" cy="-40" r="2" fill="${OL}"/><path d="M-26,-4 v6 M20,-4 v6" stroke="${OL}" stroke-width="5"/></g>`;
    return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="-24" rx="34" ry="20" fill="#9a9aa6" stroke="${OL}" stroke-width="3"/><ellipse cx="34" cy="-38" rx="14" ry="12" fill="#9a9aa6" stroke="${OL}" stroke-width="3"/><path d="M30,-50 l-4,-22 l8,4 Z M40,-50 l4,-22 l-8,4 Z" fill="#9a9aa6" stroke="${OL}" stroke-width="2.5"/><ellipse cx="42" cy="-32" rx="7" ry="6" fill="#c9c9d2" stroke="${OL}" stroke-width="2"/><circle cx="36" cy="-42" r="2" fill="${OL}"/><path d="M-22,-4 v6 M18,-4 v6" stroke="${OL}" stroke-width="5"/></g>`;
  }

  function krippe(st) {
    const x = 900;
    let s = '';
    // Stall
    s += `<rect x="${x}" y="370" width="280" height="190" fill="#5a3824" stroke="${OL}" stroke-width="3.5"/>`;
    for (let i = 1; i < 8; i++) s += `<path d="M${x + i * 35},370 V560" stroke="${OL}" stroke-width="1.5" opacity=".4"/>`;
    s += `<path d="M${x - 30},380 L${x + 140},300 L${x + 310},380 Z" fill="#8a5a36" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    s += `<path d="M${x - 20},378 L${x + 140},304 L${x + 300},378" fill="none" stroke="#c8a46a" stroke-width="6" stroke-dasharray="20 6"/>`;
    s += `<rect x="${x}" y="370" width="280" height="190" fill="url(#gWarm)" opacity=".55"/>`;
    // Stern
    s += A.glow(x + 140, 280, 70, 'gWarm', 1);
    s += `<path d="${A.starPath(x + 140, 280, 22, 9)}" fill="#ffd36e" stroke="${OL}" stroke-width="2.5"/>`;
    s += `<path d="M${x + 150},290 L${x + 200},330" stroke="#ffd36e" stroke-width="4" stroke-linecap="round"/>`;
    // Stroh
    s += `<path d="M${x},560 q40,-26 80,-6 q40,-24 80,-4 q40,-22 80,-6 q30,-10 40,16 Z" fill="#e2c26a" stroke="${OL}" stroke-width="2.5"/>`;
    // Figuren
    s += animal(x + 70, 520, 'ochs');
    s += animal(x + 230, 524, 'esel');
    s += figure(x + 70, 548, '#2f6fb5', '#2f6fb5', 0.9);
    s += figure(x + 220, 548, '#8a5a36', '#6b4128', 1.0, '<path d="M26,0 V-110" stroke="#6b4128" stroke-width="5"/><path d="M26,-110 q-14,-6 -10,8" fill="none" stroke="#6b4128" stroke-width="5"/>');
    // Krippe
    s += `<path d="M${x + 110},540 L${x + 100},510 L${x + 180},510 L${x + 170},540 Z" fill="#a8744a" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M${x + 106},514 q34,-12 68,0" fill="#e2c26a" stroke="${OL}" stroke-width="2"/>`;
    s += `<path d="M${x + 112},540 l-12,20 M${x + 168},540 l12,20" stroke="${OL}" stroke-width="4"/>`;
    if (f('christkind_returned')) {
      s += A.glow(x + 140, 500, 50, 'gWarm', 1);
      s += `<path d="M${x + 118},512 Q${x + 140},486 ${x + 162},512 Z" fill="#d8b4e8" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<circle cx="${x + 140}" cy="496" r="10" fill="#f6d5b8" stroke="${OL}" stroke-width="2.5"/><circle cx="${x + 140}" cy="494" r="16" fill="none" stroke="#ffd36e" stroke-width="2"/>`;
    }
    s += `<rect x="${x + 60}" y="566" width="160" height="22" fill="#fff7e8" stroke="${OL}" stroke-width="2"/>` + A.text(x + 140, 582, 'Bitte nicht berühren', { fs: 11, fill: '#6b2a20' });
    return s;
  }

  function room(st) {
    let s = A.defs();
    s += `<rect x="0" y="0" width="1280" height="720" fill="#f4eee2"/>`;
    // Gewölbe mit Deckenfresko
    s += `<path d="M0,0 H1280 V150 Q640,40 0,150 Z" fill="#e9e0cc" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M260,104 Q640,30 1020,104 Q640,60 260,104 Z" fill="#8fb8e0" stroke="#c9a227" stroke-width="5"/>`;
    s += `<path d="M420,80 q30,-14 60,0 q20,-12 40,2 M700,70 q30,-12 60,2 q20,-8 40,4" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    // Pilaster mit Gold
    for (const x of [200, 440, 820, 1060]) {
      s += `<rect x="${x}" y="130" width="36" height="460" fill="#ece3cf" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<rect x="${x - 8}" y="124" width="52" height="20" fill="#e8c35a" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<path d="M${x + 4},160 q14,-12 28,0 q-14,12 -28,0" fill="none" stroke="#c9a227" stroke-width="3"/>`;
    }
    // Seitenfenster
    for (const x of [60, 1110]) {
      s += A.glow(x + 55, 300, 110, 'gCool', 1);
      s += `<path d="M${x},440 V230 A55,55 0 0 1 ${x + 110},230 V440 Z" fill="#3d5a9a" stroke="${OL}" stroke-width="4"/>`;
      s += `<path d="M${x + 55},176 V440 M${x},300 H${x + 110} M${x},370 H${x + 110}" stroke="#e9dcc4" stroke-width="4"/>`;
      s += `<path d="M${x + 4},304 H${x + 52} V366 H${x + 4} Z" fill="#c0392b" opacity=".4"/><path d="M${x + 58},374 H${x + 106} V436 H${x + 58} Z" fill="#e8c35a" opacity=".4"/>`;
    }
    // Altar
    s += A.glow(640, 300, 260, 'gWarm', 0.9);
    s += `<g>`;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      s += `<path d="M640,270 L${(640 + Math.cos(a) * 150).toFixed(1)},${(270 + Math.sin(a) * 150).toFixed(1)}" stroke="#e8c35a" stroke-width="${i % 2 ? 5 : 9}" opacity=".85"/>`;
    }
    s += `</g>`;
    s += `<circle cx="640" cy="270" r="54" fill="#ffe08a" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<path d="M640,236 L672,292 H608 Z" fill="#fff8d0" stroke="${OL}" stroke-width="2.5"/><circle cx="640" cy="274" r="7" fill="#2f6fb5" stroke="${OL}" stroke-width="2"/>`;
    s += `<rect x="520" y="400" width="240" height="90" fill="#ece3cf" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="510" y="388" width="260" height="18" fill="#e8c35a" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M560,420 h160 v50 h-160 Z" fill="none" stroke="#c9a227" stroke-width="3"/><path d="M640,425 v40 M622,440 h36" stroke="#c9a227" stroke-width="5"/>`;
    for (const x of [540, 590, 690, 740]) {
      s += `<rect x="${x - 5}" y="350" width="10" height="38" fill="#fffdf2" stroke="${OL}" stroke-width="2"/><rect x="${x - 10}" y="384" width="20" height="6" fill="#e8c35a" stroke="${OL}" stroke-width="1.5"/>`;
      s += A.glow(x, 340, 26, 'gWarm', 1) + `<path class="flicker" d="M${x},350 q-5,-8 0,-14 q5,6 0,14" fill="#ffb347" stroke="${OL}" stroke-width="1.5"/>`;
    }
    // Putten
    for (const [x, fl] of [[490, 1], [790, -1]]) s += `<g transform="translate(${x},180) scale(${fl},1)"><circle cx="0" cy="0" r="14" fill="#f6d5b8" stroke="${OL}" stroke-width="2.5"/><path d="M-10,-6 q10,-14 20,0" fill="#ffd36e" stroke="${OL}" stroke-width="2"/><path d="M8,6 q24,-30 30,4 q-16,0 -30,-4 Z" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="-4" cy="2" r="1.6" fill="${OL}"/><circle cx="4" cy="2" r="1.6" fill="${OL}"/></g>`;
    // Opferkerzen links
    s += `<rect x="110" y="470" width="150" height="16" fill="#3a3a3a" stroke="${OL}" stroke-width="2.5"/><rect x="104" y="500" width="162" height="16" fill="#3a3a3a" stroke="${OL}" stroke-width="2.5"/><path d="M140,516 V580 M230,516 V580" stroke="${OL}" stroke-width="6"/>`;
    for (let i = 0; i < 6; i++) for (let r = 0; r < 2; r++) {
      const x = 124 + i * 24 + r * 6, y = 470 + r * 30;
      s += `<rect x="${x - 6}" y="${y - 10}" width="12" height="10" fill="#fff" stroke="${OL}" stroke-width="1.5"/>`;
      if ((i + r) % 3 !== 2) s += A.glow(x, y - 16, 18, 'gWarm', 1) + `<path class="flicker" d="M${x},${y - 10} q-3,-6 0,-11 q3,5 0,11" fill="#ffb347"/>`;
    }
    // Boden
    s += `<rect x="0" y="590" width="1280" height="130" fill="#d9d2c5"/>`;
    for (let i = 0; i < 20; i++) for (let j = 0; j < 4; j++) s += `<rect x="${i * 70 - 20 + (j % 2) * 35}" y="${590 + j * 34}" width="70" height="34" fill="${(i + j) % 2 ? '#cfc6b6' : '#e3dccf'}" stroke="#bfb5a3" stroke-width="1"/>`;
    s += `<path d="M0,590 H1280" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M560,720 L600,590 H680 L720,720 Z" fill="#a2412f" opacity=".7"/>`;
    // Kirchenbänke
    for (let r = 0; r < 3; r++) {
      const y = 500 + r * 34;
      s += `<path d="M${300 - r * 20},${y} H${500 - r * 10} L${500 - r * 10},${y + 36} M${300 - r * 20},${y} V${y + 40}" stroke="${OL}" stroke-width="5" fill="none"/>`;
      s += `<rect x="${300 - r * 20}" y="${y - 6}" width="${200 + r * 10}" height="14" rx="3" fill="#8a5a36" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<rect x="${780 + r * 10}" y="${y - 6}" width="${100 + r * 10}" height="14" rx="3" fill="#8a5a36" stroke="${OL}" stroke-width="2.5"/>`;
    }
    s += krippe(st);
    s += A.vignette(0.4);
    s += A.exitArrow(560, 700, 'd');
    return s;
  }

  async function returnChristkind() {
    await G.say('fini', 'Herr Glöckl! Ich hab es gefunden! Ihr Christkind!');
    G.take('christkind');
    await G.say('gloeckl', 'Mei Christkind! Gott sei Dank! ... Moment. Is des... a Kaschmir-Poncho?');
    await G.say('fini', 'Lange Geschichte. Ein modisches Missverständnis. Frau Ohmeier lässt grüßen.');
    await G.say('gloeckl', 'Die Ohmeier! Ja freilich. Wer sonst.');
    await G.say('gloeckl', '...Es schaut aber schon sehr zufrieden aus. Und warm. Des darf’s anbehalten.');
    G.flag('christkind_returned');
    G.refresh();
    await G.wait(400);
    await G.say('gloeckl', 'Fini, du hast mir den Advent g’rettet. Was kann i für di tun?');
    if (f('met_wimmer')) {
      await G.say('fini', 'Ich bräuchte den Schlüssel zum Taubenschlag. Für eine Nachmeldung per Brieftaube.');
    } else {
      await G.say('fini', 'Hm... Ich weiß noch nicht. Ich hab bestimmt was vergessen.');
      await G.say('gloeckl', 'Dann nimm einfach den hier mit. Den Schlüssel zum Taubenschlag. Den braucht jeder irgendwann fürs Kufen-Gaudi.');
    }
    await G.say('gloeckl', 'Da, nimm den Schlüssel. Und grüß mir den Gurrbert!');
    G.give('schluessel_taube');
    await G.say('gloeckl', 'Aber Obacht: Der Gurrbert fliegt nur, wenn er vorher Brezn-Brösel vom Kreitmampf kriegt. Da is er eigen. Wie i ohne Kaffee.');
    G.flag('know_broesel');
    await G.say('gloeckl', 'Und nimm a Licht mit. Im Taubenschlag is finster wie im Kohlenkeller.');
  }

  async function gloecklTalk() {
    if (!f('met_gloeckl')) {
      G.flag('met_gloeckl');
      await G.say('gloeckl', 'Grüß Gott, grüß Gott... Ach, die Fini. Entschuldige, i bin heut a bisserl durcheinander.');
      await G.say('gloeckl', 'Das Christkind is weg! Aus der Krippe! Heut früh war’s no da – und jetzt: leer!');
      await G.say('gloeckl', 'A leere Krippe am Marktplatz! Im Advent! Was sollen denn d’Leut denken?!');
      G.flag('christkind_missing');
      await G.say('fini', 'Vielleicht ist es nur kurz Brezn holen gegangen?');
      await G.say('gloeckl', 'Fini. Es is a Holzfigur.');
      await G.say('fini', 'Ich helf Ihnen suchen! Ich bin sehr gut im Suchen. Ich hab viel Übung. Weil ich ständig was verlier.');
    }
    await G.talk('gloeckl', () => [
      { t: 'Was genau ist mit dem Christkind passiert?', if: f('christkind_missing') && !f('christkind_returned'),
        run: async () => {
          await G.say('gloeckl', 'Heut früh hab i noch abg’staubt. Dann war i kurz drüben beim Kreitmampf auf an Kaffee.');
          await G.say('gloeckl', 'Und wie i z’ruck kumm: weg! Nur a Spur hab i g’funden...');
          await G.say('gloeckl', '...a lila Fussel. Ganz weich. Kaschmir, moan i.');
          await G.say('fini', 'Lila. Kaschmir. Wer in Grafing trägt denn lila Kaschmir...?');
        } },
      { t: 'Ich brauche den Schlüssel für den Taubenschlag.', if: f('met_wimmer') && !has('schluessel_taube') && !f('loft_open') && !f('christkind_returned'),
        run: async () => {
          await G.say('gloeckl', 'Für’n Gurrbert? Mei, Fini... I kann jetzt ned an Tauben denken.');
          await G.say('gloeckl', 'Erst muss des Christkind wieder da sein. Vorher hab i koan Kopf für nix.');
          await G.say('gloeckl', 'Wennst’ es findest, kriagst den Schlüssel. Versprochen. Bei... bei allen Heiligen. Und des san viele.');
        } },
      { t: 'Wer ist eigentlich Gurrbert?', if: f('met_wimmer') || f('door_locked_seen'),
        run: async () => {
          await G.say('gloeckl', 'Gurrbert is mei Brieftaube! Der beste Flieger von ganz Oberbayern. Wohnt im Taubenschlag gegenüber.');
          await G.say('gloeckl', 'Er bringt seit Jahren die Nachmeldungen zum Rennleiter. Pünktlich. Meistens. Wenn ma ihn nett behandelt.');
          await G.say('gloeckl', 'Aber er fliegt nur, wenn er vorher Brezn-Brösel vom Kreitmampf kriegt. Da is er eigen.');
          G.flag('know_broesel');
        } },
      { t: 'Erzählen Sie mir was über das Kircherl!', once: 'asked_kircherl',
        run: async () => {
          await G.say('gloeckl', '1672 is’ baut worden! Die Dreifaltigkeitskirche am Marktplatz. Später ham berühmte Künstler den Stuck und die Figuren g’macht.');
          await G.say('gloeckl', 'Und i staub’s ab. Ois. Jeden Tag. Jeden Putto einzeln.');
          await G.say('fini', 'Was ist ein Putto?');
          await G.say('gloeckl', 'A kloaner Engel ohne Hosen. Da oben, schau.');
        } },
      { t: 'Auf Wiedersehen, Herr Glöckl!', end: true, run: async () => { await G.say('gloeckl', f('christkind_returned') ? 'Pfiat di, Fini! Und gwinn des Rennen! I zünd dir a Kerzerl an.' : 'Pfiat di... Und halt die Augen offen, gell? Nach am kloanen Christkind...'); } },
    ]);
  }

  const gloecklItems = {
    christkind: returnChristkind,
    foto: async () => { await G.say('gloeckl', 'Ah, des Foto vom alten Speichl! Des hing im Taubenschlag. Des g’hört eigentlich dem Gustl, find i.'); },
    prospekt: async () => { await G.say('gloeckl', 'A Motor? Am Schlitten?! Des is ja... direkt unchristlich. Zeig des dem Wimmer!'); },
    kerze: async () => { await G.say('gloeckl', 'A Bienenwachskerze! Die tät gut auf’n Altar passen... aber du brauchst’s für was anders, gell? Behalt’s.'); },
    broesel: async () => { await G.say('gloeckl', 'Die Brösel san für’n Gurrbert, ned für mi. Obwohl... na. Na! Für’n Gurrbert.'); },
    lebkuchen: async () => { await G.say('gloeckl', 'A Lebkuchenmann mit oam Bein. Der arme Kerl. I sprech a kurzes Gebet für ihn.'); },
    '*': async () => { await G.say('gloeckl', 'Des is lieb gmoant, Fini. Aber i brauch nur mei Christkind.'); },
  };

  G.scenes.kapelle = {
    title: 'Im Dreifaltigkeits-Kircherl',
    walk: { x1: 260, x2: 1100, y1: 606, y2: 704, s1: 0.74, s2: 0.84 },
    entry: { x: 640, y: 690 },
    draw: room,
    actors(st) {
      return [{ id: 'gloeckl', x: 880, y: 650, s: 0.92, svg: C.gloeckl(), head: -300, flip: true }];
    },
    hotspots(st) {
      return [
        { name: 'Deckenfresko', r: [260, 30, 760, 80], walk: [640, 650], look: 'Ein gemalter Himmel an der Decke. Ohne Schnee. Ganz schön optimistisch für Dezember.' },
        { name: 'Putten', r: [470, 160, 40, 40], walk: [600, 640], look: 'Ein kleiner Engel ohne Hosen. Im Dezember. Der friert doch!' },
        { name: 'Putten', r: [770, 160, 40, 40], walk: [700, 640], look: 'Noch ein kleiner Engel ohne Hosen. Ich sollte Frau Ohmeier Bescheid sagen. Nein. Lieber nicht.' },
        { name: 'Altar', r: [500, 120, 280, 370], walk: [640, 620],
          look: ['Ein goldener Altar mit Strahlenkranz. Alles glänzt.', 'Herr Glöckl staubt das jeden Tag ab. Kein Wunder, dass er so müde aussieht.'],
          use: async () => { await G.say('fini', 'Am Altar rumfummeln? In einer Kirche? Selbst ICH weiß, dass das eine schlechte Idee ist.'); } },
        { name: 'Opferkerzen', r: [100, 430, 170, 100], walk: [300, 640],
          look: 'Viele kleine Kerzen. Jede ist ein Wunsch. Meiner wäre: Schlitten finden, Rennen gewinnen, nichts vergessen. Das sind drei. Ich zünd drei an.',
          use: async () => { await G.say('fini', 'Ich hab kein Geld für eine Kerze. Ich wünsch mir einfach still was. Gratis-Wunsch. Hoffentlich zählt der auch.'); } },
        { name: 'Kirchenfenster', r: [60, 176, 110, 266], walk: [300, 640], look: 'Draußen ist es schon fast dunkel. Das bunte Glas leuchtet trotzdem. Wie Weingummi.' },
        { name: 'Kirchenfenster', r: [1110, 176, 110, 266], walk: [1080, 640], look: 'Durchs Fenster sieht man die Lichter vom Christkindlmarkt. Und Schneeflocken. Kitschig. Perfekt kitschig.' },
        { name: 'Kirchenbänke', r: [270, 490, 240, 110], walk: [420, 640], look: 'Holzbänke. Bequem genug für eine Messe. Zu unbequem für ein Nickerchen. Das ist vermutlich Absicht.' },
        { name: 'Kirchenbänke', r: [776, 490, 120, 110], walk: [800, 640], look: 'Noch mehr Bänke. Auf einer liegt ein vergessener Handschuh. Nicht meiner. Leider.' },
        { name: 'Krippe', r: [870, 280, 330, 290], walk: [1040, 640],
          look: () => f('christkind_returned') ? ['Die Krippe ist wieder komplett! Das Christkind trägt einen Kaschmir-Poncho.', 'Der Esel schaut ein bisschen neidisch.']
            : ['Eine Krippe mit Maria, Josef, Ochs und Esel. Und einer leeren Futterkrippe.', 'Da fehlt doch die Hauptperson! Ochs und Esel sehen auch ganz ratlos aus.'],
          use: async () => { await G.say('fini', f('christkind_returned') ? 'Alles an seinem Platz. Sogar mit Stil.' : '„Bitte nicht berühren“. Na gut. Ich berühre nur mit den Augen.'); },
          items: { christkind: async () => { if (!f('met_gloeckl')) { G.flag('met_gloeckl'); G.flag('christkind_missing'); } await returnChristkind(); } } },
        { name: 'Mesner Glöckl', r: [830, 360, 100, 290], walk: [780, 670], face: 'r',
          look: () => f('christkind_returned') ? 'Herr Glöckl, der Mesner. Er strahlt jetzt mehr als der Altar.' : 'Herr Glöckl, der Mesner. Er schaut so verzweifelt, dass sogar die Putten Mitleid haben.',
          use: gloecklTalk,
          items: gloecklItems },
        { name: 'Zum Marktplatz', r: [520, 690, 240, 30], walk: [640, 704], exit: { to: 'marktost', x: 245, y: 610, face: 1 } },
      ];
    },
  };
})();
