import { isValidObjectId } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils";
import { HTTPStatus } from "../constants/http.constant";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(new HttpError(HTTPStatus.BAD_REQUEST, `${id} is not valid id`));
  }

  next();
};

export default isValidId;
