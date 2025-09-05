'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SearchFilters } from '@/types'
import { Filter, RotateCcw } from 'lucide-react'
import PropTypes from 'prop-types'

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onSearch: () => void
  onReset: () => void
  searchQuery?: string
}

export function VehicleSearchFilters({ filters, onFiltersChange, onSearch, onReset }: SearchFiltersProps) {
  const [yearFrom, setYearFrom] = useState(filters.year?.[0]?.toString() || '')
  const [yearTo, setYearTo] = useState(filters.year?.[1]?.toString() || '')

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i)

  const makes = [
    'Acura', 'Audi', 'BMW', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'GMC',
    'Honda', 'Hyundai', 'Jeep', 'Kia', 'Lexus', 'Mazda', 'Mercedes-Benz',
    'Mitsubishi', 'Nissan', 'Ram', 'Subaru', 'Toyota', 'Volkswagen', 'Volvo'
  ]

  const engineTypes = [
    'V6', 'V8', 'V10', 'V12', 'I4', 'I6', 'H4', 'H6',
    'Diesel', 'Hybrid', 'Electric', 'Turbo', 'Supercharged'
  ]

  const handleYearChange = (from: string, to: string) => {
    const fromYear = from ? parseInt(from) : undefined
    const toYear = to ? parseInt(to) : undefined
    const yearRange = fromYear || toYear ? [fromYear, toYear].filter(Boolean) as number[] : undefined
    
    onFiltersChange({
      ...filters,
      year: yearRange
    })
  }

  const handleMakeChange = (make: string) => {
    const makes = make && make !== 'all' ? [make] : undefined
    onFiltersChange({
      ...filters,
      make: makes
    })
  }

  const handleEngineTypeChange = (engine: string) => {
    const engines = engine && engine !== 'all' ? [engine] : undefined
    onFiltersChange({
      ...filters,
      engineType: engines
    })
  }

  const handleDriveTypeChange = (drive: string) => {
    const driveTypes = drive && drive !== 'all' ? [drive as 'AWD' | '2WD' | '4WD'] : undefined
    onFiltersChange({
      ...filters,
      driveType: driveTypes
    })
  }

  const handleSubmodelChange = (submodel: string) => {
    const submodels = submodel ? [submodel] : undefined
    onFiltersChange({
      ...filters,
      submodel: submodels
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search Filters
        </CardTitle>
        <CardDescription>
          Use filters below to narrow your search results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <div className="flex gap-1">
              <Input
                placeholder="From"
                value={yearFrom}
                onChange={(e) => {
                  setYearFrom(e.target.value)
                  handleYearChange(e.target.value, yearTo)
                }}
                type="number"
                min="1950"
                max={currentYear}
                className="w-full"
              />
              <Input
                placeholder="To"
                value={yearTo}
                onChange={(e) => {
                  setYearTo(e.target.value)
                  handleYearChange(yearFrom, e.target.value)
                }}
                type="number"
                min="1950"
                max={currentYear}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Make</label>
            <Select onValueChange={handleMakeChange} value={filters.make?.[0] || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <Input
              placeholder="Enter model"
              value={filters.model?.[0] || ''}
              onChange={(e) => {
                const models = e.target.value ? [e.target.value] : undefined
                onFiltersChange({
                  ...filters,
                  model: models
                })
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Submodel</label>
            <Input
              placeholder="Enter submodel"
              value={filters.submodel?.[0] || ''}
              onChange={(e) => handleSubmodelChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Engine</label>
            <Select onValueChange={handleEngineTypeChange} value={filters.engineType?.[0] || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Engines</SelectItem>
                {engineTypes.map((engine) => (
                  <SelectItem key={engine} value={engine}>
                    {engine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Drive Type</label>
            <Select onValueChange={handleDriveTypeChange} value={filters.driveType?.[0] || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select drive type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drive Types</SelectItem>
                <SelectItem value="2WD">2WD</SelectItem>
                <SelectItem value="4WD">4WD</SelectItem>
                <SelectItem value="AWD">AWD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onSearch} className="flex-1">
            Search Vehicles
          </Button>
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

VehicleSearchFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}