import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { VerticalCard } from "../vertical-card";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import { getAllBlogs } from "../../core/services/api/get-blogs";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

export const Slider = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    staleTime: 5000,
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const blogs = data?.news;

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        breakpoints={{
          700: {
            slidesPerView: 1,
          },
          975: {
            slidesPerView: 2,
          },
          1270: {
            slidesPerView: 2,
          },
          1300: {
            slidesPerView: 3,
          },
          1625: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <VerticalCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
