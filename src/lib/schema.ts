import { pgTable, serial, varchar, text, integer, timestamp, boolean, json, real } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 256 }).unique().notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  username: varchar('username', { length: 50 }).unique(),
  avatar: text('avatar'),
  bio: text('bio'),
  specialties: json('specialties').$type<string[]>().default([]),
  experienceYears: integer('experience_years').default(0),
  role: varchar('role', { length: 20 }).default('user'), // 'user', 'admin', 'superAdmin'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Vehicles table
export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  year: integer('year').notNull(),
  make: varchar('make', { length: 50 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  engineType: varchar('engine_type', { length: 100 }).notNull(),
  driveType: varchar('drive_type', { length: 10 }).notNull(), // '2WD', '4WD', 'AWD'
  specialty: varchar('specialty', { length: 100 }),
  category: varchar('category', { length: 20 }).notNull(), // 'car', 'truck', '18-wheeler'
  createdAt: timestamp('created_at').defaultNow(),
})

// Problems table
export const problems = pgTable('problems', {
  id: serial('id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => vehicles.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  symptoms: json('symptoms').$type<string[]>().default([]),
  commonality: varchar('commonality', { length: 20 }).notNull(), // 'common', 'uncommon', 'rare'
  difficulty: varchar('difficulty', { length: 20 }).notNull(), // 'easy', 'medium', 'hard'
  estimatedTime: varchar('estimated_time', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Solutions table
export const solutions = pgTable('solutions', {
  id: serial('id').primaryKey(),
  problemId: integer('problem_id').references(() => problems.id),
  description: text('description').notNull(),
  steps: json('steps').$type<string[]>().default([]),
  warnings: json('warnings').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tools table
export const tools = pgTable('tools', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  description: text('description'),
  alternatives: json('alternatives').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
})

// Parts table
export const parts = pgTable('parts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  partNumber: varchar('part_number', { length: 100 }),
  manufacturer: varchar('manufacturer', { length: 100 }),
  price: real('price'),
  interchangeableWith: json('interchangeable_with').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
})

// Solution Tools junction table
export const solutionTools = pgTable('solution_tools', {
  id: serial('id').primaryKey(),
  solutionId: integer('solution_id').references(() => solutions.id),
  toolId: integer('tool_id').references(() => tools.id),
  required: boolean('required').default(true),
})

// Solution Parts junction table
export const solutionParts = pgTable('solution_parts', {
  id: serial('id').primaryKey(),
  solutionId: integer('solution_id').references(() => solutions.id),
  partId: integer('part_id').references(() => parts.id),
  quantity: integer('quantity').default(1),
})

// Tips table
export const tips = pgTable('tips', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // 'tools', 'technique', 'safety', 'time-saver', 'lesson-learned'
  vehicleTypes: json('vehicle_types').$type<string[]>().default([]), // 'car', 'truck', '18-wheeler'
  tags: json('tags').$type<string[]>().default([]),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

// Media table (for tips)
export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  tipId: integer('tip_id').references(() => tips.id),
  type: varchar('type', { length: 20 }).notNull(), // 'image', 'video', 'audio'
  url: text('url').notNull(),
  caption: text('caption'),
  createdAt: timestamp('created_at').defaultNow(),
})

// References table
export const references = pgTable('references', {
  id: serial('id').primaryKey(),
  solutionId: integer('solution_id').references(() => solutions.id),
  title: varchar('title', { length: 255 }).notNull(),
  url: text('url').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'video', 'manual', 'forum', 'manufacturer'
  createdAt: timestamp('created_at').defaultNow(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tips: many(tips),
}))

export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  problems: many(problems),
}))

export const problemsRelations = relations(problems, ({ one, many }) => ({
  vehicle: one(vehicles, {
    fields: [problems.vehicleId],
    references: [vehicles.id],
  }),
  solutions: many(solutions),
}))

export const solutionsRelations = relations(solutions, ({ one, many }) => ({
  problem: one(problems, {
    fields: [solutions.problemId],
    references: [problems.id],
  }),
  solutionTools: many(solutionTools),
  solutionParts: many(solutionParts),
  references: many(references),
}))

export const toolsRelations = relations(tools, ({ many }) => ({
  solutionTools: many(solutionTools),
}))

export const partsRelations = relations(parts, ({ many }) => ({
  solutionParts: many(solutionParts),
}))

export const tipsRelations = relations(tips, ({ one, many }) => ({
  user: one(users, {
    fields: [tips.userId],
    references: [users.id],
  }),
  media: many(media),
}))

export const mediaRelations = relations(media, ({ one }) => ({
  tip: one(tips, {
    fields: [media.tipId],
    references: [tips.id],
  }),
}))

export const referencesRelations = relations(references, ({ one }) => ({
  solution: one(solutions, {
    fields: [references.solutionId],
    references: [solutions.id],
  }),
}))