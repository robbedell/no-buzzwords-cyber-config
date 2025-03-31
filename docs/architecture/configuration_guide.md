# Configuration Guide

## Overview

This guide provides detailed information about configuring the Security Configuration Platform for different environments and use cases.

## Environment Configuration

### Development Environment

1. **Environment Variables**

   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration
   DATABASE_URL=postgresql://user:password@localhost:5432/security_config

   # Redis Configuration
   REDIS_URL=redis://localhost:6379

   # JWT Configuration
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=1h

   # CVE API Configuration
   CVE_API_URL=https://services.nvd.nist.gov/rest/json/cves/2.0
   CVE_API_KEY=your-api-key

   # Frontend Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_CVE_API_URL=http://localhost:3002
   ```

2. **Database Setup**

   ```sql
   -- Create database
   CREATE DATABASE security_config;

   -- Create user
   CREATE USER user WITH PASSWORD 'password';

   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE security_config TO user;
   ```

3. **Redis Setup**

   ```bash
   # Start Redis server
   redis-server

   # Test connection
   redis-cli ping
   ```

### Production Environment

1. **Environment Variables**

   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=production

   # Database Configuration
   DATABASE_URL=postgresql://user:password@db:5432/security_config

   # Redis Configuration
   REDIS_URL=redis://redis:6379

   # JWT Configuration
   JWT_SECRET=your-secure-secret-key
   JWT_EXPIRES_IN=24h

   # CVE API Configuration
   CVE_API_URL=https://services.nvd.nist.gov/rest/json/cves/2.0
   CVE_API_KEY=your-production-api-key

   # Frontend Configuration
   NEXT_PUBLIC_API_URL=https://api.security-config-platform.com
   NEXT_PUBLIC_CVE_API_URL=https://cve.security-config-platform.com
   ```

2. **Security Configuration**

   ```env
   # Rate Limiting
   RATE_LIMIT_WINDOW=15m
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS Configuration
   CORS_ORIGIN=https://security-config-platform.com

   # SSL Configuration
   SSL_KEY_PATH=/path/to/private.key
   SSL_CERT_PATH=/path/to/certificate.crt
   ```

## Docker Configuration

### Development

1. **docker-compose.yml**

   ```yaml
   version: "3.8"

   services:
     frontend:
       build:
         context: ../src/frontend
         dockerfile: ../../docker/frontend/Dockerfile
       ports:
         - "3000:3000"
       volumes:
         - ../src/frontend:/app
         - /app/node_modules
       environment:
         - NEXT_PUBLIC_API_URL=http://localhost:3001
         - NEXT_PUBLIC_CVE_API_URL=http://localhost:3002

     backend:
       build:
         context: ../src/backend
         dockerfile: ../../docker/backend/Dockerfile
       ports:
         - "3001:3001"
       volumes:
         - ../src/backend:/app
         - /app/node_modules
       environment:
         - PORT=3001
         - DATABASE_URL=postgresql://user:password@db:5432/security_config
         - REDIS_URL=redis://redis:6379
         - JWT_SECRET=your-secret-key
         - NODE_ENV=development

     db:
       image: postgres:15
       ports:
         - "5432:5432"
       environment:
         - POSTGRES_USER=user
         - POSTGRES_PASSWORD=password
         - POSTGRES_DB=security_config
       volumes:
         - postgres_data:/var/lib/postgresql/data

     redis:
       image: redis:7
       ports:
         - "6379:6379"
       volumes:
         - redis_data:/data
   ```

### Production

1. **docker-compose.prod.yml**

   ```yaml
   version: "3.8"

   services:
     frontend:
       build:
         context: ../src/frontend
         dockerfile: ../../docker/frontend/Dockerfile.prod
       ports:
         - "80:80"
       environment:
         - NEXT_PUBLIC_API_URL=https://api.security-config-platform.com
         - NEXT_PUBLIC_CVE_API_URL=https://cve.security-config-platform.com

     backend:
       build:
         context: ../src/backend
         dockerfile: ../../docker/backend/Dockerfile.prod
       ports:
         - "443:443"
       environment:
         - PORT=443
         - DATABASE_URL=postgresql://user:password@db:5432/security_config
         - REDIS_URL=redis://redis:6379
         - JWT_SECRET=your-secure-secret-key
         - NODE_ENV=production

     db:
       image: postgres:15
       environment:
         - POSTGRES_USER=user
         - POSTGRES_PASSWORD=secure-password
         - POSTGRES_DB=security_config
       volumes:
         - postgres_data:/var/lib/postgresql/data

     redis:
       image: redis:7
       volumes:
         - redis_data:/data
   ```

## Database Configuration

### Schema Setup

1. **Users Table**

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     name VARCHAR(255),
     role VARCHAR(50) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Configurations Table**

   ```sql
   CREATE TABLE configurations (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     vendor VARCHAR(100) NOT NULL,
     rules JSONB NOT NULL,
     metadata JSONB,
     created_by INTEGER REFERENCES users(id),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **CVE Data Table**
   ```sql
   CREATE TABLE cve_data (
     id SERIAL PRIMARY KEY,
     cve_id VARCHAR(50) UNIQUE NOT NULL,
     description TEXT,
     severity VARCHAR(50),
     published_date TIMESTAMP,
     last_modified_date TIMESTAMP,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Redis Configuration

### Cache Settings

1. **CVE Cache**

   ```javascript
   {
     key: 'cve:{id}',
     ttl: 3600, // 1 hour
     maxSize: '1gb'
   }
   ```

2. **Configuration Cache**

   ```javascript
   {
     key: 'config:{id}',
     ttl: 1800, // 30 minutes
     maxSize: '2gb'
   }
   ```

3. **User Session Cache**
   ```javascript
   {
     key: 'session:{token}',
     ttl: 86400, // 24 hours
     maxSize: '500mb'
   }
   ```

## Monitoring Configuration

### Logging

1. **Application Logs**

   ```javascript
   {
     level: 'info',
     format: 'json',
     destination: 'logs/app.log',
     maxSize: '100m',
     maxFiles: '10'
   }
   ```

2. **Access Logs**
   ```javascript
   {
     format: 'combined',
     destination: 'logs/access.log',
     maxSize: '100m',
     maxFiles: '10'
   }
   ```

### Metrics

1. **Prometheus Configuration**

   ```yaml
   global:
     scrape_interval: 15s
     evaluation_interval: 15s

   scrape_configs:
     - job_name: "security-config-platform"
       static_configs:
         - targets: ["localhost:3001"]
   ```

2. **Grafana Dashboard**
   ```json
   {
     "dashboard": {
       "id": null,
       "title": "Security Config Platform",
       "tags": ["security", "monitoring"],
       "panels": [
         {
           "title": "API Requests",
           "type": "graph",
           "datasource": "Prometheus",
           "targets": [
             {
               "expr": "rate(http_requests_total[5m])"
             }
           ]
         }
       ]
     }
   }
   ```

## Backup Configuration

### Database Backup

1. **Backup Schedule**

   ```bash
   # Daily backup
   0 0 * * * pg_dump -U user security_config > /backups/daily/backup_$(date +%Y%m%d).sql

   # Weekly backup
   0 0 * * 0 pg_dump -U user security_config > /backups/weekly/backup_$(date +%Y%m%d).sql
   ```

2. **Backup Retention**

   ```bash
   # Keep daily backups for 7 days
   find /backups/daily -type f -mtime +7 -delete

   # Keep weekly backups for 30 days
   find /backups/weekly -type f -mtime +30 -delete
   ```

### Configuration Backup

1. **Backup Schedule**

   ```bash
   # Daily configuration backup
   0 1 * * * tar -czf /backups/config/config_$(date +%Y%m%d).tar.gz /etc/security-config-platform/
   ```

2. **Backup Verification**
   ```bash
   # Verify backup integrity
   tar -tzf /backups/config/config_$(date +%Y%m%d).tar.gz
   ```
