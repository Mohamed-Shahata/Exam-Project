import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import { auth, authorizedRole } from "../middlewares/auth.middleware.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post("/addInstructor", auth, authorizedRole("Admin"), expressAsyncHandler(adminController.addInstructor));
router.post("/addStudent", auth, authorizedRole("Admin"), expressAsyncHandler(adminController.addStudent));

router.delete("/instructor/:instructorId", auth, authorizedRole("Admin"), expressAsyncHandler(adminController.removeInstructor));
router.delete("/student/:studentId", auth, authorizedRole("Admin"), expressAsyncHandler(adminController.removeStudent));



export default router;