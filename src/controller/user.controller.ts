import { RequestHandler } from "express";
import logger from "../logger/logger";
import UserService from "../service/user.service";
import TokenService from "service/token.service";

class AuthController {
  public signup: RequestHandler = async (req, res, next) => {
    try {
      logger.debug("UserController.signup -- START");
      const { fullName, emailOrPhone, password, confirmPassword } = req.body;
      await UserService.signup(
        fullName,
        emailOrPhone,
        password,
        confirmPassword
      );
      res
        .status(201)
        .send({ success: 1, message: "User has been registered!" });
      logger.debug("UserController.signup -- SUCCESS");
    } catch (error) {
      next(error);
    }
  };

  public login: RequestHandler = async (req, res, next) => {
    try {
      logger.debug("UserController.login -- START");
      const { emailOrPhone, password } = req.body;
      const user = await UserService.login(emailOrPhone, password);
      const { accessToken, refreshToken } = await TokenService.generateTokens(
        user._id
      );
      logger.debug("UserController.login -- SUCCESS");
      res.cookie("token-access", accessToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.cookie("token-refresh", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.status(200).send({ success: 1 });
    } catch (error) {
      next(error);
    }
  };

  public logout: RequestHandler = async (_req, res, next) => {
    try {
      logger.debug("UserController.logout -- START");
      res.clearCookie("token-access");
      res.clearCookie("token-refresh");
      res.status(200).send({ success: 1, message: "User logged out!" });
      logger.debug("UserController.logout -- SUCCESS");
    } catch (error) {
      next(error);
    }
  };

  public verifyAccount: RequestHandler = async (req, res, next) => {
    try {
      logger.debug("UserController.verifyAccount -- START");
      const { verifyToken } = req.params;
      await UserService.verifyAccount(verifyToken);
      logger.debug("UserController.verifyAccount -- SUCCESS");
      res.status(200).send({
        success: 1,
        message: "Your account has been verified!",
      });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword: RequestHandler = async (req, res, next) => {
    try {
      logger.debug("UserController.forgotPassword -- START");
      const { emailOrPhone } = req.body;
      await UserService.forgotPassword(emailOrPhone);
      res.status(200).send({
        success: 1,
        message: "Reset password link has been sent to your email!",
      });
      logger.debug("UserController.forgotPassword -- SUCCESS");
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
