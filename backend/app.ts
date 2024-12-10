import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppRouter from "./routes";
import { ErrorExpanded } from "types/error";

dotenv.config();

const app = express();
const router = new AppRouter(app);

app.use(cors());
app.use(express.json());

router.init();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: ErrorExpanded,
    req: Request,
    res: Response,
    next: NextFunction,
  ): any => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  },
);

export default app;
