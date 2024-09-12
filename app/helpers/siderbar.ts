import { images } from "@/app/constants";

export const SIDEBAR_LINKS = [
  // {
  //   name: "Items",
  //   href: "/users/items",
  //   icon: images.inventoryIcon,
  //   iconActive: images.inventoryActiveIcon,
  //   pov: ["USER"],
  //   active: "items",
  // },
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: images.inventoryIcon,
    iconActive: images.inventoryActiveIcon,
    pov: ["ADMIN"],
    active: "inventory",
  },
  // {
  //   name: "Users",
  //   href: "/admin/users",
  //   icon: images.usersIcon,
  //   iconActive: images.usersActiveIcon,
  //   pov: ["ADMIN"],
  //   active: "users",
  // },
  // {
  //   name: "Claims",
  //   href: "/admin/claims",
  //   icon: images.usersIcon,
  //   iconActive: images.usersActiveIcon,
  //   pov: ["ADMIN"],
  //   active: "claims",
  // },
];

export const ACTION_LINKS = [
  // {
  //   name: "Settings",
  //   href: "/admin/settings",
  //   icon: images.settingsIcon,
  //   iconActive: images.settingsActiveIcon,
  //   pov: ["ADMIN"],
  //   active: "settings",
  // },
  {
    name: "Logout",
    href: "/logout",
    icon: images.logoutIcon,
    iconActive: images.logoutIcon,
    pov: ["USER", "ADMIN"],
    active: "logout",
  },
];
