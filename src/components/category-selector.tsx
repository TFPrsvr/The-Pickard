'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { VehicleCategory } from '@/types'
import PropTypes from 'prop-types'

interface CategorySelectorProps {
  onCategorySelect: (category: VehicleCategory) => void
  selectedCategory?: VehicleCategory
}

const categories = [
  {
    id: 'car' as VehicleCategory,
    name: 'Cars',
    icon: '🚗',
    description: 'Passenger vehicles and sedans'
  },
  {
    id: 'truck' as VehicleCategory,
    name: 'Trucks',
    icon: '🚚',
    description: 'Pickup trucks and light-duty vehicles'
  },
  {
    id: '18-wheeler' as VehicleCategory,
    name: '18-Wheelers',
    icon: '🚛',
    description: 'Commercial semi-trucks and tractor-trailers'
  },
  {
    id: 'motorcycle' as VehicleCategory,
    name: 'Motorcycles',
    icon: '🏍️',
    description: 'Street bikes, cruisers, sport bikes'
  },
  {
    id: 'atv' as VehicleCategory,
    name: 'ATVs',
    icon: '🏁',
    description: 'All-terrain vehicles and quad bikes'
  },
  {
    id: 'utv' as VehicleCategory,
    name: 'UTVs',
    icon: '🚜',
    description: 'Side-by-sides and utility vehicles'
  },
  {
    id: 'snowmobile' as VehicleCategory,
    name: 'Snowmobiles',
    icon: '🏔️',
    description: 'Winter recreational vehicles'
  },
  {
    id: 'watercraft' as VehicleCategory,
    name: 'Watercraft',
    icon: '🚤',
    description: 'Jet skis, Sea-Doos, WaveRunners'
  },
  {
    id: 'rv' as VehicleCategory,
    name: 'RVs & Motorhomes',
    icon: '🏕️',
    description: 'Recreational vehicles and campers'
  }
]

export function CategorySelector({ onCategorySelect, selectedCategory }: CategorySelectorProps) {
  const [hoveredCategory, setHoveredCategory] = useState<VehicleCategory | null>(null)

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">What are you working on today?</h2>
        <p className="text-muted-foreground">Select a vehicle category to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`
              p-6 cursor-pointer transition-all duration-200 hover:shadow-lg
              ${selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''}
              ${hoveredCategory === category.id ? 'scale-105' : 'scale-100'}
            `}
            onClick={() => onCategorySelect(category.id)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${category.name}`}
            aria-pressed={selectedCategory === category.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onCategorySelect(category.id)
              }
            }}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-5xl" role="img" aria-label={category.name}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <div className="text-center mt-6">
          <button
            onClick={() => onCategorySelect(selectedCategory)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Change category selection"
          >
            Change selection
          </button>
        </div>
      )}
    </div>
  )
}

CategorySelector.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string
}
