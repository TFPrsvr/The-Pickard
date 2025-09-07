'use client'

import { Search, Wrench, Database, Lightbulb, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-16">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/the-pickard-logo.png"
            alt="The Pickard"
            width={800}
            height={300}
            className="h-48 w-auto mb-4 opacity-100 contrast-200 brightness-110 saturate-150 drop-shadow-lg"
            priority
          />
          <h1 className="text-3xl text-primary font-normal">
            Automotive Mechanics Database
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Your comprehensive automotive database for mechanics. Search through problems, solutions, 
          interchangeable parts, and expert tips for cars, trucks, and 18-wheelers.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard
          icon={<Search className="h-8 w-8" />}
          title="Diagnostic Center"
          description="Identify problems with your vehicle using our comprehensive diagnostic tools"
          href="/search"
        />
        <FeatureCard
          icon={<Wrench className="h-8 w-8" />}
          title="Problems & Solutions"
          description="Find common and uncommon problems with detailed solutions"
          href="/problems"
        />
        <FeatureCard
          icon={<Database className="h-8 w-8" />}
          title="Parts Database"
          description="Discover which vehicle parts are interchangeable"
          href="/parts"
        />
        <FeatureCard
          icon={<Lightbulb className="h-8 w-8" />}
          title="Expert Tips"
          description="Access tips, tools recommendations, and how-to guides"
          href="/tips"
        />
      </div>

        <div className="text-center">
          <div className="automotive-card p-12 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/50 rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 mb-10 text-xl max-w-lg mx-auto leading-relaxed">
                Join thousands of mechanics who trust The Pickard for automotive diagnostics and repairs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/sign-up" className="automotive-button bg-primary hover:bg-primary/90 border-0">
                  Get Started
                </Link>
                <Link href="/search" className="px-8 py-4 rounded-md border-2 border-white/30 text-white hover:bg-white/10 transition-colors font-semibold">
                  Explore Database
                </Link>
              </div>
              
              <p className="text-white/60 text-sm mt-6">
                Professional automotive diagnostics and repair database
              </p>
            </div>
          </div>
        </div>
    </main>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className="service-card group cursor-pointer">
        <div className="text-primary mb-4 p-4 bg-primary/10 rounded-md w-fit group-hover:bg-primary/20 transition-colors">{icon}</div>
        <h3 className="font-bold mb-3 text-xl text-secondary">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <span className="ml-1">→</span>
        </div>
      </div>
    </Link>
  )
}