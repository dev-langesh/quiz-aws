import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarks, setResult } from "../src/features/markSlice";

export default function Result() {
  const result = useSelector(getMarks);
  const [loading, setLoading] = useState(true);

  const effRan = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!effRan.current) {
      const id = window.localStorage.getItem("id");

      async function getMarks() {
        const response = await fetch(`/api/get-result/${id}`, {
          method: "GET",
        });

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

      getMarks();

      async function postMarks() {
        const response = await fetch(`/api/set-result/${id}`, {
          method: "PUT",
          body: JSON.stringify(result),
        });

        const data = await response.json();
      }

      return () => (effRan.current = true);
    }
  }, []);

  return (
    <section className=" bg-gray-900 text-white h-screen w-screen flex items-center justify-center flex-col space-y-6 text-center">
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
    </section>
  );
}
