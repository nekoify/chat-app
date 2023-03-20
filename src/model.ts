import * as mongoose from "mongoose";
export interface IFuser extends mongoose.Document {
    username: string;
    passwordHash: string;
  }
  
  export const Userschema = new mongoose.Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
  });

const User = mongoose.model<IFuser>("User", Userschema);
export default User;