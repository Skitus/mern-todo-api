import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

export const isUserEmailExist = async (req: Request, res: Response, next: NextFunction) => {
/*    const {email} = req.body;

    const userService = new UserService();
    const result = await userService.find(email);
    res.locals.id = result?._id;
    next();
    if (!result) {
        return res.send({status: 400, message: `user email was not found`});
    }*/
};