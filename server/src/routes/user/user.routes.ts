import express from "express";
import { isUserStartedQuiz, registerUser } from "./user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/is-started-quiz", isUserStartedQuiz);

export { router as userRouter };
