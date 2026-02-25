import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemaTypes';
import { baseStructure } from '@features/structure/structure';

export default defineConfig({
  name: 'default',
  title: 'Eclipse',
  projectId: 'o7fi7oqy',
  dataset: 'production',
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
