import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    userController.createUserController);

router.post("/login", 
    body("email").isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.loginUserController);

router.get("/profile", authUser, userController.profileUserController);

router.get("/logout", authUser, userController.logoutUserController);

router.get("/all",
    authUser,
    userController.getAllUsersController);

    
export default router;