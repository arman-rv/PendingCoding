import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { VerticalCard } from "../vertical-card";

// import { getAllCourses } from "../../core/services/api/get-courses";

import { Loading } from "../../components/loading";
// import { Error } from "../../components/error";

import Image from "../../assets/REACTjs.webp";
import CSharp from "../../assets/cSharp.jpg";
import CPlus from "../../assets/c++.jpg";
import SQL from "../../assets/SQL.jpg";
import Physics from "../../assets/physics.jpg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const courses = [
  {
    courseId: 0,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 200_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 1,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 200_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 2,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 200_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 3,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 4,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 5,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 6,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 7,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 8,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 9,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 10,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 11,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 24,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 12,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Image,
    likeCount: 24,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
  },
  {
    courseId: 13,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: CPlus,
    likeCount: 24,
    title: "C++",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C++",
  },
  {
    courseId: 14,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: CPlus,
    likeCount: 24,
    title: "C++",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C++",
  },
  {
    courseId: 15,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: CSharp,
    likeCount: 24,
    title: "C#",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C#",
  },
  {
    courseId: 16,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: CSharp,
    likeCount: 24,
    title: "C#",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C#",
  },
  {
    courseId: 17,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: SQL,
    likeCount: 24,
    title: "SQL",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "SQL",
  },
  {
    courseId: 18,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: SQL,
    likeCount: 24,
    title: "SQL",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "SQL",
  },
  {
    courseId: 19,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Physics,
    likeCount: 24,
    title: "فیزیک",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "Physics",
  },
  {
    courseId: 20,
    lastUpdate: "2024-02-16T05:34:42.901Z",
    tumbImageAddress: Physics,
    likeCount: 24,
    title: "فیزیک",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    teacherName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "Physics",
  },
];

export const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <Loading />;
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
        {courses.map((course) => (
          <SwiperSlide className="cursor-grab" key={course.courseId}>
            <VerticalCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
