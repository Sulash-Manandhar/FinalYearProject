import { BiSolidUserCircle } from "react-icons/bi";
import { BsFillCupHotFill } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import { GiClothes, GiClothespin } from "react-icons/gi";
import { TbToolsOff } from "react-icons/tb";

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
    link: "/product",
    children: [
      {
        id: 3.1,
        label: "Apparels",
        icon: GiClothes,
        link: "/product/apparels",
      },
      {
        id: 3.2,
        label: "Drinkware",
        icon: BsFillCupHotFill,
        link: "/product/drinkware",
      },
      {
        id: 3.3,
        label: "Accessories",
        icon: TbToolsOff,
        link: "/product/accessories",
      },
    ],
  },
];
