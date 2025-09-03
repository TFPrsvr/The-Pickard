import { AUTOMOTIVE_SEARCH_TERMS, SearchTerm, SearchCategory } from './search-terms'

export interface SearchResult {
  title: string
  url: string
  snippet: string
  source: string
  searchTerm: string
  category: SearchCategory
  timestamp: Date
}

export interface WebSearchOptions {
  category?: SearchCategory
  vehicleType?: string
  priority?: 'high' | 'medium' | 'low'
  limit?: number
}

export class AutomotiveWebSearchService {
  private readonly baseUrl = '/api/web-search'
  
  /**
   * Search for automotive repair information using predefined terms
   */
  async searchAutomotiveTerms(options: WebSearchOptions = {}): Promise<SearchResult[]> {
    const { category, vehicleType, priority, limit = 10 } = options
    
    // Filter search terms based on options
    let filteredTerms = AUTOMOTIVE_SEARCH_TERMS
    
    if (category) {
      filteredTerms = filteredTerms.filter(term => term.category === category)
    }
    
    if (vehicleType) {
      filteredTerms = filteredTerms.filter(term => term.vehicleTypes.includes(vehicleType))
    }
    
    if (priority) {
      filteredTerms = filteredTerms.filter(term => term.priority === priority)
    }
    
    // Sort by priority (high > medium > low)
    filteredTerms.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
    
    // Limit the number of terms to search
    const termsToSearch = filteredTerms.slice(0, limit)
    
    const searchPromises = termsToSearch.map(term => 
      this.searchSingleTerm(term)
    )
    
    try {
      const results = await Promise.allSettled(searchPromises)
      const successfulResults = results
        .filter((result): result is PromiseFulfilledResult<SearchResult[]> => 
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value)
      
      return successfulResults
    } catch (error) {
      console.error('Error in automotive web search:', error)
      return []
    }
  }
  
  /**
   * Search for a specific automotive problem or solution
   */
  async searchSpecificProblem(
    problem: string, 
    vehicleInfo?: { year?: number; make?: string; model?: string }
  ): Promise<SearchResult[]> {
    const searchQuery = vehicleInfo 
      ? `${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model} ${problem} repair`
      : `${problem} automotive repair`
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          type: 'specific_problem'
        })
      })
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }
      
      const data = await response.json()
      return this.formatSearchResults(data.results, problem, 'engine')
    } catch (error) {
      console.error('Error searching specific problem:', error)
      return []
    }
  }
  
  /**
   * Search a single term and return formatted results
   */
  private async searchSingleTerm(term: SearchTerm): Promise<SearchResult[]> {
    try {
      // Add automotive-specific modifiers to the search term
      const enhancedQuery = `${term.term} automotive repair how to fix`
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: enhancedQuery,
          category: term.category,
          vehicleTypes: term.vehicleTypes
        })
      })
      
      if (!response.ok) {
        throw new Error(`Search failed for term: ${term.term}`)
      }
      
      const data = await response.json()
      return this.formatSearchResults(data.results, term.term, term.category)
    } catch (error) {
      console.error(`Error searching term "${term.term}":`, error)
      return []
    }
  }
  
  /**
   * Format raw search results into SearchResult objects
   */
  private formatSearchResults(
    rawResults: any[], 
    searchTerm: string, 
    category: SearchCategory
  ): SearchResult[] {
    if (!Array.isArray(rawResults)) {
      return []
    }
    
    return rawResults.map(result => ({
      title: result.title || '',
      url: result.url || result.link || '',
      snippet: result.snippet || result.description || '',
      source: this.extractDomain(result.url || result.link || ''),
      searchTerm,
      category,
      timestamp: new Date()
    })).filter(result => result.title && result.url) // Filter out incomplete results
  }
  
  /**
   * Extract domain name from URL
   */
  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return 'Unknown'
    }
  }
  
  /**
   * Get search suggestions based on user input
   */
  getSearchSuggestions(userInput: string, limit: number = 5): SearchTerm[] {
    const input = userInput.toLowerCase()
    
    return AUTOMOTIVE_SEARCH_TERMS
      .filter(term => 
        term.term.toLowerCase().includes(input) ||
        term.category.toLowerCase().includes(input)
      )
      .sort((a, b) => {
        // Prioritize exact matches and high-priority terms
        const aExact = a.term.toLowerCase() === input ? 1 : 0
        const bExact = b.term.toLowerCase() === input ? 1 : 0
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        
        return (bExact - aExact) || (priorityOrder[b.priority] - priorityOrder[a.priority])
      })
      .slice(0, limit)
  }

  /**
   * Save a search result to the database
   */
  async saveSearchResult(result: SearchResult, tags?: string[], notes?: string): Promise<boolean> {
    try {
      const response = await fetch('/api/search-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: result.title,
          url: result.url,
          snippet: result.snippet,
          source: result.source,
          searchTerm: result.searchTerm,
          category: result.category,
          tags: tags || [],
          notes: notes || null
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save search result')
      }

      return true
    } catch (error) {
      console.error('Error saving search result:', error)
      throw error
    }
  }

  /**
   * Get saved search results from database
   */
  async getSavedSearchResults(options: {
    category?: string
    bookmarked?: boolean
    limit?: number
    offset?: number
  } = {}): Promise<any[]> {
    try {
      const params = new URLSearchParams()
      
      if (options.category) params.append('category', options.category)
      if (options.bookmarked) params.append('bookmarked', 'true')
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.offset) params.append('offset', options.offset.toString())

      const response = await fetch(`/api/search-results?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch saved search results')
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching saved search results:', error)
      return []
    }
  }

  /**
   * Update a saved search result
   */
  async updateSearchResult(
    id: number, 
    updates: { isBookmarked?: boolean; tags?: string[]; notes?: string }
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/search-results', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates })
      })

      if (!response.ok) {
        throw new Error('Failed to update search result')
      }

      return true
    } catch (error) {
      console.error('Error updating search result:', error)
      return false
    }
  }

  /**
   * Delete a saved search result
   */
  async deleteSearchResult(id: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/search-results?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete search result')
      }

      return true
    } catch (error) {
      console.error('Error deleting search result:', error)
      return false
    }
  }
}

// Singleton instance
export const webSearchService = new AutomotiveWebSearchService()