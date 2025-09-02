import { db } from '@/lib/database'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'your-email@example.com'

export async function ensureSuperAdmin(clerkId: string, email: string) {
  try {
    if (email === SUPER_ADMIN_EMAIL) {
      await db.update(users)
        .set({ role: 'superAdmin' })
        .where(eq(users.clerkId, clerkId))
      
      console.log(`Super admin role granted to ${email}`)
    }
  } catch (error) {
    console.error('Error setting super admin role:', error)
  }
}

export async function getUserRole(clerkId: string): Promise<string> {
  try {
    const user = await db.select({ role: users.role })
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1)
    
    return user[0]?.role || 'user'
  } catch (error) {
    console.error('Error getting user role:', error)
    return 'user'
  }
}

export function isSuperAdmin(role: string): boolean {
  return role === 'superAdmin'
}

export function isAdmin(role: string): boolean {
  return role === 'admin' || role === 'superAdmin'
}