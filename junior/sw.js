// Service worker de la version junior : mise en cache pour un usage hors ligne (réseau d'abord, cache en secours).
const CACHE = 'easypiano-junior-v2';
const ASSETS = ['./', 'index.html', 'css/junior.css', 'manifest.webmanifest',
  'js/app.js', 'js/activities.js', 'js/course.js', 'js/songs.js', 'js/notes.js', 'js/mascot.js', 'js/kidkeyboard.js', 'js/fx.js',
  '../js/music.js', '../js/synth.js', '../js/midi.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k.startsWith('easypiano-junior')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
