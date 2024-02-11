import { useQuery } from "react-query";

import { CourseCard } from "./course-card";
import { Heading } from "../../components/heading";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import { getTopCourses } from "../../core/services/api/get-courses";

export const Courses = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["landingCourses"],
    queryFn: () => getTopCourses(3),
    staleTime: 5000,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      <Heading
        title="برترین دوره های مجموعه"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/courses"
      />
      <div className="py-10 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-y-12 gap-x-32">
        {data?.slice(0, 3).map((course, index) => (
          <CourseCard
            key={index}
            index={index}
            course={course}
            updateFn={refetch}
          />
        ))}
      </div>
    </div>
  );
};
