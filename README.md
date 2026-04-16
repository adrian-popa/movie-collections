# Movie Collections App

## Overview

This project is a small Angular application that allows users to browse
movies and organize them into custom collections.

The application demonstrates a modern Angular architecture using
**feature-based project structure** and **NgRx for state management**.\
Collections are persisted locally using **browser localStorage** to
preserve user data across sessions.

The goal of this project is to showcase clean architecture, predictable
state management, and maintainable code structure.

------------------------------------------------------------------------

## Tech Stack

-   Angular
-   TypeScript
-   NgRx (Store, Actions, Reducers, Selectors, Effects)
-   Vitest (Unit Testing)
-   Vite tooling

------------------------------------------------------------------------

## Project Structure

    src/
      app/
        core/
          models/
          services/
        features/
          movies/
            components/
            store/
          collections/
            components/
            store/
        shared/
          components/

### Core

Contains shared application-level resources such as models and services.

### Features

Business domains are organized into independent feature folders.

-   **Movies** -- handles movie-related UI and state
-   **Collections** -- manages user-defined movie collections

Each feature contains:

-   UI components
-   NgRx store implementation

### Shared

Reusable UI components used across multiple features.

------------------------------------------------------------------------

## State Management

The application uses **NgRx** for predictable state management.

Each feature contains:

-   **Actions** -- describe events that change state
-   **Reducers** -- pure functions updating the state
-   **Selectors** -- access slices of state
-   **Effects** -- handle side effects such as persistence

### Persistence

User-created collections are persisted via **localStorage** using an
NgRx Effect.

This ensures:

-   persistence across page reloads
-   reducers remain pure
-   UI logic stays separated from storage logic

------------------------------------------------------------------------

## Testing

Unit tests are executed using **Vitest**.

Vitest was chosen instead of Jasmine/Karma due to:

-   faster execution
-   simpler configuration
-   modern tooling compatibility

Tests focus on:

-   reducers
-   selectors
-   component behavior
-   store interactions

------------------------------------------------------------------------

## Running the Project

Install dependencies:

    npm install

Run the development server:

    npm run start

Run tests:

    npm run test

Check coverage:

    npm run coverage

------------------------------------------------------------------------

## Additional Documentation

Additional design notes are available in:

-   `ARCHITECTURE.md` -- architectural decisions and structure
-   `AI_NOTES.md` -- explanation of AI tool usage during development

------------------------------------------------------------------------

## Author

Adrian
