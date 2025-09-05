// BMW Parts Cross-Reference Integration
// Free BMW parts databases and cross-reference tools

export interface BMWPart {
  partNumber: string
  oemPartNumber?: string
  etk: string // ETK (Electronic Parts Catalog) number
  brand: string
  description: string
  category: string
  subcategory: string
  application: {
    series: string[]
    models: string[]
    years: string[]
    engines?: string[]
    bodyTypes?: string[]
    options?: string[]
  }
  specifications: {
    weight?: string
    dimensions?: string
    material?: string
    color?: string
    notes?: string
  }
  price: string
  availability: 'in-stock' | 'limited' | 'out-of-stock' | 'discontinued' | 'special-order'
  condition: 'new' | 'used' | 'remanufactured' | 'genuine-bmw' | 'oem-equivalent'
  supplier: {
    name: string
    location: string
    phone?: string
    website?: string
    bmwDealer: boolean
  }
  supersededBy?: string
  supersedes?: string[]
  crossReferences: string[]
  notes?: string
  installation?: {
    difficulty: 'easy' | 'moderate' | 'difficult' | 'professional'
    timeEstimate: string
    specialTools: string[]
  }
}

export interface BMWVehicle {
  vin?: string
  series: string
  model: string
  year: string
  engine: string
  transmission: string
  bodyType: string
  productionDate: string
  options: string[]
  paint: {
    code: string
    name: string
  }
  interior: {
    code: string
    name: string
  }
}

export class BMWPartsService {
  private readonly bmwSeries = [
    '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series',
    'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z3', 'Z4', 'Z8',
    'M3', 'M4', 'M5', 'M6', 'X5M', 'X6M', 'i3', 'i8'
  ]

  private readonly bmwEngines = [
    // N-Series (Modern BMW engines)
    'N20 2.0L Turbo', 'N26 2.0L Turbo', 'N55 3.0L Turbo', 'N63 4.4L Twin Turbo',
    // B-Series (Latest BMW engines)  
    'B38 1.5L Turbo', 'B46 2.0L Turbo', 'B48 2.0L Turbo', 'B58 3.0L Turbo',
    // S-Series (M engines)
    'S55 3.0L Twin Turbo', 'S63 4.4L Twin Turbo', 'S65 4.0L V8', 'S85 5.0L V10',
    // Legacy engines
    'M54 2.5L/3.0L', 'M52 2.8L', 'M42 1.8L', 'M50 2.0L/2.5L'
  ]

  /**
   * Search BMW parts by part number
   */
  async searchByPartNumber(partNumber: string): Promise<BMWPart[]> {
    try {
      // Mock BMW parts database search
      const mockParts: BMWPart[] = [
        {
          partNumber: partNumber,
          oemPartNumber: '11427566327',
          etk: 'ETK-11427566327',
          brand: 'BMW Genuine',
          description: 'Oil Filter Housing Assembly',
          category: 'Engine',
          subcategory: 'Lubrication System',
          application: {
            series: ['3 Series', '5 Series', 'X3', 'X5'],
            models: ['328i', '335i', '528i', '535i', 'X3 3.0si', 'X5 3.0si'],
            years: ['2007', '2008', '2009', '2010', '2011', '2012'],
            engines: ['N52 3.0L', 'N54 3.0L Twin Turbo', 'N55 3.0L Turbo'],
            bodyTypes: ['Sedan', 'Wagon', 'SUV']
          },
          specifications: {
            weight: '2.5 lbs',
            dimensions: '8" x 6" x 4"',
            material: 'Aluminum/Plastic',
            notes: 'Includes integrated oil cooler'
          },
          price: '$245.99',
          availability: 'in-stock',
          condition: 'genuine-bmw',
          supplier: {
            name: 'BMW Parts Department',
            location: 'Multiple Locations',
            phone: '(800) 831-1117',
            website: 'bmwusa.com',
            bmwDealer: true
          },
          supersedes: ['11421719855', '11427525333'],
          crossReferences: ['MANN-HU816X', 'MAHLE-OX371D', 'FEBI-26036'],
          notes: 'Common failure item. Replace with thermostat and coolant.',
          installation: {
            difficulty: 'moderate',
            timeEstimate: '2-3 hours',
            specialTools: ['BMW oil filter wrench', 'Torque wrench', 'BMW coolant']
          }
        }
      ]

      return mockParts
    } catch (error) {
      console.error('Error searching BMW parts:', error)
      return []
    }
  }

  /**
   * Search BMW parts by vehicle information
   */
  async searchByVehicle(
    series: string,
    year: string,
    model?: string,
    category?: string
  ): Promise<BMWPart[]> {
    try {
      // Mock BMW vehicle-specific parts search
      const mockParts: BMWPart[] = [
        {
          partNumber: 'BMW-12345-OIL',
          oemPartNumber: '11427508969',
          etk: 'ETK-11427508969',
          brand: 'BMW Genuine',
          description: 'Engine Oil Filter Element',
          category: 'Engine',
          subcategory: 'Lubrication',
          application: {
            series: [series],
            models: model ? [model] : ['328i', '335i', '328xi'],
            years: [year],
            engines: ['N52 3.0L', 'N54 3.0L Twin Turbo']
          },
          specifications: {
            weight: '0.8 lbs',
            material: 'Paper/Synthetic blend'
          },
          price: '$28.99',
          availability: 'in-stock',
          condition: 'genuine-bmw',
          supplier: {
            name: 'Pelican Parts',
            location: 'Torrance, CA',
            phone: '(888) 280-7799',
            website: 'pelicanparts.com',
            bmwDealer: false
          },
          crossReferences: ['MANN-HU816X', 'MAHLE-OX371D'],
          installation: {
            difficulty: 'easy',
            timeEstimate: '30 minutes',
            specialTools: ['Oil filter wrench']
          }
        },
        {
          partNumber: 'BMW-67890-COOL',
          oemPartNumber: '17117521031',
          etk: 'ETK-17117521031',
          brand: 'BMW Genuine',
          description: 'Radiator Assembly',
          category: 'Cooling',
          subcategory: 'Radiator',
          application: {
            series: [series],
            models: model ? [model] : ['328i', '335i'],
            years: [year],
            engines: ['N52 3.0L', 'N54 3.0L Twin Turbo'],
            options: ['Manual Transmission', 'Automatic Transmission']
          },
          specifications: {
            weight: '15 lbs',
            dimensions: '24" x 18" x 2"',
            material: 'Aluminum/Plastic'
          },
          price: '$485.99',
          availability: 'special-order',
          condition: 'genuine-bmw',
          supplier: {
            name: 'FCP Euro',
            location: 'Milford, CT',
            phone: '(877) 634-0063',
            website: 'fcpeuro.com',
            bmwDealer: false
          },
          crossReferences: ['BEHR-8MK376718211', 'VALEO-734866'],
          installation: {
            difficulty: 'difficult',
            timeEstimate: '4-6 hours',
            specialTools: ['BMW coolant', 'Pressure test kit', 'TORX bits']
          }
        }
      ]

      // Filter by category if specified
      return category 
        ? mockParts.filter(part => part.category.toLowerCase().includes(category.toLowerCase()))
        : mockParts
    } catch (error) {
      console.error('Error searching BMW parts by vehicle:', error)
      return []
    }
  }

  /**
   * Decode BMW VIN for parts compatibility
   */
  async decodeBMWVIN(vin: string): Promise<BMWVehicle | null> {
    try {
      if (vin.length !== 17) {
        throw new Error('Invalid VIN length')
      }

      // Mock BMW VIN decode using BMW VIN structure
      const vinInfo: BMWVehicle = {
        vin,
        series: '3 Series',
        model: '328i',
        year: '2009',
        engine: 'N52 3.0L',
        transmission: '6-Speed Manual',
        bodyType: 'Sedan',
        productionDate: '05/2009',
        options: [
          'Premium Package',
          'Navigation System', 
          'Xenon Headlights',
          'Sport Package',
          'Cold Weather Package'
        ],
        paint: {
          code: 'A75',
          name: 'Jet Black'
        },
        interior: {
          code: 'LCMN',
          name: 'Black Dakota Leather'
        }
      }

      return vinInfo
    } catch (error) {
      console.error('Error decoding BMW VIN:', error)
      return null
    }
  }

  /**
   * Cross-reference BMW parts with aftermarket alternatives
   */
  async crossReferenceBMWPart(bmwPartNumber: string): Promise<{
    originalPart: BMWPart | null
    genuineBMW: BMWPart[]
    oem: BMWPart[]
    aftermarket: BMWPart[]
    compatibleVehicles: string[]
  }> {
    try {
      const originalPart = (await this.searchByPartNumber(bmwPartNumber))[0]
      
      // Mock cross-reference results
      const genuineBMW = originalPart ? [originalPart] : []
      
      const oem: BMWPart[] = [
        {
          ...originalPart,
          brand: 'Febi Bilstein',
          condition: 'oem-equivalent',
          price: '$185.99',
          supplier: {
            name: 'AutohausAZ',
            location: 'San Diego, CA',
            phone: '(619) 275-1416',
            website: 'autohausaz.com',
            bmwDealer: false
          }
        } as BMWPart
      ].filter(Boolean)

      const aftermarket: BMWPart[] = [
        {
          ...originalPart,
          brand: 'URO Parts',
          condition: 'new',
          price: '$125.99',
          supplier: {
            name: 'Bavarian Autosport',
            location: 'Portsmouth, NH',
            phone: '(800) 535-2002',
            website: 'bavauto.com',
            bmwDealer: false
          }
        } as BMWPart,
        {
          ...originalPart,
          brand: 'Genuine BMW (Used)',
          condition: 'used',
          price: '$89.99',
          supplier: {
            name: 'BMW Recycling',
            location: 'Multiple Locations',
            website: 'bmwrecycling.com',
            bmwDealer: false
          }
        } as BMWPart
      ].filter(Boolean)

      const compatibleVehicles = originalPart 
        ? originalPart.application.series.flatMap(series => 
            originalPart.application.models.map(model => `${originalPart.application.years[0]}-${originalPart.application.years[originalPart.application.years.length-1]} ${series} ${model}`)
          )
        : []

      return {
        originalPart: originalPart || null,
        genuineBMW,
        oem,
        aftermarket,
        compatibleVehicles
      }
    } catch (error) {
      console.error('Error cross-referencing BMW part:', error)
      return {
        originalPart: null,
        genuineBMW: [],
        oem: [],
        aftermarket: [],
        compatibleVehicles: []
      }
    }
  }

  /**
   * Get BMW maintenance schedules
   */
  getBMWMaintenanceSchedule(series: string, mileage: number, year: number): {
    service: string
    mileage: number
    timeInterval: string
    parts: string[]
    category: string
    priority: 'critical' | 'important' | 'recommended'
    estimatedCost: string
  }[] {
    // BMW Condition Based Service (CBS) intervals
    const schedule = [
      {
        service: 'Oil Service',
        mileage: 10000,
        timeInterval: '12 months',
        parts: ['Engine Oil', 'Oil Filter', 'Drain Plug Seal'],
        category: 'Engine',
        priority: 'critical' as const,
        estimatedCost: '$150-250'
      },
      {
        service: 'Inspection I',
        mileage: 30000,
        timeInterval: '24 months', 
        parts: ['Air Filter', 'Cabin Filter', 'Brake Fluid'],
        category: 'General',
        priority: 'important' as const,
        estimatedCost: '$300-500'
      },
      {
        service: 'Inspection II',
        mileage: 60000,
        timeInterval: '48 months',
        parts: ['Spark Plugs', 'Fuel Filter', 'Transmission Service'],
        category: 'Major Service',
        priority: 'critical' as const,
        estimatedCost: '$800-1200'
      },
      {
        service: 'Cooling System Service',
        mileage: 80000,
        timeInterval: '96 months',
        parts: ['Coolant', 'Thermostat', 'Water Pump'],
        category: 'Cooling',
        priority: 'important' as const,
        estimatedCost: '$600-1000'
      }
    ]

    // Filter based on current mileage and upcoming services
    return schedule.filter(service => {
      const nextService = Math.ceil(mileage / service.mileage) * service.mileage
      return nextService <= mileage + 5000 // Show services within 5k miles
    })
  }

  /**
   * Get BMW common problems by series and mileage
   */
  getBMWCommonIssues(series: string, mileage: number): {
    issue: string
    mileageRange: string
    affectedModels: string[]
    symptoms: string[]
    parts: string[]
    severity: 'low' | 'moderate' | 'high' | 'critical'
    estimatedCost: string
    prevention: string[]
  }[] {
    const commonIssues = [
      {
        issue: 'VANOS System Failure',
        mileageRange: '80,000-120,000',
        affectedModels: ['325i', '328i', '330i', '525i', '528i', '530i'],
        symptoms: [
          'Rough idle',
          'Loss of power',
          'Check engine light',
          'Rattling noise on startup'
        ],
        parts: ['VANOS Seals', 'VANOS Solenoids', 'VANOS Unit'],
        severity: 'high' as const,
        estimatedCost: '$1,200-2,500',
        prevention: [
          'Use quality oil',
          'Regular oil changes',
          'Clean VANOS system periodically'
        ]
      },
      {
        issue: 'Water Pump Failure',
        mileageRange: '60,000-90,000',
        affectedModels: ['All N52/N54 engines'],
        symptoms: [
          'Coolant leak',
          'Overheating',
          'White smoke from exhaust',
          'Low coolant warning'
        ],
        parts: ['Water Pump', 'Thermostat', 'Coolant'],
        severity: 'critical' as const,
        estimatedCost: '$800-1,200',
        prevention: [
          'Replace coolant per schedule',
          'Check for leaks regularly',
          'Replace thermostat with pump'
        ]
      }
    ]

    return commonIssues.filter(issue => {
      if (issue.affectedModels.includes('All N52/N54 engines')) return true
      const [min, max] = issue.mileageRange.split('-').map(m => parseInt(m.replace(/,/g, '')))
      return mileage >= min - 10000 && mileage <= max + 10000
    })
  }

  /**
   * Get supported BMW series
   */
  getSupportedSeries(): string[] {
    return [...this.bmwSeries]
  }

  /**
   * Get BMW engine specifications
   */
  getBMWEngines(): string[] {
    return [...this.bmwEngines]
  }

  /**
   * Check if series is supported
   */
  isSeriesSupported(series: string): boolean {
    return this.bmwSeries.some(s => s.toLowerCase().includes(series.toLowerCase()))
  }
}

// Singleton instance
export const bmwPartsService = new BMWPartsService()