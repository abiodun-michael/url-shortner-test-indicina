# URL Shortener Backend Service

This backend service is carefully crafted, architected, and engineered using **NestJS**, **Redis**, **MongoDB**, and **Cron Jobs**.

## 🧩 Modules

### 1. Redis Module

* Handles interactions with the Redis instance.
* Utilizes pipelining for bulk operations to ensure **speed**, **atomicity**, and **reliability**.

### 2. Shortener Module

* Responsible for all core operations including:

  * **CRUD operations**
  * **Encoding/decoding logic**
  * **Statistics collection**
  * **QR code generation**

## 🔐 Device Identification

* Uses **cookies** to identify devices.
* Allows users to generate and manage short links **without creating an account**.

## 📊 Statistics Sync

* A **cron job** runs every 30 minutes.
* It syncs usage statistics from Redis to MongoDB.

## 🔧 Environment Variables

```env
MONGO_URL=
AVAILABLE_DOMAINS=
REDIS_URL=
```

## 📘 API Documentation

Access the Swagger UI:

```
http://localhost:3000/docs
```

## 🚀 Running the Service

### Development

```bash
yarn dev
```

### Production

```bash
yarn start:prod
```