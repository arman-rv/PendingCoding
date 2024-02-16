import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { VerticalCard } from "../vertical-card";
import { Loading } from "../../components/loading";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import defaultProfileImage from "../../assets/my-profile.jpg";
import Amir from "../../assets/amir.jpg";
import Arman from "../../assets/arman.jpg";

const teachers = [
  {
    teacherId: 1,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: 20,
    courseCounts: 2,
  },
  {
    teacherId: 2,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: 20,
    courseCounts: 2,
  },
  {
    teacherId: 3,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: 20,
    courseCounts: 2,
  },
  {
    teacherId: 4,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: 20,
    courseCounts: 5,
  },
  {
    teacherId: 5,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: 50,
    courseCounts: 5,
  },
  {
    teacherId: 6,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: 50,
    courseCounts: 5,
  },
  {
    teacherId: 7,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: 13,
    courseCounts: 5,
  },
  {
    teacherId: 8,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: 13,
    courseCounts: 2,
  },
  {
    teacherId: 9,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: 13,
    courseCounts: 2,
  },
  {
    teacherId: 10,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: 13,
    courseCounts: 2,
  },
  {
    teacherId: 12,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: 13,
    courseCounts: 2,
  },
  {
    teacherId: 13,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: 13,
    courseCounts: 2,
  },
];

export const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

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
