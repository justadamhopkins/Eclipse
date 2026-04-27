import { type Config } from 'svgo';

export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
          inlineStyles: {
            onlyMatchedOnce: false,
          },
        },
      },
    },
    'removeXMLNS',
    'removeDimensions',
    'removeMetadata',
  ],
} satisfies Config;
