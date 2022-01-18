import { NextFunction, Request, Response } from "express";
import { registerValidationSchema } from "../validation/validation";
import UserService from "../services/user.service";

export const isEmailTakenValidator = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;
    const userService = new UserService();

    const isEmailTaken = await userService.isEmailExist(email);
    isEmailTaken ?
        res.json({
            status: 400,
            message: "This email is already taken"
        }) : next();

};

export const isUsernameTakenValidator = async (req: Request, res: Response, next: NextFunction) => {

    const {username} = req.body;
    const userService = new UserService();

    const isUsernameTaken = await userService.isUsernameExist(username);
    isUsernameTaken ?
        res.json({
            status: 400,
            message: "This username is already taken"
        }) : next();
};

export const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await registerValidationSchema.validate(req.body);
    schema.error ?
        res.json({
            status: 400,
            message: schema.error.details[0].message
        }) : next();
};