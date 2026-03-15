

# Step-by-Step Migration to Cloudflare Pages

## Problem First
The build is broken because `vite-plugin-prerender` uses `require()` internally, which is incompatible with ESM mode. This needs fixing before anything else.

## Step 1: Fix the Build Error

**What to do in Lovable:**
- Remove `vite-plugin-prerender` from `vite.config.ts` — it cannot run in Lovable's build environment (it needs Puppeteer/Chrome which isn't available in the sandbox)
- Restore `vite.config.ts` to the standard config (React + componentTagger only)
- Keep `vite-plugin-prerender` in `package.json` so it's available when you build locally or on Cloudflare

The prerender plugin only runs during `npm run build` in production mode, so it only matters on your actual build server (Cloudflare), not in Lovable's preview.

**Fix:** Wrap the import in a dynamic `import()` so it only loads in production builds, or simply remove it from the Lovable config and add it when building locally.

## Step 2: Set Up Cloudflare Pages

1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages**
2. Click **Connect to Git** and select your GitHub repo
3. Configure build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL` = `https://xxqcbwyftledvxqmrhfc.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your anon key
   - `VITE_SUPABASE_PROJECT_ID` = `xxqcbwyftledvxqmrhfc`
5. Click **Save and Deploy**

> **Note:** The first deploy will likely fail because `vite-plugin-prerender` requires Puppeteer. See Step 3 for the fix.

## Step 3: Make Prerendering Work on Cloudflare Build

Cloudflare's build environment doesn't have Chrome/Puppeteer. Two options:

**Option A (Recommended): Remove vite-plugin-prerender entirely.** Instead, use a simpler approach — generate static HTML via a custom build script that uses a lightweight renderer. Or skip prerendering and rely solely on the `functions/_middleware.ts` with a free Prerender.io account.

**Option B: Use `react-snap` or a headless Chrome buildpack.** This is more complex and fragile.

**Simplest path forward:**
1. Remove `vite-plugin-prerender` entirely from the project
2. Sign up for **Prerender.io** (free tier: 250 pages/month — more than enough for 4 routes)
3. Update `functions/_middleware.ts` to proxy bot requests to Prerender.io:

```typescript
if (BOT_AGENTS.test(ua) && isPageRequest) {
  const prerenderUrl = `https://service.prerender.io/${context.request.url}`;
  const response = await fetch(prerenderUrl, {
    headers: { "X-Prerender-Token": context.env.PRERENDER_TOKEN }
  });
  if (response.ok) {
    return new Response(await response.text(), {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
}
```

4. Add `PRERENDER_TOKEN` as an environment variable in Cloudflare Pages settings

## Step 4: Connect Your Custom Domain

1. In **Cloudflare Pages** project → **Custom domains** → Add `pnwportraits.com`
2. Cloudflare will automatically configure DNS (since the domain is already on Cloudflare)
3. Remove the old **A record** pointing to `185.158.133.1` if it still exists
4. In **Lovable** → Settings → Domains → disconnect `pnwportraits.com`
5. SSL is automatic — no action needed

---

## Summary of Code Changes Needed

| File | Change |
|------|--------|
| `vite.config.ts` | Remove `vite-plugin-prerender` import and plugin config |
| `package.json` | Remove `vite-plugin-prerender` from dependencies |
| `functions/_middleware.ts` | Update to use Prerender.io instead of static files |
| `src/main.tsx` | Can remove the `render-event` dispatch (no longer needed) |

## After Migration
- Edit in Lovable → auto-pushes to GitHub → Cloudflare auto-deploys
- Bots get fully rendered HTML via Prerender.io
- Users get the fast SPA
- Backend functions stay on Lovable Cloud unchanged

