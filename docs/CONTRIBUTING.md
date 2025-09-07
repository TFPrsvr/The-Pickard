# Contributing Guide - The Pickard

## Overview

Thank you for your interest in contributing to The Pickard! This guide outlines the development workflow, coding standards, and best practices for contributors.

## Development Environment

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git version control
- Code editor with TypeScript support (VS Code recommended)

### Setup
1. **Clone Repository**:
   ```bash
   git clone https://github.com/company/the-pickard.git
   cd the-pickard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Database Setup**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Project Structure

### File Organization
```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── diagnostics/       # Diagnostic center pages
│   ├── parts/             # Parts database pages
│   └── [feature]/         # Other feature pages
├── components/            # Reusable React components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/                   # Utility libraries and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── styles/                # Global styles and Tailwind config
└── utils/                 # Helper functions and utilities
```

### Naming Conventions

#### Files and Directories
```bash
# Components: PascalCase
components/UserProfile.tsx
components/SearchForm.tsx

# Pages: kebab-case 
app/diagnostic-center/page.tsx
app/parts-database/page.tsx

# Utilities: camelCase
utils/formatPartNumber.ts
lib/vehicleDatabase.ts

# Hooks: camelCase with 'use' prefix
hooks/useVehicleSearch.ts
hooks/useAuthUser.ts
```

#### Variables and Functions
```typescript
// Variables: camelCase
const partNumber = 'ABC123'
const searchResults = []

// Functions: camelCase
function calculatePrice() {}
const handleSubmit = () => {}

// Components: PascalCase
function SearchForm() {}
export default VehicleCard

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_SEARCH_RESULTS = 100
```

## Coding Standards

### TypeScript Guidelines
```typescript
// Always use explicit types for function parameters and returns
interface SearchParams {
  query: string
  filters: SearchFilters
  limit?: number
}

function searchVehicleParts(params: SearchParams): Promise<PartResult[]> {
  // Implementation
}

// Use proper interface definitions
interface VehiclePart {
  id: string
  partNumber: string
  description: string
  compatibility: VehicleCompatibility[]
  price: number
  supplier: Supplier
}

// Prefer type unions over any
type VehicleType = 'car' | 'truck' | 'diesel' | 'motorcycle'
```

### React Component Guidelines
```typescript
// Use proper component typing
interface VehicleCardProps {
  vehicle: Vehicle
  onSelect: (vehicle: Vehicle) => void
  className?: string
}

export function VehicleCard({ vehicle, onSelect, className }: VehicleCardProps) {
  return (
    <div className={`vehicle-card ${className}`}>
      {/* Component content */}
    </div>
  )
}

// Use proper prop validation
VehicleCard.displayName = 'VehicleCard'
```

### CSS and Styling
```css
/* Use Tailwind CSS classes primarily */
<div className="flex items-center justify-between p-4 rounded-md border">

/* Custom CSS for complex layouts only */
.automotive-card {
  @apply bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90;
  @apply text-white relative overflow-hidden;
}

/* Follow BEM methodology for custom CSS */
.search-form {
  /* Block */
}

.search-form__input {
  /* Element */
}

.search-form__input--focused {
  /* Modifier */
}
```

### Database Schema Guidelines
```typescript
// Use Drizzle ORM schema definitions
export const vehicles = pgTable('vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  year: integer('year').notNull(),
  make: varchar('make', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  engine: varchar('engine', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Define relationships clearly
export const parts = pgTable('parts', {
  id: uuid('id').defaultRandom().primaryKey(),
  partNumber: varchar('part_number', { length: 50 }).notNull().unique(),
  description: text('description').notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  // ... other fields
})
```

## Git Workflow

### Branch Strategy
```bash
# Branch from main for all development
git checkout main
git pull origin main
git checkout -b feature/diagnostic-improvements

# Branch naming conventions:
feature/feature-name        # New features
fix/bug-description        # Bug fixes  
hotfix/critical-issue      # Urgent production fixes
chore/maintenance-task     # Maintenance and cleanup
docs/documentation-update  # Documentation changes
```

### Commit Guidelines
```bash
# Commit message format
type(scope): short description

# Examples:
feat(search): add advanced filtering options
fix(auth): resolve login redirect issue
docs(api): update endpoint documentation
style(ui): improve mobile responsive design
refactor(utils): optimize part number validation
test(search): add integration tests for vehicle lookup
```

### Pull Request Process
1. **Create Branch**: From latest main branch
2. **Develop**: Implement feature with tests
3. **Test**: Ensure all tests pass locally
4. **Review**: Self-review code changes
5. **Submit PR**: With clear description and context
6. **Address Feedback**: Respond to review comments
7. **Merge**: After approval and CI passes

### Pull Request Template
```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Mobile testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] TypeScript compilation passes
- [ ] All tests pass
```

## Testing Guidelines

### Unit Tests
```typescript
// Use Jest and React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchForm } from '../SearchForm'

describe('SearchForm', () => {
  it('should submit search with correct parameters', () => {
    const mockOnSubmit = jest.fn()
    render(<SearchForm onSubmit={mockOnSubmit} />)
    
    const input = screen.getByPlaceholderText('Enter part number...')
    fireEvent.change(input, { target: { value: 'ABC123' } })
    fireEvent.click(screen.getByText('Search'))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({ query: 'ABC123' })
  })
})
```

### Integration Tests
```typescript
// Test complete user workflows
describe('Vehicle Search Integration', () => {
  it('should complete full search workflow', async () => {
    // Setup test data
    // Render components
    // Simulate user interactions
    // Verify results
  })
})
```

### End-to-End Tests
```typescript
// Use Playwright for E2E testing
import { test, expect } from '@playwright/test'

test('complete diagnostic workflow', async ({ page }) => {
  await page.goto('/diagnostic-center')
  await page.fill('[data-testid="vehicle-year"]', '2020')
  await page.fill('[data-testid="vehicle-make"]', 'Ford')
  await page.click('[data-testid="search-button"]')
  await expect(page.locator('[data-testid="results"]')).toBeVisible()
})
```

## Performance Guidelines

### Code Optimization
```typescript
// Use React.memo for expensive components
export const VehicleList = React.memo(({ vehicles }: VehicleListProps) => {
  return (
    <div>
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
})

// Use useMemo for expensive calculations
const filteredParts = useMemo(() => {
  return parts.filter(part => part.category === selectedCategory)
}, [parts, selectedCategory])

// Use useCallback for event handlers
const handleSearch = useCallback((query: string) => {
  // Search implementation
}, [])
```

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/images/part-diagram.png"
  alt="Part diagram"
  width={800}
  height={600}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Database Optimization
```typescript
// Use proper indexing
await db.select()
  .from(parts)
  .where(and(
    eq(parts.make, make),
    eq(parts.model, model)
  ))
  .limit(50)

// Implement pagination
const { parts, totalCount } = await getPaginatedParts({
  page: 1,
  limit: 20,
  filters: searchFilters
})
```

## Security Guidelines

### Input Validation
```typescript
// Validate all user inputs
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.object({
    category: z.enum(['engine', 'transmission', 'brakes']),
    year: z.number().int().min(1900).max(2030)
  })
})

export function validateSearchInput(input: unknown) {
  return searchSchema.parse(input)
}
```

### API Security
```typescript
// Implement proper authentication
import { auth } from '@clerk/nextjs'

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Process request
}
```

## Accessibility Guidelines

### ARIA Implementation
```tsx
// Proper ARIA labels and roles
<button
  aria-label="Search for vehicle parts"
  aria-describedby="search-help"
  onClick={handleSearch}
>
  Search
</button>

<div id="search-help" className="sr-only">
  Enter part number or description to search
</div>

// Proper focus management
<div role="tablist" aria-label="Search categories">
  <button
    role="tab"
    aria-selected={selectedTab === 'parts'}
    aria-controls="parts-panel"
    tabIndex={selectedTab === 'parts' ? 0 : -1}
  >
    Parts
  </button>
</div>
```

### Keyboard Navigation
```typescript
// Handle keyboard events properly
function handleKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      handleAction()
      event.preventDefault()
      break
    case 'Escape':
      handleClose()
      break
  }
}
```

## Release Process

### Version Management
```json
// package.json versioning
{
  "version": "1.2.3",
  "scripts": {
    "version:patch": "npm version patch",
    "version:minor": "npm version minor", 
    "version:major": "npm version major"
  }
}
```

### Deployment Checklist
- [ ] All tests pass
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Performance testing completed
- [ ] Security scan completed
- [ ] Backup verified
- [ ] Rollback plan prepared

## Getting Help

### Resources
- **Documentation**: `/docs` folder in repository
- **Code Examples**: Check existing components for patterns
- **Type Definitions**: Review `/types` folder for interfaces
- **API Documentation**: See `/docs/API.md`

### Communication
- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions
- **Code Review**: Tag reviewers in pull requests
- **Emergency**: Contact team lead for critical issues

## Code Review Standards

### Review Checklist
- [ ] Code follows established patterns
- [ ] TypeScript types are properly defined
- [ ] Tests are included and comprehensive
- [ ] Performance implications considered
- [ ] Security vulnerabilities addressed
- [ ] Accessibility requirements met
- [ ] Mobile responsiveness verified
- [ ] Documentation updated as needed

### Review Process
1. **Self-Review**: Complete self-review before submitting
2. **Automated Checks**: Ensure CI/CD passes
3. **Peer Review**: At least one team member approval
4. **Testing**: Manual testing in staging environment
5. **Approval**: Final approval from code owner
6. **Merge**: Squash and merge to main branch

This contributing guide ensures consistent, high-quality contributions to The Pickard platform while maintaining code quality and project standards.