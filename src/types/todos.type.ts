export interface ITodo {
    title: string;
    editorState: object;
    year: Date;
    isPublic: boolean;
    isComplete: boolean;
    owner?: string;
}

export interface ITodoFindAll {
    _id: string;
    search: string;
    parsedStatus: {
        isPublic: boolean,
        isComplete: boolean,
    };
    page: number;
    pageSize: number;
}

export interface ITodoTotalCount {
    _id: string;
    search: string;
    parsedStatus: {
        isPublic: boolean,
        isComplete: boolean,
    };
}