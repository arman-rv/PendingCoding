import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { VerticalCard } from "../vertical-card";

import { getAllCourses } from "../../core/services/api/get-courses";

import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

export const Slider = () => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
    staleTime: 5000,
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
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
        {courses?.courseFilterDtos.map((course) => (
          <SwiperSlide key={course.courseId}>
            <VerticalCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
