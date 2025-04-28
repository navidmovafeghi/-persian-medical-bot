# Persian Medical Bot

A Next.js application to assist Persian-speaking users with medical information, health tracking, and diet monitoring.

## Project Overview

This application serves as a medical assistant for Persian-speaking users, providing:

- AI-powered medical chat
- Health tracking and monitoring
- Food diary and nutrition tracking
- Medication reminders
- Lab results tracking

## Project Structure

```
persian-medical-bot/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── ui/         # Base UI components  
│   │   ├── layout/     # Layout components (headers, sidebars)
│   │   ├── forms/      # Form-specific components
│   │   ├── home/       # Homepage-specific components
│   │   └── dashboard/  # Dashboard-related components
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── config/         # Application configuration and constants
│   ├── services/       # API services and external integrations
│   └── lib/            # External libraries and configurations
└── docs/               # Documentation files
    └── architecture.md # Architecture diagrams and documentation
```

For detailed architecture diagrams, see [docs/architecture.md](docs/architecture.md).

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with custom configurations
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Jest, React Testing Library

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Quality Tools

This project uses several tools to maintain high code quality:

### ESLint

ESLint is configured with strict rules to ensure consistent code style and catch potential issues:

```bash
# Run linting check
npm run lint

# Auto-fix linting issues where possible
npm run lint -- --fix
```

### Prettier

Prettier ensures consistent code formatting across the project:

```bash
# Format all files
npm run format

# Check if files are properly formatted without changing them
npm run format:check
```

### Testing with Jest and React Testing Library

The project uses Jest and React Testing Library for unit and component testing:

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

#### Testing Conventions

- Test files should be named `*.test.ts` or `*.test.tsx`
- Place test files next to the files they are testing
- Use descriptive test names that explain the expected behavior
- Group related tests with `describe` blocks
- Use the custom `render` function from `src/utils/test-utils` for component tests

### TypeScript

The project uses TypeScript for type safety. The TypeScript configuration is in `tsconfig.json`.

## Continuous Integration and Deployment

This project uses GitHub Actions for CI/CD:

- **CI Workflow**: Automatically runs on all PRs to validate code quality
  - Runs linting, type checking, and tests
  - Ensures code formatting is consistent
  - Generates test coverage reports

- **CD Workflow**: Automatically deploys the main branch to production
  - Triggered on merges to main or manually via workflow dispatch
  - Builds the application with production environment variables
  - Deploys to Vercel

## Error Handling

The application implements robust error handling:

- React Error Boundaries catch and display UI errors
- Consistent error handling patterns for API requests
- User-friendly error messages
- Typed error utilities

## Performance Optimization

The application includes several performance optimizations:

### Code Splitting

We use dynamic imports and React.lazy to split the bundle into smaller chunks that are loaded on demand:

```jsx
// Example of using the lazy component loader
import { lazyComponent } from '@/utils/code-splitting';

const DashboardChart = lazyComponent(() => import('@/components/dashboard/Chart'));
```

### Image Optimization

Next.js Image component is configured with:
- Automatic WebP/AVIF conversion
- Responsive sizing
- Lazy loading
- Proper caching headers

### Caching Strategies

Multiple caching layers improve performance:
- Memory caching for frequently accessed data
- Local storage for persistent client-side data
- Service worker for offline support and network request caching
- API response caching with intelligent invalidation

### Progressive Web App (PWA)

The application is configured as a PWA with:
- Service worker for offline functionality
- Web manifest for installability
- App-like experience on mobile devices

## Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the root directory based on the `.env.example` template:

```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_HEALTH_TRACKER=true
NEXT_PUBLIC_ENABLE_FOOD_DIARY=true

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_AUTH_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTH_AUDIENCE=your-api-audience

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `Sidebar.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useAuth.ts`, `formatDate.ts`)
- **Files**: kebab-case for multi-word filenames (e.g., `chat-message.ts`)
- **CSS Classes**: lowercase with hyphens (BEM-like when appropriate)
- **TypeScript Types/Interfaces**: PascalCase (e.g., `UserProfile`, `AppConfig`)

## Code Organization Guidelines

- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Place common utilities in the utils directory
- Keep types and interfaces in the types directory
- Store configuration and constants in the config directory
- Group related components together

## Contributing

1. Create a feature branch from main
2. Make your changes
3. Run linting and type checking: `npm run lint`
4. Format your code: `npm run format`
5. Run tests: `npm test`
6. Create a pull request to merge back to main

## Versioning

We use semantic versioning for this project. The current version is 1.0.0.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Phases Status

All phases of the project have been successfully completed:

### ✅ Phase 1: Project Structure & Documentation
- Organized src directory structure
- Separate UI components from logic
- Improved documentation with README and architecture diagrams
- Added JSDoc comments to key functions
- Standardized naming conventions

### ✅ Phase 2: Code Quality & Standards
- Set up code formatting with Prettier
- Enhanced linting rules
- Extracted configuration into centralized files
- Moved hardcoded values to environment variables
- Resolved the duplicate next.config.js/ts issue

### ✅ Phase 3: Error Handling & Testing
- Implemented error boundaries
- Created consistent error handling patterns
- Set up testing framework with Jest and React Testing Library
- Added test scripts and coverage thresholds
- Created unit and component tests

### ✅ Phase 4: Workflow & Optimization
- Implemented Git workflow with branch naming conventions
- Set up pre-commit hooks for linting/formatting
- Enhanced type safety with strict TypeScript configuration
- Added code splitting for dynamic imports
- Implemented image optimization
- Set up caching strategies including service worker
- Added PWA support
