import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemaTypes';
import { baseStructure } from '@features/structure/structure';
import { tags } from 'sanity-plugin-tags-v4';
import { ENV } from 'varlock/env';
import { media, mediaAssetSource } from 'sanity-plugin-media';

export default defineConfig({
  name: 'adamhopkins_dev',
  title: 'adamhopkins.dev',
  projectId: ENV.SANITY_STUDIO_PROJECT_ID,
  dataset: ENV.SANITY_STUDIO_DATASET,
  plugins: [
    media(),
    structureTool({
      structure: baseStructure,
    }),
    visionTool(),
    tags({}),
  ],
  form: {
    // Disable the default for image assets
    image: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(
          assetSource => assetSource === mediaAssetSource,
        );
      },
    },
    // Disable the default for file assets
    file: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(
          assetSource => assetSource === mediaAssetSource,
        );
      },
    },
  },
  schema: {
    types: schemaTypes,
  },
});
