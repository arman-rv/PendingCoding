import { Calendar, LayoutDashboard, MoveLeft, PenTool } from "lucide-react";
import { Link } from "react-router-dom";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import { StarRate } from "../components/starRate";
import { ToolTip } from "../components/tool-tip";
import { rateBlog } from "../core/services/api/get-blogs";

export const VerticalCard = ({ blog }) => {
  const updateDate = new Date(blog?.updateDate)
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
    <div className="w-full max-w-[380px] flex flex-col items-center justify-center gap-y-5 bg-gray-100 dark:bg-gray-600 rounded-t-3xl rounded-b-lg mx-auto">
      <img
        loading="lazy"
        src={blog.currentImageAddressTumb}
        alt="blogImage"
        className="w-full h-72 rounded-lg rounded-b-none"
      />
      <div className="self-start">
        <h1 className="text-xl lg:text-lg text-gray-600 dark:text-gray-200 mr-5">
          {blog.title}
        </h1>
      </div>
      <div className="w-full px-[6px] flex flex-wrap justify-between items-center gap-5">
        <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
          <PenTool className="h-5 w-5 text-primary dark:text-gray-200/80" />
          {blog.addUserFullName}
        </span>
        <ToolTip name="آخرین بروزرسانی">
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <Calendar className="h-4 w-4 text-primary dark:text-gray-200/80" />
            {`${getPersianNumbers(updateDate?.[2], true)} ${
              months[updateDate?.[1] - 1]
            } ${getPersianNumbers(updateDate?.[0], true)}`}
          </span>
        </ToolTip>
        <span className="flex flex-row-reverse items-center justify-center gap-x-1">
          <StarRate
            data={blog}
            queryKey="courses"
            id="NewsId"
            rateFn={rateBlog}
          />
        </span>
      </div>
      <div className="flex justify-start w-full items-center px-3 py-2">
        <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
          <p className="text-sm text-gray-500 dark:text-gray-200/80 line-clamp-2 text-start">
            {blog.description}
          </p>
        </span>
      </div>
      <div className="w-5/6 border border-gray-300 dark:border-gray-500" />
      <div className="w-full flex justify-between items-center px-4 pt-2 pb-7">
        <span>
          <h5 className="text-gray-600 dark:text-gray-200/80 flex justify-center items-center gap-x-1">
            <LayoutDashboard className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {blog.isBlog ? "مقالات" : "خبر "}
          </h5>
        </span>
        <Link
          to={`/blogs/${blog.id}`}
          className="flex justify-center items-center gap-x-2 text-primary hover:text-primary/80 dark:text-gray-200 dark:hover:text-gray-200/80 transition"
        >
          مشاهده {blog.isBlog ? "مقاله" : "خبر"}
          <MoveLeft />
        </Link>
      </div>
    </div>
  );
};
