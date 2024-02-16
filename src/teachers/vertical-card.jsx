import { Link } from "react-router-dom";

export const VerticalCard = ({ id, name, image }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 my-5">
      <img
        loading="lazy"
        src={image}
        alt="CourseImage"
        className="w-32 h-32 rounded-full border-2 border-gray-400 object-cover"
      />
      <h1 className="text-gray-600 dark:text-gray-200 text-center">{name}</h1>
      <Link
        to={`/teachers/${id}`}
        className="px-5 py-2 border-2 border-primary dark:border-dark-primary bg-gray-100 hover:bg-gray-200/10 dark:bg-gray-300 dark:hover:bg-gray-300/80 text-sm text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
      >
        نمایش پروفایل
      </Link>
    </div>
  );
};
