# API Documentation - The Pickard

## Overview

The Pickard provides a RESTful API for accessing vehicle diagnostics, parts database, and web search functionality. All API endpoints are built with Next.js API routes and use JSON for request and response payloads.

## Base URL

**Development**: `http://localhost:3000/api`
**Production**: `https://your-domain.com/api`

## Authentication

All authenticated endpoints require a valid Clerk session. Include the session token in your requests:

```typescript
// Client-side with Clerk
import { useAuth } from '@clerk/nextjs'

const { getToken } = useAuth()
const token = await getToken()

fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## API Endpoints

### 1. Search API

#### **GET /api/search**

Search for vehicles or problems based on filters.

**Query Parameters**:
- `type` (string): Search type - `vehicles` or `problems`
- `q` (string): Search query text
- `vehicleId` (string): Vehicle ID for problem search
- `yearFrom` (number): Filter by year range start
- `yearTo` (number): Filter by year range end
- `make` (string): Vehicle manufacturer
- `model` (string): Vehicle model
- `engineType` (string): Engine type filter
- `driveType` (string): Drive type - `AWD`, `2WD`, or `4WD`
- `submodel` (string): Vehicle submodel

**Example Request**:
```bash
GET /api/search?type=vehicles&make=Honda&model=Accord&yearFrom=2020&yearTo=2023
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "vehicle-123",
      "year": 2022,
      "make": "Honda",
      "model": "Accord",
      "engineType": "2.0L Turbo",
      "driveType": "FWD"
    }
  ]
}
```

#### **POST /api/search**

Perform advanced search with complex filters.

**Request Body**:
```json
{
  "type": "vehicles",
  "filters": {
    "year": [2020, 2023],
    "make": ["Honda"],
    "model": ["Accord"],
    "engineType": ["2.0L Turbo"]
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": [...]
}
```

---

### 2. Web Search API

#### **POST /api/web-search**

Perform web search for automotive repair information.

**Authentication**: Not required (public endpoint)

**Request Body**:
```json
{
  "query": "engine won't start",
  "category": "engine",
  "vehicleTypes": ["car", "truck"],
  "type": "specific_problem"
}
```

**Parameters**:
- `query` (string, required): Search query
- `category` (string, optional): Category filter - `engine`, `transmission`, `brakes`, etc.
- `vehicleTypes` (string[], optional): Vehicle types to focus on
- `type` (string, optional): Search type - `automotive_terms` or `specific_problem`

**Response**:
```json
{
  "success": true,
  "query": "engine won't start",
  "category": "engine",
  "results": [
    {
      "title": "How to Fix: engine won't start - Complete Guide",
      "url": "https://example.com/guide",
      "snippet": "Learn how to diagnose and repair...",
      "source": "example.com"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Environment Variables Required**:
- `GOOGLE_CUSTOM_SEARCH_API_KEY` - Google Custom Search API key
- `GOOGLE_CUSTOM_SEARCH_ENGINE_ID` - Search engine ID

If API keys are not configured, the endpoint returns simulated results for development.

#### **GET /api/web-search**

Get endpoint information.

**Response**:
```json
{
  "message": "Web search API endpoint",
  "usage": "POST with query parameter",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 3. Search Results API

Manage saved web search results.

**Authentication**: Required (Clerk)

#### **POST /api/search-results**

Save a web search result to user's collection.

**Request Body**:
```json
{
  "title": "How to Fix Engine Issues",
  "url": "https://example.com/guide",
  "snippet": "Comprehensive guide...",
  "source": "example.com",
  "searchTerm": "engine problems",
  "category": "engine",
  "tags": ["diagnostic", "repair"],
  "notes": "Useful troubleshooting steps"
}
```

**Required Fields**:
- `title` (string)
- `url` (string)
- `searchTerm` (string)
- `category` (string)

**Optional Fields**:
- `snippet` (string)
- `source` (string)
- `tags` (string[])
- `notes` (string)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": "user-123",
    "title": "How to Fix Engine Issues",
    "url": "https://example.com/guide",
    "isBookmarked": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Search result saved successfully"
}
```

**Error Responses**:
- `400` - Missing required fields
- `401` - Unauthorized (no valid session)
- `404` - User not found
- `409` - URL already saved by user
- `500` - Internal server error

#### **GET /api/search-results**

Get user's saved search results.

**Query Parameters**:
- `category` (string, optional): Filter by category
- `bookmarked` (boolean, optional): Filter bookmarked items
- `limit` (number, optional): Results per page (default: 20)
- `offset` (number, optional): Pagination offset (default: 0)

**Example Request**:
```bash
GET /api/search-results?category=engine&bookmarked=true&limit=10
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Engine Diagnostic Guide",
      "url": "https://example.com/guide",
      "category": "engine",
      "tags": ["diagnostic"],
      "isBookmarked": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

#### **PATCH /api/search-results**

Update a saved search result.

**Request Body**:
```json
{
  "id": 1,
  "isBookmarked": true,
  "tags": ["diagnostic", "advanced"],
  "notes": "Updated notes"
}
```

**Required Fields**:
- `id` (number)

**Optional Fields** (at least one required):
- `isBookmarked` (boolean)
- `tags` (string[])
- `notes` (string)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "isBookmarked": true,
    "tags": ["diagnostic", "advanced"],
    "updatedAt": "2024-01-15T11:00:00.000Z"
  },
  "message": "Search result updated successfully"
}
```

#### **DELETE /api/search-results**

Delete a saved search result.

**Query Parameters**:
- `id` (number, required): Search result ID

**Example Request**:
```bash
DELETE /api/search-results?id=1
```

**Response**:
```json
{
  "success": true,
  "message": "Search result deleted successfully"
}
```

---

### 4. Contact API

#### **POST /api/contact**

Submit a contact form message.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Technical Support",
  "message": "I need help with..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

### 5. Webhooks

#### **POST /api/webhooks/clerk**

Clerk webhook handler for user lifecycle events.

**Authentication**: Clerk webhook signature verification

**Events Handled**:
- `user.created` - New user registration
- `user.updated` - User profile updates
- `user.deleted` - User account deletion

**Webhook Configuration**:
Set webhook URL in Clerk dashboard to: `https://your-domain.com/api/webhooks/clerk`

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common HTTP Status Codes**:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## Rate Limiting

**Current Status**: Not implemented
**Planned**: 100 requests per minute per IP address

---

## Data Types

### SearchFilters

```typescript
interface SearchFilters {
  year?: number[]
  make?: string[]
  model?: string[]
  engineType?: string[]
  driveType?: ('AWD' | '2WD' | '4WD')[]
  submodel?: string[]
}
```

### SearchCategory

```typescript
type SearchCategory =
  | 'engine'
  | 'transmission'
  | 'brakes'
  | 'electrical'
  | 'suspension'
  | 'hvac'
  | 'diesel'
  | 'general'
```

---

## Client Libraries

### TypeScript/JavaScript Example

```typescript
// lib/api-client.ts
export class PickardAPIClient {
  private baseURL: string

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
  }

  async searchVehicles(filters: SearchFilters) {
    const response = await fetch(`${this.baseURL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'vehicles', filters })
    })
    return response.json()
  }

  async webSearch(query: string, category?: string) {
    const response = await fetch(`${this.baseURL}/web-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category })
    })
    return response.json()
  }

  async saveSearchResult(data: SaveSearchResultRequest) {
    const response = await fetch(`${this.baseURL}/search-results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
```

---

## API Versioning

**Current Version**: v1 (implicit)
**Future**: API versioning will be implemented as `/api/v2/...` when breaking changes are introduced

---

## Support

For API support or questions:
- Check this documentation
- Review code examples in `/src/app/api/`
- See type definitions in `/src/types/`
- Contact development team for clarifications

---

**Last Updated**: 2024-01-15
