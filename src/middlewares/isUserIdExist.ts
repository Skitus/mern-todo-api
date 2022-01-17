import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

export const isUserIdExist = async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.method === "POST" ? req.body._id : req.query._id;

    const userService = new UserService();
    try {
        const result = await userService.isIdExist(_id);
        if (result) {
            next();
        }
    } catch (e) {
        return res.status(400).send({message: `user not found ${e}`});
    }
};