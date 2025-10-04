'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VehicleCategory, SearchFilters } from '@/types'
import { powersportsDatabase, vehicleDatabase, getPowersportsMakesByCategory } from '@/lib/vehicle-data'
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
  const [availableMakes, setAvailableMakes] = useState<string[]>([])
  const [availableModels, setAvailableModels] = useState<string[]>([])

  const isPowersports = ['motorcycle', 'atv', 'utv', 'snowmobile', 'watercraft'].includes(category)
  const isAutomotive = ['car', 'truck', '18-wheeler', 'rv'].includes(category)

  // Update available makes based on category
  useEffect(() => {
    if (isPowersports) {
      const categoryMap: Record<string, 'motorcycle' | 'atv' | 'utv' | 'snowmobile' | 'watercraft'> = {
        'motorcycle': 'motorcycle',
        'atv': 'atv',
        'utv': 'utv',
        'snowmobile': 'snowmobile',
        'watercraft': 'watercraft'
      }
      const powersportsCategory = categoryMap[category]
      if (powersportsCategory) {
        setAvailableMakes(getPowersportsMakesByCategory(powersportsCategory))
      }
    } else if (isAutomotive) {
      setAvailableMakes(vehicleDatabase.makes)
    }
  }, [category, isPowersports, isAutomotive])

  // Update available models when make changes
  useEffect(() => {
    if (filters.make && filters.make.length > 0) {
      const selectedMake = filters.make[0]
      if (isPowersports) {
        const models = powersportsDatabase.models[selectedMake] || []
        setAvailableModels(models)
      } else {
        const models = vehicleDatabase.models[selectedMake] || []
        setAvailableModels(models)
      }
    } else {
      setAvailableModels([])
    }
  }, [filters.make, isPowersports])

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters }

    if (key === 'make') {
      newFilters.make = [value as string]
      newFilters.model = [] // Reset model when make changes
    } else if (key === 'model') {
      newFilters.model = [value as string]
    } else if (key === 'year') {
      newFilters.year = [Number(value)]
    } else if (key === 'displacement') {
      newFilters.displacement = [Number(value)]
    } else if (key === 'strokeType') {
      newFilters.strokeType = [value as '2-stroke' | '4-stroke']
    } else if (key === 'coolingType') {
      newFilters.coolingType = [value as 'liquid' | 'air' | 'oil']
    } else if (key === 'driveType') {
      newFilters.driveType = [value as any]
    }

    onFiltersChange(newFilters)
  }

  return (
    <div className="space-y-6 max-w-2xl">
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
          <SelectContent>
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
        >
          <SelectTrigger id="make" aria-label="Select vehicle make">
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            {availableMakes.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Model Selection */}
      {filters.make && filters.make.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={filters.model?.[0] || ''}
            onValueChange={(value) => handleFilterChange('model', value)}
          >
            <SelectTrigger id="model" aria-label="Select vehicle model">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Powersports-Specific Fields */}
      {isPowersports && (
        <>
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
              <SelectContent>
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
              <SelectContent>
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
              <SelectContent>
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
              <SelectContent>
                {powersportsDatabase.driveTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Automotive-Specific Fields */}
      {isAutomotive && (
        <>
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
              <SelectContent>
                {vehicleDatabase.driveTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Engine Type */}
          {filters.make && filters.make.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="engineType">Engine Type</Label>
              <Select
                value={filters.engineType?.[0] || ''}
                onValueChange={(value) => handleFilterChange('engineType' as any, value)}
              >
                <SelectTrigger id="engineType" aria-label="Select engine type">
                  <SelectValue placeholder="Select engine type" />
                </SelectTrigger>
                <SelectContent>
                  {(vehicleDatabase.engines[filters.make[0]] || []).map((engine) => (
                    <SelectItem key={engine} value={engine}>
                      {engine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}
    </div>
  )
}

CategoryAwareVehicleSelector.propTypes = {
  category: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func.isRequired
}
