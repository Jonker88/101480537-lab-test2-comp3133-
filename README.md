# 101480537-lab-test2-comp3133

Harry Potter themed Angular application for COMP3133 Lab Test 2b.  
This app consumes the public HP API and provides a cinematic character browser with filtering and a character details page.

## GitHub Repository

- [https://github.com/Jonker88/101480537-lab-test2-comp3133-.git](https://github.com/Jonker88/101480537-lab-test2-comp3133-.git)

## Features Implemented

- Angular latest (module-based app)
- `HttpClientModule`, `FormsModule`, and `ReactiveFormsModule`
- Service layer: `HarryPotterApiService`
- TypeScript interfaces/models for API data (`Character`, `Wand`)
- Required components:
  - `characterlist`
  - `characterfilter`
  - `characterdetails`
- House filter and search functionality
- Character details via route parameter (`/character/:id`)
- Angular control flow features (`@for`, `@if`)
- Signal-based state where applicable
- Angular Material + custom cinematic UI styling

## API Endpoints Used

- `https://hp-api.onrender.com/api/characters`
- `https://hp-api.onrender.com/api/characters/house/:house`
- `https://hp-api.onrender.com/api/character/:id`

## Screenshots

### 1) Character List + House Filter Page

Shows the main explorer view with house filter chips, search, and character cards.

![Character List Page](image.png)

### 2) Character Details Page

Shows detailed information for a selected character including species, house, wizard status, ancestry, wand, actor, and image.

![Character Details Page](image.png)

## Run Locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Build

```bash
npm run build
```

## Submission Checklist

- Source code ZIP uploaded to D2L
- GitHub repository link added in D2L comments
- Screenshots of both pages uploaded
- Hosting link provided (Vercel/Render/Railway/etc.)