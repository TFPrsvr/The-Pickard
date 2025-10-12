/**
 * NHTSA vPIC API Integration
 * National Highway Traffic Safety Administration Vehicle Product Information Catalog
 * Official US Government vehicle database with accurate specifications
 *
 * API Documentation: https://vpic.nhtsa.dot.gov/api/
 */

const VPIC_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles'

export interface VPICMake {
  Make_ID: number
  Make_Name: string
}

export interface VPICModel {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

export interface VPICVehicleType {
  VehicleTypeId: number
  VehicleTypeName: string
}

export interface VPICEngineModel {
  EngineManufacturer: string
  EngineModel: string
  EngineCylinders: string
  DisplacementCC: string
  DisplacementCI: string
  DisplacementL: string
  FuelTypePrimary: string
}

export interface VPICDriveType {
  DriveType: string
}

export interface VPICVehicleVariable {
  Id: number
  Name: string
  Value: string
}

/**
 * Get all vehicle makes from NHTSA database
 */
export async function getAllMakes(): Promise<VPICMake[]> {
  try {
    const response = await fetch(`${VPIC_BASE_URL}/GetAllMakes?format=json`)
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      return data.Results.map((make: any) => ({
        Make_ID: make.Make_ID,
        Make_Name: make.Make_Name
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching makes from NHTSA vPIC:', error)
    return []
  }
}

/**
 * Get all models for a specific make
 */
export async function getModelsForMake(make: string): Promise<VPICModel[]> {
  try {
    const response = await fetch(
      `${VPIC_BASE_URL}/GetModelsForMake/${encodeURIComponent(make)}?format=json`
    )
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      return data.Results.map((model: any) => ({
        Make_ID: model.Make_ID,
        Make_Name: model.Make_Name,
        Model_ID: model.Model_ID,
        Model_Name: model.Model_Name
      }))
    }

    return []
  } catch (error) {
    console.error(`Error fetching models for ${make} from NHTSA vPIC:`, error)
    return []
  }
}

/**
 * Get makes for a specific year
 */
export async function getMakesForYear(year: number): Promise<VPICMake[]> {
  try {
    const response = await fetch(
      `${VPIC_BASE_URL}/GetMakesForVehicleType/car?year=${year}&format=json`
    )
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      return data.Results.map((make: any) => ({
        Make_ID: make.MakeId,
        Make_Name: make.MakeName
      }))
    }

    return []
  } catch (error) {
    console.error(`Error fetching makes for year ${year} from NHTSA vPIC:`, error)
    return []
  }
}

/**
 * Get models for a specific make and year
 */
export async function getModelsForMakeYear(make: string, year: number): Promise<VPICModel[]> {
  try {
    const response = await fetch(
      `${VPIC_BASE_URL}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`
    )
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      return data.Results.map((model: any) => ({
        Make_ID: model.Make_ID,
        Make_Name: model.Make_Name,
        Model_ID: model.Model_ID,
        Model_Name: model.Model_Name
      }))
    }

    return []
  } catch (error) {
    console.error(`Error fetching models for ${make} ${year} from NHTSA vPIC:`, error)
    return []
  }
}

/**
 * Get vehicle specifications by VIN (17-digit Vehicle Identification Number)
 * This provides detailed information including engine specs, drive type, etc.
 */
export async function decodeVIN(vin: string): Promise<VPICVehicleVariable[]> {
  try {
    const response = await fetch(
      `${VPIC_BASE_URL}/DecodeVinValues/${vin}?format=json`
    )
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      const result = data.Results[0]

      // Convert object properties to array of variables
      const variables: VPICVehicleVariable[] = []
      Object.keys(result).forEach((key, index) => {
        if (result[key] && result[key] !== 'Not Applicable' && result[key] !== '') {
          variables.push({
            Id: index,
            Name: key,
            Value: result[key]
          })
        }
      })

      return variables
    }

    return []
  } catch (error) {
    console.error(`Error decoding VIN ${vin} from NHTSA vPIC:`, error)
    return []
  }
}

/**
 * Get detailed vehicle specs by Year/Make/Model
 * Note: This returns WMI (World Manufacturer Identifier) data which can be used
 * to get more detailed specs
 */
export async function getVehicleVariablesByYearMakeModel(
  year: number,
  make: string,
  model: string
): Promise<any> {
  try {
    const response = await fetch(
      `${VPIC_BASE_URL}/GetWMIsForManufacturer/${encodeURIComponent(make)}?format=json`
    )
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      return data.Results
    }

    return []
  } catch (error) {
    console.error(`Error fetching specs for ${year} ${make} ${model}:`, error)
    return []
  }
}

/**
 * Get all vehicle types (car, truck, MPV, etc.)
 */
export async function getVehicleTypes(): Promise<VPICVehicleType[]> {
  try {
    const response = await fetch(
      `${VPIC_BASE_URL}/GetVehicleTypesForMake/ford?format=json`
    )
    const data = await response.json()

    if (data.Count > 0 && data.Results) {
      return data.Results.map((type: any) => ({
        VehicleTypeId: type.VehicleTypeId,
        VehicleTypeName: type.VehicleTypeName
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching vehicle types from NHTSA vPIC:', error)
    return []
  }
}

/**
 * Batch fetch vehicle data for multiple year/make/model combinations
 * This is useful for populating the database
 */
export async function batchFetchVehicleData(
  yearStart: number,
  yearEnd: number,
  makes: string[]
): Promise<Map<string, any>> {
  const vehicleData = new Map<string, any>()

  for (let year = yearStart; year <= yearEnd; year++) {
    for (const make of makes) {
      try {
        const models = await getModelsForMakeYear(make, year)

        if (models.length > 0) {
          const key = `${year}-${make}`
          vehicleData.set(key, {
            year,
            make,
            models: models.map(m => m.Model_Name),
            modelCount: models.length
          })
        }

        // Rate limiting - NHTSA allows reasonable request rates
        await new Promise(resolve => setTimeout(resolve, 100)) // 10 requests per second

      } catch (error) {
        console.error(`Error fetching data for ${year} ${make}:`, error)
      }
    }

    console.log(`Completed fetching data for year ${year}`)
  }

  return vehicleData
}

/**
 * Helper function to extract engine information from decoded VIN data
 */
export function extractEngineInfo(decodedData: VPICVehicleVariable[]): {
  displacement: string | null
  cylinders: string | null
  fuelType: string | null
  engineModel: string | null
} {
  const engineInfo = {
    displacement: null as string | null,
    cylinders: null as string | null,
    fuelType: null as string | null,
    engineModel: null as string | null
  }

  decodedData.forEach(variable => {
    switch (variable.Name) {
      case 'DisplacementL':
        engineInfo.displacement = variable.Value
        break
      case 'EngineCylinders':
        engineInfo.cylinders = variable.Value
        break
      case 'FuelTypePrimary':
        engineInfo.fuelType = variable.Value
        break
      case 'EngineModel':
        engineInfo.engineModel = variable.Value
        break
    }
  })

  return engineInfo
}

/**
 * Helper function to extract drive type from decoded VIN data
 */
export function extractDriveType(decodedData: VPICVehicleVariable[]): string | null {
  const driveTypeVar = decodedData.find(v => v.Name === 'DriveType')
  return driveTypeVar ? driveTypeVar.Value : null
}

/**
 * Helper function to map NHTSA vehicle types to our categories
 */
export function mapVehicleTypeToCategory(vehicleTypeName: string): string {
  const lowerType = vehicleTypeName.toLowerCase()

  if (lowerType.includes('passenger') || lowerType.includes('sedan') || lowerType.includes('coupe')) {
    return 'car'
  }
  if (lowerType.includes('truck') || lowerType.includes('pickup')) {
    return 'truck'
  }
  if (lowerType.includes('multipurpose') || lowerType.includes('suv')) {
    return 'car' // or 'suv' if you have that category
  }
  if (lowerType.includes('motorcycle')) {
    return 'motorcycle'
  }
  if (lowerType.includes('trailer')) {
    return '18-wheeler'
  }

  return 'car' // default
}

export default {
  getAllMakes,
  getModelsForMake,
  getMakesForYear,
  getModelsForMakeYear,
  decodeVIN,
  getVehicleVariablesByYearMakeModel,
  getVehicleTypes,
  batchFetchVehicleData,
  extractEngineInfo,
  extractDriveType,
  mapVehicleTypeToCategory
}
