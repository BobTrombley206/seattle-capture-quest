

# Plan: SSR/Prerendering for Bots on Cloudflare Pages (Keep React SPA)

## Approach: Dynamic Rendering via Cloudflare Worker

Instead of switching frameworks, we use a **dynamic rendering** strategy:
- **Regular users** → get the normal React SPA (fast, client-side)
- **Bots** (Googlebot, Twitterbot, ChatGPT, etc.) → get a pre-rendered HTML snapshot with full content

This is Google's recommended approach for SPAs and requires zero framework changes.

## Architecture

```text
Request → Cloudflare Pages
              ↓
        Worker (middleware)
              ↓
     Is it a bot? (user-agent check)
        /            \
      YES             NO
       ↓               ↓
  Prerender service   Serve SPA
  (returns full HTML)  (static files)
```

## Steps to Execute (done outside Lovable)

### 1. Deploy to Cloudflare Pages
- Your GitHub repo is already connected — go to **Cloudflare Dashboard → Pages → Create Project**
- Select your repo, set:
  - **Build command:** `npm run build`
  - **Output directory:** `dist`
  - **Environment variables:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`

### 2. Add a Cloudflare Pages Function for Bot Detection
Create `functions/_middleware.ts` in your repo root (Cloudflare Pages convention):

```typescript
const BOT_AGENTS = /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|linkedinbot|slackbot|chatgpt-user|gptbot|claudebot|anthropic-ai|perplexity/i;

export const onRequest: PagesFunction = async (context) => {
  const ua = context.request.headers.get("user-agent") || "";
  
  if (BOT_AGENTS.test(ua)) {
    // Option A: Use Prerender.io (managed service, free tier available)
    const prerenderUrl = `https://service.prerender.io/${context.request.url}`;
    const response = await fetch(prerenderUrl, {
      headers: { "X-Prerender-Token": context.env.PRERENDER_TOKEN }
    });
    return new Response(await response.text(), {
      headers: { "Content-Type": "text/html" }
    });
  }
  
  // Normal users get the SPA
  return context.next();
};
```

### 3. Prerendering Options (pick one)

| Option | Cost | Setup |
|--------|------|-------|
| **Prerender.io** | Free up to 250 pages/mo | Sign up, get token, add as env var |
| **Self-hosted Puppeteer** on Cloudflare Worker | Free | More complex, use `@cloudflare/puppeteer` |
| **Static prerender at build time** | Free | Add `vite-plugin-prerender` to generate HTML at build |

**Recommendation:** Start with **`vite-plugin-prerender`** (zero cost, no external service). It generates static HTML for your 4 routes at build time. Bots get the static HTML; users get the SPA.

### 4. Static Prerender at Build Time (simplest option)
Add to your repo locally:
```bash
npm install vite-plugin-prerender --save-dev
```

Update `vite.config.ts` to prerender `/`, `/book`, `/booking-success`, `/booking-canceled` into static HTML files. The Worker middleware then serves these to bots.

### 5. Update DNS
- In Cloudflare dashboard, add `pnwportraits.com` as custom domain on the Pages project
- Remove the old A record pointing to `185.158.133.1`
- Cloudflare handles SSL automatically

### 6. Remove Lovable Domain
- In Lovable: Settings → Domains → disconnect `pnwportraits.com`

## What Stays the Same
- All code in Lovable (components, styles, routing) — unchanged
- Backend functions (checkout, email) — still on Lovable Cloud
- Stripe integration — unchanged
- You can still edit in Lovable → pushes to GitHub → Cloudflare auto-deploys

## SEO Benefits
- Bots see fully rendered HTML with all text content, structured data, meta tags
- ChatGPT/Perplexity/Claude can read your page content for citations
- No "empty div" problem that SPAs have with some crawlers

