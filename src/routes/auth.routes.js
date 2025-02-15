import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post("/login", expressAsyncHandler(authController.login));

export default router;