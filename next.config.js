/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { join } = require('path');
const { readFileSync } = require('fs');

let config;
try {
  const configPath = join(__dirname, 'next.config.original');
  const originalConfig = readFileSync(configPath, 'utf8');
  // eslint-disable-next-line no-eval
  config = eval(originalConfig.replace('module.exports =', ''));
} catch {
  config = {
    eslint: {
      dirs: ['.'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    reactStrictMode: true,
    output: 'export',
    images: {
      unoptimized: true,
    },
  };
}

const appHostingConfig = {
  ...config,
  ...(config.images?.unoptimized === undefined && {
    images: { unoptimized: true },
  }),
  trailingSlash: true,
  output: undefined,
};

module.exports = withBundleAnalyzer(appHostingConfig);
