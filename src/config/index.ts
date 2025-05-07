

export const config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL!,
    availableDomains: process.env.AVAILABLE_DOMAINS?.split(",") || [],
    redisUrl: process.env.REDIS_URL
};