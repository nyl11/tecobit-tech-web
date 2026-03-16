/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'

type LexicalNode = {
  type: string
  version: number
  [key: string]: any
}

type RichTextProps = {
  data: {
    root?: {
      children: LexicalNode[]
      [key: string]: any
    }
  } | any
  className?: string
}

export const RichText: React.FC<RichTextProps> = ({ data, className = '' }) => {
  if (!data || !data.root || !data.root.children) return null

  return (
    <div className={`prose prose-slate max-w-none text-body ${className}`}>
      {renderNodes(data.root.children)}
    </div>
  )
}

function renderNodes(nodes: LexicalNode[]): React.ReactNode[] {
  return nodes.map((node, i) => {
    switch (node.type) {
      case 'text':
        return renderTextNode(node, i)
      case 'paragraph':
        return (
          <p key={i} className="mb-4">
            {renderNodes(node.children)}
          </p>
        )
      case 'heading':
        const Tag = node.tag as any
        return (
          <Tag key={i} className="font-heading font-semibold text-heading mb-3 mt-6">
            {renderNodes(node.children)}
          </Tag>
        )
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag
            key={i}
            className={`mb-4 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}
          >
            {renderNodes(node.children)}
          </ListTag>
        )
      case 'listitem':
        return (
          <li key={i} className="mb-1">
            {renderNodes(node.children)}
          </li>
        )
      case 'link':
        const url = node.fields?.url || node.url
        const newTab = node.fields?.newTab || node.newTab
        const target = newTab ? '_blank' : '_self'
        const rel = newTab ? 'noopener noreferrer' : undefined

        if (url?.startsWith('/')) {
          return (
            <Link key={i} href={url} className="text-primary hover:text-primary-dark underline">
              {renderNodes(node.children)}
            </Link>
          )
        }
        return (
          <a
            key={i}
            href={url}
            target={target}
            rel={rel}
            className="text-primary hover:text-primary-dark underline"
          >
            {renderNodes(node.children)}
          </a>
        )
      case 'quote':
        return (
          <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted my-4">
            {renderNodes(node.children)}
          </blockquote>
        )
      default:
        // Render children if available, else skip
        if (node.children) {
          return <React.Fragment key={i}>{renderNodes(node.children)}</React.Fragment>
        }
        return null
    }
  })
}

function renderTextNode(node: LexicalNode, key: number) {
  let text: React.ReactNode = node.text
  const format = node.format

  if (typeof format === 'number') {
    if (format & 1) text = <strong key={`strong-${key}`}>{text}</strong>
    if (format & 2) text = <em key={`em-${key}`}>{text}</em>
    if (format & 4) text = <s key={`s-${key}`}>{text}</s>
    if (format & 8) text = <u key={`u-${key}`}>{text}</u>
    if (format & 16) text = <code key={`code-${key}`} className="bg-surface-alt px-1 py-0.5 rounded text-sm">{text}</code>
  }

  return <React.Fragment key={key}>{text}</React.Fragment>
}
