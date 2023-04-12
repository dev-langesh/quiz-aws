import { createSlice } from "@reduxjs/toolkit";

const markSlice = createSlice({
  name: "marks",
  initialState: { score: 0, correctAnswers: 0 },
  reducers: {
    increaseMark: (state) => {
      state.score += 5;
      state.correctAnswers += 1;
    },

    setResult: (state, action) => {
      state.score = action.payload.score;
      state.correctAnswers = action.payload.correctAnswers;
    },
  },
});

export const { increaseMark, setResult } = markSlice.actions;

export const getMarks = (state) => state.marks;

export default markSlice.reducer;
