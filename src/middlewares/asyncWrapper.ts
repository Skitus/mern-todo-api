import { Router, Response, Request, NextFunction } from "express";


const asyncWrapper = (cb: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: any = await cb(req, res, next);
            // tslint:disable-next-line:no-console
            console.log("result from ", result);
            // tslint:disable-next-line:no-unused-expression
            result && res.send(result);
        } catch (error) {
            next("Oops something went wrong...");
        }
    };
};

export default asyncWrapper;