import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    // Chống clickjacking nhưng vẫn cho phép self-embed để hiển thị preview mẫu nội bộ
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    // Chống MIME sniffing attacks
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    // Chống XSS attacks
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    // Referrer policy
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    // Giới hạn quyền truy cập các tính năng nhạy cảm
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()'
  },
  {
    // Content Security Policy - cho phép Google Fonts, Supabase, Unsplash, Mixkit audio
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' https: blob: data: https://assets.mixkit.co; connect-src 'self' https://*.supabase.co https://images.unsplash.com https://fonts.googleapis.com https://fonts.gstatic.com https://assets.mixkit.co; frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps; frame-ancestors 'self'; object-src 'none';"
  }
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  // Configure Next.js Image for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  // Hide Next.js technology stack footprint
  poweredByHeader: false,
};

export default nextConfig;
