// @ts-check

import path from 'path';
import { varlockNextConfigPlugin } from '@varlock/nextjs-integration/plugin';
import svgoConfig from './svgo.config.ts';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  turbopack: {
    root: path.join(import.meta.dirname, '..'),
    rules: {
      '*.inline.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

const withVarlock = varlockNextConfigPlugin();

export default withVarlock(nextConfig);
