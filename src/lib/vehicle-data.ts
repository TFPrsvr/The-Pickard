// Comprehensive Vehicle Database for Automotive Mechanics

export interface VehicleData {
  years: string[]
  makes: string[]
  models: Record<string, string[]>
  engines: Record<string, string[]> // engines by make
  driveTypes: string[]
  transmissions: string[]
}

export const vehicleDatabase: VehicleData = {
  // Years from 1990 to current year + 1 for upcoming models
  years: Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => 
    (new Date().getFullYear() - i).toString()
  ),
  
  makes: [
    'Acura', 'Alfa Romeo', 'AM General', 'Aston Martin', 'Audi', 'Bentley',
    'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Daewoo', 'Dodge',
    'Eagle', 'Ferrari', 'Fiat', 'Ford', 'Geo', 'GMC', 'Honda', 'Hummer',
    'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini',
    'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Mazda', 'McLaren',
    'Mercedes-Benz', 'Mercury', 'Mini', 'Mitsubishi', 'Nissan', 'Oldsmobile',
    'Peugeot', 'Plymouth', 'Pontiac', 'Porsche', 'Ram', 'Rolls-Royce', 'Saab',
    'Saturn', 'Scion', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Toyota',
    'Volkswagen', 'Volvo', 'Yugo'
  ],

  models: {
    'Ford': [
      'Bronco', 'Bronco Sport', 'C-Max', 'Edge', 'EcoSport', 'Escape', 'Expedition',
      'Explorer', 'F-150', 'F-250 Super Duty', 'F-350 Super Duty', 'F-450 Super Duty',
      'F-550 Super Duty', 'Fiesta', 'Flex', 'Focus', 'Fusion', 'GT', 'Maverick',
      'Mustang', 'Mustang Mach-E', 'Ranger', 'Taurus', 'Transit', 'Transit Connect'
    ],
    'Chevrolet': [
      'Blazer', 'Bolt EV', 'Bolt EUV', 'Camaro', 'Colorado', 'Corvette', 'Cruze',
      'Equinox', 'Express', 'Impala', 'Malibu', 'Silverado 1500', 'Silverado 2500HD',
      'Silverado 3500HD', 'Sonic', 'Spark', 'Suburban', 'Tahoe', 'Trailblazer',
      'Traverse', 'Trax'
    ],
    'Ram': [
      '1500', '2500', '3500', '4500', '5500', '1500 Classic', '2500 Classic',
      'ProMaster', 'ProMaster City'
    ],
    'GMC': [
      'Acadia', 'Canyon', 'Envoy', 'Hummer EV', 'Safari', 'Savana', 'Sierra 1500',
      'Sierra 2500HD', 'Sierra 3500HD', 'Terrain', 'Yukon', 'Yukon XL'
    ],
    'Toyota': [
      '4Runner', 'Avalon', 'Camry', 'C-HR', 'Corolla', 'Highlander', 'Land Cruiser',
      'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Tacoma', 'Tundra', 'Venza', 'Yaris'
    ],
    'Honda': [
      'Accord', 'Civic', 'CR-V', 'HR-V', 'Insight', 'Odyssey', 'Passport',
      'Pilot', 'Ridgeline'
    ],
    'Nissan': [
      'Altima', 'Armada', 'Frontier', 'Kicks', 'Leaf', 'Maxima', 'Murano',
      'NV200', 'Pathfinder', 'Rogue', 'Sentra', 'Titan', 'Versa'
    ],
    'Jeep': [
      'Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Patriot', 'Renegade',
      'Wrangler', 'Wrangler Unlimited'
    ],
    'BMW': [
      '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series',
      '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
      'Z3', 'Z4', 'i3', 'i8', 'M2', 'M3', 'M4', 'M5', 'M6'
    ],
    'Mercedes-Benz': [
      'A-Class', 'B-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'G-Class',
      'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'S-Class', 'SL', 'SLC', 'AMG GT'
    ]
  },

  // Engine sizes by manufacturer (realistic automotive engines)
  engines: {
    'Ford': [
      '1.0L EcoBoost I3', '1.5L EcoBoost I4', '2.0L EcoBoost I4', '2.3L EcoBoost I4',
      '2.7L EcoBoost V6', '3.0L EcoBoost V6', '3.3L V6', '3.5L EcoBoost V6',
      '3.5L V6', '5.0L V8', '6.2L V8', '6.7L Power Stroke V8 Diesel'
    ],
    'Chevrolet': [
      '1.4L Turbo I4', '1.5L Turbo I4', '2.0L Turbo I4', '2.5L I4', '3.6L V6',
      '5.3L V8', '6.0L V8', '6.2L V8', '6.6L Duramax V8 Diesel'
    ],
    'Ram': [
      '3.6L V6', '5.7L HEMI V8', '6.4L HEMI V8', '6.7L Cummins I6 Diesel'
    ],
    'GMC': [
      '2.5L I4', '2.8L Duramax I4 Diesel', '3.6L V6', '5.3L V8', '6.0L V8',
      '6.2L V8', '6.6L Duramax V8 Diesel'
    ],
    'Toyota': [
      '1.8L I4', '2.0L I4', '2.4L I4', '2.5L I4', '3.5L V6', '4.0L V6',
      '5.7L V8'
    ],
    'Honda': [
      '1.5L Turbo I4', '2.0L I4', '2.4L I4', '3.5L V6'
    ],
    'Nissan': [
      '1.6L I4', '2.0L I4', '2.5L I4', '3.5L V6', '5.6L V8'
    ],
    'Jeep': [
      '2.0L Turbo I4', '2.4L I4', '3.2L V6', '3.6L V6', '5.7L HEMI V8',
      '6.2L HEMI V8', '3.0L EcoDiesel V6'
    ],
    'BMW': [
      '2.0L Turbo I4', '3.0L Turbo I6', '4.4L Twin Turbo V8', '6.0L Twin Turbo V12'
    ],
    'Mercedes-Benz': [
      '2.0L Turbo I4', '3.0L Turbo V6', '4.0L Twin Turbo V8', '6.0L Twin Turbo V12'
    ]
  },

  // Correct drive types (FWD and 4WD are NOT the same)
  driveTypes: [
    'FWD',  // Front-Wheel Drive
    'RWD',  // Rear-Wheel Drive
    'AWD',  // All-Wheel Drive (permanent)
    '4WD'   // Four-Wheel Drive (selectable, different from AWD)
  ],

  transmissions: [
    '6-Speed Manual', '7-Speed Manual', '8-Speed Manual',
    '6-Speed Automatic', '7-Speed Automatic', '8-Speed Automatic', 
    '9-Speed Automatic', '10-Speed Automatic',
    'CVT', // Continuously Variable Transmission
    '6-Speed DCT', '7-Speed DCT' // Dual Clutch Transmission
  ]
}

// Helper function to get models for a specific make
export function getModelsForMake(make: string): string[] {
  return vehicleDatabase.models[make] || []
}

// Helper function to get engines for a specific make
export function getEnginesForMake(make: string): string[] {
  return vehicleDatabase.engines[make] || [
    '1.5L I4', '2.0L I4', '2.4L I4', '2.5L I4', '3.0L V6', '3.5L V6', '3.6L V6', '5.0L V8', '5.3L V8', '5.7L V8'
  ]
}

// Check if a year is valid (1990 to current + 1)
export function isValidYear(year: string): boolean {
  const yearNum = parseInt(year)
  const currentYear = new Date().getFullYear()
  return yearNum >= 1990 && yearNum <= currentYear + 1
}

// Get vehicle data for specific applications
export function getCommercialTruckData(): Partial<VehicleData> {
  return {
    makes: ['Freightliner', 'Peterbilt', 'Kenworth', 'Mack', 'International', 'Volvo'],
    engines: {
      'Freightliner': ['Detroit DD13', 'Detroit DD15', 'Detroit DD16', 'Cummins X15'],
      'Peterbilt': ['Cummins X15', 'Caterpillar C15', 'PACCAR MX-13'],
      'Kenworth': ['Cummins X15', 'PACCAR MX-13', 'Caterpillar C15'],
      'Mack': ['Mack MP7', 'Mack MP8', 'Cummins X15'],
      'International': ['Cummins X15', 'International A26'],
      'Volvo': ['Volvo D11', 'Volvo D13', 'Cummins X15']
    }
  }
}

export default vehicleDatabase