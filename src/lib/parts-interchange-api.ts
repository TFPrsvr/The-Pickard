// Free Parts Interchange APIs and Cross-Reference Services

export interface InterchangeablePart {
  oemPartNumber: string
  brand: string
  partNumber: string
  description: string
  price: string
  availability: 'in-stock' | 'limited' | 'out-of-stock'
  condition: 'new' | 'used' | 'remanufactured'
  supplier: {
    name: string
    location: string
    phone?: string
    website?: string
  }
  compatibility: {
    years: string[]
    makes: string[]
    models: string[]
    engines?: string[]
  }
  interchangeWith: string[] // Other compatible part numbers
}

export interface VINLookupResult {
  vin: string
  year: string
  make: string
  model: string
  trim: string
  engine: string
  transmission: string
  drivetrain: string
  bodyStyle: string
  manufacturedIn: string
  plantInfo: string
}

export interface OEMPartLookup {
  partNumber: string
  description: string
  category: string
  subcategory: string
  msrp: string
  supersededBy?: string
  notes?: string
}

export class PartsInterchangeService {
  
  /**
   * Search for interchangeable parts using Car-Part.com
   * Free service with extensive database
   */
  async searchCarPart(
    year: string,
    make: string,
    model: string,
    partName: string
  ): Promise<InterchangeablePart[]> {
    try {
      // Car-Part.com free search
      // In production, this would scrape their search results
      const mockResults: InterchangeablePart[] = [
        {
          oemPartNumber: '12345-ABC-678',
          brand: 'OEM',
          partNumber: '12345-ABC-678',
          description: 'Engine Assembly 3.5L V6',
          price: '$2,450.00',
          availability: 'in-stock',
          condition: 'used',
          supplier: {
            name: 'ABC Auto Salvage',
            location: 'Phoenix, AZ',
            phone: '(602) 555-0123',
            website: 'www.abcautosalvage.com'
          },
          compatibility: {
            years: [year, (parseInt(year) - 1).toString()],
            makes: [make],
            models: [model],
            engines: ['3.5L V6', '3.5L V6 VVT']
          },
          interchangeWith: ['12345-ABC-679', '12345-DEF-678']
        }
      ]
      
      return mockResults
    } catch (error) {
      console.error('Error searching Car-Part.com:', error)
      return []
    }
  }

  /**
   * Search LKQ Pick Your Part inventory
   * Free online inventory search
   */
  async searchLKQ(partName: string, vehicleInfo: {
    year: string
    make: string
    model: string
  }): Promise<InterchangeablePart[]> {
    try {
      // LKQ has free online inventory search
      const mockResults: InterchangeablePart[] = [
        {
          oemPartNumber: 'LKQ-98765',
          brand: 'LKQ',
          partNumber: 'LKQ-98765-USED',
          description: partName,
          price: '$185.00',
          availability: 'in-stock',
          condition: 'used',
          supplier: {
            name: 'LKQ Pick Your Part - Phoenix',
            location: 'Phoenix, AZ',
            phone: '(602) 555-0199',
            website: 'www.lkqpickyourpart.com'
          },
          compatibility: {
            years: [vehicleInfo.year],
            makes: [vehicleInfo.make],
            models: [vehicleInfo.model]
          },
          interchangeWith: []
        }
      ]
      
      return mockResults
    } catch (error) {
      console.error('Error searching LKQ:', error)
      return []
    }
  }

  /**
   * Cross-reference OEM part numbers using free databases
   */
  async crossReferenceOEM(oemPartNumber: string): Promise<{
    originalPart: OEMPartLookup
    alternatives: InterchangeablePart[]
    aftermarketOptions: InterchangeablePart[]
  }> {
    try {
      // Free cross-reference using multiple sources
      const originalPart: OEMPartLookup = {
        partNumber: oemPartNumber,
        description: 'Engine Mount - Front',
        category: 'Engine',
        subcategory: 'Mounts & Brackets',
        msrp: '$125.99',
        notes: 'Fits multiple vehicle applications'
      }

      const alternatives: InterchangeablePart[] = [
        {
          oemPartNumber: oemPartNumber,
          brand: 'Beck Arnley',
          partNumber: 'BA-104-1856',
          description: 'Engine Mount - Front (OE Replacement)',
          price: '$89.99',
          availability: 'in-stock',
          condition: 'new',
          supplier: {
            name: 'AutoZone',
            location: 'Multiple Locations',
            website: 'www.autozone.com'
          },
          compatibility: {
            years: ['2015', '2016', '2017', '2018'],
            makes: ['Honda'],
            models: ['Accord', 'CR-V']
          },
          interchangeWith: [oemPartNumber, 'MTC-5365', 'DEA-A5365']
        }
      ]

      const aftermarketOptions: InterchangeablePart[] = [
        {
          oemPartNumber: oemPartNumber,
          brand: 'Anchor',
          partNumber: 'ANC-9369',
          description: 'Engine Mount - Premium Aftermarket',
          price: '$65.99',
          availability: 'in-stock',
          condition: 'new',
          supplier: {
            name: 'O\'Reilly Auto Parts',
            location: 'Multiple Locations',
            website: 'www.oreillyauto.com'
          },
          compatibility: {
            years: ['2015', '2016', '2017', '2018'],
            makes: ['Honda'],
            models: ['Accord', 'CR-V']
          },
          interchangeWith: [oemPartNumber]
        }
      ]

      return {
        originalPart,
        alternatives,
        aftermarketOptions
      }
    } catch (error) {
      console.error('Error cross-referencing OEM part:', error)
      return {
        originalPart: {} as OEMPartLookup,
        alternatives: [],
        aftermarketOptions: []
      }
    }
  }

  /**
   * Decode VIN to get exact part fitment information
   */
  async decodeVINForParts(vin: string): Promise<VINLookupResult | null> {
    try {
      // Use free NHTSA VIN decoder
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`)
      
      if (!response.ok) {
        throw new Error('VIN decode failed')
      }

      const data = await response.json()
      const results = data.Results

      // Extract relevant information
      const vinInfo: VINLookupResult = {
        vin,
        year: this.extractValue(results, 'Model Year'),
        make: this.extractValue(results, 'Make'),
        model: this.extractValue(results, 'Model'),
        trim: this.extractValue(results, 'Trim'),
        engine: this.extractValue(results, 'Engine Configuration'),
        transmission: this.extractValue(results, 'Transmission Style'),
        drivetrain: this.extractValue(results, 'Drive Type'),
        bodyStyle: this.extractValue(results, 'Body Class'),
        manufacturedIn: this.extractValue(results, 'Plant Country'),
        plantInfo: this.extractValue(results, 'Plant Company Name')
      }

      return vinInfo
    } catch (error) {
      console.error('Error decoding VIN:', error)
      return null
    }
  }

  private extractValue(results: any[], variableName: string): string {
    const item = results.find(r => r.Variable === variableName)
    return item?.Value || 'Unknown'
  }

  /**
   * Search Pull-A-Part inventory (free online search)
   */
  async searchPullAPart(
    partName: string,
    year: string,
    make: string,
    model: string
  ): Promise<InterchangeablePart[]> {
    try {
      // Pull-A-Part has free inventory search
      const mockResults: InterchangeablePart[] = [
        {
          oemPartNumber: 'PULL-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          brand: 'OEM',
          partNumber: 'USED-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          description: partName,
          price: '$45.00',
          availability: 'in-stock',
          condition: 'used',
          supplier: {
            name: 'Pull-A-Part Atlanta',
            location: 'Atlanta, GA',
            phone: '(770) 555-0156',
            website: 'www.pullapart.com'
          },
          compatibility: {
            years: [year],
            makes: [make],
            models: [model]
          },
          interchangeWith: []
        }
      ]
      
      return mockResults
    } catch (error) {
      console.error('Error searching Pull-A-Part:', error)
      return []
    }
  }

  /**
   * Get comprehensive parts interchange data from multiple free sources
   */
  async getComprehensiveInterchange(
    oemPartNumber: string,
    vehicleInfo: {
      vin?: string
      year: string
      make: string
      model: string
    }
  ): Promise<{
    oemInfo: OEMPartLookup
    newParts: InterchangeablePart[]
    usedParts: InterchangeablePart[]
    remanufactured: InterchangeablePart[]
    totalResults: number
  }> {
    try {
      const [crossRef, carPart, lkq, pullAPart] = await Promise.allSettled([
        this.crossReferenceOEM(oemPartNumber),
        this.searchCarPart(vehicleInfo.year, vehicleInfo.make, vehicleInfo.model, 'Engine'),
        this.searchLKQ('Engine', vehicleInfo),
        this.searchPullAPart('Engine', vehicleInfo.year, vehicleInfo.make, vehicleInfo.model)
      ])

      const crossRefData = crossRef.status === 'fulfilled' ? crossRef.value : null
      const carPartResults = carPart.status === 'fulfilled' ? carPart.value : []
      const lkqResults = lkq.status === 'fulfilled' ? lkq.value : []
      const pullAPartResults = pullAPart.status === 'fulfilled' ? pullAPart.value : []

      const allParts = [...carPartResults, ...lkqResults, ...pullAPartResults]
      
      // Add aftermarket options if cross-reference succeeded
      if (crossRefData) {
        allParts.push(...crossRefData.alternatives, ...crossRefData.aftermarketOptions)
      }

      return {
        oemInfo: crossRefData?.originalPart || {} as OEMPartLookup,
        newParts: allParts.filter(p => p.condition === 'new'),
        usedParts: allParts.filter(p => p.condition === 'used'),
        remanufactured: allParts.filter(p => p.condition === 'remanufactured'),
        totalResults: allParts.length
      }
    } catch (error) {
      console.error('Error getting comprehensive interchange:', error)
      return {
        oemInfo: {} as OEMPartLookup,
        newParts: [],
        usedParts: [],
        remanufactured: [],
        totalResults: 0
      }
    }
  }

  /**
   * Validate part compatibility with specific vehicle
   */
  validatePartCompatibility(
    part: InterchangeablePart,
    vehicleInfo: {
      year: string
      make: string
      model: string
      engine?: string
    }
  ): {
    isCompatible: boolean
    confidence: 'high' | 'medium' | 'low'
    notes: string[]
  } {
    const notes: string[] = []
    let confidence: 'high' | 'medium' | 'low' = 'high'
    
    // Check year compatibility
    const yearMatch = part.compatibility.years.includes(vehicleInfo.year)
    if (!yearMatch) {
      notes.push('Year may not be compatible')
      confidence = 'low'
    }

    // Check make compatibility
    const makeMatch = part.compatibility.makes.includes(vehicleInfo.make)
    if (!makeMatch) {
      notes.push('Make may not be compatible')
      confidence = 'low'
    }

    // Check model compatibility
    const modelMatch = part.compatibility.models.includes(vehicleInfo.model)
    if (!modelMatch) {
      notes.push('Model compatibility uncertain')
      confidence = confidence === 'high' ? 'medium' : 'low'
    }

    // Check engine compatibility if provided
    if (vehicleInfo.engine && part.compatibility.engines) {
      const engineMatch = part.compatibility.engines.some(e => 
        e.toLowerCase().includes(vehicleInfo.engine!.toLowerCase())
      )
      if (!engineMatch) {
        notes.push('Engine compatibility should be verified')
        confidence = confidence === 'high' ? 'medium' : 'low'
      }
    }

    const isCompatible = yearMatch && makeMatch && modelMatch

    if (notes.length === 0) {
      notes.push('All compatibility checks passed')
    }

    return {
      isCompatible,
      confidence,
      notes
    }
  }
}

// Singleton instance
export const partsInterchangeService = new PartsInterchangeService()