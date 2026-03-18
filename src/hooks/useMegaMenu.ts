'use client'

import { useState, useCallback, useRef } from 'react'

export type MegaMenuType = 'services' | 'portfolio' | null

export function useMegaMenu() {
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const openMegaMenu = useCallback((menu: MegaMenuType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMegaMenu(menu)
  }, [])

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null)
  }, [])

  const handleMouseEnter = useCallback(
    (menu: MegaMenuType) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Small delay before opening to prevent accidental triggers
      timeoutRef.current = setTimeout(() => {
        openMegaMenu(menu)
      }, 150)
    },
    [openMegaMenu],
  )

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // Delay before closing to allow moving mouse to menu
    timeoutRef.current = setTimeout(() => {
      closeMegaMenu()
    }, 200)
  }, [closeMegaMenu])

  const cancelTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return {
    activeMegaMenu,
    openMegaMenu,
    closeMegaMenu,
    handleMouseEnter,
    handleMouseLeave,
    cancelTimeout,
  }
}
