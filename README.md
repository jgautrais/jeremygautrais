# jeremygautrais.fr

Personal portfolio website built with [Astro](https://astro.build/) and deployed using Docker.

## Tech Stack

- **Framework**: Astro 5 (static site generation)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Containerization**: Docker with multi-stage builds
- **Production Server**: Nginx
- **Reverse Proxy**: Traefik

## Project Structure

```
.
├── app/                    # Astro application
│   ├── src/                # Source files
│   ├── Dockerfile          # Multi-stage Docker build
│   ├── astro.config.mjs    # Astro configuration
│   └── package.json
├── compose.yml             # Local development stack
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 22+ (for local development without Docker)

### Local Development with Docker

1. Start the development stack:

   ```bash
   docker compose up
   ```

2. Open [http://jeremygautrais.localhost](http://jeremygautrais.localhost) in your browser.
   The Traefik dashboard is at [http://localhost:8080](http://localhost:8080).

The app runs with hot reload enabled — changes to files under `app/` refresh
automatically. To use a different host, set `DOMAIN` in a `.env` file (see
`.env.example`).

### Local Development without Docker

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Available Scripts

Inside the `app/` directory:

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build static site for production |
| `npm run preview` | Preview production build locally |

## Internationalization

The site supports multiple languages:

- French (default): `/fr`
- English: `/en`

## Docker Build Targets

The Dockerfile supports multiple build targets:

- **local**: Development server with hot reload (port 4321)
- **release**: Production build served via Nginx (port 80)
