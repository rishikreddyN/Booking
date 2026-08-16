import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { getRedis } from "../config/redis.config";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";

export const setupMailerWorker = () => {

    const emailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE, // Name of the queue
        async (job: Job) => {

            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }

            
        }, 
        {
            connection: getRedis()
        }
    )

    emailProcessor.on("failed", () => {
        console.error("Email processing failed");
    });

    emailProcessor.on("completed", () => {
        console.log("Email processing completed successfully");
    });
}