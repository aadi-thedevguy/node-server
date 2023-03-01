import {Schema,model, Types} from "mongoose";

export interface IUser {
    id? : Types.ObjectId
    name: string
    email: string
    password : string
  }
  
  // 2. Create a Schema corresponding to the document interface.
  const schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password : { type: String, required: true }
  });
  
  // 3. Create a Model.
  export const User = model<IUser>('User', schema);