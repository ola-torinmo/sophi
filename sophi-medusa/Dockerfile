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

# Build backend only
RUN npm run build:backend || npm run build

# Start with custom start command that skips admin
CMD ["sh", "-c", "npm run migrate && npx medusa start"]

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

# # Build the application
# RUN npm run build

# # Expose port
# EXPOSE 9000

# # Override the start command to run without admin checks
# CMD ["sh", "-c", "npm run migrate && node dist/main.js"]