import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    // 301 secondary domain → canonical (owner decision 1). Works once return-refund.com is attached to this project.
    return [
      { source: "/:path*", has: [{ type: "host", value: "(www\\.)?return-refund\\.com" }], destination: "https://refund-return.com/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www\\.refund-return\\.com" }], destination: "https://refund-return.com/:path*", permanent: true },
    ];
  },
};
export default nextConfig;
