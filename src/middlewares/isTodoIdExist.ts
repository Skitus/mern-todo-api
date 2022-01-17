import { NextFunction, Request, Response } from "express";
import TodoService from "../services/todo.service";

export const isTodoIdExist = async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.body._id;
    const todoService = new TodoService();
    try {
        const result = await todoService.isIdExist(_id);
        if (result) {
            next();
        }
    } catch (e) {
        return res.status(400).send({message: `todo not found ${e}`});
    }
};