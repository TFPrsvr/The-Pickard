'use client'

import { AutomotiveWebSearch } from '@/components/automotive-web-search'
import { SearchResult } from '@/lib/web-search'

export default function TestSearchPage() {
  const handleWebSearchResult = (result: SearchResult) => {
    console.log('Search result:', result)
    alert(`Found: ${result.title}`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Test Web Search</h1>
      <p className="text-gray-600 mb-8">
        Test your Google Custom Search integration without authentication
      </p>
      
      <AutomotiveWebSearch onResultSelect={handleWebSearchResult} />
    </div>
  )
}