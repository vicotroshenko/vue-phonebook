import { Application } from "express";
import contactsRouter from "./api/contacts";
import authRouter from "./api/auth";

class AppRouter {
  constructor(private app: Application) {}

  init(): void {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/api/contacts", contactsRouter);
    this.app.use("/api/auth", authRouter);
  }
}

export default AppRouter;
