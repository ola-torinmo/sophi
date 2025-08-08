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

# Build backend
RUN npm run build

# Create startup script
RUN echo '#!/bin/sh' > start.sh && \
    echo 'mkdir -p dist/admin' >> start.sh && \
    echo 'if [ ! -f dist/admin/index.html ]; then' >> start.sh && \
    echo '  echo "<!DOCTYPE html><html><head><title>Admin Disabled</title></head><body><h1>Admin Panel Disabled</h1></body></html>" > dist/admin/index.html' >> start.sh && \
    echo 'fi' >> start.sh && \
    echo 'npm run migrate' >> start.sh && \
    echo 'npm start' >> start.sh && \
    chmod +x start.sh

# Expose port
EXPOSE 9000

# Use the startup script
CMD ["./start.sh"]