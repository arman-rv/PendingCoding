import { MoreVertical } from "lucide-react";
import { useState } from "react";

import { cn } from "../../libs/utils";

export const DropDownMenu = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MoreVertical
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-5 h-5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition cursor-pointer",
          className
        )}
      />
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "absolute bg-gray-50 border-2 border-gary-200 shadow-sm rounded-lg px-5 py-2 z-50",
          !isOpen && "hidden"
        )}
      >
        <div className="flex flex-col justify-center items-center gap-y-2">
          {children}
        </div>
      </div>
    </>
  );
};
