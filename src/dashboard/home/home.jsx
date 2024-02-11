import { useQuery } from "react-query";

import { Banner } from "../../components/banner";
import { InCartCourses } from "./in-cart-courses";

import { getUserReservedCourses } from "../../core/services/api/user";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

export const Home = () => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reserved_courses"],
    queryFn: () => getUserReservedCourses(),
    staleTime: 5000,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="p-10">
      {/* Disconted Courses
       & DatePicker &
       Course PurchasedCourses 
      */}
      <div className="flex flex-col items-start justify-center gap-y-5">
        <Banner title="دوره های تسویه نشده" className="text-xl" height="h-10" />
        <InCartCourses courses={courses} />
      </div>
    </div>
  );
};
