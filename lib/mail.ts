import { siteConfig } from '@/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
})

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`

    const options = {
        from: `"${siteConfig.name}" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
    }

    try {
        await transporter.sendMail(options)
    } catch (error) {
        console.error(error)
    }
}

export const sendLoginCodeEmail = async (email:string,token:string) => {
    const options = {
        from: `"${siteConfig.name}" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "Login Code",
        html: `<p>Your Login code : ${token}</p>`,
    };

    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error(error)
    }
}