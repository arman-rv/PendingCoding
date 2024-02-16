import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";

import { cn } from "../../../../libs/utils";

// import { getAllBlogs } from "../../../core/services/api/get-blogs";
import { Loading } from "../../../components/loading";
// import { Error } from "../../../components/error";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const blogs = [
  {
    id: 1,
    newsCatregoryName: "خبر",
    title: "این متن فقط برای نمایش است",
    miniDescribe: "این متن فقط برای نمایش است",
  },
  {
    id: 2,
    newsCatregoryName: "خبر",
    title: "این متن فقط برای نمایش است",
    miniDescribe: "این متن فقط برای نمایش است",
  },
  {
    id: 3,
    newsCatregoryName: "خبر",
    title: "این متن فقط برای نمایش است",
    miniDescribe: "این متن فقط برای نمایش است",
  },
  {
    id: 4,
    newsCatregoryName: "خبر",
    title: "این متن فقط برای نمایش است",
    miniDescribe: "این متن فقط برای نمایش است",
  },
  {
    id: 5,
    newsCatregoryName: "خبر",
    title: "این متن فقط برای نمایش است",
    miniDescribe: "این متن فقط برای نمایش است",
  },
  {
    id: 6,
    newsCatregoryName: "خبر",
    title: "این متن فقط برای نمایش است",
    miniDescribe: "این متن فقط برای نمایش است",
  },
];

export const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const { data, isLoading, isError } = useQuery("news", () => getAllBlogs(), {
  //   staleTime: 5000,
  // });

  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;
  // const { news: blogs } = data;
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-[400px] sm:w-[500px] md:w-[450px] lg:w-[600px] xl:w-[1000px]">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={30}
          breakpoints={{
            400: {
              slidesPerView: 1,
            },
            700: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 2,
            },
            1250: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
        >
          {blogs?.map((blog) => (
            <SwiperSlide key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
                className="h-56 border-2 border-white dark:border-gray-300 rounded-2xl bg-gray-100 dark:bg-gray-500 flex flex-col items-start justify-start gap-y-5 p-4 overflow-hidden"
              >
                <span
                  className={cn(
                    "bg-[#CFCFF0] dark:bg-[#9e9eb9] dark:border dark:border-gray-300 px-1 py-3 text-sm text-gray-500 dark:text-gray-200 rounded-full",
                    blog.newsCatregoryName === "خبر" && "p-3"
                  )}
                >
                  {blog.newsCatregoryName}
                </span>
                <h3 className="text-lg text-gray-600 dark:text-gray-200">
                  {blog.title}
                </h3>
                <h5 className="text-sm text-gray-400 dark:text-gray-300/80 line-clamp-2  text-ellipsis break-normal">
                  {blog.miniDescribe}
                </h5>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
