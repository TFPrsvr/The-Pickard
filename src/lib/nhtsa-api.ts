// NHTSA API Integration for Vehicle Recalls and Safety Data
// Documentation: https://www.nhtsa.gov/nhtsa-datasets-and-apis

export interface NHTSARecall {
  RecallNumber: string
  RecallDate: string
  Component: string
  Summary: string
  Consequence: string
  Remedy: string
  Notes: string
  ModelYear: string
  Make: string
  Model: string
  RecallTypeID: string
  PotentialUnitsAffected: string
}

export interface NHTSAComplaint {
  ODINumber: string
  Manufacturer: string
  ModelYear: string
  Make: string
  Model: string
  Component: string
  Summary: string
  DateComplaintFiled: string
}

export interface NHTSASafetyRating {
  VehicleId: number
  ModelYear: string
  Make: string
  Model: string
  VehicleDescription: string
  OverallRating: string
  OverallFrontCrashRating: string
  FrontCrashDriversideRating: string
  FrontCrashPassengersideRating: string
  SideCrashRating: string
  RolloverRating: string
}

export interface NHTSAVehicleInfo {
  Results: {
    VehicleId: number
    ModelYear: string
    Make: string
    Model: string
    Trim: string
    Engine: string
    DriveType: string
    Transmission: string
    FuelTypePrimary: string
    VehicleType: string
  }[]
}

export class NHTSAService {
  private readonly baseUrl = 'https://api.nhtsa.gov/recalls/recallsByVehicle'
  private readonly complaintsUrl = 'https://api.nhtsa.gov/complaints/complaintsByVehicle'
  private readonly ratingsUrl = 'https://api.nhtsa.gov/SafetyRatings'
  private readonly vehicleUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles'

  /**
   * Get recalls for a specific vehicle
   */
  async getRecallsByVehicle(
    modelYear: string, 
    make: string, 
    model: string
  ): Promise<NHTSARecall[]> {
    try {
      const url = `${this.baseUrl}?modelYear=${modelYear}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`NHTSA API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error fetching NHTSA recalls:', error)
      return []
    }
  }

  /**
   * Get complaints for a specific vehicle
   */
  async getComplaintsByVehicle(
    modelYear: string, 
    make: string, 
    model: string
  ): Promise<NHTSAComplaint[]> {
    try {
      const url = `${this.complaintsUrl}?modelYear=${modelYear}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`NHTSA Complaints API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Error fetching NHTSA complaints:', error)
      return []
    }
  }

  /**
   * Get safety ratings for a vehicle
   */
  async getSafetyRating(
    modelYear: string, 
    make: string, 
    model: string
  ): Promise<NHTSASafetyRating | null> {
    try {
      const url = `${this.ratingsUrl}/modelyear/${modelYear}/make/${encodeURIComponent(make)}/model/${encodeURIComponent(model)}?format=json`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`NHTSA Safety Ratings API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.Results?.[0] || null
    } catch (error) {
      console.error('Error fetching NHTSA safety ratings:', error)
      return null
    }
  }

  /**
   * Decode VIN to get vehicle information
   */
  async decodeVIN(vin: string): Promise<NHTSAVehicleInfo | null> {
    try {
      const url = `${this.vehicleUrl}/DecodeVin/${vin}?format=json`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`NHTSA VIN Decode API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data || null
    } catch (error) {
      console.error('Error decoding VIN:', error)
      return null
    }
  }

  /**
   * Get comprehensive vehicle data including recalls, complaints, and safety ratings
   */
  async getVehicleData(modelYear: string, make: string, model: string) {
    try {
      const [recalls, complaints, safetyRating] = await Promise.allSettled([
        this.getRecallsByVehicle(modelYear, make, model),
        this.getComplaintsByVehicle(modelYear, make, model),
        this.getSafetyRating(modelYear, make, model)
      ])

      return {
        recalls: recalls.status === 'fulfilled' ? recalls.value : [],
        complaints: complaints.status === 'fulfilled' ? complaints.value : [],
        safetyRating: safetyRating.status === 'fulfilled' ? safetyRating.value : null,
        summary: {
          totalRecalls: recalls.status === 'fulfilled' ? recalls.value.length : 0,
          totalComplaints: complaints.status === 'fulfilled' ? complaints.value.length : 0,
          overallSafetyRating: safetyRating.status === 'fulfilled' && safetyRating.value 
            ? safetyRating.value.OverallRating 
            : 'Not Rated'
        }
      }
    } catch (error) {
      console.error('Error getting comprehensive vehicle data:', error)
      return {
        recalls: [],
        complaints: [],
        safetyRating: null,
        summary: {
          totalRecalls: 0,
          totalComplaints: 0,
          overallSafetyRating: 'Not Available'
        }
      }
    }
  }

  /**
   * Search for recent recalls across all vehicles
   */
  async getRecentRecalls(limit: number = 10): Promise<NHTSARecall[]> {
    try {
      const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?modelYear=2023,2024&format=json`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`NHTSA Recent Recalls API error: ${response.statusText}`)
      }

      const data = await response.json()
      const recalls = data.results || []
      
      // Sort by recall date (most recent first) and limit results
      return recalls
        .sort((a: NHTSARecall, b: NHTSARecall) => 
          new Date(b.RecallDate).getTime() - new Date(a.RecallDate).getTime()
        )
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching recent recalls:', error)
      return []
    }
  }

  /**
   * Format recall severity based on consequence text
   */
  getRecallSeverity(consequence: string): 'critical' | 'high' | 'medium' | 'low' {
    const criticalKeywords = ['fire', 'death', 'injury', 'crash', 'accident', 'brake', 'steering']
    const highKeywords = ['engine', 'transmission', 'airbag', 'seatbelt', 'fuel', 'electrical']
    const mediumKeywords = ['light', 'warning', 'display', 'door', 'window', 'seat']
    
    const text = consequence.toLowerCase()
    
    if (criticalKeywords.some(keyword => text.includes(keyword))) {
      return 'critical'
    } else if (highKeywords.some(keyword => text.includes(keyword))) {
      return 'high'
    } else if (mediumKeywords.some(keyword => text.includes(keyword))) {
      return 'medium'
    } else {
      return 'low'
    }
  }
}

// Singleton instance
export const nhtsaService = new NHTSAService()