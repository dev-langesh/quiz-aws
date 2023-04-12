import express from "express";
import {
  getScore,
  isUserStartedQuiz,
  registerUser,
  setScore,
} from "./user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/is-started-quiz", isUserStartedQuiz);
router.post("/set-score", setScore);
router.get("/get-score", getScore);

export { router as userRouter };
