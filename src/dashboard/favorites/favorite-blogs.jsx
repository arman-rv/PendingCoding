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

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { persianPagination } from "../../../libs/get-persian-numbers";
import { scrollToTop } from "../../../libs/scroll-to-top";

export const FavoriteBlogs = ({ blogs }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBlogs, setfilteredBlogs] = useState([]);
  const [isAsc, setIsAsc] = useState(false);
  const [searchParams] = useSearchParams();
  const product_name = searchParams.get("product_name");

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(filteredBlogs?.length / 6);

  useMemo(() => {
    if (product_name) {
      const newData = blogs?.filter((c) =>
        c?.courseName
          .replace(/ /g, "")
          .replace("آ", "ا")
          .toLowerCase()
          .includes(
            product_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
          )
      );
      setfilteredBlogs(newData);
    } else setfilteredBlogs(blogs);
  }, [blogs, product_name]);

  const currentItems = useMemo(
    () => filteredBlogs?.slice(itemOffset, endOffset),
    [filteredBlogs, itemOffset, endOffset]
  );

  const updateDate = (blog) =>
    new Date(blog.updateDate).toLocaleDateString("fa-IR-u-nu-latn").split("/");

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

  const handleDelete = (blog) => {
    try {
      setIsLoading(true);

      // api Call for Delete FavBlo

      let newArray = [...filteredBlogs];
      newArray = newArray.filter((b) => b.newsId !== blog?.newsId);
      setTimeout(() => {
        setfilteredBlogs(newArray);
        toast.success("از علاقه‌‌مندی حذف شد");
      }, 800);
    } catch (error) {
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (event) => {
    let newItems = [...filteredBlogs];
    const input = event.target.innerHTML;

    if (input === "نام") {
      newItems = newItems.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
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
    } else if (input === "آخرین بروزرسانی") {
      newItems = newItems.sort((a, b) => {
        let dateA = new Date(a.updateDate);
        let dateB = new Date(b.updateDate);
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
    setfilteredBlogs(newItems);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % filteredBlogs?.length;
    setItemOffset(newOffset);
    scrollToTop(0);
  };

  return (
    <div className="relative w-full sm:rounded-lg">
      {filteredBlogs?.length === 0 ? (
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
                      <p>آخرین بروزرسانی</p>
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
                {currentItems.map((blog) => (
                  <tr
                    key={blog.newsId}
                    className="bg-white border-b dark:bg-gray-900/60 dark:border-gray-800/60"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link
                        to={`/blogs/${blog.newsId}`}
                        className="text-gray-500 hover:text-gray-800 transition"
                      >
                        {blog.title}
                      </Link>
                    </th>
                    <td className="px-6 py-4">{`${getPersianNumbers(
                      updateDate(blog)?.[2],
                      true
                    )} ${months[updateDate(blog)?.[1] - 1]} ${getPersianNumbers(
                      updateDate(blog)?.[0],
                      true
                    )}`}</td>
                    <td className="max-w-[80px] flex items-center justify-center gap-x-5 px-6 py-4">
                      <button
                        onClick={() => handleDelete(blog)}
                        disabled={isLoading}
                        className="bg-destructive hover:bg-destructive/80 dark:bg-dark-destructive dark:hover:bg-dark-destructive/80 disabled:bg-destructive/70 text-white hover:text-white/80 disabled:text-white/80 disabled:cursor-not-allowed px-5 py-2 rounded-xl"
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
