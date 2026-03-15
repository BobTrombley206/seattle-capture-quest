const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://pnwportraits.com";
const OG_IMAGE = `${SITE}/og-image.jpg`;

/* ------------------------------------------------------------------ */
/*  Page-level metadata                                                */
/* ------------------------------------------------------------------ */
interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

const pageMeta: Record<string, PageMeta> = {
  "/": {
    title:
      "PNW Portraits — Seattle Photo Walk & Portrait Photography Experience",
    description:
      "Professional portrait photography at Seattle's most iconic locations. Guided photo walks through Pike Place Market, the waterfront, and downtown Seattle. Photos delivered within 24 hours.",
    canonical: SITE,
  },
  "/book": {
    title: "Book Your Seattle Photo Session — PNW Portraits",
    description:
      "Reserve your guided photo walk in Seattle. Choose from 3 packages starting at $150. Pike Place Market, waterfront, and skyline locations.",
    canonical: `${SITE}/book`,
  },
  "/booking-success": {
    title: "Booking Confirmed — PNW Portraits",
    description:
      "Your Seattle photo session is confirmed! Check your email for session details. Edited photos delivered within 24 hours.",
    canonical: `${SITE}/booking-success`,
  },
  "/booking-canceled": {
    title: "Booking Canceled — PNW Portraits",
    description:
      "Your booking was canceled and you have not been charged. Feel free to try again whenever you're ready.",
    canonical: `${SITE}/booking-canceled`,
  },
};

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                            */
/* ------------------------------------------------------------------ */
function homeJsonLd(): string {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#business`,
    name: "PNW Portraits",
    url: SITE,
    image: OG_IMAGE,
    description:
      "Professional portrait photography and guided photo walks at Seattle's most iconic locations.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seattle",
      addressRegion: "WA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.6062,
      longitude: -122.3321,
    },
    priceRange: "$150–$550",
    telephone: "",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photo Walk Packages",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Seattle Photo Walk",
          price: "150.00",
          priceCurrency: "USD",
          description:
            "60 minute guided photo walk with 10 professionally edited photos at Pike Place Market and downtown locations.",
          url: `${SITE}/book?package=photo-walk`,
        },
        {
          "@type": "Offer",
          name: "Seattle Adventure Portrait Session",
          price: "275.00",
          priceCurrency: "USD",
          description:
            "90 minute session with 20 edited photos at multiple iconic locations including Pike Place Market, waterfront, and skyline views.",
          url: `${SITE}/book?package=adventure`,
        },
        {
          "@type": "Offer",
          name: "VIP Private Photo Experience",
          price: "550.00",
          priceCurrency: "USD",
          description:
            "2–3 hour private photography session with 40+ edited photos, fully customized route through Seattle.",
          url: `${SITE}/book?package=vip`,
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "4",
      bestRating: "5",
      worstRating: "5",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sarah & Mike" },
        reviewBody:
          "This was the highlight of our Seattle trip. The photos came out amazing and we discovered parts of the city we would have missed.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Priya K." },
        reviewBody:
          "As a solo traveler, I finally have gorgeous photos of myself on vacation. The whole experience felt like exploring with a friend.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "James & Lea" },
        reviewBody:
          "We booked the VIP session for our engagement and it was worth every penny. The photos captured Seattle and us perfectly.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Tom R." },
        reviewBody:
          "Photos delivered same evening! Professional, friendly, and knew all the best spots. Highly recommend for anyone visiting Seattle.",
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE,
      },
    ],
  };

  const imageGallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "PNW Portraits Gallery",
    description:
      "Portfolio of Seattle portrait and travel photography at Pike Place Market, the waterfront, and downtown.",
    image: [
      {
        "@type": "ImageObject",
        name: "Pike Place Market portrait",
        contentUrl: `${SITE}/assets/hero-pike-place.jpg`,
      },
      {
        "@type": "ImageObject",
        name: "Seattle skyline at sunset",
        contentUrl: `${SITE}/assets/hero-skyline.jpg`,
      },
      {
        "@type": "ImageObject",
        name: "Gum Wall lifestyle photo",
        contentUrl: `${SITE}/assets/gallery-gumwall.jpg`,
      },
      {
        "@type": "ImageObject",
        name: "Waterfront sunset portrait",
        contentUrl: `${SITE}/assets/gallery-sunset.jpg`,
      },
      {
        "@type": "ImageObject",
        name: "Candid couple photography",
        contentUrl: `${SITE}/assets/hero-couple.jpg`,
      },
      {
        "@type": "ImageObject",
        name: "Walking travel portrait",
        contentUrl: `${SITE}/assets/hero-waterfront.jpg`,
      },
    ],
  };

  return [localBusiness, breadcrumb, imageGallery]
    .map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`)
    .join("\n");
}

function bookJsonLd(): string {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Book", item: `${SITE}/book` },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
}

/* ------------------------------------------------------------------ */
/*  HTML builders per route                                            */
/* ------------------------------------------------------------------ */
function head(meta: PageMeta, jsonLd: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<link rel="canonical" href="${meta.canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${meta.canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:site_name" content="PNW Portraits">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.title}">
<meta name="twitter:description" content="${meta.description}">
<meta name="twitter:image" content="${OG_IMAGE}">
${jsonLd}
</head>`;
}

function nav(): string {
  return `<header role="banner">
<nav aria-label="Main navigation">
<a href="${SITE}">PNW Portraits</a>
<ul>
<li><a href="${SITE}/#packages">Packages</a></li>
<li><a href="${SITE}/#gallery">Gallery</a></li>
<li><a href="${SITE}/#about">About</a></li>
<li><a href="${SITE}/book">Book Now</a></li>
</ul>
</nav>
</header>`;
}

function footer(): string {
  return `<footer role="contentinfo">
<p>© ${new Date().getFullYear()} PNW Portraits. All rights reserved.</p>
<nav aria-label="Footer navigation">
<ul>
<li><a href="${SITE}/#packages">Packages</a></li>
<li><a href="${SITE}/#gallery">Gallery</a></li>
<li><a href="${SITE}/#about">About</a></li>
</ul>
</nav>
</footer>`;
}

/* ---------- Homepage ---------- */
function homePage(): string {
  const meta = pageMeta["/"];
  const jsonLd = homeJsonLd();

  return `${head(meta, jsonLd)}
<body>
${nav()}
<main>

<section aria-label="Hero">
<h1>Capture Your Seattle Adventure</h1>
<p>📍 Pike Place Market · Waterfront · Downtown Seattle</p>
<p>Professional portraits at Seattle's most iconic locations. Explore the city with a local photographer and leave with beautiful photos of your trip.</p>
<ul aria-label="Key benefits">
<li>Photos delivered within 24 hours</li>
<li>Guided by a local Seattle photographer</li>
<li>Perfect for couples, solo travelers, families, and content creators</li>
</ul>
<a href="${SITE}/book">Book Your Photo Walk</a>
<a href="${SITE}/#packages">View Packages</a>
</section>

<section aria-label="Overview">
<h2>Your Seattle Story, Beautifully Told</h2>
<p>PNW Portraits offers guided photo walks through Seattle's most photogenic locations. Guests explore Pike Place Market, the waterfront, and historic downtown while a professional photographer captures beautiful portraits and candid moments.</p>
<p>Perfect for travelers who want professional photos of their Seattle adventure.</p>
<p><strong>Photos delivered within 24 hours.</strong></p>
</section>

<section id="packages" aria-label="Packages">
<h2>Packages</h2>
<p>Limited sessions available each week · Secure online booking</p>

<article>
<h3>Seattle Photo Walk</h3>
<p><strong>$150</strong></p>
<ul>
<li>60 minute guided photo walk</li>
<li>10 professionally edited photos</li>
<li>Pike Place Market and downtown locations</li>
<li>Perfect for solo travelers or couples</li>
</ul>
<a href="${SITE}/book?package=photo-walk">Book Now</a>
</article>

<article>
<h3>Seattle Adventure Portrait Session</h3>
<p><strong>$275</strong> — Most Popular</p>
<ul>
<li>90 minute session</li>
<li>20 edited photos</li>
<li>Multiple iconic locations (Pike Place Market, waterfront, skyline views)</li>
<li>Creative portrait and lifestyle photography</li>
</ul>
<a href="${SITE}/book?package=adventure">Book Now</a>
</article>

<article>
<h3>VIP Private Photo Experience</h3>
<p><strong>$550</strong></p>
<ul>
<li>2–3 hour private photography session</li>
<li>Fully customized route through Seattle</li>
<li>40+ edited photos</li>
<li>Cinematic portrait shots and optional Insta360 content</li>
<li>Ideal for influencers, engagements, or special occasions</li>
</ul>
<a href="${SITE}/book?package=vip">Book Now</a>
</article>
</section>

<section id="gallery" aria-label="Gallery">
<h2>Gallery</h2>
<figure><img src="${SITE}/assets/hero-pike-place.jpg" alt="Pike Place Market portrait photography in Seattle" loading="lazy"><figcaption>Pike Place Market portrait</figcaption></figure>
<figure><img src="${SITE}/assets/hero-skyline.jpg" alt="Seattle skyline at sunset" loading="lazy"><figcaption>Seattle skyline</figcaption></figure>
<figure><img src="${SITE}/assets/gallery-gumwall.jpg" alt="Lifestyle photo at Seattle Gum Wall" loading="lazy"><figcaption>Gum Wall lifestyle photo</figcaption></figure>
<figure><img src="${SITE}/assets/gallery-sunset.jpg" alt="Waterfront sunset portrait in Seattle" loading="lazy"><figcaption>Waterfront sunset portrait</figcaption></figure>
<figure><img src="${SITE}/assets/hero-couple.jpg" alt="Candid couple photography in downtown Seattle" loading="lazy"><figcaption>Candid couple photography</figcaption></figure>
<figure><img src="${SITE}/assets/hero-waterfront.jpg" alt="Walking travel portrait at Seattle waterfront" loading="lazy"><figcaption>Walking travel portrait</figcaption></figure>
</section>

<section aria-label="How it works">
<h2>How It Works</h2>
<ol>
<li><strong>Book your time online</strong> — Choose a session and reserve your spot.</li>
<li><strong>Meet your photographer</strong> — We'll meet you in downtown Seattle.</li>
<li><strong>Walk through iconic locations</strong> — Explore Pike Place, the waterfront, and more.</li>
<li><strong>Receive edited photos within 24 hours</strong> — Delivered to your inbox, ready to share.</li>
</ol>
</section>

<section id="about" aria-label="About">
<h2>Your Local Seattle Guide</h2>
<img src="${SITE}/assets/hero-waterfront.jpg" alt="PNW Portraits photographer in Seattle" loading="lazy">
<p>I'm a photographer and lifelong Pacific Northwest local who knows every corner of Pike Place Market, Pioneer Square, and the downtown waterfront.</p>
<p>My photo walks combine authentic local storytelling with professional photography — so you don't just get beautiful images, you get a genuine Seattle experience with stories and hidden spots you won't find in any guidebook.</p>
<a href="${SITE}/book">Book a Session</a>
</section>

<section aria-label="Reviews">
<h2>What Travelers Say</h2>

<article itemscope itemtype="https://schema.org/Review">
<meta itemprop="reviewRating" content="5">
<blockquote itemprop="reviewBody">"This was the highlight of our Seattle trip. The photos came out amazing and we discovered parts of the city we would have missed."</blockquote>
<p>— <span itemprop="author">Sarah &amp; Mike, Denver</span></p>
</article>

<article itemscope itemtype="https://schema.org/Review">
<meta itemprop="reviewRating" content="5">
<blockquote itemprop="reviewBody">"As a solo traveler, I finally have gorgeous photos of myself on vacation. The whole experience felt like exploring with a friend."</blockquote>
<p>— <span itemprop="author">Priya K., London</span></p>
</article>

<article itemscope itemtype="https://schema.org/Review">
<meta itemprop="reviewRating" content="5">
<blockquote itemprop="reviewBody">"We booked the VIP session for our engagement and it was worth every penny. The photos captured Seattle and us perfectly."</blockquote>
<p>— <span itemprop="author">James &amp; Lea, Austin</span></p>
</article>

<article itemscope itemtype="https://schema.org/Review">
<meta itemprop="reviewRating" content="5">
<blockquote itemprop="reviewBody">"Photos delivered same evening! Professional, friendly, and knew all the best spots. Highly recommend for anyone visiting Seattle."</blockquote>
<p>— <span itemprop="author">Tom R., Chicago</span></p>
</article>
</section>

<section aria-label="Call to action">
<h2>Turn Your Seattle Trip Into Beautiful Memories</h2>
<p>Professional portraits at Seattle's most iconic locations.</p>
<a href="${SITE}/book">Reserve Your Photo Walk</a>
</section>

</main>
${footer()}
</body>
</html>`;
}

/* ---------- Book page ---------- */
function bookPage(): string {
  const meta = pageMeta["/book"];
  const jsonLd = bookJsonLd();

  return `${head(meta, jsonLd)}
<body>
${nav()}
<main>
<h1>Book Your Session</h1>
<p>Choose your package, pick a date, and you're all set.</p>

<section aria-label="Package selection">
<h2>Choose Your Package</h2>
<article>
<h3>Seattle Photo Walk</h3>
<p>60 min · 10 photos · <strong>$150</strong></p>
</article>
<article>
<h3>Adventure Portrait Session</h3>
<p>90 min · 20 photos · <strong>$275</strong> — Most Popular</p>
</article>
<article>
<h3>VIP Private Experience</h3>
<p>2-3 hrs · 40+ photos · <strong>$550</strong></p>
</article>
</section>

<section aria-label="Booking form">
<h2>Session Details</h2>
<p>Select a date and time, enter your name and email, then continue to secure payment via Stripe.</p>
</section>
</main>
${footer()}
</body>
</html>`;
}

/* ---------- Booking success ---------- */
function successPage(): string {
  const meta = pageMeta["/booking-success"];
  return `${head(meta, "")}
<body>
${nav()}
<main>
<h1>You're Booked!</h1>
<p>Payment confirmed. Check your email for session details and meeting point info.</p>
<p>Your edited photos will be delivered within 24 hours of your session.</p>
<a href="${SITE}">Back to Home</a>
</main>
${footer()}
</body>
</html>`;
}

/* ---------- Booking canceled ---------- */
function canceledPage(): string {
  const meta = pageMeta["/booking-canceled"];
  return `${head(meta, "")}
<body>
${nav()}
<main>
<h1>Booking Canceled</h1>
<p>No worries — your session wasn't booked and you haven't been charged. Feel free to try again whenever you're ready.</p>
<a href="${SITE}/book">Try Again</a>
<a href="${SITE}">Back to Home</a>
</main>
${footer()}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/* ------------------------------------------------------------------ */
function renderPage(path: string): string {
  const clean = path.replace(/\/+$/, "") || "/";
  switch (clean) {
    case "/":
      return homePage();
    case "/book":
      return bookPage();
    case "/booking-success":
      return successPage();
    case "/booking-canceled":
      return canceledPage();
    default:
      return homePage(); // fallback to homepage for unknown routes
  }
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { path = "/" } = await req.json();
    const html = renderPage(path);

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch {
    // If no body or bad JSON, render homepage
    const html = renderPage("/");
    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
});
