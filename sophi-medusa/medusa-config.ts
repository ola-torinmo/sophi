// import { defineConfig } from '@medusajs/framework/utils'

// // Manually set environment variables - bypass loadEnv completely
// process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://sophi_postgres_user:zKD2kXmzULxuxm8bji7SVy5SgeVJ45qy@dpg-d2a6kch5pdvs73aeg2s0-a.oregon-postgres.render.com/sophi_postgres?sslmode=require"

// console.log('=== MANUAL DEBUG ===')
// console.log('NODE_ENV:', process.env.NODE_ENV)
// console.log('DATABASE_URL:', process.env.DATABASE_URL)
// console.log('Working directory:', process.cwd())

// // Check for any files that might contain "base"
// const fs = require('fs')
// const path = require('path')

// try {
//   const files = fs.readdirSync(process.cwd())
//   console.log('Files in current directory:', files)
  
//   // Check if there are any database config files
//   files.forEach(file => {
//     if (file.includes('database') || file.includes('config') || file.includes('.env')) {
//       console.log(`Found config file: ${file}`)
//     }
//   })
// } catch (e) {
//   console.log('Could not read directory:', e.message)
// }

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     http: {
//       storeCors: "https://your-frontend.vercel.app",
//       adminCors: "https://your-frontend.vercel.app", 
//       authCors: "https://your-frontend.vercel.app",
//       jwtSecret: "supersecret",
//       cookieSecret: "supersecret",
//     }
//   }
// })


// medusa-config.ts
const { defineConfig } = require('@medusajs/framework/utils')

// Don't use import or loadEnv at all
console.log('=== RENDER CONFIG ONLY ===')
console.log('All ENV vars containing DATABASE:')
Object.keys(process.env).forEach(key => {
  if (key.toLowerCase().includes('database') || key.toLowerCase().includes('db')) {
    console.log(`${key}: ${process.env[key]}`)
  }
})

module.exports = defineConfig({
  projectConfig: {
    // Force the exact database URL
    databaseUrl: "postgresql://sophi_postgres_user:zKD2kXmzULxuxm8bji7SVy5SgeVJ45qy@dpg-d2a6kch5pdvs73aeg2s0-a.oregon-postgres.render.com/sophi_postgres?sslmode=require",
    databaseType: "postgres", // Explicitly set type
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000", 
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})