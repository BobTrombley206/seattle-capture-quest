/**
 * Cloudflare Pages Middleware — Dynamic Rendering for Bots
 *
 * Regular users  → SPA (client-side React)
 * Bots / crawlers → pre-rendered HTML via Prerender.io
 */

const BOT_AGENTS =
  /googlebot|google-extended|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|linkedinbot|slackbot|chatgpt-user|gptbot|claudebot|anthropic-ai|perplexitybot|applebot|duckduckbot|ia_archiver|rogerbot|embedly|showyoubot|outbrain|pinterestbot|quora link preview|redditbot|whatsapp|telegrambot|discordbot/i;

interface Env {
  PRERENDER_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const ua = context.request.headers.get("user-agent") || "";
  const url = new URL(context.request.url);

  // Only intercept navigation requests (HTML pages), not assets
  const isPageRequest =
    !url.pathname.match(/\.\w{2,5}$/) || url.pathname.endsWith(".html");

  if (BOT_AGENTS.test(ua) && isPageRequest) {
    try {
      const prerenderUrl = `https://service.prerender.io/${context.request.url}`;
      const response = await fetch(prerenderUrl, {
        headers: { "X-Prerender-Token": context.env.PRERENDER_TOKEN || "" },
      });

      if (response.ok) {
        return new Response(await response.text(), {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "X-Rendered-For": "bot",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch {
      // Fall through to SPA if prerender service fails
    }
  }

  // Normal users (and bots without a prerendered page) get the SPA
  return context.next();
};
