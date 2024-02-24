import { useMemo } from "react";
import {
  Clock,
  Eye,
  Tags,
  User2,
  MonitorPlay,
  BookOpenCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { rateCourse } from "../core/services/api/get-courses";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import { StarRate } from "../components/starRate";
import { ToolTip } from "../components/tool-tip";

import defaultCourseImage from "../assets/python.jpg";
import { useUser } from "../hooks/use-user";

const status = {
  "درحال برگذاری": <MonitorPlay className="text-gray-600 dark:text-gray-300" />,
  "درحال ثبت نام": (
    <BookOpenCheck className="text-gray-600 dark:text-gray-300" />
  ),
};

export const VerticalCard = ({ course }) => {
  const { userData } = useUser();
  const isPurchased = useMemo(
    () =>
      userData.cart.find((c) => c.courseId === course.courseId) ||
      userData.myCourses.find((c) => c.courseId === course.courseId),
    [userData.cart, userData.myCourses, course]
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
    <div className="w-11/12 max-w-[320px] flex flex-col items-center justify-center gap-y-5 bg-gray-100 dark:bg-gray-600 rounded-t-3xl rounded-b-lg self-center justify-self-center">
      <img
        loading="lazy"
        src={course.tumbImageAddress || defaultCourseImage}
        alt="CourseImage"
        className="object-fill rounded-t-xl w-full h-60"
      />
      <div className="self-start">
        <h1 className="text-xl sm:text-lg text-gray-600 dark:text-gray-200 mr-5">
          {course.title}
        </h1>
      </div>
      <div className="w-full px-4 flex flex-wrap justify-between items-center gap-5">
        <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
          <User2 className="h-4 w-4 text-primary dark:text-gray-200/80" />
          {getPersianNumbers(course.currentRegistrants, false)}
        </span>
        <ToolTip name="آخرین بروزرسانی">
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <Clock className="h-4 w-4 text-primary dark:text-gray-200/80" />
            {`${getPersianNumbers(lastUpdate?.[2], true)} ${
              months[lastUpdate?.[1] - 1]
            } ${getPersianNumbers(lastUpdate?.[0], true)}`}
          </span>
        </ToolTip>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-between w-full items-center gap-5 px-5 py-2">
        <div className="flex  items-center justify-center">
          <ToolTip name={course?.statusName}>
            {status[course?.statusName]}
          </ToolTip>
          <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
            <h2 className="text-gray-600 dark:text-gray-200/80 text-base">
              {course.teacherName}
            </h2>
            <span className="bg-[#818CF8] dark:bg-[#6770c5] rounded-full px-2 py-1">
              <h5 className="text-white dark:text-white/80 text-sm">
                {course.levelName}
              </h5>
            </span>
          </span>
        </div>
        <span className="flex flex-row-reverse items-center justify-center gap-x-1">
          <StarRate
            id="CourseId"
            data={course}
            queryKey="courses"
            rateFn={rateCourse}
          />
        </span>
      </div>
      <div className="w-5/6 border border-gray-300 dark:border-gray-400" />
      <div className="w-full flex flex-wrap justify-center gap-4 items-center pb-6 sm:px-4 sm:pt-2 sm:pb-7">
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
            className="flex justify-center items-center gap-x-1 text-primary/80 dark:text-gray-200/80 hover:text-primary  dark:hover:text-gray-100 transition"
          >
            <Eye />
            مشاهده دوره
          </Link>
        ) : (
          <Link
            to={`/courses/${course.courseId}`}
            className="flex justify-center items-center gap-x-1 text-primary/80 dark:text-gray-200/80 hover:text-primary  dark:hover:text-gray-100 transition"
          >
            <Tags className="rotate-90" />
            ثبت نام کنید
          </Link>
        )}
      </div>
    </div>
  );
};
