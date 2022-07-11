import { Router } from "express";
import UserController from "../../controller/user.controller";

const router = Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

export default router;