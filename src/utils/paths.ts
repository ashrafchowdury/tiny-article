import {
  SquarePen,
  Bookmark,
  SquareLibrary,
  LifeBuoy,
  Settings,
  History,
} from "lucide-react";

const paths = {
  service: [
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
      url: "/settings",
      icon: Settings,
      title: "Settings",
    },
  ],
  resource: [
    {
      url: "#resources",
      icon: SquareLibrary,
      title: "Resources",
    },
    {
      url: "/https://github.com/ashrafchowdury/tiny-article",
      icon: LifeBuoy,
      title: "Support",
    },
  ],
};

export default paths;
