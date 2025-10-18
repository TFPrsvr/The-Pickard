"use client"

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  vehicleDatabase,
  powersportsDatabase,
  getModelsForMake,
  getEnginesForMake,
  getModelsForPowersportsMake,
  getPowersportsMakesByCategory,
  getMakesForYear,
  getModelsForMakeAndYear,
  getEnginesForMakeAndYear,
  getPowersportsModelsForMakeAndYear
} from '@/lib/vehicle-data'
import { VehicleCategory } from '@/types'
import { generateMockSearchResults, type QuickSearchResult } from '@/lib/mock-parts-data'
import {
  Car, Truck, Wrench, Settings, Database, Search,
  Package, AlertTriangle, ExternalLink, CheckCircle,
  Phone, Mail, MapPin, Download, Clock, Users
} from 'lucide-react'

// Lazy load heavy PartsInterchange component
const PartsInterchange = dynamic(
  () => import('@/components/parts-interchange'),
  {
    loading: () => (
      <Card>
        <CardContent className="py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    ),
    ssr: true
  }
)

interface VehicleSelection {
  category?: VehicleCategory
  year?: string
  make?: string
  model?: string
  engine?: string
  driveType?: string
  transmission?: string
  displacement?: string
  strokeType?: string
  coolingType?: string
}

export default function PartsPage() {
  const { isSignedIn } = useUser()
  const [quickSearchQuery, setQuickSearchQuery] = useState('')
  const [quickSearchResults, setQuickSearchResults] = useState<QuickSearchResult[]>([])
  const [vehicleSelection, setVehicleSelection] = useState<VehicleSelection>({})
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load saved vehicle selection on mount
  useEffect(() => {
    if (isSignedIn && !hasLoadedSavedData) {
      fetch('/api/user/vehicle')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const savedData = data.data
            const loadedSelection: VehicleSelection = {}

            if (savedData.category) loadedSelection.category = savedData.category
            if (savedData.year) loadedSelection.year = savedData.year.toString()
            if (savedData.make) loadedSelection.make = savedData.make
            if (savedData.model) loadedSelection.model = savedData.model
            if (savedData.engineType) loadedSelection.engine = savedData.engineType
            if (savedData.driveType) loadedSelection.driveType = savedData.driveType
            if (savedData.submodel) loadedSelection.transmission = savedData.submodel

            setVehicleSelection(loadedSelection)
          }
          setHasLoadedSavedData(true)
        })
        .catch(err => {
          console.error('Error loading saved vehicle:', err)
          setHasLoadedSavedData(true)
        })
    }
  }, [isSignedIn, hasLoadedSavedData])

  // Save vehicle selection when it changes (debounced)
  useEffect(() => {
    if (isSignedIn && hasLoadedSavedData && (vehicleSelection.category || vehicleSelection.year || vehicleSelection.make)) {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      // Set new timeout to save after 2 seconds of inactivity
      saveTimeoutRef.current = setTimeout(() => {
        fetch('/api/user/vehicle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: vehicleSelection.category,
            year: vehicleSelection.year ? parseInt(vehicleSelection.year) : undefined,
            make: vehicleSelection.make,
            model: vehicleSelection.model,
            engineType: vehicleSelection.engine,
            driveType: vehicleSelection.driveType,
            submodel: vehicleSelection.transmission
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log('Vehicle selection saved')
            }
          })
          .catch(err => console.error('Error saving vehicle selection:', err))
      }, 2000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [isSignedIn, hasLoadedSavedData, vehicleSelection.category, vehicleSelection.year, vehicleSelection.make, vehicleSelection.model, vehicleSelection.engine, vehicleSelection.driveType, vehicleSelection.transmission])

  const handleQuickSearch = async () => {
    if (!quickSearchQuery) return

    const mockResults = generateMockSearchResults(
      quickSearchQuery,
      vehicleSelection.make,
      vehicleSelection.model
    )

    setQuickSearchResults(mockResults)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'automotive': return <Car className="h-4 w-4" />
      case 'diesel': return <Settings className="h-4 w-4" />
      case 'truck': return <Truck className="h-4 w-4" />
      case 'bmw': return <Car className="h-4 w-4" />
      case 'gm': return <Wrench className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'automotive': return 'default'
      case 'diesel': return 'secondary'
      case 'truck': return 'outline'
      case 'bmw': return 'destructive'
      case 'gm': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <div className="py-8 space-y-6">
      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-lg mb-8 h-48">
        <Image
          src="/images/banner-background.png"
          alt="Automotive Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative bg-gradient-to-r from-primary/90 to-secondary/90 text-white p-8 text-center h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">Parts Database</h1>
          <p className="text-xl opacity-90">
            Search for parts across automotive and powersports databases and find compatible alternatives
          </p>
        </div>
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" aria-hidden="true" />
            Find Your Parts
          </CardTitle>
          <CardDescription>
            <span className="font-semibold text-primary">Step 1:</span> Enter vehicle information first<br/>
            <span className="font-semibold text-primary">Step 2:</span> Enter OEM part number<br/>
            <span className="font-semibold text-primary">Step 3:</span> Search for compatible parts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Vehicle Category Selection */}
          <div className="space-y-2">
            <label htmlFor="vehicle-category" className="text-sm font-medium text-gray-700">Vehicle Category</label>
            <Select
              value={vehicleSelection.category || ''}
              onValueChange={(value) => setVehicleSelection({ category: value as VehicleCategory })}
            >
              <SelectTrigger id="vehicle-category" aria-label="Select vehicle category">
                <SelectValue placeholder="Select vehicle category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">🚗 Cars</SelectItem>
                <SelectItem value="truck">🚚 Trucks</SelectItem>
                <SelectItem value="18-wheeler">🚛 18-Wheelers</SelectItem>
                <SelectItem value="motorcycle">🏍️ Motorcycles</SelectItem>
                <SelectItem value="atv">🏁 ATVs</SelectItem>
                <SelectItem value="utv">🚜 UTVs</SelectItem>
                <SelectItem value="snowmobile">🏔️ Snowmobiles</SelectItem>
                <SelectItem value="watercraft">🚤 Watercraft</SelectItem>
                <SelectItem value="rv">🏕️ RVs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Selection Form - Category-Aware */}
          {vehicleSelection.category && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label htmlFor="parts-year" className="text-sm font-medium text-gray-700">Year</label>
                <Select
                  value={vehicleSelection.year || ''}
                  onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, year: value, model: '', engine: '' })}
                >
                  <SelectTrigger id="parts-year" aria-label="Select vehicle year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleDatabase.years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="parts-make" className="text-sm font-medium text-gray-700">Make</label>
                <Select
                  value={vehicleSelection.make || ''}
                  onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, make: value, model: '', engine: '' })}
                >
                  <SelectTrigger id="parts-make" aria-label="Select vehicle make">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {(['motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft'].includes(vehicleSelection.category)
                      ? getPowersportsMakesByCategory(
                          vehicleSelection.category as 'motorcycle' | 'atv' | 'utv' | 'snowmobile' | 'watercraft',
                          vehicleSelection.year ? parseInt(vehicleSelection.year) : undefined
                        )
                      : vehicleSelection.year
                        ? getMakesForYear(parseInt(vehicleSelection.year))
                        : vehicleDatabase.makes
                    ).map((make: string) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="parts-model" className="text-sm font-medium text-gray-700">Model</label>
                <Select
                  value={vehicleSelection.model || ''}
                  onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, model: value, engine: '' })}
                  disabled={!vehicleSelection.make}
                >
                  <SelectTrigger id="parts-model" className="disabled:bg-gray-100 disabled:text-gray-400" aria-label="Select vehicle model" aria-disabled={!vehicleSelection.make}>
                    <SelectValue placeholder={vehicleSelection.make ? "Select model" : "Select make first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(['motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft'].includes(vehicleSelection.category)
                      ? getPowersportsModelsForMakeAndYear(
                          vehicleSelection.make || '',
                          vehicleSelection.year ? parseInt(vehicleSelection.year) : undefined
                        )
                      : getModelsForMakeAndYear(
                          vehicleSelection.make || '',
                          vehicleSelection.year ? parseInt(vehicleSelection.year) : undefined
                        )
                    ).map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Automotive-specific fields */}
              {['car', 'truck', '18-wheeler', 'rv'].includes(vehicleSelection.category) && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="parts-engine" className="text-sm font-medium text-gray-700">Engine</label>
                    <Select
                      value={vehicleSelection.engine || ''}
                      onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, engine: value })}
                      disabled={!vehicleSelection.make}
                    >
                      <SelectTrigger id="parts-engine" className="disabled:bg-gray-100 disabled:text-gray-400" aria-label="Select engine type" aria-disabled={!vehicleSelection.make}>
                        <SelectValue placeholder={vehicleSelection.make ? "Select engine" : "Select make first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {getEnginesForMakeAndYear(
                          vehicleSelection.make || '',
                          vehicleSelection.year ? parseInt(vehicleSelection.year) : undefined
                        ).map((engine) => (
                          <SelectItem key={engine} value={engine}>{engine}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="parts-drive-type-auto" className="text-sm font-medium text-gray-700">Drive Type</label>
                    <Select
                      value={vehicleSelection.driveType || ''}
                      onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, driveType: value })}
                    >
                      <SelectTrigger id="parts-drive-type-auto" aria-label="Select drive type">
                        <SelectValue placeholder="Drive type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleDatabase.driveTypes.map((drive) => (
                          <SelectItem key={drive} value={drive}>
                            {drive === 'FWD' ? 'FWD (Front-Wheel Drive)' :
                              drive === 'RWD' ? 'RWD (Rear-Wheel Drive)' :
                                drive === 'AWD' ? 'AWD (All-Wheel Drive)' :
                                  drive === '4WD' ? '4WD (Four-Wheel Drive)' : drive}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Powersports-specific fields */}
              {['motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft'].includes(vehicleSelection.category) && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="parts-displacement" className="text-sm font-medium text-gray-700">Displacement (CC)</label>
                    <Select
                      value={vehicleSelection.displacement || ''}
                      onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, displacement: value })}
                    >
                      <SelectTrigger id="parts-displacement" aria-label="Select engine displacement in cubic centimeters">
                        <SelectValue placeholder="Select CC" />
                      </SelectTrigger>
                      <SelectContent>
                        {powersportsDatabase.displacements.map((cc) => (
                          <SelectItem key={cc} value={cc}>{cc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="parts-stroke-type" className="text-sm font-medium text-gray-700">Stroke Type</label>
                    <Select
                      value={vehicleSelection.strokeType || ''}
                      onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, strokeType: value })}
                    >
                      <SelectTrigger id="parts-stroke-type" aria-label="Select engine stroke type">
                        <SelectValue placeholder="Stroke type" />
                      </SelectTrigger>
                      <SelectContent>
                        {powersportsDatabase.strokeTypes.map((stroke) => (
                          <SelectItem key={stroke} value={stroke}>{stroke}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="parts-cooling-type" className="text-sm font-medium text-gray-700">Cooling Type</label>
                    <Select
                      value={vehicleSelection.coolingType || ''}
                      onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, coolingType: value })}
                    >
                      <SelectTrigger id="parts-cooling-type" aria-label="Select engine cooling type">
                        <SelectValue placeholder="Cooling type" />
                      </SelectTrigger>
                      <SelectContent>
                        {powersportsDatabase.coolingTypes.map((cooling) => (
                          <SelectItem key={cooling} value={cooling}>{cooling}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="parts-drive-type-power" className="text-sm font-medium text-gray-700">Drive Type</label>
                    <Select
                      value={vehicleSelection.driveType || ''}
                      onValueChange={(value) => setVehicleSelection({ ...vehicleSelection, driveType: value })}
                    >
                      <SelectTrigger id="parts-drive-type-power" aria-label="Select drive type">
                        <SelectValue placeholder="Drive type" />
                      </SelectTrigger>
                      <SelectContent>
                        {powersportsDatabase.driveTypes.map((drive) => (
                          <SelectItem key={drive} value={drive}>{drive}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Selected Vehicle Display */}
          {(vehicleSelection.category || vehicleSelection.year || vehicleSelection.make || vehicleSelection.model) && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                  <h4 className="font-medium text-green-800">Selected Vehicle Specifications</h4>
                </div>
                <div className="text-sm text-green-700">
                  {vehicleSelection.category && <span className="font-medium capitalize">{vehicleSelection.category} • </span>}
                  {vehicleSelection.year && <span className="font-medium">{vehicleSelection.year} </span>}
                  {vehicleSelection.make && <span className="font-medium">{vehicleSelection.make} </span>}
                  {vehicleSelection.model && <span className="font-medium">{vehicleSelection.model}</span>}
                  {vehicleSelection.engine && <span> • {vehicleSelection.engine}</span>}
                  {vehicleSelection.displacement && <span> • {vehicleSelection.displacement}</span>}
                  {vehicleSelection.strokeType && <span> • {vehicleSelection.strokeType}</span>}
                  {vehicleSelection.coolingType && <span> • {vehicleSelection.coolingType}</span>}
                  {vehicleSelection.driveType && <span> • {vehicleSelection.driveType}</span>}
                </div>
                <div className="mt-2 text-xs text-green-600">
                  Now enter a part number or description below to find compatible parts and interchangeable alternatives.
                </div>
              </CardContent>
            </Card>
          )}

          {/* Parts Search */}
          <div className="flex gap-4">
            <Input
              id="parts-search-input"
              placeholder="Enter OEM part number or part description..."
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              className="flex-1"
              aria-label="Enter OEM part number or part description"
            />
            <Button onClick={handleQuickSearch} disabled={!quickSearchQuery.trim()} aria-label="Search for parts">
              <Search className="h-4 w-4 mr-2" aria-hidden="true" />
              Search Parts
            </Button>
            <Button
              variant="outline"
              aria-label="Clear all search filters and vehicle selection"
              onClick={() => {
                setQuickSearchQuery('')
                setQuickSearchResults([])
                setVehicleSelection({})

                // Clear saved vehicle data from backend
                if (isSignedIn) {
                  fetch('/api/user/vehicle', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                  }).catch(err => console.error('Error clearing saved vehicle:', err))
                }
              }}
            >
              Clear All
            </Button>
          </div>

          {quickSearchResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Quick Results</h4>
              {quickSearchResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(result.type)}
                    <div>
                      <div className="font-medium">{result.description}</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {result.partNumber}
                      </div>
                    </div>
                    <Badge variant={getTypeBadgeColor(result.type)}>
                      {result.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{result.price}</div>
                    <div className="text-sm text-muted-foreground">{result.supplier}</div>
                    <div className="text-xs">{result.availability}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Database Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Car className="h-6 w-6 text-primary" aria-hidden="true" />
              Parts Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive automotive, diesel, truck, BMW, and GM parts database with cross-reference capabilities
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Automotive Parts:</span>
                <Badge>500,000+ Parts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Diesel Parts:</span>
                <Badge variant="secondary">50,000+ Parts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Truck Parts:</span>
                <Badge variant="outline">100,000+ Parts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>BMW Parts:</span>
                <Badge variant="destructive">200,000+ Parts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>GM Parts:</span>
                <Badge variant="secondary">300,000+ Parts</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Database className="h-6 w-6 text-green-600" aria-hidden="true" />
              Service Manuals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Free service manuals, repair procedures, and technical diagrams for all vehicle types
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Coverage:</span>
                <Badge className="bg-green-600">60+ Brands</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Content Type:</span>
                <Badge variant="outline">Manuals & Diagrams</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Source:</span>
                <Badge variant="secondary">Charm.li & Others</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Parts Interchange Component */}
      <Tabs defaultValue="interchange" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="interchange">Parts Interchange</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
        </TabsList>

        <TabsContent value="interchange" className="space-y-4">
          <PartsInterchange />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedules</CardTitle>
              <CardDescription>
                Vehicle-specific maintenance schedules and parts lists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Maintenance scheduling feature coming soon</p>
                <p className="text-sm">Will include BMW CBS, GM scheduled maintenance, and diesel service intervals</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Trouble Codes</CardTitle>
              <CardDescription>
                Search diagnostic codes and recommended repair procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Diagnostic code database coming soon</p>
                <p className="text-sm">Will include OBD-II codes, manufacturer-specific codes, and repair procedures</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer with Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Free Databases</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Car-Part.com salvage search</li>
                <li>• LKQ Pick Your Part inventory</li>
                <li>• Pull-A-Part online catalog</li>
                <li>• NHTSA VIN decoder</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">OEM Resources</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• BMW ETK parts catalog</li>
                <li>• GM Parts cross-reference</li>
                <li>• Ford Motorcraft lookup</li>
                <li>• Chrysler Mopar parts</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Commercial Sources</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Rush Truck Centers</li>
                <li>• TruckPro parts network</li>
                <li>• Diesel Parts Direct</li>
                <li>• Fleet Pride locations</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
            <AlertTriangle className="h-4 w-4 text-orange-600" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">
              Always verify part compatibility before installation. Prices and availability subject to change.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Download Catalog Button */}
      <div className="text-center py-6">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md" aria-label="Download complete parts catalog reference guide">
          <Download className="h-5 w-5 mr-2" aria-hidden="true" />
          DOWNLOAD PARTS CATALOG
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Complete parts reference guide with compatibility charts
        </p>
      </div>
    </div>
  )
}