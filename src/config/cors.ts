import cors from "cors";
import helmet from "helmet";
import { Application } from "express";

export default (app: Application) => {
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: true,
      methods: ["GET", "POST", "PUT", "PATCH"],
    })
  );
};
