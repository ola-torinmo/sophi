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

FROM node:18-alpine

WORKDIR /app

# Set npm config
RUN npm config set legacy-peer-deps true

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variable to disable admin
ENV DISABLE_ADMIN=true
ENV MEDUSA_DISABLE_ADMIN=true

# Build backend only
RUN npm run build:backend || npm run build

# Expose port
EXPOSE 9000

# Start with admin disabled
CMD ["sh", "-c", "npm run migrate && DISABLE_ADMIN=true npm start"]