/**
 * Sanity CLI Configuration for Frontend
 * This file configures typegen for the frontend workspace.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { defineCliConfig } from '@sanity/cli';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  typegen: {
    path: './src/libs/sanity/**/*.{ts,tsx,js,jsx}',
    schema: '../sanity.schema.json',
    generates: './src/libs/sanity/types/sanity.types.ts',
    overloadClientMethods: true,
  },
});
