'use client'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      <video autoPlay loop muted className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="relative container flex flex-col items-center justify-center">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="text-center">
              <h1 className="gradient-text text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl bg-gradient-to-r from-[#ffb41a] to-[#11224e] bg-clip-text text-transparent">
                QLS Tech Support
              </h1>
              <p className="max-w-[600px] text-xl text-gray-500 dark:text-gray-400 md:text-2xl">
                Quarry Lane School's award-winning robotics team, advancing STEM through innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}