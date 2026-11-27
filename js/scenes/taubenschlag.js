/* Szene: Der dunkle Taubenschlag gegenüber vom Kircherl */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function lit(st) {
    let s = A.defs();
    s += `<rect x="0" y="0" width="1280" height="720" fill="#5a3f2a"/>`;
    for (let i = 0; i < 26; i++) s += `<rect x="${i * 50}" y="0" width="50" height="620" fill="${i % 2 ? '#6b4a31' : '#614329'}" stroke="${OL}" stroke-width="1.5"/>`;
    // Dachbalken (niedrig)
    s += `<path d="M0,0 L640,-60 L1280,0 V90 H0 Z" fill="#3e2a1b" stroke="${OL}" stroke-width="3"/>`;
    s += `<rect x="0" y="84" width="1280" height="34" fill="#4a3220" stroke="${OL}" stroke-width="3"/>`;
    for (const x of [280, 700]) s += `<rect x="${x}" y="118" width="34" height="500" fill="#4a3220" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M314,200 L480,118 M700,200 L560,118" stroke="${OL}" stroke-width="16"/><path d="M314,200 L480,118 M700,200 L560,118" stroke="#4a3220" stroke-width="11"/>`;
    // Ausflugsluke
    s += `<rect x="960" y="130" width="180" height="140" fill="#2a3358" stroke="${OL}" stroke-width="5"/>`;
    s += `<rect x="960" y="130" width="180" height="140" fill="url(#gCool)"/>`;
    for (let i = 0; i < 9; i++) s += `<circle cx="${970 + (i * 37) % 160}" cy="${140 + (i * 41) % 110}" r="2" fill="#fff"/>`;
    s += `<path d="M960,270 q90,-18 180,0" fill="#fff" stroke="${OL}" stroke-width="2"/><rect x="940" y="268" width="220" height="14" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M960,130 L930,90 L1170,90 L1140,130" fill="#6b4a31" stroke="${OL}" stroke-width="3"/>`;
    // Nistkästen hinten
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      const x = 350 + c * 84, y = 160 + r * 110;
      s += `<rect x="${x}" y="${y}" width="76" height="70" fill="#7a5233" stroke="${OL}" stroke-width="3"/><path d="M${x + 14},${y + 70} V${y + 30} A24,24 0 0 1 ${x + 62},${y + 30} V${y + 70} Z" fill="#1b1424" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<path d="M${x + 8},${y + 70} q30,-10 60,0" fill="#e2c26a" stroke="${OL}" stroke-width="1.5"/>`;
      if ((r + c) % 2 === 0) s += `<g transform="translate(${x + 38},${y + 68}) scale(${c % 2 ? -0.42 : 0.42},0.42)">${C.gurrbert()}</g>`;
    }
    // Futtertrog
    s += `<path d="M90,560 L110,600 H300 L320,560 Z" fill="#8a5a36" stroke="${OL}" stroke-width="3"/><path d="M100,562 q110,-14 210,0" fill="#e2c26a" stroke="${OL}" stroke-width="2"/>`;
    s += A.text(205, 590, 'NUR KÖRNER', { fs: 11, fill: '#f4ead6' });
    // Kiste mit Gurrberts Nest
    s += `<rect x="790" y="470" width="190" height="140" fill="#8a5a36" stroke="${OL}" stroke-width="3.5"/><path d="M790,520 H980 M790,570 H980" stroke="${OL}" stroke-width="2" opacity=".5"/>`;
    s += A.text(885, 552, 'BRIEFTAUBEN-POST', { fs: 12, fill: '#f4ead6' });
    s += A.text(885, 592, 'seit 1953', { fs: 11, fill: '#f4ead6' });
    // Nest
    s += `<path d="M800,474 Q885,420 970,474 Q885,500 800,474 Z" fill="#e2c26a" stroke="${OL}" stroke-width="3"/>`;
    for (let i = 0; i < 9; i++) s += `<path d="M${810 + i * 18},${470 - (i % 3) * 4} l14,-8" stroke="#b8962e" stroke-width="2.5"/>`;
    if (!f('glove_back')) s += `<g transform="translate(930,470) rotate(-20)"><path d="M-14,0 L-14,-26 Q-14,-40 0,-40 Q14,-40 14,-26 L14,0 Z" fill="#2f8f8b" stroke="${OL}" stroke-width="2.5"/><rect x="-16" y="-4" width="32" height="8" rx="3" fill="#fff7e8" stroke="${OL}" stroke-width="2"/><path d="M-8,-26 h16 M-8,-18 h16" stroke="#ffd36e" stroke-width="2.5"/></g>`;
    else s += `<path d="M900,474 L960,444 L970,472 Z" fill="#d9c49a" stroke="${OL}" stroke-width="2.5"/>` + A.text(940, 466, 'KEIN', { fs: 8, fill: '#4f8a4a', rot: -20 });
    // Altes Foto am Balken
    if (!f('foto_taken')) s += `<g transform="rotate(-5 300 260)"><rect x="268" y="220" width="70" height="60" fill="#f2ead8" stroke="${OL}" stroke-width="2.5"/><rect x="276" y="228" width="54" height="38" fill="#8a8273"/><circle cx="303" cy="240" r="6" fill="#e9e2cf"/><path d="M290,262 L316,262 M296,256 L303,246 L310,256" stroke="#e9e2cf" stroke-width="2.5" fill="none"/><circle cx="303" cy="218" r="3" fill="#9aa3ad" stroke="${OL}" stroke-width="1.5"/></g>`;
    // Federn & Stroh am Boden
    s += `<rect x="0" y="610" width="1280" height="110" fill="#4a3220"/>`;
    s += `<path d="M0,610 H1280" stroke="${OL}" stroke-width="3"/>`;
    const r = A.rng(8);
    for (let i = 0; i < 40; i++) s += `<path d="M${(r() * 1280).toFixed(0)},${(620 + r() * 95).toFixed(0)} l${(8 + r() * 14).toFixed(0)},${(-3 + r() * 6).toFixed(0)}" stroke="#c8a24a" stroke-width="2.5" opacity=".8"/>`;
    for (let i = 0; i < 6; i++) s += `<path d="M${(r() * 1200).toFixed(0)},${(630 + r() * 70).toFixed(0)} q6,-10 14,-2 q-6,4 -14,2" fill="#e9e9f2" stroke="${OL}" stroke-width="1"/>`;
    // kleine Tür links (Ausgang)
    s += `<rect x="40" y="470" width="110" height="140" fill="#9ab8d6" stroke="${OL}" stroke-width="4"/><path d="M40,610 V490 Q95,454 150,490 V610 Z" fill="#c8dcef" opacity=".55"/>`;
    // Lichtkegel
    s += `<defs><radialGradient id="gLamp" cx="${(G.state.px / 1280).toFixed(3)}" cy=".62" r=".75"><stop offset="0" stop-color="#ffe8a8" stop-opacity=".35"/><stop offset=".5" stop-color="#ffcf7a" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><rect x="0" y="0" width="1280" height="720" fill="url(#gLamp)"/>`;
    s += A.vignette(0.75);
    return s;
  }

  function dark() {
    let s = `<rect x="0" y="0" width="1280" height="720" fill="#07050b"/>`;
    s += `<rect x="40" y="470" width="110" height="140" fill="#2c3a52"/><path d="M40,610 L-40,720 H260 L150,610 Z" fill="#1d2536" opacity=".8"/>`;
    s += `<g class="twinkle"><circle cx="890" cy="398" r="5" fill="#ffb347"/><circle cx="906" cy="398" r="5" fill="#ffb347"/></g>`;
    s += `<g class="twinkle t3"><circle cx="420" cy="220" r="3" fill="#ffb347" opacity=".6"/><circle cx="430" cy="220" r="3" fill="#ffb347" opacity=".6"/></g>`;
    return s;
  }

  async function lightUp() {
    await G.say('fini', 'Gut, dass ich Gustls Lampe dabeihab. Kurbel, kurbel, kurbel...');
    G.flag('loft_lit');
    G.refresh();
    await G.wait(300);
    await G.say('fini', 'Licht! Und... oh. Hallo, ihr alle.');
    await G.say('gurrbert', 'Gurr.');
  }

  async function sendPigeon() {
    await G.say('fini', 'Okay, Gurrbert. Das hier muss zum Rennleiter. Zum Bärenbuckel. Schnell!');
    G.take('formular_voll');
    await G.say('fini', '*Formular einrollen*... *an das Bein binden*... Sitzt!');
    await G.say('gurrbert', 'GURR!');
    // Wegfliegen
    const a = G.actor('gurrbert');
    const el = document.getElementById('actor-gurrbert');
    if (a && el) {
      const x0 = a.x, y0 = a.y;
      const t0 = performance.now();
      await new Promise((res) => {
        if (G.fast) { res(); return; }
        function step(now) {
          const t = Math.min(1, (now - t0) / 1600);
          const x = x0 + (1050 - x0) * t, y = y0 + (200 - y0) * t - Math.sin(t * Math.PI) * 60;
          el.setAttribute('transform', `translate(${x},${y}) scale(${1.3 * (1 - t * 0.6)})`);
          el.style.opacity = String(1 - Math.max(0, (t - 0.75) * 4));
          if (t < 1) requestAnimationFrame(step); else res();
        }
        requestAnimationFrame(step);
      });
    }
    G.flag('pigeon_sent');
    await G.say('fini', 'Flieg, Gurrbert! Flieg wie der Wind! ...Oder wenigstens wie eine Taube.');
    await G.say('fini', 'Jetzt schnell zum Bärenbuckel. Mal sehen, ob er ankommt. Und ob der Rennleiter Pferde mag.');
  }

  const gurrItems = {
    jute: async () => {
      if (f('pigeon_sent')) {
        await G.say('fini', 'Ich bau dir den Jutebeutel ins Nest, Gurrbert. Fair gehandelt. Viel gemütlicher als ein alter Handschuh. Tausch!');
      } else {
        await G.say('fini', 'Hier, Gurrbert. Ein fair gehandelter Jutebeutel. Viel gemütlicher als ein alter Handschuh. Ehrlich.');
        await G.say('gurrbert', 'Gurr...?');
        await G.say('gurrbert', '*zupf* *zupf* *plusterplusterplustern*');
        await G.say('gurrbert', 'GURR!');
      }
      G.take('jute'); G.take('handschuh'); G.flag('glove_back'); G.flag('glove_seen');
      G.give('handschuhe');
      G.refresh();
      await G.say('fini', 'Er hat getauscht! Mein Handschuh! Etwas federig. Und er riecht nach Taube. Aber er ist MEINER!');
      await G.say('fini', 'Rechte Hand, ich hab dich so vermisst. Ihr seid wieder komplett.');
    },
    broesel: async () => {
      if (f('gurrbert_fed')) { await G.say('fini', 'Er hat schon gegessen. Mehr Brösel und er kann nicht mehr fliegen. Dann rollt er.'); return; }
      await G.say('fini', 'Gurrbert! Schau mal: Brezn-Brösel vom Kreitmampf!');
      G.take('broesel'); G.flag('gurrbert_fed');
      await G.say('gurrbert', '*pick* *pick* *pickpickpickpick*');
      await G.say('gurrbert', 'GURRRR.');
      await G.say('fini', 'Er schaut jetzt sehr motiviert. Für eine Taube jedenfalls.');
      if (has('formular_voll')) await G.say('fini', 'Jetzt kann ich ihm das Formular geben!');
    },
    formular_voll: async () => {
      if (!f('gurrbert_fed')) {
        await G.say('gurrbert', 'Gurr.');
        await G.say('fini', 'Er dreht den Kopf weg. Er will erst was essen. Herr Glöckl hat gesagt: Brezn-Brösel vom Kreitmampf.');
        G.flag('know_broesel');
        return;
      }
      await sendPigeon();
    },
    formular: async () => { await G.say('fini', 'Ich sollte das Formular erst ausfüllen. Sonst meldet Gurrbert einfach niemanden an. Oder sich selbst.'); },
    handschuh: async () => { await G.say('fini', 'Ich schenk ihm doch nicht auch noch meinen linken Handschuh! Dann hab ich null. Null ist weniger als eins. Hab ich gelernt.'); },
    lampe: async () => { await G.say('gurrbert', 'Gurr.'); await G.say('fini', 'Er blinzelt ins Licht. Er findet, ich soll das Ding woanders hinhalten.'); },
    kaugummi: async () => { await G.say('fini', 'Kaugummi für Tauben? Nein. Das ist Tierquälerei. Und Kaugummiverschwendung.'); },
    '*': async () => { await G.say('gurrbert', 'Gurr.'); await G.say('fini', 'Er schaut mich an, als hätte ich ihm eine Steuererklärung hingehalten.'); },
  };

  async function gurrTalk() {
    await G.talk('gurrbert', () => [
      { t: 'Hallo Gurrbert! Ich bin Fini.', once: 'gurr_hello',
        run: async () => {
          await G.say('gurrbert', 'Gurr.');
          await G.say('fini', 'Er sagt: „Freut mich.“ Glaub ich. Oder: „Hau ab.“ Taubisch ist schwierig.');
        } },
      { t: 'Ist das... MEIN Handschuh in deinem Nest?!', if: !f('glove_back'),
        run: async () => {
          await G.say('gurrbert', 'Gurr! *plustert sich auf*');
          G.flag('glove_seen');
          await G.say('fini', 'Er hat ihn als Nestpolster eingebaut. Er sieht sehr gemütlich aus darin. Mist.');
          await G.say('fini', 'Wenn ich ihm was anderes zum Reinkuscheln gebe, tauscht er vielleicht.');
        } },
      { t: 'Kannst du eine Nachmeldung zum Bärenbuckel fliegen?', if: f('met_wimmer') && !f('pigeon_sent'),
        run: async () => {
          if (!f('gurrbert_fed')) {
            await G.say('gurrbert', 'Gurr. *dreht den Kopf weg*');
            await G.say('fini', 'Er will erst was essen. Herr Glöckl hat gesagt: Brezn-Brösel vom Kreitmampf. Ohne fliegt er nicht.');
            G.flag('know_broesel');
            return;
          }
          if (has('formular_voll')) { await sendPigeon(); return 'end'; }
          if (has('formular')) { await G.say('fini', 'Moment, das Formular ist noch leer. Ich brauch einen Stift.'); return; }
          await G.say('fini', 'Ich brauch erst das Nachmeldeformular. Das hat der Rennleiter.');
        } },
      { t: 'Tschüss, Gurrbert.', end: true, run: async () => { await G.say('gurrbert', 'Gurr.'); } },
    ]);
  }

  G.scenes.taubenschlag = {
    title: 'Im Taubenschlag',
    walk: { x1: 170, x2: 1100, y1: 628, y2: 704, s1: 0.74, s2: 0.82 },
    entry: { x: 200, y: 680 },
    speakers: { gurrbert: [898, 370] },
    draw(st) { return f('loft_lit') ? lit(st) : dark(); },
    actors(st) {
      if (!f('loft_lit') || f('pigeon_sent')) return [];
      return [{ id: 'gurrbert', x: 880, y: 468, s: 1.3, svg: C.gurrbert(), head: -110, headX: 30 }];
    },
    async onEnter() {
      if (!f('loft_lit')) {
        await G.say('fini', 'Stockdunkel! Ich seh nicht mal meine eigene Nasenspitze. Und die ist ziemlich prominent.');
        await G.say('gurrbert', 'Gurr.');
        await G.say('fini', '...und irgendwas gurrt mich an.');
        G.flag('loft_dark_seen');
        if (has('lampe')) await lightUp();
        else await G.say('fini', 'Ich brauch Licht. Eine Taschenlampe oder so. Oder einen sehr hellen Gedanken.');
      }
    },
    hotspots(st) {
      if (!f('loft_lit')) {
        return [
          { name: 'Dunkelheit', r: [200, 0, 1080, 610], walk: false,
            look: 'Dunkel. Sehr dunkel. So dunkel wie mein Gedächtnis, wenn mich jemand fragt, wo ich etwas hingelegt habe.',
            use: async () => { await G.say('fini', 'Ich taste mich vor... *BONK*. Das war ein Balken. Oder meine Stirn. Vermutlich beides.'); },
            items: { lampe: lightUp, '*': async () => { await G.say('fini', 'Im Dunkeln bringt das nichts. Ich brauch Licht.'); } } },
          { name: 'Leuchtende Augen', r: [870, 380, 50, 36], walk: false, look: 'Zwei kleine orange Augen. Sie starren mich an. Ich starre zurück. Wer zuerst blinzelt, verliert.',
            items: { lampe: lightUp } },
          { name: 'Hinaus auf den Marktplatz', r: [30, 460, 130, 160], walk: [200, 680], exit: { to: 'marktost', x: 960, y: 598, face: 1 } },
        ];
      }
      return [
        { name: 'Ausflugsluke', r: [930, 90, 240, 192], walk: [1000, 650], look: 'Die Ausflugsluke. Durch die fliegen die Tauben raus. Ich würde auch gern einfach losfliegen. Aber ich hab Höhenangst. Und keine Flügel.' },
        { name: 'Nistkästen', r: [346, 156, 340, 180], walk: [500, 650], look: ['Lauter Nistkästen. In jedem wohnt eine Taube. Wie eine Wohngemeinschaft.', 'Mit sehr strengen Regeln: Keine Katzen. Keine Besuche nach acht. Keine Krümel liegen lassen. Außer für alle.'] },
        { name: 'Futtertrog', r: [86, 550, 240, 54], walk: [260, 650], look: '„NUR KÖRNER“. Das ist hier die Hausordnung. Gurrbert hält sich offenbar nicht dran.' },
        !f('foto_taken') && { name: 'Altes Foto', r: [262, 210, 84, 76], walk: [320, 650],
          look: 'Ein altes Schwarz-Weiß-Foto an einem Nagel. Ein Mann auf einem Holzschlitten, der strahlt wie ein Christbaum.',
          use: async () => {
            await G.say('fini', 'Hinten steht was drauf: „Kufen-Gaudi 1953 – Sieger: Alois Speichl“.');
            await G.say('fini', 'Speichl? Wie Gustl Speichl? Das muss ich ihm zeigen!');
            G.flag('foto_taken'); G.give('foto');
          } },
        { name: 'Kiste „Brieftauben-Post“', r: [790, 476, 190, 134], walk: [880, 660], look: '„Brieftauben-Post – seit 1953“. Die Grafinger nehmen ihre Tauben ernst.' },
        !f('pigeon_sent') && { name: 'Gurrbert', r: [820, 330, 140, 140], walk: [860, 660], face: 'r',
          look: () => f('glove_back') ? 'Gurrbert sitzt stolz auf seinem neuen Jute-Nest. „Kein Plastik“. Er ist jetzt eine nachhaltige Taube.' : ['Gurrbert. Eine dicke graue Brieftaube mit grünem Hals.', 'Er sitzt auf einem Nest aus Stroh und... MOMENT. Ist das MEIN HANDSCHUH?!'],
          use: gurrTalk,
          items: gurrItems },
        !f('glove_back') && { name: 'Nest mit Handschuh', r: [890, 430, 80, 50], walk: [900, 660],
          look: 'Mein rechter Fäustling! Eingebaut in ein Taubennest. Er sieht sehr glücklich aus. Der Handschuh. Und die Taube.',
          use: async () => {
            if (f('pigeon_sent')) {
              await G.say('fini', 'Gurrbert ist unterwegs. Ich könnte mir den Handschuh einfach schnappen...');
              await G.say('fini', '...aber dann kommt er heim und sein Nest ist kaputt. Das wäre gemein. Ich lass ihm was Weiches als Ersatz da.');
              G.flag('glove_seen');
              return;
            }
            await G.say('fini', 'Ich nehm mir einfach meinen Handschuh zurück...');
            await G.say('gurrbert', 'GURR! *hack*');
            await G.say('fini', 'AUTSCH! Er hackt nach mir! Okay, okay! Du brauchst Ersatz-Nestmaterial. Verstanden.');
            G.flag('glove_seen');
          },
          items: gurrItems },
        { name: 'Hinaus auf den Marktplatz', r: [30, 460, 130, 160], walk: [200, 680], exit: { to: 'marktost', x: 960, y: 598, face: 1 } },
      ];
    },
  };
})();
