import { Link, useLocation } from "react-router-dom";

import { cn } from "../../libs/utils";

export const PageCard = ({ page }) => {
  const { pathname } = useLocation();

  const isActive = pathname === page.to;

  return (
    <Link
      to={page.to}
      className={cn(
        "group w-full flex flex-row-reverse justify-end items-center gap-x-3 border-2 border-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-300 px-6 py-4 rounded-xl cursor-pointer transition",
        isActive &&
          "border-gray-100 dark:border-gray-300 bg-gray-100 hover:bg-gray-100 dark:bg-gray-300 text-gray-700 dark:text-gray-800 dark:hover:bg-gray-300"
      )}
    >
      {page.label}
      <div
        className={cn(
          "group-hover:text-primary text-gray-500",
          isActive && "text-primary dark:text-dark-primary"
        )}
      >
        {page.icon}
      </div>
    </Link>
  );
};
