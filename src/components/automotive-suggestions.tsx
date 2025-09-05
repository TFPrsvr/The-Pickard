'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ExternalLink, Search, Youtube, Globe, BookOpen } from 'lucide-react'
import PropTypes from 'prop-types'

interface AutomotiveSuggestionsProps {
  vehicleInfo?: {
    year?: number
    make?: string
    model?: string
    engine?: string
  }
  searchQuery?: string
}

interface Suggestion {
  title: string
  url: string
  type: 'youtube' | 'website' | 'forum' | 'manual' | 'database'
  description: string
  icon: React.ReactNode
}

export function AutomotiveSuggestions({ vehicleInfo, searchQuery = '' }: AutomotiveSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [webSearchQuery, setWebSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Build vehicle string for searches
  const vehicleString = vehicleInfo ? 
    [vehicleInfo.year, vehicleInfo.make, vehicleInfo.model].filter(Boolean).join(' ') : ''

  // Predefined automotive reference sites
  const referenceSites = [
    {
      title: 'Dave\'s Auto Center (YouTube)',
      url: 'https://www.youtube.com/channel/UCPPHkxoGlbECGQ7Bc3J3D_w',
      type: 'youtube' as const,
      description: 'Professional automotive diagnostic and repair tutorials',
      icon: <Youtube className="h-4 w-4" />
    },
    {
      title: 'AutoZone Repair Guides',
      url: 'https://www.autozone.com/repairguides',
      type: 'manual' as const,
      description: 'Comprehensive repair guides and part compatibility',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: 'RepairPal',
      url: 'https://repairpal.com',
      type: 'database' as const,
      description: 'Cost estimates and common repair information',
      icon: <Globe className="h-4 w-4" />
    },
    {
      title: 'Car-Part.com',
      url: 'https://car-part.com',
      type: 'database' as const,
      description: 'Used auto parts locator and compatibility database',
      icon: <Globe className="h-4 w-4" />
    },
    {
      title: 'NHTSA Recalls Database',
      url: 'https://www.nhtsa.gov/recalls',
      type: 'database' as const,
      description: 'Official vehicle recalls and safety information',
      icon: <Globe className="h-4 w-4" />
    },
    {
      title: 'AllData DIY',
      url: 'https://www.alldatadiy.com',
      type: 'manual' as const,
      description: 'Professional service manuals and wiring diagrams',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: 'ChrisFix (YouTube)',
      url: 'https://www.youtube.com/channel/UCes1EvRjcKU4sY_UEavndBw',
      type: 'youtube' as const,
      description: 'DIY car repair tutorials and maintenance guides',
      icon: <Youtube className="h-4 w-4" />
    },
    {
      title: 'ScannerDanner (YouTube)',
      url: 'https://www.youtube.com/channel/UCoxA17_TcYfAunWOoNwUneg',
      type: 'youtube' as const,
      description: 'Advanced diagnostic techniques and troubleshooting',
      icon: <Youtube className="h-4 w-4" />
    }
  ]

  useEffect(() => {
    // Generate contextual suggestions based on vehicle info and search query
    const contextualSuggestions: Suggestion[] = []

    // Add specific searches for the vehicle
    if (vehicleString) {
      contextualSuggestions.push({
        title: `${vehicleString} Common Problems`,
        url: `https://www.google.com/search?q="${vehicleString} common problems issues"`,
        type: 'website',
        description: `Search for common issues with ${vehicleString}`,
        icon: <Search className="h-4 w-4" />
      })

      contextualSuggestions.push({
        title: `${vehicleString} Repair Videos`,
        url: `https://www.youtube.com/results?search_query="${vehicleString} repair maintenance"`,
        type: 'youtube',
        description: `YouTube videos for ${vehicleString} repairs`,
        icon: <Youtube className="h-4 w-4" />
      })

      if (searchQuery) {
        contextualSuggestions.push({
          title: `${vehicleString} ${searchQuery}`,
          url: `https://www.google.com/search?q="${vehicleString} ${searchQuery} repair fix"`,
          type: 'website',
          description: `Search for ${searchQuery} solutions for ${vehicleString}`,
          icon: <Search className="h-4 w-4" />
        })
      }
    }

    // Add general search query suggestions
    if (searchQuery && !vehicleString) {
      contextualSuggestions.push({
        title: `${searchQuery} Automotive Repair`,
        url: `https://www.google.com/search?q="${searchQuery} automotive repair troubleshooting"`,
        type: 'website',
        description: `General search for ${searchQuery} automotive issues`,
        icon: <Search className="h-4 w-4" />
      })
    }

    // Combine contextual suggestions with reference sites
    setSuggestions([...contextualSuggestions, ...referenceSites])
  }, [vehicleInfo, searchQuery, vehicleString])

  const handleWebSearch = async () => {
    if (!webSearchQuery.trim()) return

    setIsSearching(true)
    const searchUrl = vehicleString 
      ? `https://www.google.com/search?q="${vehicleString} ${webSearchQuery} automotive repair"`
      : `https://www.google.com/search?q="${webSearchQuery} automotive repair"`

    window.open(searchUrl, '_blank')
    setIsSearching(false)
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    window.open(suggestion.url, '_blank')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'youtube': return 'bg-red-100 text-red-800'
      case 'manual': return 'bg-blue-100 text-blue-800'
      case 'database': return 'bg-green-100 text-green-800'
      case 'forum': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'youtube': return 'Video'
      case 'manual': return 'Manual'
      case 'database': return 'Database'
      case 'forum': return 'Forum'
      case 'website': return 'Search'
      default: return 'Reference'
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Automotive References & Web Search
            </h3>
            {vehicleString && (
              <Badge variant="outline" className="text-xs">
                {vehicleString}
              </Badge>
            )}
          </div>

          {/* Custom Web Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Search the web for automotive solutions..."
              value={webSearchQuery}
              onChange={(e) => setWebSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleWebSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleWebSearch}
              disabled={isSearching || !webSearchQuery.trim()}
              size="sm"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'Searching...' : 'Search Web'}
            </Button>
          </div>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.slice(0, 9).map((suggestion, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-start gap-2 mb-2">
                  {suggestion.icon}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium truncate">{suggestion.title}</h4>
                      <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeColor(suggestion.type)}`}
                    >
                      {getTypeLabel(suggestion.type)}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{suggestion.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            Click any reference to open in a new tab • {suggestions.length} resources available
            {vehicleString && ` for ${vehicleString}`}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

AutomotiveSuggestions.propTypes = {
  vehicleInfo: PropTypes.shape({
    year: PropTypes.number,
    make: PropTypes.string,
    model: PropTypes.string,
    engine: PropTypes.string,
  }),
  searchQuery: PropTypes.string,
}