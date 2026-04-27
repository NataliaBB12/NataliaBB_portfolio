import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        // Link headers on every page for agent discovery (RFC 8288)
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: [
              '</sitemap.xml>; rel="sitemap"; type="application/xml"',
              '<https://natalia.design/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
