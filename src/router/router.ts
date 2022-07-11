import { Application } from "express";
import authRouter from "./public/auth.router";
import userRouter from "./private/user.router";

export default (app: Application) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
};
