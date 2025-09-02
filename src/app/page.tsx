'use client'

import { Search, Wrench, Database, Lightbulb, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to The Pickard
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your comprehensive automotive database for mechanics. Search through problems, solutions, 
          interchangeable parts, and expert tips for cars, trucks, and 18-wheelers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard
          icon={<Search className="h-8 w-8" />}
          title="Vehicle Search"
          description="Search by year, make, model, engine type, and specialty editions"
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
        <div className="bg-card rounded-lg p-8 shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-muted-foreground mb-6">
            Join The Pickard community to access our comprehensive automotive database
          </p>
          <Button asChild>
            <Link href="/sign-up">Sign Up Now</Link>
          </Button>
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
    <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}