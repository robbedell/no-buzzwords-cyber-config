# API Documentation

## Overview

The Security Configuration Platform API is a RESTful service that provides endpoints for managing security configurations, CVE data, and user authentication.

## Base URL

- Development: `http://localhost:3001/api/v1`
- Production: `https://api.security-config-platform.com/api/v1`

## Authentication

All API requests require authentication using JWT tokens.

### Authentication Headers

```
Authorization: Bearer <jwt_token>
```

### Obtaining a Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt_token_here",
  "expiresIn": 3600,
  "refreshToken": "refresh_token_here"
}
```

## Endpoints

### Authentication

#### Login

```http
POST /auth/login
```

#### Register

```http
POST /auth/register
```

#### Refresh Token

```http
POST /auth/refresh
```

### CVE Management

#### Get CVE List

```http
GET /cves
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- severity: string (optional)
- vendor: string (optional)
```

#### Get CVE Details

```http
GET /cves/:id
```

#### Search CVEs

```http
GET /cves/search
Query Parameters:
- q: string (search query)
- filters: object (optional)
```

### Configuration Management

#### Get Configurations

```http
GET /configurations
Query Parameters:
- vendor: string (optional)
- status: string (optional)
- page: number (default: 1)
- limit: number (default: 10)
```

#### Create Configuration

```http
POST /configurations
Content-Type: application/json

{
  "vendor": "palo_alto",
  "name": "firewall_config",
  "rules": [...],
  "metadata": {...}
}
```

#### Update Configuration

```http
PUT /configurations/:id
Content-Type: application/json

{
  "rules": [...],
  "metadata": {...}
}
```

#### Validate Configuration

```http
POST /configurations/:id/validate
```

### User Management

#### Get User Profile

```http
GET /users/me
```

#### Update User Profile

```http
PUT /users/me
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Change Password

```http
PUT /users/me/password
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Invalid input data",
  "details": [...]
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- Rate limit: 100 requests per minute per IP
- Rate limit headers:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1623456789
  ```

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Current page number (default: 1)
- `limit`: Items per page (default: 10)

Response format:

```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Versioning

The API is versioned through the URL path:

- Current version: `/api/v1`
- Previous versions: `/api/v0`

## Webhooks

### Configuration Updates

```http
POST /webhooks/configurations
Content-Type: application/json

{
  "event": "configuration.updated",
  "data": {
    "configurationId": "123",
    "timestamp": "2024-03-31T12:00:00Z"
  }
}
```

### CVE Alerts

```http
POST /webhooks/cves
Content-Type: application/json

{
  "event": "cve.detected",
  "data": {
    "cveId": "CVE-2024-1234",
    "severity": "high",
    "timestamp": "2024-03-31T12:00:00Z"
  }
}
```

## Best Practices

1. Always use HTTPS in production
2. Implement proper error handling
3. Use appropriate HTTP methods
4. Follow RESTful conventions
5. Validate all inputs
6. Implement rate limiting
7. Use proper status codes
8. Document all endpoints
9. Version your API
10. Monitor API usage
