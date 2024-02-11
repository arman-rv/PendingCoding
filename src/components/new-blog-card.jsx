import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { useQuery } from "react-query";
import { getAllBlogs } from "../core/services/api/get-blogs";
import { Loading } from "./loading";
import { Error } from "./error";

export const NewBlogCard = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    staleTime: 5000,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      {blogs?.news.slice(0, 3).map((blog) => (
        <div key={blog.id} className="py-2">
          <Link
            to={`/blogs/${blog.id}`}
            className="flex items-center justify-center gap-x-3 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-700 transition px-5 py-2 rounded-xl"
          >
            <img
              src={blog.currentImageAddressTumb}
              alt="courseImage"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-y-2">
              <h2 className="text-gray-700 dark:text-gray-200">{blog.title}</h2>
              <span className="flex justify-center items-center gap-x-1 text-sm text-gray-600 dark:text-gray-200/90">
                <LayoutDashboard className="text-primary dark:text-dark-primary h-4 w-4" />
                {blog.newsCatregoryName}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
