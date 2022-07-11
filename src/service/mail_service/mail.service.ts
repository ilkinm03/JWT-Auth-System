import { createTransport } from "nodemailer";

import ApiError from "../../exceptions/api-error";
import logger from "../../logger/logger";

import verifyHTML from "./html/verify";
import resetHTML from "./html/reset";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class MailService {
  public async sendVerifyEmail(to: string, link: string) {
    const mailHTML = verifyHTML(to, link);
    const mailerOptions = {
      from: `"Ilkin" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Verify your account",
      text: "Please verify your account",
      html: mailHTML,
    };
    logger.debug("MailService.sendVerifyEmail -- START");
    await transporter.sendMail(mailerOptions, (error: Error | null) => {
      if (error) {
        logger.warn("MailService.sendVerifyEmail -- cannot send");
        throw ApiError.ServiceUnavailableException("Cannot send!");
      }
    });
    logger.debug("MailService.sendVerifyEmail -- SUCCESS");
  }

  public async sendResetEmail(to: string, link: string) {
    const mailHTML = resetHTML(to, link);
    const mailerOptions = {
      from: `"Ilkin" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Reset Password",
      text: "Here's the your reset password link",
      html: mailHTML,
    };
    logger.debug("MailService.sendResetEmail -- START");
    await transporter.sendMail(mailerOptions, (error: Error | null) => {
      if (error) {
        logger.warn("MailService.sendResetEmail -- cannot send");
        throw ApiError.ServiceUnavailableException("Cannot send!");
      }
    });
    logger.debug("MailService.sendResetEmail -- SUCCESS");
  }
}

export default new MailService();
