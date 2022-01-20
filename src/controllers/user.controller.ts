import { Response, Request } from "express";
import UserService from "../services/user.service";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";
import crypto from "crypto";
import Token from "../models/Token";
import { sendEmail } from "../types/sendEmail";
import User from "../models/User";

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


  /*  async editPasswordUser(req: Request, res: Response) {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });
        // tslint:disable-next-line:no-console
        console.log("editPasswordUser", req.body);
        let token = await Token.findOne({ userId: user._id});
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const url = `http://localhost:3000/password-reset/${user._id}/${token.token}/`;
        await sendEmail(req.body.email, "Password Reset", url);

        res.status(200).send({ message: "Password reset link sent to your email account" });
/!*        const {newPassword} = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        await this.userService.update(res.locals.id.toString(), hashedPassword);

        res.json({status: 200, message: "Create new password"});*!/
    }*/
}





const userController = new UserController(new UserService());
export default userController;