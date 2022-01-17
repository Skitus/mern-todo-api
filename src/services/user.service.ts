import User from "../models/User";
import { IUser } from "user.type";

export default class UserService {
    async create({email, username, password}: IUser) {
        return await User.create({email, username, password});
    }

    async findByEmail(data: string) {
        // tslint:disable-next-line:no-console
        console.log("email in service", data);
        return await User.findOne({email: data});
    }

    async findByUsername(data: string) {
        // tslint:disable-next-line:no-console
        console.log("username in service", data);
        return await User.findOne({username: data});
    }

    async update(_id: string, password: string) {
        await User.findByIdAndUpdate(_id, {password});
    }

    async isIdExist(_id: string) {
        return User.exists({_id});
    }

}