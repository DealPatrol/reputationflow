# Contributing to ReputationFlow

Thank you for your interest in contributing to ReputationFlow! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, professional, and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include:
   - Clear description of the issue
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing feature requests
2. Describe the problem you're solving
3. Explain your proposed solution
4. Consider alternatives you've thought about

### Code Contributions

#### Setup Development Environment

\`\`\`bash
# Fork and clone the repository
git clone https://github.com/yourusername/reputationflow.git
cd reputationflow

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
\`\`\`

#### Making Changes

1. Create a new branch:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. Make your changes following our coding standards

3. Test your changes thoroughly

4. Commit with clear messages:
   \`\`\`bash
   git commit -m "feat: add new feature"
   \`\`\`

#### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

#### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update CHANGELOG.md
4. Create pull request with clear description
5. Link related issues
6. Wait for review

#### Code Standards

**TypeScript:**
- Use strict TypeScript types
- Avoid `any` type
- Export interfaces and types

**React:**
- Use functional components
- Prefer hooks over class components
- Keep components focused and small
- Use proper prop types

**Styling:**
- Use Tailwind CSS utilities
- Follow design system tokens
- Mobile-first responsive design
- Maintain consistent spacing

**API Routes:**
- Validate all inputs
- Use proper HTTP status codes
- Return consistent error format
- Add comprehensive error handling

**Database:**
- Use parameterized queries
- Add proper indexes
- Follow naming conventions
- Document schema changes

#### Testing

\`\`\`bash
# Run type checking
npm run type-check

# Run linter
npm run lint

# Build production
npm run build
\`\`\`

## Project Structure

\`\`\`
app/
├── api/          # API routes
├── (routes)/     # Page routes
components/
├── ui/           # Reusable UI components
├── *-view.tsx    # Feature views
lib/
├── db.ts         # Database functions
├── validators.ts # Input validation
\`\`\`

## Documentation

- Update README.md for major changes
- Add JSDoc comments for complex functions
- Update API documentation
- Include examples in documentation

## Questions?

- Open a GitHub Discussion
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
