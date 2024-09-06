import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
