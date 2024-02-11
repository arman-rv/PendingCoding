import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { getAllTeachers } from "../../core/services/api/get-teacher";

import { VerticalCard } from "../vertical-card";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import defaultProfileImage from "../../assets/my-profile.jpg";

export const Slider = () => {
  const {
    data: teachers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
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
          400: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1270: {
            slidesPerView: 4,
          },
          1300: {
            slidesPerView: 5,
          },
          1625: {
            slidesPerView: 6,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        {teachers?.map((teacher) => (
          <SwiperSlide key={teacher.teacherId}>
            <VerticalCard
              id={teacher.teacherId}
              name={teacher.fullName || "TeacherName"}
              image={teacher.pictureAddress || defaultProfileImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
