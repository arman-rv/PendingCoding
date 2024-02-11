import { useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { BookX, Menu } from "lucide-react";

import NavigatorTracer from "../components/navigator-tracer";
import { Banner } from "../components/banner";
import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { Select } from "../components/select";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { TeacherCards } from "./teacher-cards";

import { useModal } from "../hooks/use-modal-store";

import { cn } from "../../libs/utils";
import { getAllTeachers } from "../core/services/api/get-teacher";

const orderBy = [
  {
    id: 19,
    label: "مرتب سازی بر اساس",
    value: "",
  },
  {
    id: 20,
    label: "مقاله‌ بیشتر",
    value: "moreBlogs",
  },
  {
    id: 21,
    label: "دوره ییشتر",
    value: "moreCourse",
  },
];

export const Teachers = () => {
  const [isVertical, setIsVertical] = useState(true);
  const { onOpen } = useModal();

  const [searchParams] = useSearchParams();

  const {
    data: teachers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
    staleTime: 5000,
  });

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  const teacher_name = searchParams.get("teacher_name");
  const teacherFilterBy = searchParams.get("teacherFilterBy");
  const itemsPerPage = parseInt(searchParams.get("items-per-page"));

  let filteredData = teachers?.filter((t) => {
    if (!teacher_name) return t;
    else if (
      t?.fullName
        ?.replace(/ /g, "")
        ?.replace("آ", "ا")
        ?.toLowerCase()
        ?.includes(
          teacher_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    )
      return t;
  });
  if (teacherFilterBy) {
    const newArray = [...filteredData];
    if (teacherFilterBy === "moreBlogs")
      newArray.sort((a, b) => b.newsCount - a.newsCount);
    if (teacherFilterBy === "moreCourse")
      newArray.sort((a, b) => b.courseCounts - a.courseCounts);

    filteredData = newArray;
  }

  return (
    <div className="max-w-[1700px] mx-auto flex flex-col items-start justify-center gap-y-10 p-20">
      <div className="flex justify-center items-center">
        <NavigatorTracer />
      </div>
      <Banner title="لیست اساتید" />
      <Seperator />
      <div
        className={cn(
          "w-full flex flex-col xl:flex-row items-start justify-between gap-x-10"
        )}
      >
        {/* Filter div */}
        <button
          onClick={() => onOpen("filterTeacherDialog")}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 transition mt-1 sm:hidden"
        >
          <Menu className="h-10 w-10" />
        </button>
        {/* Grid div */}
        <div className="w-full flex flex-col justify-center items-start gap-y-5">
          {/* FilterDiv */}
          <div className="hidden sm:flex justify-between items-center w-full">
            <div>
              <SearchInput
                queryName="teacher_name"
                placeholder="جستجو کنید ..."
                className="px-4 py-2"
              />
            </div>
            <div className="flex justify-center items-center gap-x-5">
              <Select
                queryName="teacherFilterBy"
                placeholder="جستجو بر اساس"
                filters={orderBy}
                className="py-3 px-5"
              />
              {/* <div
                onClick={() => setIsVertical((c) => !c)}
                className="text-gray-500 hover:text-gray-600 transition cursor-pointer"
              >
                {isVertical ? (
                  <Grid2x2 className="h-7 w-7" />
                ) : (
                  <Rows className="h-7 w-7" />
                )}
              </div> */}
            </div>
          </div>
          {/* Grid Div */}
          {filteredData.length > 0 ? (
            <div className="w-full my-10">
              <TeacherCards
                teachers={filteredData}
                itemsPerPage={itemsPerPage | 6}
                isVertical={isVertical}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 items-center justify-center my-52 dark:bg-[#1E1F22]">
              <BookX className="w-12 h-12 text-gray-600/90 dark:text-gray-300" />
              <p className="text-zinc dark:text-gray-300 text-xl">
                استاد مورد نظر پیدا نشد
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
