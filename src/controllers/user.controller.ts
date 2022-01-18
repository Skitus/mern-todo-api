import { Response, Request } from "express";
import UserService from "../services/user.service";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

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


    async editPasswordUser(req: Request, res: Response) {
        const {newPassword} = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        await this.userService.update(res.locals.id.toString(), hashedPassword);

        res.json({status: 200, message: "Create new password"});
    }
}


const userController = new UserController(new UserService());
export default userController;