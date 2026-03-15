/**
 * Cloudflare Worker — SPA Router + Static Assets
 *
 * Temporary stable mode: serve React SPA for all page routes.
 */

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const isAssetRequest = /\.\w{2,5}$/.test(url.pathname) && !url.pathname.endsWith(".html");
    const isPageRequest = !isAssetRequest;

    if (isPageRequest && (request.method === "GET" || request.method === "HEAD")) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = "/index.html";
      const indexReq = new Request(indexUrl.toString(), request);
      const response = await env.ASSETS.fetch(indexReq);

      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
