import { Response, Request } from "express";
import TodoService from "../services/todo.service";
import { ITodo, ITodoFindAll, ITodoTotalCount } from "todos.type";

export class TodoController {
    constructor(private todoService: TodoService) {
    }

    async createTodo(req: Request, res: Response) {
        const {title, editorState, year, isPublic, isComplete, _id} = req.body;
        await this.todoService.create(<ITodo>{title, editorState, year, isPublic, isComplete, owner: _id});
        res.json({message: "Todo was created"});
    }

    async getAllTodo(req: Request, res: Response) {
        const {_id, search, status, page = 1, pageSize = 4} = req.query;
        const parsedStatus = this.todoService.getStatus(status as string);
        const todos = await this.todoService.findAll(<ITodoFindAll>{_id, search, parsedStatus, page, pageSize});
        const totalCount = await this.todoService.total(<ITodoTotalCount>{_id, search, parsedStatus});
        res.json({todos, totalCount});
    }

    async updateTodo(req: Request, res: Response) {
        const {title, editorState, year, isPublic, isComplete, _id} = req.body;
        await this.todoService.update(_id, {title, editorState, year, isPublic, isComplete});
        res.json({message: "Todo was updated"});
    }

    async deleteTodo(req: Request, res: Response) {
        const {_id} = req.body;
        await this.todoService.delete(_id);
        res.json({message: "Todo was deleted"});
    }
}

const todoController = new TodoController(new TodoService());
export default todoController;