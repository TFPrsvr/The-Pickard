"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DataTable } from "@/components/ui/data-table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { partsInterchangeService, InterchangeablePart, VINLookupResult } from "@/lib/parts-interchange-api"
import { Search, Car, AlertTriangle, Package, Phone, ExternalLink, CheckCircle } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

export default function PartsInterchange() {
  const [vin, setVin] = useState('')
  const [oemPartNumber, setOemPartNumber] = useState('')
  const [vehicleInfo, setVehicleInfo] = useState<{
    year: string
    make: string
    model: string
    engine?: string
  }>({
    year: '',
    make: '',
    model: ''
  })
  
  const [searchResults, setSearchResults] = useState<{
    oemInfo: any
    newParts: InterchangeablePart[]
    usedParts: InterchangeablePart[]
    remanufactured: InterchangeablePart[]
    totalResults: number
  }>({
    oemInfo: {},
    newParts: [],
    usedParts: [],
    remanufactured: [],
    totalResults: 0
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<'new' | 'used' | 'remanufactured'>('new')

  const handleVINLookup = async () => {
    if (vin.length !== 17) {
      toast.error('VIN must be 17 characters')
      return
    }

    setIsLoading(true)
    setSearchProgress(20)
    
    try {
      const vinResult = await partsInterchangeService.decodeVINForParts(vin)
      setSearchProgress(60)
      
      if (vinResult) {
        setVehicleInfo({
          year: vinResult.year,
          make: vinResult.make,
          model: vinResult.model,
          engine: vinResult.engine
        })
        toast.success(`Vehicle decoded: ${vinResult.year} ${vinResult.make} ${vinResult.model}`)
        setSearchProgress(100)
      } else {
        toast.error('Unable to decode VIN')
      }
    } catch (error) {
      toast.error('VIN lookup failed')
      console.error('VIN lookup error:', error)
    } finally {
      setIsLoading(false)
      setSearchProgress(0)
    }
  }

  const handlePartsSearch = async () => {
    if (!oemPartNumber || !vehicleInfo.year || !vehicleInfo.make || !vehicleInfo.model) {
      toast.error('Please provide OEM part number and vehicle information')
      return
    }

    setIsLoading(true)
    setSearchProgress(10)
    toast.info('Searching multiple parts databases...')

    try {
      const results = await partsInterchangeService.getComprehensiveInterchange(
        oemPartNumber,
        vehicleInfo
      )
      
      setSearchProgress(80)
      setSearchResults(results)
      setSearchProgress(100)
      
      toast.success(`Found ${results.totalResults} parts across all databases`)
    } catch (error) {
      toast.error('Parts search failed')
      console.error('Parts search error:', error)
    } finally {
      setIsLoading(false)
      setSearchProgress(0)
    }
  }

  const partsColumns: ColumnDef<InterchangeablePart>[] = [
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("brand")}</div>
      ),
    },
    {
      accessorKey: "partNumber",
      header: "Part Number",
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue("partNumber")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="font-semibold text-primary">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => {
        const availability = row.getValue("availability") as string
        return (
          <Badge variant={availability === 'in-stock' ? 'default' : availability === 'limited' ? 'secondary' : 'destructive'}>
            {availability}
          </Badge>
        )
      },
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) => {
        const condition = row.getValue("condition") as string
        return (
          <Badge variant={condition === 'new' ? 'default' : 'secondary'}>
            {condition}
          </Badge>
        )
      },
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      cell: ({ row }) => {
        const supplier = row.original.supplier
        return (
          <div className="space-y-1">
            <div className="font-medium">{supplier.name}</div>
            <div className="text-sm text-muted-foreground">{supplier.location}</div>
            {supplier.phone && (
              <div className="flex items-center gap-1 text-sm">
                <Phone className="h-3 w-3" />
                {supplier.phone}
              </div>
            )}
            {supplier.website && (
              <Button variant="ghost" size="sm" className="h-6 p-1" asChild>
                <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        )
      },
    },
    {
      id: "compatibility",
      header: "Compatibility",
      cell: ({ row }) => {
        const part = row.original
        const compatibility = partsInterchangeService.validatePartCompatibility(part, vehicleInfo)
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Badge variant={compatibility.confidence === 'high' ? 'default' : compatibility.confidence === 'medium' ? 'secondary' : 'destructive'}>
                  {compatibility.confidence}
                </Badge>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compatibility Check</DialogTitle>
                <DialogDescription>
                  Part compatibility for {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {compatibility.isCompatible ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  )}
                  <span className="font-medium">
                    {compatibility.isCompatible ? 'Compatible' : 'Check Compatibility'}
                  </span>
                </div>
                <div className="space-y-2">
                  {compatibility.notes.map((note, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {note}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Fits:</div>
                  <div className="text-sm">
                    Years: {part.compatibility.years.join(', ')}<br/>
                    Makes: {part.compatibility.makes.join(', ')}<br/>
                    Models: {part.compatibility.models.join(', ')}
                    {part.compatibility.engines && (
                      <>
                        <br/>Engines: {part.compatibility.engines.join(', ')}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
      },
    },
  ]

  const currentParts = searchResults[activeTab] || []

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Parts Interchange</h1>
        <p className="text-muted-foreground">
          Search across multiple free parts databases including Car-Part.com, LKQ, Pull-A-Part, and more
        </p>
      </div>

      {/* VIN Decoder Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            VIN Decoder
          </CardTitle>
          <CardDescription>
            Decode your VIN to get exact vehicle specifications for parts compatibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter 17-character VIN"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              maxLength={17}
              className="flex-1 font-mono"
            />
            <Button onClick={handleVINLookup} disabled={isLoading || vin.length !== 17}>
              <Search className="h-4 w-4 mr-2" />
              Decode VIN
            </Button>
          </div>
          
          {isLoading && searchProgress > 0 && (
            <Progress value={searchProgress} className="w-full" />
          )}

          {(vehicleInfo.year && vehicleInfo.make && vehicleInfo.model) && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Vehicle Information</AlertTitle>
              <AlertDescription>
                {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model} {vehicleInfo.engine && `- ${vehicleInfo.engine}`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Manual Vehicle Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Vehicle Entry</CardTitle>
          <CardDescription>
            Or enter vehicle information manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Year"
              value={vehicleInfo.year}
              onChange={(e) => setVehicleInfo({...vehicleInfo, year: e.target.value})}
            />
            <Input
              placeholder="Make"
              value={vehicleInfo.make}
              onChange={(e) => setVehicleInfo({...vehicleInfo, make: e.target.value})}
            />
            <Input
              placeholder="Model"
              value={vehicleInfo.model}
              onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
            />
            <Input
              placeholder="Engine (optional)"
              value={vehicleInfo.engine || ''}
              onChange={(e) => setVehicleInfo({...vehicleInfo, engine: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Parts Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Parts Search
          </CardTitle>
          <CardDescription>
            Enter OEM part number to find interchangeable parts from multiple databases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter OEM Part Number"
              value={oemPartNumber}
              onChange={(e) => setOemPartNumber(e.target.value.toUpperCase())}
              className="flex-1 font-mono"
            />
            <Button onClick={handlePartsSearch} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Search Parts
            </Button>
          </div>

          {isLoading && searchProgress > 0 && (
            <div className="space-y-2">
              <Progress value={searchProgress} className="w-full" />
              <div className="text-sm text-muted-foreground text-center">
                Searching Car-Part.com, LKQ, Pull-A-Part...
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {searchResults.totalResults > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.totalResults} parts from multiple sources
            </CardDescription>
            
            {/* Results Tabs */}
            <div className="flex gap-2 pt-4">
              <Button
                variant={activeTab === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('new')}
              >
                New Parts ({searchResults.newParts.length})
              </Button>
              <Button
                variant={activeTab === 'used' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('used')}
              >
                Used Parts ({searchResults.usedParts.length})
              </Button>
              <Button
                variant={activeTab === 'remanufactured' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('remanufactured')}
              >
                Remanufactured ({searchResults.remanufactured.length})
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {currentParts.length > 0 ? (
              <DataTable
                columns={partsColumns}
                data={currentParts}
                searchKey="description"
                searchPlaceholder="Search parts..."
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No {activeTab} parts found for this search
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Data Sources Info */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Data Sources</AlertTitle>
        <AlertDescription>
          This tool searches free automotive databases including Car-Part.com, LKQ Pick Your Part, 
          Pull-A-Part, and cross-references with OEM part databases. Always verify compatibility 
          before purchasing parts.
        </AlertDescription>
      </Alert>
    </div>
  )
}