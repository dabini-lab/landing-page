/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires, no-console, import/no-dynamic-require, global-require */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

// Conditionally apply bundle analyzer only when ANALYZE=true and the package is available
let exportConfig = nextConfig;

if (process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
    exportConfig = withBundleAnalyzer(nextConfig);
  } catch (error) {
    console.warn('Bundle analyzer not available, proceeding without it');
  }
}

module.exports = exportConfig;
