import { Request, Response } from "express";
import ContactsService from "../services/contacts.service";
import { HTTPMessage, HTTPStatus } from "../constants/http.constant";
import { HttpError } from "../utils";
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  async getAllContacts(req: Request, res: Response) {
    const result = await this.contactsService.getAll();
    res.json(result);
  }

  async getOneById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.contactsService.getOne(id);
    if (!result) {
      throw new HttpError(HTTPStatus.NOT_FOUND, HTTPMessage.NOT_FOUND);
    }
    res.json(result);
  }

  async createNewContact(req: Request, res: Response) {
    const { body } = req;
    const createdContact = await this.contactsService.createOne(body);
    res.status(201).json(createdContact);
  }

  async updateContactById(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const updatedContact = await this.contactsService.updateOne(id, body);
    res.status(200).json(updatedContact);
  }

  async deleteContactById(req: Request, res: Response) {
    const { id } = req.params;
    await this.contactsService.deleteOne(id);
    res.json({
      message: "Contact has deleted successfully",
    });
  }
}

const contactsController = new ContactsController(new ContactsService());

export default contactsController;
