import express, { type Request, type Response } from "express";
import cors from "cors";
import { userRouter } from "./modules/user/user.route";
import globalErrorHandler from "./errors/globalErrorHandler";
import { authRouter } from "./modules/auth/auth.router";
import requestLogger from "./middleware/requestLogger";
import cookieParser from "cookie-parser";
import { issuesRouter } from "./modules/issues/issues.route";
const app = express();

// midlleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is the server response",
  });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/issue", issuesRouter);

app.use(globalErrorHandler);

export default app;
