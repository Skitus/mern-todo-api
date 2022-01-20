import { Router } from "express";

import userController from "../../controllers/user.controller";
import { loginValidator } from "../../middlewares/loginValidator";
import { isEmailTakenValidator, isUsernameTakenValidator, registerValidator } from "../../middlewares/registerValidator";
import { editPasswordUserValidator } from "../../middlewares/editPasswordUser";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../../models/User";
import Token from "../../models/Token";
import crypto from "crypto";
import { sendEmail } from "../../types/sendEmail";

const todosRouter: Router = Router();

todosRouter.post("/register", registerValidator, isUsernameTakenValidator, isEmailTakenValidator, asyncHandler(userController.createUser.bind(userController)));
todosRouter.post("/login", loginValidator, asyncHandler(userController.loginUser.bind(userController)));
/*todosRouter.post("/edit-password", asyncHandler(userController.editPasswordUser.bind(userController)));*/
// send password link
todosRouter.post("/password-reset", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(409)
                .send({ message: "User with given email does not exist!" });

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const url = `http://localhost:5000/api/user/password-reset/${user._id}/${token.token}/`;
        await sendEmail(user.email, "Password Reset", url);

        res
            .status(200)
            .send({ message: "Password reset link sent to your email account" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
todosRouter.get("/password-reset/:id/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        res.status(200).send("Valid Url");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


todosRouter.post("/password-reset/:id/:token", async (req, res) => {
    try {
        // tslint:disable-next-line:no-console
        console.log("req.params", req.params);
        // tslint:disable-next-line:no-console
        console.log("req.body", req.body);
        const user = await User.findOne({ _id: req.params.id });
        // tslint:disable-next-line:no-console
        console.log("user", user);
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId:  user._id,
            token: req.params.token,
        });
        // tslint:disable-next-line:no-console
        console.log("token", token);
        if (!token) return res.status(400).send({ message: "Invalid link" });

        if (!user.verified) user.verified = true;
        // tslint:disable-next-line:no-console
        console.log("user.verified", user.verified);

        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        // tslint:disable-next-line:no-console
        console.log("hashPassword", hashPassword);

        user.password = hashPassword;
        await user.save();
        await token.remove();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default todosRouter;
