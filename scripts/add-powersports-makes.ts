import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
}

import { db } from '../src/lib/database'
import { vehicleMakes } from '../src/lib/schema'
import * as nhtsaAPI from '../src/lib/nhtsa-vpic-api'
import { eq } from 'drizzle-orm'

// Popular powersports makes (exact NHTSA names)
const POWERSPORTS_MAKES = [
  // Motorcycles
  'HARLEY-DAVIDSON', 'YAMAHA', 'KAWASAKI', 'SUZUKI', 'DUCATI', 'TRIUMPH',
  'INDIAN', 'CAN-AM', 'KTM', 'HUSQVARNA', 'APRILIA', 'MOTO GUZZI',
  'VICTORY', 'BUELL', 'POLARIS', 'ARCTIC CAT',
  // ATVs/UTVs
  'POLARIS', 'CAN-AM', 'YAMAHA', 'HONDA', 'KAWASAKI', 'SUZUKI',
  // Watercraft
  'SEA-DOO', 'YAMAHA', 'KAWASAKI'
]

async function main() {
  console.log('🏍️  Fetching and adding powersports makes...\n')

  const allMakes = await nhtsaAPI.getAllMakes()
  let added = 0
  let skipped = 0

  // Get unique makes (some brands appear multiple times in list)
  const uniqueMakes = [...new Set(POWERSPORTS_MAKES)]

  for (const makeName of uniqueMakes) {
    const nhtsaMake = allMakes.find(m => m.Make_Name.toUpperCase() === makeName.toUpperCase())

    if (!nhtsaMake) {
      console.log(`⚠️  ${makeName} not found in NHTSA database`)
      continue
    }

    // Check if already exists
    const [existing] = await db
      .select()
      .from(vehicleMakes)
      .where(eq(vehicleMakes.makeName, nhtsaMake.Make_Name))
      .limit(1)

    if (existing) {
      console.log(`✅ ${nhtsaMake.Make_Name} already exists`)
      skipped++
      continue
    }

    // Add make with powersports category
    await db.insert(vehicleMakes).values({
      makeId: nhtsaMake.Make_ID,
      makeName: nhtsaMake.Make_Name,
      category: 'powersports'
    })

    console.log(`✅ Added ${nhtsaMake.Make_Name}`)
    added++
  }

  console.log(`\n📊 Results: ${added} added, ${skipped} already existed`)
}

main()
