import { Response, Request } from "express";
import UserService from "../services/user.service";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";
import crypto from "crypto";
import Token from "../models/Token";
import TokenService from "../services/token.service";
import { sendEmail } from "../types/sendEmail";
import { Types } from "mongoose";


export class UserController {
    constructor(private userService: UserService) {
    }

    async createUser(req: Request, res: Response) {
        const {username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await this.userService.create({email, username, password: hashedPassword});
        res.json({status: 200, message: "User was register", user});
    }

    async loginUser(req: Request, res: Response) {
        const user = res.locals.user;

        const token = jsonwebtoken.sign(
            {userId: user.id},
            config.get("jwtSecret"),
            {expiresIn: "1h"}
        );

        res.json({status: 200, token, user: user._id.toString(), message: "User was logged", username: user.username});
    }

    async sendPasswordLink(req: Request, res: Response) {
    const tokenService = new TokenService();
        let token = await tokenService.findTokenById(res.locals.user._id);
        if (!token) {
            token = await new Token({
                userId: res.locals.user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const url = `${process.env.BASE_URL_CLIENT}/password-reset/${res.locals.user._id}/${token.token}/`;
        await sendEmail(res.locals.user.email, "Password Reset", url);

        res.send({status: 200, message: "Password reset link sent to your email account" });
    }

    async verifyPasswordLink(req: Request, res: Response) {
        const tokenService = new TokenService();
        if (!Types.ObjectId.isValid(req.params.id)) {
            return res.send({status: 400, message: "Invalid link" });
        }

        const user = await this.userService.findById(new Types.ObjectId(req.params.id));
        if (!user) return res.send({status: 400, message: "Invalid link" });

        const token = await tokenService.findToken(user._id, req.params.token);
        if (!token) return res.send({status: 400, message: "Invalid link" });

        res.send({status: 200, message: "Valid Url"});
    }

    async setNewPassword(req: Request, res: Response) {
        const tokenService = new TokenService();
        if (!Types.ObjectId.isValid(req.params.id)) {
            return res.send({status: 400, message: "Invalid link" });
        }

        const user = await this.userService.findById(new Types.ObjectId(req.params.id));
        if (!user) return res.send({ status: 400, message: "Invalid link" });

        const token = await tokenService.findToken(user._id, req.params.token);
        if (!token) return res.send({status: 400, message: "Invalid link" });

        if (!user.verified) user.verified = true;
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashPassword;

        await user.save();
        await token.remove();

        res.send({status: 200, message: "Password reset successfully" });
    }
}

const userController = new UserController(new UserService());
export default userController;