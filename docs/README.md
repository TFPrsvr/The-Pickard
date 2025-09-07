# The Pickard - Automotive Mechanics Database

## Project Overview

The Pickard is a comprehensive full-stack automotive mechanics database application designed for professional automotive technicians, mechanics, and service providers. Built with modern web technologies, it provides access to diagnostic tools, parts databases, repair procedures, and technical documentation.

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Neon, Drizzle ORM
- **Authentication**: Clerk
- **Deployment**: Vercel (recommended)

## Features

### Core Features
- **Diagnostic Center**: Vehicle problem identification and diagnostic tools
- **Parts Database**: Comprehensive automotive, diesel, truck, BMW, and GM parts database
- **Problems & Solutions**: Common and uncommon vehicle issues with detailed solutions
- **Expert Tips**: Professional tips, tool recommendations, and best practices
- **How-to Guides**: Step-by-step repair and maintenance procedures
- **Technical Diagrams**: Wiring diagrams, schematics, and technical illustrations
- **Service Manuals**: Access to technical documentation and repair procedures

### Technical Features
- **Responsive Design**: Mobile, tablet, laptop, and desktop optimized
- **Touch Support**: Touch-friendly interface for mobile devices
- **Accessibility**: ARIA compliant and screen reader friendly
- **Professional UI**: Industry-standard design patterns and behavior
- **Real-time Search**: Fast search across all databases
- **User Authentication**: Secure user management with Clerk
- **Data Validation**: Comprehensive input validation and error handling

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Configuration)
4. Run database migrations: `npm run db:migrate`
5. Start development server: `npm run dev`

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - TypeScript type checking
- `npm run lint` - ESLint code linting
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open database management studio

## Environment Configuration

The application requires several environment variables to function properly. Create the following files:

### `.env.local` (Development)
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"
DIRECT_DATABASE_URL="postgresql://username:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### `.env.example` (Template)
```env
# Database Configuration
DATABASE_URL="your_database_connection_string"
DIRECT_DATABASE_URL="your_direct_database_connection_string"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Application Settings
NEXT_PUBLIC_APP_URL="your_app_url"
NODE_ENV="development"
```

## Project Structure

```
the-pickard/
├── docs/                    # Documentation
├── src/
│   ├── app/                # Next.js 13+ app directory
│   │   ├── (auth)/         # Authentication routes
│   │   ├── api/            # API routes
│   │   └── [pages]/        # Application pages
│   ├── components/         # Reusable components
│   │   ├── ui/             # UI component library
│   │   └── [features]/     # Feature-specific components
│   ├── lib/                # Utility libraries
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── public/                 # Static assets
└── [config files]         # Configuration files
```

## User Roles & Permissions

### Business Users (Non-Technical)
- Access to all diagnostic and repair information
- Search and browse functionality
- Save and bookmark favorite content
- Print/export capabilities

### Administrators
- User management
- Content moderation
- System monitoring
- Database maintenance tools

### Regular Users
- Full database access
- Personal account management
- Search and filtering tools
- Mobile and desktop access

### Future Developers
- Comprehensive code documentation
- Clear file structure and naming conventions
- TypeScript definitions for type safety
- Established coding patterns and best practices

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and best practices.

## Security

- Environment variables are excluded from version control
- All sensitive data is properly encrypted
- User authentication handled by Clerk
- Input validation on all user inputs
- SQL injection protection via Drizzle ORM

## Support

For technical support or questions:
1. Check the documentation in `/docs`
2. Review the codebase comments and type definitions
3. Consult the project's CLAUDE.md for specific instructions

## License

Proprietary - All rights reserved