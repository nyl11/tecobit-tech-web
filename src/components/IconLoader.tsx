import React from 'react'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface IconLoaderProps {
  iconName: string
  className?: string
  strokeWidth?: number
}

export const IconLoader: React.FC<IconLoaderProps> = ({
  iconName,
  className = '',
  strokeWidth = 1.5,
}) => {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName]
  if (!Icon) return null
  return <Icon className={className} strokeWidth={strokeWidth} />
}
