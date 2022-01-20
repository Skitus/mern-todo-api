import { NextFunction, Request, Response } from "express";
import { editPasswordValidationSchema } from "../validation/validation";
import UserService from "../services/user.service";

export const editPasswordUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await editPasswordValidationSchema.validate(req.body);

    schema.error ?
        res.json({ status: 400, message: schema.error.details[0].message}) : next();
};

export const isEmailExist = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;

    const userService = new UserService();
    const result = await userService.findByEmail(email);
    if (!result) {
        return res.send({ status: 400, message: `user email was not found`});
    }

    res.locals.user = result;
    next();
};