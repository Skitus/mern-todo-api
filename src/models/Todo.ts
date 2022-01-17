import { Document, Model, model, Schema, Types } from "mongoose";

export interface ITodo extends Document {
    title: string;
    year: string;
    editorState: object;
    isComplete: boolean;
    isPublic: boolean;
}

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    editorState: {
        type: Object
    },
    year: {
        type: String
    },
    isComplete: {
        type: Boolean
    },
    isPublic: {
        type: Boolean
    },
    owner: {type: Types.ObjectId, ref: "User"}
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;