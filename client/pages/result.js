import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarks, setResult } from "../src/features/markSlice";
import { getUser } from "../src/features/userSlice";
import axios from "axios";

export default function Result() {
  const result = useSelector(getMarks);
  const [loading, setLoading] = useState(true);

  const effRan = useRef(false);

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!effRan.current) {
      async function getMarks() {
        const payload = {
          roll_no: user.roll_no,
          score: result.score,
          correct_answers: result.correctAnswers,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/is-started-quiz`,
          payload
        );

        const data = await response.json();

        if (!data.score) postMarks();
        else {
          dispatch(
            setResult({
              score: data.score,
              correctAnswers: data.correctAnswers,
            })
          );
        }

        setLoading(false);
      }

      // getMarks();

      async function postMarks() {
        const payload = {
          roll_no: user.roll_no,
          score: result.score,
          correct_answers: result.correctAnswers,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/set-score`,
          payload
        );

        const data = response.data;

        setLoading(false);

        console.log(data);
      }

      postMarks();

      return () => (effRan.current = true);
    }
  }, []);

  return (
    <section className="relative bg-gray-900 text-white h-screen w-screen flex items-center justify-center flex-col space-y-6 text-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <main className="space-y-4 p-8 shadow-2xl bg-gray-800 shadow-black rounded flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold font-slab tracking-widest">
              Congrats!
            </h1>
            <p>You have completed the quiz successfully</p>
            <p>Correct Answers : {result.correctAnswers}</p>
            <p>Score : {result.score}</p>
          </main>
        </>
      )}

      <div className="absolute bottom-6 right-6">
        <a
          className="px-6 py-2 bg-blue-500 text-white"
          href="https://www.langesh.in"
        >
          About the dev
        </a>
      </div>
    </section>
  );
}
