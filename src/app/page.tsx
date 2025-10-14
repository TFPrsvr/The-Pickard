'use client'

import { useState } from 'react'
import { Search, Wrench, Database, Lightbulb, FileText, Car, Settings, BookOpen, Phone, MapPin, Download, Users, Clock, Mail, Gauge, WrenchIcon, Cog, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import PinterestReferenceSection from '@/components/pinterest-reference-section'
import MechanicsVideoPlayer from '@/components/mechanics-video-player'

const TOTAL_VIDEOS = 8

export default function HomePage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  return (
    <main className="py-4">
      {/* Hero Section - Centered */}
      <section className="text-center py-2 mb-3">
        <div className="flex flex-col items-center mb-2">
          <div className="flex justify-center">
            <Image
              src="/images/the-pickard-logo.png"
              alt="The Pickard"
              width={800}
              height={180}
              className="h-24 w-auto object-contain mb-2 opacity-90 contrast-125"
              priority
            />
          </div>
          <h1 className="text-sm font-normal bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
            Automotive Mechanics Database
          </h1>
        </div>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Your comprehensive automotive and powersports database for mechanics.
        </p>
      </section>

      {/* Split Content - Text Left, Video Right */}
      <section className="mb-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Search through problems, solutions, interchangeable parts, and expert tips for cars, trucks, motorcycles, ATVs, UTVs, and more.
              Our database covers everything from basic maintenance to advanced diagnostics, helping mechanics of all skill levels find the information they need quickly and efficiently.
            </p>

            {/* Quick Category Access */}
            <div>
              <Link href="/search-by-category">
                <Button size="sm" className="text-xs px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700" aria-label="Select your vehicle type to start searching">
                  Select Your Vehicle Type
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Video Player */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto flex flex-col">
            <MechanicsVideoPlayer videoIndex={currentVideoIndex} />

            {/* Video Navigation - Arrows Only */}
            <div className="flex items-center justify-center gap-8 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentVideoIndex((prev) => (prev === 0 ? TOTAL_VIDEOS - 1 : prev - 1))}
                className="text-xl px-4 py-2 h-10 flex items-center justify-center min-w-[44px]"
                aria-label="Previous video"
              >
                ←
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentVideoIndex((prev) => (prev === TOTAL_VIDEOS - 1 ? 0 : prev + 1))}
                className="text-xl px-4 py-2 h-10 flex items-center justify-center min-w-[44px]"
                aria-label="Next video"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <FeatureCard
          icon={<Gauge className="h-4 w-4" />}
          title="Problem Finder"
          description="Search our database to identify vehicle issues and find diagnostic information"
          href="/search"
          gradient="from-blue-500 to-blue-700"
          borderColor="border-blue-600"
        />
        <FeatureCard
          icon={<Wrench className="h-4 w-4" />}
          title="Problems & Solutions"
          description="Find common and uncommon problems with detailed solutions"
          href="/problems"
          gradient="from-orange-500 to-red-600"
          borderColor="border-orange-600"
        />
        <FeatureCard
          icon={<Cog className="h-4 w-4" />}
          title="Parts Database"
          description="Discover which vehicle parts are interchangeable"
          href="/parts"
          gradient="from-green-500 to-emerald-600"
          borderColor="border-green-600"
        />
        <FeatureCard
          icon={<GraduationCap className="h-4 w-4" />}
          title="Expert Tips"
          description="Access tips, tools recommendations, and how-to guides"
          href="/tips"
          gradient="from-purple-500 to-indigo-600"
          borderColor="border-purple-600"
        />
      </div>


      {/* Call to Action with Phone Support */}
      <section className="text-center mb-3">
        <div className="automotive-card p-3 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-20 h-20 bg-primary rounded-full -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary rounded-full translate-x-16 translate-y-16"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-base font-bold mb-2">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-3 text-xs max-w-sm mx-auto leading-relaxed">
              Join thousands of mechanics who trust The Pickard for automotive diagnostics and repairs
            </p>

            <div className="flex flex-col sm:flex-row gap-1.5 justify-center items-center mb-2">
              <Link href="/sign-up" className="bg-primary hover:bg-primary/90 border-0 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-center" aria-label="Register for a new account to access all features">
                Register Now
              </Link>
              <Link href="/search" className="px-3 py-1.5 rounded-md border-2 border-white/30 text-white hover:bg-white/10 transition-colors text-xs font-semibold flex items-center justify-center" aria-label="Explore the automotive database without registration">
                Explore Database
              </Link>
            </div>

            <p className="text-white/60 text-[10px]">
              Professional automotive diagnostics and repair database
            </p>
          </div>
        </div>
      </section>

      {/* Pinterest Reference Library */}
      <PinterestReferenceSection />
    </main>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  gradient: string
  borderColor: string
}

function FeatureCard({ icon, title, description, href, gradient, borderColor }: FeatureCardProps) {
  const getBorderColorClass = () => {
    switch (borderColor) {
      case 'border-blue-600': return 'hover:border-blue-600'
      case 'border-orange-600': return 'hover:border-orange-600'
      case 'border-green-600': return 'hover:border-green-600'
      case 'border-purple-600': return 'hover:border-purple-600'
      default: return 'hover:border-primary'
    }
  }

  const getBackgroundGradient = () => {
    switch (gradient) {
      case 'from-blue-500 to-blue-700': return 'bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200'
      case 'from-orange-500 to-red-600': return 'bg-gradient-to-br from-orange-50 to-red-100 group-hover:from-orange-100 group-hover:to-red-200'
      case 'from-green-500 to-emerald-600': return 'bg-gradient-to-br from-green-50 to-emerald-100 group-hover:from-green-100 group-hover:to-emerald-200'
      case 'from-purple-500 to-indigo-600': return 'bg-gradient-to-br from-purple-50 to-indigo-100 group-hover:from-purple-100 group-hover:to-indigo-200'
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100'
    }
  }

  return (
    <Link href={href} aria-label={`${title}: ${description}`}>
      <div className={`service-card group cursor-pointer relative overflow-hidden border-2 border-transparent ${getBorderColorClass()} ${getBackgroundGradient()} transition-all duration-300 h-full rounded-lg`}>
        <div className="relative z-10 h-full flex flex-col p-2">
          <div className={`text-white mb-1.5 p-1.5 bg-gradient-to-br ${gradient} rounded-md w-fit group-hover:scale-105 transition-transform shadow-lg`} aria-hidden="true">{icon}</div>
          <h3 className="font-bold mb-1.5 text-xs text-secondary">{title}</h3>
          <p className="text-[10px] text-muted-foreground leading-snug flex-1">{description}</p>
          <div className="mt-1 flex items-center text-blue-600 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
            Learn more <span className="ml-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface LocationCardProps {
  location: string
  city: string
  address: string
  phone: string
  email: string
  isLeft: boolean
}

function LocationCard({ location, city, address, phone, email, isLeft }: LocationCardProps) {
  return (
    <div className={`relative ${isLeft ? 'text-left' : 'text-right'}`}>
      {/* Arrow indicator */}
      <div className={`absolute top-4 ${isLeft ? 'left-0' : 'right-0'} w-8 h-8 bg-red-500 rounded-full flex items-center justify-center`}>
        <MapPin className="h-4 w-4 text-white" />
      </div>
      
      <div className={`${isLeft ? 'pl-12' : 'pr-12'} space-y-2`}>
        <h4 className="font-bold text-secondary">{location}</h4>
        <p className="text-sm text-muted-foreground">{city}</p>
        <p className="text-sm text-muted-foreground">{address}</p>
        
        <div className="space-y-1 pt-2">
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}