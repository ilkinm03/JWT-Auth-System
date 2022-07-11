import { Router } from "express";
import UserController from "../../controller/user.controller";

const router = Router();

router.post("/signup", UserController.signup);

export default router;