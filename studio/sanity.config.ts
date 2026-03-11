import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemaTypes';
import { baseStructure } from '@features/structure/structure';

export default defineConfig({
  name: 'eclipse_content_studio',
  title: 'Eclipse',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    structureTool({
      structure: baseStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
