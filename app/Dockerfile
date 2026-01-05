# syntax=docker/dockerfile:1

# -------------------------------------------
# Base Node image
# -------------------------------------------
FROM node:22-alpine AS base

WORKDIR /app

# -------------------------------------------
# Install dependencies
# -------------------------------------------
FROM base AS install

COPY package.json package-lock.json* ./
RUN npm ci

# -------------------------------------------
# Local development target
# -------------------------------------------
FROM install AS local

COPY . .

EXPOSE 4321

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# -------------------------------------------
# Build stage - build static assets
# -------------------------------------------
FROM install AS build

COPY . .

RUN npm run build

# -------------------------------------------
# Production release target with nginx
# -------------------------------------------
FROM nginx:alpine AS release

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
