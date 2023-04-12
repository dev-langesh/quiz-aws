import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./routes/user/user.routes";

const app: Application = express();

// Cors
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/user", userRouter);

export { app };
