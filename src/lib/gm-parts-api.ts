// GM Parts Integration - OEM Parts Cross-Reference
// Using free GM parts databases and cross-reference tools

export interface GMPart {
  partNumber: string
  description: string
  category: string
  subcategory: string
  msrp: string
  listPrice: string
  vehicleApplications: {
    year: string
    make: string
    model: string
    engine?: string
    transmission?: string
  }[]
  supersededBy?: string
  supersedes?: string[]
  notes?: string
  bulletins?: string[]
}

export interface GMVehicleInfo {
  year: string
  make: string
  model: string
  trim: string
  engine: string
  transmission: string
  bodyStyle: string
  wheelbase: string
  options: string[]
}

export class GMPartsService {
  private readonly baseUrl = 'https://parts.gm.com'
  private readonly supportedMakes = [
    'Chevrolet', 'GMC', 'Cadillac', 'Buick', 'Oldsmobile', 'Pontiac', 
    'Saturn', 'Hummer', 'Saab', 'Opel', 'Holden'
  ]

  /**
   * Search GM OEM parts by part number
   */
  async searchByPartNumber(partNumber: string): Promise<GMPart[]> {
    try {
      // Mock GM parts database search
      const mockParts: GMPart[] = [
        {
          partNumber: partNumber,
          description: 'Engine Mount Assembly - Front',
          category: 'Engine',
          subcategory: 'Engine Mounts & Brackets',
          msrp: '$145.99',
          listPrice: '$89.99',
          vehicleApplications: [
            {
              year: '2018',
              make: 'Chevrolet',
              model: 'Silverado 1500',
              engine: '5.3L V8',
              transmission: '8-Speed Automatic'
            },
            {
              year: '2019',
              make: 'GMC',
              model: 'Sierra 1500',
              engine: '5.3L V8',
              transmission: '8-Speed Automatic'
            }
          ],
          supersedes: ['12345-OLD-678', '98765-OLD-432'],
          notes: 'Includes all necessary hardware. Updated design with improved durability.',
          bulletins: ['PI1234A', 'TSB-18-01-001']
        }
      ]

      return mockParts
    } catch (error) {
      console.error('Error searching GM parts:', error)
      return []
    }
  }

  /**
   * Search parts by vehicle information
   */
  async searchByVehicle(
    year: string,
    make: string,
    model: string,
    category?: string
  ): Promise<GMPart[]> {
    try {
      if (!this.supportedMakes.includes(make)) {
        return []
      }

      // Mock vehicle-specific parts search
      const mockParts: GMPart[] = [
        {
          partNumber: 'GM-12345-ABC',
          description: 'Air Filter Element',
          category: 'Engine',
          subcategory: 'Air Intake System',
          msrp: '$29.99',
          listPrice: '$18.99',
          vehicleApplications: [
            {
              year,
              make,
              model,
              engine: '5.3L V8'
            }
          ],
          notes: 'Replace every 12,000 miles or as needed based on driving conditions.'
        },
        {
          partNumber: 'GM-67890-DEF',
          description: 'Brake Pads - Front Set',
          category: 'Brake',
          subcategory: 'Brake Pads',
          msrp: '$89.99',
          listPrice: '$65.99',
          vehicleApplications: [
            {
              year,
              make,
              model
            }
          ],
          notes: 'OEM specification brake pads. Includes wear indicators.'
        }
      ]

      return category 
        ? mockParts.filter(part => part.category.toLowerCase().includes(category.toLowerCase()))
        : mockParts
    } catch (error) {
      console.error('Error searching GM parts by vehicle:', error)
      return []
    }
  }

  /**
   * Get detailed vehicle information for parts compatibility
   */
  async getVehicleSpecs(year: string, make: string, model: string): Promise<GMVehicleInfo | null> {
    try {
      if (!this.supportedMakes.includes(make)) {
        return null
      }

      // Mock GM vehicle specifications
      const vehicleInfo: GMVehicleInfo = {
        year,
        make,
        model,
        trim: 'LT',
        engine: '5.3L V8 (L83)',
        transmission: '8-Speed Automatic (8L90)',
        bodyStyle: 'Crew Cab',
        wheelbase: '147.4"',
        options: [
          'Z71 Off-Road Package',
          'Towing Package',
          'All-Weather Floor Liners',
          'Bedliner'
        ]
      }

      return vehicleInfo
    } catch (error) {
      console.error('Error getting GM vehicle specs:', error)
      return null
    }
  }

  /**
   * Cross-reference GM part numbers with aftermarket alternatives
   */
  async crossReferenceGMPart(gmPartNumber: string): Promise<{
    originalPart: GMPart
    acDelcoAlternatives: GMPart[]
    aftermarketOptions: {
      brand: string
      partNumber: string
      description: string
      price: string
      compatibility: string[]
    }[]
  }> {
    try {
      const originalPart = await this.searchByPartNumber(gmPartNumber)
      
      // Mock AC Delco alternatives (GM's OEM supplier)
      const acDelcoAlternatives: GMPart[] = [
        {
          partNumber: 'AC-' + gmPartNumber.replace('GM-', ''),
          description: originalPart[0]?.description + ' (AC Delco)',
          category: originalPart[0]?.category || 'Engine',
          subcategory: originalPart[0]?.subcategory || 'OEM Parts',
          msrp: '$125.99',
          listPrice: '$89.99',
          vehicleApplications: originalPart[0]?.vehicleApplications || [],
          notes: 'AC Delco OEM equivalent part'
        }
      ]

      // Mock aftermarket alternatives
      const aftermarketOptions = [
        {
          brand: 'Motorcraft',
          partNumber: 'MC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          description: originalPart[0]?.description + ' (Motorcraft)',
          price: '$75.99',
          compatibility: [`${originalPart[0]?.vehicleApplications[0]?.year} ${originalPart[0]?.vehicleApplications[0]?.make} ${originalPart[0]?.vehicleApplications[0]?.model}`]
        },
        {
          brand: 'Dorman',
          partNumber: 'DOR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          description: originalPart[0]?.description + ' (Dorman)',
          price: '$45.99',
          compatibility: [`${originalPart[0]?.vehicleApplications[0]?.year} ${originalPart[0]?.vehicleApplications[0]?.make} ${originalPart[0]?.vehicleApplications[0]?.model}`]
        }
      ]

      return {
        originalPart: originalPart[0] || {} as GMPart,
        acDelcoAlternatives,
        aftermarketOptions
      }
    } catch (error) {
      console.error('Error cross-referencing GM part:', error)
      return {
        originalPart: {} as GMPart,
        acDelcoAlternatives: [],
        aftermarketOptions: []
      }
    }
  }

  /**
   * Get GM Technical Service Bulletins for specific parts
   */
  async getTechnicalBulletins(partNumber: string): Promise<{
    bulletinId: string
    title: string
    date: string
    category: string
    affectedParts: string[]
    description: string
    solution: string
    laborTime?: string
  }[]> {
    try {
      // Mock GM TSB data
      const mockBulletins = [
        {
          bulletinId: 'PI1234A',
          title: 'Updated Engine Mount Design',
          date: '2023-05-15',
          category: 'Product Improvement',
          affectedParts: [partNumber],
          description: 'New engine mount design improves vibration isolation and durability.',
          solution: 'Replace with updated part number when servicing.',
          laborTime: '0.8 hours'
        }
      ]

      return mockBulletins
    } catch (error) {
      console.error('Error getting GM TSBs:', error)
      return []
    }
  }

  /**
   * Check if make is supported by GM
   */
  isMakeSupported(make: string): boolean {
    return this.supportedMakes.includes(make)
  }

  /**
   * Get all supported GM makes
   */
  getSupportedMakes(): string[] {
    return [...this.supportedMakes]
  }

  /**
   * Decode GM VIN for parts applications
   */
  async decodeGMVIN(vin: string): Promise<{
    year: string
    make: string
    model: string
    engine: string
    transmission: string
    plant: string
    buildDate: string
    options: string[]
  } | null> {
    try {
      if (vin.length !== 17) {
        throw new Error('Invalid VIN length')
      }

      // Mock GM VIN decode
      const vinInfo = {
        year: '2018',
        make: 'Chevrolet',
        model: 'Silverado 1500',
        engine: '5.3L V8 (L83)',
        transmission: '8-Speed Automatic (8L90)',
        plant: 'Fort Wayne Assembly (Indiana)',
        buildDate: '08/2017',
        options: [
          'Z71 Off-Road Package',
          'Crew Cab',
          '4WD',
          'LT Trim Level'
        ]
      }

      return vinInfo
    } catch (error) {
      console.error('Error decoding GM VIN:', error)
      return null
    }
  }
}

// Singleton instance
export const gmPartsService = new GMPartsService()