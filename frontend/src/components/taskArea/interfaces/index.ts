import { Priority } from "../../createTaskForm/enums/priority";
import { Status } from "../../createTaskForm/enums/status";

export interface ICreateTask {
    title : string,
    description: string,
    date : string,
    status: string,
    priority : string
}

export interface IUpdateTask {
    id : string,
    status : string
}

export interface ITaskApi {
    _id : string,
    date : string,
    title : string,
    description: string,
    priority : `${Priority}`,
    status : `${Status}`
}

// `${Priority}` means that it will be a union of the priority enum