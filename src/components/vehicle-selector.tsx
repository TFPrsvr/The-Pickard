'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SearchFilters } from '@/types'
import PropTypes from 'prop-types'

interface VehicleSelectorProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

// Mock data that would come from your database
const vehicleData = {
  years: Array.from({length: 35}, (_, i) => String(2025 - i)), // 2025 down to 1990
  
  // Common makes available for most years
  commonMakes: ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
  
  makesByYear: {
    '2024': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln'],
    '2023': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2022': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2021': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2020': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2019': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2018': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2017': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2016': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2015': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2014': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2013': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Ram', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2012': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2011': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2010': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2009': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2008': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2007': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2006': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick'],
    '2005': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Jeep', 'Hyundai', 'Kia', 'Subaru', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Mitsubishi', 'Volvo', 'Lexus', 'Acura', 'Infiniti', 'Cadillac', 'Lincoln', 'Buick']
  },
  modelsByYearMake: {
    // Ford models for different years
    '2024-Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Expedition', 'Ranger', 'Bronco'],
    '2023-Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Expedition', 'Ranger', 'Bronco', 'Transit'],
    '2022-Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Expedition', 'Ranger', 'Bronco', 'Transit', 'Fusion'],
    '2021-Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Expedition', 'Ranger', 'Bronco', 'Transit', 'Fusion'],
    '2020-Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Expedition', 'Ranger', 'Transit', 'Fusion', 'Focus'],
    
    // Chevrolet models
    '2024-Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Colorado'],
    '2023-Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Colorado', 'Blazer'],
    '2022-Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Colorado', 'Blazer', 'Malibu'],
    '2021-Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Colorado', 'Blazer', 'Malibu'],
    '2020-Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Colorado', 'Blazer', 'Malibu', 'Impala'],
    
    // Toyota models
    '2024-Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia'],
    '2023-Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Venza'],
    '2022-Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Venza', 'Avalon'],
    '2021-Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Venza', 'Avalon'],
    '2020-Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Avalon', 'C-HR'],
    
    // Honda models
    '2024-Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Passport', 'Ridgeline', 'Odyssey'],
    '2023-Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Passport', 'Ridgeline', 'Odyssey', 'Insight'],
    '2022-Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Passport', 'Ridgeline', 'Odyssey', 'Insight'],
    '2021-Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Passport', 'Ridgeline', 'Odyssey', 'Insight'],
    '2020-Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Passport', 'Ridgeline', 'Odyssey', 'Insight', 'Fit'],
    
    // Generic fallback for other combinations - use common models
    'DEFAULT': ['Popular Model 1', 'Popular Model 2', 'Popular Model 3', 'Popular Model 4', 'Popular Model 5']
  },
  submodelsByYearMakeModel: {
    '2024-Ford-F-150': ['Regular Cab', 'SuperCab', 'SuperCrew', 'Lightning', 'Raptor'],
    '2024-Ford-Mustang': ['EcoBoost', 'GT', 'Mach 1', 'Shelby GT350', 'Shelby GT500'],
    '2024-Chevrolet-Silverado 1500': ['Regular Cab', 'Double Cab', 'Crew Cab', 'Work Truck', 'LT', 'RST', 'LTZ', 'High Country'],
    // Add more combinations
  },
  enginesByYearMakeModelSubmodel: {
    '2024-Ford-F-150-SuperCrew': ['2.7L V6 EcoBoost', '3.5L V6 EcoBoost', '5.0L V8', '3.5L PowerBoost Hybrid V6'],
    '2024-Ford-Mustang-GT': ['5.0L V8'],
    '2024-Ford-Mustang-EcoBoost': ['2.3L I4 EcoBoost'],
    // Add more combinations
  },
  driveTypesByYearMakeModelSubmodelEngine: {
    '2024-Ford-F-150-SuperCrew-2.7L V6 EcoBoost': ['2WD', '4WD'],
    '2024-Ford-F-150-SuperCrew-5.0L V8': ['2WD', '4WD'],
    '2024-Ford-Mustang-GT-5.0L V8': ['2WD'],
    // Add more combinations
  }
}

export function VehicleSelector({ filters, onFiltersChange }: VehicleSelectorProps) {
  const [availableMakes, setAvailableMakes] = useState<string[]>([])
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [availableSubmodels, setAvailableSubmodels] = useState<string[]>([])
  const [availableEngines, setAvailableEngines] = useState<string[]>([])
  const [availableDriveTypes, setAvailableDriveTypes] = useState<string[]>([])

  const selectedYear = filters.year?.[0]?.toString()
  const selectedMake = filters.make?.[0]
  const selectedModel = filters.model?.[0]
  const selectedSubmodel = filters.submodel?.[0]
  const selectedEngine = filters.engineType?.[0]


  // Update available options based on selections
  useEffect(() => {
    if (selectedYear) {
      const makes = (vehicleData.makesByYear as any)[selectedYear] || []
      
      if (makes.length === 0) {
        setAvailableMakes(vehicleData.commonMakes)
      } else {
        setAvailableMakes([...makes])
      }
      
      // Reset dependent fields
      if (!makes.includes(selectedMake || '')) {
        onFiltersChange({
          ...filters,
          make: undefined,
          model: undefined,
          submodel: undefined,
          engineType: undefined,
          driveType: undefined
        })
      }
    } else {
      setAvailableMakes([])
    }
  }, [selectedYear])


  useEffect(() => {
    if (selectedYear && selectedMake) {
      const key = `${selectedYear}-${selectedMake}`
      let models = (vehicleData.modelsByYearMake as any)[key]
      
      // If no specific data exists, use common models for that make
      if (!models) {
        // Use common models based on make
        const commonModelsByMake: { [key: string]: string[] } = {
          'Ford': ['F-150', 'F-250', 'F-350', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Expedition', 'Ranger', 'Fusion', 'Focus'],
          'Chevrolet': ['Silverado 1500', 'Silverado 2500HD', 'Silverado 3500HD', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette', 'Colorado', 'Malibu'],
          'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Sienna', '4Runner', 'Sequoia', 'Avalon'],
          'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Passport', 'Ridgeline', 'Odyssey'],
          'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Titan', 'Murano', 'Maxima'],
          'Ram': ['1500', '2500', '3500', 'ProMaster'],
          'GMC': ['Sierra 1500', 'Sierra 2500HD', 'Sierra 3500HD', 'Terrain', 'Acadia', 'Yukon', 'Canyon'],
          'Jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator'],
        }
        models = commonModelsByMake[selectedMake] || []
      }
      
      setAvailableModels(models)
      
      // Reset dependent fields
      if (!models.includes(selectedModel || '')) {
        onFiltersChange({
          ...filters,
          model: undefined,
          submodel: undefined,
          engineType: undefined,
          driveType: undefined
        })
      }
    }
  }, [selectedYear, selectedMake])

  useEffect(() => {
    if (selectedYear && selectedMake && selectedModel) {
      const key = `${selectedYear}-${selectedMake}-${selectedModel}`
      let submodels = (vehicleData.submodelsByYearMakeModel as any)[key] || []
      
      // Only add submodels for vehicles that actually have meaningful trim levels
      if (submodels.length === 0) {
        const commonSubmodels: { [key: string]: string[] } = {
          'F-150': ['Regular Cab', 'SuperCab', 'SuperCrew', 'Lightning', 'Raptor'],
          'F-250': ['Regular Cab', 'SuperCab', 'Crew Cab'],
          'F-350': ['Regular Cab', 'SuperCab', 'Crew Cab'],
          'Silverado 1500': ['Regular Cab', 'Double Cab', 'Crew Cab', 'Work Truck', 'LT', 'RST', 'LTZ', 'High Country'],
          'Silverado 2500HD': ['Regular Cab', 'Double Cab', 'Crew Cab', 'Work Truck', 'LT', 'LTZ', 'High Country'],
          'Silverado 3500HD': ['Regular Cab', 'Double Cab', 'Crew Cab', 'Work Truck', 'LT', 'LTZ', 'High Country'],
          'Camry': ['L', 'LE', 'SE', 'XLE', 'XSE', 'TRD'],
          'Civic': ['LX', 'Sport', 'EX', 'EX-L', 'Touring', 'Type R'],
          'Accord': ['LX', 'Sport', 'EX', 'EX-L', 'Touring'],
          'Mustang': ['EcoBoost', 'EcoBoost Premium', 'GT', 'GT Premium', 'Mach 1', 'Shelby GT350', 'Shelby GT500'],
          'Explorer': ['Base', 'XLT', 'Limited', 'Platinum', 'ST'],
          'Escape': ['S', 'SE', 'SEL', 'Titanium'],
          'RAV4': ['LE', 'XLE', 'XLE Premium', 'Adventure', 'TRD Off-Road', 'Limited', 'Prime'],
          'CR-V': ['LX', 'EX', 'EX-L', 'Touring'],
          'Pilot': ['LX', 'EX', 'EX-L', 'Touring', 'Elite'],
          'Tacoma': ['SR', 'SR5', 'TRD Sport', 'TRD Off-Road', 'Limited', 'TRD Pro'],
          'Tundra': ['SR', 'SR5', 'Limited', 'Platinum', '1794', 'TRD Pro'],
          'Altima': ['S', 'SV', 'SL', 'SR'],
          'Rogue': ['S', 'SV', 'SL'],
          'Equinox': ['L', 'LS', 'LT', 'Premier'],
          'Traverse': ['L', 'LS', 'LT', 'Premier', 'RS'],
          'Tahoe': ['LS', 'LT', 'RST', 'Z71', 'Premier', 'High Country'],
          'Suburban': ['LS', 'LT', 'RST', 'Z71', 'Premier', 'High Country']
        }
        
        // Only use submodels if the model has specific trim levels, otherwise leave empty
        submodels = commonSubmodels[selectedModel] || []
      }
      
      setAvailableSubmodels(submodels)
      
      // Reset dependent fields
      if (submodels.length > 0 && !submodels.includes(selectedSubmodel || '')) {
        onFiltersChange({
          ...filters,
          submodel: undefined,
          engineType: undefined,
          driveType: undefined
        })
      }
    }
  }, [selectedYear, selectedMake, selectedModel])

  useEffect(() => {
    if (selectedYear && selectedMake && selectedModel && (selectedSubmodel || availableSubmodels.length === 0)) {
      const key = selectedSubmodel 
        ? `${selectedYear}-${selectedMake}-${selectedModel}-${selectedSubmodel}`
        : `${selectedYear}-${selectedMake}-${selectedModel}`
      
      let engines = (vehicleData.enginesByYearMakeModelSubmodel as any)[key] || []
      
      // Add comprehensive engines if none exist
      if (engines.length === 0) {
        const commonEngines: { [key: string]: string[] } = {
          // Ford F-Series
          'F-150': ['2.7L V6 EcoBoost', '3.5L V6 EcoBoost', '5.0L V8', '3.5L PowerBoost Hybrid V6', '3.0L V6 PowerStroke Diesel'],
          'F-250': ['6.2L V8', '7.3L V8', '6.7L V8 PowerStroke Diesel'],
          'F-350': ['6.2L V8', '7.3L V8', '6.7L V8 PowerStroke Diesel'],
          
          // Ford Cars & SUVs
          'Mustang': ['2.3L I4 EcoBoost', '5.0L V8', '5.2L V8 Supercharged'],
          'Explorer': ['2.3L I4 EcoBoost', '3.0L V6 EcoBoost', '3.3L V6 Hybrid'],
          'Escape': ['1.5L I3 EcoBoost', '2.0L I4 EcoBoost', '2.5L I4 Hybrid'],
          'Edge': ['2.0L I4 EcoBoost', '2.7L V6 EcoBoost'],
          'Expedition': ['3.5L V6 EcoBoost'],
          'Ranger': ['2.3L I4 EcoBoost'],
          'Bronco': ['2.3L I4 EcoBoost', '2.7L V6 EcoBoost'],
          
          // Chevrolet Trucks
          'Silverado 1500': ['2.7L I4 Turbo', '5.3L V8', '6.2L V8', '3.0L I6 Diesel'],
          'Silverado 2500HD': ['6.6L V8', '6.6L V8 Duramax Diesel'],
          'Silverado 3500HD': ['6.6L V8', '6.6L V8 Duramax Diesel'],
          'Colorado': ['2.5L I4', '3.6L V6', '2.8L I4 Diesel'],
          
          // Chevrolet Cars & SUVs
          'Camaro': ['2.0L I4 Turbo', '3.6L V6', '6.2L V8 Supercharged'],
          'Corvette': ['6.2L V8', '5.5L V8'],
          'Equinox': ['1.5L I4 Turbo', '2.0L I4 Turbo'],
          'Traverse': ['3.6L V6'],
          'Tahoe': ['5.3L V8', '6.2L V8', '3.0L I6 Diesel'],
          'Suburban': ['5.3L V8', '6.2L V8', '3.0L I6 Diesel'],
          'Blazer': ['2.5L I4', '3.6L V6'],
          'Malibu': ['1.5L I4 Turbo'],
          
          // Toyota
          'Camry': ['2.5L I4', '3.5L V6', '2.5L I4 Hybrid'],
          'Corolla': ['2.0L I4', '1.8L I4 Hybrid'],
          'RAV4': ['2.5L I4', '2.5L I4 Hybrid', '2.5L I4 Prime PHEV'],
          'Highlander': ['3.5L V6', '2.5L I4 Hybrid'],
          'Tacoma': ['2.7L I4', '3.5L V6'],
          'Tundra': ['3.5L V6 Twin Turbo', '3.5L V6 Hybrid'],
          'Prius': ['1.8L I4 Hybrid', '2.0L I4 Hybrid'],
          'Sienna': ['2.5L I4 Hybrid'],
          '4Runner': ['4.0L V6'],
          'Sequoia': ['3.5L V6 Twin Turbo', '3.5L V6 Hybrid'],
          
          // Honda
          'Civic': ['2.0L I4', '1.5L I4 Turbo'],
          'Accord': ['1.5L I4 Turbo', '2.0L I4 Turbo', '2.0L I4 Hybrid'],
          'CR-V': ['1.5L I4 Turbo', '2.0L I4 Hybrid'],
          'Pilot': ['3.5L V6'],
          'HR-V': ['2.0L I4'],
          'Passport': ['3.5L V6'],
          'Ridgeline': ['3.5L V6'],
          'Odyssey': ['3.5L V6'],
          
          // Nissan
          'Altima': ['2.5L I4', '2.0L I4 Turbo', '2.5L I4 AWD'],
          'Sentra': ['2.0L I4'],
          'Rogue': ['2.5L I4'],
          'Pathfinder': ['3.5L V6'],
          'Frontier': ['3.8L V6'],
          'Titan': ['5.6L V8'],
          'Murano': ['3.5L V6'],
          'Maxima': ['3.5L V6'],
          
          // Ram
          '1500': ['3.6L V6', '5.7L V8', '5.7L V8 eTorque', '3.0L V6 EcoDiesel'],
          '2500': ['6.4L V8', '6.7L I6 Cummins Diesel'],
          '3500': ['6.4L V8', '6.7L I6 Cummins Diesel'],
          'ProMaster': ['3.6L V6'],
          
          // GMC
          'Sierra 1500': ['2.7L I4 Turbo', '5.3L V8', '6.2L V8', '3.0L I6 Diesel'],
          'Sierra 2500HD': ['6.6L V8', '6.6L V8 Duramax Diesel'],
          'Sierra 3500HD': ['6.6L V8', '6.6L V8 Duramax Diesel'],
          'Terrain': ['1.5L I4 Turbo', '2.0L I4 Turbo'],
          'Acadia': ['2.5L I4', '3.6L V6'],
          'Yukon': ['5.3L V8', '6.2L V8', '3.0L I6 Diesel'],
          'Canyon': ['2.5L I4', '3.6L V6', '2.8L I4 Diesel'],
          
          // Jeep
          'Wrangler': ['3.6L V6', '2.0L I4 Turbo', '3.0L V6 EcoDiesel', '4xe PHEV'],
          'Grand Cherokee': ['3.6L V6', '5.7L V8', '6.2L V8 Supercharged', '3.0L V6 EcoDiesel', '4xe PHEV'],
          'Cherokee': ['2.4L I4', '3.2L V6'],
          'Compass': ['2.4L I4'],
          'Renegade': ['1.3L I4 Turbo', '2.4L I4'],
          'Gladiator': ['3.6L V6', '3.0L V6 EcoDiesel'],
          
          // Luxury Brands
          'BMW': ['2.0L I4 Turbo', '3.0L I6 Turbo', '4.4L V8 Twin Turbo', '6.0L V12 Twin Turbo'],
          'Mercedes-Benz': ['2.0L I4 Turbo', '3.0L V6 Turbo', '4.0L V8 Twin Turbo', '6.0L V12 Twin Turbo'],
          'Audi': ['2.0L I4 Turbo', '3.0L V6 Turbo', '4.0L V8 Twin Turbo', '6.0L W12'],
          'Lexus': ['2.0L I4 Turbo', '2.5L I4 Hybrid', '3.5L V6', '3.5L V6 Hybrid', '5.0L V8'],
          'Acura': ['1.5L I4 Turbo', '2.0L I4 Turbo', '3.0L V6 Turbo', '3.5L V6'],
          'Infiniti': ['2.0L I4 Turbo', '3.0L V6 Twin Turbo', '3.7L V6'],
          'Cadillac': ['2.0L I4 Turbo', '3.6L V6', '6.2L V8 Supercharged'],
          'Lincoln': ['2.0L I4 Turbo', '2.7L V6 EcoBoost', '3.0L V6 Twin Turbo'],
          'Buick': ['1.4L I4 Turbo', '2.0L I4 Turbo', '3.6L V6'],
        }
        
        engines = commonEngines[selectedModel] || []
      }
      
      setAvailableEngines(engines)
      
      // Reset dependent fields
      if (!engines.includes(selectedEngine || '')) {
        onFiltersChange({
          ...filters,
          engineType: undefined,
          driveType: undefined
        })
      }
    }
  }, [selectedYear, selectedMake, selectedModel, selectedSubmodel, availableSubmodels])

  useEffect(() => {
    if (selectedEngine && selectedModel) {
      const key = selectedSubmodel 
        ? `${selectedYear}-${selectedMake}-${selectedModel}-${selectedSubmodel}-${selectedEngine}`
        : `${selectedYear}-${selectedMake}-${selectedModel}-${selectedEngine}`
      
      let driveTypes = (vehicleData.driveTypesByYearMakeModelSubmodelEngine as any)[key] || []
      
      // Add common drive types based on vehicle type if none exist
      if (driveTypes.length === 0) {
        // Trucks and SUVs typically have more drive options
        const truckSuvModels = ['F-150', 'F-250', 'F-350', 'Silverado', 'Sierra', 'RAM', 'Tacoma', 'Tundra', 'Explorer', 'Tahoe', 'Suburban', 'Expedition', 'RAV4', '4Runner', 'Pilot', 'Highlander']
        const isTrackSuv = truckSuvModels.some(model => selectedModel.includes(model))
        
        if (isTrackSuv) {
          driveTypes = ['2WD', '4WD', 'AWD']
        } else {
          // Cars typically have fewer options
          driveTypes = ['2WD', 'AWD']
        }
      }
      
      setAvailableDriveTypes(driveTypes)
    }
  }, [selectedYear, selectedMake, selectedModel, selectedSubmodel, selectedEngine])

  const handleYearChange = (year: string) => {
    onFiltersChange({
      year: [parseInt(year)],
      make: undefined,
      model: undefined,
      submodel: undefined,
      engineType: undefined,
      driveType: undefined
    })
  }

  const handleMakeChange = (make: string) => {
    onFiltersChange({
      ...filters,
      make: [make],
      model: undefined,
      submodel: undefined,
      engineType: undefined,
      driveType: undefined
    })
  }

  const handleModelChange = (model: string) => {
    onFiltersChange({
      ...filters,
      model: [model],
      submodel: undefined,
      engineType: undefined,
      driveType: undefined
    })
  }

  const handleSubmodelChange = (submodel: string) => {
    onFiltersChange({
      ...filters,
      submodel: [submodel],
      engineType: undefined,
      driveType: undefined
    })
  }

  const handleEngineChange = (engine: string) => {
    onFiltersChange({
      ...filters,
      engineType: [engine],
      driveType: undefined
    })
  }

  const handleDriveTypeChange = (driveType: string) => {
    onFiltersChange({
      ...filters,
      driveType: [driveType as 'AWD' | '2WD' | '4WD']
    })
  }

  return (
    <div className="space-y-6">
      {/* AutoZone-style YMME Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Vehicle Selection</h3>
        <p className="text-sm text-muted-foreground">Select your vehicle step by step</p>
      </div>

      {/* Four-column YMME layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1 | Year */}
        <div className="space-y-2">
          <div className="relative">
            <Select onValueChange={handleYearChange} value={selectedYear || ''}>
              <SelectTrigger className="h-12 border-2 border-gray-300 rounded-lg">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {vehicleData.years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <label className="absolute -top-1 left-3 bg-white px-1 text-xs font-medium text-gray-600">
              1 | Year
            </label>
          </div>
        </div>

        {/* 2 | Make */}
        <div className="space-y-2">
          <div className="relative">
            <Select 
              onValueChange={handleMakeChange} 
              value={selectedMake || ''} 
              disabled={!selectedYear}
              key={`make-${selectedYear}-${availableMakes.length}`}
            >
              <SelectTrigger className={`h-12 border-2 rounded-lg ${!selectedYear ? 'border-gray-200 bg-gray-50' : 'border-gray-300'}`}>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent 
                key={`content-${selectedYear}-${availableMakes.length}`}
                className="max-h-[300px] overflow-y-auto"
                position="popper"
                sideOffset={4}
              >
                {availableMakes.length > 0 ? (
                  availableMakes.map((make) => (
                    <SelectItem key={`${selectedYear}-${make}`} value={make}>
                      {make}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-makes-available" disabled>
                    No makes available for {selectedYear}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <label className={`absolute -top-1 left-3 bg-white px-1 text-xs font-medium ${!selectedYear ? 'text-gray-400' : 'text-gray-600'}`}>
              2 | Make
            </label>
          </div>
        </div>

        {/* 3 | Model */}
        <div className="space-y-2">
          <div className="relative">
            <Select 
              onValueChange={handleModelChange} 
              value={selectedModel || ''} 
              disabled={!selectedMake}
            >
              <SelectTrigger className={`h-12 border-2 rounded-lg ${!selectedMake ? 'border-gray-200 bg-gray-50' : 'border-gray-300'}`}>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <label className={`absolute -top-1 left-3 bg-white px-1 text-xs font-medium ${!selectedMake ? 'text-gray-400' : 'text-gray-600'}`}>
              3 | Model
            </label>
          </div>
        </div>

        {/* 4 | Engine */}
        <div className="space-y-2">
          <div className="relative">
            <Select 
              onValueChange={handleEngineChange} 
              value={selectedEngine || ''} 
              disabled={!selectedModel || (availableSubmodels.length > 0 && !selectedSubmodel)}
            >
              <SelectTrigger className={`h-12 border-2 rounded-lg ${(!selectedModel || (availableSubmodels.length > 0 && !selectedSubmodel)) ? 'border-gray-200 bg-gray-50' : 'border-gray-300'}`}>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {availableEngines.length > 0 ? (
                  availableEngines.map((engine) => (
                    <SelectItem key={engine} value={engine}>
                      {engine}
                    </SelectItem>
                  ))
                ) : (
                  selectedModel && (
                    <SelectItem value="no-engines-available" disabled>
                      No engines available
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <label className={`absolute -top-1 left-3 bg-white px-1 text-xs font-medium ${(!selectedModel || (availableSubmodels.length > 0 && !selectedSubmodel)) ? 'text-gray-400' : 'text-gray-600'}`}>
              4 | Engine
            </label>
          </div>
        </div>
      </div>

      {/* Secondary selections - Submodel and Drive Type */}
      {(availableSubmodels.length > 0 || (availableDriveTypes.length > 0 && selectedEngine)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
          {/* Submodel - Only show if available */}
          {availableSubmodels.length > 0 && (
            <div className="space-y-2">
              <div className="relative">
                <Select 
                  onValueChange={handleSubmodelChange} 
                  value={selectedSubmodel || ''} 
                  disabled={!selectedModel}
                >
                  <SelectTrigger className={`h-12 border-2 rounded-lg ${!selectedModel ? 'border-gray-200 bg-gray-50' : 'border-gray-300'}`}>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {availableSubmodels.map((submodel) => (
                      <SelectItem key={submodel} value={submodel}>
                        {submodel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <label className={`absolute -top-1 left-3 bg-white px-1 text-xs font-medium ${!selectedModel ? 'text-gray-400' : 'text-gray-600'}`}>
                  Submodel / Trim
                </label>
              </div>
            </div>
          )}

          {/* Drive Type - Only show after engine selection */}
          {availableDriveTypes.length > 0 && selectedEngine && (
            <div className="space-y-2">
              <div className="relative">
                <Select 
                  onValueChange={handleDriveTypeChange} 
                  value={filters.driveType?.[0] || ''} 
                  disabled={!selectedEngine}
                >
                  <SelectTrigger className={`h-12 border-2 rounded-lg ${!selectedEngine ? 'border-gray-200 bg-gray-50' : 'border-gray-300'}`}>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {availableDriveTypes.map((driveType) => (
                      <SelectItem key={driveType} value={driveType}>
                        {driveType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <label className={`absolute -top-1 left-3 bg-white px-1 text-xs font-medium ${!selectedEngine ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drive Type
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selection Summary */}
      {(selectedYear || selectedMake || selectedModel || selectedEngine) && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Selected Vehicle:</h4>
          <p className="text-sm text-blue-800">
            {[selectedYear, selectedMake, selectedModel, selectedSubmodel, selectedEngine].filter(Boolean).join(' • ') || 'Incomplete selection'}
          </p>
          {filters.driveType?.[0] && (
            <p className="text-xs text-blue-600 mt-1">Drive Type: {filters.driveType[0]}</p>
          )}
        </div>
      )}
    </div>
  )
}

VehicleSelector.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
}