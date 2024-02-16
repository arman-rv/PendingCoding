import { Link } from "react-router-dom";
import { cn } from "../../../libs/utils";

export const TeacherLatestImage = ({ index, id, name, image }) => {
  return (
    <Link
      to={`/teachers/${id}`}
      data-tip={`${name}`}
      className={cn(
        `relative
        delay-150
        before:content-[attr(data-tip)] 
        before:absolute 
        before:px-3 
        before:py-2 
        before:left-1/2 
        before:top-2
        before:w-max 
        before:max-w-xs 
        before:-translate-x-1/2 
        before:-translate-y-full 
        before:bg-[#818CF8]
        dark:before:bg-dark-primary
        before:text-white 
        dark:before:text-gray-200
        before:rounded-md 
        before:opacity-0 
        before:transition-all
        after:absolute 
        after:left-1/2 
        after:top-2 
        after:h-0 
        after:w-0 
        after:-translate-x-1/2 
        after:border-8 
        after:border-t-gray-700 
        after:text-white
        dark:after:text-gray-200
        after:border-l-transparent 
        after:border-b-transparent 
        after:border-r-transparent 
        after:opacity-0 
        after:transition-all
        hover:before:opacity-100 
        hover:after:opacity-100
        cursor-pointer
        transition-all
        `,
        index === 1 && "-translate-y-5 group-hover:translate-y-0",
        index === 2 && "-translate-y-9 group-hover:translate-y-0"
      )}
    >
      <img src={image} className="self-center mx-auto rounded-full w-16 h-16 object-cover" alt="TeacherProf" />
    </Link>
  );
};
