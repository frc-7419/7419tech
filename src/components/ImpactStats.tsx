'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"

const AnimatedNumber = ({ value = 0, duration = 1000 }) => {
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

export default function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const cardDelays = [0, 200, 400]

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
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            className={`overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: isVisible ? `${cardDelays[0]}ms` : '0ms' }}
          >
            <CardContent className="p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-yellow-500">Students Reached</h3>
              <p className="text-4xl sm:text-6xl font-bold text-blue-800 mb-4 ">
                {isVisible && <AnimatedNumber value={1300} duration={1500}/>}+
              </p>
              <p className="text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card 
            className={`overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: isVisible ? `${cardDelays[1]}ms` : '0ms' }}
          >
            <CardContent className="p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-yellow-500">Workshops Hosted</h3>
              <p className="text-4xl sm:text-6xl font-bold text-blue-800 mb-4">
                {isVisible && <AnimatedNumber value={30} duration={1500} />}+
              </p>
              <p className="text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card 
            className={`overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: isVisible ? `${cardDelays[2]}ms` : '0ms' }}
          >
            <CardContent className="p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-yellow-500">Tournaments Hosted</h3>
              <p className="text-4xl sm:text-6xl font-bold text-blue-800 mb-4">
                {isVisible && <AnimatedNumber value={10} duration={1500} />}+
              </p>
              <p className="text-muted-foreground"></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}