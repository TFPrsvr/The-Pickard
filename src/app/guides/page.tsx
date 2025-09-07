'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, Search, Wrench, Car, Truck, Settings, 
  Clock, BookOpen, ExternalLink, Star, Filter 
} from 'lucide-react'
import { useState } from 'react'

interface Guide {
  id: string
  title: string
  category: 'repair' | 'maintenance' | 'diagnostic' | 'electrical'
  vehicleType: 'car' | 'truck' | 'diesel' | 'all'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  rating: number
  description: string
  steps: number
}

const guides: Guide[] = [
  {
    id: '1',
    title: 'Engine Oil Change - Complete Guide',
    category: 'maintenance',
    vehicleType: 'all',
    difficulty: 'beginner',
    duration: '30 min',
    rating: 4.8,
    description: 'Step-by-step guide for changing engine oil and filter on most vehicles',
    steps: 8
  },
  {
    id: '2',
    title: 'Brake Pad Replacement',
    category: 'repair',
    vehicleType: 'car',
    difficulty: 'intermediate',
    duration: '2 hours',
    rating: 4.6,
    description: 'Complete brake pad replacement with safety procedures and torque specifications',
    steps: 12
  },
  {
    id: '3',
    title: 'Diesel Fuel System Diagnosis',
    category: 'diagnostic',
    vehicleType: 'diesel',
    difficulty: 'advanced',
    duration: '3-4 hours',
    rating: 4.9,
    description: 'Comprehensive guide for diagnosing common diesel fuel system issues',
    steps: 15
  },
  {
    id: '4',
    title: 'Alternator Testing and Replacement',
    category: 'electrical',
    vehicleType: 'all',
    difficulty: 'intermediate',
    duration: '1.5 hours',
    rating: 4.7,
    description: 'How to test, diagnose, and replace a faulty alternator',
    steps: 10
  },
  {
    id: '5',
    title: 'Semi-Truck Pre-Trip Inspection',
    category: 'maintenance',
    vehicleType: 'truck',
    difficulty: 'beginner',
    duration: '45 min',
    rating: 4.5,
    description: 'Complete DOT-compliant pre-trip inspection checklist and procedures',
    steps: 20
  },
  {
    id: '6',
    title: 'Transmission Fluid Service',
    category: 'maintenance',
    vehicleType: 'all',
    difficulty: 'intermediate',
    duration: '1 hour',
    rating: 4.4,
    description: 'Proper transmission fluid change procedures and specifications',
    steps: 9
  }
]

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
    const matchesVehicleType = selectedVehicleType === 'all' || guide.vehicleType === selectedVehicleType || guide.vehicleType === 'all'
    const matchesDifficulty = selectedDifficulty === 'all' || guide.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesVehicleType && matchesDifficulty
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'repair': return <Wrench className="h-4 w-4" />
      case 'maintenance': return <Settings className="h-4 w-4" />
      case 'diagnostic': return <Search className="h-4 w-4" />
      case 'electrical': return <Car className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">How-to Guides</h1>
        <p className="text-muted-foreground">
          Step-by-step repair and maintenance guides for cars, trucks, and diesels
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="repair">Repair</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
              <TabsTrigger value="electrical">Electrical</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getCategoryIcon(guide.category)}
                  {guide.title}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{guide.rating}</span>
                </div>
              </div>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={getDifficultyColor(guide.difficulty)}>
                  {guide.difficulty}
                </Badge>
                <Badge variant="secondary">
                  {guide.vehicleType === 'all' ? 'All Vehicles' : guide.vehicleType.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {guide.duration}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {guide.steps} steps
                </span>
                <Button size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No guides found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all categories
            </p>
          </CardContent>
        </Card>
      )}

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Categories</CardTitle>
          <CardDescription>Most viewed guide categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-md hover:bg-accent cursor-pointer">
              <Wrench className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Engine Repair</h4>
              <p className="text-sm text-muted-foreground">25 guides</p>
            </div>
            <div className="text-center p-4 border rounded-md hover:bg-accent cursor-pointer">
              <Settings className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <h4 className="font-medium">Maintenance</h4>
              <p className="text-sm text-muted-foreground">18 guides</p>
            </div>
            <div className="text-center p-4 border rounded-md hover:bg-accent cursor-pointer">
              <Car className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium">Electrical</h4>
              <p className="text-sm text-muted-foreground">12 guides</p>
            </div>
            <div className="text-center p-4 border rounded-md hover:bg-accent cursor-pointer">
              <Truck className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <h4 className="font-medium">Truck Specific</h4>
              <p className="text-sm text-muted-foreground">15 guides</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}