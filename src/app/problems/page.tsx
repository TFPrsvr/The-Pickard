'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Problem, Vehicle } from '@/types'
import { Wrench, Search, Filter, ExternalLink, Clock, AlertTriangle, RotateCcw, Phone, Mail, MapPin, Download, Users } from 'lucide-react'
import Link from 'next/link'

interface VehicleFilters {
  year?: string
  make?: string
  model?: string
  engineSize?: string
  driveType?: string
}

export default function ProblemsPage() {
  const searchParams = useSearchParams()
  const vehicleId = searchParams?.get('vehicle')
  
  const [problems, setProblems] = useState<Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [commonalityFilter, setCommonalityFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [vehicleFilters, setVehicleFilters] = useState<VehicleFilters>({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // Vehicle data for cascading filters
  const vehicleData = {
    years: Array.from({length: 126}, (_, i) => String(2025 - i)), // 2025 down to 1900
    makes: ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Dodge', 'Hyundai', 'Kia', 'Subaru', 'Mazda', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Acura', 'Volvo'],
    models: {
      'Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Fusion', 'Edge', 'Expedition', 'Ranger', 'Transit', 'Bronco', 'Fiesta', 'Taurus', 'EcoSport'],
      'Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Malibu', 'Cruze', 'Colorado', 'Impala', 'Sonic', 'Trax', 'Blazer'],
      'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Land Cruiser', 'Avalon', 'Yaris', 'C-HR', 'Venza', 'Supra'],
      'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V', 'Odyssey', 'Ridgeline', 'Passport', 'Insight', 'Clarity'],
      'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Titan', 'Versa', 'Kicks', 'Murano', 'Armada', 'Maxima', '370Z'],
      'Ram': ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
      'GMC': ['Sierra 1500', 'Sierra 2500HD', 'Sierra 3500HD', 'Terrain', 'Acadia', 'Yukon', 'Canyon', 'Savana'],
      'Jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Grand Wagoneer', 'Wagoneer'],
      'Dodge': ['Charger', 'Challenger', 'Durango', 'Journey'],
      'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent', 'Venue', 'Kona', 'Palisade', 'Genesis'],
      'Kia': ['Optima', 'Forte', 'Sportage', 'Sorento', 'Rio', 'Soul', 'Stinger', 'Telluride', 'Seltos'],
      'Subaru': ['Outback', 'Forester', 'Impreza', 'Legacy', 'Crosstrek', 'Ascent', 'WRX', 'BRZ'],
      'Mazda': ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-30'],
      'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Beetle', 'Arteon'],
      'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'Z4', '4 Series', '6 Series'],
      'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'A-Class', 'CLA', 'GLA', 'GLB'],
      'Audi': ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'],
      'Lexus': ['ES', 'IS', 'LS', 'GS', 'RX', 'GX', 'LX', 'NX', 'UX', 'LC'],
      'Acura': ['ILX', 'TLX', 'RLX', 'RDX', 'MDX', 'NSX'],
      'Volvo': ['S60', 'S90', 'XC40', 'XC60', 'XC90', 'V60', 'V90']
    },
    engineSizes: ['1.0L', '1.3L', '1.5L', '1.6L', '1.8L', '2.0L', '2.3L', '2.4L', '2.5L', '2.7L', '3.0L', '3.5L', '3.6L', '4.0L', '5.0L', '5.3L', '5.7L', '6.0L', '6.2L', '6.6L', '6.7L'],
    driveTypes: ['2WD', 'FWD', 'RWD', '4WD', 'AWD']
  }

  // Mock data
  const mockProblems: Problem[] = [
    {
      id: '1',
      vehicleId: '1',
      title: 'Transmission Slipping Between Gears',
      description: 'Automatic transmission fails to maintain proper gear engagement, particularly noticeable during acceleration or under load.',
      symptoms: [
        'Engine RPMs increase without corresponding acceleration',
        'Delayed or harsh shifting',
        'Burning smell from transmission fluid',
        'Check engine light may illuminate'
      ],
      solutions: [],
      commonality: 'common',
      difficulty: 'hard',
      estimatedTime: '4-8 hours'
    },
    {
      id: '2',
      vehicleId: '1',
      title: 'Brake Pedal Vibration',
      description: 'Steering wheel or brake pedal vibrates when applying brakes, typically indicating warped rotors.',
      symptoms: [
        'Vibration in steering wheel during braking',
        'Pulsating brake pedal',
        'Squealing or grinding noise',
        'Longer stopping distances'
      ],
      solutions: [],
      commonality: 'common',
      difficulty: 'medium',
      estimatedTime: '2-3 hours'
    },
    {
      id: '3',
      vehicleId: '2',
      title: 'Oil Consumption Issue',
      description: 'Engine consumes excessive amounts of oil without visible external leaks.',
      symptoms: [
        'Frequent need to add oil',
        'Blue smoke from exhaust',
        'Low oil warning light',
        'Reduced engine performance'
      ],
      solutions: [],
      commonality: 'uncommon',
      difficulty: 'hard',
      estimatedTime: '6-12 hours'
    },
    {
      id: '4',
      vehicleId: '1',
      title: 'Air Conditioning Not Cooling',
      description: 'AC system blows warm air or fails to maintain proper cooling temperature.',
      symptoms: [
        'Warm air from vents',
        'AC compressor not engaging',
        'Refrigerant leak evidence',
        'Strange noises from AC system'
      ],
      solutions: [],
      commonality: 'common',
      difficulty: 'medium',
      estimatedTime: '1-3 hours'
    }
  ]

  const mockVehicle: Vehicle = {
    id: '1',
    year: 2019,
    make: 'Ford',
    model: 'F-150',
    engineType: 'V8',
    driveType: '4WD',
    category: 'truck',
    specialty: 'SuperCrew'
  }

  useEffect(() => {
    loadProblems()
    if (vehicleId) {
      setSelectedVehicle(mockVehicle)
    }
  }, [vehicleId])

  useEffect(() => {
    filterProblems()
  }, [problems, searchQuery, commonalityFilter, difficultyFilter, vehicleFilters])

  const loadProblems = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      let results = mockProblems
      
      if (vehicleId) {
        results = results.filter(problem => problem.vehicleId === vehicleId)
      }
      
      setProblems(results)
      setIsLoading(false)
    }, 1000)
  }

  const filterProblems = () => {
    let filtered = problems

    if (searchQuery) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.symptoms.some(symptom =>
          symptom.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    if (commonalityFilter && commonalityFilter !== 'all') {
      filtered = filtered.filter(problem => problem.commonality === commonalityFilter)
    }

    if (difficultyFilter && difficultyFilter !== 'all') {
      filtered = filtered.filter(problem => problem.difficulty === difficultyFilter)
    }

    // Apply vehicle filters (in a real app, this would filter based on actual vehicle data)
    if (vehicleFilters.year || vehicleFilters.make || vehicleFilters.model || vehicleFilters.engineSize || vehicleFilters.driveType) {
      // For demo purposes, we'll simulate filtering based on vehicle specifications
      // In a real application, this would query the database with the vehicle specifications
    }

    setFilteredProblems(filtered)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCommonalityFilter('all')
    setDifficultyFilter('all')
    setVehicleFilters({})
  }

  const handleVehicleFilterChange = (filterType: keyof VehicleFilters, value: string) => {
    setVehicleFilters(prev => {
      const newFilters = { ...prev }
      
      if (value === 'all') {
        delete newFilters[filterType]
      } else {
        newFilters[filterType] = value
      }

      // Reset dependent filters when parent filter changes
      if (filterType === 'make') {
        delete newFilters.model
      }

      return newFilters
    })
  }

  const getAvailableModels = () => {
    if (!vehicleFilters.make) return []
    return vehicleData.models[vehicleFilters.make as keyof typeof vehicleData.models] || []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-lg mb-8">
          <div className="absolute inset-0">
            <img
              src="/images/banner-background.png"
              alt="Automotive Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative bg-gradient-to-r from-orange-600/90 to-red-600/90 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              {selectedVehicle 
                ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model} Problems`
                : 'Vehicle Problems Database'
              }
            </h1>
            <p className="text-xl opacity-90">
              {selectedVehicle 
                ? 'Common and uncommon problems for this specific vehicle'
                : 'Browse problems filtered by vehicle specifications'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
          </div>
          {selectedVehicle && (
            <Link href="/search">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Change Vehicle
              </Button>
            </Link>
          )}
        </div>

        {/* Vehicle Filters */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Filter className="h-5 w-5 text-blue-600" />
              Vehicle Specifications
            </CardTitle>
            <CardDescription className="text-gray-600">
              Filter problems by specific vehicle details (filters become available as you make selections)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <Select 
                  value={vehicleFilters.year || 'all'} 
                  onValueChange={(value) => handleVehicleFilterChange('year', value)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {vehicleData.years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Make</label>
                <Select 
                  value={vehicleFilters.make || 'all'} 
                  onValueChange={(value) => handleVehicleFilterChange('make', value)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {vehicleData.makes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Model</label>
                <Select 
                  value={vehicleFilters.model || 'all'} 
                  onValueChange={(value) => handleVehicleFilterChange('model', value)}
                  disabled={!vehicleFilters.make}
                >
                  <SelectTrigger className="bg-white border-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
                    <SelectValue placeholder={vehicleFilters.make ? "Select model" : "Select make first"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    {getAvailableModels().map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Engine Size</label>
                <Select 
                  value={vehicleFilters.engineSize || 'all'} 
                  onValueChange={(value) => handleVehicleFilterChange('engineSize', value)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Engine size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Engines</SelectItem>
                    {vehicleData.engineSizes.map((engine) => (
                      <SelectItem key={engine} value={engine}>
                        {engine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Drive Type</label>
                <Select 
                  value={vehicleFilters.driveType || 'all'} 
                  onValueChange={(value) => handleVehicleFilterChange('driveType', value)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Drive type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Drive Types</SelectItem>
                    {vehicleData.driveTypes.map((drive) => (
                      <SelectItem key={drive} value={drive}>
                        {drive}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem Filters */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Search className="h-5 w-5 text-red-600" />
              Search & Filter Problems
            </CardTitle>
            <CardDescription className="text-gray-600">
              Search and filter problems by keywords, commonality, and difficulty
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Commonality</label>
                <Select value={commonalityFilter} onValueChange={setCommonalityFilter}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Difficulty</label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="All difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={resetFilters}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset All Filters
                </Button>
              </div>
            </div>

            {(searchQuery || commonalityFilter !== 'all' || difficultyFilter !== 'all' || Object.keys(vehicleFilters).length > 0) && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  {filteredProblems.length} of {problems.length} problems shown
                </span>
                <div className="text-xs text-gray-500">
                  Active filters: {[
                    searchQuery && 'Search',
                    commonalityFilter !== 'all' && 'Commonality',
                    difficultyFilter !== 'all' && 'Difficulty',
                    ...Object.keys(vehicleFilters).map(key => key.charAt(0).toUpperCase() + key.slice(1))
                  ].filter(Boolean).join(', ')}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Problems List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading problems...</p>
          </div>
        ) : filteredProblems.length > 0 ? (
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="py-12 text-center">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">No problems found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || commonalityFilter !== 'all' || difficultyFilter !== 'all' || Object.keys(vehicleFilters).length > 0
                  ? 'Try adjusting your filters to see more results'
                  : 'No problems have been reported yet'
                }
              </p>
              {(searchQuery || commonalityFilter !== 'all' || difficultyFilter !== 'all' || Object.keys(vehicleFilters).length > 0) && (
                <Button onClick={resetFilters} className="bg-red-600 hover:bg-red-700 text-white">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear all filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Professional Contact Section */}
        <section className="mt-16 py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              NEED HELP DIAGNOSING YOUR PROBLEM?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our certified automotive technicians are available to help diagnose complex problems. 
              Get expert assistance with troubleshooting and repair solutions.
            </p>
          </div>


          {/* Download Diagnostic Guide */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-4 rounded-md hover:bg-orange-600 transition-colors cursor-pointer">
              <Download className="h-5 w-5" />
              <span className="font-semibold">DOWNLOAD DIAGNOSTIC GUIDE</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Step-by-step troubleshooting manual for common problems
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

interface ProblemCardProps {
  problem: Problem
}

function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Wrench className="h-5 w-5 text-red-600" />
              {problem.title}
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              {problem.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
              problem.commonality === 'common' ? 'bg-red-100 text-red-800' :
              problem.commonality === 'uncommon' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {problem.commonality}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
              problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-900">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            Symptoms:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 ml-6">
            {problem.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-red-600 mt-1">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            Est. time: {problem.estimatedTime}
          </div>
          <Link href={`/problems/${problem.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Solutions
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}