import { useEffect, useState } from "react";

import { Banner } from "../../components/banner";
import { InCartCourses } from "./in-cart-courses";

import { Loading } from "../../components/loading";
import { useUser } from "../../hooks/use-user";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-10">
      {/* Disconted Courses
       & DatePicker &
       Course PurchasedCourses 
      */}
      <div className="flex flex-col items-start justify-center gap-y-5">
        <Banner title="دوره های تسویه نشده" className="text-xl" height="h-10" />
        <InCartCourses courses={userData.cart} />
      </div>
    </div>
  );
};
