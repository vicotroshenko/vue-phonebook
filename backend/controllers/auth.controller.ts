import AuthService from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
  constructor(private authService: AuthService) {}
  async register(req: Request, res: Response) {
    const result = await this.authService.register(req.body);
    res.status(201).json(result);
  }
  async login(req: Request, res: Response) {
    const result = await this.authService.login(req.body);
    res.json(result);
  }

  async logout(req: Request, res: Response) {
    await this.authService.login(req.body.id);
    res.json({
      message: "Logout is successful"
    });
  }

  async currentUser(req: Request, res: Response) {
    const result = await this.authService.findUser(req.body.email);
    res.json(result);
  }
}

const authController = new AuthController(new AuthService());

export default authController;
