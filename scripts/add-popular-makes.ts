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

const POPULAR_MAKE_NAMES = [
  'FORD', 'CHEVROLET', 'TOYOTA', 'HONDA', 'NISSAN', 'RAM', 'JEEP',
  'HYUNDAI', 'KIA', 'SUBARU', 'MERCEDES-BENZ', 'AUDI', 'LEXUS', 'GMC', 'BMW'
]

async function main() {
  console.log('🚀 Fetching and adding popular automotive makes...\n')

  const allMakes = await nhtsaAPI.getAllMakes()
  let added = 0
  let skipped = 0

  for (const makeName of POPULAR_MAKE_NAMES) {
    const nhtsaMake = allMakes.find(m => m.Make_Name.toUpperCase() === makeName)

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

    // Add make
    await db.insert(vehicleMakes).values({
      makeId: nhtsaMake.Make_ID,
      makeName: nhtsaMake.Make_Name,
      category: 'automotive'
    })

    console.log(`✅ Added ${nhtsaMake.Make_Name}`)
    added++
  }

  console.log(`\n📊 Results: ${added} added, ${skipped} already existed`)
}

main()
