import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { deleteCourseFavorite } from "../../core/services/api/get-courses";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { persianPagination } from "../../../libs/get-persian-numbers";
import { scrollToTop } from "../../../libs/scroll-to-top";

export const FavoriteCourses = ({ courses }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCourses, setfilteredCourses] = useState([]);
  const [isAsc, setIsAsc] = useState(false);
  const [searchParams] = useSearchParams();
  const product_name = searchParams.get("product_name");

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(filteredCourses?.length / 6);

  useMemo(() => {
    if (product_name) {
      const newData = courses?.filter((c) =>
        c?.courseName
          .replace(/ /g, "")
          .replace("آ", "ا")
          .toLowerCase()
          .includes(
            product_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
          )
      );
      setfilteredCourses(newData);
    } else setfilteredCourses(courses);
  }, [courses, product_name]);

  const currentItems = useMemo(
    () => filteredCourses?.slice(itemOffset, endOffset),
    [filteredCourses, itemOffset, endOffset]
  );

  const updateDate = (course) =>
    new Date(course.lastUpdate)
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

  const handleDelete = async (course) => {
    try {
      setIsLoading(true);
      await deleteCourseFavorite(course?.favoriteId).then((res) => {
        if (res.success) {
          let newArray = [...filteredCourses];
          newArray = newArray.filter((f) => f.courseId !== course?.courseId);
          setfilteredCourses(newArray);
          toast.success("از لیست علاقه مندی ها حذف شد");
        }
      });
    } catch (error) {
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilter = (event) => {
    let newItems = [...filteredCourses];
    const input = event.target.innerHTML;

    if (input === "نام") {
      newItems = newItems.sort((a, b) => {
        const nameA = a.courseTitle.toLowerCase();
        const nameB = b.courseTitle.toLowerCase();
        if (nameA < nameB) {
          const returnValue = isAsc ? 1 : -1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        if (nameA > nameB) {
          const returnValue = isAsc ? -1 : 1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        return 0;
      });
    } else if (input === "نام استاد") {
      newItems = newItems.sort((a, b) => {
        const nameA = a.teacheName.toLowerCase();
        const nameB = b.teacheName.toLowerCase();
        if (nameA < nameB) {
          const returnValue = isAsc ? 1 : -1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        if (nameA > nameB) {
          const returnValue = isAsc ? -1 : 1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        return 0;
      });
    } else if (input === "اخرین بروزرسانی") {
      newItems = newItems.sort((a, b) => {
        let dateA = new Date(a.lastUpdate);
        let dateB = new Date(b.lastUpdate);
        if (isAsc) {
          const returnValue = dateB - dateA;
          setIsAsc(false);
          return returnValue;
        } else {
          const returnValue = dateA - dateB;
          setIsAsc(true);
          return returnValue;
        }
      });
    }
    setfilteredCourses(newItems);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % filteredCourses?.length;
    setItemOffset(newOffset);
    scrollToTop(0);
  };

  return (
    <div className="relative w-full sm:rounded-lg">
      {filteredCourses?.length === 0 ? (
        <div>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
            علاقه مندی وجود ندارد
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center gap-y-2">
          <div className="w-full flex flex-col justify-center items-center gap-y-4">
            <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 shadow-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    <div
                      onClick={handleFilter}
                      className="flex items-center justify-start gap-x-1 cursor-pointer"
                    >
                      <p>نام</p>
                      {isAsc ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div
                      onClick={handleFilter}
                      className="flex items-center justify-start gap-x-1 cursor-pointer"
                    >
                      <p>نام استاد</p>
                      {isAsc ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div
                      onClick={handleFilter}
                      className="flex items-center justify-start gap-x-1 cursor-pointer"
                    >
                      <p>اخرین بروزرسانی</p>
                      {isAsc ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    سطح
                  </th>
                  <th scope="col" className="px-6 py-3">
                    نوع
                  </th>
                  <th scope="col" className="px-6 py-3">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((course) => (
                  <tr
                    key={course.courseId}
                    className="bg-white border-b dark:bg-gray-900/60 dark:border-gray-800/60"
                  >
                    <th
                      scope="row"
                      className="max-w-[300px] px-0 py-2 flex items-center justify-center"
                    >
                      <img
                        src={course.tumbImageAddress}
                        alt="courseImage"
                        className="object-fill w-10 h-10 rounded-full"
                      />
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link
                        to={`/courses/${course.courseId}`}
                        className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition"
                      >
                        {course.courseTitle}
                      </Link>
                    </th>
                    <td className="px-6 py-4">{course.teacheName}</td>
                    <td className="px-6 py-4">{`${getPersianNumbers(
                      updateDate(course)?.[2],
                      true
                    )} ${
                      months[updateDate(course)?.[1] - 1]
                    } ${getPersianNumbers(updateDate(course)?.[0], true)}`}</td>
                    <td className="px-6 py-4">{course?.levelName}</td>
                    <td className="px-6 py-4">{course.typeName}</td>
                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(course)}
                        disabled={isLoading}
                        className="bg-destructive hover:bg-destructive/80 disabled:bg-destructive/70 text-white hover:text-white/80 disabled:text-white/80 disabled:cursor-not-allowed px-4 py-2 rounded-xl"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              className="flex justify-center items-center gap-x-1"
              breakLabel="..."
              nextLabel={<ChevronLeft />}
              pageLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-400/60 hover:border-gray-400 transition"
              nextLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60 hover:text-gray-500/80 hover:border-gray-400 transition"
              previousLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60 hover:text-gray-500/80 hover:border-gray-400 transition"
              activeLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60 bg-primary dark:bg-dark-primary text-white hover:border-gray-300 hover:text-white"
              disabledLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              pageLabelBuilder={(page) => persianPagination(page)}
              previousLabel={<ChevronRight />}
              disabledClassName="opacity-40"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </div>
  );
};
