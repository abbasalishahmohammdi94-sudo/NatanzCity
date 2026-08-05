const CACHE_NAME = "natanzcity-v1";

// حذف کش‌های قدیمی
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // فقط درخواست‌های GET
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // فایل‌هایی که نباید کش شوند
  const noCache =
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".json");

  // همیشه آخرین نسخه را از سرور بگیر
  if (noCache) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));

    return;
  }

  // عکس‌ها، فونت‌ها، آیکون‌ها و...
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return networkResponse;
      });
    }),
  );
});
