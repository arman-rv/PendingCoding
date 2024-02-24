import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Tags,
  ThumbsUp,
  ThumbsDown,
  MonitorPlay,
  BookOpenCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import { useUser } from "../../hooks/use-user";
import { useModal } from "../../hooks/use-modal-store";

import { StarRate } from "../../components/starRate";
import { ToolTip } from "../../components/tool-tip";

import defaultCourseImage from "../../assets/python.jpg";
import {
  deleteCourseLike,
  dissLikeCourse,
  likeCourse,
  rateCourse,
} from "../../core/services/api/get-courses";

const status = {
  "درحال برگذاری": <MonitorPlay className="text-gray-600 dark:text-gray-300" />,
  "درحال ثبت نام": (
    <BookOpenCheck className="text-gray-600 dark:text-gray-300" />
  ),
};

//Add // updateFn
export const CourseCard = ({ course, index }) => {
  const [isPending, setIsPending] = useState(false);
  const { userData } = useUser();
  const { onOpen } = useModal();

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

  const handleLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      if (course?.userIsLiked)
        await deleteCourseLike(course?.courseId).then(() => {
          toast.success("لایک پس گرفته شد");
          // updateFn();
        });
      else
        await likeCourse(course?.courseId).then(() => {
          toast.success("دوره لایک شد");
          // updateFn();
        });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };
  const handleDisLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      await dissLikeCourse(course?.courseId).then(() => {
        toast.success("دوره دیسلایک شد");
        // updateFn();
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={index === 1 && "2xl:mt-24"}>
      <div className="w-11/12 max-w-sm sm:w-[400px] sm:max-w-full mx-auto flex flex-col items-center justify-center gap-5 bg-gray-100 dark:bg-gray-600 dark:shadow-gray-700 dark:shadow-lg shadow-lg rounded-t-3xl rounded-b-lg">
        <img
          src={course?.tumbImageAddress || defaultCourseImage}
          alt="CourseImage"
          className="object-fill rounded-t-xl w-full h-72"
        />
        <div className="self-start">
          <h1 className="text-2xl sm:text-lg text-gray-600 dark:text-gray-200 mr-5">
            {course?.title}
          </h1>
        </div>
        <div className="w-full px-5 flex justify-between items-center">
          <button
            onClick={handleLike}
            disabled={isPending}
            className="flex items-center justify-center gap-2  dark:text-dark-primary text-primary hover:text-primary/80 dark:hover:text-dark-primary/80 transition"
          >
            <ThumbsUp
              className={cn(
                "h-5 w-5 md:h-5 md:w-5",
                +course?.userIsLiked && "fill-primary dark:fill-dark-primary"
              )}
            />
            <p className="text-xl md:text-lg dark:text-gray-300 text-gray-500">
              {getPersianNumbers(course?.likeCount)}
            </p>
          </button>
          <button
            onClick={handleDisLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition"
          >
            <ThumbsDown
              className={cn(
                "h-5 w-5 md:h-5 md:w-5",
                +course?.userIsDissLiked &&
                  "fill-destructive dark:fill-dark-destructive"
              )}
            />
            <p className="text-xl md:text-lg dark:text-gray-300 text-gray-500">
              {getPersianNumbers(course?.dissLikeCount)}
            </p>
          </button>
          <div className="hidden sm:flex justify-between items-center">
            <ToolTip name="آخرین بروزرسانی">
              <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
                <Clock className="h-4 w-4 text-primary dark:text-gray-200/80" />
                {`${getPersianNumbers(lastUpdate?.[2], true)} ${
                  months[lastUpdate?.[1] - 1]
                } ${getPersianNumbers(lastUpdate?.[0], true)}`}
              </span>
            </ToolTip>
            <span className="flex flex-row-reverse items-center justify-center gap-x-1">
              <StarRate
                data={course}
                queryKey="courses"
                id="CourseId"
                rateFn={rateCourse}
              />
            </span>
          </div>
        </div>
        <div className="w-full px-5 flex sm:hidden justify-between items-center">
            <ToolTip name="آخرین بروزرسانی">
              <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
                <Clock className="h-4 w-4 text-primary dark:text-gray-200/80" />
                {`${getPersianNumbers(lastUpdate?.[2], true)} ${
                  months[lastUpdate?.[1] - 1]
                } ${getPersianNumbers(lastUpdate?.[0], true)}`}
              </span>
            </ToolTip>
            <span className="flex flex-row-reverse items-center justify-center gap-x-1">
              <StarRate
                data={course}
                queryKey="courses"
                id="CourseId"
                rateFn={rateCourse}
              />
            </span>
          </div>
        <div className="flex justify-start w-full items-center px-5 py-2">
          <ToolTip name={course?.statusName}>
            {status[course?.statusName]}
          </ToolTip>
          <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
            <h2 className="text-gray-600 dark:text-gray-200/80 text-base">
              {course?.teacherName}
            </h2>
            <span className="bg-[#818CF8] dark:bg-[#6770c5] rounded-full px-2 py-1">
              <h5 className="text-white dark:text-white/80 text-sm">
                {course?.levelName}
              </h5>
            </span>
          </span>
        </div>
        <div className="w-5/6 border border-gray-300 dark:border-gray-400" />
        <div className="w-full flex justify-between items-center px-4 pt-2 pb-7">
          <span>
            <h5 className="text-gray-600 dark:text-gray-200/80 flex justify-center items-center gap-x-1">
              قیمت :
              <p className="text-primary dark:text-gray-200">
                {getPersianNumbers(course?.cost)}
              </p>
              تومان
            </h5>
          </span>
          <Link
            to={`/courses/${course?.courseId}`}
            className="flex justify-center items-center gap-x-1 text-gray-500 dark:text-gray-200/80 hover:text-gray-800 dark:hover:text-gray-100 transition"
          >
            <Tags className="text-primary/90 dark:text-gray-200/80 rotate-90 hover:text-primary transition" />
            ثبت نام کنید
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "hidden 2xl:block w-1 h-52 bg-gradient-to-b from-[#474393] dark:from-[#3a377a] to-[#E9E9EE] dark:to-gray-600 mx-auto mt-5",
          index === 1 && "h-28"
        )}
      />
    </div>
  );
};
