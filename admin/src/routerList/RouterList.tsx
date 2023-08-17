import Layout from "@src/layouts";
import UserList from "@src/pages/User/UserList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const RouterList = () => {
  const browserList = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
          path: "/products",
          element: <div>Products</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserList} />;
};

export default RouterList;
