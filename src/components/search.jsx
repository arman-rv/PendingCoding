import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import { Search } from "lucide-react";

import { cn } from "../../libs/utils";
import { useDebounce } from "../hooks/use-debounce";

export const SearchInput = ({ queryName, placeholder, className }) => {
  const navigate = useNavigate();
  const pathname = useMemo(() => window.location.pathname, []);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(queryName) || "");
  const debouncedValue = useDebounce(value);

  const course_filter_by = searchParams.get("course_filter_by");
  const items_per_page = searchParams.get("items_per_page");

  useMemo(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          [queryName]: debouncedValue,
          course_filter_by,
          items_per_page,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    navigate(url);
  }, [
    debouncedValue,
    navigate,
    pathname,
    queryName,
    course_filter_by,
    items_per_page,
  ]);

  return (
    <div className="relative w-full">
      <Search className="h-6 w-6 absolute top-[21%] left-2 text-slate-500/90" />
      <input
        value={value}
        className={cn(
          "disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-200/80 text-gray-500 dark:text-gray-800 border-2 dark:border-gray-700 placeholder:text-gray-500 rounded-full duration-200 border-gray-300 focus:border-gray-400 dark:focus:border-gray-300/80",
          className
        )}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
