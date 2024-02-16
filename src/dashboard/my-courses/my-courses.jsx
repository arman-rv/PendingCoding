import { useEffect, useState } from "react";

import { Banner } from "../../components/banner";
import { Loading } from "../../components/loading";

import { BoughtCourses } from "./bought-courses";
import { useUser } from "../../hooks/use-user";

export const MyCourses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className=" py-10 px-10">
      {/* Disconted Courses
          & DatePicker &
          Course PurchasedCourses 
      */}
      <div className="flex flex-col items-start justify-center gap-y-5">
        <Banner
          title="دوره های خریداری شده"
          className="text-xl"
          height="h-10"
        />
        <BoughtCourses courses={userData.myCourses} />
      </div>
    </div>
  );
};
