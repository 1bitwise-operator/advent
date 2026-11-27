/* Szene: Schlittenhang am Bärenbuckel – Start des Kufen-Gaudis */
(function () {
  'use strict';
  const OL = A.OL;
  const f = G.f, has = G.has;

  function fir(x, y, h) {
    let s = `<rect x="${x - 6}" y="${y - h * 0.12}" width="12" height="${h * 0.12}" fill="#5a3824" stroke="${OL}" stroke-width="2.5"/>`;
    for (let i = 0; i < 3; i++) {
      const b = y - h * 0.1 - i * h * 0.26, w = h * (0.36 - i * 0.09);
      s += `<path d="M${x - w},${b} L${x},${b - h * 0.4} L${x + w},${b} Z" fill="#2f5e45" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      s += `<path d="M${x - w * 0.8},${b - 4} Q${x},${b - h * 0.1} ${x + w * 0.8},${b - 4}" fill="none" stroke="#fbfdff" stroke-width="6" stroke-linecap="round"/>`;
    }
    s += `<path d="M${x - 10},${y - h * 0.84} L${x},${y - h} L${x + 10},${y - h * 0.84} Z" fill="#fbfdff" stroke="${OL}" stroke-width="2"/>`;
    return s;
  }

  function town() {
    let s = '';
    s += `<path d="M0,430 L40,400 L80,420 L120,380 L170,410 L230,370 L280,400 L330,390 L360,420 L360,470 L0,470 Z" fill="#6b5f95" stroke="${OL}" stroke-width="2"/>`;
    // Kirchturm St. Ägidius
    s += `<rect x="170" y="270" width="34" height="140" fill="#7d71a8" stroke="${OL}" stroke-width="2.5"/><path d="M160,272 L187,200 L214,272 Z" fill="#5d528a" stroke="${OL}" stroke-width="2.5"/><circle cx="187" cy="300" r="8" fill="#ffe9a6"/>`;
    s += `<path d="M260,380 V330 h22 v-14 a10,10 0 0 1 20,0 v14 h0 V380" fill="#7d71a8" stroke="${OL}" stroke-width="2"/>`;
    const r = A.rng(17);
    for (let i = 0; i < 30; i++) s += `<rect x="${(r() * 350).toFixed(0)}" y="${(395 + r() * 70).toFixed(0)}" width="5" height="6" fill="#ffd36e" opacity="${(0.5 + r() * 0.5).toFixed(2)}"/>`;
    return s;
  }

  function hill() {
    let s = '';
    // ferne Hügel
    s += `<path d="M0,380 Q300,300 640,340 Q980,300 1280,330 V720 H0 Z" fill="#c9d6ec"/>`;
    s += town();
    // der Hang: von rechts oben (Start) nach links unten
    s += `<path d="M360,470 Q520,520 700,590 L1280,560 V720 H0 V470 Z" fill="url(#gSnowShade)" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M0,470 Q300,450 360,470" fill="none" stroke="${OL}" stroke-width="3"/>`;
    // Rodelspur
    s += `<path d="M720,630 Q450,600 140,450" fill="none" stroke="#b8c8e0" stroke-width="40" stroke-linecap="round" opacity=".7"/>`;
    s += `<path d="M720,615 Q450,585 140,440 M720,645 Q450,615 140,460" fill="none" stroke="#9fb3d4" stroke-width="3" opacity=".8"/>`;
    // Strohballen am Rand
    for (const [x, y, sc] of [[560, 566, 0.9], [430, 530, 0.7], [300, 490, 0.55], [600, 672, 1.0], [470, 640, 0.8]]) {
      s += `<g transform="translate(${x},${y}) scale(${sc})"><rect x="-34" y="-26" width="68" height="34" rx="6" fill="#e2c26a" stroke="${OL}" stroke-width="3"/><path d="M-30,-18 h60 M-30,-8 h60 M-30,2 h60" stroke="#b8962e" stroke-width="2"/><path d="M-30,-28 q30,-10 60,0" fill="#fbfdff" stroke="${OL}" stroke-width="2"/></g>`;
    }
    // Zuschauer
    const coats = ['#3f6fb5', '#7b3fa0', '#2f6e4a', '#b8322b', '#5b4a3a', '#e8663d', '#c0392b'];
    const r = A.rng(99);
    for (let i = 0; i < 9; i++) { const t = i / 9; s += A.crowdPerson(300 + t * 330 + r() * 20, 470 + t * 70 - 14, 0.34 + t * 0.25, coats[i % 7], coats[(i + 3) % 7]); }
    for (let i = 0; i < 6; i++) { const t = i / 6; s += A.crowdPerson(240 + t * 300 + r() * 20, 560 + t * 70, 0.4 + t * 0.25, coats[(i + 2) % 7], coats[(i + 5) % 7]); }
    return s;
  }

  function startBanner() {
    let s = '';
    for (const x of [600, 860]) {
      s += `<rect x="${x - 7}" y="270" width="14" height="350" fill="#8a5a36" stroke="${OL}" stroke-width="3"/>`;
      s += `<circle cx="${x}" cy="266" r="10" fill="#d63a3a" stroke="${OL}" stroke-width="2.5"/>`;
    }
    s += `<path d="M607,290 Q730,310 853,290 L853,350 Q730,370 607,350 Z" fill="#fff7e8" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M607,290 Q730,310 853,290 L853,302 Q730,322 607,302 Z" fill="#d63a3a"/><path d="M607,338 Q730,358 853,338 L853,350 Q730,370 607,350 Z" fill="#2f6e4a"/>`;
    s += A.text(730, 333, 'START · 73. Kufen-Gaudi', { fs: 19, fill: '#2a1f2d', maxw: 230 });
    s += A.lights(600, 276, 860, 276, 8, 9, 71);
    // Startlinie
    s += `<path d="M640,622 L860,612" stroke="#d63a3a" stroke-width="7" stroke-dasharray="14 10"/>`;
    // Zeitnehmer-Tisch
    s += `<rect x="960" y="560" width="120" height="12" fill="#a8744a" stroke="${OL}" stroke-width="3"/><path d="M970,572 V612 M1070,572 V612" stroke="${OL}" stroke-width="5"/>`;
    s += `<rect x="962" y="526" width="64" height="34" rx="4" fill="#2f3440" stroke="${OL}" stroke-width="2"/><rect x="968" y="532" width="52" height="20" fill="#7cf0a0"/>` + A.text(994, 548, "00:00", { fs: 15, fill: OL, font: "Courier New, monospace", maxw: 48 });
    s += `<path d="M1030,560 h20 l-2,-20 h-16 Z" fill="#fff" stroke="${OL}" stroke-width="2"/><path class="steam" d="M1040,532 q-6,-10 0,-18" stroke="#fff" stroke-width="3" fill="none"/>`;
    s += `<path d="M1050,556 q14,-10 26,-2 q-6,8 -26,2 Z" fill="#e9b07a" stroke="${OL}" stroke-width="2"/>`;
    return s;
  }

  function turboKufe(st) {
    let s = A.shadow(0, 0, 90);
    s += `<path d="M-90,-6 Q-100,6 -84,8 H80 Q100,8 98,-10" fill="none" stroke="${OL}" stroke-width="7"/><path d="M-90,-6 Q-100,6 -84,8 H80 Q100,8 98,-10" fill="none" stroke="#c8ccd6" stroke-width="3.5"/>`;
    s += `<path d="M-84,-8 L-70,-40 H70 L92,-14 Q60,-2 -84,-8 Z" fill="#c8ccd6" stroke="${OL}" stroke-width="3"/>`;
    s += `<path d="M-60,-30 L70,-30" stroke="#e9ff3a" stroke-width="5"/>`;
    s += `<path d="M-74,-40 Q-80,-64 -50,-60 L-40,-40 Z" fill="#23252e" stroke="${OL}" stroke-width="3"/>`;
    s += A.text(4, -15, 'TURBOKUFE X', { fs: 13, fill: '#23252e', maxw: 120 });
    if (!f('cheat_exposed')) {
      s += `<rect x="60" y="-46" width="30" height="20" rx="4" fill="#23252e" stroke="${OL}" stroke-width="2.5"/><path d="M68,-40 h14 M68,-34 h14" stroke="#e9ff3a" stroke-width="2"/>`;
      s += `<path d="M90,-34 Q140,-20 160,10 Q200,30 260,20" fill="none" stroke="${OL}" stroke-width="6"/><path d="M90,-34 Q140,-20 160,10 Q200,30 260,20" fill="none" stroke="#ff8a00" stroke-width="3"/>`;
    } else {
      s += `<g transform="translate(130,6) rotate(18)"><rect x="-16" y="-14" width="32" height="22" rx="4" fill="#23252e" stroke="${OL}" stroke-width="2.5"/><path d="M-8,-8 h14 M-8,-2 h14" stroke="#e9ff3a" stroke-width="2"/><path d="M16,-4 q30,6 40,20" fill="none" stroke="#ff8a00" stroke-width="3"/></g>`;
    }
    return s;
  }

  function raceSled(rider, c) {
    // seitliche Ansicht: Schlitten mit Fahrer
    if (rider === 'fini') {
      return `<g>
        <path d="M-50,0 Q-58,10 -44,10 H44 Q56,10 52,-4" fill="none" stroke="${OL}" stroke-width="6"/><path d="M-50,0 Q-58,10 -44,10 H44 Q56,10 52,-4" fill="none" stroke="#c0c6cf" stroke-width="3"/>
        <rect x="-44" y="-12" width="90" height="12" rx="3" fill="#d63a3a" stroke="${OL}" stroke-width="2.5"/>
        <path d="M-20,-8 l10,4 l-4,4 l12,2" stroke="#ffd36e" stroke-width="3" fill="none"/>
        <path d="M-24,-12 Q-26,-46 -2,-50 Q20,-48 18,-12 Z" fill="#ee7a3a" stroke="${OL}" stroke-width="3"/>
        <path d="M10,-24 L40,-14" stroke="#ee7a3a" stroke-width="10" stroke-linecap="round"/><circle cx="42" cy="-14" r="6" fill="#2f8f8b" stroke="${OL}" stroke-width="2"/>
        <circle cx="0" cy="-66" r="18" fill="#f6cfae" stroke="${OL}" stroke-width="3"/>
        <path d="M-20,-70 Q-18,-96 2,-96 Q22,-94 20,-70 Z" fill="#9cff3a" stroke="${OL}" stroke-width="3"/>
        <path d="M-18,-60 l-24,-10 M-18,-58 l-22,4" stroke="#b8492d" stroke-width="5" stroke-linecap="round"/>
        <circle cx="8" cy="-68" r="3" fill="${OL}"/><path d="M4,-58 q6,4 12,-2" stroke="${OL}" stroke-width="2.5" fill="none"/>
        <path d="M-10,-50 L-26,-40 L-40,-44" stroke="#f4c542" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M-80,-30 h-30 M-90,-10 h-40 M-76,-50 h-24" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
      </g>`;
    }
    return `<g>
      <path d="M-50,0 Q-58,10 -44,10 H44 Q56,10 52,-4" fill="none" stroke="${OL}" stroke-width="6"/><path d="M-50,0 Q-58,10 -44,10 H44 Q56,10 52,-4" fill="none" stroke="#c8ccd6" stroke-width="3"/>
      <path d="M-44,-2 L-36,-16 H40 L52,-4 Z" fill="#c8ccd6" stroke="${OL}" stroke-width="2.5"/><path d="M-30,-10 H40" stroke="#e9ff3a" stroke-width="3"/>
      <path d="M-22,-14 Q-24,-46 0,-50 Q20,-48 18,-14 Z" fill="#c8ccd6" stroke="${OL}" stroke-width="3"/>
      <circle cx="0" cy="-66" r="18" fill="#f5d0b5" stroke="${OL}" stroke-width="3"/>
      <path d="M-18,-74 l-4,-22 l10,10 l6,-16 l6,14 l8,-12 l2,22 Z" fill="#f2d36b" stroke="${OL}" stroke-width="2.5"/>
      <rect x="-14" y="-78" width="30" height="10" rx="5" fill="#7fe3ff" stroke="${OL}" stroke-width="2"/>
      <path d="M-80,-30 h-30 M-90,-10 h-40" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    </g>`;
  }

  // ---------- Dialoge ----------
  async function wimmerFirst() {
    G.flag('met_wimmer');
    await G.say('wimmer', 'ACHTUNG, ACHTUNG! HIER SPRICHT DIE RENNLEITUNG!');
    await G.say('fini', 'Ich steh direkt neben Ihnen.');
    await G.say('wimmer', 'Des Megafon is aus Prinzip an. Was willst, Madl?');
    await G.say('fini', 'Ich will beim Kufen-Gaudi mitfahren! Fini Brandl!');
    await G.say('wimmer', '*blätter* Brandl... Brandl... Steht ned auf der Liste.');
    await G.say('fini', 'Ich wollte mich... jetzt anmelden?');
    await G.say('wimmer', 'Anmeldeschluss war gestern. Nachmeldung nur nach Paragraph 4 der Satzung von 1953:');
    await G.say('wimmer', 'PER BRIEFTAUBE!');
    await G.say('fini', 'Per... Brieftaube.');
    await G.say('wimmer', 'Persönliche Abgabe is verboten. Wegen Bestechungsgefahr. 1961 hat oaner versucht, die Rennleitung mit Weißwürscht zu bestechen.');
    await G.say('wimmer', 'Es hätt fast funktioniert. Seitdem: Brieftaube.');
    await G.say('wimmer', 'Die Taube wohnt im Taubenschlag am Marktplatz, gegenüber vom Kircherl. Den Schlüssel hat der Mesner Glöckl. Da, des Formular.');
    G.give('formular');
    await G.say('wimmer', 'Und außerdem, laut Satzung: Paragraph 2 – a Schlitten. Paragraph 9 – beidhändige Behandschuhung. Paragraph 11 – Helmpflicht.');
    await G.say('wimmer', 'Und Paragraph 7 – Antrieb ausschließlich durch Schwerkraft. Und Willenskraft.');
    await G.say('fini', '*schaut auf ihre nackte rechte Hand* ...Beidhändig. Natürlich.');
    await G.say('wimmer', 'Start is um vier. Pünktlich. Sobald i mei Leberkässemmel aufg’gessen hab.');
  }

  function missing() {
    const m = [];
    if (!f('registered')) m.push('Paragraph 4: Anmeldung per Brieftaube – fehlt');
    if (!has('schlitten')) m.push('Paragraph 2: Schlitten – fehlt');
    if (!f('glove_back')) m.push('Paragraph 9: beidhändige Behandschuhung – fehlt');
    if (!has('helm')) m.push('Paragraph 11: Helm – fehlt');
    return m;
  }

  async function checklist() {
    const m = missing();
    if (!m.length) { await G.say('wimmer', 'Alles beinand, Madl. Von mir aus kann’s losgehen.'); return; }
    await G.say('wimmer', 'Laut Satzung fehlt no: ' + m.join('. ') + '.');
  }

  async function exposeCheat() {
    G.take('prospekt');
    await G.say('fini', 'Herr Wimmer! Hier! Der Prospekt von Konstantins Schlitten: „Mit diskretem 2000-Watt-Rückenwind-Motor“!');
    await G.say('wimmer', '*liest* ... „Nicht für Wettkämpfe zugelassen“...');
    await G.say('wimmer', 'PARAGRAPH SIEBEN! ANTRIEB AUSSCHLIESSLICH DURCH SCHWERKRAFT!');
    await G.say('wimmer', 'Protzinger! Motor raus! Und des Kabel von der Gerti a!');
    await G.say('konstantin', 'Aber... mein Papa hat gesagt...');
    await G.say('wimmer', 'Dei Papa fahrt ned mit.');
    await G.say('konstantin', '*klapper* *zerr* ...Na gut. Dann gewinn ich halt so. Mit purem Talent.');
    G.flag('cheat_exposed');
    G.refresh();
    await G.say('fini', 'Fair bleiben, Konstantin. Das hätte Frau Fairhuber gesagt.');
  }

  async function preRace() {
    await G.say('wimmer', 'ACHTUNG! ALLE FAHRER AN DEN START!');
    await G.say('konstantin', '*BRRRRRRMMMMMMM*');
    await G.say('fini', 'Moment! STOPP! Sein Schlitten hat gerade GEBRUMMT!');
    await G.say('konstantin', 'Das war... mein Magen. Ich hab heute noch nichts gegessen.');
    await G.say('fini', 'Ein Magen mit Auspuff?!');
    await G.say('wimmer', 'Madl, ohne Beweis koa Protest. Paragraph 15.');
    G.flag('cheat_suspected');
    if (has('prospekt')) {
      await G.say('fini', 'Ich HAB einen Beweis!');
      await exposeCheat();
      return true;
    }
    await G.say('wimmer', 'I geb dir Zeit, bis i mei Leberkässemmel aufg’gessen hab. *mampf*');
    await G.say('wimmer', 'I iss langsam. Sehr langsam. Für di.');
    await G.say('fini', 'Irgendwo muss es einen Beweis geben. Etwas Schriftliches. Wimmer liebt Schriftliches.');
    return false;
  }

  async function race() {
    const sc = G.scenes.schlittenhang;
    G.flag('racing');
    sc.noPlayer = true;
    G.refresh();
    await G.say('wimmer', 'Startnummer 13, Brandl! Startnummer 1, Protzinger! Auf die Plätze...');
    await G.say('wimmer', 'Fertig...');
    await G.say('wimmer', 'TRRRRRRIIIIIIIIT!');
    const fg = document.getElementById('layer-fg');
    fg.innerHTML = `<g id="sled-k">${raceSled('k')}</g><g id="sled-f">${raceSled('fini')}</g>`;
    const ek = document.getElementById('sled-k'), ef = document.getElementById('sled-f');
    const P = (p, off) => {
      const sx = 760, sy = 620 + off, cx = 450, cy = 600 + off, fx = 120, fy = 440 + off * 0.4;
      const u = 1 - p;
      return [u * u * sx + 2 * u * p * cx + p * p * fx, u * u * sy + 2 * u * p * cy + p * p * fy, 0.9 - p * 0.55];
    };
    const pk = (t) => (t < 0.45 ? t * 1.15 : 0.5175 + (t - 0.45) * 0.78);
    const pf = (t) => (t < 0.45 ? t * 0.9 : 0.405 + (t - 0.45) * 1.0818);
    let said1 = false, said2 = false, said3 = false;
    const T = 7000, t0 = performance.now();
    await new Promise((res) => {
      if (G.fast) { res(); return; }
      function step(now) {
        const t = Math.min(1, (now - t0) / T);
        const [kx, ky, ks] = P(Math.min(1, pk(t)), 18);
        const [fx, fy, fs] = P(Math.min(1, pf(t)), -10);
        ek.setAttribute('transform', `translate(${kx.toFixed(1)},${ky.toFixed(1)}) scale(${(-ks).toFixed(3)},${ks.toFixed(3)})`);
        ef.setAttribute('transform', `translate(${fx.toFixed(1)},${fy.toFixed(1)}) scale(${(-fs).toFixed(3)},${fs.toFixed(3)})`);
        // Reihenfolge: wer weiter vorne (unten) ist, wird oben gezeichnet
        if (ky > fy) fg.appendChild(ek); else fg.appendChild(ef);
        G.state.px = fx; G.state.py = fy + 60;
        if (t > 0.08 && !said1) { said1 = true; G.say('wimmer', 'Und los geht’s! Protzinger geht in Führung!', { dur: 2200 }); }
        if (t > 0.5 && !said2) { said2 = true; G.say('wimmer', 'Aber was is des?! Die Brandl holt auf! Und warum riecht’s auf einmal nach Zimt?!', { dur: 2600 }); }
        if (t > 0.84 && !said3) { said3 = true; G.say('fini', has('klingel') ? 'DING DING! Platz da, ich komme!' : 'JUHUUUUU!', { dur: 1800 }); }
        if (t < 1) requestAnimationFrame(step); else res();
      }
      requestAnimationFrame(step);
    });
    await G.wait(300);
    // Konfetti
    let conf = '';
    const r = A.rng(4);
    for (let i = 0; i < 60; i++) conf += `<rect x="${(r() * 1280).toFixed(0)}" y="${(r() * 400).toFixed(0)}" width="8" height="14" fill="${['#d63a3a', '#ffd36e', '#2f8f8b', '#9cff3a', '#7b3fa0'][i % 5]}" transform="rotate(${(r() * 180).toFixed(0)})" class="steam s${1 + (i % 3)}" opacity=".9"/>`;
    fg.insertAdjacentHTML('beforeend', conf);
    await G.say('wimmer', 'ZIEEEEL!!! Siegerin des 73. Grafinger Kufen-Gaudi: Startnummer 13 – FINI BRANDL!');
    await G.say('wimmer', 'Zweiter: Protzinger. Mit Abstand. Und ohne Motor.');
    // Siegerehrung
    sc.noPlayer = false;
    G.flag('racing', false);
    G.flag('won');
    G.place(660, 690, 1);
    G.render();
    await G.wait(400);
    await G.say('wimmer', 'Fini Brandl, im Namen der Rennleitung und laut Paragraph 20: die Goldene Kufe!');
    G.give('pokal');
    await G.say('fini', 'DIE GOLDENE KUFE! MEINE! Ich werde sie nie wieder loslassen!');
    await G.say('konstantin', 'Gratuliere... Brandl. Das war... okay. Für eine Holzkufe.');
    await G.say('fini', 'Danke, Konstantin. Du warst auch schnell. Für jemanden ohne Motor.');
    await G.say('konstantin', 'Nächstes Jahr bau ich ein Segel ein.');
    await G.say('wimmer', 'PARAGRAPH SIEBEN!');
    await G.say('gurrbert', 'Gurr!');
    await G.say('fini', 'Gurrbert! Du warst die beste Anmeldung, die ich je hatte. Die einzige, aber die beste.');
    await G.wait(400);
    await G.say('fini', 'Ich bin so glücklich! Ich hab an ALLES gedacht! Schlitten, Helm, Handschuhe, Anmeldung...');
    await G.say('fini', '...');
    await G.say('fini', 'Wieso hab ich trotzdem das Gefühl, dass ich irgendwas vergessen hab?');
    await G.wait(600);
    G.save();
    G.showEnding();
  }

  async function wimmerTalk() {
    if (!f('met_wimmer')) await wimmerFirst();
    if (f('pigeon_sent') && !f('registered')) {
      await G.say('wimmer', 'Ah, Madl! Grad eben is a Taube g’landet. Mit Brösel im Schnabel und am Formular am Bein.');
      await G.say('wimmer', '„Name: Josefine Brandl. Besondere Fähigkeiten: Schnellbremsen mit dem Gesicht.“ Und... a Pferd?');
      await G.say('fini', 'Das ist Deko.');
      await G.say('wimmer', 'Formal korrekt. Paragraph 4 erfüllt. Sie san nachg’meldet. Startnummer 13.');
      G.give('startnummer'); G.flag('registered');
    }
    await G.talk('wimmer', () => [
      { t: 'Ich bin startklar!', if: f('registered') && !f('won'),
        run: async () => {
          const m = missing();
          if (m.length) { await checklist(); return; }
          if (!f('cheat_exposed')) {
            if (f('cheat_suspected')) {
              await G.say('wimmer', 'Und? Hast an Beweis? Mei Leberkässemmel is bald weg.');
              if (!has('prospekt')) { await G.say('fini', 'Noch nicht... Ich such weiter!'); return; }
              await exposeCheat();
            } else {
              const ok = await preRace();
              if (!ok) return;
            }
          }
          await race();
          return 'end';
        } },
      { t: 'Was brauche ich nochmal alles für das Rennen?', if: !f('won'), run: checklist },
      { t: 'Konstantins Schlitten hat einen Motor! Hier ist der Beweis!', if: has('prospekt') && !f('cheat_exposed') && (f('read_prospekt') || f('cheat_suspected')), silent: true,
        run: async () => {
          if (!f('cheat_suspected')) G.flag('cheat_suspected');
          await exposeCheat();
        } },
      { t: 'Warum ausgerechnet per Brieftaube?', once: 'asked_pigeon_rule',
        run: async () => {
          await G.say('wimmer', 'Tradition, Madl! 1953 hat’s in Grafing no koa Telefon in jedem Haus geben. Aber Tauben scho.');
          await G.say('wimmer', 'Und a Taube lasst sich ned bestechen. Außer mit Brezn-Brösel. Aber des is a andere Satzung.');
        } },
      { t: 'Was steht eigentlich alles in der Satzung?', once: 'asked_satzung',
        run: async () => {
          await G.say('wimmer', 'Zweiundzwanzig Paragraphen. Paragraph 13: Koa Rodeln rückwärts. Paragraph 14: Koa Rodeln mit Haustier.');
          await G.say('wimmer', 'Paragraph 18: Wer jodelt, muss vorher anmelden. Paragraph 21: Der Rennleiter hat immer recht.');
          await G.say('fini', 'Und Paragraph 22?');
          await G.say('wimmer', 'Siehe Paragraph 21.');
        } },
      { t: 'Bis gleich!', end: true, run: async () => { await G.say('wimmer', 'Pünktlich sein, Madl! Sobald mei Leberkässemmel weg is, wird g’startet!'); } },
    ]);
  }

  async function konstantinTalk() {
    if (!f('met_konstantin')) {
      G.flag('met_konstantin');
      await G.say('konstantin', 'Na, wen haben wir denn da? Die kleine Brandl. Ohne Schlitten. Ohne Plan. Ohne zweiten Handschuh.');
      await G.say('fini', 'Ich hab einen Plan! Er ist nur... noch nicht fertig.');
      await G.say('konstantin', 'Das hier ist die TurboKufe X. Carbon. Beheizter Sitz. Bluetooth. Kostet mehr als dein Haus.');
      await G.say('fini', 'Wir wohnen zur Miete.');
      await G.say('konstantin', 'Siehste.');
    }
    await G.talk('konstantin', () => [
      { t: 'Wozu braucht ein Schlitten Bluetooth?', once: 'asked_bt',
        run: async () => {
          await G.say('konstantin', 'Für Musik. Ich fahre nur mit epischer Musik. Sonst ist es nicht cinematisch.');
          await G.say('fini', 'Ich fahr mit dem Geräusch von Wind und meinem eigenen Kreischen.');
        } },
      { t: 'Was ist das für ein Kabel an deinem Schlitten?', if: !f('cheat_exposed'),
        run: async () => {
          await G.say('konstantin', 'Äh. Handy-Ladekabel. Mein Handy ist... im Schlitten. Eingebaut. Total normal.');
          await G.say('fini', 'Ein Kabel, das achthundert Meter bis zur Glühweinbude geht. Total normal.');
          await G.say('konstantin', '...Woher weißt du das?!');
          G.flag('cheat_suspected');
        } },
      { t: 'Ohne Motor jetzt, hm?', if: f('cheat_exposed') && !f('won'),
        run: async () => {
          await G.say('konstantin', 'Pfff. Ich brauch keinen Motor. Ich hab Talent. Und beheizte Sitze.');
        } },
      { t: 'Möge die bessere Kufe gewinnen!', if: !f('won'),
        run: async () => { await G.say('konstantin', 'Werde ich. Ich BIN die bessere Kufe.'); } },
      { t: 'Tschüss!', end: true, run: async () => { await G.say('konstantin', 'Wir sehen uns im Ziel, Brandl. Also, ich seh dich. Von vorne.'); } },
    ]);
  }

  G.scenes.schlittenhang = {
    title: 'Schlittenhang am Bärenbuckel',
    outdoor: true,
    walk: { x1: 640, x2: 1240, y1: 628, y2: 704, s1: 0.68, s2: 0.78 },
    entry: { x: 1160, y: 660 },
    speakers: {},
    draw(st) {
      let s = A.defs();
      s += A.sky('skySH', [[0, '#1c2350'], [0.45, '#4b4a86'], [0.8, '#c47f9a'], [1, '#f2b48a']]);
      s += A.stars(70, 91, 260);
      s += A.glow(260, 90, 90, 'gCool', 0.9) + `<circle cx="260" cy="90" r="28" fill="#fff6d8" stroke="${OL}" stroke-width="3"/>`;
      s += hill();
      s += fir(1180, 560, 300) + fir(1040, 520, 200) + fir(1260, 600, 220);
      s += startBanner();
      if (f('pigeon_sent') && !f('racing')) s += `<g transform="translate(600,262) scale(0.4)" class="bob">${C.gurrbert({ hat: true })}</g>`;
      s += A.exitArrow(1254, 640, 'r', 'Zurück in die Stadt');
      return s;
    },
    actors(st) {
      const out = [{ id: 'wimmer', x: 760, y: 640, s: 0.8, svg: C.wimmer({ megaphone: true }), head: -330 }];
      if (!f('racing')) {
        out.push({ id: 'konstantin', x: 960, y: 662, s: 0.76, svg: C.konstantin(), head: -310, flip: true });
        out.push({ id: 'turbokufe', x: 1070, y: 690, s: 0.9, svg: turboKufe(st) });
      }
      if (f('pigeon_sent')) out.push({ id: 'gurrbert', x: 600, y: 262, s: 0.4, svg: '', head: -110 });
      return out;
    },
    hotspots(st) {
      if (f('racing')) return [];
      return [
        { name: 'Grafing in der Abendsonne', r: [0, 200, 360, 270], walk: [700, 640], look: ['Da unten liegt Grafing. Mit dem Kirchturm von St. Ägidius und lauter kleinen Lichtern.', 'Von hier oben sieht es aus wie ein Lebkuchendorf. Ein sehr leckeres Lebkuchendorf.'] },
        { name: 'Rodelbahn', p: [140, 440, 720, 610, 720, 650, 140, 470], walk: [700, 650], look: 'Die Rodelbahn. Steil, glatt, perfekt. Unten wartet der Ruhm. Und Strohballen. Hoffentlich in dieser Reihenfolge.' },
        { name: 'Zuschauer', r: [230, 450, 400, 140], walk: [680, 650], look: 'Halb Grafing ist da. Mit Thermoskannen, Lebkuchen und sehr hohen Erwartungen.' },
        { name: 'Start-Banner', r: [600, 260, 260, 110], walk: [730, 640], look: '„START · 73. Kufen-Gaudi“. Mir wird ganz kribbelig. Das könnte Aufregung sein. Oder Hunger.' },
        f('pigeon_sent') && { name: 'Gurrbert', r: [578, 218, 50, 46], walk: [680, 640], look: 'Gurrbert sitzt auf dem Startpfosten. Mit einer kleinen roten Mütze. Woher hat er die?! Tauben haben Geheimnisse.' },
        { name: 'Zeitnehmer-Tisch', r: [956, 520, 130, 60], walk: [1000, 650], look: 'Eine Stoppuhr, ein Tee und eine halbe Leberkässemmel. Das Equipment der Rennleitung.' },
        { name: 'Tannen', r: [1000, 220, 280, 340], walk: [1150, 650], look: 'Tannen mit Schneehauben. Wie Christbäume, die sich noch nicht entschieden haben.' },
        { name: 'TurboKufe X', r: [980, 630, 200, 70], walk: [1120, 690],
          look: () => f('cheat_exposed') ? 'Die TurboKufe X. Jetzt ohne Motor. Der liegt traurig daneben im Schnee. Ein Schlitten mit Trennungsschmerz.'
            : ['Konstantins TurboKufe X. Silber, glänzend, mit Neon-Streifen.', 'Hinten ist ein schwarzes Kästchen dran. Und ein orangefarbenes Kabel führt weg... Richtung Stadt?', f('cable_seen') ? 'Das ist das Kabel von der Glühweinbude! Ein Handy-Ladekabel? Von wegen!' : 'Ein Kabel? An einem Schlitten? Seltsam.'],
          use: async () => { await G.say('fini', 'Ich fass doch nicht Konstantins Schlitten an. Der verklagt mich. Oder sein Papa. Oder sein Papas Anwalt.'); } },
        { name: 'Konstantin Protzinger', r: [918, 410, 90, 250], walk: [880, 670], face: 'r',
          look: 'Konstantin Protzinger. Teurer Skianzug, Gel-Frisur, Skibrille, die er nie aufsetzt. Er sieht aus wie ein Werbeprospekt.',
          use: konstantinTalk,
          items: {
            prospekt: async () => { await G.say('konstantin', 'Wo hast du DAS her?! Das... das ist nicht meiner. Das ist ein anderer Prospekt. Von einem anderen Konstantin.'); G.flag('cheat_suspected'); },
            kaugummi: async () => { await G.say('fini', 'Nein. Ich sabotiere niemanden. Ich gewinne fair. Oder gar nicht. Lieber fair.'); },
            klingel: async () => { await G.say('konstantin', 'Eine Fahrradklingel? Wie retro. Meine TurboKufe hat eine Hupe mit 14 Melodien.'); },
            '*': async () => { await G.say('konstantin', 'Behalt deinen Kram, Brandl. Ich brauch nichts. Ich hab alles.'); },
          } },
        { name: 'Rennleiter Wimmer', r: [716, 360, 100, 280], walk: [670, 668], face: 'r',
          look: 'Rennleiter Schorsch Wimmer. Lodenjanker, Schnauzbart, Megafon. Er kennt die Satzung von 1953 auswendig. Vermutlich auch rückwärts.',
          use: wimmerTalk,
          items: {
            prospekt: async () => {
              if (f('cheat_exposed')) return;
              if (!f('met_wimmer')) await wimmerFirst();
              G.flag('cheat_suspected');
              await exposeCheat();
            },
            formular: async () => { await G.say('wimmer', 'Na, na! Paragraph 4: Persönliche Abgabe verboten! Per Brieftaube! Und vorher ausfüllen!'); },
            formular_voll: async () => { await G.say('wimmer', 'Madl! PER BRIEFTAUBE! Ich nehm des ned an. Ich schau ned amal hin. *schaut hin* Is des a Pferd?'); },
            schlitten: async () => { await G.say('wimmer', 'A schöner Holzschlitten! Paragraph 2 erfüllt. Und er riecht nach... Zimt?'); },
            helm: async () => { await G.say('wimmer', 'Neongrün. Paragraph 11 erfüllt. Und Paragraph 19: Sichtbarkeit. Übererfüllt.'); },
            handschuhe: async () => { await G.say('wimmer', 'Zwoa Handschuh! Paragraph 9 erfüllt. Gratuliere.'); },
            handschuh: async () => { await G.say('wimmer', 'Oa Handschuh. Paragraph 9 sagt: BEIDHÄNDIG. Des is oa Hand zu wenig.'); },
            startnummer: async () => { await G.say('wimmer', 'Die Startnummer g’hört an Schlitten, ned zu mir.'); },
            geld: async () => { await G.say('wimmer', 'Bestechung?! PARAGRAPH 4!! ...Drei Euro? Na. Ned amal für drei Euro.'); },
            '*': async () => { await G.say('wimmer', 'Des steht ned in der Satzung. Also brauch i des ned.'); },
          } },
        { name: 'Zurück in die Stadt', r: [1232, 420, 48, 300], walk: [1238, 660], exit: { to: 'marktost', x: 1190, y: 650, face: -1 } },
      ];
    },
  };
})();
