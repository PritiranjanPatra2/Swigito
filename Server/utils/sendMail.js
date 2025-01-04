import nodemailer from 'nodemailer';
export async function sendMail(sender, sender_pass, email, subject, body) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: sender_pass,
        },
    });

    const mailOptions = {
        from: sender,
        to: email,
        subject,
        html: body ? body.toString() : 'No content provided', // Ensure body is defined
    };

    await transporter.sendMail(mailOptions);
}

