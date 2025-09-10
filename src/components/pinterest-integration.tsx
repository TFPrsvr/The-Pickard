'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Heart, Share, Bookmark } from 'lucide-react'
import Image from 'next/image'

interface PinterestPin {
  id: string
  title: string
  description: string
  imageUrl: string
  url: string
  boardName: string
  category: 'engine' | 'transmission' | 'brakes' | 'electrical' | 'suspension' | 'general'
  tags: string[]
}

interface PinterestIntegrationProps {
  category?: string
  maxPins?: number
}

// Sample Pinterest pins data structure - replace with actual API integration
const samplePins: PinterestPin[] = [
  {
    id: '1',
    title: 'Engine Diagnostic Flowchart',
    description: 'Complete troubleshooting guide for common engine problems',
    imageUrl: '/images/placeholder-automotive.png',
    url: 'https://pinterest.com/pin/sample1',
    boardName: 'Vehicle Mechanic Group',
    category: 'engine',
    tags: ['diagnostics', 'engine', 'troubleshooting', 'flowchart']
  },
  {
    id: '2',
    title: 'Brake System Components Diagram',
    description: 'Detailed brake system components and connections',
    imageUrl: '/images/placeholder-automotive.png',
    url: 'https://pinterest.com/pin/sample2',
    boardName: 'Vehicle Mechanic Group',
    category: 'brakes',
    tags: ['brakes', 'diagram', 'components', 'system']
  },
  {
    id: '3',
    title: 'Transmission Fluid Change Guide',
    description: 'Step-by-step transmission maintenance procedures',
    imageUrl: '/images/placeholder-automotive.png',
    url: 'https://pinterest.com/pin/sample3',
    boardName: 'Vehicle Mechanic Group',
    category: 'transmission',
    tags: ['transmission', 'maintenance', 'fluid', 'guide']
  }
]

export function PinterestIntegration({ category, maxPins = 6 }: PinterestIntegrationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all')
  
  const filteredPins = category 
    ? samplePins.filter(pin => pin.category === category)
    : samplePins

  const displayPins = filteredPins.slice(0, maxPins)

  const categories = [
    { id: 'all', name: 'All Pins', icon: '📌' },
    { id: 'engine', name: 'Engine', icon: '⚙️' },
    { id: 'brakes', name: 'Brakes', icon: '🛑' },
    { id: 'transmission', name: 'Transmission', icon: '🔧' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' },
    { id: 'suspension', name: 'Suspension', icon: '🔩' },
    { id: 'general', name: 'General', icon: '🚗' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Pinterest Reference Library
          </h3>
          <p className="text-gray-600">
            Curated automotive resources from our Pinterest collection
          </p>
        </div>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
        >
          <ExternalLink className="h-4 w-4" />
          Visit Pinterest
        </a>
      </div>

      {!category && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="text-sm"
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPins.map((pin) => (
          <PinterestPinCard key={pin.id} pin={pin} />
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          className="text-purple-600 border-purple-600 hover:bg-purple-50"
          onClick={() => window.open('https://pinterest.com', '_blank')}
        >
          <Heart className="h-4 w-4 mr-2" />
          View More on Pinterest
        </Button>
      </div>
    </div>
  )
}

function PinterestPinCard({ pin }: { pin: PinterestPin }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={pin.imageUrl}
          alt={pin.title}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.src = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3ctext x='50' y='50' font-size='14' text-anchor='middle' dy='.3em' fill='%236b7280'%3eAutomotive%3c/text%3e%3c/svg%3e"
          }}
        />
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <Heart className="h-4 w-4 text-white fill-current" />
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h4 className="font-semibold text-lg mb-2 line-clamp-2">{pin.title}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{pin.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {pin.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 capitalize">
            📌 {pin.category}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(pin.url)}
              className="h-8 w-8 p-0"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => window.open(pin.url, '_blank')}
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PinterestIntegration