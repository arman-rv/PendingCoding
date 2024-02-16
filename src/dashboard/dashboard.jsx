import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { SidebarMenu } from "./sidebar-menu";
import { Loading } from "../components/loading";
import { useUser } from "../hooks/use-user";

export const Dashboard = () => {
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading)
    return (
      <div className="fixed inset-0 dark:bg-gray-800">
        <Loading />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center items-center gap-x-8 bg-[#EEEEEE] dark:bg-gray-800">
      {/* SideBar menu */}
      <SidebarMenu user={userData.user} />
      {/* Datas */}
      <main className="w-full h-full pr-60">
        <Outlet />
      </main>
    </div>
  );
};
