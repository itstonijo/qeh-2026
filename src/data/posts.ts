export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "aeo-vs-seo-in-2026",
    title: "AEO vs SEO in 2026 — what actually changed?",
    category: "AEO",
    date: "2026-04-22",
    readTime: "6 min",
    excerpt:
      "Answer Engine Optimisation isn't a rebrand of SEO — it's a different surface, a different ranking model, and a different relationship with the click.",
    body: [
      "If you treat AEO as 'SEO for ChatGPT', you'll spend a year building keyword pages that never get rendered. AEO is a structurally different game: the entity, not the URL, is what's ranked.",
      "We're seeing three things that decisively work in 2026. First: clean schema and structured data — not because Google said so, but because the answer engines lean on it harder than the old ten blue links ever did.",
      "Second: editorial depth. The summary is the answer, but the citation pulls through the source that earned the right to be summarised. Thin pages don't get cited. Pages with original data, named experts and a clear point of view do.",
      "Third: distribution. AEO surfaces don't crawl your site nightly. You have to show up where the model is being trained or grounded — which means Wikipedia, Reddit, YouTube transcripts, and the press your team has been ignoring for a decade.",
    ],
  },
  {
    slug: "hubspot-as-a-revenue-os",
    title: "HubSpot as a revenue OS — not a CRM",
    category: "CRM",
    date: "2026-03-30",
    readTime: "5 min",
    excerpt:
      "Most HubSpot implementations stop at lifecycle stages and a 'demo request' form. The teams pulling pipeline out of it treat it as the operating system of the company.",
    body: [
      "There's a version of HubSpot where it stores contacts and sends emails. And then there's the version where it scores leads against revenue, routes them to the right human in under 90 seconds, and gives the marketing team a P&L conversation with finance.",
      "The second version isn't bought. It's built. It requires that someone in the room can connect the lead lifecycle to the unit economics, and write the workflows that enforce them.",
      "When we install HubSpot at Covert, we start with a revenue model on a whiteboard and work backwards — properties, lifecycle stages, pipelines and reports fall out of that model, not the other way round.",
    ],
  },
  {
    slug: "programmatic-seo-without-spam",
    title: "Programmatic SEO without the spam smell",
    category: "SEO",
    date: "2026-02-14",
    readTime: "7 min",
    excerpt:
      "Yes, programmatic SEO still works in 2026. No, it doesn't look like the 10,000-page directory plays of 2019.",
    body: [
      "The mistake is generating pages because you can. The discipline is generating pages because a user out there actually has the question and nobody is answering it well.",
      "We build programmatic SEO around three constraints: the question has search demand, we have original data the competition doesn't, and the page can be useful even if the user never converts.",
      "Hold those three lines and the algorithm rewards it. Drop one and you're building the next penalty case study.",
    ],
  },
  {
    slug: "paid-search-feeds-as-a-product",
    title: "Treat your product feed like a product",
    category: "Paid media",
    date: "2026-01-12",
    readTime: "4 min",
    excerpt:
      "If your shopping feed is a nightly cron and a prayer, you're leaving most of your peak revenue on the table.",
    body: [
      "Most of the post-iOS-14 e-commerce performance gains we've seen at Covert came from one boring place: the feed. Versioned, monitored, instrumented, owned.",
      "Treat feed quality as a product KPI — coverage, freshness, attribute completeness — and the bidding algorithms reward you for it without you ever touching a bid.",
    ],
  },
  {
    slug: "the-quiet-comeback-of-editorial",
    title: "The quiet comeback of editorial",
    category: "Content",
    date: "2025-12-02",
    readTime: "5 min",
    excerpt:
      "After a decade of 'content marketing' meaning a 600-word listicle, the work that ranks and gets cited in 2026 looks a lot more like journalism.",
    body: [
      "The AI overviews didn't kill content. They killed bad content. The page that gets pulled into the answer panel almost always has three things: a real expert's name on it, original data or commentary, and an angle you can argue with.",
      "That's editorial. That's the job. The agencies still pumping out generic SEO articles for $200 a piece will not enjoy 2026.",
    ],
  },
];
