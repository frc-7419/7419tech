'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig, motion, useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

/**
 * Entrance-only page fade. An exit animation (AnimatePresence) keeps the old wrapper mounted, and under the
 * App Router that wrapper re-renders the *new* route, so every page briefly existed twice in the DOM.
 */
export default function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  // Skip the fade on first load so server-rendered HTML is never hidden behind opacity: 0.
  const hasNavigated = useRef(false)
  useEffect(() => {
    hasNavigated.current = true
  }, [])

  const enter = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }

  return (
    // reducedMotion="user" makes every motion component on the site honor the OS setting.
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={hasNavigated.current ? enter : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
