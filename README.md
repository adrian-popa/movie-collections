# Movie Collections Manager

A movie discovery and collection management app built with Angular 21 and NgRx.

## Prerequisites

- Node.js 22+ (LTS recommended)
- npm 10+
- Angular CLI 21: `npm install -g @angular/cli@21`

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure your TMDB API key:
```bash
cp src/environments/environment.template.ts src/environments/environment.ts
```
   Then open `src/environments/environment.ts` and replace 
   `YOUR_TMDB_API_KEY_HERE` with your key from 
   https://www.themoviedb.org/settings/api

## Run

```bash
ng serve
```
Navigate to `http://localhost:4200`

## Build

```bash
ng build
```

## Tests

```bash
ng test
```

For coverage report:
```bash
ng test --coverage
```

## API Key Note

`environment.ts` is included in this repo for reviewer 
convenience. In production, API keys are injected via 
CI/CD pipeline secret store and never committed to source 
control. See `environment.template.ts` for the pattern.