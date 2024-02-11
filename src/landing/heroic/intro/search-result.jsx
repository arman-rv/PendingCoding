import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { Loading } from "../../../components/loading";

import { getAllCourses } from "../../../core/services/api/get-courses";
import { getAllBlogs } from "../../../core/services/api/get-blogs";
import { getAllTeachers } from "../../../core/services/api/get-teacher";

import defaultPic from "../../../assets/my-profile.jpg";
import { useQueries } from "react-query";
import { Error } from "../../../components/error";
import { Loader2 } from "lucide-react";

const backdrop = {
  initial: {
    y: "-40px",
    transition: { duration: 0.3 },
    opacity: 0,
  },
  start: {
    y: 0,
    transition: { duration: 0.3 },
    opacity: 1,
  },
  exit: {
    y: "-40px",
    transition: { duration: 0.3 },
    opacity: 0,
  },
};

export const SearchResult = () => {
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const value = searchParams.get("value")?.toLowerCase();

  const results = useQueries([
    {
      queryKey: ["teacher_find"],
      queryFn: () => getAllTeachers(),
      enabled: false,
      staleTime: 5000,
    },
    {
      queryKey: ["course_find"],
      queryFn: () => getAllCourses(),
      enabled: false,
      staleTime: 5000,
    },
    {
      queryKey: ["blog_find"],
      queryFn: () => getAllBlogs(),
      enabled: false,
      staleTime: 5000,
    },
  ]);
  useMemo(() => {
    if (value) {
      setIsLoading(true);
      const newArray = [];
      results?.[0].refetch().then((res) => {
        const objective = res?.data?.filter((t) =>
          t?.fullName?.toLowerCase().includes(value)
        );
        newArray.push(objective);
        results?.[1].refetch().then((res) => {
          const objectve = res?.data?.courseFilterDtos.filter((c) =>
            c?.title?.toLowerCase().includes(value)
          );
          newArray.push(objectve);
          results?.[2].refetch().then((res) => {
            const objective = res?.data?.news.filter((n) =>
              n?.title?.toLowerCase().includes(value)
            );
            newArray.push(objective);
          });
        });
      });

      setDatas(newArray);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    } else setDatas(null);
  }, [value]);

  return (
    datas && (
      <motion.div
        variants={backdrop}
        initial="initial"
        animate="start"
        exit="exit"
        className="bg-zinc-100 shadow-md dark:bg-gray-400 absolute z-50 border-2 border-gray-300/80 w-[clamp(360px,200%,800px)] rounded-md py-2 px-5"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex items-start justify-center gap-x-10">
            {datas?.[0]?.length === 0 ? (
              <div className="max-w-[200px]">
                <h1 className="text-gray-700">استادی یافت نشد</h1>
              </div>
            ) : (
              <div className="h-full w-full max-w-[200px] flex flex-col justify-center items-start gap-y-2">
                <div className="border-b-2 border-gray-300 dark:border-gray-700 w-full">
                  <h1 className="text-lg text-center text-gray-500 dark:text-gray-900">
                    اساتید
                  </h1>
                </div>
                {datas?.[0]?.map((teacher) => (
                  <div
                    key={teacher.teacherId}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={teacher.pictureAddress || defaultPic}
                      alt="TeacherProfile"
                    />
                    <Link
                      to={`/teachers/${teacher.teacherId}`}
                      className="text-base text-gray-700 hover:text-gray-900 transition-opacity"
                    >
                      {teacher.fullName || "Amir"}
                    </Link>
                  </div>
                ))}
                <Link
                  to={`/teachers?teacher_name=${value}`}
                  className="border-primary dark:border-dark-primary rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition text-sm p-2 self-center"
                >
                  مشاهده همه
                </Link>
              </div>
            )}
            {datas?.[1]?.length === 0 ? (
              <div className="max-w-[200px]">
                <h1 className="text-gray-700">دوره‌ای یافت نشد</h1>
              </div>
            ) : (
              <div className="w-full h-full max-w-[200px] flex flex-col justify-center items-start gap-y-2">
                <div className="border-b-2 border-gray-300 dark:border-gray-700 w-full">
                  <h1 className="text-lg text-center text-gray-500 dark:text-gray-900">
                    دوره‌ها
                  </h1>
                </div>
                {datas?.[1]?.map((course) => (
                  <div
                    key={course.courseId}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={course.tumbImageAddress || defaultPic}
                      alt="courseProfile"
                    />
                    <Link
                      to={`/courses/${course.courseId}`}
                      className="text-base text-gray-700 hover:text-gray-900 transition-opacity"
                    >
                      {course.title || "Amir"}
                    </Link>
                  </div>
                ))}
                <Link
                  to={`/courses?course_name=${value}`}
                  className="border-primary dark:border-dark-primary rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition text-sm p-2 self-center"
                >
                  مشاهده همه
                </Link>
              </div>
            )}
            {datas?.[2]?.length === 0 ? (
              <div className="max-w-[200px]">
                <h1 className="text-gray-700">بلاگی یافت نشد</h1>
              </div>
            ) : (
              <div className="w-full h-full max-w-[200px] flex flex-col justify-center items-start gap-y-2">
                <div className="border-b-2 border-gray-300 dark:border-gray-700 w-full">
                  <h1 className="text-lg text-center text-gray-500 dark:text-gray-900">
                    بلاگ
                  </h1>
                </div>
                {datas?.[2]?.slice(0.3).map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={blog.currentImageAddressTumb || defaultPic}
                      alt="blogProfile"
                    />
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-base text-gray-700 hover:text-gray-900 transition-opacity"
                    >
                      {blog.title || "Amir"}
                    </Link>
                  </div>
                ))}
                <Link
                  to={`/blogs?blog_name=${value}`}
                  className="border-primary dark:border-dark-primary rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition text-sm p-2 self-center"
                >
                  مشاهده همه
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.div>
    )
  );
};
