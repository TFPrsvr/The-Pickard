/**
 * User roles for Role-Based Access Control (RBAC)
 */
export enum UserRole {
  ADMIN = 'admin',
  MECHANIC = 'mechanic',
  USER = 'user',
}

/**
 * Permissions for different actions in the application
 */
export enum Permission {
  // Parts permissions
  READ_PARTS = 'read:parts',
  WRITE_PARTS = 'write:parts',
  DELETE_PARTS = 'delete:parts',

  // Diagnostics permissions
  READ_DIAGNOSTICS = 'read:diagnostics',
  WRITE_DIAGNOSTICS = 'write:diagnostics',
  DELETE_DIAGNOSTICS = 'delete:diagnostics',

  // User management permissions
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users',

  // Admin permissions
  MANAGE_SYSTEM = 'manage:system',
  VIEW_ANALYTICS = 'view:analytics',
}

/**
 * User metadata stored in Clerk
 */
export interface UserMetadata {
  role: UserRole;
  permissions: Permission[];
}

/**
 * Role to permissions mapping
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.READ_PARTS,
    Permission.WRITE_PARTS,
    Permission.DELETE_PARTS,
    Permission.READ_DIAGNOSTICS,
    Permission.WRITE_DIAGNOSTICS,
    Permission.DELETE_DIAGNOSTICS,
    Permission.READ_USERS,
    Permission.WRITE_USERS,
    Permission.DELETE_USERS,
    Permission.MANAGE_SYSTEM,
    Permission.VIEW_ANALYTICS,
  ],
  [UserRole.MECHANIC]: [
    Permission.READ_PARTS,
    Permission.WRITE_PARTS,
    Permission.READ_DIAGNOSTICS,
    Permission.WRITE_DIAGNOSTICS,
  ],
  [UserRole.USER]: [
    Permission.READ_PARTS,
    Permission.READ_DIAGNOSTICS,
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
