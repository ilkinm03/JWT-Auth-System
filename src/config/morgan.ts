import { Application, Request, Response } from "express";
import morgan from "morgan";

export default (app: Application) => {
  app.use(
    morgan((tokens, req: Request, res: Response): string => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" "); // "<METHOD> <URL> <STATUS> <LENGTH> - <RESPONSE_TIME> ms"
    })
  );
};
