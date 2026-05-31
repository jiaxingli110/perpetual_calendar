const CACHE_NAME = "perpetual-calendar-v32";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./assets/solar-terms/xiaohan.jpg",
  "./assets/solar-terms/dahan.jpg",
  "./assets/solar-terms/lichun.jpg",
  "./assets/solar-terms/yushui.jpg",
  "./assets/solar-terms/jingzhe.jpg",
  "./assets/solar-terms/chunfen.jpg",
  "./assets/solar-terms/qingming.jpg",
  "./assets/solar-terms/guyu.jpg",
  "./assets/solar-terms/lixia.jpg",
  "./assets/solar-terms/xiaoman.jpg",
  "./assets/solar-terms/mangzhong.jpg",
  "./assets/solar-terms/xiazhi.jpg",
  "./assets/solar-terms/xiaoshu.jpg",
  "./assets/solar-terms/dashu.jpg",
  "./assets/solar-terms/liqiu.jpg",
  "./assets/solar-terms/chushu.jpg",
  "./assets/solar-terms/bailu.jpg",
  "./assets/solar-terms/qiufen.jpg",
  "./assets/solar-terms/hanlu.jpg",
  "./assets/solar-terms/shuangjiang.jpg",
  "./assets/solar-terms/lidong.jpg",
  "./assets/solar-terms/xiaoxue.jpg",
  "./assets/solar-terms/daxue.jpg",
  "./assets/solar-terms/dongzhi.jpg",
  "./assets/donate/alipay.jpg"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
