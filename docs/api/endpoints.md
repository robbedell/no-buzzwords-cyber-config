# API Endpoints

## Overview

The Security Configuration Platform API provides a comprehensive set of endpoints for managing security configurations and CVE data.

```mermaid
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Authentication]
    C --> D[Rate Limiter]
    D --> E[Router]
    E --> F[Controllers]
    F --> G[Services]
    G --> H[(Database)]
    G --> I[(Redis Cache)]
    G --> J[CVE API]
```

## Authentication

All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Redis

    Client->>API: Request
    API->>Redis: Check Rate Limit
    Redis-->>API: Current Count
    alt Within Limit
        API-->>Client: 200 OK
    else Exceeded Limit
        API-->>Client: 429 Too Many Requests
    end
```

## Endpoints

### Get CVE List

Retrieves a list of CVEs with optional filtering.

```api-playground
/api/v1/cves
GET
{
  "severity": "HIGH",
  "vendor": "cisco",
  "limit": 10,
  "offset": 0
}
```

### Create Configuration

Creates a new security configuration.

```api-playground
/api/v1/configurations
POST
{
  "name": "Cisco IOS Security Config",
  "vendor": "cisco",
  "rules": [
    {
      "type": "access_control",
      "action": "deny",
      "source": "any",
      "destination": "any",
      "protocol": "tcp",
      "port": 23
    }
  ],
  "metadata": {
    "description": "Basic security configuration for Cisco IOS",
    "version": "1.0.0"
  }
}
```

### Validate Configuration

Validates a security configuration against CVE data.

```mermaid
graph LR
    A[Config] --> B[Parser]
    B --> C[Validator]
    C --> D[CVE Check]
    D --> E[Rule Check]
    E --> F[Result]
```

```api-playground
/api/v1/configurations/validate
POST
{
  "configuration": {
    "vendor": "cisco",
    "rules": [
      {
        "type": "access_control",
        "action": "deny",
        "source": "any",
        "destination": "any",
        "protocol": "tcp",
        "port": 23
      }
    ]
  },
  "options": {
    "check_cves": true,
    "check_rules": true,
    "check_compliance": true
  }
}
```

## Error Responses

The API uses standard HTTP status codes and provides detailed error messages.

```mermaid
graph TD
    A[Error] --> B{Type}
    B -->|Validation| C[400 Bad Request]
    B -->|Authentication| D[401 Unauthorized]
    B -->|Authorization| E[403 Forbidden]
    B -->|Not Found| F[404 Not Found]
    B -->|Server| G[500 Internal Server Error]
```

Example error response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid configuration format",
    "details": [
      {
        "field": "rules",
        "message": "At least one rule is required"
      }
    ]
  }
}
```

## Webhooks

The API supports webhooks for configuration updates and CVE alerts.

```mermaid
sequenceDiagram
    participant API
    participant Webhook

    API->>Webhook: POST /webhook
    Note over Webhook: Process Event
    Webhook-->>API: 200 OK
    Note over API: Event Processed
```

## Best Practices

1. Always include proper error handling
2. Use appropriate HTTP methods
3. Follow RESTful conventions
4. Implement rate limiting
5. Use proper authentication
6. Validate input data
7. Cache responses when appropriate
8. Monitor API usage
