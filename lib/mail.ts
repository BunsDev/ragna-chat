import { siteConfig } from '@/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_SMTP_HOST,
    port: parseInt(process.env.NODEMAILER_SMTP_PORT!),
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
        html: `<p>Your Login Code : ${token}</p>`,
    };

    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error(error)
    }
}

export const sendDeleteCodeEmail = async (email:string,token:string) => {
    const options = {
        from: `"${siteConfig.name}" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "Delete Conformation Code",
        html: `<p>Your Delete Conformation Code : ${token}</p>`,
    };

    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error(error)
    }
}

export const sendVerificationSuccessEmail = async (email:string) => {
    const options = {
        from: `"${siteConfig.name}" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "Account verified!",
        html: `<p>Your account has successfully been verified./p>`,
    };

    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error(error)
    }
}



export const sendDeleteSuccessEmail = async (email:string) => {
    const options = {
        from: `"${siteConfig.name}" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "Account deleted!",
        html: `<p>Your account has successfully been deleted.</p>`,
    };

    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error(error)
    }
}