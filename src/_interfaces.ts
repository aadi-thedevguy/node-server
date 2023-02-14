import { Types,SchemaDefinitionProperty } from "mongoose"
import { Request } from "express"
import { Status } from "./enums/status";
import { Priority } from "./enums/priority";

export interface LoginBody {
    email : string,
    password : string
  }
  
  export interface MyPayload {
    id : string,
    iat :  number,
    exp : number
  }

  interface BodyUser {
    id? : Types.ObjectId,
    email : string,
    name : string
  }

  export interface ITask {
    user : any,
    title: string
    description: string
    date: Date
    status : Status
    priority: Priority
  }

  export interface MyRequest extends Request {  
     user? : BodyUser
    
  }

