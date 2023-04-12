import { CircularProgress, Link } from "@mui/material";
import { convertLength } from "@mui/material/styles/cssUtils";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import QuizContainer from "../components/quiz/QuizContainer";
import { useSelector } from "react-redux";
import { getUser } from "../src/features/userSlice";
import axios from "axios";

export default function Quiz() {
  const [error, setError] = useState("");
  const effRan = useRef(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const user = useSelector(getUser);

  useEffect(() => {
    if (effRan.current) {
      if (!user.roll_no) {
        router.push("/");
      }

      async function validateUser() {
        if (!user.roll_no) {
          setError("Roll no not defined");
          return;
        }

        const payload = {
          roll_no: user.roll_no,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/is-started-quiz`,
          payload
        );

        const data = response.data;

        if (data.isStarted) {
          setError("You have already responded to this quiz");
        }
      }

      validateUser();

      setLoading(false);
    }

    return () => (effRan.current = true);
  }, []);

  return (
    <section className=" bg-gray-900 text-white h-screen w-screen flex items-center justify-center flex-col space-y-6 p-4">
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <main className="space-y-4 p-8 bg-gray-800 shadow-2xl shadow-black rounded flex flex-col items-center justify-center">
          {error ? (
            <div className="flex items-center flex-col space-y-6">
              <h1 className="font-bold text-center tracking-wider">{error}</h1>
              <Link className="no-underline" href="/result">
                <span className=" text-blue-600 hover:tracking-wider">
                  Result
                </span>
              </Link>
            </div>
          ) : (
            <QuizContainer />
          )}
        </main>
      )}
    </section>
  );
}
