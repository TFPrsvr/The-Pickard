'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Problem, Vehicle } from '@/types'
import { Wrench, Search, Filter, ExternalLink, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function ProblemsPage() {
  const searchParams = useSearchParams()
  const vehicleId = searchParams?.get('vehicle')
  
  const [problems, setProblems] = useState<Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [commonalityFilter, setCommonalityFilter] = useState<string>('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

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
  }, [problems, searchQuery, commonalityFilter, difficultyFilter])

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

    if (commonalityFilter) {
      filtered = filtered.filter(problem => problem.commonality === commonalityFilter)
    }

    if (difficultyFilter) {
      filtered = filtered.filter(problem => problem.difficulty === difficultyFilter)
    }

    setFilteredProblems(filtered)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCommonalityFilter('')
    setDifficultyFilter('')
  }

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {selectedVehicle 
              ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model} Problems`
              : 'Vehicle Problems Database'
            }
          </h1>
          <p className="text-muted-foreground">
            {selectedVehicle 
              ? 'Common and uncommon problems for this specific vehicle'
              : 'Browse problems across all vehicles in our database'
            }
          </p>
        </div>
        {selectedVehicle && (
          <Link href="/search">
            <Button variant="outline">
              Change Vehicle
            </Button>
          </Link>
        )}
      </div>

      {/* Selected Vehicle Info */}
      {selectedVehicle && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                  <span>Engine: {selectedVehicle.engineType}</span>
                  <span>Drive: {selectedVehicle.driveType}</span>
                  <span>Type: {selectedVehicle.category}</span>
                  {selectedVehicle.specialty && <span>Specialty: {selectedVehicle.specialty}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{filteredProblems.length}</div>
                <div className="text-sm text-muted-foreground">Problems Found</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Problems
          </CardTitle>
          <CardDescription>
            Search and filter problems by keywords, commonality, and difficulty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Commonality</label>
              <Select value={commonalityFilter} onValueChange={setCommonalityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All levels</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || commonalityFilter || difficultyFilter) && (
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">
                {filteredProblems.length} of {problems.length} problems shown
              </span>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Problems List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading problems...</p>
        </div>
      ) : filteredProblems.length > 0 ? (
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No problems found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || commonalityFilter || difficultyFilter
                ? 'Try adjusting your filters'
                : 'No problems have been reported for this vehicle yet'
              }
            </p>
            {(searchQuery || commonalityFilter || difficultyFilter) && (
              <Button onClick={resetFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface ProblemCardProps {
  problem: Problem
}

function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              {problem.title}
            </CardTitle>
            <CardDescription className="mt-2">
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
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Symptoms:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6">
            {problem.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-primary mt-1">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Est. time: {problem.estimatedTime}
          </div>
          <Link href={`/problems/${problem.id}`}>
            <Button>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Solutions
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}