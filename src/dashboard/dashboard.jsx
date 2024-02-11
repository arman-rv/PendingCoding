import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";

import { SidebarMenu } from "./sidebar-menu";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

import { getUserProfile } from "../core/services/api/user";

export const Dashboard = () => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user_info"],
    queryFn: () => getUserProfile(),
    staleTime: 5000,
  });

  if (isLoading)
    return (
      <div className="fixed inset-0 dark:bg-gray-800">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="fixed inset-0 dark:bg-gray-800">
        <Error />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center items-center gap-x-8 bg-[#EEEEEE] dark:bg-gray-800">
      {/* SideBar menu */}
      <SidebarMenu user={user} />
      {/* Datas */}
      <main className="w-full h-full pr-60">
        <Outlet context={[user, refetch]} />
      </main>
    </div>
  );
};
