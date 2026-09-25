# Rick and Morty Dashboard

A dashboard built with **Next.js** and **TypeScript** as a hands-on project to explore modern web development concepts using the Next.js App Router.

The application consumes the **Rick and Morty API** to display characters, view individual character details, and manage favorite characters using Redux Toolkit.

## ✨ Features

- Dashboard navigation using the Next.js App Router
- Rick and Morty character listing
- Infinite scroll for dynamically loading characters
- Dynamic pages with individual character information
- Favorites management with Redux Toolkit
- Favorites persistence using `localStorage`
- Example API Route for client-server communication
- Global state management with Redux
- Image optimization with `next/image`
- Dynamic metadata for character pages
- Responsive UI with Tailwind CSS

## 🛠️ Technologies

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Redux
- Tailwind CSS
- React Icons
- Rick and Morty API

## 🚀 Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📍 Main Routes

- `/dashboard/main` — Main dashboard
- `/dashboard/counter` — State management and API Route example
- `/dashboard/characters` — Character listing with infinite scroll
- `/dashboard/favorites` — Favorite characters
- `/dashboard/characters/[name]` — Individual character details
- `/api/counter` — Example API Route with `GET` and `POST`

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   └── dashboard/
├── characters/
├── components/
├── store/
└── shopping-car/
```

- `app` — Pages, layouts, dynamic routes, and API Routes
- `characters` — Character-related components, interfaces, and data fetching
- `components` — Shared dashboard components and navigation
- `store` — Redux store, slices, and persistence
- `shopping-car` — Components used for the counter exercises

## 📚 What I Practiced

This project was developed as part of my Next.js learning journey and helped me practice:

- Server Components and Client Components
- App Router
- Dynamic Routes
- Data Fetching
- Caching
- Dynamic Metadata
- API Routes
- Infinite Scroll
- Redux Toolkit
- Browser State Persistence
- TypeScript
- Component-based Architecture

## 📜 Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 🔗 API

Character data is provided by the Rick and Morty API.