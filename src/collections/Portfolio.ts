import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'projectName',
    defaultColumns: ['projectName', 'client', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'projectName',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      hasMany: true,
    },
    {
      name: 'lucideIcon',
      type: 'text',
      required: false,
      admin: {
        description: 'Name of the Lucide icon to display (e.g., "Laptop", "Smartphone", "Code")',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'projectDetails',
      type: 'richText',
      required: true,
    },
  ],
  timestamps: true,
}
