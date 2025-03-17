import express from "express";
import {authController} from "./auth.controller";
import { middleware } from "../../middleware";
import { loginSchema, registerSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  middleware.validateRequest(registerSchema),
  authController.register
);
router.post(
  "/login",
  middleware.validateRequest(loginSchema),
  authController.login
);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.get("/profile", middleware.authenticate, authController.profile);
router.get("/user/:id", middleware.authenticate, authController.singleUser);

export default router;
