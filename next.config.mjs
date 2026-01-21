/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    images: {
        domains: [
            "utfs.io",
            "drive.google.com"
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'maam6l4ubv.ufs.sh',
                pathname: '/**',
            },
        ],
        // Optimize responsive behavior
        deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
        formats: ["image/avif", "image/webp"],
    },
    async headers() {
        return [
            {
                // Long cache for static assets only (avoid HTML/doc caching)
                source: "/:path*\\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2|ttf)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable"
                    }
                ]
            }
        ];
    }
};

export default withBundleAnalyzer(nextConfig);
