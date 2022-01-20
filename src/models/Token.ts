import { Document, model, Model, Schema } from "mongoose";

export interface IToken extends Document {
    userId: string;
    token: string;
    createdAt: Date;
}


const tokenSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token: Model<IToken> = model("Token", tokenSchema);

export default Token;