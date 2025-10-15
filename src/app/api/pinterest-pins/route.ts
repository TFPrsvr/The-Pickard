import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { pinterestPins, users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { isAdmin } from '@/lib/security/authorization'

// POST - Submit a new Pinterest pin
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user ID from database
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { pinterestUrl } = body

    // Validate Pinterest URL
    if (!pinterestUrl || typeof pinterestUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Pinterest URL is required' },
        { status: 400 }
      )
    }

    if (!pinterestUrl.includes('pinterest.com')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Pinterest URL' },
        { status: 400 }
      )
    }

    // Create new Pinterest pin submission
    const [newPin] = await db.insert(pinterestPins).values({
      userId: user.id,
      pinterestUrl,
      status: 'pending',
    }).returning()

    return NextResponse.json({
      success: true,
      message: 'Pinterest pin submitted successfully for review',
      pin: newPin,
    })

  } catch (error) {
    console.error('Error submitting Pinterest pin:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit Pinterest pin' },
      { status: 500 }
    )
  }
}

// GET - Get all submitted Pinterest pins (with optional filter by status)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'pending', 'approved', 'rejected', or null for all

    let query = db.select().from(pinterestPins)

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query = query.where(eq(pinterestPins.status, status as any))
    }

    const pins = await query

    return NextResponse.json({
      success: true,
      pins,
    })

  } catch (error) {
    console.error('Error fetching Pinterest pins:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Pinterest pins' },
      { status: 500 }
    )
  }
}

// PATCH - Review a Pinterest pin (approve/reject) - Admin only
export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const userIsAdmin = await isAdmin()
    if (!userIsAdmin) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Get admin user ID from database
    const adminUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    })

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { pinId, action, rejectionReason } = body

    if (!pinId || !action) {
      return NextResponse.json(
        { success: false, error: 'Pin ID and action are required' },
        { status: 400 }
      )
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      )
    }

    if (action === 'reject' && !rejectionReason) {
      return NextResponse.json(
        { success: false, error: 'Rejection reason is required when rejecting a pin' },
        { status: 400 }
      )
    }

    // Update pin status
    const [updatedPin] = await db
      .update(pinterestPins)
      .set({
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewedBy: adminUser.id,
        reviewedAt: new Date(),
        rejectionReason: action === 'reject' ? rejectionReason : null,
        updatedAt: new Date(),
      })
      .where(eq(pinterestPins.id, pinId))
      .returning()

    return NextResponse.json({
      success: true,
      message: `Pin ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      pin: updatedPin,
    })

  } catch (error) {
    console.error('Error reviewing Pinterest pin:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to review Pinterest pin' },
      { status: 500 }
    )
  }
}
