import { Router, Request, Response, NextFunction } from "express";
import authMiddleware from "middleware/auth.middleware";

const router = Router();

router.use(authMiddleware)
router.get("/profile", (_req: Request, res: Response, _next: NextFunction): void => {
  res.send("Your profile!");
});

export default router;
