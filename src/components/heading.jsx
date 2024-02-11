import { Link } from "react-router-dom";

export const Heading = ({ title, description, to }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <h1 className="text-4xl xl:text-3xl text-gray-600 dark:text-gray-300">
        {title}
      </h1>
      <h4 className="text-lg xl:text-sm text-gray-400 dark:text-gray-300/80">
        {description}
      </h4>
      <Link
        to={to}
        className="text-white text-lg bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 dark:text-gray-200 dark:hover:text-gray-200/90 hover:text-white/90 transition rounded-full px-14 py-2 mt-8"
      >
        مشاهده همه
      </Link>
    </div>
  );
};
