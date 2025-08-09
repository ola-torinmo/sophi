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

# Use Node.js LTS
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Build the Medusa server and admin
RUN npx medusa build

# Copy environment file into the build folder
COPY .env .medusa/server/.env
COPY .env .medusa/server/.env.production

# Expose Medusa API port
EXPOSE 9000

# Set environment to production
ENV NODE_ENV=production

# Start Medusa from the build folder
WORKDIR /app/.medusa/server
# CMD ["npx", "medusa", "start"]


# # Start Medusa API
CMD ["sh", "-c", "npm run migrate && npx medusa start"]
