import Image from 'next/image'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'

interface MediaProps {
  resource?: MediaType | string | null;
  imgClassName?: string;
  priority?: boolean;
}

export const Media: React.FC<MediaProps> = ({ resource, imgClassName, priority = false }) => {
  if (!resource) return null;
  
  const isString = typeof resource === 'string';
  const url = isString ? resource : resource.url;
  const alt = isString ? 'Media Image' : (resource.alt || 'Media Image');
  const width = isString ? 800 : (resource.width || 800);
  const height = isString ? 600 : (resource.height || 600);
  
  if (!url) return null;

  // Payload's local API might return a full URL or relative URL. 
  // If absolute, next/image expects it in domains config. If relative, standard next/image works.
  // If the resource is just a Mongo ID (string without a slash), don't render it directly
  if (isString && !url.includes('/')) return null;

  const src = url.startsWith('http') ? url : url;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={imgClassName}
      priority={priority}
    />
  )
}
