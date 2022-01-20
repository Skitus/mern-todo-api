import { Router } from "express";

import userController from "../../controllers/user.controller";
import { loginValidator } from "../../middlewares/loginValidator";
import { isEmailTakenValidator, isUsernameTakenValidator, registerValidator } from "../../middlewares/registerValidator";
import asyncHandler from "express-async-handler";
import { isEmailExist } from "../../middlewares/editPasswordUser";

const todosRouter: Router = Router();

todosRouter.post("/register", registerValidator, isUsernameTakenValidator, isEmailTakenValidator, asyncHandler(userController.createUser.bind(userController)));
todosRouter.post("/login", loginValidator, asyncHandler(userController.loginUser.bind(userController)));
todosRouter.post("/password-reset", isEmailExist, asyncHandler(userController.sendPasswordLink.bind(userController)));
// @ts-ignore
todosRouter.get("/password-reset/:id/:token", asyncHandler(userController.verifyPasswordLink.bind(userController)));
// @ts-ignore
todosRouter.post("/password-reset/:id/:token", asyncHandler(userController.setNewPassword.bind(userController)));


export default todosRouter;
