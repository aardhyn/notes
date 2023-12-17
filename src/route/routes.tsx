import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy } from "react";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: lazy(() => import("./Layout")),
    children: [
      {
        index: true,
        Component: lazy(() => import("./home")),
      },
      {
        path: "/:noteKey",
        Component: lazy(() => import("./note")),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
