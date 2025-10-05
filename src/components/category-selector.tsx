'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { VehicleCategory } from '@/types'
import Image from 'next/image'
import PropTypes from 'prop-types'

interface CategorySelectorProps {
  onCategorySelect: (category: VehicleCategory) => void
  selectedCategory?: VehicleCategory
}

const categories = [
  {
    id: 'car' as VehicleCategory,
    name: 'Cars',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
    description: 'Passenger vehicles and sedans'
  },
  {
    id: 'truck' as VehicleCategory,
    name: 'Trucks',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop',
    description: 'Pickup trucks and light-duty vehicles'
  },
  {
    id: '18-wheeler' as VehicleCategory,
    name: '18-Wheelers',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
    description: 'Commercial semi-trucks and tractor-trailers'
  },
  {
    id: 'motorcycle' as VehicleCategory,
    name: 'Motorcycles',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop',
    description: 'Street bikes, cruisers, sport bikes'
  },
  {
    id: 'atv' as VehicleCategory,
    name: 'ATVs',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'All-terrain vehicles and quad bikes'
  },
  {
    id: 'utv' as VehicleCategory,
    name: 'UTVs',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    description: 'Side-by-sides and utility vehicles'
  },
  {
    id: 'snowmobile' as VehicleCategory,
    name: 'Snowmobiles',
    image: 'https://images.unsplash.com/photo-1609011107157-880f57058e1d?w=400&h=300&fit=crop',
    description: 'Winter recreational vehicles'
  },
  {
    id: 'watercraft' as VehicleCategory,
    name: 'Watercraft',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    description: 'Jet skis, Sea-Doos, WaveRunners'
  },
  {
    id: 'rv' as VehicleCategory,
    name: 'RVs & Motorhomes',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&h=300&fit=crop',
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
              cursor-pointer transition-all duration-200 hover:shadow-lg overflow-hidden
              ${selectedCategory === category.id ? 'ring-2 ring-primary' : ''}
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
            <div className="relative h-40 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-200">{category.description}</p>
              </div>
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
