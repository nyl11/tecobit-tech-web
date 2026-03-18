'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/utilities/cn'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyboard } from '@/hooks/useKeyboard'

interface MegaMenuContainerProps {
  isOpen: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  children: React.ReactNode
  className?: string
}

export const MegaMenuContainer: React.FC<MegaMenuContainerProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  children,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useClickOutside<HTMLDivElement>(menuRef, onClose, isOpen)

  // Close on Escape key
  useKeyboard('Escape', onClose, isOpen)

  // Trap focus when open
  useEffect(() => {
    if (!isOpen) return

    const menu = menuRef.current
    if (!menu) return

    const focusableElements = menu.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-heading/20 backdrop-blur-sm transition-opacity duration-300 z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden="true"
      />

      {/* Mega Menu Panel */}
      <div
        ref={menuRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed left-0 right-0 bg-gray-50 border-t border-border shadow-lg z-50',
          'transition-all duration-300 ease-out',
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none',
          className,
        )}
        style={{
          top: 'var(--header-height, 80px)',
          maxHeight: 'calc(100vh - var(--header-height, 80px) - 2rem)',
          overflowY: 'auto',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">{children}</div>
      </div>
    </>
  )
}
