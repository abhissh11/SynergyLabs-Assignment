import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-xl">Page Not Found!</h1>
      <Link
        to="/"
        className="text-xl font-semibold bg-black text-white p-3 rounded-md"
      >
        Return to HomePage
      </Link>
    </div>
  );
}
