import express, { Router } from "express";
import { ctrlWrapper, validateBody } from "../../middlewares";
import authController from "../../controllers/auth.controller";
import { loginSchema, registerSchema } from "../../models/auth.model";

const authRouter: Router = express.Router();

authRouter.post(
  "/register",
  ctrlWrapper(authController.register.bind(authController)),
  validateBody(registerSchema),
);

authRouter.post(
  "/login",
  ctrlWrapper(authController.login.bind(authController)),
  validateBody(loginSchema),
);

authRouter.post(
  "/logout",
  ctrlWrapper(authController.logout.bind(authController)),
);

export default authRouter;