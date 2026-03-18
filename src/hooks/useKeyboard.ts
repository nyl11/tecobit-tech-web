'use client'

import { useEffect } from 'react'

export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event)
      }
    }

    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [key, handler, enabled])
}
