import { useState, useEffect } from "react";

import { Loading } from "../../components/loading";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { Slider } from "./slider";

import Image from "../../assets/REACTjs.webp";
import CSharp from "../../assets/cSharp.jpg";
import CPlus from "../../assets/c++.jpg";
import Physics from "../../assets/physics.jpg";
import SQL from "../../assets/sql.jpg";
import Amir from "../../assets/amir.jpg";

const teacher = {
  teacherId: 1,
  fullName: "امیرعباس بابائی",
  pictureAddress: Amir,
  newsCount: 20,
  courseCounts: 2,
  skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
};
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

export const TeacherInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const details = [
    {
      id: 1,
      label: "بیوگرافی",
      value: `👨‍💻 ${teacher?.fullName || "در اینجا"} استادی حرفه‌ای در حوزه ${
        teacher?.skills.length !== 0
          ? teacher?.skills.join(",")
          : "مهندسی نرم‌افزار"
      } است! با اطلاعات کم، می‌توانم اینگونه توانایی‌های استاد را معرفی کنم:
      🌟 تخصص در مهندسی نرم‌افزار
      💡 دانش گسترده در طراحی، پیاده‌سازی و توسعه نرم‌افزارها
      📚 تجربه چندساله در تدریس مباحث مهندسی نرم‌افزار
      🔬 تحقیقات و توسعه‌های فعال در زمینه‌های نوآوری و فناوری‌های جدید
      💻 آشنایی با زبان‌ها و فریم‌ورک‌های مختلف برنامه‌نویسی
      🔧 مهارت در استفاده از ابزارها و تکنولوژی‌های پیشرفته در مهندسی نرم‌افزار
      👨‍🏫 ارائه بهترین روش‌ها و شیوه‌های آموزشی به دانشجویان
      ✨ این استاد با تمام شغف، دانش خود را برای رشد و پیشرفت دانشجویان به کار می‌گیرد.`,
    },
    {
      id: 2,
      label: "دوره‌های ترم جاری",
      courses: courses,
    },
    {
      id: 3,
      label: "تمام دوره ها",
      courses: courses,
    },
  ];
  const [selected, setSelected] = useState(details[0].label);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1700px] mt-20 mx-auto flex flex-col justify-center items-start gap-y-10 px-5 md:px-28 py-5">
      <div className="flex  justify-center items-center">
        <NavigatorTracer />
      </div>
      {/* Title & Add */}
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-y-10">
        {/* Title Div */}
        <div>
          <h1 className="text-3xl text-gray-700 dark:text-gray-200">
            {teacher?.fullName}
          </h1>
        </div>
        {/* Add Div */}
      </div>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <img
            className="rounded-xl w-full h-[500px] object-cover"
            src={teacher?.pictureAddress}
            alt="courseImage"
          />
          <div className="w-full flex justify-between items-center gap-x-10">
            {details?.map((datail) => (
              <Header
                key={datail.id}
                label={datail.label}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          <div className="w-full">
            {details?.map((detail) => (
              <Description
                key={detail.id}
                details={detail}
                selected={selected}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-10 2xl">
        <Banner title="آخرین اساتید مجموعه" />
        <Slider />
        <div></div>
      </div>
    </div>
  );
};
