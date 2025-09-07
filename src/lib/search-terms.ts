// Common automotive mechanics search terms for web search functionality
export interface SearchTerm {
  term: string
  category: string
  priority: 'high' | 'medium' | 'low'
  vehicleTypes: string[] // 'car', 'truck', '18-wheeler'
}

export const AUTOMOTIVE_SEARCH_TERMS: SearchTerm[] = [
  // Engine Issues - High Priority
  { term: "engine won't start", category: 'engine', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "check engine light", category: 'engine', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "engine overheating", category: 'engine', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "engine stalling", category: 'engine', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "rough idle", category: 'engine', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "engine knocking", category: 'engine', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Engine Issues - Medium Priority
  { term: "white smoke exhaust", category: 'engine', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "blue smoke exhaust", category: 'engine', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "oil leak repair", category: 'engine', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "coolant leak repair", category: 'engine', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "timing belt replacement", category: 'engine', priority: 'medium', vehicleTypes: ['car', 'truck'] },
  { term: "spark plug replacement", category: 'engine', priority: 'medium', vehicleTypes: ['car', 'truck'] },
  
  // Transmission - High Priority
  { term: "transmission slipping", category: 'transmission', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "hard shifting", category: 'transmission', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "transmission fluid leak", category: 'transmission', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Transmission - Medium Priority  
  { term: "clutch replacement", category: 'transmission', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "torque converter problems", category: 'transmission', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "CVT transmission problems", category: 'transmission', priority: 'medium', vehicleTypes: ['car'] },
  
  // Brake System - High Priority
  { term: "brake pads replacement", category: 'brakes', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "brake rotors warped", category: 'brakes', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "brake fluid leak", category: 'brakes', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "ABS light on", category: 'brakes', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "brake pedal soft", category: 'brakes', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Brake System - Medium Priority
  { term: "brake noise squealing", category: 'brakes', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "brake caliper replacement", category: 'brakes', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Electrical - High Priority
  { term: "battery replacement", category: 'electrical', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "alternator problems", category: 'electrical', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "starter motor replacement", category: 'electrical', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Electrical - Medium Priority
  { term: "electrical short circuit", category: 'electrical', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "fuses blown", category: 'electrical', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "headlight replacement", category: 'electrical', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Suspension & Steering - High Priority
  { term: "struts replacement", category: 'suspension', priority: 'high', vehicleTypes: ['car', 'truck'] },
  { term: "shock absorbers replacement", category: 'suspension', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "wheel alignment", category: 'suspension', priority: 'high', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // Suspension & Steering - Medium Priority
  { term: "power steering fluid leak", category: 'suspension', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "tie rod replacement", category: 'suspension', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "ball joint replacement", category: 'suspension', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // HVAC - Medium Priority
  { term: "air conditioning not working", category: 'hvac', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "heater not working", category: 'hvac', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "AC compressor replacement", category: 'hvac', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "cabin air filter replacement", category: 'hvac', priority: 'low', vehicleTypes: ['car', 'truck'] },
  { term: "refrigerant leak", category: 'hvac', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "blower motor replacement", category: 'hvac', priority: 'medium', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  
  // 18-Wheeler Specific - High Priority
  { term: "diesel engine problems", category: 'engine', priority: 'high', vehicleTypes: ['18-wheeler'] },
  { term: "air brake system", category: 'brakes', priority: 'high', vehicleTypes: ['18-wheeler'] },
  { term: "trailer brake issues", category: 'brakes', priority: 'high', vehicleTypes: ['18-wheeler'] },
  { term: "semi truck transmission", category: 'transmission', priority: 'high', vehicleTypes: ['18-wheeler'] },
  { term: "truck differential repair", category: 'drivetrain', priority: 'high', vehicleTypes: ['truck', '18-wheeler'] },
  
  // Maintenance - Low Priority
  { term: "oil change intervals", category: 'maintenance', priority: 'low', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "tire rotation", category: 'maintenance', priority: 'low', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "air filter replacement", category: 'maintenance', priority: 'low', vehicleTypes: ['car', 'truck', '18-wheeler'] },
  { term: "fuel filter replacement", category: 'maintenance', priority: 'low', vehicleTypes: ['car', 'truck', '18-wheeler'] },
]

// Helper functions
export const getSearchTermsByCategory = (category: string): SearchTerm[] => {
  return AUTOMOTIVE_SEARCH_TERMS.filter(term => term.category === category)
}

export const getSearchTermsByPriority = (priority: 'high' | 'medium' | 'low'): SearchTerm[] => {
  return AUTOMOTIVE_SEARCH_TERMS.filter(term => term.priority === priority)
}

export const getSearchTermsByVehicleType = (vehicleType: string): SearchTerm[] => {
  return AUTOMOTIVE_SEARCH_TERMS.filter(term => term.vehicleTypes.includes(vehicleType))
}

export const getRandomSearchTerms = (count: number = 10): SearchTerm[] => {
  const shuffled = [...AUTOMOTIVE_SEARCH_TERMS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const SEARCH_CATEGORIES = [
  'engine',
  'transmission', 
  'brakes',
  'electrical',
  'suspension',
  'hvac',
  'drivetrain',
  'maintenance'
] as const

export type SearchCategory = typeof SEARCH_CATEGORIES[number]