import { IoIosFootball } from "react-icons/io";
import { IconType } from "react-icons";
import { IoBuildSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

interface SecondaryNavType {
  name: string;
  icon: IconType; // component reference
  path:string;
}

export const secondaryNavConstants: SecondaryNavType[] = [
  {
    name: "Football",
    icon: IoIosFootball, // ✅ component
    path:"/"
  },
  {
    name: "Custom Odd Builder",
    icon: IoBuildSharp, // ✅ component
    path:"/builder"
  }
];
