import React from "react";
import AppLayout from "./AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import CreateUserPage from "./pages/CreateUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/create-user",
        element: <CreateUserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
