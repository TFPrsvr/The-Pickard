// Charm.li Integration - Free Automotive Service Manuals & Diagrams
// Website: https://charm.li - "Free Car Service Manuals from Operation CHARM — No strings attached!"

export interface ServiceManual {
  brand: string
  model: string
  year: string
  manualType: 'service' | 'wiring' | 'parts' | 'repair'
  title: string
  url: string
  description: string
  sections: string[]
  pageCount?: number
  fileSize?: string
  language: string
}

export interface WiringDiagram {
  vehicleInfo: {
    make: string
    model: string
    year: string
    system: string
  }
  diagramType: 'electrical' | 'engine' | 'transmission' | 'hvac' | 'brake' | 'fuel'
  title: string
  description: string
  imageUrl: string
  pdfUrl?: string
  sections: {
    name: string
    components: string[]
    wireColors: string[]
    connectorInfo: string[]
  }[]
}

export interface TechnicalBulletin {
  bulletinId: string
  make: string
  model: string
  years: string[]
  category: string
  title: string
  description: string
  severity: 'critical' | 'important' | 'moderate' | 'low'
  affectedSystems: string[]
  symptoms: string[]
  solution: string
  partNumbers: string[]
  laborTime: string
  tools: string[]
}

export class CharmLiService {
  private readonly baseUrl = 'https://charm.li'
  private readonly supportedBrands = [
    'Acura', 'Alfa Romeo', 'AM General', 'Aston Martin', 'Audi', 'Bentley', 
    'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Daewoo', 'Daihatsu',
    'Dodge', 'Eagle', 'Ferrari', 'Fiat', 'Ford', 'Geo', 'GMC', 'Honda',
    'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'Kia',
    'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Maserati',
    'Mazda', 'McLaren', 'Mercedes-Benz', 'Mercury', 'Mini', 'Mitsubishi',
    'Nissan', 'Oldsmobile', 'Peugeot', 'Plymouth', 'Pontiac', 'Porsche',
    'Ram', 'Rolls-Royce', 'Saab', 'Saturn', 'Scion', 'Smart', 'Subaru',
    'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Yugo'
  ]

  /**
   * Search for service manuals by vehicle information
   */
  async searchServiceManuals(
    make: string, 
    model: string, 
    year: string
  ): Promise<ServiceManual[]> {
    try {
      // Mock data representing what would come from charm.li
      const mockManuals: ServiceManual[] = [
        {
          brand: make,
          model: model,
          year: year,
          manualType: 'service',
          title: `${year} ${make} ${model} Complete Service Manual`,
          url: `${this.baseUrl}/manuals/${make.toLowerCase()}/${model.toLowerCase()}/${year}/service.pdf`,
          description: `Complete factory service manual covering all systems, maintenance procedures, and repair instructions for the ${year} ${make} ${model}.`,
          sections: [
            'Engine Mechanical',
            'Engine Electrical',
            'Emission Control',
            'Fuel System',
            'Cooling System',
            'Lubrication System',
            'Transmission',
            'Driveline/Axle',
            'Suspension',
            'Steering',
            'Brake System',
            'Body Electrical',
            'Climate Control',
            'Body/Interior',
            'Restraint System'
          ],
          pageCount: 2847,
          fileSize: '156 MB',
          language: 'English'
        },
        {
          brand: make,
          model: model,
          year: year,
          manualType: 'wiring',
          title: `${year} ${make} ${model} Electrical Wiring Diagrams`,
          url: `${this.baseUrl}/manuals/${make.toLowerCase()}/${model.toLowerCase()}/${year}/wiring.pdf`,
          description: `Complete electrical wiring diagrams and circuit descriptions for all electrical systems.`,
          sections: [
            'Power Distribution',
            'Ground Distribution',
            'Engine Control',
            'Transmission Control',
            'Body Control Module',
            'Instrument Cluster',
            'Lighting Systems',
            'Audio/Navigation',
            'Climate Control',
            'Security System'
          ],
          pageCount: 487,
          fileSize: '42 MB',
          language: 'English'
        }
      ]

      return mockManuals.filter(manual => 
        this.supportedBrands.includes(make) && 
        parseInt(year) >= 1990 && 
        parseInt(year) <= new Date().getFullYear()
      )
    } catch (error) {
      console.error('Error searching charm.li service manuals:', error)
      return []
    }
  }

  /**
   * Get specific wiring diagrams for a system
   */
  async getWiringDiagrams(
    make: string,
    model: string,
    year: string,
    system: string
  ): Promise<WiringDiagram[]> {
    try {
      const mockDiagrams: WiringDiagram[] = [
        {
          vehicleInfo: { make, model, year, system },
          diagramType: 'electrical',
          title: `${system} System Wiring Diagram`,
          description: `Complete wiring diagram for the ${system} system including all components, connectors, and wire routing.`,
          imageUrl: `/images/wiring-diagrams/${make}-${model}-${year}-${system}.png`,
          pdfUrl: `${this.baseUrl}/diagrams/${make}/${model}/${year}/${system}-wiring.pdf`,
          sections: [
            {
              name: 'Power Supply',
              components: ['Fuse', 'Relay', 'Battery', 'Alternator'],
              wireColors: ['Red/Black', 'Yellow', 'Black'],
              connectorInfo: ['C1 - 12-way connector', 'C2 - 6-way connector']
            },
            {
              name: 'Control Module',
              components: ['ECU', 'Sensors', 'Actuators'],
              wireColors: ['Blue/White', 'Green', 'Purple'],
              connectorInfo: ['C3 - 24-way connector', 'C4 - 8-way connector']
            }
          ]
        }
      ]

      return mockDiagrams
    } catch (error) {
      console.error('Error getting wiring diagrams:', error)
      return []
    }
  }

  /**
   * Get technical service bulletins from charm.li database
   */
  async getTechnicalBulletins(
    make: string,
    model: string,
    year: string
  ): Promise<TechnicalBulletin[]> {
    try {
      const mockBulletins: TechnicalBulletin[] = [
        {
          bulletinId: 'TSB-2023-001',
          make,
          model,
          years: [year, (parseInt(year) + 1).toString()],
          category: 'Engine Performance',
          title: 'Engine Knock During Cold Start',
          description: 'Some vehicles may experience engine knock or rattle noise during cold start conditions.',
          severity: 'moderate',
          affectedSystems: ['Engine', 'Fuel System', 'Engine Control'],
          symptoms: [
            'Knocking or rattling noise on cold start',
            'Noise disappears after engine warms up',
            'More pronounced in cold weather'
          ],
          solution: 'Update engine control module software and inspect fuel system components.',
          partNumbers: ['12345-ABC-001', '67890-DEF-002'],
          laborTime: '1.2 hours',
          tools: ['OBD2 Scanner', 'Fuel Pressure Gauge', 'Digital Multimeter']
        },
        {
          bulletinId: 'TSB-2023-002',
          make,
          model,
          years: [year],
          category: 'Electrical',
          title: 'Intermittent Instrument Cluster Malfunction',
          description: 'Instrument cluster may intermittently shut off or display incorrect information.',
          severity: 'important',
          affectedSystems: ['Body Electrical', 'Instrument Cluster'],
          symptoms: [
            'Gauges reading zero intermittently',
            'Warning lights staying on',
            'Display flickering or going blank'
          ],
          solution: 'Replace instrument cluster and update body control module software.',
          partNumbers: ['11111-XYZ-123'],
          laborTime: '2.5 hours',
          tools: ['Scan Tool', 'Digital Multimeter', 'Cluster Programming Tool']
        }
      ]

      return mockBulletins
    } catch (error) {
      console.error('Error getting technical bulletins:', error)
      return []
    }
  }

  /**
   * Get supported brands/manufacturers
   */
  getSupportedBrands(): string[] {
    return [...this.supportedBrands]
  }

  /**
   * Check if a brand is supported by charm.li
   */
  isBrandSupported(make: string): boolean {
    return this.supportedBrands.includes(make)
  }

  /**
   * Get manual sections for a specific vehicle
   */
  async getManualSections(
    make: string,
    model: string,
    year: string,
    manualType: 'service' | 'wiring' | 'parts' | 'repair' = 'service'
  ): Promise<{
    section: string
    subsections: string[]
    pageRange: string
    description: string
  }[]> {
    try {
      const sections = [
        {
          section: 'Engine Mechanical',
          subsections: [
            'Engine Removal & Installation',
            'Cylinder Head Service',
            'Engine Block Service',
            'Crankshaft & Connecting Rods',
            'Pistons & Rings',
            'Camshaft & Timing',
            'Oil Pump & Pan'
          ],
          pageRange: '1-1 to 1-156',
          description: 'Complete engine mechanical repair procedures and specifications.'
        },
        {
          section: 'Engine Electrical',
          subsections: [
            'Ignition System',
            'Charging System',
            'Starting System',
            'Engine Control System',
            'Fuel Injection System'
          ],
          pageRange: '2-1 to 2-89',
          description: 'Engine electrical systems diagnosis and repair procedures.'
        },
        {
          section: 'Transmission',
          subsections: [
            'Automatic Transmission Service',
            'Manual Transmission Service',
            'Clutch System',
            'Driveshaft & CV Joints',
            'Differential Service'
          ],
          pageRange: '7-1 to 7-234',
          description: 'Complete transmission and drivetrain service procedures.'
        }
      ]

      return sections
    } catch (error) {
      console.error('Error getting manual sections:', error)
      return []
    }
  }

  /**
   * Search for specific repair procedures
   */
  async searchRepairProcedures(
    query: string,
    make?: string,
    model?: string,
    year?: string
  ): Promise<{
    title: string
    manual: string
    section: string
    pageNumber: string
    procedure: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    timeEstimate: string
    tools: string[]
    parts: string[]
    safetyWarnings: string[]
  }[]> {
    try {
      const mockProcedures = [
        {
          title: 'Engine Oil Change',
          manual: 'Service Manual',
          section: 'Lubrication System',
          pageNumber: '1L-15',
          procedure: 'Step-by-step oil change procedure with filter replacement.',
          difficulty: 'beginner' as const,
          timeEstimate: '30 minutes',
          tools: ['Oil drain pan', 'Socket wrench', 'Oil filter wrench', 'Funnel'],
          parts: ['Engine oil', 'Oil filter', 'Drain plug gasket'],
          safetyWarnings: [
            'Engine oil may be hot',
            'Wear safety glasses',
            'Dispose of used oil properly'
          ]
        }
      ]

      return mockProcedures.filter(proc => 
        proc.title.toLowerCase().includes(query.toLowerCase()) ||
        proc.procedure.toLowerCase().includes(query.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching repair procedures:', error)
      return []
    }
  }
}

// Singleton instance
export const charmLiService = new CharmLiService()