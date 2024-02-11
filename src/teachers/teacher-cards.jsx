import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { VerticalCard } from "./vertical-card";
import { Select } from "../components/select";

import { cn } from "../../libs/utils";
import {
  getPersianNumbers,
  persianPagination,
} from "../../libs/get-persian-numbers";

import defaultProfileImage from "../assets/my-profile.jpg";

const filters = [
  { id: 1, label: 6, value: 6 },
  { id: 2, label: 12, value: 12 },
  { id: 3, label: 18, value: 18 },
];

export const TeacherCards = ({ teachers, itemsPerPage, isVertical }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = teachers?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(teachers?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % teachers?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div
        className={cn(
          "w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-20 gap-y-5 justify-center items-center",
          !isVertical && "hidden"
        )}
      >
        {currentItems?.map((teacher) => (
          <VerticalCard
            key={teacher.teacherId}
            id={teacher.teacherId}
            name={teacher.fullName || "TeacherName"}
            image={teacher.pictureAddress || defaultProfileImage}
          />
        ))}
      </div>
      <div
        className={cn(
          "w-full  flex flex-col items-center gap-y-10",
          isVertical && "hidden"
        )}
      >
        <div>This view is not available now</div>
        {/* {currentItems?.map((teacher) => (
          <HorizontalCard
            key={teacher.id}
            id={teacher.id}
            name={teacher.name || teacher.teacher}
            image={teacher.image || teacher.teacherAvatar}
          />
        ))} */}
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-y-5 mt-10">
        <div className="flex items-center justify-center text-gray-400">
          <h1>
            {`نمایش ${getPersianNumbers(itemOffset + 1)} تا ${getPersianNumbers(
              endOffset > teachers.length ? teachers.length : endOffset
            )} از ${getPersianNumbers(teachers?.length)} نتیجه`}
          </h1>
        </div>
        <ReactPaginate
          className="flex justify-center items-center gap-x-1"
          breakLabel="..."
          nextLabel={<ChevronLeft />}
          pageLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-400/60 hover:border-gray-400 transition"
          nextLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60 hover:text-gray-500/80 hover:border-gray-400 transition"
          previousLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60 hover:text-gray-500/80 hover:border-gray-400 transition"
          activeLinkClassName="border-2 border-gray-300 shadow-sm rounded-full w-10 h-10 flex items-center justify-center text-4xl text-gray-400/60 bg-primary text-white hover:border-gray-300 hover:text-white"
          onPageChange={handlePageClick}
          pageLabelBuilder={(page) => persianPagination(page)}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel={<ChevronRight />}
          disabledClassName="opacity-40"
          renderOnZeroPageCount={null}
        />
        <Select
          queryName="items-per-page"
          filters={filters}
          className="px-2 py-1 text-center"
        />
      </div>
    </>
  );
};
