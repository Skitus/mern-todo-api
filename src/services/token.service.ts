import Token from "../models/Token";

export default class TokenService {
    async findTokenById(_id: string) {
        return Token.findOne({userId: _id});
    }

    async findToken(_id: string, token: string) {
        return Token.findOne({userId: _id, token});
    }
}