import type { NextConfig } from "next";

const PORTAL_ORIGIN = "https://sew-lab-back-portal.vercel.app";

const nextConfig: NextConfig = {
  // 307s so bookmarked same-origin /admin/login and /customer/login still
  // reach the real portal. Do not rewrite/proxy the Next.js portal through
  // this marketing app — that serves the portal HTML without its CSS and
  // posts NextAuth to sew-lab.com /api/auth.
  async redirects() {
    return [
      {
        source: "/admin/login",
        destination: `${PORTAL_ORIGIN}/admin/login`,
        permanent: false,
      },
      {
        source: "/customer/login",
        destination: `${PORTAL_ORIGIN}/customer/login`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
