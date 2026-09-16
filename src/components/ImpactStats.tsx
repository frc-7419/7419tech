'use client'

import { useEffect, useRef, useState } from 'react'

const AnimatedNumber = ({ value = 0, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  const prevValueRef = useRef(value)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = prevValueRef.current

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const currentCount = Math.floor(startValue + progress * (value - startValue))

      if (countRef.current !== currentCount) {
        setCount(currentCount)
        countRef.current = currentCount
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
    prevValueRef.current = value

    return () => {
      prevValueRef.current = count
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

// Figures sourced from the 7419 Impact Binder 2026, update alongside that document.
const stats = [
  { label: 'Service Hours', value: 10000, suffix: '+', note: 'Across 7 seasons' },
  { label: 'Individuals Reached', value: 10000, suffix: '+', note: 'Mentorship, events & outreach' },
  { label: 'Students Reached', value: 1150, suffix: '+', note: 'Via Project STEAMBOT in 100 countries' },
  { label: 'FLL & FTC Teams Mentored', value: 13, suffix: '', note: 'Since 2023' },
  { label: 'Teams Founded', value: 7, suffix: '', note: 'Including 4 all-girls teams' },
  { label: 'Teams Hosted', value: 30, suffix: '+', note: 'At our league meets & tournaments' },
]

export default function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const currentSectionRef = sectionRef.current
    if (currentSectionRef) {
      observer.observe(currentSectionRef)
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`rounded-xl border border-[#122350]/10 bg-white p-6 text-center shadow-sm transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
          >
            <p className="font-display text-4xl font-extrabold text-[#122350] md:text-5xl">
              {isVisible && <AnimatedNumber value={stat.value} duration={1500} />}
              {stat.suffix}
            </p>
            <p className="mt-2 font-display text-sm font-semibold uppercase tracking-wide text-[#122350]">
              {stat.label}
            </p>
            <p className="mt-1 text-xs text-[#122350]/70">{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
