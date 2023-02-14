import {Schema,model,Types, SchemaDefinitionProperty} from "mongoose";
import { Status } from "../enums/status";
import { Priority } from "../enums/priority";
import { ITask } from "../_interfaces";
  
  // 2. Create a Schema corresponding to the document interface.
  const schema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date : {type : Date, required : true, default : new Date()},
    status : {type : String, required : true, default : Status.todo},
    priority : {type : String, required: true, default: Priority.normal},
    user : {
      type : Types.ObjectId,
      required : true,
      ref : 'User'
  },
  });
  
  // 3. Create a Model.
  export const Task = model<ITask>('Task', schema);