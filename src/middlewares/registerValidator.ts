import { NextFunction, Request, Response } from "express";
import { registerValidationSchema } from "../validation/validation";

export const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await registerValidationSchema.validate(req.body);
    schema.error ?
        res.json({status: 400, message: schema.error.details[0].message}) : next();
};