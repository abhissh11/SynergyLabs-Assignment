import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-black text-white flex justify-around py-5 items-center">
      <h1 className="text-xl font-bold cursor-pointer">UsersBoard</h1>
      <div className="flex flex-row gap-10 items-center">
        <Link to="/">
          <h1 className="text-md font-semibold cursor-pointer hover:text-gray-300">
            Home
          </h1>
        </Link>
        <Link to="/create-user">
          <h2 className="text-md font-semibold cursor-pointer hover:text-gray-300 ">
            Create User
          </h2>
        </Link>
      </div>
    </div>
  );
}
