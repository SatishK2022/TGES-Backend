import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * @sendMail
 * @params to, subject, html, filename, path
 * @Description : This function is used to send mail
 */
export async function sendMail(to, subject, html, filename, path) {
  try {
    const mailOptions = {
      from: `TGES Travel ${process.env.SMTP_USER}`,
      to,
      subject,
      html
    };

    // Check if filename and path are provided
    if (filename && path) {
      mailOptions.attachments = [
        {
          filename,
          path
        }
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
}