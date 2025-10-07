import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    otp: string;
}

export async function sendEmail({ to, otp }: EmailOptions): Promise<{ success: boolean; error?: unknown }> {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "41164c6c0059b5",
                pass: "66760fec0ce4f6"
            }
        });

        await transporter.sendMail({
            from: `"Your App Name" <${process.env.SMTP_USER}>`,
            to,
            subject : "opt verification ",
            html : `this is your ${otp} dont share.`
        });

        return { success: true };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error };
    }
}