# Development Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or later
- Docker and Docker Compose
- PostgreSQL 15.x
- Redis 7.x
- Git
- Make (optional, for using Makefile commands)

## Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/robbedell/security-config-platform.git
   cd security-config-platform
   ```

2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd src/frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:

   ```bash
   # Copy example environment files
   cp config/development/.env.example config/development/.env
   cp config/production/.env.example config/production/.env
   ```

4. Configure your environment variables in `config/development/.env`:

   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=security_config
   DB_USER=postgres
   DB_PASSWORD=your_password

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=24h

   # API
   API_PORT=3001
   API_PREFIX=/api/v1

   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## Database Setup

1. Create the database:

   ```bash
   # Using psql
   createdb security_config

   # Or using Docker
   docker exec -it postgres psql -U postgres -c "CREATE DATABASE security_config;"
   ```

2. Run migrations:

   ```bash
   cd src/backend
   npm run migration:run
   ```

3. Seed initial data (optional):

   ```bash
   npm run seed
   ```

## Development Environment

### Using Docker (Recommended)

1. Start the development environment:

   ```bash
   cd docker
   docker-compose up -d
   ```

2. Verify services are running:

   ```bash
   docker-compose ps
   ```

3. View logs:

   ```bash
   docker-compose logs -f
   ```

### Local Development

1. Start Redis:

   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7

   # Or using system service
   sudo service redis-server start
   ```

2. Start PostgreSQL:

   ```bash
   # Using Docker
   docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=your_password postgres:15

   # Or using system service
   sudo service postgresql start
   ```

3. Start the backend:

   ```bash
   cd src/backend
   npm run dev
   ```

4. Start the frontend:

   ```bash
   cd src/frontend
   npm run dev
   ```

## Development Tools

### VS Code Extensions

Recommended extensions for development:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Docker
- GitLens
- REST Client
- Thunder Client
- Mermaid Preview

### Browser Extensions

Recommended extensions for testing:

- React Developer Tools
- Redux DevTools
- JSON Formatter
- CORS Unblock (for development)

## Testing Setup

1. Set up test databases:

   ```bash
   # Create test database
   createdb security_config_test

   # Run test migrations
   cd src/backend
   npm run migration:run -- --env test
   ```

2. Configure test environment:

   ```bash
   cp config/test/.env.example config/test/.env
   ```

3. Run tests:

   ```bash
   # Frontend tests
   cd src/frontend
   npm test

   # Backend tests
   cd src/backend
   npm test

   # All tests (using Make)
   make test
   ```

## Documentation Setup

1. Install documentation tools:

   ```bash
   npm install -g docsify-cli
   ```

2. Serve documentation locally:

   ```bash
   cd docs
   docsify serve
   ```

3. Access documentation:
   - Local: http://localhost:3000
   - API Docs: http://localhost:3001/api-docs

## Troubleshooting

### Common Issues

1. Database Connection Issues

   ```bash
   # Check PostgreSQL status
   sudo service postgresql status

   # Check database exists
   psql -l | grep security_config

   # Check user permissions
   psql -U postgres -c "\du"
   ```

2. Redis Connection Issues

   ```bash
   # Check Redis status
   sudo service redis-server status

   # Test Redis connection
   redis-cli ping
   ```

3. Port Conflicts

   ```bash
   # Check running services
   sudo lsof -i :3000
   sudo lsof -i :3001
   sudo lsof -i :5432
   sudo lsof -i :6379
   ```

### Development Commands

```bash
# Start all services
make dev-up

# Stop all services
make dev-down

# Run tests
make test

# Run linting
make lint

# Run type checking
make type-check

# Build applications
make build

# Clean development environment
make clean
```

## Next Steps

1. Review the [Development Guidelines](guidelines.md)
2. Set up your IDE with recommended extensions
3. Configure your Git hooks for pre-commit checks
4. Familiarize yourself with the project structure
5. Start with a simple feature or bug fix

## Getting Help

- Check the [documentation](https://robbedell.github.io/security-config-platform)
- Join the [Discussions](https://github.com/robbedell/security-config-platform/discussions)
- Open an [Issue](https://github.com/robbedell/security-config-platform/issues)
- Contact the maintainers
