.PHONY: dev-up dev-down test lint type-check build clean docs install

# Development environment
dev-up:
	@echo "Starting development environment..."
	cd docker && docker-compose up -d
	@echo "Development environment is ready!"

dev-down:
	@echo "Stopping development environment..."
	cd docker && docker-compose down
	@echo "Development environment stopped."

# Testing
test:
	@echo "Running tests..."
	cd src/frontend && npm test
	cd src/backend && npm test
	@echo "Tests completed."

# Linting
lint:
	@echo "Running linters..."
	cd src/frontend && npm run lint
	cd src/backend && npm run lint
	@echo "Linting completed."

# Type checking
type-check:
	@echo "Running type checks..."
	cd src/frontend && npm run type-check
	cd src/backend && npm run type-check
	@echo "Type checking completed."

# Building
build:
	@echo "Building applications..."
	cd src/frontend && npm run build
	cd src/backend && npm run build
	@echo "Build completed."

# Documentation
docs:
	@echo "Generating documentation..."
	cd docs && docsify serve
	@echo "Documentation is available at http://localhost:3000"

# Installation
install:
	@echo "Installing dependencies..."
	cd src/frontend && npm install
	cd src/backend && npm install
	@echo "Dependencies installed."

# Cleaning
clean:
	@echo "Cleaning development environment..."
	rm -rf src/frontend/node_modules
	rm -rf src/backend/node_modules
	rm -rf src/frontend/.next
	rm -rf src/backend/dist
	@echo "Clean completed."

# Database
db-create:
	@echo "Creating database..."
	docker exec -it postgres psql -U postgres -c "CREATE DATABASE security_config;"
	@echo "Database created."

db-migrate:
	@echo "Running database migrations..."
	cd src/backend && npm run migration:run
	@echo "Migrations completed."

db-seed:
	@echo "Seeding database..."
	cd src/backend && npm run seed
	@echo "Database seeded."

# Docker
docker-build:
	@echo "Building Docker images..."
	cd docker && docker-compose build
	@echo "Docker images built."

docker-clean:
	@echo "Cleaning Docker resources..."
	docker-compose down -v
	docker system prune -f
	@echo "Docker resources cleaned."

# Security
security-check:
	@echo "Running security checks..."
	cd src/frontend && npm audit
	cd src/backend && npm audit
	@echo "Security checks completed."

# Help
help:
	@echo "Available commands:"
	@echo "  dev-up        - Start development environment"
	@echo "  dev-down      - Stop development environment"
	@echo "  test          - Run tests"
	@echo "  lint          - Run linters"
	@echo "  type-check    - Run type checks"
	@echo "  build         - Build applications"
	@echo "  docs          - Generate documentation"
	@echo "  install       - Install dependencies"
	@echo "  clean         - Clean development environment"
	@echo "  db-create     - Create database"
	@echo "  db-migrate    - Run database migrations"
	@echo "  db-seed       - Seed database"
	@echo "  docker-build  - Build Docker images"
	@echo "  docker-clean  - Clean Docker resources"
	@echo "  security-check - Run security checks"
	@echo "  help          - Show this help message"
