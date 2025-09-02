import { db } from '@/lib/database'
import { vehicles, problems, solutions, tips, users } from '@/lib/schema'
import { eq, and, like, gte, lte, inArray } from 'drizzle-orm'
import { SearchFilters, Vehicle, Problem } from '@/types'

export async function searchVehicles(filters: SearchFilters): Promise<Vehicle[]> {
  try {
    let query = db.select().from(vehicles)
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

    // Apply category filter
    if (filters.category?.length) {
      conditions.push(inArray(vehicles.category, filters.category))
    }

    // Combine conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    const results = await query.limit(50) // Limit results for performance
    
    return results.map(vehicle => ({
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
    let query = db.select().from(problems)
    const conditions = []

    if (vehicleId) {
      conditions.push(eq(problems.vehicleId, parseInt(vehicleId)))
    }

    if (searchQuery) {
      conditions.push(like(problems.title, `%${searchQuery}%`))
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    const results = await query.limit(20)
    
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