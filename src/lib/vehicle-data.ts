// Comprehensive Vehicle Database for Automotive Mechanics and Powersports

export interface YearRange {
  start: number
  end?: number // undefined means still in production
}

export interface MakeData {
  name: string
  yearRange: YearRange
}

export interface ModelData {
  name: string
  yearRange: YearRange
}

export interface EngineData {
  name: string
  yearRange?: YearRange
}

export interface VehicleData {
  years: string[]
  makes: string[]
  models: Record<string, string[]>
  engines: Record<string, string[]> // engines by make
  driveTypes: string[]
  transmissions: string[]
  // Year-based metadata for cascading filters
  makeYearRanges?: Record<string, YearRange>
  modelYearRanges?: Record<string, Record<string, YearRange>> // make -> model -> yearRange
  engineYearRanges?: Record<string, Record<string, YearRange>> // make -> engine -> yearRange
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
  // Year-based metadata
  makeYearRanges?: Record<string, YearRange>
  modelYearRanges?: Record<string, Record<string, YearRange>>
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
  ],

  // Year ranges for makes (when they started/ended production for US market)
  makeYearRanges: {
    'Acura': { start: 1986 },
    'Alfa Romeo': { start: 1990 },
    'Audi': { start: 1970 },
    'BMW': { start: 1975 },
    'Buick': { start: 1903 },
    'Cadillac': { start: 1902 },
    'Chevrolet': { start: 1911 },
    'Chrysler': { start: 1924 },
    'Daewoo': { start: 1998, end: 2002 },
    'Dodge': { start: 1914 },
    'Eagle': { start: 1988, end: 1998 },
    'Fiat': { start: 2011 },
    'Ford': { start: 1903 },
    'Geo': { start: 1989, end: 1997 },
    'GMC': { start: 1911 },
    'Honda': { start: 1970 },
    'Hummer': { start: 1992, end: 2010 },
    'Hyundai': { start: 1986 },
    'Infiniti': { start: 1989 },
    'Isuzu': { start: 1981, end: 2009 },
    'Jeep': { start: 1941 },
    'Kia': { start: 1992 },
    'Lexus': { start: 1989 },
    'Lincoln': { start: 1917 },
    'Mazda': { start: 1970 },
    'Mercedes-Benz': { start: 1965 },
    'Mercury': { start: 1938, end: 2011 },
    'Mini': { start: 2002 },
    'Mitsubishi': { start: 1982 },
    'Nissan': { start: 1958 },
    'Oldsmobile': { start: 1897, end: 2004 },
    'Plymouth': { start: 1928, end: 2001 },
    'Pontiac': { start: 1926, end: 2010 },
    'Porsche': { start: 1950 },
    'Ram': { start: 2010 },
    'Saab': { start: 1949, end: 2011 },
    'Saturn': { start: 1990, end: 2010 },
    'Scion': { start: 2003, end: 2016 },
    'Smart': { start: 2008, end: 2019 },
    'Subaru': { start: 1968 },
    'Suzuki': { start: 1985, end: 2012 },
    'Tesla': { start: 2008 },
    'Toyota': { start: 1957 },
    'Volkswagen': { start: 1949 },
    'Volvo': { start: 1955 },
    'Yugo': { start: 1985, end: 1992 }
  },

  // Year ranges for specific models by make
  modelYearRanges: {
    'Ford': {
      'Bronco': { start: 1966, end: 1996 },
      'Bronco Sport': { start: 2021 },
      'C-Max': { start: 2013, end: 2018 },
      'Edge': { start: 2007 },
      'EcoSport': { start: 2018, end: 2022 },
      'Escape': { start: 2001 },
      'Expedition': { start: 1997 },
      'Explorer': { start: 1991 },
      'F-150': { start: 1948 },
      'F-250 Super Duty': { start: 1999 },
      'F-350 Super Duty': { start: 1999 },
      'Fiesta': { start: 2011, end: 2019 },
      'Flex': { start: 2009, end: 2019 },
      'Focus': { start: 2000, end: 2018 },
      'Fusion': { start: 2006, end: 2020 },
      'GT': { start: 2005, end: 2006 },
      'Maverick': { start: 2022 },
      'Mustang': { start: 1964 },
      'Mustang Mach-E': { start: 2021 },
      'Ranger': { start: 1983 },
      'Taurus': { start: 1986 },
      'Transit': { start: 2015 },
      'Transit Connect': { start: 2010 }
    },
    'Chevrolet': {
      'Blazer': { start: 1969 },
      'Bolt EV': { start: 2017 },
      'Bolt EUV': { start: 2022 },
      'Camaro': { start: 1967 },
      'Colorado': { start: 2004 },
      'Corvette': { start: 1953 },
      'Cruze': { start: 2011, end: 2019 },
      'Equinox': { start: 2005 },
      'Express': { start: 1996 },
      'Impala': { start: 1958 },
      'Malibu': { start: 1964 },
      'Silverado 1500': { start: 1999 },
      'Silverado 2500HD': { start: 2001 },
      'Silverado 3500HD': { start: 2001 },
      'Sonic': { start: 2012, end: 2020 },
      'Spark': { start: 2013, end: 2022 },
      'Suburban': { start: 1935 },
      'Tahoe': { start: 1995 },
      'Trailblazer': { start: 2002 },
      'Traverse': { start: 2009 },
      'Trax': { start: 2015 }
    },
    'Toyota': {
      '4Runner': { start: 1984 },
      'Avalon': { start: 1995 },
      'Camry': { start: 1983 },
      'C-HR': { start: 2018 },
      'Corolla': { start: 1968 },
      'Highlander': { start: 2001 },
      'Land Cruiser': { start: 1960, end: 2021 },
      'Prius': { start: 2001 },
      'RAV4': { start: 1996 },
      'Sequoia': { start: 2001 },
      'Sienna': { start: 1998 },
      'Tacoma': { start: 1995 },
      'Tundra': { start: 2000 },
      'Venza': { start: 2009 },
      'Yaris': { start: 2007, end: 2020 }
    },
    'Honda': {
      'Accord': { start: 1976 },
      'Civic': { start: 1973 },
      'CR-V': { start: 1997 },
      'HR-V': { start: 2016 },
      'Insight': { start: 2000 },
      'Odyssey': { start: 1995 },
      'Passport': { start: 1994 },
      'Pilot': { start: 2003 },
      'Ridgeline': { start: 2006 }
    },
    'Ram': {
      '1500': { start: 2010 },
      '2500': { start: 2010 },
      '3500': { start: 2010 },
      '4500': { start: 2011 },
      '5500': { start: 2011 },
      'ProMaster': { start: 2014 },
      'ProMaster City': { start: 2015 }
    }
  },

  // Engine year ranges by make (when specific engines were available)
  engineYearRanges: {
    'Ford': {
      '1.0L EcoBoost I3': { start: 2014 },
      '1.5L EcoBoost I4': { start: 2015 },
      '2.0L EcoBoost I4': { start: 2010 },
      '2.3L EcoBoost I4': { start: 2015 },
      '2.7L EcoBoost V6': { start: 2015 },
      '3.0L EcoBoost V6': { start: 2019 },
      '3.5L EcoBoost V6': { start: 2010 },
      '5.0L V8': { start: 2011 },
      '6.2L V8': { start: 2010 },
      '6.7L Power Stroke V8 Diesel': { start: 2011 }
    },
    'Chevrolet': {
      '1.4L Turbo I4': { start: 2011 },
      '1.5L Turbo I4': { start: 2016 },
      '2.0L Turbo I4': { start: 2013 },
      '5.3L V8': { start: 1999 },
      '6.2L V8': { start: 2009 },
      '6.6L Duramax V8 Diesel': { start: 2001 }
    }
  }
}

// Helper function to check if a year is within a year range
function isYearInRange(year: number, range?: YearRange): boolean {
  if (!range) return true // No range specified means all years
  const inRange = year >= range.start && (range.end === undefined || year <= range.end)
  return inRange
}

// Get makes available for a specific year
export function getMakesForYear(year: number): string[] {
  if (!vehicleDatabase.makeYearRanges) {
    return vehicleDatabase.makes // Fallback if no year data
  }

  return vehicleDatabase.makes.filter(make => {
    const range = vehicleDatabase.makeYearRanges![make]
    return isYearInRange(year, range)
  })
}

// Get models available for a specific make and year
export function getModelsForMakeAndYear(make: string, year?: number): string[] {
  const allModels = vehicleDatabase.models[make] || []

  if (!year || !vehicleDatabase.modelYearRanges?.[make]) {
    return allModels // No year specified or no year data
  }

  return allModels.filter(model => {
    const range = vehicleDatabase.modelYearRanges![make]?.[model]
    return isYearInRange(year, range)
  })
}

// Get engines available for a specific make and year
export function getEnginesForMakeAndYear(make: string, year?: number): string[] {
  const allEngines = vehicleDatabase.engines[make] || [
    '1.5L I4', '2.0L I4', '2.4L I4', '2.5L I4', '3.0L V6', '3.5L V6', '3.6L V6', '5.0L V8', '5.3L V8', '5.7L V8'
  ]

  if (!year || !vehicleDatabase.engineYearRanges?.[make]) {
    return allEngines // No year specified or no year data
  }

  return allEngines.filter(engine => {
    const range = vehicleDatabase.engineYearRanges![make]?.[engine]
    return isYearInRange(year, range)
  })
}

// Legacy helper functions (kept for backward compatibility)
export function getModelsForMake(make: string): string[] {
  return vehicleDatabase.models[make] || []
}

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
  ],

  // Year ranges for powersports makes
  makeYearRanges: {
    'Harley-Davidson': { start: 1903 },
    'Honda': { start: 1959 },
    'Yamaha': { start: 1955 },
    'Kawasaki': { start: 1963 },
    'Suzuki': { start: 1952 },
    'Ducati': { start: 1926 },
    'BMW': { start: 1923 },
    'KTM': { start: 1992 },
    'Triumph': { start: 1902 },
    'Indian': { start: 1901 },
    'Polaris': { start: 1954 },
    'Can-Am': { start: 1973 },
    'Arctic Cat': { start: 1960 },
    'Ski-Doo (BRP)': { start: 1959 },
    'Sea-Doo (BRP)': { start: 1988 }
  },

  // Year ranges for powersports models
  modelYearRanges: {
    'Harley-Davidson': {
      'LiveWire': { start: 2019 },
      'Pan America': { start: 2021 },
      'Sportster': { start: 1957 },
      'Road King': { start: 1994 },
      'Street Glide': { start: 2006 },
      'Road Glide': { start: 1998 },
      'Fat Boy': { start: 1990 }
    },
    'Polaris': {
      'RZR Pro XP': { start: 2020 },
      'RZR Turbo R': { start: 2022 },
      'RZR 200': { start: 2017 },
      'Ranger XP 1000': { start: 2013 },
      'Sportsman XP 1000': { start: 2015 }
    },
    'Can-Am': {
      'Maverick X3': { start: 2017 },
      'Defender': { start: 2016 },
      'Ryker': { start: 2019 },
      'Spyder F3': { start: 2015 }
    },
    'Yamaha': {
      'YZF-R1': { start: 1998 },
      'YZF-R6': { start: 1999 },
      'MT-09': { start: 2014 },
      'MT-07': { start: 2015 },
      'Tenere 700': { start: 2020 },
      'YXZ1000R': { start: 2016 }
    },
    'Honda': {
      'Africa Twin': { start: 1988 },
      'Gold Wing': { start: 1975 },
      'CBR1000RR': { start: 2004 },
      'Talon 1000R': { start: 2019 },
      'Pioneer 1000': { start: 2016 }
    }
  }
}

// Helper functions for powersports

// Get powersports makes by category and optional year
export function getPowersportsMakesByCategory(
  category: 'motorcycle' | 'atv' | 'utv' | 'snowmobile' | 'watercraft',
  year?: number
): string[] {
  let makes: string[]
  switch (category) {
    case 'motorcycle':
      makes = powersportsDatabase.motorcycleMakes
      break
    case 'atv':
      makes = powersportsDatabase.atvMakes
      break
    case 'utv':
      makes = powersportsDatabase.utvMakes
      break
    case 'snowmobile':
      makes = powersportsDatabase.snowmobileMakes
      break
    case 'watercraft':
      makes = powersportsDatabase.watercraftMakes
      break
    default:
      return []
  }

  if (!year || !powersportsDatabase.makeYearRanges) {
    return makes
  }

  return makes.filter(make => {
    const range = powersportsDatabase.makeYearRanges![make]
    return isYearInRange(year, range)
  })
}

// Get powersports models for a specific make and optional year
export function getPowersportsModelsForMakeAndYear(make: string, year?: number): string[] {
  const allModels = powersportsDatabase.models[make] || []

  if (!year || !powersportsDatabase.modelYearRanges?.[make]) {
    return allModels
  }

  return allModels.filter(model => {
    const range = powersportsDatabase.modelYearRanges![make]?.[model]
    return isYearInRange(year, range)
  })
}

// Legacy helper (kept for backward compatibility)
export function getModelsForPowersportsMake(make: string): string[] {
  return powersportsDatabase.models[make] || []
}

export default vehicleDatabase