import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'serviceNeeded', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      const typedUser = user as unknown as User | null
      return !!typedUser?.roles?.includes('admin')
    },
    update: () => false,
    delete: ({ req: { user } }) => {
      const typedUser = user as unknown as User | null
      return !!typedUser?.roles?.includes('admin')
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'serviceNeeded',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
