import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'highlightedTitle',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const ContentGrid: Block = {
  slug: 'contentGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Columns (2 Col)', value: 'columns' },
      ],
    },
    {
      name: 'itemStyle',
      type: 'select',
      defaultValue: 'card',
      options: [
        { label: 'Card with Icon', value: 'card' },
        { label: 'Simple with Checkmark', value: 'simple' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'grid',
      },
    },
    {
      name: 'populateFrom',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Manual Input', value: 'manual' },
        { label: 'Services Collection', value: 'services' },
      ],
      admin: {
        description:
          'Choose whether to manually input items or pull them automatically from Services.',
      },
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData.populateFrom === 'manual',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'lucideIcon',
          type: 'text',
          admin: {
            description: 'Lucide icon name (e.g., Sailboat, Phone, Laptop)',
          },
        },
      ],
    },
  ],
}

export const CTA: Block = {
  slug: 'cta',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
  ],
}

export const Stats: Block = {
  slug: 'stats',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
}

export const Map: Block = {
  slug: 'map',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Badge',
      admin: {
        placeholder: 'Our Location',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'locationTitle',
      type: 'text',
      label: 'Location Title',
      defaultValue: 'Visit Us',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'hoursTitle',
      type: 'text',
      label: 'Hours Title',
      defaultValue: 'Business Hours',
    },
    {
      name: 'hours',
      type: 'textarea',
      label: 'Business Hours',
      admin: {
        placeholder: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat – Sun: Closed',
      },
    },
    {
      name: 'zoom',
      type: 'number',
      defaultValue: 14,
    },
    {
      name: 'height',
      type: 'text',
      defaultValue: '450px',
      admin: {
        description: 'Height of the map (e.g., 450px, 60vh)',
      },
    },
  ],
}
export const Team: Block = {
  slug: 'team',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'populateFrom',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Manual Input', value: 'manual' },
        { label: 'Team Collection', value: 'team' },
      ],
      admin: {
        description:
          'Choose whether to manually select members or pull all from the Team collection.',
      },
    },
    {
      name: 'members',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData.populateFrom === 'manual',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'GitHub', value: 'github' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export const PageHero: Block = {
  slug: 'pageHero',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'slate',
      options: [
        { label: 'Slate (Dark)', value: 'slate' },
        { label: 'White', value: 'white' },
        { label: 'Light Grid', value: 'light' },
      ],
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'showBlur',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Decorative Blur Element',
    },
  ],
}

export const SplitHero: Block = {
  slug: 'splitHero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
  ],
}

export const Process: Block = {
  slug: 'process',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export const LogoStrip: Block = {
  slug: 'logoStrip',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'logos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export const EnhancedCTA: Block = {
  slug: 'enhancedCTA',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
}
