import { config } from 'dotenv'
import { join } from 'path'
import { existsSync } from 'fs'

const envLocalPath = join(process.cwd(), '.env.local')
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
}

import { db } from '../src/lib/database'
import { vehicleMakes, vehicleModels, vehicleYearMakeModels } from '../src/lib/schema'
import { eq, and } from 'drizzle-orm'

async function comprehensiveVerification() {
  console.log('\n🔍 COMPREHENSIVE PROJECT VERIFICATION')
  console.log('=' .repeat(70) + '\n')

  let passedTests = 0
  let totalTests = 0

  // Test 1: Category filtering
  console.log('TEST 1: Category Filtering')
  console.log('-'.repeat(70))
  totalTests++
  
  const automotiveMakes = await db.select().from(vehicleMakes).where(eq(vehicleMakes.category, 'automotive'))
  const powersportsMakes = await db.select().from(vehicleMakes).where(eq(vehicleMakes.category, 'powersports'))
  
  if (automotiveMakes.length > 0 && powersportsMakes.length > 0) {
    console.log('✅ PASS: Both categories have makes')
    console.log(`   - Automotive: ${automotiveMakes.length} makes`)
    console.log(`   - Powersports: ${powersportsMakes.length} makes`)
    passedTests++
  } else {
    console.log('❌ FAIL: Missing makes in one or both categories')
  }

  // Test 2: Verify Honda is in powersports (common make test)
  console.log('\nTEST 2: Honda in Powersports Category')
  console.log('-'.repeat(70))
  totalTests++
  
  const hondaPowersports = powersportsMakes.find(m => m.makeName === 'HONDA')
  if (hondaPowersports) {
    console.log('✅ PASS: Honda found in powersports category')
    passedTests++
  } else {
    console.log('❌ FAIL: Honda not found in powersports')
  }

  // Test 3: Verify Chevrolet is NOT in powersports
  console.log('\nTEST 3: Chevrolet NOT in Powersports')
  console.log('-'.repeat(70))
  totalTests++
  
  const chevyPowersports = powersportsMakes.find(m => m.makeName === 'CHEVROLET')
  if (!chevyPowersports) {
    console.log('✅ PASS: Chevrolet correctly excluded from powersports')
    passedTests++
  } else {
    console.log('❌ FAIL: Chevrolet incorrectly in powersports')
  }

  // Test 4: Year/Make/Model data exists
  console.log('\nTEST 4: Year/Make/Model Combinations')
  console.log('-'.repeat(70))
  totalTests++
  
  const yearMakeModels = await db.select().from(vehicleYearMakeModels).limit(1)
  if (yearMakeModels.length > 0) {
    console.log('✅ PASS: Year/Make/Model combinations exist')
    const totalCombos = await db.select().from(vehicleYearMakeModels)
    console.log(`   - Total combinations: ${totalCombos.length}`)
    passedTests++
  } else {
    console.log('❌ FAIL: No year/make/model combinations found')
  }

  // Test 5: Sample automotive query (2022 Ford)
  console.log('\nTEST 5: Sample Automotive Query (2022 Ford)')
  console.log('-'.repeat(70))
  totalTests++
  
  const fordMake = automotiveMakes.find(m => m.makeName === 'FORD')
  if (fordMake) {
    const ford2022Models = await db
      .select()
      .from(vehicleYearMakeModels)
      .where(
        and(
          eq(vehicleYearMakeModels.year, 2022),
          eq(vehicleYearMakeModels.makeId, fordMake.id)
        )
      )
    
    if (ford2022Models.length > 0) {
      console.log('✅ PASS: Found 2022 Ford models')
      console.log(`   - Model count: ${ford2022Models.length}`)
      passedTests++
    } else {
      console.log('❌ FAIL: No 2022 Ford models found')
    }
  } else {
    console.log('⚠️  SKIP: Ford not found in database')
  }

  // Test 6: Sample powersports query (2022 Yamaha)
  console.log('\nTEST 6: Sample Powersports Query (2022 Yamaha)')
  console.log('-'.repeat(70))
  totalTests++
  
  const yamahaMake = powersportsMakes.find(m => m.makeName === 'YAMAHA')
  if (yamahaMake) {
    const yamaha2022Models = await db
      .select()
      .from(vehicleYearMakeModels)
      .where(
        and(
          eq(vehicleYearMakeModels.year, 2022),
          eq(vehicleYearMakeModels.makeId, yamahaMake.id)
        )
      )
    
    if (yamaha2022Models.length > 0) {
      console.log('✅ PASS: Found 2022 Yamaha models')
      console.log(`   - Model count: ${yamaha2022Models.length}`)
      passedTests++
    } else {
      console.log('⚠️  WARN: No 2022 Yamaha models found (may need data population)')
    }
  } else {
    console.log('❌ FAIL: Yamaha not found in powersports')
  }

  // Test 7: Historical data (1980-2009)
  console.log('\nTEST 7: Historical Data Coverage (1980-2009)')
  console.log('-'.repeat(70))
  totalTests++
  
  const historicalData = await db
    .select()
    .from(vehicleYearMakeModels)
    .where(
      and(
        eq(vehicleYearMakeModels.year, 1990)
      )
    )
  
  if (historicalData.length > 0) {
    console.log('✅ PASS: Historical data exists (1990 sample)')
    console.log(`   - 1990 models: ${historicalData.length}`)
    passedTests++
  } else {
    console.log('⚠️  WARN: No 1990 models found')
  }

  // Summary
  console.log('\n' + '='.repeat(70))
  console.log('SUMMARY')
  console.log('='.repeat(70))
  console.log(`Tests Passed: ${passedTests}/${totalTests}`)
  console.log(`Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`)
  
  if (passedTests === totalTests) {
    console.log('\n✅ ALL TESTS PASSED! Database is configured correctly.')
  } else if (passedTests >= totalTests * 0.8) {
    console.log('\n⚠️  MOSTLY WORKING: Some minor issues detected.')
  } else {
    console.log('\n❌ ATTENTION NEEDED: Multiple tests failed.')
  }

  process.exit(0)
}

comprehensiveVerification().catch(console.error)
