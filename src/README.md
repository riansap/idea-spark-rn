# Clean Architecture Structure

This project follows Clean Architecture principles with the following structure:

## Core Layers

### 1. Presentation Layer (`/presentation`)

- UI Components
- Screens
- Navigation
- State Management
- View Models

### 2. Domain Layer (`/domain`)

- Entities
- Use Cases
- Repository Interfaces
- Business Rules

### 3. Data Layer (`/data`)

- Repository Implementations
- Data Sources
- API Services
- Local Storage

### 4. Infrastructure Layer (`/infrastructure`)

- External Services
- Device APIs
- Third-party Integrations
- Configuration

## Additional Directories

### Common (`/common`)

- Shared Utilities
- Constants
- Types
- Helpers

### Assets (`/assets`)

- Images
- Fonts
- Styles

## Dependencies Flow

Presentation → Domain ← Data → Infrastructure

The dependencies point inward, with the Domain layer at the center having no dependencies on other layers.
