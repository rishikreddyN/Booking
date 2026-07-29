// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    RedisHost?: string,
    RedisPort?: number,
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    RedisHost: process.env.REDIS_HOST || 'localhost',
    RedisPort: Number(process.env.REDIS_PORT) || 6379,
};