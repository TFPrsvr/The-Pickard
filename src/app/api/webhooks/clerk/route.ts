import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/database'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { ensureSuperAdmin } from '@/lib/admin'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  const { id } = evt.data
  if (!id) {
    return new Response('No user ID provided', { status: 400 })
  }
  const eventType = evt.type

  if (eventType === 'user.created') {
    try {
      const email = evt.data.email_addresses[0].email_address
      await db.insert(users).values({
        clerkId: id,
        firstName: evt.data.first_name || '',
        lastName: evt.data.last_name || '',
        email: email,
        username: evt.data.username,
        avatar: evt.data.image_url,
      })
      
      // Check if this user should be a super admin
      await ensureSuperAdmin(id, email)
    } catch (error) {
      console.error('Error creating user:', error)
      return new Response('Error creating user', { status: 500 })
    }
  }

  if (eventType === 'user.updated') {
    try {
      await db.update(users)
        .set({
          firstName: evt.data.first_name || '',
          lastName: evt.data.last_name || '',
          email: evt.data.email_addresses[0].email_address,
          username: evt.data.username,
          avatar: evt.data.image_url,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id))
    } catch (error) {
      console.error('Error updating user:', error)
      return new Response('Error updating user', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await db.delete(users).where(eq(users.clerkId, id))
    } catch (error) {
      console.error('Error deleting user:', error)
      return new Response('Error deleting user', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}