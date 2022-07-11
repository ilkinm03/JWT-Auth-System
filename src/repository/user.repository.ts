import UserModel from "../model/user.model";
import logger from "../logger/logger";
import { QuerySignup } from "../types/types";

class UserRepository {
  public async findUserByEmail(email: string) {
    logger.debug("UserRepository.findUserByEmail -- START");
    const user = await UserModel.findOne({ email });
    logger.debug("UserRepository.findUserByEmail -- SUCCESS");
    return user;
  }

  public async findUserByPhone(phone: string) {
    logger.debug("UserRepository.findUserByPhone -- START");
    const user = await UserModel.findOne({ phone });
    logger.debug("UserRepository.findUserByPhone -- SUCCESS");
    return user;
  }

  public async createUser(query: QuerySignup) {
    logger.debug("UserRepository.createUser -- START");
    let user = await UserModel.create(query);
    logger.debug("UserRepository.createUser -- START");
    return user;
  }

  public async updateUserVerifyToken(email: string, verifyToken: string) {
    logger.debug("UserRepository.updateUserVerifyToken -- START");
    const user = await UserModel.findOneAndUpdate({ email }, { verifyToken });
    logger.debug("UserRepository.updateUserVerifyToken -- SUCCESS");
    return user;
  }
  public async updateUserLoginInfo(userID: string) {
    logger.debug("UserRepository.updateUserLoginInfo -- START");
    await UserModel.findByIdAndUpdate(
      userID,
      {
        isActive: false && true,
        lastLogin: new Date(),
      },
      { new: true }
    );
    logger.debug("UserRepository.updateUserLoginInfo -- SUCCESS");
  }
}

export default new UserRepository();
