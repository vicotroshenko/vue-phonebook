import express, { Router } from "express";
import { addSchema, updateSchema } from "../../models/contacts.model";
import { ctrlWrapper, isValidId, validateBody } from "../../middlewares";
import contactsController from "../../controllers/contacts.controller";

const contactsRouter: Router = express.Router();

contactsRouter.get(
  "/",
  ctrlWrapper(contactsController.getAllContacts.bind(contactsController)),
);

contactsRouter.get(
  "/:id",
  isValidId,
  ctrlWrapper(contactsController.getOneById.bind(contactsController)),
);

contactsRouter.post(
  "/",
  validateBody(addSchema),
  ctrlWrapper(contactsController.createNewContact.bind(contactsController)),
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateSchema),
  ctrlWrapper(contactsController.updateContactById.bind(contactsController)),
);

contactsRouter.delete(
  "/:id",
  isValidId,
  ctrlWrapper(contactsController.deleteContactById.bind(contactsController)),
);

export default contactsRouter;
