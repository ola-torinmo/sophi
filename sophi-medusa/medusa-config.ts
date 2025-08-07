import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('REDIS_URL:', process.env.REDIS_URL)

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    // Only add Redis if URL exists
    ...(process.env.REDIS_URL && { redisUrl: process.env.REDIS_URL }),
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000", 
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})