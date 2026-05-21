export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  industry: string;
  region: string;
  year: string;
  services: string[];
  hero: { eyebrow: string; statement: string };
  results: { label: string; value: string }[];
  scope: string[];
  approach: { heading: string; body: string }[];
  quote?: { body: string; name: string; role: string };
  size: "lg" | "md" | "sm";
  accent: string;
};

export const work: CaseStudy[] = [
  {
    slug: "dilusso-appliances",
    client: "Di Lusso Appliances",
    title: "Built a luxury kitchen brand into a distributor magnet.",
    summary:
      "Digital acquisition and editorial strategy for an Italian-engineered luxury kitchen appliance manufacturer — generating qualified distributor leads while compounding brand authority with property developers and the kitchen trade.",
    industry: "Luxury appliances",
    region: "Australia",
    year: "2024 — present",
    services: ["Digital strategy", "SEO & AEO", "Content creation", "Paid media", "HubSpot CRM"],
    hero: {
      eyebrow: "Case study · Luxury appliances",
      statement:
        "From cold catalogue to category authority — a 12-month operating system for showroom, trade and consumer demand.",
    },
    results: [
      { label: "Distributor leads / mo", value: "+312%" },
      { label: "Organic sessions", value: "+184%" },
      { label: "Cost per qualified lead", value: "−46%" },
      { label: "Tier-1 trade press features", value: "9" },
    ],
    scope: [
      "Audience research across property developers, kitchen designers and end consumers",
      "Editorial system spanning specification guides, design stories and showroom content",
      "Programmatic SEO for product, finish and capacity pages",
      "HubSpot CRM build with distributor-lead scoring",
      "Always-on paid search and trade-targeted social",
    ],
    approach: [
      {
        heading: "Mapped a three-audience funnel",
        body: "We split the program by buyer: developers needed spec sheets and timelines, designers needed mood and finish detail, consumers needed reassurance. Each got its own content track, its own keywords, and its own measurement.",
      },
      {
        heading: "Made the catalogue searchable",
        body: "Product pages were rebuilt against the queries real buyers type — capacity, fuel type, finish, room style. Internal linking pulled the long tail through to high-intent showroom requests.",
      },
      {
        heading: "Turned PR into pipeline",
        body: "Trade-press features were repurposed into landing pages, sequenced into CRM, and fed back into paid retargeting. PR stopped being a vanity line on a quarterly report.",
      },
    ],
    quote: {
      body: "Covert plug into the business like an internal team. The distributor pipeline they've built didn't exist 12 months ago.",
      name: "Head of Marketing",
      role: "Di Lusso Appliances",
    },
    size: "lg",
    accent: "from-amber-300/20 to-amber-500/10",
  },
  {
    slug: "buyers-agency",
    client: "Australia's leading buyer's agency",
    title: "Owned page one for the queries that actually convert.",
    summary:
      "A full SEO and content program for Australia's leading buyer's agency — moving from agency-name searches to ranking on the high-intent property and suburb queries their clients live on.",
    industry: "Property",
    region: "Australia",
    year: "2023 — present",
    services: ["SEO & AEO", "Content creation", "Digital strategy"],
    hero: {
      eyebrow: "Case study · Property",
      statement:
        "From brand-search dependent to category-defining — a content engine that compounds week on week.",
    },
    results: [
      { label: "Non-branded organic", value: "+421%" },
      { label: "Top-3 rankings", value: "612" },
      { label: "Lead form submissions", value: "+148%" },
      { label: "Avg. position, target terms", value: "2.4" },
    ],
    scope: [
      "Keyword and topic strategy across capital-city and regional markets",
      "Programmatic suburb-profile pages with original data",
      "AEO optimisation for AI Overviews and conversational search",
      "Editorial calendar and ghost-writing for the principals",
      "Technical SEO and Core Web Vitals remediation",
    ],
    approach: [
      {
        heading: "Stopped chasing trophy keywords",
        body: "We mapped the actual decision journey of a buyer's-agency client and went after the questions they ask weeks before they hire anyone. Less competitive, far higher intent.",
      },
      {
        heading: "Built a programmatic spine",
        body: "Hundreds of suburb pages with original median, yield and capital-growth data — each one a doorway to consult bookings.",
      },
      {
        heading: "Made the principals the brand",
        body: "Ghost-written long-form essays under the founders' names did more for trust and ranking than any landing-page tweak. We turned expertise into entity authority.",
      },
    ],
    quote: {
      body: "We used to win because we were known. Now we win on Google before clients even know us.",
      name: "Founding Director",
      role: "Buyer's Agency",
    },
    size: "md",
    accent: "from-emerald-300/15 to-emerald-500/5",
  },
  {
    slug: "salon-group",
    client: "Europe's largest hair salon group · AU",
    title: "Filled chairs across 15 salons — without discounting.",
    summary:
      "National digital marketing strategy for the Australian arm of Europe's largest hair salon group — driving appointments across all 15 locations and rebalancing the mix away from voucher-led media.",
    industry: "Beauty & retail",
    region: "Australia",
    year: "2022 — present",
    services: ["Digital strategy", "Paid media", "SEO & AEO", "Content creation"],
    hero: {
      eyebrow: "Case study · Beauty",
      statement:
        "A national booking engine that respected the brand and the colourist economy underneath it.",
    },
    results: [
      { label: "Appointments / mo", value: "+62%" },
      { label: "Cost per booking", value: "−38%" },
      { label: "Salons hitting target", value: "15 / 15" },
      { label: "Discount-led revenue share", value: "−71%" },
    ],
    scope: [
      "Location-level booking funnel for 15 salons",
      "Always-on paid search and Meta program",
      "Local SEO and Google Business Profile management",
      "Brand-led content shoots, four times a year",
      "Booking analytics and chair-utilisation reporting",
    ],
    approach: [
      {
        heading: "Salon-by-salon economics",
        body: "We built a model that priced a booking by salon, by service, by chair — and only spent media where the next appointment was profitable.",
      },
      {
        heading: "Killed the discount habit",
        body: "Voucher-led campaigns were quietly switched off and replaced with brand and intent media. Bookings held, margin recovered.",
      },
      {
        heading: "Local SEO at fleet scale",
        body: "Every location got its own page, profile, review pipeline and editorial. Map-pack visibility went from intermittent to default.",
      },
    ],
    size: "md",
    accent: "from-rose-300/15 to-rose-500/5",
  },
  {
    slug: "gaming-esports",
    client: "World-leading gaming & eSports brand",
    title: "An AU launch playbook for a global gaming brand.",
    summary:
      "Australia-focused digital strategy for a world-leading gaming and eSports brand — building category presence, community and a measurable creator program in a market dominated by global publishers.",
    industry: "Gaming · eSports",
    region: "Australia",
    year: "2024",
    services: ["Digital strategy", "Content creation", "Paid media"],
    hero: {
      eyebrow: "Case study · Gaming",
      statement:
        "A market-entry plan that treated the AU audience like a community, not a region on a slide.",
    },
    results: [
      { label: "Creator partners onboarded", value: "84" },
      { label: "Owned community", value: "+412%" },
      { label: "Tournament sign-ups", value: "19,400" },
      { label: "Brand-search lift", value: "+228%" },
    ],
    scope: [
      "Market-entry strategy and competitive map",
      "Creator and team partnership framework",
      "Always-on social and community ops",
      "Paid acquisition for tournaments and product",
      "Measurement against community + commerce KPIs",
    ],
    approach: [
      {
        heading: "Found the AU centre of gravity",
        body: "We profiled the games, the streamers and the LANs that actually move Australian players — and pointed the entire program at them.",
      },
      {
        heading: "Built a creator ladder",
        body: "Tiered partnerships from grassroots streamers up to tier-one teams, with clear, audited deliverables on both sides.",
      },
      {
        heading: "Measured what matters",
        body: "Community size, retention and event participation sat next to sales — the brand started planning quarters on the same dashboard.",
      },
    ],
    size: "sm",
    accent: "from-violet-300/20 to-violet-500/5",
  },
  {
    slug: "online-roses",
    client: "World's largest online roses retailer",
    title: "A three-market paid search engine that ships roses.",
    summary:
      "Global paid search strategy across the UK, USA and Singapore for the world's largest online roses retailer — peak-trading reliability with a unified bidding logic across currencies, languages and seasons.",
    industry: "E-commerce · Floristry",
    region: "UK · USA · SG",
    year: "2023 — present",
    services: ["Paid media", "Digital strategy", "Web & app development"],
    hero: {
      eyebrow: "Case study · Global e-commerce",
      statement:
        "Three markets, one bidding brain — and a peak-trading week that finally stopped feeling like a panic.",
    },
    results: [
      { label: "Blended ROAS", value: "6.4x" },
      { label: "Revenue (peak weeks)", value: "+58%" },
      { label: "CPA, evergreen", value: "−27%" },
      { label: "Markets under one stack", value: "3" },
    ],
    scope: [
      "Unified paid search and shopping across UK, USA and SG",
      "Custom feed engineering and inventory-aware bidding",
      "Localised landing pages and offers",
      "Peak-trading playbooks for Valentine's, Mother's Day, Christmas",
      "Cross-market measurement and forecasting",
    ],
    approach: [
      {
        heading: "One brain, three markets",
        body: "We rebuilt the account structure so the algorithm could learn across markets without confusing currencies, occasions or stock availability.",
      },
      {
        heading: "Feeds as a product",
        body: "Product data was treated like a product itself — versioned, monitored, and tied directly to the bidding logic. Out-of-stock losses fell to near zero.",
      },
      {
        heading: "Made peak boring",
        body: "Playbooks, war rooms and pre-built creative meant the team walked into Valentine's week with a checklist instead of an adrenaline drip.",
      },
    ],
    size: "sm",
    accent: "from-pink-300/20 to-pink-500/5",
  },
];

export const workBySlug = Object.fromEntries(work.map((w) => [w.slug, w]));
