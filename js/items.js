/* =========================================================
   Gegenstände (Inventar) – Name, Beschreibung, Icon
   ========================================================= */
(function () {
  'use strict';
  const OL = '#2a1f2d';
  const ic = (body) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><g stroke="${OL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`;

  G.items = {
    kaugummi: {
      name: 'Kaugummi',
      desc: 'Mein Notfall-Kaugummi. Seit Dienstag im Einsatz. Er hat schon viel gesehen. Zu viel.',
      icon: ic(`<rect x="16" y="28" width="48" height="24" rx="6" fill="#ff9ec4"/><path d="M16,40 H64" stroke-width="2" opacity=".4"/><rect x="28" y="28" width="12" height="24" fill="#fff" opacity=".6" stroke="none"/><text x="46" y="46" font-size="13" text-anchor="middle" stroke="none" fill="${OL}" font-family="Trebuchet MS" font-weight="800">MINZ</text>`),
    },
    handschuh: {
      name: 'Linker Handschuh',
      desc: 'Mein linker Fäustling. Der rechte ist... auf Weltreise. Vermutlich. Meine rechte Hand ist sauer auf mich.',
      icon: ic(`<path d="M24,62 L24,30 Q24,14 40,14 Q56,14 56,30 L56,62 Z" fill="#2f8f8b"/><path d="M24,40 Q12,38 14,28 Q18,20 26,28" fill="#2f8f8b"/><rect x="21" y="58" width="38" height="10" rx="4" fill="#fff7e8"/><path d="M30,30 h20 M30,38 h20" stroke="#ffd36e" stroke-width="3"/>`),
    },
    handschuhe: {
      name: 'Handschuh-Paar',
      desc: 'Zwei Fäustlinge! Wiedervereint! Wie in einem kitschigen Weihnachtsfilm. Nur mit mehr Taube.',
      icon: ic(`<g transform="translate(-8,4) rotate(-12 40 40)"><path d="M24,62 L24,30 Q24,14 40,14 Q56,14 56,30 L56,62 Z" fill="#2f8f8b"/><rect x="21" y="58" width="38" height="10" rx="4" fill="#fff7e8"/></g><g transform="translate(10,0) rotate(10 40 40)"><path d="M24,62 L24,30 Q24,14 40,14 Q56,14 56,30 L56,62 Z" fill="#2f8f8b"/><path d="M30,30 h20 M30,38 h20" stroke="#ffd36e" stroke-width="3"/><rect x="21" y="58" width="38" height="10" rx="4" fill="#fff7e8"/></g>`),
    },
    tasse: {
      name: 'Leere Glühweintasse',
      desc: '„Grafinger Christkindlmarkt 2026“. Leer. Riecht nach Zimt und schlechten Entscheidungen von Erwachsenen.',
      icon: ic(`<path d="M20,22 H54 L50,64 Q37,70 24,64 Z" fill="#b8322b"/><path d="M53,30 Q68,32 64,46 Q60,56 51,52" fill="none" stroke-width="5"/><path d="M53,30 Q68,32 64,46 Q60,56 51,52" fill="none" stroke="#b8322b" stroke-width="2"/><path d="M28,38 l4,-6 l4,6 l4,-6 l4,6" fill="none" stroke="#fff" stroke-width="2.5"/><ellipse cx="37" cy="22" rx="17" ry="4" fill="#5b1f2a"/>`),
    },
    geld: {
      name: '3 Euro Pfand',
      desc: 'Drei Euro. Mein gesamtes Vermögen. Ich fühl mich wie Dagobert. Nur ohne Geldspeicher. Und ohne Geld.',
      icon: ic(`<circle cx="32" cy="44" r="18" fill="#e8c35a"/><circle cx="32" cy="44" r="12" fill="#cfd4dc"/><text x="32" y="49" font-size="13" text-anchor="middle" stroke="none" fill="${OL}" font-weight="800" font-family="Trebuchet MS">2€</text><circle cx="54" cy="34" r="14" fill="#cfd4dc"/><circle cx="54" cy="34" r="9" fill="#e8c35a"/><text x="54" y="38" font-size="11" text-anchor="middle" stroke="none" fill="${OL}" font-weight="800" font-family="Trebuchet MS">1€</text>`),
    },
    zimt: {
      name: 'Zimtstange',
      desc: 'Eine Zimtstange. Riecht nach Weihnachten. Und ein bisschen nach Gertis Fingern.',
      icon: ic(`<g transform="rotate(-35 40 40)"><rect x="14" y="32" width="52" height="16" rx="7" fill="#9a5a2e"/><path d="M18,36 H62 M18,44 H62" stroke-width="1.6" opacity=".5"/><ellipse cx="64" cy="40" rx="4" ry="8" fill="#c27a44"/></g>`),
    },
    kufenschluessel: {
      name: 'Kufenschlüssel',
      desc: 'Ein riesiger Schraubenschlüssel mit Gravur: „G. Speichl – Finger weg!“. Ups.',
      icon: ic(`<g transform="rotate(-40 40 40)"><rect x="34" y="22" width="12" height="46" rx="5" fill="#b9c1cc"/><path d="M28,8 Q40,2 52,8 L50,24 L44,22 L44,12 L36,12 L36,22 L30,24 Z" fill="#b9c1cc"/></g>`),
    },
    kerze: {
      name: 'Bienenwachskerze',
      desc: 'Fair gehandelte Bienenwachskerze. Die Bienen wurden gefragt und haben „Summ“ gesagt. Das zählt als Ja.',
      icon: ic(`<rect x="28" y="28" width="24" height="42" rx="3" fill="#f2c14e"/><path d="M28,36 H52 M28,46 H52 M28,56 H52 M36,28 V70 M44,28 V70" stroke-width="1.5" opacity=".45"/><path d="M40,28 V20" stroke-width="2.5"/><path d="M40,8 Q48,16 40,22 Q32,16 40,8 Z" fill="#ffb347" stroke-width="2"/>`),
    },
    jute: {
      name: 'Jutebeutel',
      desc: 'Aufdruck: „Ich bin kein Plastiksackerl.“ Sehr selbstbewusster Beutel. Ich mag ihn.',
      icon: ic(`<path d="M18,30 H62 L58,70 H22 Z" fill="#d9c49a"/><path d="M28,30 Q28,12 40,12 Q52,12 52,30" fill="none" stroke-width="4"/><path d="M28,56 q12,-22 24,0 q-12,10 -24,0 Z M28,56 h24" fill="#7cc47a" stroke-width="2"/>`),
    },
    formular: {
      name: 'Nachmeldeformular',
      desc: '„Nachmeldung zum 73. Grafinger Kufen-Gaudi. Zustellung ausschließlich per Brieftaube (§ 4).“ Noch leer. Wie mein Kopf, wenn mich jemand nach meiner Telefonnummer fragt.',
      icon: ic(`<path d="M20,10 H52 L62,20 V70 H20 Z" fill="#fffaf0"/><path d="M52,10 V20 H62" fill="#e9dcc4"/><path d="M28,30 H54 M28,40 H54 M28,50 H44" stroke-width="2" opacity=".5"/><path d="M28,60 H50" stroke="#d63a3a" stroke-width="2"/>`),
    },
    formular_voll: {
      name: 'Ausgefülltes Formular',
      desc: 'Ausgefüllt! Mit nur drei Rechtschreibfehlern und einer Zeichnung von einem Pferd. Warum auch immer.',
      icon: ic(`<path d="M20,10 H52 L62,20 V70 H20 Z" fill="#fffaf0"/><path d="M52,10 V20 H62" fill="#e9dcc4"/><path d="M28,30 q6,-6 10,0 t10,0 t8,0 M28,40 q6,-6 10,0 t10,0 M28,50 q5,-5 8,0 t8,0" fill="none" stroke="#2b5fb3" stroke-width="2"/><path d="M30,62 q10,-8 20,0" fill="none" stroke="#2b5fb3" stroke-width="2.5"/><circle cx="54" cy="60" r="4" fill="#d63a3a" stroke-width="1.5"/>`),
    },
    stift: {
      name: 'Kugelschreiber',
      desc: '„Ohmeier Moden – Mode, bei der man Oh mei sagt.“ Er schreibt in Gold. Natürlich.',
      icon: ic(`<g transform="rotate(-45 40 40)"><rect x="34" y="8" width="12" height="52" rx="4" fill="#7b3fa0"/><path d="M34,60 L40,74 L46,60 Z" fill="#e8c35a"/><rect x="44" y="12" width="4" height="22" rx="2" fill="#e8c35a" stroke-width="2"/></g>`),
    },
    lebkuchen: {
      name: 'Einbeiniger Lebkuchenmann',
      desc: 'Ein Lebkuchenmann mit nur einem Bein. Er hat schon Schlimmeres erlebt. Bestimmt. Er schaut so.',
      icon: ic(`<path d="M40,8 a10,10 0 1 1 -0.1,0 Z M30,26 H50 L64,32 L62,40 L50,36 L52,52 L48,70 L40,70 L38,54 L32,54 L28,40 L16,40 L16,32 Z" fill="#b86a35"/><circle cx="36" cy="17" r="1.8" fill="#fff" stroke="none"/><circle cx="44" cy="17" r="1.8" fill="#fff" stroke="none"/><path d="M36,22 q4,3 8,0" fill="none" stroke="#fff" stroke-width="2"/><circle cx="40" cy="34" r="2" fill="#d63a3a" stroke="none"/><circle cx="40" cy="42" r="2" fill="#2f8f8b" stroke="none"/><path d="M24,34 h4 M54,34 h4" stroke="#fff" stroke-width="2"/>`),
    },
    broesel: {
      name: 'Tüte Brezn-Brösel',
      desc: 'Eine Tüte Brezn-Brösel. Für Tauben ein Fünf-Sterne-Menü. Für mich... ehrlich gesagt auch.',
      icon: ic(`<path d="M22,24 L58,24 L62,70 L18,70 Z" fill="#e9dcc4"/><path d="M22,24 L30,16 L50,16 L58,24" fill="#d9c49a"/><path d="M32,44 q4,-10 8,0 q4,-10 8,0 q-4,10 -8,4 q-4,6 -8,-4 Z" fill="#b86a35" stroke-width="2"/><circle cx="30" cy="58" r="2" fill="#b86a35" stroke="none"/><circle cx="44" cy="60" r="2.4" fill="#b86a35" stroke="none"/><circle cx="52" cy="54" r="1.8" fill="#b86a35" stroke="none"/>`),
    },
    christkind: {
      name: 'Christkind-Figur',
      desc: 'Das Christkind aus der Krippe. Im Kaschmir-Poncho. Es sieht sehr erholt aus. Fast wie nach einem Wellness-Wochenende.',
      icon: ic(`<ellipse cx="40" cy="52" rx="20" ry="14" fill="#e6c18f"/><path d="M22,48 Q40,30 58,48 L54,62 Q40,68 26,62 Z" fill="#d8b4e8"/><circle cx="40" cy="34" r="11" fill="#f6d5b8"/><path d="M30,30 Q40,18 50,30" fill="#ffd36e"/><circle cx="40" cy="22" r="13" fill="none" stroke="#ffd36e" stroke-width="2.5"/><path d="M36,36 q4,3 8,0" fill="none" stroke-width="2"/>`),
    },
    schluessel_taube: {
      name: 'Taubenschlag-Schlüssel',
      desc: 'Ein alter Eisenschlüssel mit einem Anhänger in Taubenform. Sehr thematisch.',
      icon: ic(`<circle cx="24" cy="30" r="13" fill="#9aa3ad"/><circle cx="24" cy="30" r="5" fill="#5a4a3a"/><path d="M35,32 H68 V40 M58,32 V42 M50,32 V38" fill="none" stroke-width="5"/><path d="M35,32 H68 V40 M58,32 V42 M50,32 V38" fill="none" stroke="#9aa3ad" stroke-width="2.5"/><path d="M18,48 q6,-4 12,2 q6,-2 6,4 q-8,8 -18,2 Z" fill="#8d93a8" stroke-width="2"/>`),
    },
    lampe: {
      name: 'Dynamo-Radllampe',
      desc: 'Eine alte Fahrradlampe mit Handkurbel. Leuchtet, solange man kurbelt. Wie ich: läuft nur mit Bewegung.',
      icon: ic(`<path d="M22,28 L50,22 L50,58 L22,52 Z" fill="#d63a3a"/><ellipse cx="52" cy="40" rx="8" ry="18" fill="#ffe08a"/><path d="M60,30 L74,24 M62,40 H76 M60,50 L74,56" stroke="#ffd36e" stroke-width="3"/><path d="M28,52 L26,66 L36,66" fill="none" stroke-width="4"/><circle cx="36" cy="66" r="4" fill="#ccc"/>`),
    },
    foto: {
      name: 'Altes Foto',
      desc: 'Schwarz-weiß: ein strahlender Mann auf einem Holzschlitten. Hinten drauf: „Kufen-Gaudi 1953 – Sieger: Alois Speichl“.',
      icon: ic(`<g transform="rotate(-6 40 40)"><rect x="14" y="16" width="52" height="46" fill="#f2ead8"/><rect x="20" y="22" width="40" height="30" fill="#8a8273"/><path d="M24,48 L56,48 M28,48 L24,52 M52,48 L56,52" stroke="#e9e2cf" stroke-width="2.5"/><circle cx="40" cy="34" r="5" fill="#e9e2cf" stroke="none"/><path d="M34,46 L40,38 L46,46" fill="#e9e2cf" stroke="none"/></g>`),
    },
    klingel: {
      name: 'Fahrradklingel',
      desc: 'Die Glücksklingel vom Schlitten des Siegers von 1953. Macht „Ding“. Und Mut. Hauptsächlich „Ding“.',
      icon: ic(`<ellipse cx="40" cy="44" rx="22" ry="14" fill="#d9dee6"/><path d="M18,44 Q18,22 40,22 Q62,22 62,44" fill="#c9ced8"/><circle cx="40" cy="18" r="4" fill="#e8c35a"/><path d="M56,30 L70,22" stroke-width="4"/><circle cx="70" cy="22" r="4" fill="#e8c35a"/><path d="M28,32 Q34,26 42,28" fill="none" stroke="#fff" stroke-width="3"/>`),
    },
    prospekt: {
      name: 'Prospekt „TurboKufe X“',
      desc: () => {
        const first = !G.f('read_prospekt');
        G.flag('read_prospekt');
        return first
          ? ['„TurboKufe X – Die Zukunft des Rodelns. Jetzt mit diskretem 2000-Watt-Rückenwind-Motor!“', 'Kleingedrucktes: „Nicht für Wettkämpfe zugelassen.“', 'Ein Schlitten mit MOTOR? Da steht „Protzinger Sportwelt“ drauf. Protzinger... wie Konstantin Protzinger!', 'Das sollte der Rennleiter sehen.']
          : '„TurboKufe X – mit diskretem 2000-Watt-Rückenwind-Motor. Nicht für Wettkämpfe zugelassen.“ Das ist ein Fall für Rennleiter Wimmer!';
      },
      icon: ic(`<rect x="16" y="12" width="48" height="58" rx="3" fill="#23252e"/><path d="M22,48 L52,40 L58,46 L24,54 Z" fill="#c8ccd6" stroke-width="2"/><path d="M24,56 H56" stroke="#e9ff3a" stroke-width="3"/><text x="40" y="34" font-size="13" text-anchor="middle" stroke="none" fill="#e9ff3a" font-weight="900" font-family="Trebuchet MS">TURBO</text><path d="M60,44 l8,-4 M60,48 h10 M60,52 l8,4" stroke="#e9ff3a" stroke-width="2"/>`),
    },
    schlitten: {
      name: 'Renn-Schlitten „Blitzbirne“',
      desc: 'Mein Schlitten! Frisch gewachst, mit Zimtduft und Turbo-Kufen. Wie der in meinen Rucksack passt? Frag nicht. Adventure-Physik.',
      icon: ic(`<path d="M10,56 Q8,66 18,66 H66 Q74,66 72,58" fill="none" stroke-width="5"/><path d="M10,56 Q8,66 18,66 H66 Q74,66 72,58" fill="none" stroke="#c0c6cf" stroke-width="2.5"/><path d="M22,56 V44 M58,56 V44" stroke-width="4"/><rect x="14" y="34" width="54" height="12" rx="3" fill="#d63a3a"/><path d="M14,40 H68" stroke="#ffd36e" stroke-width="2.5"/><path d="M16,30 L66,30" stroke-width="3"/><path d="M30,38 l6,-4 l-2,8 l6,-4" stroke="#ffd36e" stroke-width="2" fill="none"/>`),
    },
    helm: {
      name: 'Neongrüner Radlhelm',
      desc: 'Ein Fahrradhelm, Modell 1987, in Neongrün. Man sieht mich damit aus dem Weltall. Sicherheit geht vor. Stil geht... woanders hin.',
      icon: ic(`<path d="M12,52 Q12,18 42,16 Q70,18 70,50 Z" fill="#9cff3a"/><path d="M24,30 L30,50 M40,20 L42,50 M56,24 L54,50" stroke-width="2.5" opacity=".5"/><path d="M10,52 H72" stroke-width="4"/><path d="M22,52 Q30,66 40,66 Q50,66 58,52" fill="none" stroke-width="2.5"/>`),
    },
    startnummer: {
      name: 'Startnummer 13',
      desc: 'Startnummer 13. Glückszahl! Für jemanden. Irgendwo. Bestimmt.',
      icon: ic(`<rect x="12" y="18" width="56" height="44" rx="4" fill="#fffaf0"/><circle cx="18" cy="24" r="2.4" fill="#ccc"/><circle cx="62" cy="24" r="2.4" fill="#ccc"/><text x="40" y="54" font-size="28" text-anchor="middle" stroke="none" fill="#d63a3a" font-weight="900" font-family="Trebuchet MS">13</text><path d="M14,30 H66" stroke="#2f8f8b" stroke-width="3"/>`),
    },
    pokal: {
      name: 'Goldene Kufe',
      desc: 'Die Goldene Kufe! Meine! MEINE! Ich werde sie nie wieder loslassen. Außer zum Schlafen. Und Essen. Und vielleicht zum Zähneputzen.',
      icon: ic(`<path d="M24,14 H56 Q58,40 40,46 Q22,40 24,14 Z" fill="#ffd36e"/><path d="M24,20 Q10,20 14,32 Q18,38 26,36 M56,20 Q70,20 66,32 Q62,38 54,36" fill="none" stroke-width="3"/><rect x="36" y="46" width="8" height="10" fill="#e8c35a"/><rect x="24" y="56" width="32" height="10" rx="2" fill="#7a4b2d"/><path d="M30,28 Q40,34 50,26" fill="none" stroke="#fff" stroke-width="2.5"/>`),
    },
  };

  // ---------- Kombinationen ----------
  G.combos['formular+stift'] = async () => {
    await G.say('fini', 'Okay. Formular. Ich schaff das. Ich bin quasi Profi im Ausfüllen. Von Bingo-Karten.');
    await G.say('fini', '„Name: Josefine Brandl.“ „Alter: 15.“ „Schlitten: ja.“ „Besondere Fähigkeiten: Schnellbremsen mit dem Gesicht.“');
    await G.say('fini', '„Unterschrift:“ ... *kritzel* ... Und weil noch Platz ist, ein Pferd. Damit es professioneller aussieht.');
    G.take('formular');
    G.give('formular_voll');
  };
  G.combos['kerze+zimt'] = async () => {
    await G.say('fini', 'Gustl hat gesagt, er rührt das zusammen. Wenn ICH Wachs schmelze, brennt am Ende halb Grafing. Schon wieder.');
  };
  G.combos['handschuh+kaugummi'] = async () => {
    await G.say('fini', 'Den Kaugummi in den Handschuh? Dann hab ich nächste Woche einen Handschuh, der an meiner Hand festwächst. Praktisch. Aber eklig.');
  };
  G.combos['broesel+kaugummi'] = async () => {
    await G.say('fini', 'Kaugummi-Brösel. Die nächste große Food-Erfindung. Nein, Fini. Einfach nein.');
  };
  G.combos['lebkuchen+stift'] = async () => {
    await G.say('fini', 'Ich könnte ihm ein zweites Bein malen... Aber dann ist er nur ein Lebkuchenmann mit einem gemalten Bein. Das ist trauriger.');
  };
  G.combos['geld+kaugummi'] = async () => {
    await G.say('fini', 'Ein Kaugummi, der an Geld klebt. So fangen Wirtschaftskrisen an.');
  };
})();
