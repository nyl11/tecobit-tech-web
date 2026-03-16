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
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
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
      ],
    },
  ],
}

export const Map: Block = {
  slug: 'map',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
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
        description: 'Choose whether to manually select members or pull all from the Team collection.',
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
