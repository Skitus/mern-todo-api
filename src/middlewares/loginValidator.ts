import { NextFunction, Request, Response } from "express";
import { loginValidationSchema } from "../validation/validation";
import UserService from "../services/user.service";
import bcrypt from "bcrypt";

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await loginValidationSchema.validate(req.body);
    const userService = new UserService();
    const {email, password} = req.body;
    const user = await userService.findByEmail(email);

    if (!user) {
        return res.json({
            status: 400,
            message: "Can not find any user"
        });
    }

    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
        return res.json({
            status: 400,
            message: "Incorrect password"
        });
    }

    res.locals.user = user;

    schema.error ?
        res.json({
            status: 400,
            message: schema.error.details[0].message}) : next();

};