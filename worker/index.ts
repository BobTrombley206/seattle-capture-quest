/**
 * Cloudflare Worker — Dynamic Rendering for Bots + Static Asset Serving
 *
 * Regular users  → SPA (static assets via Assets binding with SPA fallback)
 * Bots / crawlers → semantic HTML via render-seo edge function
 */

const BOT_AGENTS =
  /googlebot|google-extended|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|linkedinbot|slackbot|chatgpt-user|gptbot|claudebot|anthropic-ai|perplexitybot|applebot|duckduckbot|ia_archiver|rogerbot|embedly|showyoubot|outbrain|pinterestbot|quora link preview|redditbot|whatsapp|telegrambot|discordbot/i;

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const ua = request.headers.get("user-agent") || "";
    const url = new URL(request.url);
    const cleanPath = url.pathname.replace(/\/+$/, "") || "/";

    // Only intercept navigation requests (HTML pages), not assets
    const isPageRequest =
      !url.pathname.match(/\.\w{2,5}$/) || url.pathname.endsWith(".html");

    // Skip bot rendering for post-checkout pages (they need client-side JS)
    const skipBotRender =
      cleanPath === "/booking-success" || cleanPath === "/booking-canceled";

    // Bot detection: serve pre-rendered HTML for SEO
    if (!skipBotRender && BOT_AGENTS.test(ua) && isPageRequest) {
      try {
        const response = await fetch(
          `${env.SUPABASE_URL}/functions/v1/render-seo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ path: cleanPath }),
          }
        );

        if (response.ok) {
          return new Response(await response.text(), {
            status: 200,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "X-Rendered-For": "bot",
              "Cache-Control": "public, max-age=3600, s-maxage=86400",
              Vary: "User-Agent",
            },
          });
        }
      } catch {
        // Fall through to SPA if edge function fails
      }
    }

    // For all non-bot requests, pass directly to ASSETS binding.
    // The wrangler.toml `not_found_handling = "single-page-application"`
    // handles SPA routing automatically (serves index.html for unknown paths).
    return env.ASSETS.fetch(request);
  },
};
