import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "@/App.tsx";
import { Home } from "@/components/pages/Home";
import { Counter } from "@/components/pages/Counter";
import { Todo } from "@/components/pages/Todo";
import "common/css/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
