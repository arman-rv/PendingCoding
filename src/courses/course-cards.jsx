import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "react-query";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import { VerticalCard } from "./vertical-card";
import { Select } from "../components/select";
import { HorizontalCard } from "./horizontal-card";

import { cn } from "../../libs/utils";
import { persianPagination } from "../../libs/get-persian-numbers";
import { scrollToTop } from "../../libs/scroll-to-top";
import { getUserReservedCourses } from "../core/services/api/user";

const filters = [
  { id: 1, label: 6, value: 6 },
  { id: 2, label: 12, value: 12 },
  { id: 3, label: 18, value: 18 },
];

export const CourseCards = ({ courses, itemsPerPage, isVertical }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = courses?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(courses?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % courses?.length;
    setItemOffset(newOffset);
    scrollToTop(0);
  };
  const { data: reservedCourses } = useQuery({
    queryKey: ["reserved_courses"],
    queryFn: () => getUserReservedCourses(),
    staleTime: 5000,
  });

  return (
    <>
      <div
        className={cn(
          "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-20 md:gap-20 xl:gap-32 2xl:gap-10",
          !isVertical && "hidden"
        )}
      >
        {currentItems?.map((course) => (
          <VerticalCard
            key={course.id}
            course={course}
            reservedCourses={reservedCourses}
          />
        ))}
      </div>
      <div
        className={cn(
          "w-full flex flex-col items-center gap-y-10",
          isVertical && "hidden"
        )}
      >
        {currentItems?.map((course) => (
          <HorizontalCard
            key={course.id}
            course={course}
            reservedCourses={reservedCourses}
          />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-y-5 mt-10">
        <div className="flex items-center justify-center text-gray-400">
          <h1>
            {`نمایش ${getPersianNumbers(itemOffset + 1)} تا ${getPersianNumbers(
              endOffset > courses.length ? courses.length : endOffset
            )} از ${getPersianNumbers(courses?.length)} نتیجه`}
          </h1>
        </div>
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
        <Select
          queryName="items_per_page"
          filters={filters}
          className="px-2 py-1 text-center"
        />
      </div>
    </>
  );
};
