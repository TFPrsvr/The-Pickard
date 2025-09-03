'use client'

import { useState, useEffect } from 'react'
import { VehicleSearchFilters } from '@/components/search-filters'
import { AutomotiveWebSearch } from '@/components/automotive-web-search'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchFilters, Vehicle, Problem } from '@/types'
import { SearchResult } from '@/lib/web-search'
import { Search, Car, Wrench, ExternalLink, Globe } from 'lucide-react'
import Link from 'next/link'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [searchResults, setSearchResults] = useState<Vehicle[]>([])
  const [problemResults, setProblemResults] = useState<Problem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState<'vehicles' | 'problems' | 'web'>('vehicles')

  // Mock data for demonstration
  const mockVehicles: Vehicle[] = [
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
  ]

  const mockProblems: Problem[] = [
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
  ]

  const handleSearch = () => {
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

      if (filters.category?.length) {
        filteredVehicles = filteredVehicles.filter(vehicle =>
          filters.category!.includes(vehicle.category)
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
  }

  const handleReset = () => {
    setFilters({})
    setSearchQuery('')
    setSearchResults([])
    setProblemResults([])
  }

  const handleWebSearchResult = (result: SearchResult) => {
    // Handle saving web search result to database
    console.log('Saving search result:', result)
    // TODO: Implement database save functionality
  }

  useEffect(() => {
    // Auto-search when filters change
    if (Object.keys(filters).some(key => filters[key as keyof SearchFilters]?.length)) {
      handleSearch()
    }
  }, [filters])

  return (
    <div className="py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vehicle Search</h1>
        <p className="text-muted-foreground">
          Search our comprehensive database of vehicles, problems, and solutions
        </p>
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Search
          </CardTitle>
          <CardDescription>
            Search for vehicles by year, make, model, or keywords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search vehicles (e.g., 2019 Ford F-150)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <VehicleSearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* Search Results */}
      {(searchResults.length > 0 || problemResults.length > 0) && (
        <div className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={searchType === 'vehicles' ? 'default' : 'outline'}
              onClick={() => setSearchType('vehicles')}
            >
              <Car className="h-4 w-4 mr-2" />
              Vehicles ({searchResults.length})
            </Button>
            <Button
              variant={searchType === 'problems' ? 'default' : 'outline'}
              onClick={() => setSearchType('problems')}
            >
              <Wrench className="h-4 w-4 mr-2" />
              Problems ({problemResults.length})
            </Button>
            <Button
              variant={searchType === 'web' ? 'default' : 'outline'}
              onClick={() => setSearchType('web')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Web Search
            </Button>
          </div>

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
            <Button onClick={handleReset} variant="outline">
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
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
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
              <Button size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Solutions
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}