import React from "react";

export default function Button({ type, children }) {
  return (
    <button
      className="bg-blue-700 w-full p-2 hover:bg-transparent border border-transparent hover:border-blue-700 hover:text-blue-700 hover:tracking-wider transition-all duration-300"
      type={type}
    >
      {children}
    </button>
  );
}
