import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";

import { cn } from "../../libs/utils";
import { getPersianNumbers } from "../../libs/get-persian-numbers";
import { scrollToTop } from "../../libs/scroll-to-top";

export const Select = ({ queryName, filters, className, placeholder }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const pathname = useMemo(() => window.location.pathname, []);
  const [searchParams] = useSearchParams();

  const handleSelection = (event) => {
    setValue(event.target.value);
    scrollToTop(0);
  };

  const categoryId = searchParams.get("categoryId");
  const isFinished = searchParams.get("isFinished");
  const course_name = searchParams.get("course_name");
  const teacher_name = searchParams.get("teacher_name");

  useMemo(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          [queryName]: value,
          categoryId,
          teacher_name,
          course_name,
          isFinished,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    navigate(url);
  }, [
    value,
    navigate,
    pathname,
    queryName,
    teacher_name,
    categoryId,
    isFinished,
    course_name,
  ]);

  return (
    <select
      placeholder={placeholder | filters[0].value}
      defaultValue={filters[0]}
      onChange={handleSelection}
      className={cn(
        "cursor-pointer disabled:cursor-not-allowed outline-none bg-[#EEEEEE] dark:bg-gray-200/80 dark:border-gray-700 dark:focus:border-gray-300/80 text-gray-400 dark:text-gray-800 border-2 rounded-full duration-200 border-gray-300 focus:border-gray-400 py-3 pl-1 pr-4",
        // className
        
      )}
    >
      {filters?.map((filter) => (
        <option key={filter.id} value={filter.value}>
          {getPersianNumbers(filter.label, false)}
        </option>
      ))}
    </select>
  );
};
