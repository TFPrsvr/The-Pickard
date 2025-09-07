export interface Vehicle {
  id: string
  year: number
  make: string
  model: string
  engineType: string
  driveType: '2WD' | '4WD' | 'AWD'
  specialty?: string
  category: 'car' | 'truck' | '18-wheeler'
}

export interface Problem {
  id: string
  vehicleId: string
  title: string
  description: string
  symptoms: string[]
  solutions: Solution[]
  commonality: 'common' | 'uncommon' | 'rare'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
}

export interface Solution {
  id: string
  description: string
  tools: Tool[]
  parts: Part[]
  steps: string[]
  warnings: string[]
  references: Reference[]
}

export interface Tool {
  id: string
  name: string
  category: string
  required: boolean
  alternatives?: string[]
}

export interface Part {
  id: string
  name: string
  partNumber?: string
  manufacturer?: string
  price?: number
  interchangeableWith: string[]
}

export interface Tip {
  id: string
  title: string
  description: string
  category: 'tools' | 'technique' | 'safety' | 'time-saver' | 'lesson-learned'
  vehicleTypes: Vehicle['category'][]
  media: Media[]
  author: string
  createdAt: Date
  likes: number
  tags: string[]
}

export interface Media {
  id: string
  type: 'image' | 'video' | 'audio'
  url: string
  caption?: string
}

export interface Reference {
  id: string
  title: string
  url: string
  type: 'video' | 'manual' | 'forum' | 'manufacturer'
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  username?: string
  avatar?: string
  bio?: string
  specialties: string[]
  experienceYears: number
  role: 'user' | 'admin' | 'superAdmin'
  createdAt: Date
}

export interface SearchFilters {
  year?: number[]
  make?: string[]
  model?: string[]
  submodel?: string[]
  engineType?: string[]
  driveType?: Vehicle['driveType'][]
  specialty?: string[]
  commonality?: Problem['commonality'][]
  difficulty?: Problem['difficulty'][]
}