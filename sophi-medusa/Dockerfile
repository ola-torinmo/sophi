FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Set npm config for Railway
RUN npm config set legacy-peer-deps true && \
    npm config set fund false && \
    npm config set audit false

# Install dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY package*.json ./

# Install all dependencies
RUN npm config set legacy-peer-deps true && \
    npm ci --legacy-peer-deps

COPY . .

# Build the application
ENV NODE_ENV=production
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 medusa

# Copy built application
COPY --from=deps --chown=medusa:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=medusa:nodejs /app/dist ./dist
COPY --from=builder --chown=medusa:nodejs /app/package*.json ./
COPY --from=builder --chown=medusa:nodejs /app/medusa-config.js ./

USER medusa

EXPOSE 9000

CMD ["npm", "start"]