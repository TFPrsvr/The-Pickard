// Year/Model Interchange Functionality
// Cross-reference parts across different model years and vehicle platforms

export interface InterchangeGroup {
  groupId: string
  groupName: string
  description: string
  platform: string
  manufacturer: string
  vehicles: {
    year: string
    make: string
    model: string
    trim?: string
    engine?: string
    notes?: string
  }[]
  interchangeableParts: {
    category: string
    parts: {
      partName: string
      oemPartNumbers: string[]
      notes?: string
      exceptions?: string[]
    }[]
  }[]
}

export interface YearModelSearch {
  searchYear: string
  searchMake: string
  searchModel: string
  compatibleYears: {
    year: string
    compatibility: 'direct' | 'partial' | 'modified'
    notes?: string
    exceptions?: string[]
  }[]
  platformInfo?: {
    platform: string
    generation: string
    years: string[]
    sharedComponents: string[]
  }
}

export class YearModelInterchangeService {
  private readonly interchangeGroups: InterchangeGroup[] = [
    // Honda Civic Platform
    {
      groupId: 'honda-civic-8th-gen',
      groupName: 'Honda Civic 8th Generation',
      description: 'Honda Civic Si, EX, LX platform sharing',
      platform: 'FD/FA/FG',
      manufacturer: 'Honda',
      vehicles: [
        { year: '2006', make: 'Honda', model: 'Civic', trim: 'Si', engine: '2.0L K20Z3' },
        { year: '2007', make: 'Honda', model: 'Civic', trim: 'Si', engine: '2.0L K20Z3' },
        { year: '2008', make: 'Honda', model: 'Civic', trim: 'Si', engine: '2.0L K20Z3' },
        { year: '2009', make: 'Honda', model: 'Civic', trim: 'Si', engine: '2.0L K20Z3' },
        { year: '2010', make: 'Honda', model: 'Civic', trim: 'Si', engine: '2.0L K20Z3' },
        { year: '2011', make: 'Honda', model: 'Civic', trim: 'Si', engine: '2.0L K20Z3' }
      ],
      interchangeableParts: [
        {
          category: 'Engine',
          parts: [
            {
              partName: 'Engine Mount - Front',
              oemPartNumbers: ['50820-SVA-A05', '50820-SVA-A06'],
              notes: '2006-2011 all trims compatible'
            },
            {
              partName: 'Intake Manifold',
              oemPartNumbers: ['17100-RRC-A00'],
              exceptions: ['Si model has different intake manifold']
            }
          ]
        },
        {
          category: 'Suspension',
          parts: [
            {
              partName: 'Front Struts',
              oemPartNumbers: ['51605-SVA-A02', '51606-SVA-A02'],
              exceptions: ['Si model has stiffer spring rates']
            }
          ]
        }
      ]
    },
    // BMW 3 Series E90/E91/E92/E93
    {
      groupId: 'bmw-3-series-e90',
      groupName: 'BMW 3 Series E90 Generation',
      description: 'BMW E90 Sedan, E91 Wagon, E92 Coupe, E93 Convertible',
      platform: 'E90/E91/E92/E93',
      manufacturer: 'BMW',
      vehicles: [
        { year: '2006', make: 'BMW', model: '325i', engine: 'N52 3.0L' },
        { year: '2007', make: 'BMW', model: '328i', engine: 'N52 3.0L' },
        { year: '2008', make: 'BMW', model: '335i', engine: 'N54 3.0L Twin Turbo' },
        { year: '2009', make: 'BMW', model: '335i', engine: 'N54 3.0L Twin Turbo' },
        { year: '2010', make: 'BMW', model: '335i', engine: 'N54 3.0L Twin Turbo' }
      ],
      interchangeableParts: [
        {
          category: 'Engine',
          parts: [
            {
              partName: 'Oil Filter Housing',
              oemPartNumbers: ['11427566327', '11427508969'],
              notes: 'All N52/N54 engines 2006-2010',
              exceptions: ['N54 has additional oil cooler lines']
            }
          ]
        },
        {
          category: 'Cooling',
          parts: [
            {
              partName: 'Water Pump',
              oemPartNumbers: ['11517586925'],
              notes: 'N52 engines only',
              exceptions: ['N54 turbo engines have different pump']
            }
          ]
        }
      ]
    },
    // GM Truck Platform
    {
      groupId: 'gm-truck-k2xx',
      groupName: 'GM K2XX Truck Platform',
      description: 'Chevrolet Silverado, GMC Sierra platform sharing',
      platform: 'K2XX',
      manufacturer: 'General Motors',
      vehicles: [
        { year: '2014', make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
        { year: '2015', make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
        { year: '2014', make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
        { year: '2015', make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' },
        { year: '2016', make: 'Chevrolet', model: 'Silverado 1500', engine: '5.3L V8' },
        { year: '2016', make: 'GMC', model: 'Sierra 1500', engine: '5.3L V8' }
      ],
      interchangeableParts: [
        {
          category: 'Engine',
          parts: [
            {
              partName: 'Engine Mount',
              oemPartNumbers: ['12345-ABC-001', '12345-ABC-002'],
              notes: 'Identical across Silverado/Sierra platform'
            }
          ]
        },
        {
          category: 'Transmission',
          parts: [
            {
              partName: 'Transmission Mount',
              oemPartNumbers: ['23456-DEF-001'],
              notes: 'Same part number for both brands'
            }
          ]
        }
      ]
    },
    // Ford F-150 Platform
    {
      groupId: 'ford-f150-p552',
      groupName: 'Ford F-150 P552 Platform',
      description: 'Ford F-150 13th generation platform',
      platform: 'P552',
      manufacturer: 'Ford',
      vehicles: [
        { year: '2015', make: 'Ford', model: 'F-150', engine: '3.5L EcoBoost' },
        { year: '2016', make: 'Ford', model: 'F-150', engine: '3.5L EcoBoost' },
        { year: '2017', make: 'Ford', model: 'F-150', engine: '3.5L EcoBoost' },
        { year: '2018', make: 'Ford', model: 'F-150', engine: '3.5L EcoBoost' },
        { year: '2019', make: 'Ford', model: 'F-150', engine: '3.5L EcoBoost' },
        { year: '2020', make: 'Ford', model: 'F-150', engine: '3.5L EcoBoost' }
      ],
      interchangeableParts: [
        {
          category: 'Engine',
          parts: [
            {
              partName: 'Turbocharger - Left',
              oemPartNumbers: ['GJ5E-9G438-AC', 'GJ5E-9G438-AD'],
              notes: '3.5L EcoBoost engines',
              exceptions: ['2017+ have updated wastegate actuator']
            }
          ]
        }
      ]
    }
  ]

  /**
   * Search for compatible years/models for a specific vehicle
   */
  findCompatibleYearsModels(year: string, make: string, model: string): YearModelSearch {
    // Find the interchange group for this vehicle
    const matchingGroup = this.interchangeGroups.find(group => 
      group.vehicles.some(vehicle => 
        vehicle.year === year && 
        vehicle.make.toLowerCase() === make.toLowerCase() && 
        vehicle.model.toLowerCase().includes(model.toLowerCase())
      )
    )

    if (!matchingGroup) {
      return {
        searchYear: year,
        searchMake: make,
        searchModel: model,
        compatibleYears: []
      }
    }

    // Generate compatibility list
    const compatibleYears = matchingGroup.vehicles
      .filter(vehicle => !(vehicle.year === year && vehicle.make === make && vehicle.model === model))
      .map(vehicle => ({
        year: vehicle.year,
        compatibility: this.determineCompatibility(year, vehicle.year, matchingGroup),
        notes: vehicle.notes
      }))

    return {
      searchYear: year,
      searchMake: make,
      searchModel: model,
      compatibleYears,
      platformInfo: {
        platform: matchingGroup.platform,
        generation: matchingGroup.groupName,
        years: [...new Set(matchingGroup.vehicles.map(v => v.year))].sort(),
        sharedComponents: matchingGroup.interchangeableParts
          .flatMap(category => category.parts.map(part => part.partName))
      }
    }
  }

  /**
   * Find parts that interchange between specific years/models
   */
  findInterchangeableParts(
    sourceYear: string, 
    sourceMake: string, 
    sourceModel: string,
    targetYear: string,
    targetMake: string,
    targetModel: string
  ): {
    directInterchange: {
      category: string
      partName: string
      oemPartNumbers: string[]
      confidence: 'high' | 'medium' | 'low'
      notes?: string
    }[]
    requiresModification: {
      category: string
      partName: string
      oemPartNumbers: string[]
      modifications: string[]
      notes?: string
    }[]
    notCompatible: {
      category: string
      partName: string
      reason: string
    }[]
  } {
    const sourceGroup = this.findVehicleGroup(sourceYear, sourceMake, sourceModel)
    const targetGroup = this.findVehicleGroup(targetYear, targetMake, targetModel)

    if (!sourceGroup || !targetGroup || sourceGroup.groupId !== targetGroup.groupId) {
      return {
        directInterchange: [],
        requiresModification: [],
        notCompatible: []
      }
    }

    const directInterchange: any[] = []
    const requiresModification: any[] = []
    const notCompatible: any[] = []

    // Analyze each part category
    sourceGroup.interchangeableParts.forEach(category => {
      category.parts.forEach(part => {
        const hasExceptions = part.exceptions && part.exceptions.length > 0
        const yearDiff = Math.abs(parseInt(targetYear) - parseInt(sourceYear))

        if (!hasExceptions && yearDiff <= 2) {
          directInterchange.push({
            category: category.category,
            partName: part.partName,
            oemPartNumbers: part.oemPartNumbers,
            confidence: 'high' as const,
            notes: part.notes
          })
        } else if (hasExceptions && yearDiff <= 3) {
          requiresModification.push({
            category: category.category,
            partName: part.partName,
            oemPartNumbers: part.oemPartNumbers,
            modifications: part.exceptions || [],
            notes: part.notes
          })
        } else {
          notCompatible.push({
            category: category.category,
            partName: part.partName,
            reason: 'Year range or platform differences'
          })
        }
      })
    })

    return {
      directInterchange,
      requiresModification,
      notCompatible
    }
  }

  /**
   * Get platform information for a vehicle
   */
  getPlatformInfo(year: string, make: string, model: string): {
    platform?: string
    generation?: string
    years?: string[]
    relatedVehicles?: string[]
    platformMates?: {
      make: string
      model: string
      years: string[]
    }[]
  } {
    const group = this.findVehicleGroup(year, make, model)
    
    if (!group) {
      return {}
    }

    const platformMates = group.vehicles
      .filter(v => !(v.make === make && v.model.toLowerCase().includes(model.toLowerCase())))
      .reduce((acc: any[], vehicle) => {
        const existing = acc.find(mate => mate.make === vehicle.make && mate.model === vehicle.model)
        if (existing) {
          existing.years.push(vehicle.year)
        } else {
          acc.push({
            make: vehicle.make,
            model: vehicle.model,
            years: [vehicle.year]
          })
        }
        return acc
      }, [])

    return {
      platform: group.platform,
      generation: group.groupName,
      years: [...new Set(group.vehicles.map(v => v.year))].sort(),
      relatedVehicles: group.vehicles.map(v => `${v.year} ${v.make} ${v.model}`),
      platformMates
    }
  }

  /**
   * Search by part number to find all compatible vehicles
   */
  findVehiclesByPartNumber(partNumber: string): {
    partInfo: {
      partName: string
      category: string
      oemPartNumbers: string[]
    }
    compatibleVehicles: {
      year: string
      make: string
      model: string
      platform: string
      confidence: 'high' | 'medium' | 'low'
      notes?: string
    }[]
  }[] {
    const results: any[] = []

    this.interchangeGroups.forEach(group => {
      group.interchangeableParts.forEach(category => {
        category.parts.forEach(part => {
          if (part.oemPartNumbers.includes(partNumber)) {
            results.push({
              partInfo: {
                partName: part.partName,
                category: category.category,
                oemPartNumbers: part.oemPartNumbers
              },
              compatibleVehicles: group.vehicles.map(vehicle => ({
                year: vehicle.year,
                make: vehicle.make,
                model: vehicle.model,
                platform: group.platform,
                confidence: part.exceptions ? 'medium' as const : 'high' as const,
                notes: vehicle.notes
              }))
            })
          }
        })
      })
    })

    return results
  }

  /**
   * Get all supported platforms
   */
  getSupportedPlatforms(): {
    platform: string
    manufacturer: string
    description: string
    years: string[]
    vehicles: string[]
  }[] {
    return this.interchangeGroups.map(group => ({
      platform: group.platform,
      manufacturer: group.manufacturer,
      description: group.description,
      years: [...new Set(group.vehicles.map(v => v.year))].sort(),
      vehicles: [...new Set(group.vehicles.map(v => `${v.make} ${v.model}`))].sort()
    }))
  }

  private findVehicleGroup(year: string, make: string, model: string): InterchangeGroup | null {
    return this.interchangeGroups.find(group => 
      group.vehicles.some(vehicle => 
        vehicle.year === year && 
        vehicle.make.toLowerCase() === make.toLowerCase() && 
        vehicle.model.toLowerCase().includes(model.toLowerCase())
      )
    ) || null
  }

  private determineCompatibility(sourceYear: string, targetYear: string, group: InterchangeGroup): 'direct' | 'partial' | 'modified' {
    const yearDiff = Math.abs(parseInt(targetYear) - parseInt(sourceYear))
    
    if (yearDiff === 0) return 'direct'
    if (yearDiff <= 2) return 'direct'
    if (yearDiff <= 4) return 'partial'
    return 'modified'
  }
}

// Singleton instance
export const yearModelInterchangeService = new YearModelInterchangeService()