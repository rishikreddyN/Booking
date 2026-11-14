import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { getRedis } from "../config/redis.config";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/mailer/templates.handler";
import { sendWelcomeEmail } from "../services/mailer.service";

export const setupMailerWorker = () => {

    const emailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE, // Name of the queue
        async (job: Job) => {

            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }
            const payload = job.data;

            console.log(`Processing email job for ${payload.to} with template ${payload.templateId}`);

            const emailContent = await renderMailTemplate(payload.templateId, payload.params);

            await sendWelcomeEmail(payload.to, payload.subject, emailContent);



            
        }, 
        {
            connection: getRedis()
        }
    )

    emailProcessor.on("failed", (job, err) => {
    console.error(
        `Email job ${job?.id} failed:`,
        err.message
        );
    });

    emailProcessor.on("completed", (job) => {
    console.log(`Email job ${job.id} completed successfully`);
    });
}