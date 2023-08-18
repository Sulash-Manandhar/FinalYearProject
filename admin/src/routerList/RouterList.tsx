import Layout from "@src/layouts";
import ApparelList from "@src/pages/apparels/ApparelList";
import UserList from "@src/pages/user/UserList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import DrinkwareList from "@src/pages/drinkware/DrinkwareList";

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
          path: "/users/edit/:id",
          element: <div>Edit User</div>,
        },
        {
          path: "/product/apparels",
          element: <ApparelList />,
        },
        {
          path: "/product/apparels/add",
          element: <div>Add Apparels</div>,
        },
        {
          path: "/product/apparels/edit/:id",
          element: <div>Edit Apparels</div>,
        },
        {
          path: "/product/drinkware",
          element: <DrinkwareList />,
        },
        {
          path: "/product/accessories",
          element: <div>Accessories</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserList} />;
};

export default RouterList;
