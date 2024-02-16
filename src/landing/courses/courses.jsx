// import { useQuery } from "react-query";

import { CourseCard } from "./course-card";
import { Heading } from "../../components/heading";
import { Loading } from "../../components/loading";
// import { Error } from "../../components/error";

// import { getTopCourses } from "../../core/services/api/get-courses";
import { useEffect, useState } from "react";

import ReactImage from "../../assets/REACTjs.webp";
import SQL from "../../assets/sql.jpg";
import CSharp from "../../assets/cSharp.jpg";

const courses = [
  {
    courseId: 1,
    title: "ری اکت",
    tumbImageAddress: ReactImage,
    likeCount: 3,
    dissLikeCount: 1,
    userIsLiked: 1,
    userIsDissLiked: 0,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
  },
  {
    courseId: 2,
    title: "SQL",
    tumbImageAddress: SQL,
    likeCount: 3,
    dissLikeCount: 1,
    userIsLiked: 1,
    userIsDissLiked: 0,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
  },
  {
    courseId: 3,
    title: "C#",
    tumbImageAddress: CSharp,
    likeCount: 3,
    dissLikeCount: 1,
    userIsLiked: 1,
    userIsDissLiked: 0,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
  },
];

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
