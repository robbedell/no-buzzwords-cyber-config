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

## Project Structure

```
security-config-platform/
├── config/                    # Configuration files
│   ├── development/          # Development environment configs
│   └── production/           # Production environment configs
├── docker/                   # Docker-related files
│   ├── backend/             # Backend Docker configuration
│   ├── frontend/            # Frontend Docker configuration
│   └── docker-compose.yml   # Main Docker Compose file
├── docs/                     # Documentation
│   ├── architecture/        # Architecture documentation
│   │   ├── README.md       # Architecture overview
│   │   ├── frontend.md     # Frontend architecture
│   │   ├── backend.md      # Backend architecture
│   │   └── security.md     # Security architecture
│   ├── api/                # API documentation
│   │   ├── README.md      # API overview
│   │   └── endpoints.md   # API endpoints
│   └── development/       # Development guides
│       ├── README.md     # Development overview
│       ├── setup.md      # Setup guide
│       └── guidelines.md # Development guidelines
├── src/                      # Source code
│   ├── backend/            # Backend application
│   │   ├── package.json
│   │   └── src/
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── routes/
│   │       ├── services/
│   │       └── utils/
│   └── frontend/           # Frontend application
│       ├── package.json
│       └── src/
│           ├── components/
│           ├── pages/
│           ├── styles/
│           └── utils/
├── .github/                 # GitHub configuration
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   ├── projects/           # Project board configuration
│   ├── workflows/          # GitHub Actions workflows
│   └── PULL_REQUEST_TEMPLATE.md
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
- PostgreSQL 15.x
- Redis 7.x
- Git
- Make (optional, for using Makefile commands)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/robbedell/security-config-platform.git
   cd security-config-platform
   ```

2. Set up environment variables:

   ```bash
   # Copy example environment files
   cp config/development/.env.example config/development/.env
   cp config/production/.env.example config/production/.env
   ```

3. Start the development environment:

   ```bash
   # Using Docker Compose
   cd docker
   docker-compose up -d

   # Or using Make (if available)
   make dev-up
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs
   - Documentation Site: http://localhost:3000/docs

## Development

### Frontend Development

The frontend is built with Next.js and TypeScript. To start development:

```bash
cd src/frontend
npm install
npm run dev
```

Key frontend features:

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Query for data fetching
- Zustand for state management
- Jest and React Testing Library for testing

### Backend Development

The backend is built with Express.js and TypeScript. To start development:

```bash
cd src/backend
npm install
npm run dev
```

Key backend features:

- Express.js with TypeScript
- PostgreSQL with TypeORM
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
   cd docker
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment Variables

Required environment variables:

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the [TypeScript Style Guide](docs/development/guidelines.md#typescript)
- Write tests for new features
- Update documentation as needed
- Follow the Git commit message convention
- Ensure all CI checks pass

### Code Review Process

1. Automated checks:

   - Linting
   - Type checking
   - Unit tests
   - Integration tests
   - Security scanning

2. Manual review:
   - Code quality
   - Architecture alignment
   - Security considerations
   - Performance impact
   - Documentation updates

## Security

- All API endpoints require authentication
- Rate limiting is enforced
- Input validation on all endpoints
- Regular security audits
- Dependency vulnerability scanning
- Secure configuration management

## Support

- [Documentation](https://robbedell.github.io/security-config-platform)
- [Issue Tracker](https://github.com/robbedell/security-config-platform/issues)
- [Discussions](https://github.com/robbedell/security-config-platform/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- CVE data provided by [NVD](https://nvd.nist.gov/)
- Configuration templates based on vendor documentation
- Security best practices from industry standards
