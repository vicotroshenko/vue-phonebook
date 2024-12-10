import { ContactsType } from "types/contacts";
import Contacts from "../models/contacts.model";

export default class ContactsService {
  async getAll() {
    return await Contacts.find().exec();
  }

  async getOne(id: string) {
    return await Contacts.findById(id).exec();
  }

  async createOne(newContact: Partial<ContactsType>) {
    return await Contacts.create(newContact);
  }

  async updateOne(id: string, newContact: Partial<ContactsType>) {
    return await Contacts.findByIdAndUpdate(id, newContact, {
      new: true,
    }).exec();
  }

  async deleteOne(id: string) {
    return await Contacts.findByIdAndDelete(id);
  }
}
