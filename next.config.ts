import type { NextConfig } from "next";

const PORTAL_ORIGIN = "https://sew-lab-back-portal.vercel.app";

const nextConfig: NextConfig = {
  // afterFiles so the marketing /login chooser (a real page) is never proxied.
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/admin/:path*",
          destination: `${PORTAL_ORIGIN}/admin/:path*`,
        },
        {
          source: "/customer/:path*",
          destination: `${PORTAL_ORIGIN}/customer/:path*`,
        },
        {
          source: "/portal/:path*",
          destination: `${PORTAL_ORIGIN}/portal/:path*`,
        },
        {
          source: "/api/auth/:path*",
          destination: `${PORTAL_ORIGIN}/api/auth/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
