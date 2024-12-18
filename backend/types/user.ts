import { Types } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt?: NativeDate;
  _id?: Types.ObjectId;
  token?: string;
}