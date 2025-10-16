'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useUser } from '@clerk/nextjs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VehicleCategory, SearchFilters } from '@/types'
import {
  powersportsDatabase,
  vehicleDatabase,
  getPowersportsMakesByCategory,
  getMakesForYear,
  getModelsForMakeAndYear,
  getEnginesForMakeAndYear,
  getPowersportsModelsForMakeAndYear
} from '@/lib/vehicle-data'
import PropTypes from 'prop-types'

interface CategoryAwareVehicleSelectorProps {
  category: VehicleCategory
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export function CategoryAwareVehicleSelector({
  category,
  filters,
  onFiltersChange
}: CategoryAwareVehicleSelectorProps) {
  const { isSignedIn } = useUser()
  const [availableMakes, setAvailableMakes] = useState<string[]>([])
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false)
  const [isLoadingMakes, setIsLoadingMakes] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isPowersports = ['motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft'].includes(category)
  const isAutomotive = ['car', 'truck', '18-wheeler', 'rv'].includes(category)

  // Map specific category to API category
  const apiCategory = isPowersports ? 'powersports' : isAutomotive ? 'automotive' : undefined

  // Update available makes based on category and year (cascading filter)
  useEffect(() => {
    const selectedYear = filters.year?.[0]
    const powersports = ['motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft'].includes(category)
    const automotive = ['car', 'truck', '18-wheeler', 'rv'].includes(category)
    const apiCat = powersports ? 'powersports' : automotive ? 'automotive' : undefined

    if (powersports) {
      const categoryMap: Record<string, 'motorcycle' | 'atv' | 'utv' | 'snowmobile' | 'watercraft'> = {
        'motorcycle': 'motorcycle',
        'atv': 'atv',
        'utv': 'utv',
        'snowmobile': 'snowmobile',
        'watercraft': 'watercraft'
      }
      const powersportsCategory = categoryMap[category]
      if (powersportsCategory) {
        setAvailableMakes(getPowersportsMakesByCategory(powersportsCategory, selectedYear))
      }
    } else if (automotive) {
      // Fetch real makes from database API with category filter
      const categoryParam = apiCat ? `&category=${apiCat}` : ''
      setIsLoadingMakes(true)

      if (selectedYear) {
        fetch(`/api/vehicles/makes?year=${selectedYear}${categoryParam}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.data) {
              setAvailableMakes(data.data.map((make: any) => make.makeName))
            }
          })
          .catch(err => {
            console.error('Error fetching makes:', err)
            // Fallback to local data
            setAvailableMakes(getMakesForYear(selectedYear))
          })
          .finally(() => setIsLoadingMakes(false))
      } else {
        // Fetch all makes without year filter but with category filter
        fetch(`/api/vehicles/makes?category=${apiCat}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.data) {
              setAvailableMakes(data.data.map((make: any) => make.makeName))
            }
          })
          .catch(err => {
            console.error('Error fetching makes:', err)
            setAvailableMakes(vehicleDatabase.makes)
          })
          .finally(() => setIsLoadingMakes(false))
      }
    }
  }, [category, filters.year])

  // Update available models when make or year changes (cascading filter)
  useEffect(() => {
    if (filters.make && filters.make.length > 0) {
      const selectedMake = filters.make[0]
      const selectedYear = filters.year?.[0]

      if (isPowersports) {
        const models = getPowersportsModelsForMakeAndYear(selectedMake, selectedYear)
        setAvailableModels(models)
      } else if (isAutomotive) {
        // Fetch real models from database API
        const yearParam = selectedYear ? `&year=${selectedYear}` : ''
        fetch(`/api/vehicles/models?make=${encodeURIComponent(selectedMake)}${yearParam}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.data) {
              setAvailableModels(data.data.map((model: any) => model.modelName))
            }
          })
          .catch(err => {
            console.error('Error fetching models:', err)
            // Fallback to local data
            setAvailableModels(getModelsForMakeAndYear(selectedMake, selectedYear))
          })
      }
    } else {
      setAvailableModels([])
    }
  }, [filters.make, filters.year, isPowersports, isAutomotive])

  // Load saved vehicle selection on mount
  // Memoize the ref to track if we've already loaded data
  const onFiltersChangeRef = useRef(onFiltersChange)
  useEffect(() => {
    onFiltersChangeRef.current = onFiltersChange
  }, [onFiltersChange])

  useEffect(() => {
    if (isSignedIn && !hasLoadedSavedData) {
      fetch('/api/user/vehicle')
        .then(res => {
          if (!res.ok) {
            // 404 means no saved data yet, not an error
            if (res.status === 404) {
              setHasLoadedSavedData(true)
              return null
            }
            throw new Error('Failed to fetch saved vehicle')
          }
          return res.json()
        })
        .then(data => {
          if (data && data.success && data.data) {
            const savedData = data.data
            if (savedData.category === category) {
              // Only load if category matches
              const loadedFilters: SearchFilters = { category: [category] }
              if (savedData.year) loadedFilters.year = [savedData.year]
              if (savedData.make) loadedFilters.make = [savedData.make]
              if (savedData.model) loadedFilters.model = [savedData.model]
              if (savedData.engineType) loadedFilters.engineType = [savedData.engineType]
              if (savedData.driveType) loadedFilters.driveType = [savedData.driveType]
              if (savedData.submodel) loadedFilters.submodel = [savedData.submodel]

              onFiltersChangeRef.current(loadedFilters)
            }
          }
          setHasLoadedSavedData(true)
        })
        .catch(err => {
          console.error('Error loading saved vehicle:', err)
          setHasLoadedSavedData(true)
        })
    }
  }, [isSignedIn, hasLoadedSavedData, category])

  // Save vehicle selection when filters change (debounced)
  useEffect(() => {
    if (isSignedIn && hasLoadedSavedData && (filters.year || filters.make || filters.model)) {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      // Set new timeout to save after 2 seconds of inactivity
      saveTimeoutRef.current = setTimeout(() => {
        fetch('/api/user/vehicle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category,
            year: filters.year?.[0],
            make: filters.make?.[0],
            model: filters.model?.[0],
            engineType: filters.engineType?.[0],
            driveType: filters.driveType?.[0],
            submodel: filters.submodel?.[0]
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log('Vehicle selection saved')
            }
          })
          .catch(err => console.error('Error saving vehicle selection:', err))
      }, 2000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [isSignedIn, hasLoadedSavedData, category, filters.year, filters.make, filters.model, filters.engineType, filters.driveType, filters.submodel])

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters }

    if (key === 'make') {
      newFilters.make = [value as string]
      newFilters.model = [] // Reset model when make changes
      newFilters.engineType = [] // Reset engine when make changes
    } else if (key === 'model') {
      newFilters.model = [value as string]
    } else if (key === 'year') {
      newFilters.year = [Number(value)]
      // Note: Make/model/engine will be validated by cascading filters
      // Invalid options will be filtered out by the useEffect hooks
    } else if (key === 'displacement') {
      newFilters.displacement = [Number(value)]
    } else if (key === 'strokeType') {
      newFilters.strokeType = [value as '2-stroke' | '4-stroke']
    } else if (key === 'coolingType') {
      newFilters.coolingType = [value as 'liquid' | 'air' | 'oil']
    } else if (key === 'driveType') {
      newFilters.driveType = [value as any]
    } else if (key === 'engineType') {
      newFilters.engineType = [value as string]
    }

    onFiltersChange(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Primary Vehicle Selection - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Year Selection */}
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={filters.year?.[0]?.toString() || ''}
            onValueChange={(value) => handleFilterChange('year', value)}
          >
            <SelectTrigger id="year" aria-label="Select vehicle year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {vehicleDatabase.years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Make Selection */}
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Select
            value={filters.make?.[0] || ''}
            onValueChange={(value) => handleFilterChange('make', value)}
            disabled={isLoadingMakes}
          >
            <SelectTrigger id="make" aria-label="Select vehicle make">
              <SelectValue placeholder={isLoadingMakes ? "Loading makes..." : "Select make"} />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {availableMakes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={filters.model?.[0] || ''}
            onValueChange={(value) => handleFilterChange('model', value)}
            disabled={!filters.make || filters.make.length === 0}
          >
            <SelectTrigger id="model" aria-label="Select vehicle model">
              <SelectValue placeholder={filters.make ? "Select model" : "Select make first"} />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Powersports-Specific Fields */}
      {isPowersports && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Displacement (CC) */}
          <div className="space-y-2">
            <Label htmlFor="displacement">Engine Displacement (CC)</Label>
            <Select
              value={filters.displacement?.[0]?.toString() || ''}
              onValueChange={(value) => handleFilterChange('displacement', value)}
            >
              <SelectTrigger id="displacement" aria-label="Select engine displacement">
                <SelectValue placeholder="Select displacement" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {powersportsDatabase.displacements.map((cc) => (
                  <SelectItem key={cc} value={cc}>
                    {cc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stroke Type */}
          <div className="space-y-2">
            <Label htmlFor="strokeType">Stroke Type</Label>
            <Select
              value={filters.strokeType?.[0] || ''}
              onValueChange={(value) => handleFilterChange('strokeType', value)}
            >
              <SelectTrigger id="strokeType" aria-label="Select stroke type">
                <SelectValue placeholder="Select stroke type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {powersportsDatabase.strokeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cooling Type */}
          <div className="space-y-2">
            <Label htmlFor="coolingType">Cooling Type</Label>
            <Select
              value={filters.coolingType?.[0] || ''}
              onValueChange={(value) => handleFilterChange('coolingType', value)}
            >
              <SelectTrigger id="coolingType" aria-label="Select cooling type">
                <SelectValue placeholder="Select cooling type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {powersportsDatabase.coolingTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drive Type (Powersports) */}
          <div className="space-y-2">
            <Label htmlFor="driveType">Drive Type</Label>
            <Select
              value={filters.driveType?.[0] || ''}
              onValueChange={(value) => handleFilterChange('driveType', value)}
            >
              <SelectTrigger id="driveType" aria-label="Select drive type">
                <SelectValue placeholder="Select drive type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {powersportsDatabase.driveTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Automotive-Specific Fields */}
      {isAutomotive && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Engine Type */}
          <div className="space-y-2">
            <Label htmlFor="engineType">Engine Type</Label>
            <Select
              value={filters.engineType?.[0] || ''}
              onValueChange={(value) => handleFilterChange('engineType' as any, value)}
              disabled={!filters.make || filters.make.length === 0}
            >
              <SelectTrigger id="engineType" aria-label="Select engine type">
                <SelectValue placeholder={filters.make ? "Select engine type" : "Select make first"} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {getEnginesForMakeAndYear(filters.make?.[0] || '', filters.year?.[0]).map((engine) => (
                  <SelectItem key={engine} value={engine}>
                    {engine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drive Type (Automotive) */}
          <div className="space-y-2">
            <Label htmlFor="driveType">Drive Type</Label>
            <Select
              value={filters.driveType?.[0] || ''}
              onValueChange={(value) => handleFilterChange('driveType', value)}
            >
              <SelectTrigger id="driveType" aria-label="Select drive type">
                <SelectValue placeholder="Select drive type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {vehicleDatabase.driveTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}

CategoryAwareVehicleSelector.propTypes = {
  category: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func.isRequired
}
