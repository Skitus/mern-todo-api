import User from "../models/User";
import { IUser } from "user.type";

export default class UserService {
    async create({email, username, password}: IUser) {
        return await User.create({email, username, password});
    }

    async find(email: string) {
        return await User.findOne({email});
    }

    async update(_id: string, password: string) {
        await User.findByIdAndUpdate(_id, {password});
    }

    async isIdExist(_id: string) {
        return User.exists({_id});
    }

}