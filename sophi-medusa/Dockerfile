# FROM node:18-alpine

# WORKDIR /app

# # Set npm config
# RUN npm config set legacy-peer-deps true

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install --legacy-peer-deps

# # Copy source code
# COPY . .

# # Build backend only
# RUN npm run build:backend || npm run build

# # Start with custom start command that skips admin
# CMD ["sh", "-c", "npm run migrate && npx medusa start --no-admin"]

# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run medusa
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 medusa

# Copy the built application
COPY --from=builder --chown=medusa:nodejs /app/.medusa/server ./dist
COPY --from=builder --chown=medusa:nodejs /app/package*.json ./
COPY --from=deps --chown=medusa:nodejs /app/node_modules ./node_modules

# Copy any other necessary files
COPY --from=builder --chown=medusa:nodejs /app/medusa-config.js ./
COPY --from=builder --chown=medusa:nodejs /app/uploads ./uploads

USER medusa

EXPOSE 9000

ENV PORT 9000
ENV NODE_ENV production

# Start the application using medusa start
CMD ["medusa", "start"]