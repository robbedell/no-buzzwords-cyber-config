# Security Configuration Platform

A unified platform for security configuration management and CVE-based configuration generation. This platform helps security teams manage, validate, and generate security configurations across different vendors while incorporating CVE data for enhanced security.

## Project Status

[![Project Board](https://img.shields.io/badge/Project%20Board-View%20Status-blue)](https://github.com/robbedell/security-config-platform/projects/1)
[![Issues](https://img.shields.io/github/issues/robbedell/security-config-platform)](https://github.com/robbedell/security-config-platform/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/robbedell/security-config-platform)](https://github.com/robbedell/security-config-platform/pulls)
[![Documentation](https://img.shields.io/badge/Documentation-View%20Docs-green)](https://robbedell.github.io/security-config-platform)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **CVE Integration**: Real-time CVE data integration for security configuration validation
- **Multi-Vendor Support**: Configuration generation for multiple security vendors
- **Validation Rules**: Automated validation of security configurations
- **Version Control**: Track and manage configuration changes
- **API Integration**: RESTful API for programmatic access
- **User Management**: Role-based access control and user management
- **Real-time Updates**: WebSocket support for live configuration updates
- **Audit Logging**: Comprehensive audit trail for all changes
- **Compliance Checking**: Automated compliance validation against security standards
- **Configuration Templates**: Pre-built templates for common security configurations
- **Network Zone Management**: Define and manage security zones with different security levels
- **Threat Prevention**: Configure and manage threat prevention features
- **Logging Configuration**: Customize logging settings for different security aspects

## Project Structure

```
security-config-platform/
├── src/                      # Source code
│   ├── frontend/            # Frontend application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/      # Next.js pages
│   │   │   ├── services/   # API services
│   │   │   ├── types/      # TypeScript type definitions
│   │   │   └── utils/      # Utility functions
│   │   └── package.json
│   └── backend/            # Backend application
│       ├── src/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── services/
│       │   └── utils/
│       └── package.json
├── docker/                  # Docker configuration
│   ├── frontend/           # Frontend Dockerfile
│   ├── backend/            # Backend Dockerfile
│   └── docker-compose.yml  # Docker Compose configuration
├── docs/                   # Documentation
│   ├── api/               # API documentation
│   ├── architecture/      # Architecture documentation
│   ├── deployment/       # Deployment guides
│   └── development/      # Development guides
├── .github/              # GitHub configuration
├── .gitignore
├── LICENSE
└── README.md
```

## Project Management

We use GitHub Projects to track the development of this platform. The project board provides:

- Kanban-style task tracking
- Sprint planning and management
- Issue and PR organization
- Milestone tracking
- Automated status updates

Visit our [Project Board](https://github.com/robbedell/security-config-platform/projects/1) to:

- View current development status
- Track upcoming features
- Monitor bug fixes
- Follow project milestones

## Prerequisites

- Node.js 18.x or later
- Docker and Docker Compose
- MongoDB 6.x
- Redis 7.x
- Git
- Make (optional, for using Makefile commands)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/robbedell/security-config-platform.git
   cd security-config-platform
   ```

2. Start the development environment:

   ```bash
   # Using Docker Compose
   docker compose up -d

   # Or using Make (if available)
   make dev-up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs
   - Documentation Site: http://localhost:3000/docs

## Development

### Frontend Development

The frontend is built with Next.js and TypeScript. Key features:

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Query for data fetching
- Zustand for state management
- Jest and React Testing Library for testing

### Backend Development

The backend is built with Express.js and TypeScript. Key features:

- Express.js with TypeScript
- MongoDB with Mongoose
- Redis for caching
- JWT authentication
- Rate limiting
- Request validation
- Swagger documentation

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

### Documentation

The project uses Docsify for documentation. To serve the documentation locally:

```bash
cd docs
docsify serve
```

## Deployment

### Production Deployment

1. Build the applications:

   ```bash
   # Frontend build
   cd src/frontend
   npm run build

   # Backend build
   cd src/backend
   npm run build
   ```

2. Deploy using Docker:

   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

### Environment Variables

Required environment variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/security_config
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# API
API_PORT=3001
API_PREFIX=/api/v1

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- CVE data provided by [NVD](https://nvd.nist.gov/)
- Configuration templates based on vendor documentation
- Security best practices from industry standards
