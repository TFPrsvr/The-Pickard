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
    const { pinterestProfile, pinterestBoards } = body

    // Validate Pinterest profile URL
    if (pinterestProfile && !pinterestProfile.startsWith('https://pinterest.com/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Pinterest profile URL' },
        { status: 400 }
      )
    }

    // Validate Pinterest boards
    if (pinterestBoards && !Array.isArray(pinterestBoards)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Pinterest boards format' },
        { status: 400 }
      )
    }

    // Update user's Pinterest information
    await db
      .update(users)
      .set({
        pinterestProfile: pinterestProfile || null,
        pinterestBoards: pinterestBoards || [],
        updatedAt: new Date(),
      })
      .where(eq(users.clerkId, userId))

    return NextResponse.json({
      success: true,
      message: 'Pinterest settings updated successfully',
    })
  } catch (error) {
    console.error('Error updating Pinterest settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update Pinterest settings' },
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
        pinterestProfile: true,
        pinterestBoards: true,
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
        pinterestProfile: user.pinterestProfile,
        pinterestBoards: user.pinterestBoards,
      },
    })
  } catch (error) {
    console.error('Error fetching Pinterest settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Pinterest settings' },
      { status: 500 }
    )
  }
}
