import { NextRequest, NextResponse } from 'next/server'
import { searchVehicles, searchProblems } from '@/lib/api'
import { SearchFilters } from '@/types'
import { searchRateLimiter, withRateLimit } from '@/lib/security/rate-limiter'
import { validateSearchInput, validateVehicleInput } from '@/lib/security/input-validation'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting (50 searches per minute)
    const rateLimitResult = await withRateLimit(request, searchRateLimiter);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: rateLimitResult.headers
        }
      );
    }

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'vehicles'
    const vehicleId = searchParams.get('vehicleId')
    const query = searchParams.get('q')

    // Validate search query if present
    if (query) {
      const validation = validateSearchInput(query);
      if (!validation.isValid) {
        return NextResponse.json(
          { success: false, error: validation.errors[0] },
          { status: 400, headers: rateLimitResult.headers }
        );
      }
    }

    // Parse filters from query parameters
    const filters: SearchFilters = {}

    // Category filter
    const category = searchParams.get('category')
    if (category) filters.category = [category as any]

    const yearFrom = searchParams.get('yearFrom')
    const yearTo = searchParams.get('yearTo')
    if (yearFrom || yearTo) {
      filters.year = [
        yearFrom ? parseInt(yearFrom) : undefined,
        yearTo ? parseInt(yearTo) : undefined
      ].filter(Boolean) as number[]
    }

    const make = searchParams.get('make')
    if (make) filters.make = [make]

    const model = searchParams.get('model')
    if (model) filters.model = [model]

    const engineType = searchParams.get('engineType')
    if (engineType) filters.engineType = [engineType]

    const driveType = searchParams.get('driveType')
    if (driveType) filters.driveType = [driveType as any]

    const submodel = searchParams.get('submodel')
    if (submodel) filters.submodel = [submodel]

    // Powersports-specific filters
    const displacement = searchParams.get('displacement')
    if (displacement) filters.displacement = [parseInt(displacement)]

    const strokeType = searchParams.get('strokeType')
    if (strokeType) filters.strokeType = [strokeType as any]

    const coolingType = searchParams.get('coolingType')
    if (coolingType) filters.coolingType = [coolingType as any]

    if (type === 'vehicles') {
      const results = await searchVehicles(filters)
      return NextResponse.json(
        { success: true, data: results },
        { headers: rateLimitResult.headers }
      )
    } else if (type === 'problems') {
      const results = await searchProblems(vehicleId || undefined, query || undefined)
      return NextResponse.json(
        { success: true, data: results },
        { headers: rateLimitResult.headers }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Invalid search type' },
      { status: 400, headers: rateLimitResult.headers }
    )
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (50 searches per minute)
    const rateLimitResult = await withRateLimit(request, searchRateLimiter);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: rateLimitResult.headers
        }
      );
    }

    const body = await request.json()
    const { type, filters, query, vehicleId } = body

    // Validate search query if present
    if (query) {
      const validation = validateSearchInput(query);
      if (!validation.isValid) {
        return NextResponse.json(
          { success: false, error: validation.errors[0] },
          { status: 400, headers: rateLimitResult.headers }
        );
      }
    }

    // Validate vehicle filters if present
    if (filters) {
      const validation = validateVehicleInput(filters);
      if (!validation.isValid) {
        return NextResponse.json(
          { success: false, error: validation.errors[0] },
          { status: 400, headers: rateLimitResult.headers }
        );
      }
    }

    if (type === 'vehicles') {
      const results = await searchVehicles(filters)
      return NextResponse.json(
        { success: true, data: results },
        { headers: rateLimitResult.headers }
      )
    } else if (type === 'problems') {
      const results = await searchProblems(vehicleId, query)
      return NextResponse.json(
        { success: true, data: results },
        { headers: rateLimitResult.headers }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Invalid search type' },
      { status: 400, headers: rateLimitResult.headers }
    )
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}