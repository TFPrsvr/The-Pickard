# Web Search Integration Setup

## Overview
This guide helps you set up web search functionality for automotive mechanics terms in The Pickard application.

## 1. Choose Your Search API Provider

### Option A: Google Custom Search API (Recommended)

**Setup Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Custom Search API
4. Create credentials (API Key)
5. Go to [Google Custom Search](https://cse.google.com/cse/)
6. Create a new search engine
7. Add sites to search (or use "Search the entire web")
8. Get your Search Engine ID

**Environment Variables:**
```bash
GOOGLE_CUSTOM_SEARCH_API_KEY=your_google_api_key
GOOGLE_CUSTOM_SEARCH_ENGINE_ID=your_search_engine_id
```

**Pricing:** 100 free queries/day, then $5 per 1000 queries

### Option B: SerpAPI (Alternative)

**Setup Steps:**
1. Go to [SerpAPI](https://serpapi.com/)
2. Sign up for an account
3. Get your API key from the dashboard

**Environment Variables:**
```bash
SERPAPI_KEY=your_serpapi_key
```

**Pricing:** 100 free queries/month, then paid plans

### Option C: Bing Search API (Alternative)

**Setup Steps:**
1. Go to [Azure Portal](https://portal.azure.com/)
2. Create a Bing Search resource
3. Get your API key

**Environment Variables:**
```bash
BING_SEARCH_API_KEY=your_bing_api_key
```

## 2. Database Setup

Run the database migration to add the web search results table:

```bash
npm run db:generate
npm run db:migrate
```

Or if using push:
```bash
npm run db:push
```

## 3. Environment Variables

Copy your `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Add the appropriate API keys for your chosen provider.

## 4. Testing the Integration

### Development Testing (Simulated Results)
If no API keys are configured, the system will use simulated search results for development.

### Production Testing
1. Add your API keys to `.env.local`
2. Start the development server: `npm run dev`
3. Navigate to `/search` or `/dashboard`
4. Click on "Web Search" tab
5. Try searching for automotive terms

## 5. Features Available

### Search Functionality
- ✅ 50+ pre-defined automotive search terms
- ✅ Custom search queries
- ✅ Category filtering (engine, transmission, brakes, etc.)
- ✅ Vehicle type filtering (car, truck, 18-wheeler)
- ✅ Real-time search suggestions

### Database Integration
- ✅ Save search results to database
- ✅ User-specific saved results
- ✅ Bookmark functionality
- ✅ Tags and notes
- ✅ Search history

### Pages with Web Search
- ✅ `/search` - Main search page with web search tab
- ✅ `/dashboard` - Dashboard with integrated web search

## 6. API Endpoints

### Web Search API
- `POST /api/web-search` - Perform web search
- `GET /api/web-search` - Get endpoint info

### Search Results API  
- `POST /api/search-results` - Save search result
- `GET /api/search-results` - Get saved results
- `PATCH /api/search-results` - Update search result
- `DELETE /api/search-results` - Delete search result

## 7. Usage Examples

### Basic Search
```javascript
import { webSearchService } from '@/lib/web-search'

// Search for specific problem
const results = await webSearchService.searchSpecificProblem('engine won\\'t start')

// Search automotive terms with filters
const results = await webSearchService.searchAutomotiveTerms({
  category: 'engine',
  vehicleType: 'car',
  priority: 'high'
})
```

### Save Results
```javascript
// Save a search result
await webSearchService.saveSearchResult(result, ['engine', 'repair'], 'Useful guide')

// Get saved results
const saved = await webSearchService.getSavedSearchResults({
  category: 'engine',
  bookmarked: true
})
```

## 8. Troubleshooting

### API Key Issues
- Verify API keys are correctly added to `.env.local`
- Check API key permissions and quotas
- Ensure the correct search engine ID for Google Custom Search

### Database Issues
- Make sure database migrations have been run
- Check that the user exists in the database (sign up/sign in first)
- Verify database connection string

### Search Not Working
- Check browser console for JavaScript errors
- Verify API endpoints are responding (check Network tab)
- If using Google Custom Search, ensure the search engine is configured correctly

## 9. Production Deployment

1. Add environment variables to your production environment
2. Ensure database is migrated in production
3. Test with real API keys
4. Monitor API usage and costs
5. Set up error monitoring for search failures

## 10. Future Enhancements

- **Search Analytics:** Track popular search terms
- **AI-Powered Results:** Use AI to filter and rank results
- **Caching:** Implement Redis for search result caching  
- **Bulk Operations:** Save multiple results at once
- **Export Feature:** Export saved results to PDF/CSV
- **Collaborative Features:** Share saved results between users