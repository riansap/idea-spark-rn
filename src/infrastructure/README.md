# Infrastructure Layer

This layer handles external concerns and provides implementations for interfacing with external services and APIs.

## Structure

### /api

API configurations and implementations

- Network clients
- API endpoints
- Request/Response interceptors

### /services

External service implementations

- Push notifications
- Analytics
- Storage services
- Authentication services

### /device

Device-specific implementations

- Camera access
- Location services
- File system operations
- Permissions handling

### /config

Application configuration

- Environment variables
- API configurations
- Feature flags
- Constants

## Guidelines

1. Implements interfaces defined in the domain layer
2. Handles all external service integrations
3. Manages device-specific features
4. Provides configuration management
5. Handles external service errors and retries
