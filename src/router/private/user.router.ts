import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/profile", (_req: Request, res: Response, _next: NextFunction): void => {
  res.send("Your profile!");
});

export default router;
