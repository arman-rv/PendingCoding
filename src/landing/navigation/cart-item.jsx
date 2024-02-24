import { Book, Clock, LayoutDashboard, Tags, User, Users } from "lucide-react";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
// import { useUser } from "../../hooks/use-user";
import { useModal } from "../../hooks/use-modal-store";

export const CartItem = ({ course }) => {
  // const { removeFromCart } = useUser();
  const { onOpen } = useModal();

  const startDate = (course) =>
    new Date(course.startTime).toLocaleDateString("fa-IR-u-nu-latn").split("/");
  const endDate = (course) =>
    new Date(course.endTime).toLocaleDateString("fa-IR-u-nu-latn").split("/");
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
    <div
      key={course.id}
      className="flex flex-col justify-center items-center gap-y-10"
    >
      <div className="flex flex-row-reverse items-start justify-start gap-x-10">
        <img
          className="max-w-[400px] rounded-xl object-contain"
          src={course.imageAddress}
          alt={course.title}
        />
        <div className="flex flex-col justify-center items-start gap-y-4">
          <span className="flex justify-center items-center gap-x-2">
            <Book className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`نام دوره: ${course.title}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <LayoutDashboard className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`موضوع: ${course.technologyList}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <User className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`استاد: ${course.teacherName}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Tags className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`قیمت: ${getPersianNumbers(course.cost, false)} تومان`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Users className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`ظرفیت : ${getPersianNumbers(course.capacity, false)}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Clock className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`تاریخ شروع : ${getPersianNumbers(
                startDate(course)?.[2],
                true
              )} ${months[startDate(course)?.[1] - 1]} ${getPersianNumbers(
                startDate(course)?.[0],
                true
              )}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Clock className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`تاریخ پایان : ${getPersianNumbers(endDate(course)?.[2])} ${
                months[endDate(course)?.[1] - 1]
              } ${getPersianNumbers(endDate(course)?.[0], true)}`}
            </h1>
          </span>
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-5">
        <div className="w-full flex items-center justify-end gap-x-5">
          <button
            onClick={() => onOpen("confirmDeleteModal")}
            className="px-5 py-2 text-lg bg-destructive hover:bg-destructive/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-destructive/90 transition rounded-xl"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};
