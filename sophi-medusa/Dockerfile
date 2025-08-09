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

# Force build with admin - this is the key part
RUN MEDUSA_ADMIN_BUILD_DIR=/app/dist/admin npm run build || true

# If the above failed, build manually
RUN npx medusa build --admin-only || true

# If still no admin, create the complete structure Medusa expects
RUN mkdir -p dist/admin/assets

# Create index.html in a single line
RUN echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"><h1>Admin Panel Disabled</h1><p>API only deployment</p></div></body></html>' > dist/admin/index.html

# Create the manifest file that Medusa looks for
RUN echo '{"name": "medusa-admin", "version": "1.0.0", "main": "index.html"}' > dist/admin/manifest.json

# Verify files were created
RUN ls -la dist/admin/

# Expose port
EXPOSE 9000

# Start command
CMD ["sh", "-c", "npm run migrate && npm start"]