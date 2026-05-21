export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  href: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    number: "01",
    title: "Digital marketing",
    short:
      "Integrated programs across SEO, paid media, content and CRM. One team, one funnel, one P&L.",
    href: "/digital-marketing",
    capabilities: [
      "Full-funnel media planning",
      "Paid search & social",
      "Programmatic & retargeting",
      "Attribution & measurement",
      "Lifecycle & email",
      "HubSpot CRM enablement",
    ],
  },
  {
    slug: "seo-agency-sydney",
    number: "02",
    title: "SEO & AEO",
    short:
      "Be the answer — in classic search and in AI. Technical foundations, editorial depth, and entity-led optimisation.",
    href: "/seo-agency-sydney",
    capabilities: [
      "Technical SEO audits",
      "Site architecture & internal linking",
      "Keyword & topic strategy",
      "AEO for AI search",
      "Programmatic SEO",
      "Local & international",
    ],
  },
  {
    slug: "content-creation",
    number: "03",
    title: "Content creation",
    short:
      "Editorial, video and social built for search visibility and the way people actually read now.",
    href: "/content-creation",
    capabilities: [
      "Editorial planning",
      "Long-form articles & guides",
      "Short-form video",
      "Photography & art direction",
      "Social-first formats",
      "Localisation",
    ],
  },
  {
    slug: "digital-strategy",
    number: "04",
    title: "Digital strategy",
    short:
      "We don't run media without a thesis. Research, audience work, and a roadmap you can defend to a board.",
    href: "/digital-strategy",
    capabilities: [
      "Category & competitor research",
      "Audience & jobs-to-be-done",
      "Channel mix modelling",
      "Brand & messaging",
      "Roadmaps & KPIs",
      "Quarterly reviews",
    ],
  },
  {
    slug: "website-app-development",
    number: "05",
    title: "Web & app development",
    short:
      "E-commerce, marketplaces and lead-gen platforms — engineered for Core Web Vitals, conversion and search.",
    href: "/website-app-development",
    capabilities: [
      "Headless commerce",
      "Marketplace platforms",
      "Lead-gen & landing pages",
      "Umbraco CMS",
      "Performance & Core Web Vitals",
      "Analytics & event tracking",
    ],
  },
];
