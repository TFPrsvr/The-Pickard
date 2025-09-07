'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Wrench, 
  Star,
  ExternalLink,
  Phone,
  MapPin,
  Fuel,
  Gauge,
  Calendar,
  Shield
} from 'lucide-react'
import { nhtsaService } from '@/lib/nhtsa-api'
import { freeAutomotiveService } from '@/lib/free-automotive-apis'
import PropTypes from 'prop-types'

interface VehicleInfoDashboardProps {
  year: string
  make: string
  model: string
}

export function VehicleInfoDashboard({ year, make, model }: VehicleInfoDashboardProps) {
  const [vehicleData, setVehicleData] = useState<any>(null)
  const [commonProblems, setCommonProblems] = useState<any[]>([])
  const [parts, setParts] = useState<any[]>([])
  const [specs, setSpecs] = useState<any>(null)
  const [maintenance, setMaintenance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVehicleData()
  }, [year, make, model])

  const loadVehicleData = async () => {
    setLoading(true)
    try {
      // Load all data in parallel
      const [nhtsaData, problems, partsData, specsData, maintenanceData] = await Promise.allSettled([
        nhtsaService.getVehicleData(year, make, model),
        freeAutomotiveService.getCommonProblems(year, make, model),
        freeAutomotiveService.searchParts(year, make, model, 'engine'),
        freeAutomotiveService.getVehicleSpecs(year, make, model),
        freeAutomotiveService.getMaintenanceSchedule(year, make, model)
      ])

      setVehicleData(nhtsaData.status === 'fulfilled' ? nhtsaData.value : null)
      setCommonProblems(problems.status === 'fulfilled' ? problems.value : [])
      setParts(partsData.status === 'fulfilled' ? partsData.value : [])
      setSpecs(specsData.status === 'fulfilled' ? specsData.value : null)
      setMaintenance(maintenanceData.status === 'fulfilled' ? maintenanceData.value : [])
    } catch (error) {
      console.error('Error loading vehicle data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="automotive-card p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading vehicle information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Header */}
      <div className="automotive-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary">{year} {make} {model}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              {vehicleData?.summary && (
                <>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Safety: {vehicleData.summary.overallSafetyRating}
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {vehicleData.summary.totalRecalls} Recalls
                  </div>
                </>
              )}
              {specs && (
                <div className="flex items-center gap-1">
                  <Fuel className="h-4 w-4" />
                  {specs.mpg?.combined} MPG
                </div>
              )}
            </div>
          </div>
          <Button className="automotive-button">
            Get Estimate
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recalls">Recalls</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="parts">Parts</TabsTrigger>
          <TabsTrigger value="specs">Specs</TabsTrigger>
          <TabsTrigger value="maintenance">Service</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Safety Score */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Safety Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {vehicleData?.summary?.overallSafetyRating || 'N/A'}
                </div>
                <p className="text-sm text-muted-foreground">NHTSA Overall Rating</p>
              </CardContent>
            </Card>

            {/* Recalls */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Active Recalls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {vehicleData?.summary?.totalRecalls || 0}
                </div>
                <p className="text-sm text-muted-foreground">Open safety recalls</p>
              </CardContent>
            </Card>

            {/* Common Issues */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  Known Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {commonProblems.length}
                </div>
                <p className="text-sm text-muted-foreground">Reported problems</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Problems */}
          <Card>
            <CardHeader>
              <CardTitle>Most Common Problems</CardTitle>
              <CardDescription>Issues frequently reported for this vehicle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {commonProblems.slice(0, 3).map((problem, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{problem.problem}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {problem.symptoms.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getSeverityColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{problem.estimatedCost}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recalls" className="space-y-4">
          {vehicleData?.recalls && vehicleData.recalls.length > 0 ? (
            vehicleData.recalls.map((recall: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{recall.Component}</CardTitle>
                      <CardDescription>Recall #{recall.RecallNumber}</CardDescription>
                    </div>
                    <Badge variant="destructive">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Summary</h4>
                    <p className="text-sm">{recall.Summary}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Consequence</h4>
                    <p className="text-sm text-orange-600">{recall.Consequence}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Remedy</h4>
                    <p className="text-sm text-green-600">{recall.Remedy}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Recall Date: {new Date(recall.RecallDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Active Recalls</h3>
                <p className="text-muted-foreground">Great news! No recalls found for this vehicle.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="problems" className="space-y-4">
          {commonProblems.map((problem, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{problem.problem}</CardTitle>
                    <CardDescription>
                      {problem.difficulty} • {problem.timeRequired} • {problem.estimatedCost}
                    </CardDescription>
                  </div>
                  <Badge className={getSeverityColor(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Symptoms</h4>
                  <ul className="text-sm space-y-1">
                    {problem.symptoms.map((symptom: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Possible Causes</h4>
                  <ul className="text-sm space-y-1">
                    {problem.possibleCauses.map((cause: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {problem.timeRequired}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {problem.estimatedCost}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Get Repair Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="parts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parts.map((part, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{part.partName}</CardTitle>
                      <CardDescription>Part #{part.partNumber}</CardDescription>
                    </div>
                    <Badge variant={part.condition === 'new' ? 'default' : 'secondary'}>
                      {part.condition}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{part.price}</span>
                    <Badge variant="outline">{part.availability}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {part.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {part.seller}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h5 className="font-medium mb-1">Compatible with:</h5>
                    <div className="flex flex-wrap gap-1">
                      {part.compatibility.map((vehicle: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {vehicle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Contact Seller
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="space-y-4">
          {specs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engine & Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Engine:</span>
                      <div className="font-medium">{specs.engine}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transmission:</span>
                      <div className="font-medium">{specs.transmission}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Drivetrain:</span>
                      <div className="font-medium">{specs.drivetrain}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fuel Type:</span>
                      <div className="font-medium">{specs.fuelType}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fuel Economy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {specs.mpg && (
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{specs.mpg.city}</div>
                        <div className="text-sm text-muted-foreground">City MPG</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{specs.mpg.highway}</div>
                        <div className="text-sm text-muted-foreground">Highway MPG</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{specs.mpg.combined}</div>
                        <div className="text-sm text-muted-foreground">Combined MPG</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {specs.dimensions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Length:</span>
                        <div className="font-medium">{specs.dimensions.length}&rdquo;</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Width:</span>
                        <div className="font-medium">{specs.dimensions.width}&rdquo;</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Height:</span>
                        <div className="font-medium">{specs.dimensions.height}&rdquo;</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Wheelbase:</span>
                        <div className="font-medium">{specs.dimensions.wheelbase}&rdquo;</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Weight & Capacity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Curb Weight:</span>
                    <span className="font-medium">{specs.weight?.toLocaleString()} lbs</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          {maintenance.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {service.mileage.toLocaleString()} Miles Service
                    </CardTitle>
                    <CardDescription>Recommended maintenance interval</CardDescription>
                  </div>
                  <Badge variant="outline">{service.estimatedCost}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Services Required:</h4>
                  <ul className="space-y-1">
                    {service.services.map((serviceItem: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {serviceItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

VehicleInfoDashboard.propTypes = {
  year: PropTypes.string.isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
}