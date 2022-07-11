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
      res.cookie("x-danilov-access", accessToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.cookie("x-danilov-refresh", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.status(200).send({ success: 1 });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
