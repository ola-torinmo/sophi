import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import path from 'path'

// Only load .env from backend directory, not root
if (process.env.NODE_ENV !== 'production') {
  loadEnv(process.env.NODE_ENV || 'development', __dirname) // Use __dirname instead of process.cwd()
}

console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('NODE_ENV:', process.env.NODE_ENV)

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000", 
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})