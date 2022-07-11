import { Request, Response, NextFunction } from "express";
import { Jwt } from "jsonwebtoken";

import logger from "../logger/logger";
import ApiError from "../exception/api.error";
import TokenService from "../service/token.service";

interface IGetUserAuthInfoRequest extends Request {
  user?: Jwt;
}

const authMiddleware = async (
  req: IGetUserAuthInfoRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    logger.debug("authMiddleware -- START");
    const accessToken = req.cookies["token-access"];
    if (!accessToken) return next();
    const userData = await TokenService.validateAccessToken(accessToken);
    logger.debug("authMiddleware -- SUCCESS");
    req.body.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError("You're not logged in!"));
  }
};

export default authMiddleware;
