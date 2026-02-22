import {defineCliConfig} from 'sanity/cli'
import path from 'path';

export default defineCliConfig({
  api: {
    projectId: 'o7fi7oqy',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  vite: {
    resolve: {
      alias: [
        {
          find: '@features',
          replacement: path.resolve(__dirname, './src/features'),
        },
        {
          find: '@molecules',
          replacement: path.resolve(__dirname, './src/components/_molecules'),
        },
        {
          find: '@organisms',
          replacement: path.resolve(__dirname, './src/components/_organisms'),
        },
      ],
    },
  },
});
