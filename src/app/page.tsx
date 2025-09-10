'use client'

import { Search, Wrench, Database, Lightbulb, FileText, Car, Settings, BookOpen, Phone, MapPin, Download, Users, Clock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import VideoFilter from '@/components/video-filter'

export default function HomePage() {
  return (
    <main className="py-4 relative">
      {/* Background Video Filters */}
      <div className="fixed top-0 left-0 w-64 h-full opacity-20 pointer-events-none z-0">
        <VideoFilter position="left" className="w-full h-full" />
      </div>
      <div className="fixed top-0 right-0 w-64 h-full opacity-20 pointer-events-none z-0">
        <VideoFilter position="right" className="w-full h-full" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="text-center py-12 mb-16">
        <div className="flex flex-col items-center mb-6">
          <div className="w-full flex justify-center">
            <Image
              src="/images/the-pickard-logo.png"
              alt="The Pickard"
              width={1200}
              height={300}
              className="w-full h-32 object-contain mb-2 opacity-100 contrast-200 brightness-110 saturate-150 drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="text-3xl text-orange-600 font-normal">
            Automotive Mechanics Database
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Your comprehensive automotive database for mechanics. Search through problems, solutions, 
          interchangeable parts, and expert tips for cars, trucks, and 18-wheelers.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <FeatureCard
          icon={<Car className="h-10 w-10" />}
          title="Diagnostic Center"
          description="Identify problems with your vehicle using our comprehensive diagnostic tools"
          href="/search"
          gradient="from-blue-500 to-blue-700"
          borderColor="border-blue-600"
        />
        <FeatureCard
          icon={<Settings className="h-10 w-10" />}
          title="Problems & Solutions"
          description="Find common and uncommon problems with detailed solutions"
          href="/problems"
          gradient="from-orange-500 to-red-600"
          borderColor="border-orange-600"
        />
        <FeatureCard
          icon={<Database className="h-10 w-10" />}
          title="Parts Database"
          description="Discover which vehicle parts are interchangeable"
          href="/parts"
          gradient="from-green-500 to-emerald-600"
          borderColor="border-green-600"
        />
        <FeatureCard
          icon={<BookOpen className="h-10 w-10" />}
          title="Expert Tips"
          description="Access tips, tools recommendations, and how-to guides"
          href="/tips"
          gradient="from-purple-500 to-indigo-600"
          borderColor="border-purple-600"
        />
      </div>

      {/* Team & Contact Section */}
      <section className="mb-16 py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            GET MORE INFORMATION ABOUT OUR TEAM!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our certified automotive technicians and mechanics who bring years of experience 
            to diagnose and repair your vehicle with precision and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Team Images */}
          <div className="flex justify-between items-end space-x-4">
            <div className="flex-1">
              <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-500" />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-secondary mb-4">OUR LOCATIONS</h3>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-4">
                Multiple service locations available nationwide
              </p>
              <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">FIND NEAREST LOCATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-4 rounded-md hover:bg-orange-600 transition-colors cursor-pointer">
            <Download className="h-5 w-5" />
            <span className="font-semibold">DOWNLOAD MANUAL</span>
          </div>
        </div>
      </section>

      {/* Call to Action with Phone Support */}
      <section className="text-center mb-16">
        <div className="automotive-card p-12 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/50 rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-400/20 rounded-full -translate-x-12 -translate-y-12"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-10 text-xl max-w-lg mx-auto leading-relaxed">
              Join thousands of mechanics who trust The Pickard for automotive diagnostics and repairs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/sign-up" className="automotive-button bg-primary hover:bg-primary/90 border-0 px-8 py-4 rounded-md font-semibold transition-colors">
                Register Now
              </Link>
              <Link href="/search" className="px-8 py-4 rounded-md border-2 border-white/30 text-white hover:bg-white/10 transition-colors font-semibold">
                Explore Database
              </Link>
            </div>

            {/* Phone Support */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-white/90">Contact Us for Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-white/90">Always Open</span>
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              Professional automotive diagnostics and repair database
            </p>
          </div>
        </div>
      </section>
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
    <Link href={href}>
      <div className={`service-card group cursor-pointer relative overflow-hidden border-2 border-transparent ${getBorderColorClass()} ${getBackgroundGradient()} transition-all duration-300 h-full rounded-lg`}>
        <div className="relative z-10 h-full flex flex-col p-6">
          <div className={`text-white mb-4 p-4 bg-gradient-to-br ${gradient} rounded-md w-fit group-hover:scale-105 transition-transform shadow-lg`}>{icon}</div>
          <h3 className="font-bold mb-3 text-xl text-secondary">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
          <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
      </div> {/* End Main Content */}
    </main>
  )
}