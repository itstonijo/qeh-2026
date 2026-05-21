import type { APIRoute } from "astro";

const robots = `User-agent: *
Allow: /

Sitemap: https://covert.example.com/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(robots, { headers: { "Content-Type": "text/plain" } });
