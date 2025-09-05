'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Clock, MapPin, Phone } from 'lucide-react'
import PropTypes from 'prop-types'

interface VehicleGridProps {
  vehicles: Vehicle[]
  onVehicleSelect?: (vehicle: Vehicle) => void
}

interface Vehicle {
  id: string
  year: number
  make: string
  model: string
  trim?: string
  price: number
  mileage: number
  location: string
  rating: number
  imageUrl?: string
  dealer: {
    name: string
    phone: string
    address: string
  }
}

export function VehicleGrid({ vehicles, onVehicleSelect }: VehicleGridProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle.id)
    onVehicleSelect?.(vehicle)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-secondary">Available Vehicles</h2>
        <p className="text-muted-foreground">{vehicles.length} vehicles found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id}
            vehicle={vehicle}
            isSelected={selectedVehicle === vehicle.id}
            onClick={() => handleVehicleClick(vehicle)}
          />
        ))}
      </div>
    </div>
  )
}

interface VehicleCardProps {
  vehicle: Vehicle
  isSelected: boolean
  onClick: () => void
}

function VehicleCard({ vehicle, isSelected, onClick }: VehicleCardProps) {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(price)

  const formatMileage = (miles: number) =>
    new Intl.NumberFormat('en-US').format(miles)

  return (
    <div 
      className={`vehicle-grid-card group ${isSelected ? 'ring-2 ring-primary border-primary' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
    >
      {/* Vehicle Image */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden relative">
        {vehicle.imageUrl ? (
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8l-2.08-5.99zM6.5 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
          {formatPrice(vehicle.price)}
        </div>
        
        {/* Rating */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">{vehicle.rating}</span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-lg text-secondary">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          {vehicle.trim && (
            <p className="text-sm text-muted-foreground">{vehicle.trim}</p>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatMileage(vehicle.mileage)} mi
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {vehicle.location}
          </div>
        </div>

        {/* Dealer Info */}
        <div className="pt-3 border-t border-border/50">
          <p className="font-medium text-sm text-secondary">{vehicle.dealer.name}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Phone className="w-3 h-3" />
            {vehicle.dealer.phone}
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="w-full mt-4 bg-primary/10 hover:bg-primary hover:text-white text-primary font-medium py-2 px-4 rounded-xl transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            // Handle contact dealer action
          }}
        >
          Contact Dealer
        </button>
      </div>
    </div>
  )
}

VehicleGrid.propTypes = {
  vehicles: PropTypes.array.isRequired,
  onVehicleSelect: PropTypes.func,
}

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}