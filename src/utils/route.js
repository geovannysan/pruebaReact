import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Auth from "../layout/Auth";
import ListaJson from "../layout/listas";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
  },
  {
    path:"/lista",
    element:<ListaJson/>
  }
]);