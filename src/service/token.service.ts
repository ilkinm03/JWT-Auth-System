import jwt from "jsonwebtoken";
import logger from "../logger/logger";
import ApiError from "../exception/api.error";

class TokenService {
  public async generateTokens(payload: string) {
    logger.debug("TokenService.generateTokens -- START");
    if (!payload) {
      logger.warn("TokenService.generateTokens -- null param");
      throw ApiError.BadRequest("Payload not provided!");
    }
    try {
      const accessToken: never = jwt.sign(
        { payload },
        /* @ts-ignore */
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: 5 * 60, // 5 mins
        }
      );
      const refreshToken: never = jwt.sign(
        { payload },
        /* @ts-ignore */
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: 14 * 24 * 60 * 60, // 14 days
        }
      );
      logger.debug("TokenService.generateTokens -- SUCCESS");
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  public async generateVerifyToken(email: string) {
    logger.debug("TokenService.generateVerifyToken -- START");
    // @ts-ignore
    const verifyToken = jwt.sign({ email }, process.env.JWT_VERIFY_SECRET);
    logger.debug("TokenService.generateVerifyToken -- SUCCESS");
    return verifyToken;
  }

  public async generateResetToken(email: string) {
    logger.debug("TokenService.generateResetToken -- START");
    // @ts-ignore
    const resetToken = jwt.sign({ email }, process.env.JWT_RESET_SECRET, {
      expiresIn: 5 * 60, // 5 mins
    });
    logger.debug("TokenService.generateResetToken -- SUCCESS");
    return resetToken;
  }

  public async validateAccessToken(accessToken: string) {
    logger.debug("TokenService.validateAccessToken -- START");
    if (!accessToken) {
      logger.warn("TokenService.validateAccessToken -- null param");
      throw ApiError.UnauthorizedError("You're not logged in!");
    }
    try {
      // @ts-ignore
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      logger.debug("TokenService.validateAccessToken -- SUCCESS");
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async validateRefreshToken(refreshToken: string) {
    logger.debug("TokenService.validateRefreshToken -- START");
    if (!refreshToken) {
      logger.warn(
        "TokenService.validateRefreshToken -- refresh token not found"
      );
      throw ApiError.UnauthorizedError("You're not logged in!");
    }
    try {
      // @ts-ignore
      const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      logger.debug("TokenService.validateRefreshToken -- SUCCESS");
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new TokenService();
