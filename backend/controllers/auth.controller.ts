import { User } from "types/user";
import AuthService from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
  constructor(private authService: AuthService) {}
  async register(req: Request, res: Response) {
    const result = await this.authService.register(req.body);
    console.log("result: ", result);
    res.status(201).json(result);
  }
  async login(req: Request, res: Response) {
    const result = await this.authService.login(req.body);
    res.json(result);
  }

  async logout(req: Request, res: Response) {
    const { _id } = req.user as User;
    if (!_id) {
      res.json({
        message: "Logout is unsuccessful",
      });
      return;
    }
    await this.authService.logout(_id);
    res.json({
      message: "Logout is successful",
    });
  }

  async currentUser(req: Request, res: Response) {
    const { email } = req.user as User;
    const result = await this.authService.findUser(email);
    res.json(result);
  }
}

const authController = new AuthController(new AuthService());

export default authController;
