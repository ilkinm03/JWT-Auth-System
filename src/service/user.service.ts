import bcrypt from "bcrypt";
import UserRepository from "repository/user.repository";
import UserUtil from "util/user.util";
import RoleModel from "model/role.model";
import RoleEnum from "enum/role.enum";
import MailService from "./mail_service/mail.service";
import TokenService from "./token.service";
import logger from "logger/logger";
import ApiError from "exception/api.error";
import { Signup, QuerySignup } from "types/types";

class UserService {
  public signup: Signup = async (
    fullName,
    emailOrPhone,
    password,
    confirmPassword
  ) => {
    logger.debug("UserController.signup.UserService -- START");
    if (password !== confirmPassword) {
      logger.warn("UserController.signup.UserService -- not match");
      throw ApiError.BadRequest("Confirm password field is not same!");
    }
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      const query: QuerySignup = { fullName, password: hashPassword };
      const result = UserUtil.checkEmailOrPhone(emailOrPhone);
      result ? (query.email = emailOrPhone) : (query.phone = emailOrPhone);
      const candidate = query.email
        ? await UserRepository.findUserByEmail(query.email)
        : query.phone && (await UserRepository.findUserByPhone(query.phone));
      if (candidate) {
        logger.warn("UserController.signup.UserService -- already exists");
        throw ApiError.ConflictException("Email is already registered!");
      }
      const userRoleID = await RoleModel.findOne({
        role: RoleEnum.USER,
      }).lean();
      query.role = userRoleID;
      if (query.email) {
        UserRepository.createUser(query);
        const verifyToken = await TokenService.generateVerifyToken(query.email);
        await UserRepository.updateUserVerifyToken(query.email, verifyToken);
        await MailService.sendVerifyEmail(
          query.email,
          `${process.env.API_URL}/auth/verify-account/${verifyToken}`
        );
      } else if (query.phone) {
        await UserRepository.createUser(query);
      }
      logger.debug("UserController.signup.UserService -- SUCCESS");
    } catch (error) {
      throw error;
    }
  };
}

export default new UserService();
