

# Plan: Switch from Cloudflare Pages to Cloudflare Workers

## The Disconnect

Currently the `functions/_middleware.ts` file uses the **Cloudflare Pages Functions** API (`PagesFunction`, `context.next()`). Cloudflare Workers uses a different API — a `fetch` handler that explicitly fetches static assets from a bound KV namespace or R2 bucket, or more commonly via **Workers Sites** or **Workers + Assets**.

The key architectural difference:
- **Pages**: middleware intercepts requests, falls through to static hosting via `context.next()`
- **Workers**: you ARE the server — you must explicitly serve static files (via Assets binding) or proxy to an origin

## Approach

Replace the Pages middleware with a **Cloudflare Worker** that:
1. Detects bots → calls the `render-seo` edge function
2. For all other requests → serves the SPA static assets via the Workers **Assets binding** (the modern, free approach — no KV needed)

## What Changes

### 1. Delete `functions/_middleware.ts`
No longer needed — Pages Functions format.

### 2. Create `worker/index.ts`
A Cloudflare Worker entry point:

```typescript
export default {
  async fetch(request, env) {
    const ua = request.headers.get("user-agent") || "";
    const url = new URL(request.url);
    const isBot = BOT_AGENTS.test(ua);
    const isPage = !url.pathname.match(/\.\w{2,5}$/) || url.pathname.endsWith(".html");

    if (isBot && isPage) {
      // Call render-seo edge function
      const res = await fetch(`${env.SUPABASE_URL}/functions/v1/render-seo`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ path: url.pathname }),
      });
      if (res.ok) return new Response(await res.text(), {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" }
      });
    }

    // Serve static assets (SPA)
    return env.ASSETS.fetch(request);
  }
};
```

### 3. Create `wrangler.toml`
Configuration for Workers + Assets deployment:

```toml
name = "pnw-portraits"
main = "worker/index.ts"
compatibility_date = "2024-09-23"

[assets]
directory = "dist"

[vars]
SUPABASE_URL = "https://xxqcbwyftledvxqmrhfc.supabase.co"

# SUPABASE_ANON_KEY should be added as a secret via:
# wrangler secret put SUPABASE_ANON_KEY
```

The `[assets]` binding tells Workers to serve files from `dist/` and exposes `env.ASSETS.fetch()` for fallback.

### 4. Add SPA routing fallback
For client-side routing, configure a `_routes.json` or handle it in the worker — when a static asset isn't found, serve `index.html`. The worker handles this naturally since `env.ASSETS.fetch()` can be configured to fall back to the SPA entry point.

## Deployment Flow

```text
npm run build          → produces dist/
npx wrangler deploy    → uploads worker + dist/ assets to Cloudflare
```

No Cloudflare Pages project needed. Just a Workers project on the free tier.

## Cloudflare Setup Instructions

1. Install Wrangler: `npm install -D wrangler`
2. Login: `npx wrangler login`
3. Add the anon key as a secret: `npx wrangler secret put SUPABASE_ANON_KEY`
4. Deploy: `npx wrangler deploy`
5. Add custom domain in Cloudflare Dashboard → Workers → your worker → Settings → Domains & Routes

## Files Changed

| File | Action |
|------|--------|
| `functions/_middleware.ts` | **Delete** |
| `worker/index.ts` | **Create** — Worker fetch handler with bot detection |
| `wrangler.toml` | **Create** — Worker + Assets config |
| `package.json` | **Update** — add `wrangler` as devDependency and deploy script |

