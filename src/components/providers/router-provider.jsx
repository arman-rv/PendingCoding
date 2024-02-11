import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routers } from "../routes/routes";

const router = createBrowserRouter(routers);

function RouteProvider() {
  return <RouterProvider router={router} />;
}

export { RouteProvider };
