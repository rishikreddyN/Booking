// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    RedisHost?: string,
    RedisPort?: number,
    MAIL_USER?: string,
    MAIL_PASS?: string
    
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
    MAIL_USER: process.env.MAIL_USER ,
    MAIL_PASS: process.env.MAIL_PASS 
};