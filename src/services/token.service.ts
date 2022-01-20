import Token from "../models/Token";

export default class TokenService {
    async findToken(_id: string) {
        return Token.findOne({userId: _id});
    }
}