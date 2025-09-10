'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Heart, ExternalLink, User, Calendar, Tag } from 'lucide-react'
import PinterestIntegration from '@/components/pinterest-integration'
import Image from 'next/image'

export default function PinterestPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
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
              className={`p-4 h-auto min-h-[80px] flex-col gap-2 text-center ${
                selectedCategory === category.id 
                  ? "bg-purple-600 text-white" 
                  : "border-purple-200 text-purple-700 hover:bg-purple-50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="font-semibold text-sm leading-tight break-words max-w-full">{category.name}</span>
              <span className="text-xs opacity-75 whitespace-nowrap">{category.count} pins</span>
            </Button>
          ))}
        </div>

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