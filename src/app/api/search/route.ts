import { NextRequest, NextResponse } from 'next/server'
import { searchVehicles, searchProblems } from '@/lib/api'
import { SearchFilters } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'vehicles'
    const vehicleId = searchParams.get('vehicleId')
    const query = searchParams.get('q')

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
      return NextResponse.json({ success: true, data: results })
    } else if (type === 'problems') {
      const results = await searchProblems(vehicleId || undefined, query || undefined)
      return NextResponse.json({ success: true, data: results })
    }

    return NextResponse.json({ success: false, error: 'Invalid search type' }, { status: 400 })
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
    const body = await request.json()
    const { type, filters, query, vehicleId } = body

    if (type === 'vehicles') {
      const results = await searchVehicles(filters)
      return NextResponse.json({ success: true, data: results })
    } else if (type === 'problems') {
      const results = await searchProblems(vehicleId, query)
      return NextResponse.json({ success: true, data: results })
    }

    return NextResponse.json({ success: false, error: 'Invalid search type' }, { status: 400 })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}