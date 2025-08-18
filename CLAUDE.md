# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal health metrics tracking application built with SvelteKit and PocketBase. It allows tracking user-defined metrics without authentication (single-user design).

## Architecture

- **Frontend**: SvelteKit app in `/app` directory using TypeScript and Bootstrap
- **Backend**: PocketBase embedded database with migrations in `/pb_migrations`
- **Data Models**: 
  - `metric_type`: Defines metric categories (name, color, description, unit)
  - `metric`: Individual metric entries with values, dates, and notes
- **Server Integration**: PocketBase client initialized in `hooks.server.ts` at `http://localhost:5173`

## Development Commands

All commands should be run from the `/app` directory:

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production  
yarn build

# Preview production build
yarn preview

# Type checking
yarn check

# Type checking with watch mode
yarn check:watch

# Format code
yarn format

# Lint code (prettier check)
yarn lint
```

## Key Files

- `/app/src/hooks.server.ts`: PocketBase client initialization
- `/app/src/lib/model/`: TypeScript interfaces for data models
- `/app/src/routes/`: SvelteKit routes and pages
- `/pb_migrations/`: Database schema migrations
- `pocketbase`: PocketBase executable

## Database

PocketBase runs on port 5173 and stores data in `/pb_data`. The schema is managed through migrations with two main collections: `metric_type` and `metric`.