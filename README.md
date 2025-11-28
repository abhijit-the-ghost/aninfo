# Aninfo

Aninfo is a modern anime discovery platform built with React, Vite, and Tailwind CSS. It features a lofi pastel aesthetic, smooth animations, and robust data fetching using the Jikan API.

## Features

- **Home**: Trending anime, upcoming hype, and seasonal picks.
- **Browse**: Infinite scroll grid with powerful filters (Status, Type, Sort).
- **Search**: Global search with debounced typeahead suggestions.
- **Detail**: Comprehensive anime details with lazy-loaded tabs for Characters and Episodes.
- **Watchlist**: Save your favorite anime locally (persisted via LocalStorage).
- **Responsive**: Fully responsive design for mobile, tablet, and desktop.
- **Animations**: Smooth page transitions and micro-interactions using Framer Motion.

## Tech Stack

- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Data Fetching**: TanStack Query + Axios (with rate limiting)
- **Routing**: React Router v6
- **State Management**: Zustand (for Watchlist)
- **Icons**: Lucide React

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/abhijit-the-ghost/aninfo.git
    cd aninfo
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## Testing

Run unit tests with Vitest:

```bash
npm test
```

## Project Structure

- `src/api`: API client and Jikan service.
- `src/components`: Reusable UI components.
- `src/pages`: Main page components.
- `src/store`: Zustand stores.
- `src/hooks`: Custom hooks.
- `src/types`: TypeScript definitions.

## Credits

Created by **Abhijit Guragain (Ghost)**.
Powered by [Jikan API](https://jikan.moe/).
