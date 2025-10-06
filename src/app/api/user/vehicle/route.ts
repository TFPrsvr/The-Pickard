import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/database'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      category,
      year,
      make,
      model,
      engineType,
      driveType,
      submodel
    } = body

    // Update user's saved vehicle selection
    await db
      .update(users)
      .set({
        savedVehicleCategory: category || null,
        savedVehicleYear: year || null,
        savedVehicleMake: make || null,
        savedVehicleModel: model || null,
        savedVehicleEngineType: engineType || null,
        savedVehicleDriveType: driveType || null,
        savedVehicleSubmodel: submodel || null,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkId, userId))

    return NextResponse.json({
      success: true,
      message: 'Vehicle selection saved successfully',
    })
  } catch (error) {
    console.error('Error saving vehicle selection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save vehicle selection' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
      columns: {
        savedVehicleCategory: true,
        savedVehicleYear: true,
        savedVehicleMake: true,
        savedVehicleModel: true,
        savedVehicleEngineType: true,
        savedVehicleDriveType: true,
        savedVehicleSubmodel: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        category: user.savedVehicleCategory,
        year: user.savedVehicleYear,
        make: user.savedVehicleMake,
        model: user.savedVehicleModel,
        engineType: user.savedVehicleEngineType,
        driveType: user.savedVehicleDriveType,
        submodel: user.savedVehicleSubmodel,
      },
    })
  } catch (error) {
    console.error('Error fetching vehicle selection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vehicle selection' },
      { status: 500 }
    )
  }
}
