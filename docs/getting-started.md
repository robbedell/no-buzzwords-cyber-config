# Getting Started

This guide will help you set up your development environment for the Security Configuration Platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- Docker and Docker Compose
- Git
- MongoDB (v6 or later)
- Redis (v7 or later)

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/robbedell/security-config-platform.git
cd security-config-platform
```

### 2. Start Development Environment

The easiest way to get started is using Docker Compose:

```bash
# Start all services
docker compose up -d

# Check service status
docker compose ps
```

This will start:
- Frontend application (http://localhost:3000)
- Backend API (http://localhost:3001)
- MongoDB database
- Redis cache

### 3. Access the Application

Once the services are running, you can access:
- Frontend UI: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api-docs
- Documentation Site: http://localhost:3000/docs

## Development Workflow

### Frontend Development

The frontend is built with Next.js and includes:

- Modern UI components with Tailwind CSS
- Type-safe API integration
- Real-time updates via WebSocket
- Comprehensive form handling
- Responsive design

Key features:
- Security configuration management
- Network zone configuration
- Threat prevention settings
- Logging configuration
- Compliance monitoring

### Backend Development

The backend provides:

- RESTful API endpoints
- MongoDB data persistence
- Redis caching
- JWT authentication
- Rate limiting
- Input validation

Key features:
- Security configuration CRUD
- CVE data integration
- Compliance validation
- Audit logging
- User management

### Testing

Run tests across the project:

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

## Common Issues and Solutions

### Database Connection Issues

If you're having trouble connecting to MongoDB:

1. Check if MongoDB is running:
   ```bash
   docker compose ps db
   ```

2. Verify MongoDB connection string:
   ```bash
   docker compose exec db mongosh
   ```

3. Check logs for errors:
   ```bash
   docker compose logs db
   ```

### Redis Connection Issues

If Redis isn't connecting:

1. Check if Redis is running:
   ```bash
   docker compose ps redis
   ```

2. Verify Redis connection:
   ```bash
   docker compose exec redis redis-cli ping
   ```

3. Check logs for errors:
   ```bash
   docker compose logs redis
   ```

### Frontend Build Issues

If the frontend build fails:

1. Clear Next.js cache:
   ```bash
   docker compose exec frontend rm -rf .next
   ```

2. Rebuild the frontend:
   ```bash
   docker compose restart frontend
   ```

3. Check for TypeScript errors:
   ```bash
   docker compose exec frontend npm run type-check
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
