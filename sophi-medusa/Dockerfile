FROM node:18-alpine

WORKDIR /app

RUN npm config set legacy-peer-deps true

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Create the admin directory structure that Medusa expects
RUN mkdir -p dist/admin dist/uploads && \
    echo '<!DOCTYPE html><html><body><h1>API Only</h1></body></html>' > dist/admin/index.html

EXPOSE 9000

CMD ["sh", "-c", "npm run migrate && npm start"]