'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Part, Vehicle } from '@/types'
import { Database, Search, Filter, ExternalLink, ArrowRightLeft, Package, DollarSign, RotateCcw, Save, Download, Star } from 'lucide-react'
import Link from 'next/link'

interface VehicleFilters {
  year?: string
  make?: string
  model?: string
  engineSize?: string
  driveType?: string
}

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [vehicleFilters, setVehicleFilters] = useState<VehicleFilters>({})
  const [parts, setParts] = useState<Part[]>([])
  const [filteredParts, setFilteredParts] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPart, setSelectedPart] = useState<Part | null>(null)
  const [savedParts, setSavedParts] = useState<Part[]>([])
  const [showSaved, setShowSaved] = useState(false)

  // Vehicle data for cascading filters (same as problems page)
  const vehicleData = {
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'],
    makes: ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Dodge', 'Hyundai', 'Kia', 'Subaru', 'Mazda', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Acura', 'Volvo'],
    models: {
      'Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Fusion', 'Edge', 'Expedition', 'Ranger', 'Transit', 'Bronco'],
      'Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Malibu', 'Cruze', 'Colorado'],
      'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Land Cruiser', 'Avalon']
    },
    engineSizes: ['1.0L', '1.3L', '1.5L', '1.6L', '1.8L', '2.0L', '2.3L', '2.4L', '2.5L', '2.7L', '3.0L', '3.5L', '3.6L', '4.0L', '5.0L', '5.3L', '5.7L', '6.0L', '6.2L', '6.6L', '6.7L'],
    driveTypes: ['2WD', 'FWD', 'RWD', '4WD', 'AWD']
  }

  // Mock data for parts database
  const mockParts: Part[] = [
    {
      id: '1',
      name: 'Brake Rotor - Front',
      partNumber: 'AC-DELCO-18A1232A',
      manufacturer: 'AC Delco',
      price: 89.99,
      interchangeableWith: ['BREMBO-09A92811', 'RAYBESTOS-580232', 'WAGNER-BD125411']
    },
    {
      id: '2',
      name: 'Oil Filter',
      partNumber: 'FRAM-PH3593A',
      manufacturer: 'FRAM',
      price: 12.99,
      interchangeableWith: ['WIX-57060', 'MOBIL1-M1-110A', 'K&N-HP-1017']
    },
    {
      id: '3',
      name: 'Air Filter',
      partNumber: 'K&N-33-2385',
      manufacturer: 'K&N',
      price: 45.99,
      interchangeableWith: ['FRAM-CA10467', 'WIX-49467', 'MANN-FILTER-C3698/3']
    },
    {
      id: '4',
      name: 'Transmission Filter Kit',
      partNumber: 'WIX-58940',
      manufacturer: 'WIX',
      price: 34.99,
      interchangeableWith: ['FRAM-FT1236A', 'AC-DELCO-TF289', 'BALDWIN-PT9414-MPG']
    },
    {
      id: '5',
      name: 'Spark Plug Set',
      partNumber: 'NGK-6619',
      manufacturer: 'NGK',
      price: 89.99,
      interchangeableWith: ['CHAMPION-9404', 'BOSCH-4417', 'DENSO-5344']
    },
    {
      id: '6',
      name: 'Fuel Filter',
      partNumber: 'WIX-33533',
      manufacturer: 'WIX',
      price: 28.99,
      interchangeableWith: ['FRAM-G7333', 'BALDWIN-BF7633', 'NAPA-3533']
    }
  ]

  const compatibilityData = {
    '1': [ // Brake Rotor
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2019, make: 'Ford', model: 'Expedition' }
    ],
    '2': [ // Oil Filter
      { year: 2015, make: 'Ford', model: 'F-150' },
      { year: 2016, make: 'Ford', model: 'F-150' },
      { year: 2017, make: 'Ford', model: 'F-150' },
      { year: 2018, make: 'Ford', model: 'F-150' },
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' }
    ]
  }

  const categories = [
    'Engine Components',
    'Transmission',
    'Brakes',
    'Suspension',
    'Electrical',
    'Filters',
    'Fluids',
    'Body Parts'
  ]

  useEffect(() => {
    loadParts()
  }, [])

  useEffect(() => {
    filterParts()
  }, [parts, searchQuery, categoryFilter, vehicleFilters])

  const loadParts = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setParts(mockParts)
      setIsLoading(false)
    }, 1000)
  }

  const filterParts = () => {
    let filtered = parts

    if (searchQuery) {
      filtered = filtered.filter(part =>
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.partNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (categoryFilter && categoryFilter !== 'all') {
      // Simple category mapping - in real app this would be in the database
      const categoryMappings = {
        'Filters': ['Oil Filter', 'Air Filter', 'Fuel Filter', 'Transmission Filter Kit'],
        'Brakes': ['Brake Rotor'],
        'Engine Components': ['Spark Plug Set']
      }
      
      const categoryParts = categoryMappings[categoryFilter as keyof typeof categoryMappings] || []
      if (categoryParts.length > 0) {
        filtered = filtered.filter(part => categoryParts.includes(part.name))
      }
    }

    // Apply vehicle filters (in a real app, this would filter based on actual vehicle compatibility data)
    if (vehicleFilters.year || vehicleFilters.make || vehicleFilters.model || vehicleFilters.engineSize || vehicleFilters.driveType) {
      // For demo purposes, we'll simulate filtering based on vehicle specifications
      // In a real application, this would query the database with the vehicle specifications
    }

    setFilteredParts(filtered)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('all')
    setVehicleFilters({})
    setSelectedPart(null)
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

  const getCompatibleVehicles = (partId: string) => {
    return compatibilityData[partId as keyof typeof compatibilityData] || []
  }

  const savePart = (part: Part) => {
    if (!savedParts.find(p => p.id === part.id)) {
      setSavedParts([...savedParts, part])
    }
  }

  const removeSavedPart = (partId: string) => {
    setSavedParts(savedParts.filter(p => p.id !== partId))
  }

  const exportSavedParts = () => {
    const exportData = savedParts.map(part => ({
      name: part.name,
      partNumber: part.partNumber,
      manufacturer: part.manufacturer,
      price: part.price,
      interchangeableWith: part.interchangeableWith.join(', ')
    }))

    const csv = [
      ['Name', 'Part Number', 'Manufacturer', 'Price', 'Interchangeable Parts'],
      ...exportData.map(part => [
        part.name,
        part.partNumber,
        part.manufacturer || '',
        part.price?.toString() || '',
        part.interchangeableWith
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'saved-parts.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Parts Database</h1>
          <p className="text-gray-600">
            Search automotive parts with vehicle compatibility filtering and find interchangeable alternatives
          </p>
        </div>

        {/* Vehicle Filters */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Filter className="h-5 w-5 text-green-600" />
              Vehicle Compatibility Filters
            </CardTitle>
            <CardDescription className="text-gray-600">
              Filter parts by specific vehicle compatibility (filters become available as you make selections)
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

        {/* Parts Search and Filters */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Search className="h-5 w-5 text-green-600" />
              Search & Filter Parts
            </CardTitle>
            <CardDescription className="text-gray-600">
              Find parts by name, part number, manufacturer, or category
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search parts, numbers, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {(searchQuery || categoryFilter) && (
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">
                {filteredParts.length} of {parts.length} parts shown
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save/Export Panel */}
      <div className="flex justify-between items-center">
        <div></div>
        <Button
          variant="outline"
          onClick={() => setShowSaved(!showSaved)}
          className="relative"
        >
          <Star className="h-4 w-4 mr-2" />
          Saved Parts ({savedParts.length})
        </Button>
      </div>

      {showSaved && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Saved Parts
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportSavedParts}
                  disabled={savedParts.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSavedParts([])}
                  disabled={savedParts.length === 0}
                >
                  Clear All
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedParts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No saved parts. Click the save button on parts to add them here.
              </p>
            ) : (
              <div className="space-y-2">
                {savedParts.map((part) => (
                  <div key={part.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{part.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {part.manufacturer} - {part.partNumber}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSavedPart(part.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {selectedPart ? 'All Parts' : 'Search Results'}
          </h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading parts...</p>
            </div>
          ) : filteredParts.length > 0 ? (
            <div className="space-y-3">
              {filteredParts.map((part) => (
                <PartCard 
                  key={part.id} 
                  part={part} 
                  isSelected={selectedPart?.id === part.id}
                  onClick={() => setSelectedPart(part)}
                  onSave={() => savePart(part)}
                  isSaved={savedParts.some(p => p.id === part.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No parts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Clear all filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Part Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Part Details</h2>
          
          {selectedPart ? (
            <div className="space-y-4">
              {/* Part Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {selectedPart.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedPart.manufacturer} - Part #{selectedPart.partNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${selectedPart.price?.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy Online
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Compare Prices
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Interchangeable Parts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    Interchangeable Parts
                  </CardTitle>
                  <CardDescription>
                    Alternative part numbers that are compatible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPart.interchangeableWith.map((partNumber, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{partNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            Alternative part number
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Find
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compatible Vehicles */}
              <Card>
                <CardHeader>
                  <CardTitle>Compatible Vehicles</CardTitle>
                  <CardDescription>
                    Vehicles that use this part
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getCompatibleVehicles(selectedPart.id).length > 0 ? (
                      getCompatibleVehicles(selectedPart.id).map((vehicle, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </div>
                          </div>
                          <Link href={`/search?year=${vehicle.year}&make=${vehicle.make}&model=${vehicle.model}`}>
                            <Button variant="outline" size="sm">
                              <Search className="h-4 w-4 mr-2" />
                              View Vehicle
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>Compatibility information not available</p>
                        <p className="text-sm">Contact us for vehicle compatibility</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Installation Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Installation Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Always verify part compatibility before installation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Follow manufacturer torque specifications</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use appropriate tools and safety equipment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Consider professional installation for complex parts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Part</h3>
                <p className="text-muted-foreground">
                  Click on a part from the list to view detailed information, compatibility, and interchangeable alternatives
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

interface PartCardProps {
  part: Part
  isSelected: boolean
  onClick: () => void
  onSave: () => void
  isSaved: boolean
}

function PartCard({ part, isSelected, onClick, onSave, isSaved }: PartCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-primary bg-primary/5' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">{part.name}</h3>
            <div className="text-sm text-muted-foreground space-y-1 mt-1">
              <div>Part #: {part.partNumber}</div>
              {part.manufacturer && (
                <div>Brand: {part.manufacturer}</div>
              )}
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-3 w-3" />
                <span>{part.interchangeableWith.length} alternatives</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {part.price && (
              <div className="text-lg font-bold text-primary">
                ${part.price.toFixed(2)}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1 mb-2">
              Click for details
            </div>
            <Button
              variant={isSaved ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSave()
              }}
              className="w-full"
            >
              <Save className="h-3 w-3 mr-1" />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}