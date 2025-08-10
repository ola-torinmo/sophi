#!/bin/bash

# Exit on any error
set -e

echo "Starting Medusa application..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "Error: dist directory not found. Make sure the build completed successfully."
    exit 1
fi

# Check if main.js exists
if [ ! -f "dist/main.js" ]; then
    echo "Error: dist/main.js not found. Build may have failed."
    exit 1
fi

# Run migrations if needed (optional - you might want to do this in a separate Railway service)
# npx medusa migrations run

# Optional: Check for pending migrations (but don't run them automatically)
echo "Checking migration status..."
if npx medusa migrations show 2>/dev/null | grep -q "pending"; then
    echo "⚠️  Warning: There are pending migrations. Run 'railway run npm run migrations:run' to apply them."
fi

echo "Starting the server..."
exec node dist/main.js