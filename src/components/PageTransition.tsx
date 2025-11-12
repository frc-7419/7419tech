'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
  const animate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const exit = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}


