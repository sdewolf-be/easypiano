# EasyPiano

Application web pour apprendre le piano, dans l'esprit de SimplyPiano : un parcours de leçons,
une bibliothèque de morceaux et surtout un mode **Jouer** où la partition défile et réagit
aux notes que tu joues sur ton piano connecté en **MIDI Bluetooth** (ou USB).

Aucune installation côté serveur : ce sont des fichiers statiques (HTML / CSS / JavaScript),
installables comme une appli (PWA) sur l'écran d'accueil de l'iPad.

## Fonctions

- **Cours** : 8 leçons progressives (trouver le Do, Do‑Ré‑Mi, Fa‑Sol, rythme, main gauche, deux mains, accords, altérations), chacune avec une explication et un exercice.
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
| `js/songs.js`, `js/lessons.js` | Contenu |
| `sw.js`, `manifest.webmanifest` | Mode hors ligne et installation PWA |

La police **Bravura** (Steinberg) est distribuée sous licence SIL OFL.
