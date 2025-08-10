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


// const { defineConfig } = require('@medusajs/framework/utils')

// // Don't use loadEnv - rely on Railway environment variables
// console.log('DATABASE_URL set:', !!process.env.DATABASE_URL)
// console.log('REDIS_URL set:', !!process.env.REDIS_URL)

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     redisUrl: process.env.REDIS_URL,
//     http: {
//       storeCors: process.env.STORE_CORS || "http://localhost:8000",
//       adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
//       authCors: process.env.AUTH_CORS || "http://localhost:9000",
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//     }
//   }
// })

// original
// import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     http: {
//       storeCors: process.env.STORE_CORS!,
//       adminCors: process.env.ADMIN_CORS!,
//       authCors: process.env.AUTH_CORS!,
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//     }
//   }
// })


import { defineConfig, Modules } from "@medusajs/framework/utils"

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/cache-inmemory",
      options: {
        ttl: 30
      }
    },
    {
      resolve: "@medusajs/medusa/event-bus-local"
    },
    // Add admin back - Medusa v2 requires it
    {
      resolve: "@medusajs/admin",
      options: {
        autoRebuild: false // Don't auto rebuild in production
      }
    }
  ]
})

    // Option 2: With Redis (uncomment if you add Redis service)
    // {
    //   resolve: "@medusajs/medusa/cache-redis",
    //   options: {
    //     redisUrl: process.env.REDIS_URL,
    //     ttl: 30
    //   }
    // },
    // {
    //   resolve: "@medusajs/medusa/event-bus-redis",
    //   options: {
    //     redisUrl: process.env.REDIS_URL
//   }
// }