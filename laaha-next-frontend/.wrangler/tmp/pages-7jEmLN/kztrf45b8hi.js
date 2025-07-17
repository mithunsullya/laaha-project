// <define:__ROUTES__>
var define_ROUTES_default = { version: 1, description: "Built with @cloudflare/next-on-pages@1.13.5.", include: ["/*"], exclude: ["/_next/static/*"] };

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/mithun/Public/laaha-next-frontend/.wrangler/tmp/pages-7jEmLN/bundledWorker-0.5031847351542906.mjs";
import { isRoutingRuleMatch } from "/home/mithun/Public/laaha-next-frontend/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/mithun/Public/laaha-next-frontend/.wrangler/tmp/pages-7jEmLN/bundledWorker-0.5031847351542906.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=kztrf45b8hi.js.map
