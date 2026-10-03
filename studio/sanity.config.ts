import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemaTypes';
import { baseStructure } from '@features/structure/structure';
import { tags } from 'sanity-plugin-tags-v4';
import { ENV } from 'varlock/env';

export default defineConfig({
  name: 'adamhopkins_dev',
  title: 'adamhopkins.dev',
  projectId: ENV.SANITY_STUDIO_PROJECT_ID,
  dataset: ENV.SANITY_STUDIO_DATASET,
  plugins: [
    structureTool({
      structure: baseStructure,
    }),
    visionTool(),
    tags({}),
  ],
  schema: {
    types: schemaTypes,
  },
});
