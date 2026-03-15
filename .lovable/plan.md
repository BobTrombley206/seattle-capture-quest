

# Plan: Custom Edge Function for Semantic Bot Rendering

## Approach

Replace the Prerender.io middleware with a **backend edge function** (`render-seo`) that generates a complete, semantic HTML page for bots. No external service needed — the function returns hand-crafted HTML with all content, metadata, Schema.org microdata, and semantic markup.

## How It Works

```text
Request → Cloudflare Pages middleware
              ↓
     Is it a bot? (user-agent check)
        /            \
      YES             NO
       ↓               ↓
  Call render-seo     Serve SPA
  edge function       (static files)
  (returns semantic HTML)
```

## What Gets Built

### 1. Edge Function: `supabase/functions/render-seo/index.ts`

A backend function that accepts a `path` parameter and returns a full semantic HTML document containing:

**Semantic HTML structure:**
- `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- `<figure>` / `<figcaption>` for gallery images

**Complete meta tags per route:**
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

**Schema.org microdata (JSON-LD):**
- `LocalBusiness` with `OfferCatalog` (homepage)
- `Review` with `AggregateRating` for testimonials
- `FAQPage` if applicable
- `BreadcrumbList` for navigation
- `ImageGallery` for the gallery section

**Routes rendered:**
| Path | Content |
|------|---------|
| `/` | Full homepage: hero text, overview, packages with prices/features, how it works steps, about section, all 4 reviews, CTA |
| `/book` | Booking page with package options and pricing |
| `/booking-success` | Confirmation message |
| `/booking-canceled` | Cancellation message |

All text content is extracted directly from the existing React components and hardcoded into the edge function — no React rendering needed.

### 2. Update `functions/_middleware.ts`

Replace the Prerender.io proxy with a call to the `render-seo` edge function:
```typescript
if (BOT_AGENTS.test(ua) && isPageRequest) {
  const seoUrl = `${SUPABASE_URL}/functions/v1/render-seo`;
  const res = await fetch(seoUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ANON_KEY}` },
    body: JSON.stringify({ path: url.pathname })
  });
  return new Response(await res.text(), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" }
  });
}
```

### 3. Update `supabase/config.toml`

Add `[functions.render-seo]` with `verify_jwt = false` (public endpoint, no auth needed).

## Content Included in Semantic HTML

All content from the current components:
- **Hero**: "Capture Your Seattle Adventure", location list, value props (24hr delivery, local guide, couples/solo/families)
- **Overview**: "Your Seattle Story, Beautifully Told" + description paragraphs
- **Packages**: All 3 packages with names, prices, durations, photo counts, feature lists
- **How It Works**: 4 steps with titles and descriptions
- **Gallery**: Image references with descriptive alt text
- **About**: "Your Local Seattle Guide" + bio paragraphs
- **Reviews**: All 4 reviews with text, author, and 5-star ratings
- **CTA**: "Turn Your Seattle Trip Into Beautiful Memories"

## Files Changed

| File | Action |
|------|--------|
| `supabase/functions/render-seo/index.ts` | **Create** — semantic HTML generator |
| `functions/_middleware.ts` | **Update** — call render-seo instead of Prerender.io |
| `supabase/config.toml` | **Update** — add render-seo function config |

