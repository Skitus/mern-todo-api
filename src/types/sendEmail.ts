const nodemailer = require("nodemailer");

export const sendEmail = async (email: any, subject: any, text: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: text,
        });
        // tslint:disable-next-line:no-console
        console.log("email sent successfully");
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log("email not sent!");
        // tslint:disable-next-line:no-console
        console.log(error);
        return error;
    }
};