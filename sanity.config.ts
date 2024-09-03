'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {defineConfig, SchemaTypeDefinition} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'
import {deskStructure} from './src/sanity/deskStructure'

export default defineConfig({
  basePath: '/studio', // Add this line
  name: 'default',
  title: 'Ambition Tracker',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
})
