# Contributing to Persian Medical Bot

Thank you for your interest in contributing to the Persian Medical Bot project! This document outlines the process for contributing and the Git workflow we follow.

## Git Workflow

We follow a simplified Git Flow workflow:

### Branch Naming Convention

- `feature/short-description` - For new features or enhancements
- `bugfix/short-description` - For bug fixes
- `hotfix/short-description` - For critical bug fixes that need to be deployed immediately
- `refactor/short-description` - For code refactoring without changing functionality
- `docs/short-description` - For documentation updates
- `test/short-description` - For adding or updating tests

Examples:
- `feature/user-authentication`
- `bugfix/fix-data-loading-error`
- `refactor/improve-component-structure`

### Pull Request Process

1. **Fork the Repository** (or create a branch if you're a member)
2. **Create a Branch** using the naming convention above
3. **Make Your Changes**
   - Write clean, maintainable, and well-documented code
   - Follow the code style guidelines
   - Add appropriate tests
4. **Commit Your Changes**
   - Use clear and descriptive commit messages
   - Start commits with type: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, etc.
   - Example: `feat: add user authentication component`
5. **Push to Your Branch**
6. **Submit a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
7. **Code Review**
   - Address feedback from reviewers
8. **Merge**
   - Once approved, your PR will be merged

## Development Workflow

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up pre-commit hooks: `npx husky install`

### Development

1. Create a new branch for your task
2. Make your changes
3. Ensure linting passes: `npm run lint`
4. Ensure formatting is correct: `npm run format`
5. Run tests: `npm test`
6. Run the development server: `npm run dev`

### Pre-Commit Hooks

We use Husky and lint-staged to run checks before commits:

- ESLint to check for code quality issues
- Prettier to ensure consistent formatting
- TypeScript to check for type errors
- Tests to ensure nothing breaks

## Code Style and Standards

- Use TypeScript for all new code
- Follow the established patterns in the codebase
- Use meaningful variable and function names
- Write JSDoc comments for public API methods
- Keep components small and focused
- Extract reusable logic into hooks or utilities

## Testing

- Write tests for new features and bug fixes
- Run tests before submitting a PR: `npm test`
- Aim for good test coverage on critical parts

## Documentation

- Update documentation when changing functionality
- Write clear and concise code comments
- Update the README if needed

Thank you for contributing! 