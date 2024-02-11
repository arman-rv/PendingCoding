import { cn } from "../../libs/utils";

export const Banner = ({ title, className, height }) => {
  return (
    <div className="flex flex-1 items-center justify-start">
      <div
        className={cn("relative flex h-16 justify-center items-center", height)}
      >
        <div className="absolute right-0 h-full border-2 border-primary dark:border-dark-primary rounded-l-full ml-10" />
        <h1
          className={cn(
            "text-3xl text-gray-700 dark:text-gray-300 mr-4",
            className
          )}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
