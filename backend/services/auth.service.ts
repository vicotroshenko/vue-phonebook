import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HTTPStatus,HTTPMessage } from "../constants/http.constant";
import Auth from "../models/auth.model";
import { User } from "../types/user";
import { HttpError } from "../utils";
const { SECRET_KEY = "" } = process.env;

export default class AuthService {
  private async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(password, salt);
  }

  public createToken(id: string) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: "23h" });
  }

  public covertToken(token: string) {
    return jwt.decode(token);
  }

  public async createUser(body: User) {
    return await Auth.create(body);
  }

  public async updateUser(id: string, body: Partial<User>) {
    return await Auth.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  public async findUser(email: string) {
    return await Auth.findOne({ email });
  }

  public async register(body: User) {
    const isUserExist = await this.findUser(body.email);
    if (isUserExist) {
      throw new HttpError(HTTPStatus.CONFLICT, HTTPMessage.CONFLICT_EMAIL);
    }
    const hashedPassword = await this.hashPassword(body.password);
    const user = { ...body, password: hashedPassword };
    const createdUser = await this.createUser(user);

    const token = this.createToken(createdUser.id);
    return this.updateUser(createdUser.id, { ...createdUser, token });
  }

  public async login({
    email,
    password,
  }: Pick<User, "email" | "password">) {
    const user = await this.validateUser({ email, password });
    if (!user) {
      throw new HttpError(HTTPStatus.BAD_REQUEST, HTTPMessage.BAD_REQUEST);
    }

    const token = this.createToken(user.id);
    return await this.updateUser(user.id, { ...user, token, password });
  }

  public async logout(id: string) {
    return await this.updateUser(id, { token: "" });
  }

  public async validateUser({
    email,
    password,
  }: Pick<User, "email" | "password">) {
    const isUserExist = await this.findUser(email);

    if (!isUserExist) return null;

    const passwordCompare = await bcrypt.compare(
      password,
      isUserExist.password,
    );

    if (passwordCompare) {
      return isUserExist;
    }
    return null;
  }
}
