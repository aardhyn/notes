import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy } from "react";
import { AuthRedirect } from "./AuthRedirect";
import SignIn from "./signIn";
import SignUp from "./signUp";

const routes: RouteObject[] = [
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    element: <AuthRedirect />,
    path: "/",
    children: [
      {
        Component: lazy(() => import("./notes")),
        children: [
          { index: true, Component: lazy(() => import("./notes/home")) },
          { path: "/:noteKey", Component: lazy(() => import("./notes/note")) },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
