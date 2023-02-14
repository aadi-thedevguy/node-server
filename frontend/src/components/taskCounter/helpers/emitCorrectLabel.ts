import { TaskCounterStatusType } from "../interfaces/ITaskCounter"
import { Status } from "../../createTaskForm/enums/status"

export function emitCorrectLabel(status : TaskCounterStatusType) : string {
  switch (status) {
    case Status.todo :
        return "Todo's"
    case Status.completed :
        return "Completed"
    case Status.inProgress :
        return "In Progress"
  }
}
