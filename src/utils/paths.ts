import {
  SquarePen,
  Bookmark,
  SquareLibrary,
  LifeBuoy,
  Settings,
  History,
} from "lucide-react";

const paths = [
  {
    url: "/editor",
    icon: SquarePen,
    title: "Create Posts",
  },
  {
    url: "/history",
    icon: History,
    title: "History",
  },
  {
    url: "/bookmarks",
    icon: Bookmark,
    title: "Bookmarks",
  },
  {
    url: "/",
    icon: SquareLibrary,
    title: "Resources",
  },
  {
    url: "/",
    icon: LifeBuoy,
    title: "Support",
  },
  {
    url: "/settings",
    icon: Settings,
    title: "Settings",
  },
  // {
  //   url: "/",
  //   icon: ,
  //   title: "",
  // },
];

export default paths;
