import { createBrowserRouter } from "react-router-dom";

import { DetailsPage } from "../pages/details";
import { HomePage } from "../pages/home";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "details/:type/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);
