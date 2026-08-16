import Redis from "ioredis";

import { serverConfig } from ".";

//singleton pattern to connect to the redis
function connectRedis() {
    try {
        let connection: Redis;

        const redisConfig = {
            port: serverConfig.RedisPort,
            host: serverConfig.RedisHost,
            maxRetriesPerRequest:null
        }
        return ()=>{
            if(!connection){
                connection=new Redis(redisConfig);
            }
            return connection;
        }
    } catch (err) {
        console.log("Error connecting to redis", err);
        throw err;
    }
}
export const getRedis =connectRedis();


// think of singleton pattern cause we don't wanna create a
//  new Redis connection every time so we came up with this approach

//  1.getRedis is called and since if condition hits we will create a  new redis connection 
//  2.if same is called again since if condition fails this time it will return old redis connection 