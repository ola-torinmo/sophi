FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application AND admin
RUN npm run build

# Create admin build directory if it doesn't exist and add a dummy index.html
RUN mkdir -p .medusa/admin/build && echo '<!DOCTYPE html><html><head><title>Admin Disabled</title></head><body><h1>Admin is disabled in production</h1></body></html>' > .medusa/admin/build/index.html

# Expose port
EXPOSE 9000

# Start the application
CMD ["npm", "start"]

# Start with custom start command that skips admin
# CMD ["sh", "-c", "npm run migrate && npx medusa start"]

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