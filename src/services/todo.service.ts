import Todo from "../models/Todo";
import { ITodo, ITodoFindAll, ITodoTotalCount } from "todos.type";

export default class TodoService {
    async create({title, editorState, year, isPublic, isComplete, owner: _id}: ITodo) {
        await Todo.create({title, editorState, year, isPublic, isComplete, owner: _id});
    }

    async findAll({_id, search, parsedStatus, page, pageSize}: ITodoFindAll) {
        const offset = (page - 1) * pageSize;
        if (search && !parsedStatus) {
            return Todo.find({owner: _id, title: search}).limit(pageSize).skip(offset);
        } else if (search && parsedStatus) {
            if (parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.find({
                    owner: _id,
                    title: search,
                    isComplete: parsedStatus.isComplete,
                    isPublic: parsedStatus.isPublic
                }).limit(pageSize).skip(offset);
            }
            if (!parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.find({owner: _id, title: search, isPublic: parsedStatus.isPublic}).limit(pageSize).skip(offset);
            }
            if (parsedStatus.isComplete && !parsedStatus.isPublic) {
                return Todo.find({owner: _id, title: search, isComplete: parsedStatus.isComplete}).limit(pageSize).skip(offset);
            }
        } else if (!search && parsedStatus) {
            if (parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.find({
                    owner: _id,
                    isComplete: parsedStatus.isComplete,
                    isPublic: parsedStatus.isPublic
                }).limit(pageSize).skip(offset);
            }
            if (!parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.find({owner: _id, isPublic: parsedStatus.isPublic}).limit(pageSize).skip(offset);
            }
            if (parsedStatus.isComplete && !parsedStatus.isPublic) {
                return Todo.find({owner: _id, isComplete: parsedStatus.isComplete}).limit(pageSize).skip(offset);
            }
        } else {
            return Todo.find({owner: _id}).limit(pageSize).skip(offset);
        }
    }

    async total({_id, search, parsedStatus}: ITodoTotalCount) {
        if (search && !parsedStatus) {
            return Todo.countDocuments({owner: _id, title: search});
        } else if (search && parsedStatus) {
            if (parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.countDocuments({
                    owner: _id,
                    title: search,
                    isComplete: parsedStatus.isComplete,
                    isPublic: parsedStatus.isPublic
                });
            }
            if (!parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.countDocuments({owner: _id, title: search, isPublic: parsedStatus.isPublic});
            }
            if (parsedStatus.isComplete && !parsedStatus.isPublic) {
                return Todo.countDocuments({owner: _id, title: search, isComplete: parsedStatus.isComplete});
            }
        } else if (!search && parsedStatus) {
            if (parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.countDocuments({
                    owner: _id,
                    isComplete: parsedStatus.isComplete,
                    isPublic: parsedStatus.isPublic
                });
            }
            if (!parsedStatus.isComplete && parsedStatus.isPublic) {
                return Todo.countDocuments({owner: _id, isPublic: parsedStatus.isPublic});
            }
            if (parsedStatus.isComplete && !parsedStatus.isPublic) {
                return Todo.countDocuments({owner: _id, isComplete: parsedStatus.isComplete});
            }
        } else {
            return Todo.countDocuments({owner: _id});
        }
    }

    async update(_id: string, {title, editorState, year, isPublic, isComplete}: ITodo) {
        await Todo.findByIdAndUpdate(_id, {title, editorState, year, isPublic, isComplete});
    }

    async delete(_id: string) {
        return Todo.deleteOne({_id});
    }

    getStatus(value: string | undefined = undefined): any {
        if (!value) return undefined;
        if (value == "completed,public") return {isComplete: true, isPublic: true};
        if (value === "completed") return {isComplete: true, isPublic: undefined};
        if (value === "public") return {isPublic: true, isComplete: undefined};
    }

    async isIdExist(_id: string) {
        return Todo.exists({_id});
    }
}