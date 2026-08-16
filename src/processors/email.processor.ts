import { Worker } from "bullmq";

import { NotificationDto } from "../dto/notification.dto";

import { MAILER_QUEUE } from "../queues/mailer.queue"

import { getRedis } from "../config/redis.config"

export const setupMailerWorker = () => {
    const emailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE,
        async (job) => {
            if (job.name !== MAILER_QUEUE) {
                throw new Error("Invalid job name");
            }

        },
        {
            connection: getRedis()
        }
    )
    emailProcessor.on("failed",()=>{
        console.error('Email processing failed');
    })

    emailProcessor.on("completed",()=>{
        console.log("Email processing completed successfully")
    })

}

