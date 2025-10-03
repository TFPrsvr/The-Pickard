// Comprehensive Vehicle Database for Automotive Mechanics and Powersports

export interface VehicleData {
  years: string[]
  makes: string[]
  models: Record<string, string[]>
  engines: Record<string, string[]> // engines by make
  driveTypes: string[]
  transmissions: string[]
}

export interface PowersportsData {
  motorcycleMakes: string[]
  atvMakes: string[]
  utvMakes: string[]
  snowmobileMakes: string[]
  watercraftMakes: string[]
  models: Record<string, string[]>
  displacements: string[] // Common CC ratings
  driveTypes: string[]
  strokeTypes: string[]
  coolingTypes: string[]
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

// Powersports Database - Motorcycles, ATVs, UTVs, Snowmobiles, Watercraft
export const powersportsDatabase: PowersportsData = {
  motorcycleMakes: [
    'Harley-Davidson', 'Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Ducati',
    'BMW', 'KTM', 'Triumph', 'Indian', 'Royal Enfield', 'Aprilia',
    'Husqvarna', 'Can-Am (Spyder)', 'Victory', 'Buell', 'Moto Guzzi',
    'MV Agusta', 'Benelli', 'CF Moto'
  ],

  atvMakes: [
    'Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Polaris', 'Can-Am',
    'Arctic Cat', 'Kymco', 'CF Moto', 'Textron (Alterra)', 'Bombardier'
  ],

  utvMakes: [
    'Polaris (RZR, Ranger)', 'Can-Am (Maverick, Defender)', 'Honda (Pioneer, Talon)',
    'Yamaha (Wolverine, YXZ)', 'Kawasaki (Teryx, Mule)', 'Arctic Cat (Wildcat, Prowler)',
    'Kubota (RTV)', 'John Deere (Gator)', 'CF Moto (ZForce)', 'Textron (Havoc)'
  ],

  snowmobileMakes: [
    'Polaris', 'Ski-Doo (BRP)', 'Arctic Cat', 'Yamaha'
  ],

  watercraftMakes: [
    'Sea-Doo (BRP)', 'Yamaha (WaveRunner)', 'Kawasaki (Jet Ski)'
  ],

  models: {
    // Motorcycles
    'Harley-Davidson': [
      'Road King', 'Street Glide', 'Road Glide', 'Electra Glide', 'Sportster',
      'Iron 883', 'Forty-Eight', 'Fat Boy', 'Softail', 'Street Bob',
      'Low Rider', 'Pan America', 'LiveWire'
    ],
    'Honda': [
      // Motorcycles
      'Gold Wing', 'Africa Twin', 'CB500X', 'CB650R', 'CBR600RR', 'CBR1000RR',
      'Rebel 500', 'Shadow', 'CRF450R', 'CRF250R',
      // ATVs
      'FourTrax Rancher', 'FourTrax Foreman', 'FourTrax Rincon', 'TRX90X',
      // UTVs
      'Pioneer 1000', 'Pioneer 700', 'Talon 1000R', 'Talon 1000X'
    ],
    'Yamaha': [
      // Motorcycles
      'YZF-R1', 'YZF-R6', 'MT-07', 'MT-09', 'MT-10', 'FJR1300', 'Tenere 700',
      'V Star', 'Bolt', 'Viking', 'YZ450F', 'WR450F',
      // ATVs
      'Kodiak 450', 'Kodiak 700', 'Grizzly 700', 'Raptor 700',
      // UTVs
      'Wolverine X2', 'Wolverine X4', 'YXZ1000R',
      // Snowmobiles
      'Sidewinder', 'VK Professional', 'Mountain Max',
      // Watercraft
      'WaveRunner VX', 'WaveRunner FX', 'SuperJet'
    ],
    'Kawasaki': [
      // Motorcycles
      'Ninja 400', 'Ninja 650', 'Ninja ZX-6R', 'Ninja ZX-10R', 'Ninja H2',
      'Z400', 'Z650', 'Z900', 'Versys 650', 'Versys 1000', 'Vulcan',
      'KLR650', 'KX450', 'KX250',
      // ATVs
      'Brute Force 300', 'Brute Force 750', 'KFX90',
      // UTVs
      'Teryx KRX 1000', 'Teryx4', 'Mule PRO-FXT',
      // Watercraft
      'Jet Ski Ultra 310', 'Jet Ski STX 160'
    ],
    'Suzuki': [
      // Motorcycles
      'GSX-R600', 'GSX-R750', 'GSX-R1000', 'GSX-S750', 'GSX-S1000',
      'Hayabusa', 'V-Strom 650', 'V-Strom 1050', 'SV650', 'Boulevard',
      'RM-Z450', 'DR-Z400',
      // ATVs
      'KingQuad 500', 'KingQuad 750', 'QuadSport Z90'
    ],
    'Polaris': [
      // ATVs
      'Sportsman 450', 'Sportsman 570', 'Sportsman 850', 'Sportsman XP 1000',
      'Scrambler 850', 'Outlaw 110',
      // UTVs
      'RZR Pro XP', 'RZR Turbo R', 'RZR XP 1000', 'RZR 900', 'RZR 200',
      'Ranger XP 1000', 'Ranger 570', 'Ranger Crew', 'General XP 1000',
      // Snowmobiles
      'Switchback', 'RMK', 'Indy', 'Titan'
    ],
    'Can-Am': [
      // Motorcycles/Trikes
      'Spyder F3', 'Spyder RT', 'Ryker',
      // ATVs
      'Outlander 450', 'Outlander 650', 'Outlander 850', 'Outlander 1000',
      'Renegade 650', 'Renegade 1000', 'DS 90',
      // UTVs
      'Maverick X3', 'Maverick Sport', 'Maverick Trail',
      'Defender HD8', 'Defender HD10', 'Defender MAX'
    ],
    'Arctic Cat': [
      // ATVs
      'Alterra 300', 'Alterra 570', 'Alterra 700', 'Alterra TRV 1000',
      // UTVs
      'Wildcat XX', 'Prowler Pro', 'Stampede',
      // Snowmobiles
      'ZR', 'M', 'Blast', 'Norseman'
    ],
    'Ski-Doo (BRP)': [
      'Summit', 'Renegade', 'MXZ', 'Expedition', 'Grand Touring', 'Skandic'
    ],
    'Sea-Doo (BRP)': [
      'Spark', 'GTI', 'GTX', 'RXT-X', 'Wake Pro', 'Fish Pro', 'Explorer Pro'
    ],
    'Ducati': [
      'Panigale V2', 'Panigale V4', 'Streetfighter V2', 'Streetfighter V4',
      'Monster', 'Supersport', 'Multistrada', 'Diavel', 'Scrambler'
    ],
    'BMW': [
      'S 1000 RR', 'S 1000 R', 'R 1250 GS', 'R 1250 RT', 'F 850 GS',
      'F 750 GS', 'R nineT', 'K 1600 GT'
    ],
    'KTM': [
      '390 Duke', '890 Duke', '1290 Super Duke', '390 Adventure', '890 Adventure',
      '1290 Super Adventure', 'RC 390', '450 SX-F', '250 SX-F'
    ]
  },

  // Common displacement ranges for powersports
  displacements: [
    '50cc', '90cc', '110cc', '125cc', '150cc', '200cc', '250cc', '300cc',
    '350cc', '400cc', '450cc', '500cc', '570cc', '600cc', '650cc', '700cc',
    '750cc', '800cc', '850cc', '900cc', '1000cc', '1050cc', '1100cc',
    '1200cc', '1250cc', '1300cc', '1400cc', '1500cc', '1600cc', '1700cc',
    '1800cc', '1900cc', '2000cc+'
  ],

  driveTypes: [
    'Chain', // Most common for motorcycles
    'Shaft', // Common for touring bikes
    'Belt', // Harley-Davidson and some cruisers
    '2WD', // ATV rear-wheel
    '4WD', // ATV/UTV all-wheel
    'AWD', // Some UTVs
    'Selectable 4WD' // Most ATVs/UTVs
  ],

  strokeTypes: [
    '2-stroke', // Older ATVs, dirt bikes, snowmobiles, some watercraft
    '4-stroke'  // Modern motorcycles, ATVs, UTVs
  ],

  coolingTypes: [
    'Liquid',  // Most modern powersports
    'Air',     // Older bikes, some cruisers
    'Oil'      // Some Harley-Davidsons
  ]
}

// Helper functions for powersports
export function getModelsForPowersportsMake(make: string): string[] {
  return powersportsDatabase.models[make] || []
}

export function getPowersportsMakesByCategory(category: 'motorcycle' | 'atv' | 'utv' | 'snowmobile' | 'watercraft'): string[] {
  switch (category) {
    case 'motorcycle':
      return powersportsDatabase.motorcycleMakes
    case 'atv':
      return powersportsDatabase.atvMakes
    case 'utv':
      return powersportsDatabase.utvMakes
    case 'snowmobile':
      return powersportsDatabase.snowmobileMakes
    case 'watercraft':
      return powersportsDatabase.watercraftMakes
    default:
      return []
  }
}

export default vehicleDatabase