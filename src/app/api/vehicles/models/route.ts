import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { vehicleModels, vehicleMakes, vehicleYearMakeModels } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

/**
 * GET /api/vehicles/models
 *
 * Get all vehicle models for a specific make and year
 *
 * Query params:
 *   - make: string (required) - Make name
 *   - year: number (optional) - Filter models available for this year
 *
 * Returns:
 *   { success: true, data: VehicleModel[] }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const makeName = searchParams.get('make')
    const yearParam = searchParams.get('year')

    if (!makeName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Make parameter is required'
        },
        { status: 400 }
      )
    }

    // Get the make ID
    const [make] = await db
      .select()
      .from(vehicleMakes)
      .where(eq(vehicleMakes.makeName, makeName))
      .limit(1)

    if (!make) {
      return NextResponse.json(
        {
          success: false,
          error: 'Make not found'
        },
        { status: 404 }
      )
    }

    if (yearParam) {
      const year = parseInt(yearParam)

      // Get models available for the specified year and make
      const models = await db
        .selectDistinct({
          id: vehicleModels.id,
          modelId: vehicleModels.modelId,
          modelName: vehicleModels.modelName,
          category: vehicleModels.category
        })
        .from(vehicleModels)
        .innerJoin(
          vehicleYearMakeModels,
          eq(vehicleModels.id, vehicleYearMakeModels.modelId)
        )
        .where(
          and(
            eq(vehicleYearMakeModels.year, year),
            eq(vehicleYearMakeModels.makeId, make.id)
          )
        )
        .orderBy(vehicleModels.modelName)

      return NextResponse.json({
        success: true,
        data: models
      })
    }

    // No year filter - return all models for the make
    const models = await db
      .select({
        id: vehicleModels.id,
        modelId: vehicleModels.modelId,
        modelName: vehicleModels.modelName,
        category: vehicleModels.category
      })
      .from(vehicleModels)
      .where(eq(vehicleModels.makeId, make.id))
      .orderBy(vehicleModels.modelName)

    return NextResponse.json({
      success: true,
      data: models
    })
  } catch (error) {
    console.error('Error fetching vehicle models:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vehicle models'
      },
      { status: 500 }
    )
  }
}
