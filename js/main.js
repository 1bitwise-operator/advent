/* Start, Titelbildschirm, Menü */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);

  function hideTitle() { $('title').classList.add('hidden'); }

  async function newGame() {
    G.abort(); // ein evtl. noch laufendes Intro oder Gespräch beenden
    G.clearSave();
    hideTitle();
    $('ending').classList.add('hidden');
    $('menu').classList.add('hidden');
    G.start(G.newState());
    G.run(G.intro);
  }

  function continueGame() {
    const s = G.load();
    if (!s) { newGame(); return; }
    G.abort();
    hideTitle();
    G.start(s);
  }

  window.addEventListener('DOMContentLoaded', () => {
    G.init();
    const saved = G.load();
    // Hintergrund hinter dem Titel
    const bg = G.newState();
    G.start(bg);
    if (saved && saved.flags && saved.flags.intro_done) $('btn-continue').classList.remove('hidden');

    $('btn-new').addEventListener('click', newGame);
    $('btn-continue').addEventListener('click', continueGame);
    $('btn-help2').addEventListener('click', () => $('help').classList.remove('hidden'));
    $('btn-again').addEventListener('click', newGame);
    $('menu-restart').addEventListener('click', () => {
      if (confirm('Wirklich von vorne anfangen? Der Spielstand wird gelöscht.')) newGame();
    });

    // Debug-Hilfen: #debug in der URL
    if (G.debug) {
      window.dbg = {
        go: (s) => G.goto(s),
        give: (...ids) => ids.forEach((i) => G.give(i, true)),
        flag: (...fs) => fs.forEach((x) => G.flag(x)),
      };
    }
  });
})();
