import { Banner } from "../../components/banner";
import { Loading } from "../../components/loading";
import { FavoriteCourses } from "./favorite-courses";
import { FavoriteBlogs } from "./favorite-blogs";

import { useEffect, useState } from "react";
import { useUser } from "../../hooks/use-user";

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

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
        <FavoriteCourses courses={userData.favoriteCourse} />
      </div>
      <div className="flex flex-col items-start justify-center gap-y-5 mt-10">
        <Banner
          title="لیست علاقه مندی‌ بلاگ‌ها"
          className="text-xl"
          height="h-10"
        />
        {/* <FavoriteBlogs blogs={userData.FavoriteBlogs} /> */}
      </div>
    </div>
  );
};
