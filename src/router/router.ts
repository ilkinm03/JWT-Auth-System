import { Application } from "express";
import authRouter from "./public/auth.router";

export default (app: Application) => {
  app.use("/auth", authRouter)
}