import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { vehicleMakes, vehicleYearMakeModels } from '@/lib/schema'
import { eq, and, gte, lte, or, isNull } from 'drizzle-orm'

/**
 * GET /api/vehicles/makes
 *
 * Get all vehicle makes, optionally filtered by year
 *
 * Query params:
 *   - year: number (optional) - Filter makes available for this year
 *   - category: string (optional) - Filter by category ('automotive' | 'powersports')
 *
 * Returns:
 *   { success: true, data: VehicleMake[] }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const yearParam = searchParams.get('year')
    const category = searchParams.get('category')

    if (yearParam) {
      const year = parseInt(yearParam)

      // Get makes that have models for the specified year
      const makes = await db
        .selectDistinct({
          id: vehicleMakes.id,
          makeId: vehicleMakes.makeId,
          makeName: vehicleMakes.makeName,
          category: vehicleMakes.category
        })
        .from(vehicleMakes)
        .innerJoin(
          vehicleYearMakeModels,
          eq(vehicleMakes.id, vehicleYearMakeModels.makeId)
        )
        .where(
          and(
            eq(vehicleYearMakeModels.year, year),
            category ? eq(vehicleMakes.category, category) : undefined
          )
        )
        .orderBy(vehicleMakes.makeName)

      return NextResponse.json({
        success: true,
        data: makes
      })
    }

    // No year filter - return all makes
    const makes = await db
      .select({
        id: vehicleMakes.id,
        makeId: vehicleMakes.makeId,
        makeName: vehicleMakes.makeName,
        category: vehicleMakes.category
      })
      .from(vehicleMakes)
      .where(
        category ? eq(vehicleMakes.category, category) : undefined
      )
      .orderBy(vehicleMakes.makeName)

    return NextResponse.json({
      success: true,
      data: makes
    })
  } catch (error) {
    console.error('Error fetching vehicle makes:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vehicle makes'
      },
      { status: 500 }
    )
  }
}
