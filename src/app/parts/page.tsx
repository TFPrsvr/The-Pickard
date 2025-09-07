"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PartsInterchange from "@/components/parts-interchange"
import { vehicleDatabase, getModelsForMake, getEnginesForMake } from '@/lib/vehicle-data'
import { 
  Car, Truck, Wrench, Settings, Database, Search, 
  Package, AlertTriangle, ExternalLink, CheckCircle 
} from 'lucide-react'

interface QuickSearchResult {
  type: 'automotive' | 'diesel' | 'truck' | 'bmw' | 'gm'
  partNumber: string
  description: string
  price: string
  availability: string
  supplier: string
}

interface VehicleSelection {
  year?: string
  make?: string
  model?: string
  engine?: string
  driveType?: string
  transmission?: string
}

export default function PartsPage() {
  const [quickSearchQuery, setQuickSearchQuery] = useState('')
  const [quickSearchResults, setQuickSearchResults] = useState<QuickSearchResult[]>([])
  const [vehicleSelection, setVehicleSelection] = useState<VehicleSelection>({})

  const handleQuickSearch = async () => {
    if (!quickSearchQuery) return

    // Mock quick search across all databases
    const mockResults: QuickSearchResult[] = [
      {
        type: 'automotive',
        partNumber: quickSearchQuery,
        description: 'Engine Mount - Front',
        price: '$89.99',
        availability: 'In Stock',
        supplier: 'AutoZone'
      },
      {
        type: 'gm',
        partNumber: 'GM-' + quickSearchQuery,
        description: 'Engine Mount Assembly (GM OEM)',
        price: '$145.99',
        availability: 'Special Order',
        supplier: 'GM Parts'
      },
      {
        type: 'diesel',
        partNumber: 'CP3-' + quickSearchQuery,
        description: 'CP3 Injection Pump',
        price: '$1,850.00',
        availability: 'Remanufactured',
        supplier: 'Diesel Parts Direct'
      },
      {
        type: 'bmw',
        partNumber: 'BMW-' + quickSearchQuery,
        description: 'Oil Filter Housing',
        price: '$245.99',
        availability: 'In Stock',
        supplier: 'BMW Genuine'
      }
    ]

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
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Parts Database</h1>
        <p className="text-muted-foreground">
          Search for parts across all automotive databases and find compatible alternatives
        </p>
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Check or Match Your Vehicle Specifications
          </CardTitle>
          <CardDescription>
            Enter your vehicle information to search for the right parts. Selected filters will show below to help you find compatible parts and interchangeable alternatives.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Vehicle Selection Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Year</label>
              <Select 
                value={vehicleSelection.year || ''} 
                onValueChange={(value) => setVehicleSelection({...vehicleSelection, year: value, model: '', engine: ''})}
              >
                <SelectTrigger>
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
              <label className="text-sm font-medium text-gray-700">Make</label>
              <Select 
                value={vehicleSelection.make || ''} 
                onValueChange={(value) => setVehicleSelection({...vehicleSelection, make: value, model: '', engine: ''})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleDatabase.makes.map((make) => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Model</label>
              <Select 
                value={vehicleSelection.model || ''} 
                onValueChange={(value) => setVehicleSelection({...vehicleSelection, model: value, engine: ''})}
                disabled={!vehicleSelection.make}
              >
                <SelectTrigger className="disabled:bg-gray-100 disabled:text-gray-400">
                  <SelectValue placeholder={vehicleSelection.make ? "Select model" : "Select make first"} />
                </SelectTrigger>
                <SelectContent>
                  {getModelsForMake(vehicleSelection.make || '').map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Engine</label>
              <Select 
                value={vehicleSelection.engine || ''} 
                onValueChange={(value) => setVehicleSelection({...vehicleSelection, engine: value})}
                disabled={!vehicleSelection.make}
              >
                <SelectTrigger className="disabled:bg-gray-100 disabled:text-gray-400">
                  <SelectValue placeholder={vehicleSelection.make ? "Select engine" : "Select make first"} />
                </SelectTrigger>
                <SelectContent>
                  {getEnginesForMake(vehicleSelection.make || '').map((engine) => (
                    <SelectItem key={engine} value={engine}>{engine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Drive Type</label>
              <Select 
                value={vehicleSelection.driveType || ''} 
                onValueChange={(value) => setVehicleSelection({...vehicleSelection, driveType: value})}
              >
                <SelectTrigger>
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

          </div>

          {/* Selected Vehicle Display */}
          {(vehicleSelection.year || vehicleSelection.make || vehicleSelection.model) && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Selected Vehicle Specifications</h4>
                </div>
                <div className="text-sm text-green-700">
                  {vehicleSelection.year && <span className="font-medium">{vehicleSelection.year} </span>}
                  {vehicleSelection.make && <span className="font-medium">{vehicleSelection.make} </span>}
                  {vehicleSelection.model && <span className="font-medium">{vehicleSelection.model}</span>}
                  {vehicleSelection.engine && <span> • {vehicleSelection.engine}</span>}
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
              placeholder="Enter OEM part number or part description..."
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleQuickSearch} disabled={!quickSearchQuery.trim()}>
              <Search className="h-4 w-4 mr-2" />
              Search Parts
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setQuickSearchQuery('')
                setQuickSearchResults([])
                setVehicleSelection({})
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
              <Car className="h-6 w-6 text-primary" />
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
              <Database className="h-6 w-6 text-green-600" />
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
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-muted-foreground">
              Always verify part compatibility before installation. Prices and availability subject to change.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}