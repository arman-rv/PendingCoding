import { useQueries } from "react-query";

import { Banner } from "../../components/banner";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import { FavoriteCourses } from "./favorite-courses";
import { FavoriteBlogs } from "./favorite-blogs";

import {
  getUserFavoriteBlogs,
  getUserFavoriteCourses,
} from "../../core/services/api/user";

export const Favorites = () => {
  const result = useQueries([
    {
      queryKey: ["favorite_courses"],
      queryFn: () => getUserFavoriteCourses(),
      staleTime: 5000,
    },
    {
      queryKey: ["favorite_blogs"],
      queryFn: () => getUserFavoriteBlogs(),
      staleTime: 5000,
    },
  ]);

  const isLoading = result?.[0].isLoading || result?.[1].isLoading;
  const isError = result?.[0].isError || result?.[1].isError;

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="p-10 bg-[#EEEEEE] dark:bg-gray-800">
      {/* Disconted Courses
          & DatePicker &
          Course PurchasedCourses 
      */}
      <div className="flex flex-col items-start justify-center gap-y-5">
        <Banner
          title="لیست علا‌مندی دوره‌ها"
          className="text-xl"
          height="h-10"
        />
        <FavoriteCourses courses={result?.[0].data?.favoriteCourseDto} />
      </div>
      <div className="flex flex-col items-start justify-center gap-y-5 mt-10">
        <Banner
          title="لیست علاقه مندی‌ بلاگ‌ها"
          className="text-xl"
          height="h-10"
        />
        <FavoriteBlogs blogs={result?.[1].data?.myFavoriteNews} />
      </div>
    </div>
  );
};
