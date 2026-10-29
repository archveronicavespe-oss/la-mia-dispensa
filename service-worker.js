const CACHE='la-mia-dispensa-v9-github-pages';
const ASSETS=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./apple-touch-icon-v9.png','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('la-mia-dispensa-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
 const url=new URL(r.url);
 if(r.mode==='navigate'){
  e.respondWith(fetch(r).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{});}return response;}).catch(()=>caches.match(r).then(c=>c||caches.match('./index.html')))); return;
 }
 if(url.pathname.includes('apple-touch-icon')||url.pathname.includes('favicon')||url.pathname.endsWith('.webmanifest')){
  e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match(r)));return;
 }
 e.respondWith(caches.match(r).then(c=>c||fetch(r)));
});
