/**
 * Cloudflare Pages Middleware — Dynamic Rendering for Bots
 *
 * Regular users  → SPA (client-side React)
 * Bots / crawlers → semantic HTML via render-seo edge function
 */

const BOT_AGENTS =
  /googlebot|google-extended|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|linkedinbot|slackbot|chatgpt-user|gptbot|claudebot|anthropic-ai|perplexitybot|applebot|duckduckbot|ia_archiver|rogerbot|embedly|showyoubot|outbrain|pinterestbot|quora link preview|redditbot|whatsapp|telegrambot|discordbot/i;

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const ua = context.request.headers.get("user-agent") || "";
  const url = new URL(context.request.url);

  // Only intercept navigation requests (HTML pages), not assets
  const isPageRequest =
    !url.pathname.match(/\.\w{2,5}$/) || url.pathname.endsWith(".html");

  if (BOT_AGENTS.test(ua) && isPageRequest) {
    try {
      const supabaseUrl = context.env.SUPABASE_URL;
      const anonKey = context.env.SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/render-seo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({ path: url.pathname }),
        }
      );

      if (response.ok) {
        return new Response(await response.text(), {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "X-Rendered-For": "bot",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      }
    } catch {
      // Fall through to SPA if edge function fails
    }
  }

  // Normal users (and bots without a rendered page) get the SPA
  return context.next();
};
