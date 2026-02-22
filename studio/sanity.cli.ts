import { defineCliConfig } from 'sanity/cli';
import path from 'path';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  schemaExtraction: {
    path: '../sanity.schema.json',
    enabled: true,
    enforceRequiredFields: true,
  },
  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}',
    schema: '../sanity.schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
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
