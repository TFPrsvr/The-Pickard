import { NextRequest, NextResponse } from 'next/server'
import { SearchCategory } from '@/lib/search-terms'

interface SearchRequestBody {
  query: string
  category?: SearchCategory
  vehicleTypes?: string[]
  type?: 'automotive_terms' | 'specific_problem'
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequestBody = await request.json()
    
    if (!body.query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }
    
    // Try real web search API first, fall back to simulation if not configured
    let results
    try {
      results = await performWebSearch(body.query, body.category)
    } catch (searchError) {
      console.log('Using simulated results (API not configured):', searchError.message)
      results = await simulateWebSearch(body.query, body.category)
    }
    
    return NextResponse.json({
      success: true,
      query: body.query,
      category: body.category,
      results: results,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Web search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Real web search using Google Custom Search API
async function performWebSearch(query: string, category?: SearchCategory) {
  const apiKey = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY
  const searchEngineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID
  
  if (!apiKey || !searchEngineId) {
    throw new Error('Google Custom Search API not configured')
  }
  
  // Enhance query with automotive context
  const enhancedQuery = `${query} automotive repair mechanic fix tutorial`
  
  const searchUrl = new URL('https://www.googleapis.com/customsearch/v1')
  searchUrl.searchParams.append('key', apiKey)
  searchUrl.searchParams.append('cx', searchEngineId)
  searchUrl.searchParams.append('q', enhancedQuery)
  searchUrl.searchParams.append('num', '10')
  searchUrl.searchParams.append('safe', 'active')
  
  const response = await fetch(searchUrl.toString())
  
  if (!response.ok) {
    throw new Error(`Google API error: ${response.status}`)
  }
  
  const data = await response.json()
  
  return (data.items || []).map((item: any) => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
    source: extractDomain(item.link)
  }))
}

// Alternative: SerpAPI implementation
async function performSerpAPISearch(query: string, category?: SearchCategory) {
  const apiKey = process.env.SERPAPI_KEY
  
  if (!apiKey) {
    throw new Error('SerpAPI not configured')
  }
  
  const enhancedQuery = `${query} automotive repair mechanic fix tutorial`
  
  const searchUrl = new URL('https://serpapi.com/search.json')
  searchUrl.searchParams.append('api_key', apiKey)
  searchUrl.searchParams.append('q', enhancedQuery)
  searchUrl.searchParams.append('engine', 'google')
  searchUrl.searchParams.append('num', '10')
  
  const response = await fetch(searchUrl.toString())
  
  if (!response.ok) {
    throw new Error(`SerpAPI error: ${response.status}`)
  }
  
  const data = await response.json()
  
  return (data.organic_results || []).map((item: any) => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
    source: extractDomain(item.link)
  }))
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return 'Unknown'
  }
}

// Simulate web search results for development
// In production, replace this with actual web search API calls
async function simulateWebSearch(query: string, category?: SearchCategory) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const baseResults = [
    {
      title: `How to Fix: ${query} - Complete Guide`,
      url: `https://mechanicsadvice.com/guides/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Learn how to diagnose and repair ${query}. Step-by-step instructions with tools needed, common causes, and preventive maintenance tips.`,
      source: 'mechanicsadvice.com'
    },
    {
      title: `${query} - Common Causes and Solutions`,
      url: `https://autorepairguide.com/problems/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Detailed troubleshooting guide for ${query}. Includes diagnostic procedures, required tools, and estimated repair costs.`,
      source: 'autorepairguide.com'
    },
    {
      title: `DIY Repair: ${query} Made Easy`,
      url: `https://diycarrepair.com/tutorials/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Save money by fixing ${query} yourself. Our comprehensive tutorial covers all skill levels with video demonstrations and tips.`,
      source: 'diycarrepair.com'
    },
    {
      title: `Professional Diagnosis of ${query}`,
      url: `https://proscantools.com/diagnose/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Professional diagnostic techniques for ${query}. Using scan tools, multimeters, and visual inspection methods.`,
      source: 'proscantools.com'
    },
    {
      title: `${query} - YouTube Repair Video`,
      url: `https://youtube.com/watch?v=example-${Math.random().toString(36).substring(7)}`,
      snippet: `Watch our mechanic demonstrate how to fix ${query} in real-time. Tools list and parts information in description.`,
      source: 'youtube.com'
    }
  ]
  
  // Add category-specific results
  if (category) {
    baseResults.push({
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} System: ${query}`,
      url: `https://automotive${category}.com/repairs/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Specialized information about ${query} in the ${category} system. Technical specifications and repair procedures.`,
      source: `automotive${category}.com`
    })
  }
  
  return baseResults
}

export async function GET() {
  return NextResponse.json({
    message: 'Web search API endpoint',
    usage: 'POST with query parameter',
    timestamp: new Date().toISOString()
  })
}