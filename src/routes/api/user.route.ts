import { Router } from "express";

import userController from "../../controllers/user.controller";
import { loginValidator } from "../../middlewares/loginValidator";
import { registerValidator } from "../../middlewares/registerValidator";
import { editPasswordUserValidator } from "../../middlewares/editPasswordUser";
import { isUserEmailExist } from "../../middlewares/isUserEmailExist";
import asyncHandler from "express-async-handler";

const todosRouter: Router = Router();

todosRouter.post("/register", registerValidator, asyncHandler(userController.createUser.bind(userController)));
todosRouter.post("/login", loginValidator, asyncHandler(userController.loginUser.bind(userController)));
todosRouter.put("/edit-password", editPasswordUserValidator, isUserEmailExist, asyncHandler(userController.editPasswordUser.bind(userController)));

export default todosRouter;
