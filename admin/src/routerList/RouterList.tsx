import Layout from "@src/layouts";
import ApparelList from "@src/pages/Apparels/ApparelList";
import UserList from "@src/pages/User/UserList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

const RouterList = () => {
  const browserList = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <div>Dashboard</div>,
        },
        {
          path: "/users",
          element: <UserList />,
        },

        {
          path: "/product/apparels",
          element: <ApparelList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserList} />;
};

export default RouterList;
