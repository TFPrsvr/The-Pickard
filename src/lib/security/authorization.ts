import { auth } from '@clerk/nextjs/server';
import { UserRole, Permission, hasPermission } from '@/types/roles';
import { NextResponse } from 'next/server';

/**
 * Get user role from Clerk session
 */
export function getUserRole(): UserRole {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata?.role as UserRole;
  return role || UserRole.USER; // Default to USER role
}

/**
 * Get user permissions from Clerk session
 */
export function getUserPermissions(): Permission[] {
  const { sessionClaims } = auth();
  const permissions = sessionClaims?.metadata?.permissions as Permission[] || [];
  return permissions;
}

/**
 * Check if current user has required role
 */
export function requireRole(allowedRoles: UserRole[]) {
  return async (): Promise<NextResponse | null> => {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const userRole = sessionClaims?.metadata?.role as UserRole || UserRole.USER;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      );
    }

    return null; // Authorization passed
  };
}

/**
 * Check if current user has required permission
 */
export function requirePermission(permission: Permission) {
  return async (): Promise<NextResponse | null> => {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const userRole = sessionClaims?.metadata?.role as UserRole || UserRole.USER;
    const userPermissions = sessionClaims?.metadata?.permissions as Permission[] || [];

    // Check if user has the permission directly or through role
    const hasDirectPermission = userPermissions.includes(permission);
    const hasRolePermission = hasPermission(userRole, permission);

    if (!hasDirectPermission && !hasRolePermission) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Missing required permission' },
        { status: 403 }
      );
    }

    return null; // Authorization passed
  };
}

/**
 * Check if current user is authenticated
 */
export function requireAuth() {
  return async (): Promise<NextResponse | null> => {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    return null; // Authentication passed
  };
}

/**
 * Helper to check if user is admin
 */
export function isAdmin(): boolean {
  const role = getUserRole();
  return role === UserRole.ADMIN;
}

/**
 * Helper to check if user is mechanic or admin
 */
export function isMechanicOrAdmin(): boolean {
  const role = getUserRole();
  return role === UserRole.MECHANIC || role === UserRole.ADMIN;
}
