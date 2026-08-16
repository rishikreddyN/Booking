import {Queue} from "bullmq"
import { getRedis } from "../config/redis.config"

export const MAILER_QUEUE="queue-mailer"

export const mailerQueue=new Queue(MAILER_QUEUE,{
    connection:getRedis(),
});

  