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
  pinterestProfile: text('pinterest_profile'), // Pinterest profile URL
  pinterestBoards: json('pinterest_boards').$type<Array<{ name: string; url: string }>>().default([]), // User's Pinterest boards
  // Saved vehicle selection
  savedVehicleCategory: varchar('saved_vehicle_category', { length: 20 }), // 'car', 'truck', '18-wheeler', etc.
  savedVehicleYear: integer('saved_vehicle_year'),
  savedVehicleMake: varchar('saved_vehicle_make', { length: 50 }),
  savedVehicleModel: varchar('saved_vehicle_model', { length: 100 }),
  savedVehicleEngineType: varchar('saved_vehicle_engine_type', { length: 100 }),
  savedVehicleDriveType: varchar('saved_vehicle_drive_type', { length: 10 }),
  savedVehicleSubmodel: varchar('saved_vehicle_submodel', { length: 100 }),
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
  driveType: varchar('drive_type', { length: 10 }).notNull(), // '2WD', '4WD', 'AWD', 'RWD', 'Chain', 'Shaft'
  specialty: varchar('specialty', { length: 100 }),
  category: varchar('category', { length: 20 }).notNull(), // 'car', 'truck', '18-wheeler', 'motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft', 'rv'
  displacement: integer('displacement'), // Engine displacement in cc (for powersports)
  strokeType: varchar('stroke_type', { length: 10 }), // '2-stroke', '4-stroke' (for powersports)
  coolingType: varchar('cooling_type', { length: 20 }), // 'liquid', 'air', 'oil' (for powersports)
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

// Pinterest Pins table - User-submitted Pinterest pins for The Pickard Reference Library
export const pinterestPins = pgTable('pinterest_pins', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(), // Who submitted the pin
  pinterestUrl: text('pinterest_url').notNull(), // URL to the Pinterest pin
  title: varchar('title', { length: 255 }), // Pin title (fetched from Pinterest or user-provided)
  description: text('description'), // Pin description
  imageUrl: text('image_url'), // Pin image URL
  category: varchar('category', { length: 50 }), // 'diagnostic', 'visual-reference', 'tips', etc.
  vehicleTypes: json('vehicle_types').$type<string[]>().default([]), // Applicable vehicle types
  tags: json('tags').$type<string[]>().default([]), // Search tags
  status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'approved', 'rejected'
  reviewedBy: integer('reviewed_by').references(() => users.id), // Admin who reviewed
  reviewedAt: timestamp('reviewed_at'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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

// Web Search Results table
export const webSearchResults = pgTable('web_search_results', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: varchar('title', { length: 500 }).notNull(),
  url: text('url').notNull(),
  snippet: text('snippet'),
  source: varchar('source', { length: 255 }),
  searchTerm: varchar('search_term', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(), // engine, transmission, brakes, etc.
  isBookmarked: boolean('is_bookmarked').default(false),
  tags: json('tags').$type<string[]>().default([]),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// ========================================
// VEHICLE SPECIFICATIONS TABLES
// These tables store accurate year/make/model/engine combinations
// for cascading dropdown functionality
// ========================================

// Vehicle Makes - Master list of all manufacturers
export const vehicleMakes = pgTable('vehicle_makes', {
  id: serial('id').primaryKey(),
  makeId: integer('make_id').unique(), // NHTSA vPIC Make ID
  makeName: varchar('make_name', { length: 100 }).notNull().unique(),
  category: varchar('category', { length: 20 }).notNull(), // 'automotive', 'powersports'
  yearStart: integer('year_start'), // First year this make was available
  yearEnd: integer('year_end'), // Last year (null if still in production)
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Vehicle Models - All models for each make
export const vehicleModels = pgTable('vehicle_models', {
  id: serial('id').primaryKey(),
  makeId: integer('make_id').references(() => vehicleMakes.id).notNull(),
  modelId: integer('model_id'), // NHTSA vPIC Model ID
  modelName: varchar('model_name', { length: 150 }).notNull(),
  category: varchar('category', { length: 20 }).notNull(), // 'car', 'truck', '18-wheeler', etc.
  yearStart: integer('year_start'), // First year this model was available
  yearEnd: integer('year_end'), // Last year (null if still in production)
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Vehicle Year Make Model combinations - Valid year/make/model combinations
export const vehicleYearMakeModels = pgTable('vehicle_year_make_models', {
  id: serial('id').primaryKey(),
  year: integer('year').notNull(),
  makeId: integer('make_id').references(() => vehicleMakes.id).notNull(),
  modelId: integer('model_id').references(() => vehicleModels.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Vehicle Engines - Engine specifications for year/make/model combinations
export const vehicleEngines = pgTable('vehicle_engines', {
  id: serial('id').primaryKey(),
  yearMakeModelId: integer('year_make_model_id').references(() => vehicleYearMakeModels.id).notNull(),
  engineName: varchar('engine_name', { length: 150 }).notNull(), // e.g., "5.0L V8", "2.3L I4 EcoBoost"
  displacement: varchar('displacement', { length: 50 }), // e.g., "5.0L", "2300cc"
  cylinders: integer('cylinders'),
  configuration: varchar('configuration', { length: 20 }), // V6, V8, I4, etc.
  fuelType: varchar('fuel_type', { length: 50 }), // Gasoline, Diesel, Electric, Hybrid
  horsepower: integer('horsepower'),
  torque: integer('torque'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Vehicle Drive Types - Drive type options for year/make/model/engine combinations
export const vehicleDriveTypes = pgTable('vehicle_drive_types', {
  id: serial('id').primaryKey(),
  engineId: integer('engine_id').references(() => vehicleEngines.id).notNull(),
  driveType: varchar('drive_type', { length: 20 }).notNull(), // FWD, RWD, AWD, 4WD
  createdAt: timestamp('created_at').defaultNow(),
})

// Vehicle Trim Levels / Submodels
export const vehicleTrims = pgTable('vehicle_trims', {
  id: serial('id').primaryKey(),
  yearMakeModelId: integer('year_make_model_id').references(() => vehicleYearMakeModels.id).notNull(),
  trimName: varchar('trim_name', { length: 100 }).notNull(), // e.g., "Limited", "Sport", "XLT"
  createdAt: timestamp('created_at').defaultNow(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tips: many(tips),
  webSearchResults: many(webSearchResults),
  pinterestPins: many(pinterestPins),
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

export const webSearchResultsRelations = relations(webSearchResults, ({ one }) => ({
  user: one(users, {
    fields: [webSearchResults.userId],
    references: [users.id],
  }),
}))

// Vehicle Specifications Relations
export const vehicleMakesRelations = relations(vehicleMakes, ({ many }) => ({
  models: many(vehicleModels),
  yearMakeModels: many(vehicleYearMakeModels),
}))

export const vehicleModelsRelations = relations(vehicleModels, ({ one, many }) => ({
  make: one(vehicleMakes, {
    fields: [vehicleModels.makeId],
    references: [vehicleMakes.id],
  }),
  yearMakeModels: many(vehicleYearMakeModels),
}))

export const vehicleYearMakeModelsRelations = relations(vehicleYearMakeModels, ({ one, many }) => ({
  make: one(vehicleMakes, {
    fields: [vehicleYearMakeModels.makeId],
    references: [vehicleMakes.id],
  }),
  model: one(vehicleModels, {
    fields: [vehicleYearMakeModels.modelId],
    references: [vehicleModels.id],
  }),
  engines: many(vehicleEngines),
  trims: many(vehicleTrims),
}))

export const vehicleEnginesRelations = relations(vehicleEngines, ({ one, many }) => ({
  yearMakeModel: one(vehicleYearMakeModels, {
    fields: [vehicleEngines.yearMakeModelId],
    references: [vehicleYearMakeModels.id],
  }),
  driveTypes: many(vehicleDriveTypes),
}))

export const vehicleDriveTypesRelations = relations(vehicleDriveTypes, ({ one }) => ({
  engine: one(vehicleEngines, {
    fields: [vehicleDriveTypes.engineId],
    references: [vehicleEngines.id],
  }),
}))

export const vehicleTrimsRelations = relations(vehicleTrims, ({ one }) => ({
  yearMakeModel: one(vehicleYearMakeModels, {
    fields: [vehicleTrims.yearMakeModelId],
    references: [vehicleYearMakeModels.id],
  }),
}))

export const pinterestPinsRelations = relations(pinterestPins, ({ one }) => ({
  user: one(users, {
    fields: [pinterestPins.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [pinterestPins.reviewedBy],
    references: [users.id],
  }),
}))