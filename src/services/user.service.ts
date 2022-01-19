import User from "../models/User";
import { IUser } from "user.type";

export default class UserService {
    async create({email, username, password}: IUser) {
        return await User.create({email, username, password});
    }

    async findByEmail(data: string) {
        return await User.findOne({email: data});
    }

    async isUsernameExist(data: string) {
        return await User.exists({username: data});
    }

    async isEmailExist(data: string) {
        return await User.exists({email: data});
    }

    async update(_id: string, password: string) {
        return await User.findByIdAndUpdate(_id, {password});
    }

    async isIdExist(_id: string) {
        return User.exists({_id});
    }

}