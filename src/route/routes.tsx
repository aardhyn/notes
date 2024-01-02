import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AuthRedirect } from "./AuthRedirect";
import SignIn from "./signIn";
import SignUp from "./signUp";
import Notes from "./notes";
import Home from "./notes/home";
import Note from "./notes/note";

const routes: RouteObject[] = [
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    element: <AuthRedirect />,
    path: "/",
    children: [
      {
        element: <Notes />,
        children: [
          { index: true, element: <Home /> },
          { path: "/:noteKey", element: <Note /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
