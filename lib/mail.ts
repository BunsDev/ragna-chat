import { Resend } from 'resend';
import { siteConfig } from '@/config';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a verification email with a confirmation link.
 * @param email - The recipient's email address.
 * @param token - The verification token.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;

    try {
        await resend.emails.send({
            from: `${siteConfig.name} <onboarding@resend.dev>`, // Replace with your verified domain later
            to: email,
            subject: 'Confirm your email',
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

/**
 * Send a login code email.
 * @param email - The recipient's email address.
 * @param token - The login code.
 */
export const sendLoginCodeEmail = async (email: string, token: string) => {
    try {
        await resend.emails.send({
            from: `${siteConfig.name} <onboarding@resend.dev>`,
            to: email,
            subject: 'Login Code',
            html: `<p>Your Login Code: <strong>${token}</strong></p>`,
        });
    } catch (error) {
        console.error('Error sending login code email:', error);
    }
};

/**
 * Send a delete confirmation code email.
 * @param email - The recipient's email address.
 * @param token - The delete confirmation code.
 */
export const sendDeleteCodeEmail = async (email: string, token: string) => {
    try {
        await resend.emails.send({
            from: `${siteConfig.name} <onboarding@resend.dev>`,
            to: email,
            subject: 'Delete Confirmation Code',
            html: `<p>Your Delete Confirmation Code: <strong>${token}</strong></p>`,
        });
    } catch (error) {
        console.error('Error sending delete confirmation email:', error);
    }
};

/**
 * Send a success email after account verification.
 * @param email - The recipient's email address.
 */
export const sendVerificationSuccessEmail = async (email: string) => {
    try {
        await resend.emails.send({
            from: `${siteConfig.name} <onboarding@resend.dev>`,
            to: email,
            subject: 'Account Verified!',
            html: `<p>Your account has been successfully verified.</p>`,
        });
    } catch (error) {
        console.error('Error sending verification success email:', error);
    }
};

/**
 * Send a success email after account deletion.
 * @param email - The recipient's email address.
 */
export const sendDeleteSuccessEmail = async (email: string) => {
    try {
        await resend.emails.send({
            from: `${siteConfig.name} <onboarding@resend.dev>`,
            to: email,
            subject: 'Account Deleted!',
            html: `<p>Your account has been successfully deleted.</p>`,
        });
    } catch (error) {
        console.error('Error sending delete success email:', error);
    }
};