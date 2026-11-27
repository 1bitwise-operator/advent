# Die Kufenkönigin von Grafing

Ein kleines, winterliches **Point-and-Click-Adventure** für Jugendliche und Erwachsene – als statische Website (HTML, CSS, JavaScript), spielbar direkt im Browser über GitHub Pages.

**Spielen:** https://1bitwise-operator.github.io/advent/

## Worum geht's?

Grafing bei München, Advent. Auf dem Marktplatz duftet der Christkindlmarkt, und um 16 Uhr steigt am Bärenbuckel das **73. Grafinger Kufen-Gaudi**. Fini Brandl (15, gut gelaunt, hilfsbereit, neugierig – und ziemlich chaotisch) will unbedingt die Goldene Kufe gewinnen.

Blöd nur: Sie weiß nicht mehr, wo ihr Schlitten ist. Angemeldet ist sie auch nicht – und das geht laut Satzung von 1953 nur per Brieftaube. Außerdem fehlt ihr ein Handschuh, ein Helm … und irgendwas stimmt mit dem Hightech-Schlitten von Konstantin Protzinger nicht.

Spielzeit: etwa 20–30 Minuten.

Vor dem Spiel kommt eine Passwortseite. Das Passwort bekommst du von der Person, die dir den Link geschickt hat.

## Schauplätze

- Marktplatz vor dem Café Kreitmampf (mit Mariensäule und Christbaum)
- Bäckerei & Café Kreitmampf
- Ohmeier Moden
- Fairkehrt – der Weltladen, mit Treppe hinauf zu Speichls stillgelegter Radlwerkstatt
- Marktplatz beim Dreifaltigkeits-Kircherl
- Im Kircherl (mit Krippe)
- Der dunkle Taubenschlag hinter der kleinen Holztür
- Christkindlmarkt – Glühweinbude „Zum glühenden Bären“
- Schlittenhang am Bärenbuckel

Die Namen der Geschäfte und Figuren sind augenzwinkernd verfremdet und frei erfunden. Ähnlichkeiten mit echten Personen sind nicht beabsichtigt.

## Steuerung

| Aktion | Maus | Touch |
| --- | --- | --- |
| Hingehen, benutzen, nehmen, reden | Linksklick | Tippen |
| Ansehen | Rechtsklick | Knopf „✋/👁“ oben umschalten |
| Gegenstand benutzen / kombinieren | Gegenstand aus dem Rucksack ziehen und auf dem Ziel loslassen (oder anklicken, dann aufs Ziel klicken) | Gegenstand mit dem Finger ziehen und loslassen |
| Text überspringen | Klick / Leertaste | Tippen |
| Merkzettel (Aufgaben) | 📝 oder Taste `M` | 📝 |
| Menü | ☰ oder `Esc` | ☰ |

Das Spiel speichert automatisch im Browser (localStorage).

Wer nicht weiterkommt, findet den kompletten Lösungsweg in [LOESUNG.md](LOESUNG.md) (Achtung, Spoiler!).

## Technik

- Reines HTML/CSS/JavaScript ohne Build-Schritt und ohne externe Abhängigkeiten
- Alle Grafiken sind handgeschriebene SVGs im Comic-Stil (`js/art.js`, `js/characters.js`)
- Kleine eigene Adventure-Engine (`js/engine.js`): Szenen, Laufen mit Tiefenskalierung, Sprechblasen, Dialogbäume, Inventar mit Kombinationen, Merkzettel, Spielstand
- Jede Szene ist eine eigene Datei in `js/scenes/`

```
index.html          Passwortseite (Adventskalender-Türchen)
spiel.html          das Spiel
js/lock.js          Passwortprüfung (nur Prüfsumme gespeichert)
css/style.css       Layout, UI, Animationen
js/engine.js        Engine
js/art.js           Zeichen-Helfer (Häuser, Lichter, Schnee …)
js/characters.js    Figuren
js/items.js         Gegenstände und Kombinationen
js/story.js         Sprecher, Merkzettel, Intro, Abspann
js/scenes/*.js      Szenen mit Hotspots und Dialogen
js/main.js          Titelbildschirm und Start
```

Lokal spielen: `index.html` im Browser öffnen. Mit `#debug` am Ende der URL werden die Klickflächen sichtbar.
