import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-18';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo';

import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'HANCOCO Content Studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
  ],
});
