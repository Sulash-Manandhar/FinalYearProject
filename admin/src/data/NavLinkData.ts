import { BiSolidUserCircle } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { GiClothes, GiClothespin } from "react-icons/gi";

export const NavLinkData = [
  {
    id: 1,
    label: "Dashboard",
    icon: GiClothespin,
    link: "/",
  },
  {
    id: 2,
    label: "Users",
    icon: BiSolidUserCircle,
    link: "/users",
  },
  {
    id: 3,
    label: "Products",
    icon: FaProductHunt,
    link: "/products",
    children: [
      {
        id: 3.1,
        label: "Apparels",
        icon: GiClothes,
        link: "/products/apparels",
      },
    ],
  },
];
