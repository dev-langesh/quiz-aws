import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../../models/questions";

const questionCountSlice = createSlice({
  name: "questionNumber",
  initialState: { value: 0 },
  reducers: {
    nextQuestion: (state) => {
      if (state.value < questions.length - 1) state.value += 1;
    },
  },
});

export const { nextQuestion } = questionCountSlice.actions;

export default questionCountSlice.reducer;

export const getQuestionNumber = (state) => state.questionNumber.value;
