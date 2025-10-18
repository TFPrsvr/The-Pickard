'use client'

import { useState, useEffect, Suspense, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { VehicleSelector } from '@/components/vehicle-selector'
import { CategoryAwareVehicleSelector } from '@/components/category-aware-vehicle-selector'
import { AutomotiveSuggestions } from '@/components/automotive-suggestions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchFilters, Vehicle, Problem, VehicleCategory } from '@/types'
import { SearchResult } from '@/lib/web-search'
import { Search, Car, Wrench, ExternalLink, Globe } from 'lucide-react'
import Link from 'next/link'

// Lazy load heavy search components for better performance
const AutomotiveWebSearch = dynamic(
  () => import('@/components/automotive-web-search').then(mod => ({ default: mod.AutomotiveWebSearch })),
  {
    loading: () => (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 border-2 border-coral-300 rounded-lg bg-coral-50">
        <div className="w-14 h-14 border-4 border-coral-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-coral-600 font-semibold text-base">Loading Web Search...</p>
        <p className="text-coral-500 text-sm">Initializing search engine</p>
      </div>
    ),
    ssr: false
  }
)

const ExternalPartsSearch = dynamic(
  () => import('@/components/external-parts-search').then(mod => ({ default: mod.ExternalPartsSearch })),
  {
    loading: () => (
      <div className="flex flex-col items-center justify-center py-10 space-y-3 border-2 border-coral-300 rounded-lg bg-coral-50">
        <div className="w-12 h-12 border-4 border-coral-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-coral-600 font-semibold text-sm">Loading Parts Search...</p>
      </div>
    ),
    ssr: false
  }
)

function SearchPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') as VehicleCategory | null

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>(
    categoryParam ? { category: [categoryParam] } : {}
  )
  const [searchResults, setSearchResults] = useState<Vehicle[]>([])
  const [problemResults, setProblemResults] = useState<Problem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState<'vehicles' | 'problems' | 'web'>('vehicles')
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(categoryParam)

  // Mock data for demonstration - wrapped in useMemo
  const mockVehicles: Vehicle[] = useMemo(() => [
    {
      id: '1',
      year: 2019,
      make: 'Ford',
      model: 'F-150',
      engineType: 'V8',
      driveType: '4WD',
      category: 'truck',
      specialty: 'SuperCrew'
    },
    {
      id: '2',
      year: 2020,
      make: 'Chevrolet',
      model: 'Silverado',
      engineType: 'V6',
      driveType: '2WD',
      category: 'truck'
    },
    {
      id: '3',
      year: 2018,
      make: 'Toyota',
      model: 'Camry',
      engineType: 'I4',
      driveType: '2WD',
      category: 'car'
    }
  ], [])

  const mockProblems: Problem[] = useMemo(() => [
    {
      id: '1',
      vehicleId: '1',
      title: 'Transmission Slipping',
      description: 'Transmission fails to engage properly in certain gears',
      symptoms: ['Delayed shifting', 'RPM increases without acceleration', 'Burning smell'],
      solutions: [],
      commonality: 'common',
      difficulty: 'hard',
      estimatedTime: '4-6 hours'
    }
  ], [])

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      let filteredVehicles = mockVehicles

      // Apply filters
      if (filters.year?.length) {
        const [yearFrom, yearTo] = filters.year
        filteredVehicles = filteredVehicles.filter(vehicle => {
          if (yearFrom && yearTo) {
            return vehicle.year >= yearFrom && vehicle.year <= yearTo
          } else if (yearFrom) {
            return vehicle.year >= yearFrom
          } else if (yearTo) {
            return vehicle.year <= yearTo
          }
          return true
        })
      }

      if (filters.make?.length) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          filters.make!.includes(vehicle.make)
        )
      }

      if (filters.model?.length) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          filters.model!.some(model => 
            vehicle.model.toLowerCase().includes(model.toLowerCase())
          )
        )
      }

      if (filters.engineType?.length) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          filters.engineType!.includes(vehicle.engineType)
        )
      }

      if (filters.driveType?.length) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          filters.driveType!.includes(vehicle.driveType)
        )
      }

      if (filters.submodel?.length) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          filters.submodel!.some(submodel => 
            vehicle.specialty?.toLowerCase().includes(submodel.toLowerCase())
          )
        )
      }

      // Apply text search
      if (searchQuery) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      }

      setSearchResults(filteredVehicles)
      setProblemResults(mockProblems)
      setIsLoading(false)
    }, 1000)
  }, [searchQuery, filters, mockVehicles, mockProblems])

  const handleReset = useCallback(() => {
    setFilters({})
    setSearchQuery('')
    setSearchResults([])
    setProblemResults([])
  }, [])

  const handleWebSearchResult = useCallback((result: SearchResult) => {
    // TODO: Implement database save functionality for search results
  }, [])

  useEffect(() => {
    // Auto-search when filters change
    if (Object.keys(filters).some(key => filters[key as keyof SearchFilters]?.length)) {
      handleSearch()
    }
  }, [filters, handleSearch])

  return (
    <div className="py-8 space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center bg-white rounded-lg p-8 shadow-sm">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Problem Finder
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find solutions fast! Enter your ride details and get instant help with parts, repairs, and troubleshooting.
        </p>
      </div>

      {/* Category Selection or Direct Link Notice */}
      {!selectedCategory && (
        <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="py-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Choose Your Vehicle Type First</h3>
            <p className="text-muted-foreground mb-6">
              For the best search experience, select your vehicle category to see relevant options
            </p>
            <Link href="/search-by-category">
              <Button size="lg" className="text-lg px-8 py-6" aria-label="Go to category selection page to select your vehicle type">
                <Car className="h-5 w-5 mr-2" aria-hidden="true" />
                Select Vehicle Type
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Vehicle Selection and Search - Category-Aware */}
      {selectedCategory && (
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Car className="h-6 w-6" />
              Start Your Search
            </CardTitle>
            <CardDescription className="text-blue-100">
              Pick your vehicle first, then tell us what&apos;s going on
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vehicle Selection - Category-Aware Cascading Filters */}
            <CategoryAwareVehicleSelector
              category={selectedCategory}
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Search Query - Only show after basic vehicle info is selected */}
            {(filters.year && filters.make && filters.model) && (
              <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-green-800">Great! Now What&apos;s The Issue?</h3>
                  <p className="text-green-600 text-sm">Describe your problem or what part you need</p>
                </div>
                <div className="flex gap-3">
                  <Input
                    id="problem-search-input"
                    placeholder="Type here: brake noise, engine trouble, need oil filter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-green-300 focus:border-green-500"
                    onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && handleSearch()}
                    aria-label="Describe your vehicle problem or part needed"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading || !searchQuery.trim()}
                    className="bg-green-600 hover:bg-green-700 px-6"
                    aria-label="Search for vehicle problem solutions"
                  >
                    <Search className="h-5 w-5 mr-2" aria-hidden="true" />
                    {isLoading ? 'Finding...' : 'Go!'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Automotive Suggestions Strip - Show contextual references and web search */}
      <AutomotiveSuggestions
        vehicleInfo={{
          year: filters.year?.[0],
          make: filters.make?.[0],
          model: filters.model?.[0],
          engine: filters.engineType?.[0]
        }}
        searchQuery={searchQuery}
      />

      {/* External Parts Search - Show when vehicle and search query are provided */}
      <ExternalPartsSearch
        searchQuery={searchQuery}
        vehicleInfo={{
          year: filters.year?.[0],
          make: filters.make?.[0],
          model: filters.model?.[0],
          submodel: filters.submodel?.[0],
          engine: filters.engineType?.[0]
        }}
      />

      {/* Search Results */}
      {(searchResults.length > 0 || problemResults.length > 0) && (
        <div className="space-y-6">
          <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Search result categories">
            <Button
              variant={searchType === 'vehicles' ? 'default' : 'outline'}
              onClick={() => setSearchType('vehicles')}
              role="tab"
              aria-selected={searchType === 'vehicles'}
              aria-controls="search-results-panel"
              aria-label={`View vehicle results, ${searchResults.length} found`}
            >
              <Car className="h-4 w-4 mr-2" aria-hidden="true" />
              Vehicles ({searchResults.length})
            </Button>
            <Button
              variant={searchType === 'problems' ? 'default' : 'outline'}
              onClick={() => setSearchType('problems')}
              role="tab"
              aria-selected={searchType === 'problems'}
              aria-controls="search-results-panel"
              aria-label={`View problem results, ${problemResults.length} found`}
            >
              <Wrench className="h-4 w-4 mr-2" aria-hidden="true" />
              Problems ({problemResults.length})
            </Button>
            <Button
              variant={searchType === 'web' ? 'default' : 'outline'}
              onClick={() => setSearchType('web')}
              role="tab"
              aria-selected={searchType === 'web'}
              aria-controls="search-results-panel"
              aria-label="View web search results"
            >
              <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
              Web Search
            </Button>
          </div>

          <div id="search-results-panel" role="tabpanel" aria-label="Search results">
            {searchType === 'vehicles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}

            {searchType === 'problems' && (
              <div className="space-y-4">
                {problemResults.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Web Search Tab */}
      {searchType === 'web' && (
        <AutomotiveWebSearch onResultSelect={handleWebSearchResult} />
      )}

      {/* Empty State */}
      {!isLoading && searchResults.length === 0 && problemResults.length === 0 && (searchQuery || Object.keys(filters).some(key => filters[key as keyof SearchFilters]?.length)) && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={handleReset} variant="outline" aria-label="Clear all search filters">
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface VehicleCardProps {
  vehicle: Vehicle
}

function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{vehicle.year} {vehicle.make}</span>
          <Car className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
        <CardDescription>{vehicle.model}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Engine:</span>
            <span className="ml-2">{vehicle.engineType}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Drive:</span>
            <span className="ml-2">{vehicle.driveType}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Type:</span>
            <span className="ml-2 capitalize">{vehicle.category}</span>
          </div>
          {vehicle.specialty && (
            <div>
              <span className="text-muted-foreground">Specialty:</span>
              <span className="ml-2">{vehicle.specialty}</span>
            </div>
          )}
        </div>
        <div className="pt-2">
          <Link href={`/problems?vehicle=${vehicle.id}`}>
            <Button variant="outline" size="sm" className="w-full" aria-label={`View problems for ${vehicle.year} ${vehicle.make} ${vehicle.model}`}>
              <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
              View Problems
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProblemCardProps {
  problem: Problem
}

function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{problem.title}</span>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              problem.commonality === 'common' ? 'bg-red-100 text-red-800' :
              problem.commonality === 'uncommon' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {problem.commonality}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </CardTitle>
        <CardDescription>{problem.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-1">Symptoms:</h4>
            <ul className="text-sm text-muted-foreground">
              {problem.symptoms.map((symptom, index) => (
                <li key={index}>• {symptom}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-muted-foreground">
              Est. time: {problem.estimatedTime}
            </span>
            <Link href={`/problems/${problem.id}`}>
              <Button size="sm" aria-label={`View solutions for ${problem.title}`}>
                <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                View Solutions
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="py-8 space-y-6">
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}