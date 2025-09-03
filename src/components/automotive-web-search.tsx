'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { webSearchService, SearchResult } from '@/lib/web-search'
import { SEARCH_CATEGORIES, SearchCategory, getSearchTermsByCategory } from '@/lib/search-terms'
import { Search, ExternalLink, Clock, Globe, Filter } from 'lucide-react'

interface AutomotiveWebSearchProps {
  onResultSelect?: (result: SearchResult) => void
  defaultCategory?: SearchCategory
  defaultVehicleType?: string
}

export function AutomotiveWebSearch({ 
  onResultSelect, 
  defaultCategory,
  defaultVehicleType 
}: AutomotiveWebSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory | 'all'>('all')
  const [selectedVehicleType, setSelectedVehicleType] = useState(defaultVehicleType || 'all')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategory(defaultCategory)
    }
  }, [defaultCategory])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const results = await webSearchService.searchSpecificProblem(
        searchQuery,
        // Add vehicle info if available
        {}
      )
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutomotiveTermsSearch = async () => {
    setIsLoading(true)
    try {
      const results = await webSearchService.searchAutomotiveTerms({
        category: selectedCategory && selectedCategory !== 'all' ? selectedCategory : undefined,
        vehicleType: selectedVehicleType && selectedVehicleType !== 'all' ? selectedVehicleType : undefined,
        limit: 8
      })
      setSearchResults(results)
    } catch (error) {
      console.error('Automotive terms search failed:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)
    if (value.length > 2) {
      const newSuggestions = webSearchService.getSearchSuggestions(value, 5)
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.term)
    setSelectedCategory(suggestion.category)
    setSuggestions([])
  }

  const handleSaveResult = async (result: SearchResult) => {
    try {
      await webSearchService.saveSearchResult(result)
      alert('Search result saved successfully!')
    } catch (error) {
      alert(`Failed to save result: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Input
              placeholder="Enter automotive problem (e.g., 'engine won't start', 'brake noise')..."
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="absolute right-1 top-1 h-8 w-8 p-0"
              size="sm"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium">{suggestion.term}</span>
                    <span className="text-gray-500 ml-2">({suggestion.category})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Button
              onClick={handleAutomotiveTermsSearch}
              disabled={isLoading}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Search Common Problems
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {SEARCH_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicle Types</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="18-wheeler">18-Wheeler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching automotive databases...</p>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Search Results ({searchResults.length})
            </h3>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {searchResults.map((result, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-700 hover:text-blue-800 mb-2">
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        {result.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </h4>
                    
                    <p className="text-gray-700 text-sm mb-2">
                      {result.snippet}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {result.source}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {result.category}
                      </span>
                      {result.searchTerm && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {result.searchTerm}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveResult(result)}
                    >
                      Save to DB
                    </Button>
                    {onResultSelect && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onResultSelect(result)}
                      >
                        Use Result
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && !isLoading && searchQuery && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              No results found for "{searchQuery}". Try different keywords or browse common problems.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AutomotiveWebSearch