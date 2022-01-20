import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  verified: boolean;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  verified: { type: Boolean, default: false },
});

const User: Model<IUser> = model("User", userSchema);

export default User;
