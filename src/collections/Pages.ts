import type { CollectionConfig } from 'payload'
import { Hero, ContentGrid, CTA, Stats, Map, Team, PageHero } from '../payload-blocks/ArchiveBlocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
          ({ value, data }) => {
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
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, ContentGrid, Stats, CTA, Map, Team, PageHero],
      required: true,
    },
  ],
  timestamps: true,
}
