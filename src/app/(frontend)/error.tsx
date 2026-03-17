'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Frontend Error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4 text-heading">Something went wrong!</h1>
        <p className="text-body mb-8 text-lg">
          We apologize for the inconvenience. An unexpected error occurred while rendering this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-primary text-white rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-white text-heading border border-border rounded-full font-medium transition-all hover:bg-muted active:scale-95"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
