import { useQuery } from "react-query";

import { getUserCourses } from "../../core/services/api/user";

import { Banner } from "../../components/banner";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import { BoughtCourses } from "./bought-courses";

export const MyCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my_courses"],
    queryFn: () => getUserCourses(),
    staleTime: 5000,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
console.log(data)
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
        <BoughtCourses courses={data?.listOfMyCourses} />
      </div>
    </div>
  );
};
