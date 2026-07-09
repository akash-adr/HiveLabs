import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Serve .mov files as video/mp4 so Chrome & Firefox attempt H.264 decode
        source: "/:path*.mov",
        headers: [
          { key: "Content-Type", value: "video/mp4" },
          // Allow range requests for video seeking
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
    ]
  },
}

export default nextConfig
