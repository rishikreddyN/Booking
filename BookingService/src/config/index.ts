
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    REDIS_SERVER_URL: string,
    LOCK_TTL: number
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 8080, // Default to 8080 if not specified
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || 'redis://localhost:6379',
    LOCK_TTL: Number(process.env.LOCK_TTL) || 5000 // Default to 5 seconds
};