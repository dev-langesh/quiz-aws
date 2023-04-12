import React from "react";

export default function OptionButton({ clickHandler, id, children }) {
  return (
    <button
      onClick={clickHandler}
      id={id}
      className="border border-transparent w-full bg-blue-700 hover:bg-transparent  hover:border-white hover:tracking-wider  py-2 px-8 transition-all duration-300"
    >
      {children}
    </button>
  );
}
