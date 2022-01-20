const nodemailer = require("nodemailer");

export const sendEmail = async (email: any, subject: any, text: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "artur.demenskiy@gmail.com",
                pass: "A20033002D",
            },
        });

        await transporter.sendMail({
            from: "artur.demenskiy@gmail.com",
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