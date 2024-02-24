// import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Loading } from "./loading";
// import { Error } from "./error";

import { getPersianNumbers } from "../../libs/get-persian-numbers";
// import { getTopCourses } from "../core/services/api/get-courses";

import { courses } from "../static-data/courses";


export const NewCourseCard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <>
      {courses?.slice(0,3).map((course) => (
        <div key={course.courseId} className="py-2">
          <Link
            to={`/courses/${course.courseId}`}
            className="flex items-center justify-center gap-5 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-700 transition px-5 py-2 rounded-xl"
          >
            <img
              src={course.tumbImageAddress || CSharp}
              alt="courseImage"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-y-2">
              <h2 className="text-gray-700 dark:text-gray-200">
                {course.title}
              </h2>
              <span className="text-xs text-white bg-[#818CF8] dark:bg-[#6770c5] py-[2px] px-4 rounded-full">
                {`${getPersianNumbers(course.cost, false)} تومان`}
              </span>
              <h2 className="text-gray-500 dark:text-gray-300/80 text-xs">
                {course.teacherName}
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
