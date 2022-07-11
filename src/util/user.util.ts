import validator from "validator";
import logger from "../logger/logger";

class UserUtil {
  public checkEmailOrPhone(emailOrPhone: string) {
    try {
      logger.debug("UserUtil.checkEmailOrPhone -- START");
      let value: boolean = validator.isEmail(emailOrPhone) ? true : false;
      logger.debug("UserUtil.checkEmailOrPhone -- SUCCESS");
      return value;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserUtil();
