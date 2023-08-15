import Home from "@src/pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const RouterList = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterList;
