# Domain Layer

This layer contains the core business logic and rules of the application.

## Structure

### /entities

Core business objects and data structures

- User
- Post
- Comment
- etc.

### /useCases

Business logic and application-specific rules

- Authentication
- Post Management
- User Management
- etc.

### /repositories

Interfaces defining data operations

- IUserRepository
- IPostRepository
- IAuthRepository
- etc.

### /valueObjects

Immutable objects representing domain concepts

### /errors

Domain-specific error definitions

## Guidelines

1. This layer should be independent of any external frameworks
2. No dependencies on UI or data layers
3. Contains pure business logic
4. Uses interfaces for external dependencies
5. All entities and use cases should be thoroughly tested
