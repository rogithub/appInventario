const apiServer = self.location.hostname === "localhost" ? 
"http://localhost:5293" : "https://papeleria.xplaya.com";
const clientDataCache = "client-data-version-0.0.5";
const dynamicCache = "dynamic-version-0.0.5";
const staticCache = "static-version-0.0.5";
const validKeys = [clientDataCache, dynamicCache, staticCache];

self.addEventListener('activate', e => {
    console.log("Service worker activated");
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
            .filter(key => validKeys.indexOf(key) === -1)
            .map(key => {
                console.log("deleting key", key);
                return caches.delete(key);
            }))
        })
    );
});

const staticAssets = [    
    "/"    
    ,"/js/shared.js"
    ,"/js/monedero.js"
    ,"/lib/qrcode.min.js"
    ,"/img/bg.jpg"
    ,"/css/app.css"
    ,"/img/favicon.ico"
    ,"/img/recibo.jpg"
    ,"/img/lapiz.png"
    ,"/img/lapiz48.png"
    ,"/img/lapiz72.png"
    ,"/img/lapiz96.png"
    ,"/img/lapiz128.png"
    ,"/img/lapiz192.png"
    ,"/img/lapiz384.png"
    ,"/img/lapiz512.png"
    ,"https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    ,"https://code.jquery.com/jquery-3.3.1.slim.min.js"
    ,"https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
    ,"https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.min.js"
];


self.addEventListener("install", e => {
    console.log("Installed", staticCache);

    e.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll(staticAssets)
        })
    );
});

self.addEventListener("fetch", e => {
    let clientDataUrl = `${apiServer}/app/getdata?clienteId`;
    let isClientData = e.request.url.indexOf(clientDataUrl) != -1;
    let cacheToUse = isClientData ? clientDataCache : dynamicCache;
    let options = { 
        ignoreSearch: isClientData 
    };
    let fetchStrategy = isClientData ? getServerFirst : getCacheFirst;
    let strategyStr = isClientData ? "server" : "cache";
    console.log(`Fetching ${e.request.url} from ${strategyStr}`);

    e.respondWith((async () => {
        return await fetchStrategy(e, cacheToUse, options);
     })());
});

let getCacheFirst = async (e, cacheToUse, options) => {
    try {
        let response = await caches.match(e.request, options);
        if (response)
        {
            return response;
        }

        response = await fetch(e.request);
        let cache = await caches.open(cacheToUse);
        cache.put(e.request.url, response.clone());
        return response

    } catch {
        if (e.request.url.indexOf(".") === -1)
            return caches.match("/");
    }
}

let getServerFirst = async (e, cacheToUse, options) => {
    try {
        let response = await fetch(e.request);
        let cache = await caches.open(cacheToUse);
        cache.put(e.request.url, response.clone());
        return response;     
    } catch (err) {
        let response = await caches.match(e.request, options);
        if (response)
        {
            return response;
        }
        if (e.request.url.indexOf(".") === -1)
            return caches.match("/");
    }
}
