import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
}

import { db } from '../src/lib/database'
import { vehicleMakes } from '../src/lib/schema'
import { like, or } from 'drizzle-orm'

async function main() {
  console.log('\n🔍 Searching for popular automotive makes...\n')

  const searchTerms = ['Ford', 'Chevrolet', 'Chevy', 'Toyota', 'Honda', 'Nissan', 'RAM', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'Mercedes', 'Audi', 'Lexus', 'GMC', 'BMW']

  for (const term of searchTerms) {
    const makes = await db
      .select()
      .from(vehicleMakes)
      .where(like(vehicleMakes.makeName, `%${term}%`))
      .limit(5)

    if (makes.length > 0) {
      console.log(`${term}:`)
      makes.forEach(make => console.log(`  - "${make.makeName}"`))
    }
  }
}

main()
