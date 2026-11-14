import transporter from "../config/mailer.config";
import {serverConfig} from "../config/index";

export async function sendWelcomeEmail(to: string, subject: string,body:string): Promise<void> {
    try{
        await transporter.sendMail({
            from: serverConfig.MAIL_USER,
            to,
            subject,
            html: body
        })
        console.log(`Welcome email sent to ${to}`);
        
    }catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        throw error;
    }
}