import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
}

const UserSchema = new Schema({
  id: String,
  name: String
});

export const User = model<IUser>("User-fp", UserSchema);
