import express, { Router } from "express";
import { addSchema, updateSchema } from "../../models/contacts.model";
import { ctrlWrapper, isValidId, validateBody } from "../../middlewares";
import contactsController from "../../controllers/contacts.controller";
import auth from "../../middlewares/auth.middleware";

const contactsRouter: Router = express.Router();

contactsRouter.get(
  "/",
  auth,
  ctrlWrapper(contactsController.getAllContacts.bind(contactsController)),
);

contactsRouter.get(
  "/:id",
  auth,
  isValidId,
  ctrlWrapper(contactsController.getOneById.bind(contactsController)),
);

contactsRouter.post(
  "/",
  auth,
  validateBody(addSchema),
  ctrlWrapper(contactsController.createNewContact.bind(contactsController)),
);

contactsRouter.put(
  "/:id",
  auth,
  isValidId,
  validateBody(updateSchema),
  ctrlWrapper(contactsController.updateContactById.bind(contactsController)),
);

contactsRouter.delete(
  "/:id",
  auth,
  isValidId,
  ctrlWrapper(contactsController.deleteContactById.bind(contactsController)),
);

export default contactsRouter;
