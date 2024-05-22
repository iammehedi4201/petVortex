import cookieParser from "cookie-parser";
import cors from "cors";
import Express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import router from "./app/routes/routes";
import prisma from "./Shared/prisma";

const app: Application = Express();

//! Middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

//:parser
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

//! Routes Middleware
app.use("/api", router);

//! Error Handler Middleware
app.use(globalErrorHandler);

//! Not Found Route middleware
app.use(notFoundHandler);

export default app;
