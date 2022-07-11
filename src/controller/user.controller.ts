import { RequestHandler } from "express";
import logger from "../logger/logger";

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
}

export default new AuthController();