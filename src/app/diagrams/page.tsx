'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Zap, Search, Car, Truck, Settings, FileImage, 
  Download, Eye, Filter, Grid, List, ExternalLink 
} from 'lucide-react'
import { useState } from 'react'

interface Diagram {
  id: string
  title: string
  category: 'wiring' | 'engine' | 'transmission' | 'hvac' | 'brake' | 'suspension'
  vehicleType: 'car' | 'truck' | 'diesel' | 'all'
  make?: string
  model?: string
  year?: string
  fileType: 'PDF' | 'PNG' | 'SVG'
  fileSize: string
  description: string
  downloadCount: number
}

const diagrams: Diagram[] = [
  {
    id: '1',
    title: 'Engine Wiring Harness - 2018 Ford F-150',
    category: 'wiring',
    vehicleType: 'truck',
    make: 'Ford',
    model: 'F-150',
    year: '2018',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    description: 'Complete engine wiring diagram for 3.5L EcoBoost V6',
    downloadCount: 1248
  },
  {
    id: '2',
    title: 'Brake System Schematic - Universal Heavy Duty',
    category: 'brake',
    vehicleType: 'truck',
    fileType: 'SVG',
    fileSize: '156 KB',
    description: 'Air brake system diagram for Class 8 trucks',
    downloadCount: 892
  },
  {
    id: '3',
    title: 'HVAC Control Module Wiring - BMW 3 Series',
    category: 'hvac',
    vehicleType: 'car',
    make: 'BMW',
    model: '3 Series',
    year: '2019-2022',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    description: 'Climate control system wiring and component locations',
    downloadCount: 654
  },
  {
    id: '4',
    title: 'Diesel Fuel Injection System - Cummins ISX15',
    category: 'engine',
    vehicleType: 'diesel',
    make: 'Cummins',
    model: 'ISX15',
    fileType: 'PNG',
    fileSize: '3.2 MB',
    description: 'High-resolution fuel system diagram with component identification',
    downloadCount: 2156
  },
  {
    id: '5',
    title: 'Transmission Control Module - Allison 1000',
    category: 'transmission',
    vehicleType: 'truck',
    make: 'Allison',
    model: '1000',
    fileType: 'PDF',
    fileSize: '4.1 MB',
    description: 'Complete TCM wiring and hydraulic control diagrams',
    downloadCount: 743
  },
  {
    id: '6',
    title: 'Front Suspension Assembly - GM Trucks',
    category: 'suspension',
    vehicleType: 'truck',
    make: 'GM',
    year: '2014-2020',
    fileType: 'SVG',
    fileSize: '245 KB',
    description: 'Torsion bar front suspension with component callouts',
    downloadCount: 567
  }
]

export default function DiagramsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('all')
  const [selectedMake, setSelectedMake] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredDiagrams = diagrams.filter(diagram => {
    const matchesSearch = diagram.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         diagram.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || diagram.category === selectedCategory
    const matchesVehicleType = selectedVehicleType === 'all' || diagram.vehicleType === selectedVehicleType || diagram.vehicleType === 'all'
    const matchesMake = selectedMake === 'all' || diagram.make?.toLowerCase() === selectedMake.toLowerCase()

    return matchesSearch && matchesCategory && matchesVehicleType && matchesMake
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wiring': return <Zap className="h-4 w-4" />
      case 'engine': return <Car className="h-4 w-4" />
      case 'transmission': return <Settings className="h-4 w-4" />
      case 'hvac': return <Settings className="h-4 w-4" />
      case 'brake': return <Settings className="h-4 w-4" />
      case 'suspension': return <Settings className="h-4 w-4" />
      default: return <FileImage className="h-4 w-4" />
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'PDF': return 'bg-red-100 text-red-800'
      case 'PNG': return 'bg-blue-100 text-blue-800'
      case 'SVG': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Technical Diagrams</h1>
        <p className="text-muted-foreground">
          Wiring diagrams, schematics, and technical illustrations for automotive repair
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Diagrams
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search diagrams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="wiring">Wiring</SelectItem>
                <SelectItem value="engine">Engine</SelectItem>
                <SelectItem value="transmission">Transmission</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="brake">Brake</SelectItem>
                <SelectItem value="suspension">Suspension</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
              <SelectTrigger>
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="car">Cars</SelectItem>
                <SelectItem value="truck">Trucks</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMake} onValueChange={setSelectedMake}>
              <SelectTrigger>
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="gm">GM</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="cummins">Cummins</SelectItem>
                <SelectItem value="allison">Allison</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Diagrams Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiagrams.map((diagram) => (
            <Card key={diagram.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getCategoryIcon(diagram.category)}
                    {diagram.title}
                  </CardTitle>
                </div>
                <CardDescription>{diagram.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getFileTypeColor(diagram.fileType)}>
                    {diagram.fileType}
                  </Badge>
                  <Badge variant="outline">
                    {diagram.vehicleType === 'all' ? 'Universal' : diagram.vehicleType.toUpperCase()}
                  </Badge>
                  {diagram.make && (
                    <Badge variant="secondary">
                      {diagram.make} {diagram.model}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{diagram.fileSize}</span>
                  <span>{diagram.downloadCount.toLocaleString()} downloads</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            {filteredDiagrams.map((diagram, index) => (
              <div key={diagram.id} className={`p-4 border-b last:border-b-0 hover:bg-accent/50 ${index % 2 === 0 ? 'bg-accent/20' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(diagram.category)}
                      <h3 className="font-medium">{diagram.title}</h3>
                      <Badge className={getFileTypeColor(diagram.fileType)}>
                        {diagram.fileType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{diagram.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{diagram.fileSize}</span>
                      <span>{diagram.downloadCount.toLocaleString()} downloads</span>
                      {diagram.make && <span>{diagram.make} {diagram.model} {diagram.year}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {filteredDiagrams.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileImage className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No diagrams found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all categories
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Statistics</CardTitle>
          <CardDescription>Overview of available technical diagrams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-md">
              <div className="text-2xl font-bold text-primary">{diagrams.length}</div>
              <div className="text-sm text-muted-foreground">Total Diagrams</div>
            </div>
            <div className="text-center p-4 border rounded-md">
              <div className="text-2xl font-bold text-blue-600">{diagrams.filter(d => d.category === 'wiring').length}</div>
              <div className="text-sm text-muted-foreground">Wiring Diagrams</div>
            </div>
            <div className="text-center p-4 border rounded-md">
              <div className="text-2xl font-bold text-green-600">{diagrams.filter(d => d.vehicleType === 'truck').length}</div>
              <div className="text-sm text-muted-foreground">Truck Specific</div>
            </div>
            <div className="text-center p-4 border rounded-md">
              <div className="text-2xl font-bold text-orange-600">{diagrams.reduce((sum, d) => sum + d.downloadCount, 0).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}