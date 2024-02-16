import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

import { SearchInput } from "../../components/search";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { persianPagination } from "../../../libs/get-persian-numbers";
import { scrollToTop } from "../../../libs/scroll-to-top";

import { useUser } from "../../hooks/use-user";

export const InCartCourses = ({ courses }) => {
  const { removeFromCart, checkout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCart, setFilteredCart] = useState([]);
  const [isAsc, setIsAsc] = useState(false);
  const [searchParams] = useSearchParams();
  const product_name = searchParams.get("product_name");

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(filteredCart?.length / 6);

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
      setFilteredCart(newData);
    } else setFilteredCart(courses);
  }, [courses, product_name]);

  const currentItems = useMemo(
    () => filteredCart?.slice(itemOffset, endOffset),
    [filteredCart, itemOffset, endOffset]
  );

  const startDate = (course) =>
    new Date(course.createdAt).toLocaleDateString("fa-IR-u-nu-latn").split("/");

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
      await removeFromCart(course?.courseId, course?.reserveId).then(() => {
        let newArray = [...filteredCart];
        newArray = newArray.filter((c) => c.courseId !== course?.courseId);
        setFilteredCart(newArray);
      });
    } catch (error) {
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = (course) => {
    try {
      setIsLoading(true);
      checkout(course);
    } catch (error) {
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (event) => {
    let newItems = [...filteredCart];
    const input = event.target.innerHTML;

    if (input === "نام") {
      newItems = newItems.sort((a, b) => {
        const nameA = a.courseName.toLowerCase();
        const nameB = b.courseName.toLowerCase();
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
    } else if (input === "تاریخ رزرو") {
      newItems = newItems.sort((a, b) => {
        let dateA = new Date(a.reserverDate);
        let dateB = new Date(b.reserverDate);
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
    setFilteredCart(newItems);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % filteredCart?.length;
    setItemOffset(newOffset);
    scrollToTop(0);
  };

  return (
    <div className="relative w-full sm:rounded-lg">
      {filteredCart?.length === 0 ? (
        <div>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
            دوره‌ای در سبد خریدتان نیست
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center gap-y-2">
          <div className="flex justify-between items-center">
            <div>
              <SearchInput
                placeholder="جستجو درس..."
                className="pl-10 pr-3 py-2"
                queryName="product_name"
              />
            </div>
          </div>
          {currentItems.length === 0 ? (
            <div className="w-full flex items-center justify-center">
              <p className="text-xl text-gray-600">
                دوره‌ای با این نام اخذ نشده است
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-y-4">
              <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 shadow-md">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
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
                        <p>تاریخ رزرو</p>
                        {isAsc ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((course) => (
                    <tr
                      key={course.courseId}
                      className="bg-white border-b dark:bg-gray-900/60 dark:border-gray-800/60"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link
                          to={`/courses/${course.courseId}`}
                          className="text-gray-500 hover:text-gray-800 transition"
                        >
                          {course.title}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{`${getPersianNumbers(
                        startDate(course)?.[2],
                        true
                      )} ${
                        months[startDate(course)?.[1] - 1]
                      } ${getPersianNumbers(
                        startDate(course)?.[0],
                        true
                      )}`}</td>
                      <td className="max-w-[80px] flex items-center justify-center gap-x-5 px-6 py-4">
                        <button
                          onClick={() => handleDelete(course)}
                          disabled={isLoading}
                          className="bg-destructive hover:bg-destructive/80 dark:bg-dark-destructive dark:hover:bg-dark-destructive/80 disabled:bg-destructive/70 text-white hover:text-white/80 disabled:text-white/80 disabled:cursor-not-allowed px-5 py-2 rounded-xl"
                        >
                          حذف
                        </button>
                        <button
                          onClick={() => handleCheckout(course)}
                          disabled={isLoading}
                          className="bg-primary hover:bg-primary/80 dark:bg-dark-primary dark:hover:bg-dark-primary/80 disabled:bg-primary/70 text-white hover:text-white/80 disabled:text-white/80 disabled:cursor-not-allowed px-5 py-2 rounded-xl"
                        >
                          تسویه
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
          )}
        </div>
      )}
    </div>
  );
};
