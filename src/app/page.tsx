'use client'

import { Search, Wrench, Database, Lightbulb, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="py-12">
      <div className="text-center mb-16 mt-48">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive automotive database for mechanics. Search through problems, solutions, 
            interchangeable parts, and expert tips for cars, trucks, and 18-wheelers.
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard
          icon={<Search className="h-8 w-8" />}
          title="Diagnostic Center"
          description="Identify problems with your vehicle using our comprehensive diagnostic tools"
        />
        <FeatureCard
          icon={<Wrench className="h-8 w-8" />}
          title="Problems & Solutions"
          description="Find common and uncommon problems with detailed solutions"
        />
        <FeatureCard
          icon={<Database className="h-8 w-8" />}
          title="Parts Database"
          description="Discover which vehicle parts are interchangeable"
        />
        <FeatureCard
          icon={<Lightbulb className="h-8 w-8" />}
          title="Expert Tips"
          description="Access tips, tools recommendations, and how-to guides"
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
                  Get Started Free
                </Link>
                <Link href="/search" className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 transition-colors font-semibold">
                  Try Demo
                </Link>
              </div>
              
              <p className="text-white/60 text-sm mt-6">
                No credit card required • Free forever plan available
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
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="service-card group">
      <div className="text-primary mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">{icon}</div>
      <h3 className="font-bold mb-3 text-xl text-secondary">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <span className="ml-1">→</span>
      </div>
    </div>
  )
}