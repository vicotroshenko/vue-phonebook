import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HTTPStatus, HTTPMessage } from "../constants/http.constant";
import Auth from "../models/auth.model";
import { User } from "../types/user";
import { HttpError } from "../utils";
import { Types } from "mongoose";
const { SECRET_KEY } = process.env;

export default class AuthService {
  private async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(password, salt);
  }

  public createToken(email: string) {
    return jsonwebtoken.sign({ email }, SECRET_KEY || "", { expiresIn: "23h" });
  }

  public covertToken(token: string) {
    return jsonwebtoken.decode(token);
  }

  public async createUser(body: User) {
    return await Auth.create(body);
  }

  public async updateUser(id: Types.ObjectId, body: Partial<User>) {
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
    const token = this.createToken(createdUser.email);
    return this.updateUser(createdUser._id, { token });
  }

  public async login({ email, password }: Pick<User, "email" | "password">) {
    const user = await this.validateUser({ email, password });
    if (!user) {
      throw new HttpError(HTTPStatus.BAD_REQUEST, HTTPMessage.BAD_REQUEST);
    }

    const token = this.createToken(user.email);
    console.log("token: ", token);
    return await this.updateUser(user._id, {
      token,
    });
  }

  public async logout(id: Types.ObjectId) {
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

export const authService = new AuthService();
