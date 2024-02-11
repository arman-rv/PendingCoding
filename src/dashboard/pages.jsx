import { Book, Heart, Home } from "lucide-react";

const pages = [
  {
    id: "home",
    label: "داشبورد",
    icon: <Home className="h-6 w-6" />,
    to: "/dashboard",
  },
  {
    id: "my-courses",
    label: "دوره های من",
    icon: <Book className="h-6 w-6" />,
    to: "/dashboard/my-courses",
  },
  {
    id: "favorites",
    label: "علاقه مندی ها",
    icon: <Heart className="h-6 w-6" />,
    to: "/dashboard/favorites",
  },
];

export { pages };
