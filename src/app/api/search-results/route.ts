import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/database'
import { webSearchResults, users } from '@/lib/schema'
import { eq, and, desc } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, url, snippet, source, searchTerm, category, tags, notes } = body

    // Validate required fields
    if (!title || !url || !searchTerm || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, url, searchTerm, category' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1)

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if this URL is already saved by this user
    const existing = await db.select()
      .from(webSearchResults)
      .where(
        and(
          eq(webSearchResults.userId, user[0].id),
          eq(webSearchResults.url, url)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'This search result is already saved' },
        { status: 409 }
      )
    }

    // Save the search result
    const result = await db.insert(webSearchResults).values({
      userId: user[0].id,
      title,
      url,
      snippet,
      source,
      searchTerm,
      category,
      tags: tags || [],
      notes: notes || null,
      isBookmarked: false
    }).returning()

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Search result saved successfully'
    })

  } catch (error) {
    console.error('Error saving search result:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const bookmarked = searchParams.get('bookmarked') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get user from database
    const user = await db.select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1)

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Build query conditions
    const conditions = [eq(webSearchResults.userId, user[0].id)]
    
    if (category) {
      conditions.push(eq(webSearchResults.category, category))
    }
    
    if (bookmarked) {
      conditions.push(eq(webSearchResults.isBookmarked, true))
    }

    // Get search results
    const results = await db.select()
      .from(webSearchResults)
      .where(and(...conditions))
      .orderBy(desc(webSearchResults.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const totalCount = await db.select()
      .from(webSearchResults)
      .where(and(...conditions))

    return NextResponse.json({
      success: true,
      data: results,
      pagination: {
        total: totalCount.length,
        limit,
        offset,
        hasMore: totalCount.length > offset + limit
      }
    })

  } catch (error) {
    console.error('Error fetching search results:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, isBookmarked, tags, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Search result ID is required' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1)

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update the search result
    const result = await db.update(webSearchResults)
      .set({
        isBookmarked: isBookmarked ?? undefined,
        tags: tags ?? undefined,
        notes: notes ?? undefined,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(webSearchResults.id, id),
          eq(webSearchResults.userId, user[0].id)
        )
      )
      .returning()

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Search result not found or not owned by user' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Search result updated successfully'
    })

  } catch (error) {
    console.error('Error updating search result:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Search result ID is required' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1)

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Delete the search result
    const result = await db.delete(webSearchResults)
      .where(
        and(
          eq(webSearchResults.id, parseInt(id)),
          eq(webSearchResults.userId, user[0].id)
        )
      )
      .returning()

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Search result not found or not owned by user' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Search result deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting search result:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}