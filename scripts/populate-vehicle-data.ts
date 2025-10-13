/**
 * Vehicle Data Population Script
 *
 * This script populates the database with real vehicle data from NHTSA vPIC API
 *
 * Usage:
 *   npm run populate-vehicles
 *
 * Or with options:
 *   npm run populate-vehicles -- --year-start=2020 --year-end=2025 --makes=Ford,Chevrolet
 */

// Load environment variables FIRST using require() to avoid import hoisting
import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

// Try to load .env.local before any other imports
const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
  console.log('✅ Loaded environment variables from .env.local')
} else {
  console.log('⚠️  .env.local not found, using system environment variables')
}

import { db } from '../src/lib/database'
import {
  vehicleMakes,
  vehicleModels,
  vehicleYearMakeModels,
  vehicleEngines,
  vehicleDriveTypes,
  vehicleTrims
} from '../src/lib/schema'
import * as nhtsaAPI from '../src/lib/nhtsa-vpic-api'
import { eq, and } from 'drizzle-orm'

// Configuration
const DEFAULT_YEAR_START = 2015
const DEFAULT_YEAR_END = new Date().getFullYear() + 1

// Popular makes to prioritize (must match exact NHTSA names in database)
const POPULAR_MAKES = [
  'FORD', 'CHEVROLET', 'TOYOTA', 'HONDA', 'NISSAN', 'RAM', 'GMC', 'JEEP',
  'HYUNDAI', 'KIA', 'SUBARU', 'BMW', 'MERCEDES-BENZ', 'AUDI', 'LEXUS'
]

interface PopulationStats {
  makesAdded: number
  modelsAdded: number
  yearMakeModelsAdded: number
  enginesAdded: number
  driveTypesAdded: number
  errors: string[]
}

const stats: PopulationStats = {
  makesAdded: 0,
  modelsAdded: 0,
  yearMakeModelsAdded: 0,
  enginesAdded: 0,
  driveTypesAdded: 0,
  errors: []
}

/**
 * Parse command line arguments
 */
function parseArgs(): {
  yearStart: number
  yearEnd: number
  makes?: string[]
  populateMakes?: boolean
  populateModels?: boolean
  populateEngines?: boolean
} {
  const args = process.argv.slice(2)
  const config: any = {
    yearStart: DEFAULT_YEAR_START,
    yearEnd: DEFAULT_YEAR_END,
    populateMakes: true,
    populateModels: true,
    populateEngines: false // Engines require more complex logic, default off
  }

  args.forEach(arg => {
    if (arg.startsWith('--year-start=')) {
      config.yearStart = parseInt(arg.split('=')[1])
    }
    if (arg.startsWith('--year-end=')) {
      config.yearEnd = parseInt(arg.split('=')[1])
    }
    if (arg.startsWith('--makes=')) {
      config.makes = arg.split('=')[1].split(',')
    }
    if (arg === '--skip-makes') {
      config.populateMakes = false
    }
    if (arg === '--skip-models') {
      config.populateModels = false
    }
    if (arg === '--with-engines') {
      config.populateEngines = true
    }
  })

  return config
}

/**
 * Step 1: Populate vehicle makes
 */
async function populateMakes(): Promise<void> {
  console.log('\n📋 Step 1: Fetching and populating vehicle makes...')

  try {
    const allMakes = await nhtsaAPI.getAllMakes()
    console.log(`   Found ${allMakes.length} makes from NHTSA vPIC`)

    for (const make of allMakes) {
      try {
        // Check if make already exists
        const existing = await db
          .select()
          .from(vehicleMakes)
          .where(eq(vehicleMakes.makeName, make.Make_Name))
          .limit(1)

        if (existing.length > 0) {
          console.log(`   ⏭️  Skipping ${make.Make_Name} (already exists)`)
          continue
        }

        // Insert new make
        await db.insert(vehicleMakes).values({
          makeId: make.Make_ID,
          makeName: make.Make_Name,
          category: 'automotive' // Default to automotive, can be updated manually for powersports
        })

        stats.makesAdded++
        console.log(`   ✅ Added ${make.Make_Name}`)
      } catch (error) {
        stats.errors.push(`Error adding make ${make.Make_Name}: ${error}`)
        console.error(`   ❌ Error adding ${make.Make_Name}:`, error)
      }
    }

    console.log(`\n✅ Completed: Added ${stats.makesAdded} makes`)
  } catch (error) {
    console.error('❌ Error fetching makes:', error)
    throw error
  }
}

/**
 * Step 2: Populate models for each make
 */
async function populateModels(makes?: string[]): Promise<void> {
  console.log('\n📋 Step 2: Fetching and populating vehicle models...')

  // Get makes from database
  const dbMakes = makes && makes.length > 0
    ? await db.select().from(vehicleMakes).where(
        eq(vehicleMakes.makeName, makes[0]) // TODO: Support multiple makes filter
      )
    : await db.select().from(vehicleMakes)

  console.log(`   Processing ${dbMakes.length} makes`)

  for (const make of dbMakes) {
    try {
      console.log(`\n   🔍 Fetching models for ${make.makeName}...`)
      const models = await nhtsaAPI.getModelsForMake(make.makeName)
      console.log(`      Found ${models.length} models`)

      for (const model of models) {
        try {
          // Check if model already exists
          const existing = await db
            .select()
            .from(vehicleModels)
            .where(
              and(
                eq(vehicleModels.makeId, make.id),
                eq(vehicleModels.modelName, model.Model_Name)
              )
            )
            .limit(1)

          if (existing.length > 0) {
            continue
          }

          // Insert new model
          await db.insert(vehicleModels).values({
            makeId: make.id,
            modelId: model.Model_ID,
            modelName: model.Model_Name,
            category: 'car' // Default, can be refined later
          })

          stats.modelsAdded++
        } catch (error) {
          stats.errors.push(`Error adding model ${model.Model_Name}: ${error}`)
        }
      }

      console.log(`      ✅ Added models for ${make.makeName}`)

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      stats.errors.push(`Error processing make ${make.makeName}: ${error}`)
      console.error(`   ❌ Error processing ${make.makeName}:`, error)
    }
  }

  console.log(`\n✅ Completed: Added ${stats.modelsAdded} models`)
}

/**
 * Step 3: Populate year/make/model combinations
 */
async function populateYearMakeModels(yearStart: number, yearEnd: number, makes?: string[]): Promise<void> {
  console.log(`\n📋 Step 3: Populating year/make/model combinations (${yearStart}-${yearEnd})...`)

  const targetMakes = makes || POPULAR_MAKES

  for (const makeName of targetMakes) {
    try {
      // Get make from database
      const [make] = await db
        .select()
        .from(vehicleMakes)
        .where(eq(vehicleMakes.makeName, makeName))
        .limit(1)

      if (!make) {
        console.log(`   ⚠️  Make ${makeName} not found in database, skipping`)
        continue
      }

      console.log(`\n   🔍 Processing ${makeName} (${yearStart}-${yearEnd})...`)

      for (let year = yearStart; year <= yearEnd; year++) {
        try {
          const models = await nhtsaAPI.getModelsForMakeYear(makeName, year)

          if (models.length === 0) {
            continue
          }

          for (const model of models) {
            try {
              // Get or create model
              let [dbModel] = await db
                .select()
                .from(vehicleModels)
                .where(
                  and(
                    eq(vehicleModels.makeId, make.id),
                    eq(vehicleModels.modelName, model.Model_Name)
                  )
                )
                .limit(1)

              if (!dbModel) {
                // Create model if it doesn't exist
                [dbModel] = await db
                  .insert(vehicleModels)
                  .values({
                    makeId: make.id,
                    modelId: model.Model_ID,
                    modelName: model.Model_Name,
                    category: 'car'
                  })
                  .returning()

                stats.modelsAdded++
              }

              // Check if year/make/model combo exists
              const existing = await db
                .select()
                .from(vehicleYearMakeModels)
                .where(
                  and(
                    eq(vehicleYearMakeModels.year, year),
                    eq(vehicleYearMakeModels.makeId, make.id),
                    eq(vehicleYearMakeModels.modelId, dbModel.id)
                  )
                )
                .limit(1)

              if (existing.length > 0) {
                continue
              }

              // Insert year/make/model combination
              await db.insert(vehicleYearMakeModels).values({
                year,
                makeId: make.id,
                modelId: dbModel.id
              })

              stats.yearMakeModelsAdded++
            } catch (error) {
              stats.errors.push(`Error adding ${year} ${makeName} ${model.Model_Name}: ${error}`)
            }
          }

          console.log(`      ✅ ${year} - ${models.length} models`)

          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 200))
        } catch (error) {
          stats.errors.push(`Error processing ${year} ${makeName}: ${error}`)
        }
      }
    } catch (error) {
      stats.errors.push(`Error processing make ${makeName}: ${error}`)
      console.error(`   ❌ Error processing ${makeName}:`, error)
    }
  }

  console.log(`\n✅ Completed: Added ${stats.yearMakeModelsAdded} year/make/model combinations`)
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Vehicle Data Population Script')
  console.log('==========================================\n')

  const config = parseArgs()

  console.log('Configuration:')
  console.log(`  Year Range: ${config.yearStart} - ${config.yearEnd}`)
  console.log(`  Makes: ${config.makes ? config.makes.join(', ') : 'ALL (default popular makes)'}`)
  console.log(`  Populate Makes: ${config.populateMakes}`)
  console.log(`  Populate Models: ${config.populateModels}`)
  console.log(`  Populate Engines: ${config.populateEngines}`)

  try {
    if (config.populateMakes) {
      await populateMakes()
    }

    if (config.populateModels) {
      await populateModels(config.makes)
    }

    // Always populate year/make/model combinations
    await populateYearMakeModels(config.yearStart, config.yearEnd, config.makes)

    console.log('\n\n📊 Final Statistics:')
    console.log('===================')
    console.log(`Makes Added: ${stats.makesAdded}`)
    console.log(`Models Added: ${stats.modelsAdded}`)
    console.log(`Year/Make/Model Combinations: ${stats.yearMakeModelsAdded}`)
    console.log(`Engines Added: ${stats.enginesAdded}`)
    console.log(`Drive Types Added: ${stats.driveTypesAdded}`)
    console.log(`Errors: ${stats.errors.length}`)

    if (stats.errors.length > 0) {
      console.log('\n⚠️  Errors encountered:')
      stats.errors.slice(0, 10).forEach(error => console.log(`   - ${error}`))
      if (stats.errors.length > 10) {
        console.log(`   ... and ${stats.errors.length - 10} more`)
      }
    }

    console.log('\n✅ Vehicle data population completed successfully!')
  } catch (error) {
    console.error('\n❌ Fatal error during population:', error)
    process.exit(1)
  }
}

// Run the script
main()
