import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../src/features/userSlice";

export default function Form() {
  const [state, setState] = useState({
    username: "",
    roll_no: "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  function changeHandler(e) {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!state.username || !state.roll_no) {
      setError("Fill All The Fields");
      setOpen(true);
      return;
    }

    setLoading(true);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/register`,
      state
    );

    const data = response.data;

    if (data.error) {
      setLoading(false);
      setError(data.error);
      setOpen(true);
      return;
    } else {
      dispatch(setUser(state));
      router.push("/quiz");
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <section className=" bg-gray-900 text-white h-screen w-screen flex items-center justify-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <main className="space-y-4 p-6 shadow-2xl shadow-black rounded">
          <h1 className="text-center text-2xl font-bold font-slab tracking-wide ">
            Register
          </h1>
          <form
            onSubmit={submitHandler}
            className="p-2  flex items-center justify-center flex-col space-y-5"
          >
            <Input
              changeHandler={changeHandler}
              name="username"
              placeholder="Name"
              value={state.username}
            />
            <Input
              changeHandler={changeHandler}
              name="roll_no"
              placeholder="Roll No"
              value={state.roll_no}
            />
            <Button>Submit</Button>
          </form>
        </main>
      )}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </section>
  );
}
