import { NextFunction, Request, Response } from "express";
import { editPasswordValidationSchema } from "../validation/validation";
import UserService from "../services/user.service";

export const editPasswordUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await editPasswordValidationSchema.validate(req.body);
    const {email} = req.body;

    const userService = new UserService();
    const result = await userService.find(email);
    if (!result) {
        return res.status(400).send({message: `user email was not found`});
    }

    res.locals.id = result?._id;

    schema.error ?
        res.status(400).json({ message: schema.error.details[0].message}) : next();
};