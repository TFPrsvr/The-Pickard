import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
}

import { db } from '../src/lib/database'
import { vehicleMakes } from '../src/lib/schema'
import { eq } from 'drizzle-orm'

async function verifyCategories() {
  console.log('VERIFYING CATEGORY FILTERING\n')
  console.log('=' .repeat(60) + '\n')

  // Get automotive makes
  const automotiveMakes = await db
    .select()
    .from(vehicleMakes)
    .where(eq(vehicleMakes.category, 'automotive'))

  console.log('AUTOMOTIVE MAKES (' + automotiveMakes.length + '):')
  console.log('-'.repeat(60))
  automotiveMakes.forEach(make => {
    console.log('  - ' + make.makeName)
  })

  console.log('\n')

  // Get powersports makes
  const powersportsMakes = await db
    .select()
    .from(vehicleMakes)
    .where(eq(vehicleMakes.category, 'powersports'))

  console.log('POWERSPORTS MAKES (' + powersportsMakes.length + '):')
  console.log('-'.repeat(60))
  powersportsMakes.forEach(make => {
    console.log('  - ' + make.makeName)
  })

  console.log('\n')
  console.log('=' .repeat(60))
  console.log('SUMMARY:')
  console.log('  Automotive: ' + automotiveMakes.length + ' makes')
  console.log('  Powersports: ' + powersportsMakes.length + ' makes')
  console.log('  Total: ' + (automotiveMakes.length + powersportsMakes.length) + ' makes')

  process.exit(0)
}

verifyCategories().catch(console.error)
