import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../utils";

export const contactsSchema = new Schema(
  {
    name: {
      type: String,
      default: "anonyms",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

contactsSchema.post("save", (mongo) =>
  handleMongooseError({ data: 0, error: undefined, next: undefined, ...mongo }),
);

export const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).max(15).required(),
  favorite: Joi.boolean(),
  createdAt: Joi.string(),
});

export const updateSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(8),
  favorite: Joi.boolean(),
  createdAt: Joi.string(),
});

const Contacts = model("Contacts", contactsSchema);

export default Contacts;
