/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/home";
import { Infos } from "../pages/infos";

const router: any = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/infos",
    element: <Infos />,
  },
]);

export { router };
