// Commercial Truck Parts Cross-Reference Integration
// Free truck parts databases including Rush Truck Centers, Peterbilt, Kenworth, etc.

export interface TruckPart {
  partNumber: string
  oemPartNumber?: string
  brand: string
  description: string
  category: string
  subcategory: string
  application: {
    make: string[]
    models: string[]
    years: string[]
    engines?: string[]
    transmissions?: string[]
    axles?: string[]
  }
  specifications: {
    weight?: string
    dimensions?: string
    material?: string
    capacity?: string
    pressure?: string
    torqueSpec?: string
  }
  price: string
  corePrice?: string
  availability: 'in-stock' | 'limited' | 'out-of-stock' | 'special-order'
  condition: 'new' | 'used' | 'remanufactured' | 'rebuilt' | 'exchange'
  supplier: {
    name: string
    location: string
    phone?: string
    website?: string
    dealerNetwork: boolean
  }
  interchange: string[]
  notes?: string
  warrantyInfo?: string
}

export interface TruckEngine {
  manufacturer: string
  series: string
  displacement: string
  configuration: string
  power: string
  torque: string
  applications: {
    makes: string[]
    models: string[]
    years: string[]
    vocations: string[]
  }[]
  commonIssues: {
    issue: string
    mileage: string
    parts: string[]
    labor: string
  }[]
}

export class TruckPartsService {
  private readonly truckEngines: TruckEngine[] = [
    // Caterpillar Engines
    {
      manufacturer: 'Caterpillar',
      series: 'C15 ACERT',
      displacement: '15.8L',
      configuration: 'Inline 6',
      power: '435-550 HP',
      torque: '1,850 lb-ft',
      applications: [
        {
          makes: ['Peterbilt', 'Kenworth', 'Freightliner', 'International'],
          models: ['379', '389', 'W900', 'T800', 'Century', '9400i'],
          years: ['2003', '2004', '2005', '2006', '2007', '2008', '2009'],
          vocations: ['Over-the-Road', 'Regional Haul', 'Construction']
        }
      ],
      commonIssues: [
        {
          issue: 'HEUI Injector Failure',
          mileage: '400,000-600,000',
          parts: ['HEUI Injectors', 'High Pressure Oil Pump', 'ICP Sensor'],
          labor: '16-20 hours'
        }
      ]
    },
    // Cummins ISX
    {
      manufacturer: 'Cummins',
      series: 'ISX15',
      displacement: '15.0L',
      configuration: 'Inline 6',
      power: '400-600 HP',
      torque: '1,850-2,050 lb-ft',
      applications: [
        {
          makes: ['Peterbilt', 'Kenworth', 'International', 'Volvo'],
          models: ['579', '389', 'T680', 'ProStar', 'VNL'],
          years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
          vocations: ['Over-the-Road', 'Regional', 'Vocational']
        }
      ],
      commonIssues: [
        {
          issue: 'EGR System Problems',
          mileage: '300,000-500,000',
          parts: ['EGR Valve', 'EGR Cooler', 'VGT Turbo', 'DOC/DPF'],
          labor: '8-12 hours'
        }
      ]
    },
    // Detroit Diesel
    {
      manufacturer: 'Detroit Diesel',
      series: 'DD15',
      displacement: '14.8L',
      configuration: 'Inline 6',
      power: '400-505 HP',
      torque: '1,550-1,850 lb-ft',
      applications: [
        {
          makes: ['Freightliner', 'Western Star'],
          models: ['Cascadia', 'Century', '4700', '4900'],
          years: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
          vocations: ['Long Haul', 'Regional Distribution', 'Construction']
        }
      ],
      commonIssues: [
        {
          issue: 'Turbocharger Failure',
          mileage: '400,000-600,000',
          parts: ['VGT Turbocharger', 'Turbo Actuator', 'Boost Sensor'],
          labor: '6-8 hours'
        }
      ]
    }
  ]

  /**
   * Search truck parts across multiple databases
   */
  async searchTruckParts(
    make: string,
    model: string,
    year: string,
    category?: string
  ): Promise<TruckPart[]> {
    try {
      // Mock truck parts database search
      const mockParts: TruckPart[] = [
        {
          partNumber: 'RTC-12345-EXH',
          oemPartNumber: '21460145',
          brand: 'Donaldson',
          description: 'Air Filter Assembly - Primary',
          category: 'Engine',
          subcategory: 'Air Intake System',
          application: {
            make: ['Peterbilt', 'Kenworth'],
            models: ['379', '389', 'W900', 'T800'],
            years: ['2005', '2006', '2007', '2008', '2009'],
            engines: ['CAT C15', 'Cummins ISX']
          },
          specifications: {
            weight: '12 lbs',
            dimensions: '18" x 12" x 8"',
            material: 'Pleated Paper'
          },
          price: '$185.00',
          availability: 'in-stock',
          condition: 'new',
          supplier: {
            name: 'Rush Truck Centers',
            location: 'Dallas, TX',
            phone: '(214) 555-0199',
            website: 'rushtruckcenters.com',
            dealerNetwork: true
          },
          interchange: ['21460144', 'P608306', 'AF26207'],
          notes: 'OEM specification filter. 50,000 mile service life.',
          warrantyInfo: '12 months/100,000 miles'
        },
        {
          partNumber: 'BRAKE-PAD-001',
          oemPartNumber: '4515Q2',
          brand: 'Bendix',
          description: 'Brake Pad Kit - Front Axle',
          category: 'Brake System',
          subcategory: 'Brake Pads',
          application: {
            make: ['Freightliner', 'International'],
            models: ['Cascadia', 'ProStar', '9400i'],
            years: ['2010', '2011', '2012', '2013', '2014'],
            axles: ['Meritor 14X', 'Dana S110']
          },
          specifications: {
            weight: '25 lbs',
            material: 'Ceramic/Semi-Metallic'
          },
          price: '$425.00',
          corePrice: '$50.00',
          availability: 'in-stock',
          condition: 'new',
          supplier: {
            name: 'TruckPro',
            location: 'Multiple Locations',
            phone: '(800) 555-0123',
            website: 'truckpro.com',
            dealerNetwork: true
          },
          interchange: ['4515Q', 'BP-4515Q2', 'FMSI-4515'],
          notes: 'Professional installation recommended. Includes hardware kit.',
          warrantyInfo: '24 months/unlimited miles'
        },
        {
          partNumber: 'TURBO-ISX-001',
          oemPartNumber: '4955156',
          brand: 'Holset',
          description: 'Turbocharger Assembly - VGT',
          category: 'Engine',
          subcategory: 'Turbo System',
          application: {
            make: ['Peterbilt', 'Kenworth', 'International'],
            models: ['579', '389', 'T680', 'ProStar'],
            years: ['2010', '2011', '2012', '2013'],
            engines: ['Cummins ISX15']
          },
          specifications: {
            weight: '85 lbs',
            dimensions: '24" x 18" x 12"'
          },
          price: '$3,850.00',
          corePrice: '$1,200.00',
          availability: 'special-order',
          condition: 'remanufactured',
          supplier: {
            name: 'Cummins Parts & Service',
            location: 'Memphis, TN',
            phone: '(901) 555-0167',
            website: 'cumminstruckparts.com',
            dealerNetwork: true
          },
          interchange: ['4955157', '4043978', 'HX55W'],
          notes: 'Core exchange required. Professional calibration needed.',
          warrantyInfo: '24 months/200,000 miles'
        }
      ]

      // Filter by criteria
      let filteredParts = mockParts

      if (make) {
        filteredParts = filteredParts.filter(part => 
          part.application.make.some(m => m.toLowerCase().includes(make.toLowerCase()))
        )
      }

      if (model) {
        filteredParts = filteredParts.filter(part => 
          part.application.models.some(m => m.toLowerCase().includes(model.toLowerCase()))
        )
      }

      if (year) {
        filteredParts = filteredParts.filter(part => 
          part.application.years.includes(year)
        )
      }

      if (category) {
        filteredParts = filteredParts.filter(part => 
          part.category.toLowerCase().includes(category.toLowerCase())
        )
      }

      return filteredParts
    } catch (error) {
      console.error('Error searching truck parts:', error)
      return []
    }
  }

  /**
   * Search parts by engine series
   */
  async searchByEngine(engineSeries: string, category?: string): Promise<TruckPart[]> {
    try {
      const engineParts = await this.searchTruckParts('', '', '', category)
      
      return engineParts.filter(part => 
        part.application.engines?.some(engine => 
          engine.toLowerCase().includes(engineSeries.toLowerCase())
        )
      )
    } catch (error) {
      console.error('Error searching by engine:', error)
      return []
    }
  }

  /**
   * Get truck maintenance schedules
   */
  getTruckMaintenanceSchedule(
    engineSeries: string, 
    mileage: number,
    vocation: 'long-haul' | 'regional' | 'vocational' = 'long-haul'
  ): {
    interval: string
    mileage: number
    services: {
      service: string
      parts: string[]
      category: string
      laborHours: string
      criticality: 'critical' | 'important' | 'routine'
    }[]
  }[] {
    // Different schedules based on vocation
    const baseInterval = vocation === 'long-haul' ? 25000 : vocation === 'regional' ? 20000 : 15000

    const schedule = [
      {
        interval: `Every ${baseInterval} miles`,
        mileage: baseInterval,
        services: [
          {
            service: 'Engine Oil & Filter Service',
            parts: ['Engine Oil (15W-40)', 'Oil Filter', 'Drain Plug'],
            category: 'Engine',
            laborHours: '1.0',
            criticality: 'critical' as const
          },
          {
            service: 'Fuel Filter Replacement',
            parts: ['Primary Fuel Filter', 'Secondary Fuel Filter'],
            category: 'Fuel System',
            laborHours: '0.5',
            criticality: 'critical' as const
          }
        ]
      },
      {
        interval: `Every ${baseInterval * 2} miles`,
        mileage: baseInterval * 2,
        services: [
          {
            service: 'Air Filter Replacement',
            parts: ['Primary Air Filter', 'Secondary Air Filter'],
            category: 'Engine',
            laborHours: '0.5',
            criticality: 'important' as const
          },
          {
            service: 'Transmission Service',
            parts: ['Transmission Filter', 'Transmission Fluid'],
            category: 'Drivetrain',
            laborHours: '2.0',
            criticality: 'important' as const
          }
        ]
      },
      {
        interval: `Every ${baseInterval * 4} miles`,
        mileage: baseInterval * 4,
        services: [
          {
            service: 'Differential Service',
            parts: ['Differential Oil', 'Cover Gasket'],
            category: 'Drivetrain',
            laborHours: '1.5',
            criticality: 'routine' as const
          },
          {
            service: 'Coolant System Service',
            parts: ['Coolant', 'Thermostat', 'Water Pump'],
            category: 'Cooling',
            laborHours: '3.0',
            criticality: 'important' as const
          }
        ]
      }
    ]

    // Return upcoming maintenance based on current mileage
    return schedule.filter(item => {
      const nextService = Math.ceil(mileage / item.mileage) * item.mileage
      return nextService <= mileage + (baseInterval * 0.1) // Within 10% of interval
    })
  }

  /**
   * Cross-reference truck part numbers
   */
  async crossReferenceTruckPart(partNumber: string): Promise<{
    originalPart: TruckPart | null
    oem: TruckPart[]
    aftermarket: TruckPart[]
    remanufactured: TruckPart[]
    compatibleTrucks: string[]
  }> {
    try {
      const allParts = await this.searchTruckParts('', '', '')
      const originalPart = allParts.find(part => 
        part.partNumber === partNumber || 
        part.oemPartNumber === partNumber ||
        part.interchange.includes(partNumber)
      )

      // Mock cross-reference results
      const oem = [
        {
          ...originalPart,
          brand: 'OEM',
          condition: 'new',
          price: '$450.00'
        } as TruckPart
      ].filter(Boolean)

      const aftermarket = [
        {
          ...originalPart,
          brand: 'Fleet Pride',
          condition: 'new',
          price: '$385.00',
          warrantyInfo: '12 months'
        } as TruckPart
      ].filter(Boolean)

      const remanufactured = [
        {
          ...originalPart,
          brand: 'Reman Source',
          condition: 'remanufactured',
          price: '$295.00',
          corePrice: '$50.00',
          warrantyInfo: '12 months/100,000 miles'
        } as TruckPart
      ].filter(Boolean)

      const compatibleTrucks = originalPart ? 
        originalPart.application.make.flatMap(make => 
          originalPart.application.models.map(model => `${make} ${model}`)
        ) : []

      return {
        originalPart: originalPart || null,
        oem,
        aftermarket,
        remanufactured,
        compatibleTrucks
      }
    } catch (error) {
      console.error('Error cross-referencing truck part:', error)
      return {
        originalPart: null,
        oem: [],
        aftermarket: [],
        remanufactured: [],
        compatibleTrucks: []
      }
    }
  }

  /**
   * Get supported truck engines
   */
  getSupportedEngines(): TruckEngine[] {
    return [...this.truckEngines]
  }

  /**
   * Get truck engine specifications
   */
  getTruckEngineSpecs(engineSeries: string): TruckEngine | null {
    return this.truckEngines.find(engine => 
      engine.series.toLowerCase().includes(engineSeries.toLowerCase())
    ) || null
  }

  /**
   * Search parts by truck make/model categories
   */
  async searchByTruckCategory(
    make: 'Peterbilt' | 'Kenworth' | 'Freightliner' | 'International' | 'Volvo' | 'Mack',
    category: string
  ): Promise<TruckPart[]> {
    try {
      const parts = await this.searchTruckParts(make, '', '', category)
      return parts
    } catch (error) {
      console.error('Error searching by truck category:', error)
      return []
    }
  }

  /**
   * Get common failure parts by mileage
   */
  getCommonFailuresByMileage(mileage: number, engineSeries?: string): {
    mileageRange: string
    commonFailures: {
      component: string
      description: string
      averageCost: string
      preventativeMaintenance: string[]
      warningSigna: string[]
    }[]
  }[] {
    // Mock common failure data based on mileage
    const failureData = [
      {
        mileageRange: '300,000-500,000',
        commonFailures: [
          {
            component: 'Turbocharger',
            description: 'VGT actuator failure, bearing wear',
            averageCost: '$3,500-$5,000',
            preventativeMaintenance: [
              'Regular oil changes',
              'Clean air filter',
              'Check boost pressure'
            ],
            warningSigna: [
              'Blue smoke',
              'Loss of power',
              'High exhaust temperature'
            ]
          },
          {
            component: 'EGR System',
            description: 'EGR valve sticking, cooler plugging',
            averageCost: '$2,000-$3,500',
            preventativeMaintenance: [
              'Use quality fuel',
              'Regular regenerations',
              'Clean EGR passages'
            ],
            warningSigna: [
              'Rough idle',
              'Check engine light',
              'Poor fuel economy'
            ]
          }
        ]
      },
      {
        mileageRange: '500,000-800,000',
        commonFailures: [
          {
            component: 'Injectors',
            description: 'Fuel injector wear, poor spray pattern',
            averageCost: '$4,000-$8,000',
            preventativeMaintenance: [
              'Quality fuel filters',
              'Fuel additive use',
              'Regular fuel system service'
            ],
            warningSigna: [
              'Hard starting',
              'Black smoke',
              'Fuel knock'
            ]
          }
        ]
      }
    ]

    return failureData.filter(item => {
      const [min, max] = item.mileageRange.split('-').map(m => parseInt(m.replace(/,/g, '')))
      return mileage >= min && mileage <= max
    })
  }
}

// Singleton instance
export const truckPartsService = new TruckPartsService()