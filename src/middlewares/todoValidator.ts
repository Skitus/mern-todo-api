import { NextFunction, Request, Response } from "express";
import { todoValidationScheme } from "../validation/validation";

export const todosValidator = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await todoValidationScheme.validate(req.body);
    schema.error ?
        res.json({status: 400, message: schema.error.details[0].message}) : next();
};