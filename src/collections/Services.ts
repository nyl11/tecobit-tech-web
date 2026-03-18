import type { CollectionConfig } from 'payload'
import { Hero, ContentGrid, CTA, Stats, Map, Team, PageHero as PageHeroBlock, SplitHero, Process, LogoStrip, EnhancedCTA } from '../payload-blocks/ArchiveBlocks'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }: { value?: string; data?: Record<string, string> }) => {
            if (value)
              return value
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            if (data?.title)
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            return value
          },
        ],
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'lucideIcon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g., Sailboat, Phone, Laptop)',
      },
      required: false,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, ContentGrid, Stats, CTA, Map, Team, PageHeroBlock, SplitHero, Process, LogoStrip, EnhancedCTA],
      required: false,
    },
    {
      name: 'detailedDescription',
      type: 'richText',
      required: true,
      admin: {
        condition: (data: Record<string, unknown>) => !data.layout || (data.layout as unknown[]).length === 0,
      },
    },
  ],
  timestamps: true,
}
