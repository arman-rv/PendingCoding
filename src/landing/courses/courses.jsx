// import { useQuery } from "react-query";

import { CourseCard } from "./course-card";
import { Heading } from "../../components/heading";
import { Loading } from "../../components/loading";
// import { Error } from "../../components/error";

// import { getTopCourses } from "../../core/services/api/get-courses";
import { useEffect, useState } from "react";

import { courses } from "../../static-data/courses";

export const Courses = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const { data, isLoading, isError, refetch } = useQuery({
  //   queryKey: ["landingCourses"],
  //   queryFn: () => getTopCourses(3),
  //   staleTime: 5000,
  // });

  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Heading
        title="برترین دوره های مجموعه"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/courses"
      />
      <div className="py-10 flex flex-wrap items-center justify-center gap-y-12 gap-x-32">
        {courses?.slice(0, 3).map((course, index) => (
          <CourseCard
            key={index}
            index={index}
            course={course}
            // updateFn={refetch}
          />
        ))}
      </div>
    </div>
  );
};
