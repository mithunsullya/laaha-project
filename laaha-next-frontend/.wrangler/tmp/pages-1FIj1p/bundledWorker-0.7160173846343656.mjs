var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: () => Reflect.ownKeys(envAsyncLocalStorage.getStore()),
        getOwnPropertyDescriptor: (_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args),
        get: (_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property),
        set: (_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value)
      }
    )
  };
  globalThis[Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: () => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()),
      getOwnPropertyDescriptor: (_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args),
      get: (_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property),
      set: (_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value)
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var U = Object.defineProperty;
var ae = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var ie = Object.getPrototypeOf;
var re = Object.prototype.hasOwnProperty;
var M = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "M");
var N = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "N");
var ce = /* @__PURE__ */ __name((e, t, a, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of ne(t))
      !re.call(e, i) && i !== a && U(e, i, { get: () => t[i], enumerable: !(s = ae(t, i)) || s.enumerable });
  return e;
}, "ce");
var V = /* @__PURE__ */ __name((e, t, a) => (a = e != null ? se(ie(e)) : {}, ce(t || !e || !e.__esModule ? U(a, "default", { value: e, enumerable: true }) : a, e)), "V");
var g;
var u = M(() => {
  g = { collectedLocales: [] };
});
var f;
var l = M(() => {
  f = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^(?:/(.*))(?:/)?$", headers: { "X-Frame-Options": "SAMEORIGIN", "X-Content-Type-Options": "nosniff" }, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(.*).json$", dest: "/$1", override: true, continue: true, has: [{ type: "header", key: "x-nextjs-data" }] }, { src: "^/index(?:/)?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/", override: true, continue: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|_next\\/static|sw.js|_next\\/image|favicon.ico|sitemap.xml|robots.txt|assets).*))(.json)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "aabecd0e7bb4d91100b78a091548f52a" }], middlewarePath: "src/middleware", middlewareRawSrc: ["/((?!api|_next|_next/static|sw.js|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)"], override: true }, { src: "^/$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/IvuvpWlfxhuREsvFtwAnB/index.json", continue: true, override: true }, { src: "^/((?!_next/)(?:.*[^/]|.*))/?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/IvuvpWlfxhuREsvFtwAnB/$1.json", continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(.*).json$", dest: "/$1", continue: true, has: [{ type: "header", key: "x-nextjs-data" }] }, { src: "^/index(?:/)?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/", continue: true }, { src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media)/.+$", status: 404, check: true, dest: "$0" }], rewrite: [{ src: "^/$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/IvuvpWlfxhuREsvFtwAnB/index.json", continue: true }, { src: "^/((?!_next/)(?:.*[^/]|.*))/?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/IvuvpWlfxhuREsvFtwAnB/$1.json", continue: true }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/access\\-services(?:/)?.json$", dest: "/[locale]/access-services?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/community\\-conversations(?:/)?.json$", dest: "/[locale]/community-conversations?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/content\\-curation/(?<nxtPslug>[^/]+?)(?:/)?.json$", dest: "/[locale]/content-curation/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/home(?:/)?.json$", dest: "/[locale]/home?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/moderator\\-user\\-dashboard(?:/)?.json$", dest: "/[locale]/moderator-user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/resources(?:/)?.json$", dest: "/[locale]/resources?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/search\\-form(?:/)?.json$", dest: "/[locale]/search-form?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/user\\-dashboard(?:/)?.json$", dest: "/[locale]/user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/user\\-login(?:/)?.json$", dest: "/[locale]/user-login?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)(?:/)?.json$", dest: "/[locale]/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)/(?<nxtPsubcategory>.+?)(?:/)?.json$", dest: "/[locale]/[slug]/[...subcategory]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug&nxtPsubcategory=$nxtPsubcategory" }, { src: "^/(?<nxtPlocale>[^/]+?)/access\\-services(?:\\.rsc)(?:/)?$", dest: "/[locale]/access-services.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/access\\-services(?:/)?$", dest: "/[locale]/access-services?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/community\\-conversations(?:\\.rsc)(?:/)?$", dest: "/[locale]/community-conversations.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/community\\-conversations(?:/)?$", dest: "/[locale]/community-conversations?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/content\\-curation/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/content-curation/[slug].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/content\\-curation/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/[locale]/content-curation/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/home(?:\\.rsc)(?:/)?$", dest: "/[locale]/home.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/home(?:/)?$", dest: "/[locale]/home?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/moderator\\-user\\-dashboard(?:\\.rsc)(?:/)?$", dest: "/[locale]/moderator-user-dashboard.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/moderator\\-user\\-dashboard(?:/)?$", dest: "/[locale]/moderator-user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/resources(?:\\.rsc)(?:/)?$", dest: "/[locale]/resources.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/resources(?:/)?$", dest: "/[locale]/resources?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/search\\-form(?:\\.rsc)(?:/)?$", dest: "/[locale]/search-form.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/search\\-form(?:/)?$", dest: "/[locale]/search-form?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-dashboard(?:\\.rsc)(?:/)?$", dest: "/[locale]/user-dashboard.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-dashboard(?:/)?$", dest: "/[locale]/user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-login(?:\\.rsc)(?:/)?$", dest: "/[locale]/user-login.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-login(?:/)?$", dest: "/[locale]/user-login?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/[slug].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/[locale]/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)/(?<nxtPsubcategory>.+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/[slug]/[...subcategory].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug&nxtPsubcategory=$nxtPsubcategory" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)/(?<nxtPsubcategory>.+?)(?:/)?$", dest: "/[locale]/[slug]/[...subcategory]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug&nxtPsubcategory=$nxtPsubcategory" }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(.*).json$", headers: { "x-nextjs-matched-path": "/$1" }, continue: true, override: true }, { src: "^/_next/data/IvuvpWlfxhuREsvFtwAnB/(.*).json$", dest: "__next_data_catchall" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|IvuvpWlfxhuREsvFtwAnB)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [{ hostname: "^(?:^(?:edit\\-dev\\.laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { hostname: "^(?:^(?:test\\.laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { hostname: "^(?:^(?:laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { hostname: "^(?:^(?:edit\\-dev\\.laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }], localPatterns: [{ pathname: "^(?:\\/assets\\/images(?:\\/(?!\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)|$))$", search: "" }, { pathname: "^(?:\\/_next\\/static\\/media(?:\\/(?!\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)|$))$", search: "" }], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "__next_data_catchall.json": { path: "__next_data_catchall", contentType: "application/json" } }, framework: { version: "14.2.18" }, crons: [] };
});
var y;
var p = M(() => {
  y = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/__next_data_catchall.json": { type: "override", path: "/__next_data_catchall.json", headers: { "content-type": "application/json" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/IvuvpWlfxhuREsvFtwAnB/_buildManifest.js": { type: "static" }, "/_next/static/IvuvpWlfxhuREsvFtwAnB/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/1142.325073a4fcd23bd2.js": { type: "static" }, "/_next/static/chunks/1782.534fdf40d0c83117.js": { type: "static" }, "/_next/static/chunks/1834.207d64bd511cdb36.js": { type: "static" }, "/_next/static/chunks/1846-1885982d3f01796e.js": { type: "static" }, "/_next/static/chunks/2192-567a5b1c1af95825.js": { type: "static" }, "/_next/static/chunks/2621.6dd72687cba9671d.js": { type: "static" }, "/_next/static/chunks/3061-1991ee9e2ff24845.js": { type: "static" }, "/_next/static/chunks/3145-23e146e86a2a4960.js": { type: "static" }, "/_next/static/chunks/3282.edb9e085475060dd.js": { type: "static" }, "/_next/static/chunks/3438-2811ac9a5f7101bc.js": { type: "static" }, "/_next/static/chunks/3464-5d41c42cc0ca945a.js": { type: "static" }, "/_next/static/chunks/3897-f489c6c8a9a6b9d1.js": { type: "static" }, "/_next/static/chunks/4504.472f375ce6684fe2.js": { type: "static" }, "/_next/static/chunks/4998-7606d6cea6499b87.js": { type: "static" }, "/_next/static/chunks/5030-e7ab2291b3fe252d.js": { type: "static" }, "/_next/static/chunks/5234.96288f8657a52a05.js": { type: "static" }, "/_next/static/chunks/5907.6e89953ed7f279f7.js": { type: "static" }, "/_next/static/chunks/6406.1ac06d6a3430b497.js": { type: "static" }, "/_next/static/chunks/6459-eb110f76ae6c48f2.js": { type: "static" }, "/_next/static/chunks/6520.6abe71bf7b4e12b9.js": { type: "static" }, "/_next/static/chunks/6940.f10ddcf06a1dcbee.js": { type: "static" }, "/_next/static/chunks/6979.2ecdb1a33ffd9e16.js": { type: "static" }, "/_next/static/chunks/7452.b6c6110db78c309e.js": { type: "static" }, "/_next/static/chunks/7528-3e7a0f24cb6d3322.js": { type: "static" }, "/_next/static/chunks/7648-d7c4d3fd573b6e35.js": { type: "static" }, "/_next/static/chunks/7696.ae2a40c157e68c5d.js": { type: "static" }, "/_next/static/chunks/7854.ddab9acaef18406f.js": { type: "static" }, "/_next/static/chunks/7925.f7785b3a486ec71d.js": { type: "static" }, "/_next/static/chunks/8458.798468603fa733bc.js": { type: "static" }, "/_next/static/chunks/8695-9108f2a56847d0e2.js": { type: "static" }, "/_next/static/chunks/9591-47b1b7a02dc5cd7f.js": { type: "static" }, "/_next/static/chunks/963.9082f180a7e6c1d1.js": { type: "static" }, "/_next/static/chunks/9937.ab6df3882ff83f67.js": { type: "static" }, "/_next/static/chunks/app/[locale]/[slug]/[...subcategory]/page-55297e3d412df1b6.js": { type: "static" }, "/_next/static/chunks/app/[locale]/[slug]/page-697fabe639407f04.js": { type: "static" }, "/_next/static/chunks/app/[locale]/access-services/page-aa6cca9b0d2aa979.js": { type: "static" }, "/_next/static/chunks/app/[locale]/community-conversations/page-1d2199ef58f59e22.js": { type: "static" }, "/_next/static/chunks/app/[locale]/content-curation/[slug]/page-9a39cbe5c4874420.js": { type: "static" }, "/_next/static/chunks/app/[locale]/home/page-7eecdbcc7fc210af.js": { type: "static" }, "/_next/static/chunks/app/[locale]/layout-539d1b199748780e.js": { type: "static" }, "/_next/static/chunks/app/[locale]/moderator-user-dashboard/page-4ec197f7c8ffe63a.js": { type: "static" }, "/_next/static/chunks/app/[locale]/resources/page-8c3767f201b4ee3c.js": { type: "static" }, "/_next/static/chunks/app/[locale]/search-form/page-d06a6a0b9ea9aa4f.js": { type: "static" }, "/_next/static/chunks/app/[locale]/user-dashboard/page-5f3252ffcfb93d9d.js": { type: "static" }, "/_next/static/chunks/app/[locale]/user-login/page-b6730a2d7f6a3488.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-64c4ea532142b381.js": { type: "static" }, "/_next/static/chunks/fd9d1056-ff4fdbedfca4f040.js": { type: "static" }, "/_next/static/chunks/framework-8e0e0f4a6b83a956.js": { type: "static" }, "/_next/static/chunks/main-app-500f30d267eba5ba.js": { type: "static" }, "/_next/static/chunks/main-f3fa669ee4cf4b64.js": { type: "static" }, "/_next/static/chunks/pages/_app-3c9ca398d360b709.js": { type: "static" }, "/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/reactPlayerDailyMotion.4ce428e08da56f81.js": { type: "static" }, "/_next/static/chunks/reactPlayerFacebook.6979e1333a813b2f.js": { type: "static" }, "/_next/static/chunks/reactPlayerFilePlayer.e6d2f3c959f28902.js": { type: "static" }, "/_next/static/chunks/reactPlayerKaltura.eaab6ce37fc042fc.js": { type: "static" }, "/_next/static/chunks/reactPlayerMixcloud.ef2fad3b53af30de.js": { type: "static" }, "/_next/static/chunks/reactPlayerMux.68eaedd8a8e83a03.js": { type: "static" }, "/_next/static/chunks/reactPlayerPreview.3288e310f09a775e.js": { type: "static" }, "/_next/static/chunks/reactPlayerSoundCloud.2ebfd388e85a0b77.js": { type: "static" }, "/_next/static/chunks/reactPlayerStreamable.969e004edd1ba6b0.js": { type: "static" }, "/_next/static/chunks/reactPlayerTwitch.8983e9ea06739e4b.js": { type: "static" }, "/_next/static/chunks/reactPlayerVidyard.30aeaa5727b7e224.js": { type: "static" }, "/_next/static/chunks/reactPlayerVimeo.fdfc8213d8c50230.js": { type: "static" }, "/_next/static/chunks/reactPlayerWistia.d8da9ed3d80f4ac6.js": { type: "static" }, "/_next/static/chunks/reactPlayerYouTube.04ada298e347d23f.js": { type: "static" }, "/_next/static/chunks/webpack-c0e056ed0abfa2f5.js": { type: "static" }, "/_next/static/css/04782da6ba82c408.css": { type: "static" }, "/_next/static/css/052e10ff1e933389.css": { type: "static" }, "/_next/static/css/197eca8b456d9962.css": { type: "static" }, "/_next/static/css/2503cbc0e87124de.css": { type: "static" }, "/_next/static/css/43297c68f9c2716a.css": { type: "static" }, "/_next/static/css/664cdaeb3a2cc914.css": { type: "static" }, "/_next/static/css/83551098d66f9b4a.css": { type: "static" }, "/_next/static/css/84b4e35d673573a7.css": { type: "static" }, "/_next/static/css/8c741ee167cf8609.css": { type: "static" }, "/_next/static/css/8eaaaf866a0c2e09.css": { type: "static" }, "/_next/static/css/914e9a6f9a361edc.css": { type: "static" }, "/_next/static/css/9b2e2e898bb3e179.css": { type: "static" }, "/_next/static/css/a101c9487cf28e68.css": { type: "static" }, "/_next/static/css/ac677f3becdb0fb9.css": { type: "static" }, "/_next/static/css/bab1586a31c43985.css": { type: "static" }, "/_next/static/css/e43b06b632714ec1.css": { type: "static" }, "/_next/static/css/e8160e47011347cb.css": { type: "static" }, "/_next/static/css/ef09b0611fcf4b6d.css": { type: "static" }, "/_next/static/css/f1ca83a82b5ef1f5.css": { type: "static" }, "/_next/static/css/fcf83f576148fe00.css": { type: "static" }, "/_next/static/media/205af106bef5c7f2-s.p.woff2": { type: "static" }, "/_next/static/media/2967033ad4bbca2a-s.p.woff2": { type: "static" }, "/_next/static/media/2a6285e056ff5bbd-s.p.woff2": { type: "static" }, "/_next/static/media/34b69d3ffdfa75d3-s.woff2": { type: "static" }, "/_next/static/media/40aae5def3a9844f-s.woff2": { type: "static" }, "/_next/static/media/5819a007bcc05f89-s.woff2": { type: "static" }, "/_next/static/media/6f205a32f9825c4c-s.woff2": { type: "static" }, "/_next/static/media/986cf32806d876f3-s.woff2": { type: "static" }, "/_next/static/media/UniversLTStd-Bold.e9b2ada6.otf": { type: "static" }, "/_next/static/media/UniversLTStd.0b9255ca.otf": { type: "static" }, "/_next/static/media/a9455e641565216e-s.p.woff2": { type: "static" }, "/_next/static/media/ae7ddf6c2270b841-s.woff2": { type: "static" }, "/_next/static/media/cbef3626a680ee4f-s.woff2": { type: "static" }, "/_next/static/media/eb89e856e6bc7e7c-s.woff2": { type: "static" }, "/assets/images/background-curve.svg": { type: "static" }, "/assets/images/breadcrumb-arrow.png": { type: "static" }, "/assets/images/breadcrumb-home.png": { type: "static" }, "/assets/images/carousel.png": { type: "static" }, "/assets/images/confirmation-one.png": { type: "static" }, "/assets/images/courses-icon.png": { type: "static" }, "/assets/images/default-avatar.png": { type: "static" }, "/assets/images/dropdown-arrow.svg": { type: "static" }, "/assets/images/exit-icon.png": { type: "static" }, "/assets/images/facebook.svg": { type: "static" }, "/assets/images/featured-cat-stories.png": { type: "static" }, "/assets/images/featured-head-icon.png": { type: "static" }, "/assets/images/feedback.png": { type: "static" }, "/assets/images/guide.png": { type: "static" }, "/assets/images/header-banner-homepage.png": { type: "static" }, "/assets/images/icon-complete-large.png": { type: "static" }, "/assets/images/instagram.svg": { type: "static" }, "/assets/images/laaha-logo_footer.webp": { type: "static" }, "/assets/images/need-help-no-results.webp": { type: "static" }, "/assets/images/podcast-icon.png": { type: "static" }, "/assets/images/registration.svg": { type: "static" }, "/assets/images/review-banner.jpg": { type: "static" }, "/assets/images/subcat-bg.svg": { type: "static" }, "/assets/images/subcat-hero-mobile.svg": { type: "static" }, "/assets/images/subcategory.png": { type: "static" }, "/assets/images/thumbsdown.svg": { type: "static" }, "/assets/images/thumbsup.svg": { type: "static" }, "/assets/images/user.png": { type: "static" }, "/assets/images/video-icon.png": { type: "static" }, "/assets/images/view-icon.png": { type: "static" }, "/favicon.ico": { type: "static" }, "/locales/ar.json": { type: "static" }, "/locales/en.json": { type: "static" }, "/locales/es.json": { type: "static" }, "/locales/fr.json": { type: "static" }, "/locales/ku.json": { type: "static" }, "/locales/ln.json": { type: "static" }, "/locales/my.json": { type: "static" }, "/locales/prs.json": { type: "static" }, "/locales/ps.json": { type: "static" }, "/locales/ro.json": { type: "static" }, "/locales/ru.json": { type: "static" }, "/locales/sw.json": { type: "static" }, "/locales/tr.json": { type: "static" }, "/locales/uk.json": { type: "static" }, "/robots.txt": { type: "static" }, "/sw.js": { type: "static" }, "/[locale]/[slug]/[...subcategory]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug]/[...subcategory].func.js" }, "/[locale]/[slug]/[...subcategory].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug]/[...subcategory].func.js" }, "/[locale]/[slug]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug].func.js" }, "/[locale]/[slug].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug].func.js" }, "/[locale]/access-services": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/access-services.func.js" }, "/[locale]/access-services.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/access-services.func.js" }, "/[locale]/community-conversations": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/community-conversations.func.js" }, "/[locale]/community-conversations.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/community-conversations.func.js" }, "/[locale]/content-curation/[slug]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/content-curation/[slug].func.js" }, "/[locale]/content-curation/[slug].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/content-curation/[slug].func.js" }, "/[locale]/home": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/home.func.js" }, "/[locale]/home.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/home.func.js" }, "/[locale]/moderator-user-dashboard": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/moderator-user-dashboard.func.js" }, "/[locale]/moderator-user-dashboard.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/moderator-user-dashboard.func.js" }, "/[locale]/resources": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/resources.func.js" }, "/[locale]/resources.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/resources.func.js" }, "/[locale]/search-form": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/search-form.func.js" }, "/[locale]/search-form.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/search-form.func.js" }, "/[locale]/user-dashboard": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-dashboard.func.js" }, "/[locale]/user-dashboard.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-dashboard.func.js" }, "/[locale]/user-login": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-login.func.js" }, "/[locale]/user-login.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-login.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/__next_data_catchall": { type: "override", path: "/__next_data_catchall.json", headers: { "content-type": "application/json" } }, "src/middleware": { type: "middleware", entrypoint: "__next-on-pages-dist__/functions/src/middleware.func.js" } };
});
var $ = N((We, F) => {
  "use strict";
  u();
  l();
  p();
  function b(e, t) {
    e = String(e || "").trim();
    let a = e, s, i = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      s = e[0];
      let c = e.lastIndexOf(s);
      i += e.substring(c + 1), e = e.substring(1, c);
    }
    let n = 0;
    return e = le(e, (c) => {
      if (/^\(\?[P<']/.test(c)) {
        let o = /^\(\?P?[<']([^>']+)[>']/.exec(c);
        if (!o)
          throw new Error(`Failed to extract named captures from ${JSON.stringify(c)}`);
        let d = c.substring(o[0].length, c.length - 1);
        return t && (t[n] = o[1]), n++, `(${d})`;
      }
      return c.substring(0, 3) === "(?:" || n++, c;
    }), e = e.replace(/\[:([^:]+):\]/g, (c, o) => b.characterClasses[o] || c), new b.PCRE(e, i, a, i, s);
  }
  __name(b, "b");
  function le(e, t) {
    let a = 0, s = 0, i = false;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      if (i) {
        i = false;
        continue;
      }
      switch (n) {
        case "(":
          s === 0 && (a = r), s++;
          break;
        case ")":
          if (s > 0 && (s--, s === 0)) {
            let c = r + 1, o = a === 0 ? "" : e.substring(0, a), d = e.substring(c), h = String(t(e.substring(a, c)));
            e = o + h + d, r = a;
          }
          break;
        case "\\":
          i = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(le, "le");
  (function(e) {
    class t extends RegExp {
      constructor(s, i, r, n, c) {
        super(s, i), this.pcrePattern = r, this.pcreFlags = n, this.delimiter = c;
      }
    }
    __name(t, "t");
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(b || (b = {}));
  b.prototype = b.PCRE.prototype;
  F.exports = b;
});
var X = N((H) => {
  "use strict";
  u();
  l();
  p();
  H.parse = Re;
  H.serialize = ve;
  var we = Object.prototype.toString, C = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Re(e, t) {
    if (typeof e != "string")
      throw new TypeError("argument str must be a string");
    for (var a = {}, s = t || {}, i = s.decode || Pe, r = 0; r < e.length; ) {
      var n = e.indexOf("=", r);
      if (n === -1)
        break;
      var c = e.indexOf(";", r);
      if (c === -1)
        c = e.length;
      else if (c < n) {
        r = e.lastIndexOf(";", n - 1) + 1;
        continue;
      }
      var o = e.slice(r, n).trim();
      if (a[o] === void 0) {
        var d = e.slice(n + 1, c).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), a[o] = je(d, i);
      }
      r = c + 1;
    }
    return a;
  }
  __name(Re, "Re");
  function ve(e, t, a) {
    var s = a || {}, i = s.encode || ke;
    if (typeof i != "function")
      throw new TypeError("option encode is invalid");
    if (!C.test(e))
      throw new TypeError("argument name is invalid");
    var r = i(t);
    if (r && !C.test(r))
      throw new TypeError("argument val is invalid");
    var n = e + "=" + r;
    if (s.maxAge != null) {
      var c = s.maxAge - 0;
      if (isNaN(c) || !isFinite(c))
        throw new TypeError("option maxAge is invalid");
      n += "; Max-Age=" + Math.floor(c);
    }
    if (s.domain) {
      if (!C.test(s.domain))
        throw new TypeError("option domain is invalid");
      n += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!C.test(s.path))
        throw new TypeError("option path is invalid");
      n += "; Path=" + s.path;
    }
    if (s.expires) {
      var o = s.expires;
      if (!Se(o) || isNaN(o.valueOf()))
        throw new TypeError("option expires is invalid");
      n += "; Expires=" + o.toUTCString();
    }
    if (s.httpOnly && (n += "; HttpOnly"), s.secure && (n += "; Secure"), s.priority) {
      var d = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (d) {
        case "low":
          n += "; Priority=Low";
          break;
        case "medium":
          n += "; Priority=Medium";
          break;
        case "high":
          n += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var h = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (h) {
        case true:
          n += "; SameSite=Strict";
          break;
        case "lax":
          n += "; SameSite=Lax";
          break;
        case "strict":
          n += "; SameSite=Strict";
          break;
        case "none":
          n += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return n;
  }
  __name(ve, "ve");
  function Pe(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Pe, "Pe");
  function ke(e) {
    return encodeURIComponent(e);
  }
  __name(ke, "ke");
  function Se(e) {
    return we.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Se, "Se");
  function je(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(je, "je");
});
u();
l();
p();
u();
l();
p();
u();
l();
p();
var R = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
u();
l();
p();
u();
l();
p();
u();
l();
p();
u();
l();
p();
var q = V($());
function S(e, t, a) {
  if (t == null)
    return { match: null, captureGroupKeys: [] };
  let s = a ? "" : "i", i = [];
  return { match: (0, q.default)(`%${e}%${s}`, i).exec(t), captureGroupKeys: i };
}
__name(S, "S");
function v(e, t, a, { namedOnly: s } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (i, r) => {
    let n = a.indexOf(r);
    return s && n === -1 ? i : (n === -1 ? t[parseInt(r, 10)] : t[n + 1]) || "";
  });
}
__name(v, "v");
function I(e, { url: t, cookies: a, headers: s, routeDest: i }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? T(e.value, s.get(e.key), i) : { valid: s.has(e.key) };
    case "cookie": {
      let r = a[e.key];
      return r && e.value !== void 0 ? T(e.value, r, i) : { valid: r !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? T(e.value, t.searchParams.get(e.key), i) : { valid: t.searchParams.has(e.key) };
  }
}
__name(I, "I");
function T(e, t, a) {
  let { match: s, captureGroupKeys: i } = S(e, t);
  return a && s && i.length ? { valid: !!s, newRouteDest: v(a, s, i, { namedOnly: true }) } : { valid: !!s };
}
__name(T, "T");
u();
l();
p();
function D(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", R), new Request(e, { headers: t });
}
__name(D, "D");
u();
l();
p();
function _(e, t, a) {
  let s = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [i, r] of s) {
    let n = i.toLowerCase(), c = a?.match ? v(r, a.match, a.captureGroupKeys) : r;
    n === "set-cookie" ? e.append(n, c) : e.set(n, c);
  }
}
__name(_, "_");
function P(e) {
  return /^https?:\/\//.test(e);
}
__name(P, "P");
function x(e, t) {
  for (let [a, s] of t.entries()) {
    let i = /^nxtP(.+)$/.exec(a), r = /^nxtI(.+)$/.exec(a);
    i?.[1] ? (e.set(a, s), e.set(i[1], s)) : r?.[1] ? e.set(r[1], s.replace(/(\(\.+\))+/, "")) : (!e.has(a) || !!s && !e.getAll(a).includes(s)) && e.append(a, s);
  }
}
__name(x, "x");
function L(e, t) {
  let a = new URL(t, e.url);
  return x(a.searchParams, new URL(e.url).searchParams), a.pathname = a.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(a, e);
}
__name(L, "L");
function k(e) {
  return new Response(e.body, e);
}
__name(k, "k");
function A(e) {
  return e.split(",").map((t) => {
    let [a, s] = t.split(";"), i = parseFloat((s ?? "q=1").replace(/q *= */gi, ""));
    return [a.trim(), isNaN(i) ? 1 : i];
  }).sort((t, a) => a[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(A, "A");
u();
l();
p();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function j(e, { request: t, assetsFetcher: a, ctx: s }, { path: i, searchParams: r }) {
  let n, c = new URL(t.url);
  x(c.searchParams, r);
  let o = new Request(c, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let d = await import(e.entrypoint);
        try {
          n = await d.default(o, s);
        } catch (h) {
          let m = h;
          throw m.name === "TypeError" && m.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : h;
        }
        break;
      }
      case "override": {
        n = k(await a.fetch(L(o, e.path ?? i))), e.headers && _(n.headers, e.headers);
        break;
      }
      case "static": {
        n = await a.fetch(L(o, i));
        break;
      }
      default:
        n = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return k(n);
}
__name(j, "j");
function B(e, t) {
  let a = "^//?(?:", s = ")/(.*)$";
  return !e.startsWith(a) || !e.endsWith(s) ? false : e.slice(a.length, -s.length).split("|").every((r) => t.has(r));
}
__name(B, "B");
u();
l();
p();
function pe(e, { protocol: t, hostname: a, port: s, pathname: i }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(a).test(e.hostname) || s && !new RegExp(s).test(e.port) || i && !new RegExp(i).test(e.pathname));
}
__name(pe, "pe");
function de(e, t) {
  if (e.method !== "GET")
    return;
  let { origin: a, searchParams: s } = new URL(e.url), i = s.get("url"), r = Number.parseInt(s.get("w") ?? "", 10), n = Number.parseInt(s.get("q") ?? "75", 10);
  if (!i || Number.isNaN(r) || Number.isNaN(n) || !t?.sizes?.includes(r) || n < 0 || n > 100)
    return;
  let c = new URL(i, a);
  if (c.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG)
    return;
  let o = i.startsWith("//"), d = i.startsWith("/") && !o;
  if (!d && !t?.domains?.includes(c.hostname) && !t?.remotePatterns?.find((w) => pe(c, w)))
    return;
  let h = e.headers.get("Accept") ?? "", m = t?.formats?.find((w) => h.includes(w))?.replace("image/", "");
  return { isRelative: d, imageUrl: c, options: { width: r, quality: n, format: m } };
}
__name(de, "de");
function he(e, t, a) {
  let s = new Headers();
  if (a?.contentSecurityPolicy && s.set("Content-Security-Policy", a.contentSecurityPolicy), a?.contentDispositionType) {
    let r = t.pathname.split("/").pop(), n = r ? `${a.contentDispositionType}; filename="${r}"` : a.contentDispositionType;
    s.set("Content-Disposition", n);
  }
  e.headers.has("Cache-Control") || s.set("Cache-Control", `public, max-age=${a?.minimumCacheTTL ?? 60}`);
  let i = k(e);
  return _(i.headers, s), i;
}
__name(he, "he");
async function W(e, { buildOutput: t, assetsFetcher: a, imagesConfig: s }) {
  let i = de(e, s);
  if (!i)
    return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: r, imageUrl: n } = i, o = await (r && n.pathname in t ? a.fetch.bind(a) : fetch)(n);
  return he(o, n, s);
}
__name(W, "W");
u();
l();
p();
u();
l();
p();
var fe = "x-vercel-cache-tags";
var ye = "x-next-cache-soft-tags";
var ge = Symbol.for("__cloudflare-request-context__");
async function z(e) {
  let t = `https://${R}/v1/suspense-cache/`;
  if (!e.url.startsWith(t))
    return null;
  try {
    let a = new URL(e.url), s = await me();
    if (a.pathname === "/v1/suspense-cache/revalidate") {
      let r = a.searchParams.get("tags")?.split(",") ?? [];
      for (let n of r)
        await s.revalidateTag(n);
      return new Response(null, { status: 200 });
    }
    let i = a.pathname.replace("/v1/suspense-cache/", "");
    if (!i.length)
      return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let r = K(e, ye), n = await s.get(i, { softTags: r });
        return n ? new Response(JSON.stringify(n.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (n.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let r = globalThis[ge], n = /* @__PURE__ */ __name(async () => {
          let c = await e.json();
          c.data.tags === void 0 && (c.tags ??= K(e, fe) ?? []), await s.set(i, c);
        }, "n");
        return r ? r.ctx.waitUntil(n()) : await n(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (a) {
    return console.error(a), new Response("Error handling cache request", { status: 500 });
  }
}
__name(z, "z");
async function me() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? G("kv") : G("cache-api");
}
__name(me, "me");
async function G(e) {
  let t = await import(`./__next-on-pages-dist__/cache/${e}.js`);
  return new t.default();
}
__name(G, "G");
function K(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(K, "K");
function Z() {
  globalThis[J] || (_e(), globalThis[J] = true);
}
__name(Z, "Z");
function _e() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let a = new Request(...t), s = await xe(a);
    return s || (s = await z(a), s) ? s : (be(a), e(a));
  };
}
__name(_e, "_e");
async function xe(e) {
  if (e.url.startsWith("blob:"))
    try {
      let a = (await import(`./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`)).default, s = { async arrayBuffer() {
        return a;
      }, get body() {
        return new ReadableStream({ start(i) {
          let r = Buffer.from(a);
          i.enqueue(r), i.close();
        } });
      }, async text() {
        return Buffer.from(a).toString();
      }, async json() {
        let i = Buffer.from(a);
        return JSON.stringify(i.toString());
      }, async blob() {
        return new Blob(a);
      } };
      return s.clone = () => ({ ...s }), s;
    } catch {
    }
  return null;
}
__name(xe, "xe");
function be(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(be, "be");
var J = Symbol.for("next-on-pages fetch patch");
u();
l();
p();
var Y = V(X());
var E = /* @__PURE__ */ __name(class {
  constructor(t, a, s, i, r) {
    this.routes = t;
    this.output = a;
    this.reqCtx = s;
    this.url = new URL(s.request.url), this.cookies = (0, Y.parse)(s.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), x(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = r?.find((n) => n.domain === this.url.hostname), this.locales = new Set(i.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: a, checkIntercept: s }) {
    let i = S(t.src, this.path, t.caseSensitive);
    if (!i.match || t.methods && !t.methods.map((n) => n.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase()))
      return;
    let r = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((n) => {
      let c = I(n, r);
      return c.newRouteDest && (r.routeDest = c.newRouteDest), !c.valid;
    }) && !t.missing?.find((n) => I(n, r).valid) && !(a && t.status !== this.status)) {
      if (s && t.dest) {
        let n = /\/(\(\.+\))+/, c = n.test(t.dest), o = n.test(this.path);
        if (c && !o)
          return;
      }
      return { routeMatch: i, routeDest: r.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let a = "x-middleware-override-headers", s = t.headers.get(a);
    if (s) {
      let o = new Set(s.split(",").map((d) => d.trim()));
      for (let d of o.keys()) {
        let h = `x-middleware-request-${d}`, m = t.headers.get(h);
        this.reqCtx.request.headers.get(d) !== m && (m ? this.reqCtx.request.headers.set(d, m) : this.reqCtx.request.headers.delete(d)), t.headers.delete(h);
      }
      t.headers.delete(a);
    }
    let i = "x-middleware-rewrite", r = t.headers.get(i);
    if (r) {
      let o = new URL(r, this.url), d = this.url.hostname !== o.hostname;
      this.path = d ? `${o}` : o.pathname, x(this.searchParams, o.searchParams), t.headers.delete(i);
    }
    let n = "x-middleware-next";
    t.headers.get(n) ? t.headers.delete(n) : !r && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), _(this.reqCtx.request.headers, t.headers), _(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t)
      return true;
    let a = t && this.output[t];
    if (!a || a.type !== "middleware")
      return this.status = 500, false;
    let s = await j(a, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), s.status === 500 ? (this.status = s.status, false) : (this.processMiddlewareResp(s), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, a, s) {
    !t.headers || (_(this.headers.normal, t.headers, { match: a, captureGroupKeys: s }), t.important && _(this.headers.important, t.headers, { match: a, captureGroupKeys: s }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, a, s) {
    if (!t.dest)
      return this.path;
    let i = this.path, r = t.dest;
    this.wildcardMatch && /\$wildcard/.test(r) && (r = r.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = v(r, a, s);
    let n = /\/index\.rsc$/i.test(this.path), c = /^\/(?:index)?$/i.test(i), o = /^\/__index\.prefetch\.rsc$/i.test(i);
    n && !c && !o && (this.path = i);
    let d = /\.rsc$/i.test(this.path), h = /\.prefetch\.rsc$/i.test(this.path), m = this.path in this.output;
    d && !h && !m && (this.path = this.path.replace(/\.rsc/i, ""));
    let w = new URL(this.path, this.url);
    return x(this.searchParams, w.searchParams), P(this.path) || (this.path = w.pathname), i;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location"))
      return;
    let { locale: { redirect: s, cookie: i } } = t, r = i && this.cookies[i], n = A(r ?? ""), c = A(this.reqCtx.request.headers.get("accept-language") ?? ""), h = [...n, ...c].map((m) => s[m]).filter(Boolean)[0];
    if (h) {
      !this.path.startsWith(h) && (this.headers.normal.set("location", h), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, a) {
    return !this.locales || a !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, a) {
    let s = this.getLocaleFriendlyRoute(a, t), { routeMatch: i, routeDest: r } = this.checkRouteMatch(s, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, n = { ...s, dest: r };
    if (!i?.match || n.middlewarePath && this.middlewareInvoked.includes(n.middlewarePath))
      return "skip";
    let { match: c, captureGroupKeys: o } = i;
    if (this.applyRouteOverrides(n), this.applyLocaleRedirects(n), !await this.runRouteMiddleware(n.middlewarePath))
      return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation)
      return "done";
    this.applyRouteHeaders(n, c, o), this.applyRouteStatus(n);
    let h = this.applyRouteDest(n, c, o);
    if (n.check && !P(this.path))
      if (h === this.path) {
        if (t !== "miss")
          return this.checkPhase(O(t));
        this.status = 404;
      } else if (t === "miss") {
        if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output))
          return this.checkPhase("filesystem");
        this.status === 404 && (this.status = void 0);
      } else
        return this.checkPhase("none");
    return !n.continue || n.status && n.status >= 300 && n.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50)
      return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let a = true;
    for (let r of this.routes[t]) {
      let n = await this.checkRoute(t, r);
      if (n === "error")
        return "error";
      if (n === "done") {
        a = false;
        break;
      }
    }
    if (t === "hit" || P(this.path) || this.headers.normal.has("location") || !!this.body)
      return "done";
    if (t === "none")
      for (let r of this.locales) {
        let n = new RegExp(`/${r}(/.*)`), o = this.path.match(n)?.[1];
        if (o && o in this.output) {
          this.path = o;
          break;
        }
      }
    let s = this.path in this.output;
    if (!s && this.path.endsWith("/")) {
      let r = this.path.replace(/\/$/, "");
      s = r in this.output, s && (this.path = r);
    }
    if (t === "miss" && !s) {
      let r = !this.status || this.status < 400;
      this.status = r ? 404 : this.status;
    }
    let i = "miss";
    return s || t === "miss" || t === "error" ? i = "hit" : a && (i = O(t)), this.checkPhase(i);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let a = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), a;
  }
}, "E");
async function Q(e, t, a, s) {
  let i = new E(t.routes, a, e, s, t.wildcard), r = await ee(i);
  return Ce(e, r, a);
}
__name(Q, "Q");
async function ee(e, t = "none", a = false) {
  return await e.run(t) === "error" || !a && e.status && e.status >= 400 ? ee(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(ee, "ee");
async function Ce(e, { path: t = "/404", status: a, headers: s, searchParams: i, body: r }, n) {
  let c = s.normal.get("location");
  if (c) {
    if (c !== s.middlewareLocation) {
      let h = [...i.keys()].length ? `?${i.toString()}` : "";
      s.normal.set("location", `${c ?? "/"}${h}`);
    }
    return new Response(null, { status: a, headers: s.normal });
  }
  let o;
  if (r !== void 0)
    o = new Response(r, { status: a });
  else if (P(t)) {
    let h = new URL(t);
    x(h.searchParams, i), o = await fetch(h, e.request);
  } else
    o = await j(n[t], e, { path: t, status: a, headers: s, searchParams: i });
  let d = s.normal;
  return _(d, o.headers), _(d, s.important), o = new Response(o.body, { ...o, status: a || o.status, headers: d }), o;
}
__name(Ce, "Ce");
u();
l();
p();
function te() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(te, "te");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t)
    return t;
  let a = Me();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, a), a;
}
__name(Ee, "Ee");
function Me() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: (t, a) => e.has(a) ? e.get(a) : Reflect.get(globalThis, a), set: (t, a, s) => Te.has(a) ? Reflect.set(globalThis, a, s) : (e.set(a, s), true) });
}
__name(Me, "Me");
var Te = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var ys = { async fetch(e, t, a) {
  te(), Z();
  let s = await __ALSes_PROMISE__;
  if (!s) {
    let n = new URL(e.url), c = await t.ASSETS.fetch(`${n.protocol}//${n.host}/cdn-cgi/errors/no-nodejs_compat.html`), o = c.ok ? c.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(o, { status: 503 });
  }
  let { envAsyncLocalStorage: i, requestContextAsyncLocalStorage: r } = s;
  return i.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: R }, async () => r.run({ env: t, ctx: a, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image"))
      return W(e, { buildOutput: y, assetsFetcher: t.ASSETS, imagesConfig: f.images });
    let c = D(e);
    return Q({ request: c, ctx: a, assetsFetcher: t.ASSETS }, f, y, g);
  }));
} };
export {
  ys as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.7160173846343656.mjs.map
