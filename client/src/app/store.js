import { configureStore } from "@reduxjs/toolkit";
import questionCountReducer from "../features/questionCountSlice";
import markReducer from "../features/markSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    questionNumber: questionCountReducer,
    marks: markReducer,
    user: userReducer,
  },
});
