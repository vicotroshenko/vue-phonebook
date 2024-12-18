import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import AppRouter from "./routes";
import { ErrorExpanded } from "types/error";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { authService } from "./services/auth.service";
import passport from "passport";

const app = express();
const router = new AppRouter(app);

app.use(cors());
app.use(express.json());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string,
};

const jwtStrategy = new Strategy(opts, async (payload: JwtPayload, done) => {
  try {
    console.log(payload);
    const user = await authService.findUser(payload.email);
    console.log('user: ', user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});
passport.use("jwt", jwtStrategy);
app.use(passport.initialize());

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
