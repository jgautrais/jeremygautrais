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
├── containers/             # Docker Compose configurations
│   ├── app.yml             # Base app service
│   ├── orchestrator.yml    # Traefik orchestrator
│   ├── local/              # Local development overrides
│   └── production/         # Production overrides
└── docker-compose.yml      # Main compose file
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 22+ (for local development without Docker)

### Local Development with Docker

1. Create a `.env` file with required variables:
   ```bash
   PORTFOLIO_PATH=./
   ENV=local
   DOMAIN=localhost
   ```

2. Start the development server:
   ```bash
   docker compose up
   ```

3. Open [http://portfolio.localhost](http://portfolio.localhost) in your browser.

The app runs with hot reload enabled - changes to source files will automatically refresh.

### Local Development without Docker

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Available Scripts

Inside the `app/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static site for production |
| `npm run preview` | Preview production build locally |

## Internationalization

The site supports multiple languages:
- French (default): `/fr`
- English: `/en`

## Docker Build Targets

The Dockerfile supports multiple build targets:

- **local**: Development server with hot reload (port 4321)
- **release**: Production build served via Nginx (port 80)

## Production Deployment

Production uses:
- Pre-built Docker image from registry
- Nginx to serve static files
- Traefik as reverse proxy with automatic SSL via Cloudflare
