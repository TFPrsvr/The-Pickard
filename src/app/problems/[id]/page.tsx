'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Problem, Solution, Tool, Part, Reference, Vehicle } from '@/types'
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  Bookmark, 
  Share2,
  ArrowLeft,
  Play,
  FileText,
  ShoppingCart
} from 'lucide-react'
import Link from 'next/link'

export default function ProblemDetailPage() {
  const params = useParams()
  const problemId = params?.id as string
  
  const [problem, setProblem] = useState<Problem | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('')
  const [isSaved, setIsSaved] = useState(false)

  // Mock data
  const mockProblem: Problem = {
    id: '1',
    vehicleId: '1',
    title: 'Transmission Slipping Between Gears',
    description: 'Automatic transmission fails to maintain proper gear engagement, particularly noticeable during acceleration or under load. This is a common issue that can be caused by various factors including low fluid levels, worn clutch bands, or internal seal failures.',
    symptoms: [
      'Engine RPMs increase without corresponding acceleration',
      'Delayed or harsh shifting between gears',
      'Burning smell from transmission fluid',
      'Check engine light may illuminate',
      'Transmission fluid appears dark or burnt',
      'Slipping occurs more frequently when climbing hills'
    ],
    solutions: [],
    commonality: 'common',
    difficulty: 'hard',
    estimatedTime: '4-8 hours'
  }

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

  const mockSolutions: Solution[] = [
    {
      id: '1',
      description: 'Check and replace transmission fluid - Often the simplest and most cost-effective solution',
      tools: [
        { id: '1', name: 'Socket wrench set', category: 'tools', required: true },
        { id: '2', name: 'Transmission fluid pump', category: 'tools', required: true },
        { id: '3', name: 'Drain pan (large)', category: 'tools', required: true },
        { id: '4', name: 'Safety glasses', category: 'safety', required: true }
      ],
      parts: [
        { id: '1', name: 'ATF (Automatic Transmission Fluid)', partNumber: 'MOTORCRAFT-XT-10-QLVC', manufacturer: 'Motorcraft', price: 12.99, interchangeableWith: ['VALVOLINE-ATF', 'CASTROL-TRANSMAX'] }
      ],
      steps: [
        'Warm up the engine and transmission by driving for 10-15 minutes',
        'Park on level ground and engage parking brake',
        'Locate transmission dipstick and check current fluid level',
        'If fluid is low, dark, or burnt-smelling, proceed with fluid change',
        'Locate transmission drain plug under the vehicle',
        'Position drain pan and remove drain plug with socket wrench',
        'Allow all fluid to drain (approximately 4-6 quarts)',
        'Clean drain plug and reinstall with new gasket if available',
        'Locate transmission fluid fill tube (usually red dipstick tube)',
        'Using transmission pump, add new ATF through fill tube',
        'Start engine and check for leaks while adding fluid gradually',
        'Check fluid level with dipstick and add as needed',
        'Test drive vehicle and monitor shifting behavior'
      ],
      warnings: [
        'Never check transmission fluid on a cold engine - it must be warmed up',
        'Always use the correct type of ATF specified in owners manual',
        'Do not overfill - this can cause shifting problems',
        'If fluid change does not resolve issue, internal damage may be present'
      ],
      references: [
        { id: '1', title: 'Ford F-150 Transmission Service Manual', url: 'https://example.com/manual', type: 'manual' },
        { id: '2', title: 'Transmission Fluid Change Video Guide', url: 'https://youtube.com/watch?v=example', type: 'video' }
      ]
    },
    {
      id: '2', 
      description: 'Replace transmission filter and perform complete service - More thorough solution for persistent problems',
      tools: [
        { id: '5', name: 'Transmission jack', category: 'tools', required: true },
        { id: '6', name: 'Torque wrench', category: 'tools', required: true },
        { id: '7', name: 'Gasket scraper', category: 'tools', required: true }
      ],
      parts: [
        { id: '2', name: 'Transmission Filter Kit', partNumber: 'WIX-58940', manufacturer: 'WIX', price: 45.99, interchangeableWith: ['FRAM-FT1236', 'AC-DELCO-TF289'] },
        { id: '3', name: 'Transmission Pan Gasket', partNumber: 'FELPRO-TOS18647', manufacturer: 'Fel-Pro', price: 18.99, interchangeableWith: [] }
      ],
      steps: [
        'Raise vehicle safely on jack stands or lift',
        'Remove transmission pan bolts gradually to avoid spilling',
        'Remove old filter and O-ring',
        'Clean transmission pan and magnet thoroughly',
        'Install new filter with new O-ring',
        'Apply thin layer of gasket sealer if recommended',
        'Install new pan gasket and reinstall pan',
        'Torque pan bolts to specification (typically 10-12 ft-lbs)',
        'Lower vehicle and refill with appropriate amount of new ATF',
        'Start engine and check for leaks',
        'Road test and verify proper operation'
      ],
      warnings: [
        'Transmission pan may contain hot fluid - allow to cool',
        'Do not over-torque pan bolts as this can damage the gasket',
        'Some transmissions require specific fill procedures'
      ],
      references: [
        { id: '3', title: 'Complete Transmission Service Guide', url: 'https://example.com/service-guide', type: 'manual' }
      ]
    }
  ]

  useEffect(() => {
    loadProblemDetails()
  }, [problemId])

  const loadProblemDetails = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setProblem(mockProblem)
      setVehicle(mockVehicle)
      setSolutions(mockSolutions)
      setSelectedSolutionId(mockSolutions[0]?.id || '')
      setIsLoading(false)
    }, 1000)
  }

  const selectedSolution = solutions.find(s => s.id === selectedSolutionId)
  const totalCost = selectedSolution?.parts.reduce((sum, part) => sum + (part.price || 0), 0) || 0

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!problem) {
    return (
      <div className="py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
        <Link href="/problems">
          <Button>Back to Problems</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/problems">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Problem Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Wrench className="h-6 w-6" />
                {problem.title}
              </CardTitle>
              {vehicle && (
                <CardDescription className="mt-2 text-lg">
                  {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.engineType} {vehicle.driveType}
                </CardDescription>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <span className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                problem.commonality === 'common' ? 'bg-red-100 text-red-800' :
                problem.commonality === 'uncommon' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {problem.commonality}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {problem.difficulty} repair
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Est. time: {problem.estimatedTime}</span>
            </div>
            {totalCost > 0 && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Est. parts cost: ${totalCost.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Symptoms to Look For
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {problem.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solution Selector */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Solutions</CardTitle>
              <CardDescription>
                Choose the best repair approach for your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {solutions.map((solution, index) => (
                <button
                  key={solution.id}
                  onClick={() => setSelectedSolutionId(solution.id)}
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    selectedSolutionId === solution.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">
                    Solution {index + 1}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {solution.description}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Selected Solution Details */}
        <div className="lg:col-span-2">
          {selectedSolution && (
            <div className="space-y-6">
              {/* Solution Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Solution Details</CardTitle>
                  <CardDescription>{selectedSolution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Required Tools:</span>
                      <span className="ml-2 font-medium">{selectedSolution.tools.filter(t => t.required).length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Parts Needed:</span>
                      <span className="ml-2 font-medium">{selectedSolution.parts.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Steps:</span>
                      <span className="ml-2 font-medium">{selectedSolution.steps.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Cost:</span>
                      <span className="ml-2 font-medium text-primary">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Required Tools */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedSolution.tools.map((tool) => (
                      <div key={tool.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-sm text-muted-foreground capitalize">{tool.category}</div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          tool.required ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {tool.required ? 'Required' : 'Optional'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Required Parts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Required Parts
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add All to Cart
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedSolution.parts.map((part) => (
                      <div key={part.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{part.name}</h4>
                            {part.partNumber && (
                              <p className="text-sm text-muted-foreground">Part #: {part.partNumber}</p>
                            )}
                            {part.manufacturer && (
                              <p className="text-sm text-muted-foreground">Manufacturer: {part.manufacturer}</p>
                            )}
                            {part.interchangeableWith.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                Compatible: {part.interchangeableWith.join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            {part.price && (
                              <div className="text-lg font-bold text-primary">${part.price.toFixed(2)}</div>
                            )}
                            <Button variant="outline" size="sm" className="mt-2">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Buy Online
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Step-by-Step Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Step-by-Step Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedSolution.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <p>{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Warnings */}
              {selectedSolution.warnings.length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800">
                      <AlertTriangle className="h-5 w-5" />
                      Important Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSolution.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start gap-3 text-yellow-800">
                          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* References */}
              {selectedSolution.references.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedSolution.references.map((reference) => (
                        <div key={reference.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {reference.type === 'video' && <Play className="h-5 w-5 text-red-500" />}
                            {reference.type === 'manual' && <FileText className="h-5 w-5 text-blue-500" />}
                            <div>
                              <div className="font-medium">{reference.title}</div>
                              <div className="text-sm text-muted-foreground capitalize">{reference.type}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={reference.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}