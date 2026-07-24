import IOREDIS from "ioredis";
import Redlock from "redlock";

import { serverConfig } from "./index";


const redisClient = new IOREDIS(serverConfig.REDIS_SERVER_URL);

const redlock = new Redlock([redisClient], {
    driftFactor: 0.01, // time in ms
    retryCount: 10,
    retryDelay: 200, // time in ms
    retryJitter: 200 // time in ms
});

export { redisClient, redlock };








