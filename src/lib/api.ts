import { db } from '@/lib/database'
import { vehicles, problems, solutions, tips, users } from '@/lib/schema'
import { eq, and, like, gte, lte, inArray } from 'drizzle-orm'
import { SearchFilters, Vehicle, Problem } from '@/types'

export async function searchVehicles(filters: SearchFilters): Promise<Vehicle[]> {
  try {
    const conditions = []

    // Apply year filter
    if (filters.year?.length) {
      const [yearFrom, yearTo] = filters.year
      if (yearFrom && yearTo) {
        conditions.push(and(gte(vehicles.year, yearFrom), lte(vehicles.year, yearTo)))
      } else if (yearFrom) {
        conditions.push(gte(vehicles.year, yearFrom))
      } else if (yearTo) {
        conditions.push(lte(vehicles.year, yearTo))
      }
    }

    // Apply make filter
    if (filters.make?.length) {
      conditions.push(inArray(vehicles.make, filters.make))
    }

    // Apply model filter
    if (filters.model?.length) {
      const modelConditions = filters.model.map(model => like(vehicles.model, `%${model}%`))
      if (modelConditions.length === 1) {
        conditions.push(modelConditions[0])
      } else if (modelConditions.length > 1) {
        // For multiple models, we'd need OR logic - simplified for now
        conditions.push(modelConditions[0])
      }
    }

    // Apply engine type filter
    if (filters.engineType?.length) {
      conditions.push(inArray(vehicles.engineType, filters.engineType))
    }

    // Apply drive type filter
    if (filters.driveType?.length) {
      conditions.push(inArray(vehicles.driveType, filters.driveType))
    }

    // Apply submodel filter (search in specialty field)
    if (filters.submodel?.length) {
      const submodelConditions = filters.submodel.map(submodel => like(vehicles.specialty, `%${submodel}%`))
      if (submodelConditions.length === 1) {
        conditions.push(submodelConditions[0])
      } else if (submodelConditions.length > 1) {
        // For multiple submodels, use the first one - simplified for now
        conditions.push(submodelConditions[0])
      }
    }

    // Execute query with conditions
    const results = conditions.length > 0 
      ? await db.select().from(vehicles).where(and(...conditions)).limit(50)
      : await db.select().from(vehicles).limit(50)
    
    interface VehicleResult {
      id: number;
      year: number;
      make: string;
      model: string;
      engineType: string;
      driveType: string;
      category: string;
      specialty: string | null;
    }

    interface VehicleOutput {
      id: string;
      year: number;
      make: string;
      model: string;
      engineType: string;
      driveType: 'AWD' | '2WD' | '4WD';
      category: 'car' | 'truck' | '18-wheeler';
      specialty?: string;
    }

        return results.map((vehicle: VehicleResult): VehicleOutput => ({
          id: vehicle.id.toString(),
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          engineType: vehicle.engineType,
          driveType: vehicle.driveType as 'AWD' | '2WD' | '4WD',
          category: vehicle.category as 'car' | 'truck' | '18-wheeler',
          specialty: vehicle.specialty || undefined,
        }))
  } catch (error) {
    console.error('Error searching vehicles:', error)
    return []
  }
}

export async function searchProblems(vehicleId?: string, searchQuery?: string): Promise<Problem[]> {
  try {
    const baseQuery = db.select().from(problems)
    const conditions = []

    if (vehicleId) {
      conditions.push(eq(problems.vehicleId, parseInt(vehicleId)))
    }

    if (searchQuery) {
      conditions.push(like(problems.title, `%${searchQuery}%`))
    }

    const results = await (conditions.length > 0
      ? baseQuery.where(and(...conditions)).limit(20)
      : baseQuery.limit(20))
    
    return results.map(problem => ({
      id: problem.id.toString(),
      vehicleId: problem.vehicleId?.toString() || '',
      title: problem.title,
      description: problem.description,
      symptoms: problem.symptoms || [],
      solutions: [], // Would need to join with solutions table
      commonality: problem.commonality as 'common' | 'uncommon' | 'rare',
      difficulty: problem.difficulty as 'easy' | 'medium' | 'hard',
      estimatedTime: problem.estimatedTime || '',
    }))
  } catch (error) {
    console.error('Error searching problems:', error)
    return []
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const result = await db.select().from(vehicles).where(eq(vehicles.id, parseInt(id))).limit(1)
    
    if (result.length === 0) return null

    const vehicle = result[0]
    return {
      id: vehicle.id.toString(),
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      engineType: vehicle.engineType,
      driveType: vehicle.driveType as 'AWD' | '2WD' | '4WD',
      category: vehicle.category as 'car' | 'truck' | '18-wheeler',
      specialty: vehicle.specialty || undefined,
    }
  } catch (error) {
    console.error('Error getting vehicle:', error)
    return null
  }
}

export async function getProblemById(id: string): Promise<Problem | null> {
  try {
    const result = await db.select().from(problems).where(eq(problems.id, parseInt(id))).limit(1)
    
    if (result.length === 0) return null

    const problem = result[0]
    return {
      id: problem.id.toString(),
      vehicleId: problem.vehicleId?.toString() || '',
      title: problem.title,
      description: problem.description,
      symptoms: problem.symptoms || [],
      solutions: [], // Would need to join with solutions table
      commonality: problem.commonality as 'common' | 'uncommon' | 'rare',
      difficulty: problem.difficulty as 'easy' | 'medium' | 'hard',
      estimatedTime: problem.estimatedTime || '',
    }
  } catch (error) {
    console.error('Error getting problem:', error)
    return null
  }
}

// Web scraping functions for external data
export async function scrapeVehicleData(make: string, model: string, year: number) {
  try {
    // This would integrate with external APIs like:
    // - NHTSA Vehicle API
    // - Edmunds API
    // - CarMD API
    // - RepairPal API
    
    // For now, return mock data structure
    return {
      commonProblems: [
        {
          title: `Common ${year} ${make} ${model} transmission issue`,
          description: 'Scraped from automotive forums and databases',
          symptoms: ['Gear slipping', 'Delayed engagement'],
          solutions: ['Transmission fluid change', 'Filter replacement']
        }
      ],
      recalls: [],
      specifications: {
        engineOptions: ['V6', 'V8'],
        driveTypes: ['2WD', '4WD'],
        transmissionTypes: ['Manual', 'Automatic']
      }
    }
  } catch (error) {
    console.error('Error scraping vehicle data:', error)
    return null
  }
}

export async function scrapePartCompatibility(partNumber: string) {
  try {
    // This would scrape from:
    // - RockAuto
    // - AutoZone
    // - Advance Auto Parts
    // - Parts catalogs
    
    return {
      compatibleVehicles: [
        { year: 2019, make: 'Ford', model: 'F-150' },
        { year: 2020, make: 'Ford', model: 'F-150' }
      ],
      interchangeableParts: ['ABC123', 'DEF456'],
      pricing: [
        { source: 'AutoZone', price: 89.99 },
        { source: 'RockAuto', price: 67.50 }
      ]
    }
  } catch (error) {
    console.error('Error scraping part data:', error)
    return null
  }
}