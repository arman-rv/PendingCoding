import { useMemo } from "react";
import {
  Clock,
  Eye,
  LayoutDashboard,
  MessagesSquare,
  Tags,
  ThumbsUp,
  User2,
  BookOpen,
  ThumbsDown,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ToolTip } from "../components/tool-tip";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import defaultCourseImage from "../assets/python.jpg";

const status = {
  "درحال برگذاری": <BookOpen className="text-gray-600 dark:text-gray-300" />,
};
export const HorizontalCard = ({ course, reservedCourses }) => {
  const isPurchased = useMemo(
    () => reservedCourses?.find((c) => c.courseId === course?.courseId),
    [reservedCourses, course?.courseId]
  );

  const lastUpdate = new Date(course?.lastUpdate)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const months = [
    "فروردين",
    "ارديبهشت",
    "خرداد",
    "تير",
    "مرداد",
    "شهريور",
    "مهر",
    "آبان",
    "آذر",
    "دي",
    "بهمن",
    "اسفند",
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg xl:px-10 pt-0 pb-5 xl:py-5">
      <img
        loading="lazy"
        src={course.tumbImageAddress || defaultCourseImage}
        alt="CourseImage"
        className="w-full h-full object-fill xl:w-[500px] xl:h-48 rounded-xl"
      />
      <div className="flex flex-col justify-start items-center gap-y-5 w-full px-10">
        <div className="self-center xl:self-start mt-5 xl:mt-0">
          <h1 className="xl:text-lg text-2xl text-gray-600 dark:text-gray-200 mr-5">
            {course.title}
          </h1>
        </div>
        <div className="w-full px-5 flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <User2 className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.currentRegistrants, false)}
          </span>
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-4">
            <LayoutDashboard className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {course.technologyList}
          </span>
          <ToolTip name="آخرین بروزرسانی">
            <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
              <Clock className="h-4 w-4 text-primary dark:text-gray-200/80" />
              {`${getPersianNumbers(lastUpdate?.[2], true)} ${
                months[lastUpdate?.[1] - 1]
              } ${getPersianNumbers(lastUpdate?.[0], true)}`}
            </span>
          </ToolTip>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <MessagesSquare className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.commandCount, false)}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <ThumbsUp className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.likeCount, false)}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <ThumbsDown className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.dissLikeCount, false)}
          </span>
        </div>
        <span className="w-full">
          <p className="text-gray-500 dark:text-gray-200/80 text-right line-clamp-2">
            {course.describe}
          </p>
        </span>
        <div className="flex flex-col md:flex-row justify-start w-full items-center px-3 py-2">
          <ToolTip name={course?.statusName}>
            {status[course?.statusName]}
          </ToolTip>
          <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
            <h2 className="text-gray-600 dark:text-gray-200 text-base">
              {course.teacherName}
            </h2>
            <span className="bg-[#818CF8] dark:bg-[#6770c5] rounded-full px-2 py-1">
              <h5 className="text-gray-100 dark:text-gray-200 text-sm">
                {course.levelName}
              </h5>
            </span>
          </span>
        </div>
        <div className="w-full border border-gray-300 dark:border-gray-500" />
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span>
            <h5 className="text-gray-600 dark:text-gray-200/80 flex justify-center items-center gap-x-1">
              قیمت :
              <p className="text-primary dark:text-gray-200">
                {getPersianNumbers(course.cost, false)}
              </p>
              تومان
            </h5>
          </span>
          {isPurchased ? (
            <Link
              to={`/courses/${course.courseId}`}
              className="flex justify-center items-center gap-x-1 text-gray-500 dark:text-gray-200 dark:hover:text-gray-200/80 hover:text-gray-800 transition"
            >
              <Eye />
              مشاهده دوره
            </Link>
          ) : (
            <Link
              to={`/courses/${course.courseId}`}
              className="flex justify-center items-center gap-x-1 text-gray-500 dark:text-gray-200 dark:hover:text-gray-200/80 hover:text-gray-800 transition"
            >
              <Tags />
              ثبت نام کنید
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
