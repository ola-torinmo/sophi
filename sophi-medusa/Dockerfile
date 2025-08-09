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

# Install bash for proper script execution
RUN apk add --no-cache bash

# Set npm config
RUN npm config set legacy-peer-deps true

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create the .medusa directory structure that Medusa v2 expects
RUN mkdir -p .medusa/server

# Build using the exact Medusa v2 process
RUN npm run build && \
    # Copy build output to the location Medusa expects
    mkdir -p .medusa/server/dist && \
    cp -r dist/* .medusa/server/dist/ 2>/dev/null || true

# If build failed, create minimal structure
RUN if [ ! -f ".medusa/server/dist/admin/index.html" ]; then \
        mkdir -p .medusa/server/dist/admin && \
        echo '<!DOCTYPE html><html><head><title>Medusa Admin</title></head><body><div id="root"></div></body></html>' > .medusa/server/dist/admin/index.html; \
    fi

# Change to the directory Medusa expects for production
WORKDIR /app/.medusa/server

# Copy package.json to the server directory
COPY package*.json ./

# Create start script
RUN echo '#!/bin/bash' > start.sh && \
    echo 'cd /app' >> start.sh && \
    echo 'npm run migrate' >> start.sh && \
    echo 'cd /app/.medusa/server' >> start.sh && \
    echo 'node /app/dist/main.js || medusa start' >> start.sh && \
    chmod +x start.sh

EXPOSE 9000

CMD ["./start.sh"]