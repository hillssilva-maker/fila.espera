// Define um nome para o cache
const CACHE_NAME = 'coletor-v6-cache';
// Lista os arquivos que devem ser cacheados (apenas o seu HTML principal)
const urlsToCache = [
  '.', // Abreviação para o index.html (ou o nome do seu .html)
  'index.html' // Adicione o nome do seu arquivo html
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta as requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar o arquivo no cache
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna ele
        if (response) {
          return response;
        }
        // Se não, busca na rede (para o caso de algo ter faltado)
        return fetch(event.request);
      }
    )
  );
});