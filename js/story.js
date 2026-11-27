/* =========================================================
   Story: Sprecher, Merkzettel, Intro, Ende
   ========================================================= */
(function () {
  'use strict';
  const f = G.f, has = G.has;

  Object.assign(G.names, {
    fini: { name: 'Fini', color: '#d4552b' },
    resi: { name: 'Resi (Bäckerei Kreitmampf)', color: '#3f6fb5' },
    ohmeier: { name: 'Frau Ohmeier', color: '#7b3fa0' },
    fairhuber: { name: 'Frau Fairhuber', color: '#4f8a4a' },
    gustl: { name: 'Gustl Speichl', color: '#7a5a35' },
    gloeckl: { name: 'Mesner Glöckl', color: '#4a4658' },
    gerti: { name: 'Glühwein-Gerti', color: '#b8322b' },
    wimmer: { name: 'Rennleiter Wimmer', color: '#3f6b45' },
    konstantin: { name: 'Konstantin Protzinger', color: '#6a6f7c' },
    gurrbert: { name: 'Gurrbert', color: '#3f7a66' },
    schneemann: { name: 'Schneemann', color: '#5a7ca8' },
  });

  // ---------- Merkzettel ----------
  G.tasks = [
    { text: 'Das 73. Grafinger Kufen-Gaudi gewinnen!!! (16 Uhr, Schlittenhang am Bärenbuckel)', done: () => f('won') },
    { text: 'Meinen Schlitten finden. Wo hab ich den bloß hingetan?!', done: () => f('met_gustl') },
    { sub: true, text: 'Resi sagt, ich hab ihn im Sommer zum Gustl gebracht?! (Alte Radlwerkstatt, oben im Fairkehrt-Laden)', show: () => f('resi_told_sled'), done: () => f('met_gustl') },
    { text: 'Gustl macht meinen Schlitten renntauglich, wenn ich ihm bringe:', show: () => f('met_gustl'), done: () => f('sled_done') },
    { sub: true, text: '... seinen Kufenschlüssel (hat Glühwein-Gerti)', show: () => f('met_gustl'), done: () => f('gave_schluessel') },
    { sub: true, text: '... eine Bienenwachskerze (gibt’s im Fairkehrt-Laden – aber ich hab kein Geld!)', show: () => f('met_gustl'), done: () => f('gave_kerze') },
    { sub: true, text: '... eine Zimtstange (für den „Geheimduft“?!)', show: () => f('met_gustl'), done: () => f('gave_zimt') },
    { text: 'Mich zum Rennen anmelden (Rennleiter am Schlittenhang fragen)', show: () => f('resi_warned') || f('met_wimmer'), done: () => f('registered') },
    { sub: true, text: 'Nachmeldung NUR per Brieftaube (§ 4)! Die Taube wohnt im Taubenschlag gegenüber vom Kircherl.', show: () => f('met_wimmer'), done: () => f('pigeon_sent') },
    { sub: true, text: 'Das Formular ausfüllen – ich brauch einen Stift', show: () => f('met_wimmer'), done: () => has('formular_voll') || f('pigeon_sent') },
    { sub: true, text: 'Den Schlüssel zum Taubenschlag besorgen (hat Mesner Glöckl)', show: () => f('met_wimmer'), done: () => has('schluessel_taube') || f('loft_open') },
    { sub: true, text: 'Das verschwundene Christkind aus der Krippe wiederfinden', show: () => f('christkind_missing'), done: () => f('christkind_returned') },
    { sub: true, text: 'Frau Ohmeier braucht einen neuen Star fürs Schaufenster („mit Ecken und Kanten“)', show: () => f('ohmeier_wants'), done: () => f('lebkuchen_given') },
    { sub: true, text: 'Licht für den stockdunklen Taubenschlag besorgen', show: () => f('loft_dark_seen'), done: () => f('loft_lit') },
    { sub: true, text: 'Gurrbert fliegt nur für Brezn-Brösel vom Kreitmampf', show: () => f('know_broesel'), done: () => f('gurrbert_fed') },
    { sub: true, text: 'Wieder zum Rennleiter: Ist Gurrbert angekommen?', show: () => f('pigeon_sent'), done: () => f('registered') },
    { text: 'Einen Helm auftreiben (§ 11: Helmpflicht)', show: () => f('met_wimmer'), done: () => has('helm') },
    { text: 'Meinen rechten Handschuh finden (§ 9: Beidhändige Behandschuhung!)', show: () => f('met_wimmer') || f('glove_seen'), done: () => f('glove_back') },
    { sub: true, text: 'Gurrbert hat ihn ins Nest eingebaut. Er will Ersatz-Nestmaterial.', show: () => f('glove_seen'), done: () => f('glove_back') },
    { text: 'Beweisen, dass Konstantins Schlitten einen Motor hat!', show: () => f('cheat_suspected'), done: () => f('cheat_exposed') },
    { text: 'Startklar? Dann ab zum Rennleiter!', show: () => f('registered') && has('schlitten') && has('helm') && f('glove_back'), done: () => f('won') },
    { text: '(Freiwillig) Gustl das alte Foto zeigen', show: () => has('foto') || f('foto_given'), done: () => f('foto_given') },
  ];

  // ---------- Intro ----------
  G.intro = async function () {
    G.place(640, 640, 1);
    await G.wait(500);
    await G.narrate('Grafing bei München. Knapp 14.000 Einwohner, ein Bär im Wappen – und seit 1953 offiziell eine Stadt.');
    await G.narrate('Heute um Punkt 16 Uhr steigt hier das <b>73. Grafinger Kufen-Gaudi</b>: das härteste Schlittenrennen zwischen Ebersberg und dem Rest der Welt.');
    await G.narrate('Fini Brandl, 15, hat sich ein ganzes Jahr darauf vorbereitet. Hauptsächlich mental. Und mit Plätzchen.');
    await G.say('fini', 'So. Heute hol ich mir die Goldene Kufe! Ich hab alles dabei!');
    await G.say('fini', 'Mütze: check. Schal: check. Handschuhe: ... ein Handschuh: check. Halb-check. Kaugummi: check!');
    await G.say('fini', 'Und natürlich meinen Schlitten! Den hab ich... den hab ich...');
    G.face(-1); await G.wait(500); G.face(1); await G.wait(500);
    await G.say('fini', '...');
    await G.say('fini', 'Okay. Kein Grund zur Panik. Ich hab ihn bestimmt nur kurz irgendwo hingestellt. Irgendwann im letzten Jahr. Irgendwo in Grafing.');
    await G.say('fini', 'Ich schreib’s mir auf. Auf meinen Merkzettel. Den ich diesmal NICHT verliere.');
    G.flag('intro_done');
    await G.narrate('Linksklick: hingehen, benutzen, reden. Rechtsklick (oder Knopf „✋/👁“): ansehen.<br>Oben links liegt Finis <b>Merkzettel</b> – falls sie mal wieder vergisst, was sie vorhatte.');
  };

  // ---------- Ende ----------
  G.showEnding = function () {
    const min = Math.max(1, Math.round(G.state.playMs / 60000));
    const extra = f('foto_given')
      ? '<p>Gustl hängt das alte Foto seines Vaters neben den neuen Zeitungsartikel. Zwei Speichl-Schlitten, zwei Siege. Er hat dabei ein bisschen geweint. „Staub im Auge“, sagt er.</p>'
      : '<p>Irgendwo in einem Taubenschlag hängt noch ein altes Foto von 1953. Vielleicht findet es ja jemand beim nächsten Mal …</p>';
    document.getElementById('ending-text').innerHTML = `
      <p><b>Fini Brandl gewinnt das 73. Grafinger Kufen-Gaudi</b> – mit einem frisch gewachsten Holzschlitten, einem neongrünen Helm von 1987, zwei Handschuhen und einer Brieftaube als Anmeldebüro.</p>
      <p>Konstantin wird Zweiter und kündigt an, nächstes Jahr mit einem Segel anzutreten. Rennleiter Wimmer blättert bereits in der Satzung.</p>
      ${extra}
      <p>Herrn Glöckls Christkind trägt seinen Kaschmir-Poncho weiterhin. Und Frau Ohmeiers einbeiniger Lebkuchenmann wird die Stilikone des Landkreises.</p>
      <p>Und Fini? Hat das Gefühl, irgendetwas vergessen zu haben.<br><i>(Sie hatte vergessen, ihrer Mama zu sagen, wo sie ist. Aber das ist eine andere Geschichte.)</i></p>
      <p style="opacity:.7">Deine Spielzeit: ca. ${min} Minute${min === 1 ? '' : 'n'} · Danke fürs Spielen!</p>`;
    document.getElementById('ending').classList.remove('hidden');
  };
})();
