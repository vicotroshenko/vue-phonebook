import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../utils";

export const authSchema = new Schema(
  {
    name: {
      type: String,
      default: "anonyms",
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    id: {
      type: Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true },
);

authSchema.post("save", (mongo) =>
  handleMongooseError({ data: 0, error: undefined, next: undefined, ...mongo }),
);

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const Auth = model("Auth", authSchema);

export default Auth;
