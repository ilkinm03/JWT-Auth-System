import { Request, Response, NextFunction } from "express";
import UserService from "../service/user.service";
import logger from "../logger/logger";
import ApiError from "../exception/api.error";

const refreshMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("refreshMiddleware -- START");
    if (req.body.user) {
      logger.debug("refreshMiddleware -- SUCCESS");
      return  next();
    }
    const refreshToken: string = req.cookies["token-refresh"];
    const newUserData = await UserService.refresh(refreshToken);
    if (!newUserData) {
      logger.warn("refreshTokenMiddleware -- user not found");
      throw ApiError.UnauthorizedError("User not found!");
    }
    res.cookie("token-access", newUserData.accessToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });
    req.body.user = newUserData.user;
    logger.debug("refreshMiddleware -- SUCCESS");
    next();
  } catch (error) {
    next(error);
  }
};

export default refreshMiddleware;
