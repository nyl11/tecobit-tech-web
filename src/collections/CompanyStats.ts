import type { CollectionConfig } from 'payload'

export const CompanyStats: CollectionConfig = {
  slug: 'company-stats',
  labels: {
    singular: 'Company Stat',
    plural: 'Company Stats',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'value', 'displayOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Happy Clients" or "Projects Completed"',
      },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "50+", "10M", "100%"',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Controls the order they appear on the frontend (lower numbers appear first)',
      },
    },
  ],
  timestamps: true,
}
