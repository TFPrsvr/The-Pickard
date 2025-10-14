import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
}

import { db } from '../src/lib/database'
import { vehicleMakes } from '../src/lib/schema'
import { eq, inArray } from 'drizzle-orm'

const POWERSPORTS_MAKES = [
  'HARLEY-DAVIDSON', 'YAMAHA', 'KAWASAKI', 'SUZUKI', 'DUCATI', 'TRIUMPH',
  'CAN-AM', 'KTM', 'HUSQVARNA', 'APRILIA', 'MOTO GUZZI',
  'VICTORY', 'BUELL', 'POLARIS', 'ARCTIC CAT', 'HONDA'
]

async function fixCategories() {
  console.log('Updating powersports make categories...\n')

  for (const makeName of POWERSPORTS_MAKES) {
    const result = await db
      .update(vehicleMakes)
      .set({ category: 'powersports' })
      .where(eq(vehicleMakes.makeName, makeName))

    console.log(`Updated ${makeName} to powersports`)
  }

  console.log('\nDone!')
  process.exit(0)
}

fixCategories().catch(console.error)
