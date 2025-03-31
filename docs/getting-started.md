# Getting Started

This guide will help you set up your development environment for the Security Configuration Platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- Docker and Docker Compose
- Git
- PostgreSQL (v14 or later)
- Redis (v7 or later)

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/robbedell/security-config-platform.git
cd security-config-platform
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd src/frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Configuration

Create the following environment files:

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

#### Backend (.env)

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/security_config
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-development-secret-key
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Setup

```bash
# Start PostgreSQL and Redis using Docker Compose
cd ../../docker
docker-compose up -d db redis

# Run database migrations
cd ../src/backend
npm run migrate
```

### 5. Start Development Servers

```bash
# Start frontend (in one terminal)
cd src/frontend
npm run dev

# Start backend (in another terminal)
cd src/backend
npm run dev
```

## Docker Development

Alternatively, you can use Docker for development:

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Project Structure

```
security-config-platform/
├── src/
│   ├── frontend/          # Next.js frontend application
│   └── backend/           # Node.js backend application
├── docker/                # Docker configuration files
├── config/               # Configuration files
├── docs/                 # Documentation
└── .github/              # GitHub Actions workflows
```

## Development Workflow

1. **Branch Management**

   ```bash
   # Create a new feature branch
   git checkout -b feature/your-feature-name

   # Create a new bugfix branch
   git checkout -b fix/your-bugfix-name
   ```

2. **Code Style**

   - Frontend: ESLint + Prettier
   - Backend: ESLint + Prettier
   - Run linting: `npm run lint`
   - Format code: `npm run format`

3. **Testing**

   ```bash
   # Run frontend tests
   cd src/frontend
   npm test

   # Run backend tests
   cd src/backend
   npm test
   ```

4. **Building**

   ```bash
   # Build frontend
   cd src/frontend
   npm run build

   # Build backend
   cd src/backend
   npm run build
   ```

## Common Issues and Solutions

### Database Connection Issues

If you're having trouble connecting to the database:

1. Check if PostgreSQL is running:

   ```bash
   docker ps | grep postgres
   ```

2. Verify database credentials in `.env`

3. Try connecting directly:
   ```bash
   psql -h localhost -U postgres -d security_config
   ```

### Redis Connection Issues

If Redis isn't connecting:

1. Check if Redis is running:

   ```bash
   docker ps | grep redis
   ```

2. Verify Redis URL in `.env`

3. Test Redis connection:
   ```bash
   redis-cli ping
   ```

### Frontend Build Issues

If the frontend build fails:

1. Clear Next.js cache:

   ```bash
   rm -rf .next
   ```

2. Reinstall dependencies:

   ```bash
   rm -rf node_modules
   npm install
   ```

3. Check for TypeScript errors:
   ```bash
   npm run type-check
   ```

## Next Steps

1. [Architecture Overview](../architecture/README.md)
2. [API Documentation](../api/README.md)
3. [Configuration Guide](../configuration/README.md)
4. [Development Guide](../development/README.md)

## Getting Help

- Check the [Troubleshooting Guide](../troubleshooting/README.md)
- Join our [GitHub Discussions](https://github.com/robbedell/security-config-platform/discussions)
- Create an [Issue](https://github.com/robbedell/security-config-platform/issues)

---

<div class="card">
  <h3>🚀 Ready to Start Developing?</h3>
  <p>Follow our development guide to start contributing to the project.</p>
  <a href="#/development" class="button">View Development Guide</a>
</div>
