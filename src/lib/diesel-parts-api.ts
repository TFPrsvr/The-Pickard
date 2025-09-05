// Diesel Parts Cross-Reference Integration
// Free diesel parts databases and cross-reference tools

export interface DieselPart {
  partNumber: string
  oemPartNumber?: string
  brand: string
  description: string
  category: string
  application: {
    engine: string
    years: string[]
    makes: string[]
    models: string[]
    displacement?: string
    fuelSystem?: string
  }
  specifications: {
    dimensions?: string
    weight?: string
    material?: string
    torqueSpec?: string
  }
  price: string
  availability: 'in-stock' | 'limited' | 'out-of-stock' | 'special-order'
  condition: 'new' | 'used' | 'remanufactured' | 'rebuilt'
  supplier: {
    name: string
    location: string
    phone?: string
    website?: string
    specialization: string
  }
  crossReferences: string[]
  notes?: string
}

export interface DieselEngine {
  manufacturer: string
  series: string
  displacement: string
  configuration: string
  fuelSystem: string
  applications: {
    type: 'automotive' | 'commercial' | 'marine' | 'industrial' | 'generator'
    years: string[]
    makes: string[]
    models: string[]
  }[]
  commonParts: {
    category: string
    parts: string[]
  }[]
}

export class DieselPartsService {
  private readonly dieselEngines: DieselEngine[] = [
    // Cummins Engines
    {
      manufacturer: 'Cummins',
      series: '6.7L ISB',
      displacement: '6.7L',
      configuration: 'Inline 6',
      fuelSystem: 'Common Rail',
      applications: [
        {
          type: 'automotive',
          years: ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
          makes: ['Ram', 'Dodge'],
          models: ['2500', '3500', '4500', '5500']
        }
      ],
      commonParts: [
        {
          category: 'Fuel System',
          parts: ['CP3 Injection Pump', 'High Pressure Fuel Pump', 'Fuel Rail', 'Injectors', 'Lift Pump']
        },
        {
          category: 'Emissions',
          parts: ['DPF', 'SCR Catalyst', 'DOC', 'EGR Valve', 'DEF Injector']
        }
      ]
    },
    // Duramax Engines
    {
      manufacturer: 'General Motors',
      series: '6.6L Duramax LB7',
      displacement: '6.6L',
      configuration: 'V8',
      fuelSystem: 'Common Rail',
      applications: [
        {
          type: 'automotive',
          years: ['2001', '2002', '2003', '2004'],
          makes: ['Chevrolet', 'GMC'],
          models: ['Silverado 2500HD', 'Silverado 3500', 'Sierra 2500HD', 'Sierra 3500']
        }
      ],
      commonParts: [
        {
          category: 'Fuel System',
          parts: ['CP3 Injection Pump', 'Fuel Rail', 'Injectors', 'Fuel Filter Housing']
        },
        {
          category: 'Engine',
          parts: ['Head Gaskets', 'Glow Plugs', 'Turbocharger', 'Intercooler']
        }
      ]
    },
    // Ford Power Stroke
    {
      manufacturer: 'Ford/Navistar',
      series: '6.0L Power Stroke',
      displacement: '6.0L',
      configuration: 'V8',
      fuelSystem: 'HEUI',
      applications: [
        {
          type: 'automotive',
          years: ['2003', '2004', '2005', '2006', '2007'],
          makes: ['Ford'],
          models: ['F-250', 'F-350', 'F-450', 'F-550', 'Excursion']
        }
      ],
      commonParts: [
        {
          category: 'Fuel System',
          parts: ['FICM', 'ICP Sensor', 'IPR Valve', 'Fuel Injectors', 'High Pressure Oil Pump']
        },
        {
          category: 'Cooling',
          parts: ['EGR Cooler', 'Oil Cooler', 'Water Pump', 'Thermostat']
        }
      ]
    }
  ]

  /**
   * Search diesel parts across multiple databases
   */
  async searchDieselParts(
    engine: string,
    partCategory: string,
    year?: string,
    make?: string,
    model?: string
  ): Promise<DieselPart[]> {
    try {
      // Mock diesel parts database search
      const mockParts: DieselPart[] = [
        {
          partNumber: 'CP3-PUMP-001',
          oemPartNumber: '0445020002',
          brand: 'Bosch',
          description: 'CP3 High Pressure Fuel Injection Pump',
          category: 'Fuel System',
          application: {
            engine: 'Cummins 6.7L ISB',
            years: ['2007', '2008', '2009', '2010'],
            makes: ['Dodge', 'Ram'],
            models: ['2500', '3500'],
            displacement: '6.7L',
            fuelSystem: 'Common Rail'
          },
          specifications: {
            dimensions: '12" x 8" x 6"',
            weight: '15 lbs',
            torqueSpec: '18 ft-lbs'
          },
          price: '$1,850.00',
          availability: 'in-stock',
          condition: 'remanufactured',
          supplier: {
            name: 'Diesel Parts Direct',
            location: 'Phoenix, AZ',
            phone: '(602) 555-0199',
            website: 'dieselpartsdirect.com',
            specialization: 'Cummins & Duramax Parts'
          },
          crossReferences: ['0445020007', '0445020150', 'CP3-REMAN-001'],
          notes: 'Includes 2-year warranty. Core exchange required.'
        },
        {
          partNumber: 'DPF-FILTER-6.7',
          oemPartNumber: '68157291AA',
          brand: 'Mopar',
          description: 'Diesel Particulate Filter (DPF)',
          category: 'Emissions',
          application: {
            engine: 'Cummins 6.7L ISB',
            years: ['2013', '2014', '2015', '2016', '2017'],
            makes: ['Ram'],
            models: ['2500', '3500'],
            displacement: '6.7L',
            fuelSystem: 'Common Rail'
          },
          specifications: {
            dimensions: '24" x 12" x 8"',
            weight: '35 lbs'
          },
          price: '$2,450.00',
          availability: 'special-order',
          condition: 'new',
          supplier: {
            name: 'Ram Parts Depot',
            location: 'Detroit, MI',
            phone: '(313) 555-0156',
            website: 'rampartsdepot.com',
            specialization: 'OEM Ram Parts'
          },
          crossReferences: ['68157291AB', 'DPF-6.7L-2013'],
          notes: 'Must be programmed to vehicle. Professional installation recommended.'
        }
      ]

      // Filter by criteria
      let filteredParts = mockParts

      if (engine) {
        filteredParts = filteredParts.filter(part => 
          part.application.engine.toLowerCase().includes(engine.toLowerCase())
        )
      }

      if (partCategory) {
        filteredParts = filteredParts.filter(part => 
          part.category.toLowerCase().includes(partCategory.toLowerCase())
        )
      }

      if (year && make && model) {
        filteredParts = filteredParts.filter(part => 
          part.application.years.includes(year) &&
          part.application.makes.some(m => m.toLowerCase() === make.toLowerCase()) &&
          part.application.models.some(m => m.toLowerCase().includes(model.toLowerCase()))
        )
      }

      return filteredParts
    } catch (error) {
      console.error('Error searching diesel parts:', error)
      return []
    }
  }

  /**
   * Cross-reference diesel part numbers
   */
  async crossReferenceDieselPart(partNumber: string): Promise<{
    originalPart: DieselPart | null
    crossReferences: {
      partNumber: string
      brand: string
      description: string
      price: string
      availability: string
      supplier: string
    }[]
    compatibleEngines: string[]
  }> {
    try {
      // Mock cross-reference search
      const originalPart = await this.searchDieselParts('', '', '', '', '')
      const foundPart = originalPart.find(p => 
        p.partNumber === partNumber || 
        p.oemPartNumber === partNumber ||
        p.crossReferences.includes(partNumber)
      )

      const crossReferences = [
        {
          partNumber: '0445020007',
          brand: 'Bosch',
          description: 'CP3 Injection Pump - Alternative',
          price: '$1,750.00',
          availability: 'in-stock',
          supplier: 'Bosch Diesel'
        },
        {
          partNumber: 'CP3-REMAN-002',
          brand: 'Diesel Pro',
          description: 'Remanufactured CP3 Pump',
          price: '$1,650.00',
          availability: 'limited',
          supplier: 'Diesel Pro Parts'
        }
      ]

      const compatibleEngines = [
        'Cummins 6.7L ISB',
        'Cummins 5.9L ISB',
        'Cummins B Series'
      ]

      return {
        originalPart: foundPart || null,
        crossReferences,
        compatibleEngines
      }
    } catch (error) {
      console.error('Error cross-referencing diesel part:', error)
      return {
        originalPart: null,
        crossReferences: [],
        compatibleEngines: []
      }
    }
  }

  /**
   * Get diesel engine specifications
   */
  getDieselEngineSpecs(engineSeries: string): DieselEngine | null {
    return this.dieselEngines.find(engine => 
      engine.series.toLowerCase().includes(engineSeries.toLowerCase())
    ) || null
  }

  /**
   * Get all supported diesel engines
   */
  getSupportedEngines(): DieselEngine[] {
    return [...this.dieselEngines]
  }

  /**
   * Search for diesel parts by symptom or problem
   */
  async searchBySymptom(symptom: string, engine?: string): Promise<{
    symptom: string
    possibleCauses: string[]
    recommendedParts: DieselPart[]
    diagnosticSteps: string[]
  }[]> {
    try {
      // Mock symptom-based part recommendations
      const symptomDatabase = [
        {
          symptom: 'hard starting cold',
          possibleCauses: [
            'Glow plug failure',
            'Low compression',
            'Fuel delivery issue',
            'Battery weak'
          ],
          recommendedParts: await this.searchDieselParts(engine || 'Cummins', 'Fuel System'),
          diagnosticSteps: [
            'Check glow plug resistance',
            'Test compression',
            'Verify fuel pressure',
            'Load test battery'
          ]
        },
        {
          symptom: 'black smoke',
          possibleCauses: [
            'Clogged air filter',
            'Faulty injectors',
            'Turbo problems',
            'EGR issues'
          ],
          recommendedParts: await this.searchDieselParts(engine || 'Duramax', 'Engine'),
          diagnosticSteps: [
            'Inspect air filter',
            'Test injector balance rates',
            'Check boost pressure',
            'Scan for EGR codes'
          ]
        }
      ]

      return symptomDatabase.filter(item => 
        item.symptom.toLowerCase().includes(symptom.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching by symptom:', error)
      return []
    }
  }

  /**
   * Get diesel maintenance schedules and parts
   */
  getDieselMaintenanceSchedule(engine: string, mileage: number): {
    interval: string
    mileage: string
    services: {
      service: string
      parts: string[]
      laborHours: string
    }[]
  }[] {
    // Mock diesel maintenance schedule
    const schedule = [
      {
        interval: 'Every 7,500 miles',
        mileage: '7,500',
        services: [
          {
            service: 'Oil & Filter Change',
            parts: ['Engine Oil (15W-40)', 'Oil Filter', 'Drain Plug Gasket'],
            laborHours: '0.5'
          }
        ]
      },
      {
        interval: 'Every 15,000 miles',
        mileage: '15,000',
        services: [
          {
            service: 'Fuel Filter Replacement',
            parts: ['Primary Fuel Filter', 'Secondary Fuel Filter', 'Filter Housing O-Rings'],
            laborHours: '1.0'
          }
        ]
      },
      {
        interval: 'Every 30,000 miles',
        mileage: '30,000',
        services: [
          {
            service: 'Air Filter & Differential Service',
            parts: ['Engine Air Filter', 'Differential Oil', 'Diff Cover Gasket'],
            laborHours: '1.5'
          }
        ]
      }
    ]

    return schedule.filter(item => 
      parseInt(item.mileage) <= mileage + 7500 && parseInt(item.mileage) >= mileage - 7500
    )
  }
}

// Singleton instance
export const dieselPartsService = new DieselPartsService()