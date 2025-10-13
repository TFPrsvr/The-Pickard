import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
}

import { db } from '../src/lib/database'
import { vehicleMakes, vehicleModels, vehicleYearMakeModels } from '../src/lib/schema'
import * as nhtsaAPI from '../src/lib/nhtsa-vpic-api'
import { eq, and } from 'drizzle-orm'

// Configuration
const DEFAULT_YEAR_START = 2010
const DEFAULT_YEAR_END = new Date().getFullYear() + 1

// Powersports makes (exact NHTSA names that exist in database)
const POWERSPORTS_MAKES = [
  'HARLEY-DAVIDSON', 'YAMAHA', 'KAWASAKI', 'SUZUKI', 'DUCATI', 'TRIUMPH',
  'CAN-AM', 'KTM', 'HUSQVARNA', 'APRILIA', 'MOTO GUZZI',
  'VICTORY', 'BUELL', 'POLARIS', 'ARCTIC CAT', 'HONDA'
]

interface PopulationStats {
  modelsAdded: number
  yearMakeModelsAdded: number
  errors: string[]
}

const stats: PopulationStats = {
  modelsAdded: 0,
  yearMakeModelsAdded: 0,
  errors: []
}

/**
 * Parse command line arguments
 */
function parseArgs(): {
  yearStart: number
  yearEnd: number
  makes?: string[]
} {
  const args = process.argv.slice(2)
  const config: any = {
    yearStart: DEFAULT_YEAR_START,
    yearEnd: DEFAULT_YEAR_END
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
  })

  return config
}

/**
 * Populate powersports year/make/model combinations
 */
async function populatePowersportsData(yearStart: number, yearEnd: number, makes?: string[]): Promise<void> {
  console.log(`\n🏍️  Populating powersports data (${yearStart}-${yearEnd})...\n`)

  const targetMakes = makes || POWERSPORTS_MAKES

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
                    category: 'motorcycle' // Default category for powersports
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

          if (models.length > 0) {
            console.log(`      ✅ ${year} - ${models.length} models`)
          }

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

  console.log(`\n✅ Completed: Added ${stats.yearMakeModelsAdded} powersports year/make/model combinations`)
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Powersports Data Population Script')
  console.log('==============================================\n')

  const config = parseArgs()

  console.log('Configuration:')
  console.log(`  Year Range: ${config.yearStart} - ${config.yearEnd}`)
  console.log(`  Makes: ${config.makes ? config.makes.join(', ') : 'ALL powersports makes'}`)

  try {
    await populatePowersportsData(config.yearStart, config.yearEnd, config.makes)

    console.log('\n\n📊 Final Statistics:')
    console.log('===================')
    console.log(`Models Added: ${stats.modelsAdded}`)
    console.log(`Year/Make/Model Combinations: ${stats.yearMakeModelsAdded}`)
    console.log(`Errors: ${stats.errors.length}`)

    if (stats.errors.length > 0) {
      console.log('\n⚠️  Errors encountered:')
      stats.errors.slice(0, 10).forEach(error => console.log(`   - ${error}`))
      if (stats.errors.length > 10) {
        console.log(`   ... and ${stats.errors.length - 10} more`)
      }
    }

    console.log('\n✅ Powersports data population completed successfully!')
  } catch (error) {
    console.error('\n❌ Fatal error during population:', error)
    process.exit(1)
  }
}

// Run the script
main()
