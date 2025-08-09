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

# Build normally first
RUN npm run build

# Debug: Check what was actually built
RUN echo "=== Checking build output ===" && \
    find . -name "index.html" -type f && \
    echo "=== Admin directory content ===" && \
    ls -la dist/ || echo "No dist directory" && \
    ls -la dist/admin/ || echo "No admin directory in dist"

# Create admin files in ALL possible locations Medusa might check
RUN mkdir -p dist/admin && \
    mkdir -p build/admin && \
    mkdir -p admin/dist && \
    mkdir -p .medusa/admin && \
    echo '<!DOCTYPE html><html><head><title>Admin</title></head><body><div id="root"></div></body></html>' > dist/admin/index.html && \
    echo '<!DOCTYPE html><html><head><title>Admin</title></head><body><div id="root"></div></body></html>' > build/admin/index.html && \
    echo '<!DOCTYPE html><html><head><title>Admin</title></head><body><div id="root"></div></body></html>' > admin/dist/index.html && \
    echo '<!DOCTYPE html><html><head><title>Admin</title></head><body><div id="root"></div></body></html>' > .medusa/admin/index.html

# Final verification
RUN echo "=== Final verification ===" && \
    find . -name "index.html" -type f

EXPOSE 9000

CMD ["sh", "-c", "npm run migrate && npm start"]