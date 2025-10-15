'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Heart, ExternalLink, User, Calendar, Tag, Car } from 'lucide-react'
import PinterestIntegration from '@/components/pinterest-integration'
import Image from 'next/image'

interface PinterestPin {
  id: number
  userId: number
  pinterestUrl: string
  title: string | null
  description: string | null
  imageUrl: string | null
  category: string | null
  vehicleTypes: string[]
  tags: string[]
  status: string
  reviewedBy: number | null
  reviewedAt: string | null
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

export default function PinterestPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [submittedPins, setSubmittedPins] = useState<PinterestPin[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch approved Pinterest pins
  useEffect(() => {
    const fetchApprovedPins = async () => {
      try {
        const response = await fetch('/api/pinterest-pins?status=approved')
        const data = await response.json()

        if (data.success) {
          setSubmittedPins(data.pins)
        }
      } catch (error) {
        console.error('Error fetching approved pins:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApprovedPins()
  }, [])

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    // TODO: Implement actual search functionality with Pinterest integration
    console.log('Searching for:', searchQuery, 'in category:', selectedCategory)
  }
  
  const categories = [
    { id: 'all', name: 'All Categories', count: 225 },
    { id: 'engine', name: 'Engine & Performance', count: 68 },
    { id: 'brakes', name: 'Brake Systems', count: 45 },
    { id: 'transmission', name: 'Transmission', count: 32 },
    { id: 'electrical', name: 'Electrical Systems', count: 41 },
    { id: 'suspension', name: 'Suspension & Steering', count: 28 },
    { id: 'general', name: 'General Maintenance', count: 11 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-2">Pinterest Library</h1>
              <p className="text-xl text-purple-600">Auto Reference</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Curated automotive repair guides, diagnostics, and professional tips. Real solutions for mechanics and DIY enthusiasts.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Car className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">The Pickard Team</h2>
                <p className="text-purple-100 text-lg mb-4">
                  Curated auto repair guides from industry professionals
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-current" />
                    <span>225+ Pins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Updated Weekly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Automotive Collection</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.open('https://pinterest.com', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Pinterest
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search pins: brake pads, engine diagnostic, wiring diagram..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && handleSearch()}
                  className="pl-10 py-3 text-lg placeholder:text-sm border-2 border-purple-200 focus:border-purple-500"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`p-3 h-auto min-h-[90px] flex flex-col justify-center items-center gap-2 text-center overflow-hidden ${
                selectedCategory === category.id 
                  ? "bg-purple-600 text-white" 
                  : "border-purple-200 text-purple-700 hover:bg-purple-50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="font-semibold text-xs leading-tight break-words hyphens-auto w-full px-1" style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>{category.name}</span>
              <span className="text-xs opacity-75 whitespace-nowrap">{category.count} pins</span>
            </Button>
          ))}
        </div>

        {/* Community Submitted Pins */}
        {submittedPins.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Community Contributions</h2>
                <p className="text-gray-600">Pinterest pins submitted by The Pickard community members</p>
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <Heart className="h-5 w-5 fill-current" />
                <span className="font-semibold">{submittedPins.length} pins</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {submittedPins.map((pin) => (
                <Card
                  key={pin.id}
                  className="group hover:shadow-xl transition-shadow cursor-pointer border-2 border-purple-100 hover:border-purple-300"
                  onClick={() => window.open(pin.pinterestUrl, '_blank')}
                >
                  <CardContent className="p-0">
                    {/* Pin Image or Placeholder */}
                    <div className="relative w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg overflow-hidden">
                      {pin.imageUrl ? (
                        <Image
                          src={pin.imageUrl}
                          alt={pin.title || 'Pinterest pin'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="h-16 w-16 text-purple-300" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Pinterest
                      </div>
                    </div>

                    {/* Pin Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {pin.title || 'View on Pinterest'}
                      </h3>

                      {pin.description && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                          {pin.description}
                        </p>
                      )}

                      {/* Tags */}
                      {pin.tags && pin.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {pin.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {pin.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                              +{pin.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Vehicle Types */}
                      {pin.vehicleTypes && pin.vehicleTypes.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {pin.vehicleTypes.map((type, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                            >
                              <Car className="h-3 w-3 mr-1" />
                              {type}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Category */}
                      {pin.category && (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Filter className="h-3 w-3" />
                          {pin.category}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg p-8 shadow-lg mb-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-600">Loading community pins...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && submittedPins.length === 0 && (
          <div className="bg-white rounded-lg p-8 shadow-lg mb-8 text-center">
            <Heart className="h-16 w-16 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Community Pins Yet</h3>
            <p className="text-gray-600 mb-4">
              Be the first to share your automotive Pinterest pins with the community!
            </p>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => window.location.href = '/tips'}
            >
              Submit a Pin
            </Button>
          </div>
        )}

        {/* Pinterest Integration Component */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <PinterestIntegration
            category={selectedCategory === 'all' ? undefined : selectedCategory}
            maxPins={12}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🔍 Curated Content</h4>
              <p className="text-gray-600 text-sm">
                Each pin is carefully selected for its practical value in automotive repair and diagnostics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🏷️ Organized Categories</h4>
              <p className="text-gray-600 text-sm">
                Pins are categorized by system type for easy navigation and quick reference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🔄 Regular Updates</h4>
              <p className="text-gray-600 text-sm">
                New pins are added regularly to keep the reference library current and comprehensive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}