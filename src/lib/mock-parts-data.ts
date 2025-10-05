/**
 * Mock parts search data for demonstration purposes
 * This data is separated from the main component to reduce bundle size
 */

export interface QuickSearchResult {
  type: 'automotive' | 'diesel' | 'truck' | 'bmw' | 'gm'
  partNumber: string
  description: string
  price: string
  availability: string
  supplier: string
}

export function generateMockSearchResults(query: string, vehicleMake?: string, vehicleModel?: string): QuickSearchResult[] {
  const queryLower = query.toLowerCase()
  let mockResults: QuickSearchResult[] = []

  // Oil filter results
  if (queryLower.includes('filter') || queryLower.includes('oil') || queryLower.includes('15208')) {
    mockResults = [
      {
        type: 'automotive',
        partNumber: query.toUpperCase(),
        description: 'Oil Filter - Standard',
        price: '$12.99',
        availability: 'In Stock',
        supplier: 'AutoZone'
      },
      {
        type: 'gm',
        partNumber: 'ACDelco-PF46',
        description: 'Oil Filter (ACDelco OEM)',
        price: '$18.99',
        availability: 'In Stock',
        supplier: 'GM Parts Direct'
      },
      {
        type: 'bmw',
        partNumber: '11427508969',
        description: 'BMW Oil Filter Kit',
        price: '$24.99',
        availability: 'In Stock',
        supplier: 'BMW Genuine Parts'
      }
    ]
  }
  // Brake pad results
  else if (queryLower.includes('brake') || queryLower.includes('pad') || queryLower.includes('rotor')) {
    mockResults = [
      {
        type: 'automotive',
        partNumber: query.toUpperCase(),
        description: 'Brake Pad Set - Front',
        price: '$59.99',
        availability: 'In Stock',
        supplier: 'AutoZone'
      },
      {
        type: 'automotive',
        partNumber: 'AC-' + query,
        description: 'Premium Ceramic Brake Pads',
        price: '$89.99',
        availability: 'In Stock',
        supplier: 'Advance Auto Parts'
      },
      {
        type: 'gm',
        partNumber: 'ACDelco-17D1367CH',
        description: 'GM OEM Brake Pad Set',
        price: '$125.99',
        availability: 'Special Order',
        supplier: 'GM Parts'
      }
    ]
  }
  // Spark plug results
  else if (queryLower.includes('spark') || queryLower.includes('plug') || queryLower.includes('ignition')) {
    mockResults = [
      {
        type: 'automotive',
        partNumber: query.toUpperCase(),
        description: 'Spark Plug Set (4-Pack)',
        price: '$32.99',
        availability: 'In Stock',
        supplier: 'O\'Reilly Auto Parts'
      },
      {
        type: 'gm',
        partNumber: 'ACDelco-41-110',
        description: 'GM OEM Spark Plugs',
        price: '$45.99',
        availability: 'In Stock',
        supplier: 'GM Parts Direct'
      }
    ]
  }
  // Engine mount results
  else if (queryLower.includes('engine') || queryLower.includes('mount')) {
    mockResults = [
      {
        type: 'automotive',
        partNumber: query.toUpperCase(),
        description: 'Engine Mount - Front',
        price: '$89.99',
        availability: 'In Stock',
        supplier: 'AutoZone'
      },
      {
        type: 'gm',
        partNumber: 'GM-' + query,
        description: 'Engine Mount Assembly (GM OEM)',
        price: '$145.99',
        availability: 'Special Order',
        supplier: 'GM Parts'
      }
    ]
  }
  // Default generic results
  else {
    mockResults = [
      {
        type: 'automotive',
        partNumber: query.toUpperCase(),
        description: 'Automotive Part',
        price: '$45.99',
        availability: 'In Stock',
        supplier: 'AutoZone'
      },
      {
        type: 'truck',
        partNumber: 'TRK-' + query,
        description: 'Heavy Duty Truck Part',
        price: '$189.99',
        availability: 'In Stock',
        supplier: 'TruckPro'
      }
    ]
  }

  // Add vehicle-specific result if vehicle information is provided
  if (vehicleMake && vehicleModel) {
    const vehicleSpecificPart: QuickSearchResult = {
      type: vehicleMake.toLowerCase().includes('bmw') ? 'bmw' :
            vehicleMake.toLowerCase().includes('gm') ||
            vehicleMake.toLowerCase().includes('chevrolet') ? 'gm' : 'automotive',
      partNumber: `${vehicleMake.substring(0, 3).toUpperCase()}-${query}`,
      description: `${vehicleMake} ${vehicleModel} Specific Part`,
      price: '$95.99',
      availability: 'In Stock',
      supplier: `${vehicleMake} Dealer Parts`
    }
    mockResults.unshift(vehicleSpecificPart)
  }

  return mockResults
}
