'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, MapPin, Phone, Clock, DollarSign } from 'lucide-react'
import PropTypes from 'prop-types'

interface ExternalPartsSearchProps {
  searchQuery: string
  vehicleInfo: {
    year?: number
    make?: string
    model?: string
    submodel?: string
    engine?: string
  }
}

interface ExternalSource {
  id: string
  name: string
  type: 'auto_parts_store' | 'salvage_yard' | 'online_retailer' | 'dealer'
  website?: string
  phone?: string
  address?: string
  hours?: string
  priceRange: 'low' | 'medium' | 'high'
  availability: 'in_stock' | 'order_only' | 'call_for_availability'
  distance?: string
}

export function ExternalPartsSearch({ searchQuery, vehicleInfo }: ExternalPartsSearchProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [sources] = useState<ExternalSource[]>([
    // Auto Parts Stores
    {
      id: '1',
      name: 'AutoZone',
      type: 'auto_parts_store',
      website: 'https://www.autozone.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Your City',
      hours: 'Mon-Sun 7AM-10PM',
      priceRange: 'medium',
      availability: 'in_stock',
      distance: '0.8 miles'
    },
    {
      id: '2',
      name: "O'Reilly Auto Parts",
      type: 'auto_parts_store',
      website: 'https://www.oreillyauto.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Your City',
      hours: 'Mon-Sun 7AM-9PM',
      priceRange: 'medium',
      availability: 'in_stock',
      distance: '1.2 miles'
    },
    {
      id: '3',
      name: 'Advance Auto Parts',
      type: 'auto_parts_store',
      website: 'https://www.advanceautoparts.com',
      phone: '(555) 345-6789',
      address: '789 Pine St, Your City',
      hours: 'Mon-Sun 7AM-10PM',
      priceRange: 'medium',
      availability: 'order_only',
      distance: '1.5 miles'
    },
    // Salvage Yards
    {
      id: '4',
      name: 'Pick-A-Part Auto Salvage',
      type: 'salvage_yard',
      website: 'https://www.pickapart.com',
      phone: '(555) 456-7890',
      address: '321 Industrial Blvd, Your City',
      hours: 'Mon-Sat 8AM-5PM, Sun Closed',
      priceRange: 'low',
      availability: 'call_for_availability',
      distance: '3.2 miles'
    },
    {
      id: '5',
      name: 'U-Pull-It Salvage Yard',
      type: 'salvage_yard',
      phone: '(555) 567-8901',
      address: '654 Salvage Rd, Your City',
      hours: 'Mon-Sat 8AM-4PM, Sun Closed',
      priceRange: 'low',
      availability: 'call_for_availability',
      distance: '4.1 miles'
    },
    // Online Retailers
    {
      id: '6',
      name: 'RockAuto',
      type: 'online_retailer',
      website: 'https://www.rockauto.com',
      priceRange: 'low',
      availability: 'order_only',
    },
    {
      id: '7',
      name: '1A Auto',
      type: 'online_retailer',
      website: 'https://www.1aauto.com',
      phone: '(888) 844-3393',
      priceRange: 'medium',
      availability: 'order_only',
    },
    // Dealer
    {
      id: '8',
      name: `${vehicleInfo.make || 'Vehicle'} Dealership`,
      type: 'dealer',
      phone: '(555) 678-9012',
      address: '999 Dealer Way, Your City',
      hours: 'Mon-Fri 7AM-7PM, Sat 8AM-5PM',
      priceRange: 'high',
      availability: 'order_only',
      distance: '2.3 miles'
    }
  ])

  const getTypeIcon = (type: ExternalSource['type']) => {
    switch (type) {
      case 'auto_parts_store':
        return '🏪'
      case 'salvage_yard':
        return '🚗'
      case 'online_retailer':
        return '🌐'
      case 'dealer':
        return '🏢'
      default:
        return '📍'
    }
  }

  const getTypeName = (type: ExternalSource['type']) => {
    switch (type) {
      case 'auto_parts_store':
        return 'Auto Parts Store'
      case 'salvage_yard':
        return 'Salvage Yard'
      case 'online_retailer':
        return 'Online Retailer'
      case 'dealer':
        return 'Dealership'
      default:
        return 'Store'
    }
  }

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in_stock':
        return 'bg-green-100 text-green-800'
      case 'order_only':
        return 'bg-blue-100 text-blue-800'
      case 'call_for_availability':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const buildSearchUrl = (source: ExternalSource) => {
    const { year, make, model } = vehicleInfo
    const vehicleQuery = `${year || ''} ${make || ''} ${model || ''}`.trim()
    const fullQuery = `${vehicleQuery} ${searchQuery}`.trim()
    
    if (source.website) {
      // These would be the actual search URLs for each retailer
      switch (source.name) {
        case 'AutoZone':
          return `${source.website}/searchresult?searchText=${encodeURIComponent(fullQuery)}`
        case "O'Reilly Auto Parts":
          return `${source.website}/search?text=${encodeURIComponent(fullQuery)}`
        case 'Advance Auto Parts':
          return `${source.website}/search-results?searchTerm=${encodeURIComponent(fullQuery)}`
        case 'RockAuto':
          return `${source.website}/catalog/x,carcode,1,parttype,${encodeURIComponent(searchQuery)}`
        case '1A Auto':
          return `${source.website}/search?keywords=${encodeURIComponent(fullQuery)}`
        default:
          return source.website
      }
    }
    return '#'
  }

  if (!searchQuery || !vehicleInfo.year || !vehicleInfo.make || !vehicleInfo.model) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Find Parts at Local & Online Stores
        </CardTitle>
        <CardDescription>
          Search for &ldquo;{searchQuery}&rdquo; for your {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source) => (
            <Card key={source.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(source.type)}</span>
                      <div>
                        <h3 className="font-semibold">{source.name}</h3>
                        <p className="text-sm text-muted-foreground">{getTypeName(source.type)}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getPriceColor(source.priceRange)}>
                        {source.priceRange} price
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge className={getAvailabilityColor(source.availability)}>
                      {source.availability.replace('_', ' ')}
                    </Badge>
                  </div>

                  {source.address && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{source.address}</span>
                      {source.distance && (
                        <span className="font-medium">({source.distance})</span>
                      )}
                    </div>
                  )}

                  {source.hours && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{source.hours}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {source.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(buildSearchUrl(source), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Search Parts
                      </Button>
                    )}
                    {source.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(`tel:${source.phone}`, '_self')}
                      >
                        <Phone className="h-3 w-3 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Call salvage yards first - they may have the part you need at a great price</li>
            <li>• Compare prices across stores - some may price match competitors</li>
            <li>• Check return policies, especially for electrical parts</li>
            <li>• Bring your VIN number when calling or visiting stores</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

ExternalPartsSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  vehicleInfo: PropTypes.shape({
    year: PropTypes.number,
    make: PropTypes.string,
    model: PropTypes.string,
    submodel: PropTypes.string,
    engine: PropTypes.string,
  }).isRequired,
}