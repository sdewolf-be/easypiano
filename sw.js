// Service worker : mise en cache pour un usage hors ligne (réseau d'abord, cache en secours).
const CACHE = 'easypiano-v2';
const ASSETS = ['./', 'index.html', 'css/style.css', 'js/app.js', 'js/music.js', 'js/songs.js', 'js/diagrams.js', 'js/quiz.js', 'js/course/index.js', 'js/course/util.js',
  ...['c01-introduction','c02-position-do','c03-grande-portee','c04-intervalles','c05-accords','c06-position-sol','c07-do-milieu','c08-elargir','c09-do-majeur','c10-sol-majeur','c11-fa-majeur','c12-la-mineur','c13-re-mineur','c14-revision'].map(n => 'js/course/' + n + '.js'),
  'js/renderer.js',
  'js/synth.js', 'js/midi.js', 'js/keyboard.js', 'js/player.js', 'fonts/Bravura.woff2', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request))
  );
});
