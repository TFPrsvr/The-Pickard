'use client'

import { useState } from 'react'
import { CategorySelector } from '@/components/category-selector'
import { CategoryAwareVehicleSelector } from '@/components/category-aware-vehicle-selector'
import { VehicleCategory, SearchFilters } from '@/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default function SearchByCategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleCategorySelect = (category: VehicleCategory) => {
    setSelectedCategory(category)
    setFilters({ category: [category] })
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setFilters({})
    setSearchResults([])
  }

  const handleSearch = async () => {
    setIsSearching(true)
    try {
      // TODO: Implement actual search API call
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'vehicles',
          filters
        })
      })

      const data = await response.json()
      if (data.success) {
        setSearchResults(data.data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Vehicle Search</h1>
          <p className="text-muted-foreground">
            Find diagnostic information, parts, and repair guides for your vehicle
          </p>
        </div>

        {/* Category Selection */}
        {!selectedCategory && (
          <CategorySelector
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory || undefined}
          />
        )}

        {/* Vehicle Details Form */}
        {selectedCategory && (
          <div className="space-y-6">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={handleBackToCategories}
              className="mb-4"
              aria-label="Back to category selection"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change Category
            </Button>

            {/* Category Badge */}
            <div className="flex items-center gap-4 p-4 bg-muted rounded-md">
              <div className="relative h-16 w-24 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={getCategoryImage(selectedCategory)}
                  alt={selectedCategory}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div>
                <h2 className="font-semibold text-lg capitalize">{selectedCategory}</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your vehicle details below
                </p>
              </div>
            </div>

            {/* Category-Aware Vehicle Selector */}
            <CategoryAwareVehicleSelector
              category={selectedCategory}
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Search Button */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={isSearching || !filters.make || filters.make.length === 0}
                aria-label="Search for vehicle information"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Search Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-md hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold">{result.make} {result.model}</h4>
                      <p className="text-sm text-muted-foreground">{result.year}</p>
                      <p className="text-sm mt-2">{result.engineType || result.displacement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

// Helper function to get category image
function getCategoryImage(category: VehicleCategory): string {
  const images: Record<VehicleCategory, string> = {
    car: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
    truck: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop',
    '18-wheeler': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
    motorcycle: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop',
    atv: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    utv: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    snowmobile: 'https://images.unsplash.com/photo-1609011107157-880f57058e1d?w=400&h=300&fit=crop',
    watercraft: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    rv: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&h=300&fit=crop'
  }
  return images[category] || images.car
}
