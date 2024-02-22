import { Link, useLocation } from "react-router-dom";
import { LogOut, UserCog } from "lucide-react";

import { PageCard } from "./page-card";
import { pages } from "./pages";

import { cn } from "../../libs/utils";

import defaultProfile from "../assets/my-profile.jpg";

export const SidebarMenu = ({ user }) => {
  const { pathname } = useLocation();

  const fullName = `${user?.email}`.split("@")[0];

  return (
    <div className="w-[250px] fixed right-0 h-full bg-white dark:bg-gray-700 border-l-2 border-l-gray-100 dark:border-l-gray-700 dark:shadow-gray-400 dark:shadow-md shadow-lg py-10">
      <div className="flex flex-col justify-center items-center gap-y-10 my-5">
        <h1 className="text-xl text-gray-700 dark:text-gray-200 text-center">
          {fullName}
        </h1>
        <img
          className="w-20 h-20 rounded-full m-auto"
          src={user?.currentPictureAddress || defaultProfile}
          alt="UserProfile"
        />
      </div>
      <div className="flex flex-col items-center justify-between h-4/5">
        <div className="flex flex-col justify-center items-center gap-y-2">
          {pages.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Link
            to="/dashboard/edit-profile"
            className={cn(
              "group w-full flex flex-row-reverse justify-end items-center gap-x-3 border-2 border-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300 px-6 py-4 rounded-xl cursor-pointer transition",
              pathname === "/dashboard/edit-profile" &&
                "border-gray-100 dark:border-gray-300 bg-gray-100 hover:bg-gray-100 dark:bg-gray-300 text-gray-700 dark:text-gray-800 dark:hover:bg-gray-300"
            )}
          >
            ویرایش پروفایل
            <div
              className={cn(
                "group-hover:text-primary text-gray-500",
                pathname === "/dashboard/edit-profile" &&
                  "text-primary dark:text-dark-primary"
              )}
            >
              <UserCog className="h-6 w-6" />
            </div>
          </Link>
          <Link
            to="/"
            className="group w-full flex flex-row-reverse justify-end items-center gap-x-3 border-2 border-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300 px-6 py-4 rounded-xl cursor-pointer transition"
          >
            خروج
            <div className="group-hover:text-primary text-gray-500">
              <LogOut className="h-6 w-6" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
