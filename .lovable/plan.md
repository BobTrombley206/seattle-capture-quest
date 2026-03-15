

# Migrating from Lovable Hosting to Cloudflare Pages with SSR

## Important Context

Lovable doesn't natively support deploying to Cloudflare Pages or server-side rendering. This is a **manual migration** you'd perform outside Lovable. Your current app is a client-side React SPA — converting it to SSR requires adopting a framework like **Remix** or **Astro** that supports Cloudflare Pages as a deploy target.

---

## High-Level Steps

### 1. Export Your Code via GitHub
- Connect your Lovable project to GitHub (Settings → GitHub)
- This gives you a full copy of the codebase to work with locally

### 2. Choose an SSR Framework
Your current stack is plain React + Vite (no SSR). You need to migrate to one of:

| Framework | Cloudflare Pages Support | Effort |
|-----------|------------------------|--------|
| **Remix** | First-class (built-in adapter) | Medium — closest to current React code |
| **Astro** | First-class | Medium — good for content-heavy sites like yours |
| **Next.js** | Via `@cloudflare/next-on-pages` | Higher — more opinionated |

**Recommendation: Remix or Astro** — both have official Cloudflare Pages adapters and your site is relatively simple (landing page + booking form).

### 3. Migrate Components
- Your React components (`HeroSection`, `PackagesSection`, `Book`, etc.) can be reused almost as-is in Remix
- Route structure maps cleanly: `pages/Index.tsx` → `app/routes/_index.tsx`, `pages/Book.tsx` → `app/routes/book.tsx`
- Tailwind, Framer Motion, and shadcn/ui all work in Remix/Astro

### 4. Handle Backend Functions
Your Supabase edge functions (`create-checkout`, `process-email-queue`) are **independent of hosting** — they stay on Lovable Cloud and are called via `supabase.functions.invoke()`. No changes needed.

Alternatively, you could move checkout logic into Cloudflare Workers/Pages Functions, but there's no immediate benefit since Supabase edge functions already work.

### 5. Deploy to Cloudflare Pages
1. Create a Cloudflare Pages project linked to your GitHub repo
2. Set build command (e.g., `npm run build`) and output directory
3. Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

### 6. Update DNS
- In Cloudflare DNS, remove the A record pointing to `185.158.133.1`
- Cloudflare Pages will automatically configure DNS when you add `pnwportraits.com` as a custom domain in the Pages project settings
- Remove the domain from Lovable (Settings → Domains)

---

## What You Keep from Lovable
- **Database & edge functions** — Lovable Cloud backend continues working regardless of where the frontend is hosted
- **Stripe integration** — no changes needed

## What Changes
- Frontend hosting moves to Cloudflare Pages
- You manage builds/deploys via GitHub + Cloudflare dashboard
- You lose Lovable's one-click publish (you'd use `git push` instead)
- Future UI changes in Lovable still work — just push to GitHub and Cloudflare auto-deploys

---

## Estimated Effort
For someone comfortable with the terminal: **2-4 hours** for a Remix migration, plus DNS propagation time.

