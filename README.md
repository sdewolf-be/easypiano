# EasyPiano

Application web pour apprendre le piano, dans l'esprit de SimplyPiano : un parcours de leçons,
une bibliothèque de morceaux et surtout un mode **Jouer** où la partition défile et réagit
aux notes que tu joues sur ton piano connecté en **MIDI Bluetooth** (ou USB).

Aucune installation côté serveur : ce sont des fichiers statiques (HTML / CSS / JavaScript),
installables comme une appli (PWA) sur l'écran d'accueil de l'iPad.

## Fonctions

- **Cours** : un cursus complet en **14 chapitres / 83 leçons / 208 exercices** qui suit le livre
  *Alfred's Basic Adult All‑in‑One Course, Level 1* (pages indiquées dans chaque leçon). Pour chaque leçon :
  un récapitulatif de la théorie en français (notes Do, Ré, Mi…, schémas de clavier, mini‑partitions, tableaux),
  puis les exercices à jouer : toutes les pièces du livre (traditionnelles arrangées fidèlement, compositions
  pédagogiques équivalentes pour les pièces propres au livre, pièces du domaine public à la place des chansons
  protégées de la fin du livre) et des **quiz au piano** qui remplacent les exercices « à écrire dans le livre »
  (jouer une note, un intervalle, un accord, une gamme, fort / doux…).
  La progression (leçons terminées, étoiles par exercice) est visible dans la liste des chapitres ; le bouton
  **Continuer** reprend au premier exercice non fait, et on peut ouvrir directement n'importe quelle leçon.
- **Morceaux** : 9 morceaux de niveau débutant (Au clair de la lune, Ah ! vous dirai‑je maman, Frère Jacques, Ode à la joie, Vive le vent, Joyeux anniversaire, Greensleeves, Lettre à Élise, To Zanarkand en version facile), avec niveau, meilleur score et étoiles.
- **Trois modes de jeu** :
  - *Apprendre* : la partition s'arrête sur chaque note et attend que tu la joues (les accords exigent toutes les notes).
  - *Jouer* : décompte d'une mesure, puis la partition défile en rythme ; chaque note est jugée juste, ratée ou fausse ; score et étoiles à la fin.
  - *Écouter* : l'appli joue le morceau pour te le faire entendre.
- Choix de la main (gauche, droite, les deux) : la main inactive est jouée automatiquement en accompagnement.
- Tempo réglable de 50 % à 120 %, métronome, noms des notes (Do, Ré, Mi…) dans les têtes de notes, conseil par morceau.
- Vraie notation : grande portée (clé de Sol + clé de Fa), armures, altérations, croches, points, silences, liaisons.
- Clavier à l'écran qui montre les touches attendues (bleu), justes (vert) et fausses (rouge) ; il sert aussi d'entrée tactile de secours.
- Progression sauvegardée sur l'appareil.

## Utiliser sur iPad avec un piano Bluetooth

Safari sur iPad **ne gère pas le Web MIDI**. Il faut donc ouvrir la page dans un navigateur iPad qui l'ajoute :

1. Installe depuis l'App Store **MIDIWeb Browser** (gratuit, iPadOS 17.6 ou plus) ou, pour un iPad plus ancien, **Web MIDI Browser**.
2. Jumelle ton piano en **Bluetooth MIDI**. Sur iPad, ce jumelage se fait *dans une appli*, pas dans Réglages ▸ Bluetooth :
   soit dans le menu Bluetooth MIDI du navigateur ci‑dessus, soit dans l'appli de ton piano (Yamaha Smart Pianist, Roland Piano App, Kawai PiaBookPlayer…),
   soit dans GarageBand ▸ Réglages ▸ Avancé ▸ Appareils MIDI Bluetooth. Une fois connecté, le piano reste visible pour toutes les applis tant qu'il est allumé.
3. Ouvre l'adresse de l'appli (voir « Mise en ligne ») dans ce navigateur, accepte l'accès MIDI, puis va dans **Réglages** ▸ *Rechercher* : ton piano doit apparaître. Joue une note : elle s'affiche dans la zone de test.
4. Lance un morceau, appuie sur **Commencer** et joue.

Le son du morceau (accompagnement, métronome) sort de l'iPad ; tes propres notes sonnent dans ton piano / ton casque.
Si ton piano est muet, coche « Faire sonner les notes MIDI dans l'appli » dans les réglages.

Sur ordinateur, Chrome, Edge ou Firefox gèrent le MIDI directement (piano en USB ou en Bluetooth via le système).
Sans piano, le clavier à l'écran et les touches `A W S E D F T G Y H U J K` du clavier d'ordinateur permettent de tester.

## EasyPiano Junior (3 à 6 ans)

Une variante pour les petits, servie à l'adresse `junior/` du même site (`https://<utilisateur>.github.io/easypiano/junior/`),
installable comme une seconde appli sur l'écran d'accueil. Elle réutilise le moteur MIDI et le synthétiseur de l'appli principale.

- **Piou**, un poussin mascotte, présente chaque étape dans une bulle et la **lit à voix haute** (synthèse vocale du navigateur, en français) :
  l'enfant n'a pas besoin de savoir lire.
- **Une couleur par note**, la même quelle que soit l'octave (Do rouge, Ré orange, Mi jaune, Fa vert, Sol bleu, La violet, Si rose) :
  le clavier à l'écran porte des « gommettes » de ces couleurs, à reproduire avec des gommettes sur le vrai piano
  (au moins de Do à Do autour du Do du milieu, idéalement aussi Sol, La, Si juste en dessous).
- **Cursus de 10 chapitres / 50 activités** de 2 à 4 minutes, à raison de 3 activités par jour (≈ 10 minutes, les cœurs de l'accueil) :
  Do‑Ré‑Mi → Fa‑Sol → La‑Si → la gamme → les notes d'en bas (Sol, La, Si graves) → Joyeux anniversaire → plus haut, plus bas (oreille) →
  le rythme → les copains (deux notes en même temps, les deux mains) → chante avec Piou (chapitre « au choix », puis la fête finale).
  Types d'activités : découverte d'une note, « trouve la note » (par le nom ou par la couleur), écho (rejouer une suite de 2‑3 notes),
  oreille (retrouver une note entendue parmi 2 puis 3, « plus haut ou plus bas ? »), mélodie note après note, « tape avec Piou »
  (frapper la pulsation d'une chanson), « joue avec Piou » (la chanson avance toute seule, très tolérante), les copains (accords de deux notes),
  karaoké (« Piou joue, tu chantes », sans piano) et la fête finale.
  Chansons : Mi‑Ré‑Do, Au clair de la lune (aussi à deux mains), Ah ! vous dirai‑je maman, la gamme, Frère Jacques, Joyeux anniversaire,
  la chanson des copains, Dans la ferme de Mathurin, Vive le vent, Ode à la joie.
- **Gamification** : étoiles par activité, activités débloquées une à une, séance du jour, **défi du jour** (une activité déjà réussie
  tirée au sort, une étoile bonus), **album de gommettes** (une par chapitre et une par chanson), **Piou à habiller** (un accessoire gagné
  par chapitre : chapeau de fête, lunettes, nœud papillon, couronne, écharpe, cape, casque, lunettes de soleil, médaille, casquette ;
  on tape sur Piou à l'accueil), confettis.
- **Piano libre** (Piou dit le nom des notes jouées) et **Mes chansons** (rejouer ou chanter les chansons débloquées).
- **Coin des parents** (appui long sur la roue ⚙︎) : choix du piano MIDI, tolérance d'octave (une bonne note dans n'importe quelle
  octave est acceptée, par défaut), voix, noms des notes, déblocage de tout, remise à zéro, et **la voix des parents** : enregistrer
  « Bravo ! », « Oups ! », « À toi ! », « Écoute… » et les noms des notes avec sa propre voix ; Piou les utilise à la place de la synthèse.

Les fichiers sont dans `junior/` (`index.html`, `css/junior.css`, `js/app.js` écrans et entrées, `js/course.js` cursus,
`js/songs.js` chansons, `js/activities.js` moteurs des jeux, `js/mascot.js` Piou, `js/kidkeyboard.js` clavier coloré, `js/fx.js` confettis et sons).

## Mise en ligne

Le dépôt contient un workflow GitHub Actions qui publie le site sur **GitHub Pages** à chaque push sur `main` :

1. Fusionne la branche dans `main`.
2. Dans le dépôt GitHub : *Settings* ▸ *Pages* ▸ *Source* : **GitHub Actions** (le workflow tente aussi de l'activer tout seul).
3. L'appli est alors servie en HTTPS à l'adresse `https://<utilisateur>.github.io/easypiano/`.

Pour tester en local : `npx serve .` (ou `python3 -m http.server`) puis ouvrir `http://localhost:3000`.
Le MIDI exige une page servie en HTTPS ou depuis `localhost`.

## Ajouter un morceau

Les morceaux sont dans `js/songs.js`, dans une notation texte compacte (voir `js/music.js`) :

```
C4/4   noire Do4        E4/2   blanche Mi4       G4/1  ronde Sol4
D4/8   croche Ré4       C4/4.  noire pointée      R/4   soupir
[C3 E3 G3]/2  accord    C4/4~  liée à la note suivante   |  barre de mesure (facultative)
Bb3, F#4, Fn4           bémol, dièse, bécarre     la durée omise reprend la précédente
C4/4:1  [C3 E3 G3]/2:5,3,1   doigtés (dans l'ordre des hauteurs écrites)
C4/8t   triolet de croches   C4/4^ point d'orgue   C4/4' staccato   C4/4> accent
@mf @Fine @D.C._al_Fine      annotation attachée à la note suivante (_ = espace)
```

Chaque morceau a un `id`, un `title`, un `tempo`, un `timeSig` (ex. `[3, 4]`), une tonalité `key` (`C`, `G`, `F`, `Am`…),
une voix `right` (main droite, clé de Sol) et une voix `left` (main gauche, clé de Fa).

## Organisation du code

| Fichier | Rôle |
| --- | --- |
| `index.html`, `css/style.css` | Interface (accueil, lecteur, réglages) |
| `js/app.js` | Écrans, réglages, gestion des entrées, sauvegarde |
| `js/music.js` | Hauteurs, armures, analyse des partitions |
| `js/renderer.js` | Rendu SVG de la partition (police Bravura, SMuFL), curseur, couleurs |
| `js/player.js` | Moteur de jeu : défilement, attente, évaluation, accompagnement, score |
| `js/midi.js` | Entrée Web MIDI (Bluetooth / USB) |
| `js/keyboard.js` | Clavier à l'écran |
| `js/synth.js` | Synthétiseur Web Audio (accompagnement, métronome) |
| `js/songs.js` | Morceaux du menu « Morceaux » |
| `js/course/*.js` | Cursus : un fichier par chapitre (`c01`…`c14`), `index.js` les assemble |
| `js/diagrams.js` | Schémas de théorie (clavier SVG, mini‑partitions, tableaux) |
| `js/quiz.js` | Moteur des quiz joués au piano |
| `sw.js`, `manifest.webmanifest` | Mode hors ligne et installation PWA |

La police **Bravura** (Steinberg) est distribuée sous licence SIL OFL.
