import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `TGES Travel ${process.env.SMTP_USER}`,
      to,
      subject,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
}
