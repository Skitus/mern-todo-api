import { Router } from "express";
import asyncHandler from "express-async-handler";
import todoController from "../../controllers/todo.controller";
import { todosValidator } from "../../middlewares/todoValidator";
import { isUserIdExist } from "../../middlewares/isUserIdExist";
import { isTodoIdExist } from "../../middlewares/isTodoIdExist";

const todosRouter: Router = Router();

todosRouter.post("/create", todosValidator, isUserIdExist, asyncHandler(todoController.createTodo.bind(todoController)));
todosRouter.get("/", isUserIdExist, asyncHandler(todoController.getAllTodo.bind(todoController)));
todosRouter.put("/update", todosValidator, isTodoIdExist, asyncHandler(todoController.updateTodo.bind(todoController)));
todosRouter.delete("/delete", isTodoIdExist, asyncHandler(todoController.deleteTodo.bind(todoController)));

export default todosRouter;
