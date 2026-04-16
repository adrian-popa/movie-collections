# Application Architecture

This document describes the architectural decisions and design principles used in the project.

---

# Overview

The application follows a **feature-based Angular architecture combined with NgRx state management**.

The primary goals of this structure are:

- maintainability
- scalability
- separation of concerns
- predictable state management

The codebase is organized into **three main layers**:

```
src/
  app/
    core/
    features/
    shared/
```

---

# Core Layer

The `core` directory contains **application-wide resources** that are shared across multiple features.

Typical responsibilities include:

- domain models
- global services
- application-wide utilities

Example structure:

```
core/
  models/
  services/
```

The core layer should contain logic that is **not tied to a specific feature domain**.

---

# Feature Layer

Business functionality is organized inside the `features` directory.

Each feature represents a **distinct domain area of the application**.

```
features/
  movies/
  collections/
```

Each feature typically contains:

```
components/
store/
```

### Components

Feature components are responsible for:

- rendering UI
- dispatching store actions
- selecting data from the store

Components remain as **thin as possible**, delegating state management to NgRx.

---

### Store (NgRx)

Each feature manages its state using **NgRx**.

The store implementation contains:

```
actions
reducers
selectors
effects
```

#### Actions

Actions describe **events that trigger state changes**.

Examples:

- loading data
- creating collections
- updating application state

---

#### Reducers

Reducers are **pure functions** responsible for updating the state.

They receive:

(previousState, action) => newState

Reducers never contain side effects.

---

#### Selectors

Selectors provide **read access to slices of application state**.

Benefits:

- reusable queries
- performance optimizations via memoization
- separation between state shape and UI usage

---

#### Effects

Effects handle **side effects and asynchronous operations**.

Examples include:

- persistence
- API calls
- external interactions

In this project, effects are used to synchronize the application state with **localStorage**.

---

# Persistence Strategy

User-created collections are persisted using **browser localStorage**.

This is implemented using an NgRx effect that reacts to relevant actions and stores the updated state.

Benefits of this approach:

- persistence across page reloads
- separation of persistence logic from UI components
- reducers remain pure
- easier testing

---

## Environment Configuration & API Keys

The application uses Angular **environment files** to manage configuration such as API keys.

Structure:
```
src/environments/
  environment.ts
  environment.prod.ts
```

### Important Notes

- The TMDB API key is stored in `environment.ts`
- A template environment file is used for repository safety (e.g. `environment.template.ts`)
- **Real API keys are NOT committed to version control**
- Developers must provide their own API key locally

### Example:

```ts
export const environment = {
  production: false,
  tmdbApiKey: 'YOUR_API_KEY_HERE'
};
```

### Production Safety

#### In production builds:
- environment values are replaced via Angular build system
- secrets are never exposed in the Git repository

#### This ensures:
- no accidental exposure of sensitive credentials
- safe onboarding for new developers
- compliance with best practices for frontend applications

## Shared Components

Reusable UI components are placed inside the `shared` directory.

```
shared/  
  components/
```

These components:

- are presentation-focused
- contain minimal business logic
- can be reused across multiple features

This prevents duplication while maintaining clear boundaries between feature domains.

---

# State Flow

The application follows a **unidirectional data flow** typical for NgRx-based applications.

```
Component  
  ↓  
Dispatch Action  
  ↓  
Reducer updates Store  
  ↓  
Selectors read State  
  ↓  
Component receives updated data
```

For asynchronous operations or external interactions:

```
Action  
  ↓  
Effect  
  ↓  
External operation (localStorage, API, etc.)  
  ↓  
Dispatch new Action  
  ↓  
Reducer updates state
```

---

# Testing Strategy

The project uses **Vitest** for running unit tests.

Compared to the traditional Angular stack (Jasmine + Karma), Vitest offers:

- faster execution
- simpler configuration
- better developer experience

Tests cover:

- reducers
- selectors
- component logic
- store interactions

---

# Scalability Considerations

The current architecture allows the application to grow easily by:

- adding new feature modules
- expanding store slices
- introducing additional services in the core layer

Because features are isolated, new domains can be introduced without impacting existing ones.

---

# Summary

Key architectural principles used in this project:

- feature-based project structure
- centralized state management with NgRx
- unidirectional data flow
- clear separation between UI and state logic
- side effects handled through NgRx Effects
- persistence handled outside reducers

This structure promotes maintainability, testability, and long-term scalability.