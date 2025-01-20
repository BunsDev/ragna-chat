import sgMail from '@sendgrid/mail';
import { siteConfig } from '@/config';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/**
 * Send a verification email with a confirmation link.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;

    const msg = {
        to: email,
        from: `${siteConfig.name} <${process.env.SENDGRID_FROM_EMAIL}>`,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

/**
 * Send a login code email.
 */
export const sendLoginCodeEmail = async (email: string, token: string) => {
    const msg = {
        to: email,
        from: `${siteConfig.name} <${process.env.SENDGRID_FROM_EMAIL}>`,
        subject: 'Login Code',
        html: `<p>Your login code: <strong>${token}</strong></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Login code email sent successfully!');
    } catch (error) {
        console.error('Error sending login code email:', error);
    }
};

/**
 * Send a delete confirmation code email.
 */
export const sendDeleteCodeEmail = async (email: string, token: string) => {
    const msg = {
        to: email,
        from: `${siteConfig.name} <${process.env.SENDGRID_FROM_EMAIL}>`,
        subject: 'Delete Confirmation Code',
        html: `<p>Your delete confirmation code: <strong>${token}</strong></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Delete code email sent successfully!');
    } catch (error) {
        console.error('Error sending delete code email:', error);
    }
};

/**
 * Send an email to confirm account verification.
 */
export const sendVerificationSuccessEmail = async (email: string) => {
    const msg = {
        to: email,
        from: `${siteConfig.name} <${process.env.SENDGRID_FROM_EMAIL}>`,
        subject: 'Account Verified!',
        html: `<p>Your account has been successfully verified.</p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Verification success email sent successfully!');
    } catch (error) {
        console.error('Error sending verification success email:', error);
    }
};

/**
 * Send an email to confirm account deletion.
 */
export const sendDeleteSuccessEmail = async (email: string) => {
    const msg = {
        to: email,
        from: `${siteConfig.name} <${process.env.SENDGRID_FROM_EMAIL}>`,
        subject: 'Account Deleted!',
        html: `<p>Your account has been successfully deleted.</p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Delete success email sent successfully!');
    } catch (error) {
        console.error('Error sending delete success email:', error);
    }
};