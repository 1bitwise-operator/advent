/* Szene: Ohmeier Moden (Bekleidungsgeschäft) */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function coat(x, y, c, len = 120) {
    return `<path d="M${x},${y} q-4,-14 6,-16 M${x},${y}" stroke="${OL}" stroke-width="2.5" fill="none"/>
      <path d="M${x - 26},${y + 8} L${x},${y} L${x + 26},${y + 8} L${x + 30},${y + len} L${x - 30},${y + len} Z" fill="${c}" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M${x},${y + 4} V${y + len}" stroke="${OL}" stroke-width="1.5" opacity=".4"/>`;
  }

  function room(st) {
    let s = A.defs();
    s += `<rect x="0" y="0" width="1280" height="720" fill="#e8c3d6"/>`;
    for (let i = 0; i < 26; i++) s += `<rect x="${i * 50}" y="0" width="22" height="580" fill="#f2d4e3"/>`;
    for (let i = 0; i < 26; i++) for (let j = 0; j < 6; j++) s += `<path d="M${i * 50 + 36},${50 + j * 90} l6,-10 l6,10 l-6,10 Z" fill="#d6a7c0" opacity=".6"/>`;
    // Stuckleiste
    s += `<rect x="0" y="0" width="1280" height="46" fill="#f8eef4" stroke="${OL}" stroke-width="3"/><path d="M0,46 H1280" stroke="#c9a227" stroke-width="5"/>`;
    // Kronleuchter
    s += `<g transform="translate(700,46)">${A.glow(0, 70, 140, 'gWarm', 0.7)}
      <path d="M0,0 V30" stroke="${OL}" stroke-width="3"/>
      <path d="M-80,60 Q0,110 80,60" fill="none" stroke="#c9a227" stroke-width="6"/><path d="M-80,60 Q0,110 80,60" fill="none" stroke="${OL}" stroke-width="1.5"/>
      <ellipse cx="0" cy="40" rx="20" ry="12" fill="#e8c35a" stroke="${OL}" stroke-width="2.5"/>
      ${[-80, -40, 0, 40, 80].map((x) => `<rect x="${x - 4}" y="${x === 0 ? 72 : 46 + Math.abs(x) * 0.2}" width="8" height="16" fill="#fff" stroke="${OL}" stroke-width="2"/><path class="flicker" d="M${x},${x === 0 ? 70 : 44 + Math.abs(x) * 0.2} q-5,-8 0,-14 q5,6 0,14" fill="#ffd36e" stroke="${OL}" stroke-width="1.5"/>`).join('')}
      ${[-60, -20, 20, 60].map((x) => `<path d="M${x},${74 + (Math.abs(x) < 30 ? 10 : 0)} l-5,10 l5,10 l5,-10 Z" fill="#dff4ff" stroke="${OL}" stroke-width="1.5"/>`).join('')}
    </g>`;
    // Schaufenster (von innen) links
    s += `<rect x="40" y="110" width="330" height="410" fill="#3d4d7a" stroke="${OL}" stroke-width="5"/>`;
    s += `<rect x="40" y="110" width="330" height="410" fill="url(#gCool)" opacity=".8"/>`;
    s += `<path d="M40,300 L120,250 L200,280 L280,240 L370,270 V520 H40 Z" fill="#7b6aa0" opacity=".5"/>`;
    for (let i = 0; i < 14; i++) s += `<circle cx="${60 + (i * 47) % 300}" cy="${130 + (i * 71) % 250}" r="${1.5 + i % 3}" fill="#fff" opacity=".8"/>`;
    s += `<path d="M205,156 V520" stroke="#f8eef4" stroke-width="7"/><path d="M40,156 H370" stroke="#f8eef4" stroke-width="5"/>`;
    s += A.text(205, 140, 'NEDEOM REIEMHO', { fs: 18, fill: '#ffe08a', font: 'Georgia, serif' });
    // Podest im Fenster
    s += `<rect x="120" y="470" width="170" height="54" rx="6" fill="#c0392b" stroke="${OL}" stroke-width="3"/>`;
    s += A.glow(205, 420, 110, 'gSoft', 1);
    if (!f('lebkuchen_given')) {
      s += `<ellipse cx="205" cy="466" rx="46" ry="16" fill="#e6c18f" stroke="${OL}" stroke-width="3"/>`;
      s += `<path d="M166,462 Q205,412 244,462 L238,476 Q205,486 172,476 Z" fill="#d8b4e8" stroke="${OL}" stroke-width="3"/>`;
      s += `<path d="M176,456 l8,14 M192,446 l4,18 M218,446 l-4,18 M234,456 l-8,14" stroke="#fff" stroke-width="2" opacity=".6"/>`;
      s += `<circle cx="205" cy="424" r="20" fill="#f6d5b8" stroke="${OL}" stroke-width="3"/><path d="M190,418 Q205,398 220,418" fill="#ffd36e" stroke="${OL}" stroke-width="2"/>`;
      s += `<circle cx="198" cy="426" r="2" fill="${OL}"/><circle cx="212" cy="426" r="2" fill="${OL}"/><path d="M200,434 q5,4 10,0" stroke="${OL}" stroke-width="2" fill="none"/>`;
      s += `<circle cx="205" cy="412" r="30" fill="none" stroke="#ffd36e" stroke-width="3"/>`;
    } else {
      s += `<g transform="translate(205,472) scale(1.1)"><path d="M0,-80 a14,14 0 1 1 -0.1,0 Z M-16,-56 H16 L36,-46 L33,-34 L16,-40 L18,-14 L12,0 L2,0 L0,-12 L-8,-12 L-14,-32 L-32,-32 L-32,-44 Z" fill="#b86a35" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="-5" cy="-68" r="2.5" fill="#fff"/><circle cx="5" cy="-68" r="2.5" fill="#fff"/><path d="M-5,-60 q5,4 10,0" stroke="#fff" stroke-width="2" fill="none"/><path d="M-12,-50 Q0,-42 14,-50 L18,-30 Q0,-24 -16,-30 Z" fill="#d8b4e8" stroke="${OL}" stroke-width="2.5"/></g>`;
    }
    // Ausgangstür
    s += `<rect x="388" y="160" width="110" height="420" fill="#7b3fa0" stroke="${OL}" stroke-width="4"/><rect x="404" y="180" width="78" height="220" fill="#3d4d7a" stroke="${OL}" stroke-width="3"/>`;
    s += `<circle cx="484" cy="400" r="7" fill="#e8c35a" stroke="${OL}" stroke-width="2"/>`;
    // Spiegel
    s += `<rect x="560" y="120" width="140" height="300" rx="70" fill="#c9a227" stroke="${OL}" stroke-width="4"/><rect x="574" y="134" width="112" height="272" rx="56" fill="#dcefff" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M600,170 l40,-24 M600,210 l60,-36" stroke="#fff" stroke-width="7" opacity=".7"/>`;
    // Kleiderständer
    s += `<path d="M760,190 H1180 M770,190 V560 M1170,190 V560" stroke="${OL}" stroke-width="7"/><path d="M760,190 H1180 M770,190 V560 M1170,190 V560" stroke="#c9a227" stroke-width="3.5"/>`;
    ['#c0392b', '#2f6fb5', '#f4c542', '#2f6e4a', '#e8663d', '#7b3fa0', '#1d1a24', '#ff9ec4'].forEach((c, i) => { s += coat(810 + i * 48, 196, c, 130 + (i % 3) * 20); });
    // Plakat
    s += `<rect x="1196" y="90" width="76" height="110" fill="#fff" stroke="${OL}" stroke-width="3" transform="rotate(4 1234 145)"/>` + A.text(1234, 126, 'Winter-', { fs: 12, fill: '#c0392b', rot: 4 }) + A.text(1234, 142, 'schluss-', { fs: 12, fill: '#c0392b', rot: 4 }) + A.text(1234, 158, 'verkauf?', { fs: 12, fill: '#c0392b', rot: 4 }) + A.text(1236, 182, 'NIE!', { fs: 18, fill: '#7b3fa0', rot: 4 });
    // Boden
    s += `<rect x="0" y="580" width="1280" height="140" fill="#b88aa6"/>`;
    for (let i = 0; i < 18; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) s += `<path d="M${i * 80 - 40 + j * 20},${580 + j * 36} h80 l20,36 h-80 Z" fill="#a77895"/>`;
    s += `<path d="M0,580 H1280" stroke="${OL}" stroke-width="3"/>`;
    s += `<ellipse cx="760" cy="650" rx="300" ry="40" fill="#c0392b" opacity=".35"/>`;
    s += A.vignette(0.3);
    return s;
  }

  function mannequin() {
    return `${A.shadow(0, 0, 40)}
      <path d="M0,0 V-60 M-26,0 H26" stroke="${OL}" stroke-width="7"/><path d="M0,0 V-60 M-26,0 H26" stroke="#c9a227" stroke-width="3.5"/>
      <path d="M-34,-60 L-30,-150 Q0,-170 30,-150 L34,-60 Q0,-50 -34,-60 Z" fill="#2f6e4a" stroke="${OL}" stroke-width="3"/>
      <path d="M-30,-150 Q-60,-120 -36,-90 M30,-150 Q60,-120 36,-90" stroke="${OL}" stroke-width="3" fill="none"/>
      <path d="M-40,-160 Q0,-200 40,-160 L44,-120 Q0,-110 -44,-120 Z" fill="#ff9ec4" stroke="${OL}" stroke-width="3"/>
      <path d="M-40,-140 h80 M-42,-128 h84" stroke="#fff" stroke-width="3" opacity=".5"/>
      <ellipse cx="0" cy="-180" rx="14" ry="10" fill="#f1e6dc" stroke="${OL}" stroke-width="3"/>
      <path d="M-34,-100 h68" stroke="#c9a227" stroke-width="5"/>
      <rect x="16" y="-214" width="62" height="32" rx="4" fill="#fff" stroke="${OL}" stroke-width="2" transform="rotate(10 47 -198)"/>
      <text data-maxw="56" x="47" y="-192" text-anchor="middle" font-size="15" font-family="Trebuchet MS" font-weight="700" fill="#c0392b" transform="rotate(10 47 -198)">799 €</text>`;
  }

  function counterSVG(st) {
    let s = `<rect x="-140" y="-120" width="280" height="120" fill="#7b3fa0" stroke="${OL}" stroke-width="3.5"/>`;
    s += `<rect x="-150" y="-132" width="300" height="16" rx="4" fill="#f8eef4" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M-130,-100 h260 M-130,-20 h260" stroke="#c9a227" stroke-width="3"/>`;
    s += A.text(0, -54, 'Oh mei!', { fs: 26, fill: '#ffe08a', font: 'Georgia, serif', italic: true });
    // Kasse
    s += `<rect x="40" y="-180" width="80" height="50" rx="6" fill="#c9a227" stroke="${OL}" stroke-width="3"/><rect x="52" y="-172" width="40" height="14" fill="#fff8d0" stroke="${OL}" stroke-width="2"/>`;
    // Stiftebecher
    s += `<rect x="-118" y="-170" width="52" height="40" rx="4" fill="#ffe08a" stroke="${OL}" stroke-width="2.5"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${-106 + i * 6}" y="${-196 + (i % 2) * 6}" width="5" height="34" rx="2" fill="#7b3fa0" stroke="${OL}" stroke-width="1.5" transform="rotate(${(i - 2) * 6} ${-104 + i * 6} -160)"/>`;
    s += A.text(-92, -144, 'GRATIS', { fs: 12, fill: '#7b3fa0', maxw: 46 });
    // Hutständer
    s += `<path d="M-30,-132 V-200" stroke="${OL}" stroke-width="3"/><path d="M-60,-210 Q-30,-240 0,-210 Z" fill="#c0392b" stroke="${OL}" stroke-width="2.5"/><path d="M-70,-208 h80" stroke="${OL}" stroke-width="4"/>`;
    return s;
  }

  async function swapLebkuchen() {
    await G.say('fini', 'Frau Ohmeier! Ich hab Ihren neuen Star! Mit Ecken und Kanten!');
    G.take('lebkuchen');
    await G.say('ohmeier', 'Ein Lebkuchenmann... mit EINEM Bein!');
    await G.say('ohmeier', 'Asymmetrie! Verletzlichkeit! Der Mut zur Lücke!');
    await G.say('ohmeier', 'Chérie... das ist kein Gebäck. Das ist STATEMENT-LEBKUCHEN!');
    await G.say('ohmeier', 'Ich nenne die Installation: „Einer geht noch“. Die Kritiker werden weinen.');
    G.flag('lebkuchen_given');
    G.refresh();
    await G.say('ohmeier', 'Und das Christkind... nehmen Sie es mit. Den Poncho darf es behalten. Kaschmir. Für die Krippe. Damit es nicht friert.');
    G.give('christkind');
    await G.say('fini', 'Danke! Herr Glöckl wird sich freuen. Und das Christkind auch. Es sieht jetzt aus wie aus einem Katalog.');
  }

  async function ohmeierTalk() {
    if (!f('met_ohmeier')) {
      G.flag('met_ohmeier');
      await G.say('ohmeier', 'Bonjour, Chérie! Willkommen bei Ohmeier Moden! Hier sagt man: Oh mei!');
      await G.say('fini', 'Oh mei.');
      await G.say('ohmeier', 'Sehen Sie? Es wirkt sofort.');
    }
    await G.talk('ohmeier', () => [
      { t: 'Haben Sie zufällig meinen Schlitten gesehen?', if: !f('met_gustl'), once: 'asked_ohm_sled',
        run: async () => {
          await G.say('ohmeier', 'Einen Schlitten? Chérie, ich verkaufe Mode, keine Fahrzeuge.');
          await G.say('ohmeier', 'Obwohl... ein Schlitten mit Kaschmir-Bezug... *notiert*... Das ist die Zukunft.');
        } },
      { t: 'Was ist das für eine Figur in Ihrem Schaufenster?', if: !f('ohmeier_wants') && !f('lebkuchen_given'),
        run: async () => {
          await G.say('ohmeier', 'Meine neue Installation! „Christkind Couture“! Ein kleines Christkind im Kaschmir-Poncho.');
          await G.say('ohmeier', 'Schlicht. Heilig. Kuschelig. Die Leute bleiben stehen und sagen: Oh mei!');
          if (!f('christkind_missing')) { await G.say('fini', 'Hübsch. Ein bisschen... seltsam. Aber hübsch.'); return; }
          await G.say('fini', 'Woher haben Sie das Christkind eigentlich?');
          await G.say('ohmeier', 'Gefunden, Chérie! Heute Morgen. Im Kircherl. Es lag da in so einem Holzbett. Mit STROH. Im Dezember! Halb nackt!');
          await G.say('ohmeier', 'Da musste ich doch etwas tun. Ich bin Modedesignerin. Ich habe eine Verantwortung.');
          await G.say('fini', 'Das ist das Christkind aus der Krippe von Herrn Glöckl! Er sucht es überall!');
          await G.say('ohmeier', 'Oh mei.');
          await G.say('ohmeier', '...Aber mein Schaufenster kann nicht leer sein! Ein leeres Schaufenster am Grafinger Marktplatz! Im Advent! Das wäre gesellschaftlicher Selbstmord!');
          await G.say('ohmeier', 'Bringen Sie mir einen neuen Star. Etwas Authentisches. Rustikales. Etwas... mit Ecken und Kanten!');
          G.flag('ohmeier_wants');
        } },
      { t: 'Das Christkind muss wirklich zurück in die Krippe...', if: f('ohmeier_wants') && !f('lebkuchen_given'),
        run: async () => {
          await G.say('ohmeier', 'Und das wird es, Chérie! Sobald ich einen neuen Star für mein Schaufenster habe.');
          await G.say('ohmeier', 'Etwas mit Ecken und Kanten! Mit Geschichte! Mit... einem gewissen Duft nach Zimt, vielleicht?');
        } },
      { t: 'Darf ich mir einen Kugelschreiber nehmen?', if: !has('stift') && !f('stift_taken'),
        run: async () => {
          await G.say('ohmeier', 'Natürlich, Chérie. Werbegeschenk. Ich habe dreitausend davon. Sie schreiben in Gold.');
          G.flag('stift_taken'); G.give('stift');
        } },
      { t: 'Haben Sie zufällig einen Helm?', if: f('met_wimmer') && !has('helm'),
        run: async () => {
          await G.say('ohmeier', 'Einen HELM? Chérie, bei Ohmeier tragen wir Hüte. Helme sind etwas für Menschen mit Plänen.');
          await G.say('ohmeier', 'Fragen Sie den Gustl. Der hat so... Radl-Zeug. In Neonfarben. *schauder*');
        } },
      { t: 'Was sagen Sie zu meinem Schneeanzug?', once: 'asked_suit',
        run: async () => {
          await G.say('ohmeier', 'Orange. Mutig. Sehr... sichtbar.');
          await G.say('ohmeier', 'Man sieht Sie bis Ebersberg, Chérie. Das ist auch ein Statement. Nur nicht meins.');
        } },
      { t: 'Auf Wiedersehen!', end: true, run: async () => { await G.say('ohmeier', 'Au revoir, Chérie! Und denken Sie dran: Mode ist, wenn man trotzdem friert.'); } },
    ]);
  }

  G.scenes.ohmeier = {
    title: 'Ohmeier Moden',
    walk: { x1: 170, x2: 1200, y1: 612, y2: 704, s1: 0.76, s2: 0.86 },
    entry: { x: 200, y: 650 },
    draw: room,
    actors(st) {
      return [
        { id: 'puppe', x: 1060, y: 612, svg: mannequin() },
        { id: 'theke', x: 640, y: 600, svg: counterSVG(st) },
        { id: 'ohmeier', x: 850, y: 640, svg: C.ohmeier(), head: -320, flip: true },
      ];
    },
    hotspots(st) {
      return [
        { name: 'Kronleuchter', r: [610, 46, 180, 130], walk: [700, 640], look: 'Ein Kronleuchter. In einem Klamottenladen. In Grafing. Frau Ohmeier denkt groß.' },
        { name: 'Spiegel', r: [556, 116, 148, 308], walk: [630, 630],
          look: ['Ich im Spiegel. Orange, verfroren, entschlossen.', 'Ein Zopf zeigt nach oben, einer nach unten. Ich nenne den Look: „Kompass“.'] },
        { name: 'Kleiderständer', r: [760, 180, 420, 200], walk: [960, 640],
          look: ['Mäntel in allen Farben. Ein pinker mit Federn. Ein grüner mit noch mehr Federn.', 'Ich glaub, hier ist irgendwo ein Huhn verarbeitet worden.'],
          use: async () => { await G.say('fini', 'Anprobieren? Mit einem Schneeanzug drunter sehe ich aus wie ein Marshmallow mit Mode-Ambitionen.'); } },
        { name: 'Schaufensterpuppe', r: [1010, 380, 110, 240], walk: [1000, 650],
          look: 'Eine kopflose Schaufensterpuppe im Dirndl mit Daunenjacke. Preis: 799 Euro. Für den Kopf zahlt man extra.' },
        { name: 'Plakat', r: [1190, 86, 86, 120], walk: [1150, 640], look: '„Winterschlussverkauf? NIE!“ Frau Ohmeier hat eine sehr klare Haltung zu Rabatten.' },
        { name: 'Schaufenster', r: [110, 380, 200, 150], walk: [260, 640],
          look: () => f('lebkuchen_given') ? 'Der Lebkuchenmann thront im Schaufenster. In einem kleinen lila Kaschmir-Schal. Er hat es geschafft.'
            : (f('christkind_missing') ? (G.flag('seen_christkind'), ['Das Christkind aus Herrn Glöckls Krippe! Im Kaschmir-Poncho!', 'Ich muss Frau Ohmeier darauf ansprechen. Diplomatisch. Sehr diplomatisch.'])
              : 'Von hinten sieht man die „Christkind Couture“-Installation. Ein Christkind im Kaschmir-Poncho. Sieht gemütlich aus. Fast zu gemütlich.'),
          use: async () => {
            if (f('lebkuchen_given')) { await G.say('fini', 'Der Lebkuchenmann bleibt, wo er ist. Er hat endlich ein Zuhause.'); return; }
            await G.say('fini', 'Ich nehm das Christkind einfach mal mit...');
            await G.say('ohmeier', 'Chérie! Finger weg von meiner Installation! Das ist Kunst! Gekaufte Kunst! ...Gefundene Kunst!');
          },
          items: { lebkuchen: async () => { if (f('ohmeier_wants')) await swapLebkuchen(); else await G.say('fini', 'Ich sollte erst mit Frau Ohmeier reden, bevor ich ihr Schaufenster umdekoriere.'); } } },
        { name: 'Schaufenster (Blick nach draußen)', r: [40, 110, 330, 260], walk: [260, 640], look: 'Draußen schneit es auf den Marktplatz. Von hier aus sieht Grafing aus wie eine Schneekugel. Eine sehr gemütliche Schneekugel.' },
        !has('stift') && !f('stift_taken') && { name: 'Stiftebecher', r: [520, 400, 50, 75], walk: [560, 640],
          look: '„GRATIS“. Ein Becher voller lila Kugelschreiber. Gratis ist mein Lieblingspreis.',
          use: async () => {
            await G.say('fini', 'Darf ich einen nehmen?');
            await G.say('ohmeier', 'Natürlich, Chérie! Werbegeschenk. Ich habe dreitausend davon.');
            G.flag('stift_taken'); G.give('stift');
            await G.say('fini', '„Ohmeier Moden – Mode, bei der man Oh mei sagt.“ Er schreibt in Gold. Natürlich.');
          } },
        { name: 'Ladentheke', r: [500, 470, 280, 130], walk: [640, 650], look: 'Eine lila Theke mit goldener Schrift: „Oh mei!“. Ich frage mich, ob man das hier als Gruß benutzt.' },
        { name: 'Frau Ohmeier', r: [796, 300, 110, 330], walk: [760, 660], face: 'r',
          look: 'Frau Ohmeier. Lila Mantel, Katzenaugen-Brille, Perlenkette. Sie sieht aus, als würde sie sogar im Schlaf posieren.',
          use: ohmeierTalk,
          items: {
            lebkuchen: async () => { if (f('ohmeier_wants')) await swapLebkuchen(); else await G.say('ohmeier', 'Ein Lebkuchen? Chérie, ich esse nach 14 Uhr keine Kohlenhydrate. Ich SCHAUE sie nur an.'); },
            formular: async () => { await G.say('ohmeier', 'Ein Formular? Chérie, ich unterschreibe nur Autogramme. Und Lieferscheine.'); },
            formular_voll: async () => { await G.say('ohmeier', 'Ein Pferd! Wie entzückend! Sie haben Talent, Chérie. Für... Pferde.'); },
            prospekt: async () => { await G.say('ohmeier', 'TurboKufe X... Dieses Design! Silber mit Neongelb! Das ist ja ein Verbrechen. Modisch gesehen.'); },
            helm: async () => { await G.say('ohmeier', 'NEONGRÜN?! Chérie, nehmen Sie das sofort aus meinem Laden. Meine Mäntel bekommen Angst.'); },
            christkind: async () => { await G.say('ohmeier', 'Bringen Sie es zurück zu Herrn Glöckl, Chérie. Mit meinen besten Grüßen. Und dem Poncho.'); },
            '*': async () => { await G.say('ohmeier', 'Chérie, das ist... nicht Ohmeier. Absolut nicht Ohmeier.'); },
          } },
        { name: 'Zum Marktplatz', r: [388, 160, 110, 420], walk: [440, 640], exit: { to: 'marktplatz', x: 222, y: 595, face: 1 } },
      ];
    },
  };
})();
