import { NextFunction, Request, Response } from "express";
import { registerValidationSchema } from "../validation/validation";
import UserService from "../services/user.service";

export const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await registerValidationSchema.validate(req.body);

    const userService = new UserService();
    const {email, username} = req.body;

    const isEmailTaken = await userService.findByEmail(email);

    if (isEmailTaken) {
        return res.json({
            status: 400,
            message: "This email is already taken"
        });
    }

    const isUsernameTaken = await userService.findByUsername(username);
    if (isUsernameTaken) {
        return res.json({
            status: 400,
            message: "This username is already taken"
        });
    }

    schema.error ?
        res.json({
            status: 400,
            message: schema.error.details[0].message
        }) : next();
};