import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
// import { useQueries } from "react-query";

// import { getAllTeachers } from "../../core/services/api/get-teacher";

import { TeacherLatestImage } from "./teacher-latest-image";
import { Loading } from "../../components/loading";
// import { Error } from "../../components/error";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
// import { getLandingReport } from "../../core/services/api/get-landing-report";

import fun from "../../assets/fun.svg";
import defaultImage from "../../assets/my-profile.jpg";
import logo from "../../assets/logo.svg";
import Amir from "../../assets/amir.jpg";
import Arman from "../../assets/arman.jpg";
import hania from "../../assets/hania.jpg";

const teachers = [
  { id: 0, name: "امیرعباس بابائی", pictureAddress: Amir },
  { id: 1, name: "هانیا حبیبی", pictureAddress: hania },
  { id: 2, name: "آرمان رضوانی", pictureAddress: Arman },
];
const landingReport = {
  courseCount: 434,
  teacherCount: 212,
  studentCount: 2321,
};

export const Info = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [isMounted, setIsMounted] = useState(false);
  // const results = useQueries([
  //   {
  //     queryKey: ["teachers"],
  //     queryFn: () => getAllTeachers(),
  //     staleTime: 5000,
  //     enabled: false,
  //   },
  //   {
  //     queryKey: ["landing_report"],
  //     queryFn: () => getLandingReport(),
  //     staleTime: 5000,
  //     enabled: false,
  //   },
  // ]);

  // const isLoading = results.some((result) => result.isLoading);
  // const isError = results.some((result) => result.isError);

  // useLayoutEffect(() => {
  //   if (!isMounted) {
  //     setIsMounted(true);
  //     results?.[0].refetch();
  //     results?.[1].refetch();
  //   }
  // }, [isMounted, results]);

  // if (!isMounted) return null;
  // if (isError) return <Error />;
  // if (isLoading) return <Loading />;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <h1 className="text-gray-500 dark:text-gray-300 text-4xl text-center xl:text-2xl">
        تجربه یادگیری مهارت در مسیری حرفه ای
      </h1>
      <div className="flex w-full flex-col xl:flex-row items-center justify-center xl:items-start xl:justify-start xl:gap-x-[268px] gap-y-20">
        {/* Info div */}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <div className="text-gray-400 dark:text-gray-300/80 text-sm text-center xl:text-start xl:ml-auto">
            <h3 className="text-gray-500 dark:text-gray-300/80 text-2xl">
              {getPersianNumbers(landingReport.courseCount)}
            </h3>
            دوره مدرن آموزشی
          </div>
          <div className="text-gray-400 dark:text-gray-300/80 text-sm text-center xl:text-start xl:ml-auto">
            <h3 className="text-gray-500 dark:text-gray-300/80 text-2xl">
              {getPersianNumbers(landingReport.teacherCount)}
            </h3>
            استاد مجرّب در مجموعه
          </div>
          <div>
            <div className="group flex flex-col items-center xl:items-start justify-center">
              {teachers.slice(0, 3).map((teacher, index) => (
                <TeacherLatestImage
                  key={teacher.id}
                  id={teacher.id}
                  index={index}
                  name={teacher.name || "امیرعباس"}
                  image={teacher.pictureAddress || defaultImage}
                />
              ))}
            </div>
            <h5 className="text-gray-400 dark:text-gray-300/80 text-sm">
              آخرین اساتید مجموعه
            </h5>
          </div>
        </div>

        {/* FunImage div */}
        <img src={fun} alt="funPic" className="object-cover" />
      </div>
      {/* bottom div */}
      <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-10">
        <div className="flex flex-col xl:flex-row gap-y-10 items-center justify-center gap-5">
          <img
            src={logo}
            alt="logo"
            className="w-24 h-24 dark:filter dark:invert dark:oapcity-[0.26] dark:brightness-0"
          />
          <div className="flex flex-col items-center xl:items-start justify-center gap-1">
            <h1 className="text-3xl text-gray-600 dark:text-gray-300/80">
              {getPersianNumbers(landingReport.studentCount)}
            </h1>
            <h2 className="text-gray-500 dark:text-gray-300/80 text-lg">
              دانشجویان مجموعه
            </h2>
          </div>
        </div>
        <div className="w-72 sm:w-96 flex flex-col justify-center items-center gap-5">
          <div className="group w-full flex flex-col justify-center items-center gap-5">
            <Link
              to="/about"
              className="w-full flex justify-between items-center gap-10 text-gray-500 dark:text-gray-300/80 group-hover:text-primary/80 dark:group-hover:text-gray-200 transition"
            >
              چرا باید مجموعه آموزشی سپهر را انتخاب کنیم ؟
              <ArrowUpLeft className="h-6 w-6" />
            </Link>
            <div className="w-full border border-gray-400 group-hover:border-primary/80 dark:group-hover:border-dark-primary/80 transition" />
          </div>
          <div className="w-full group flex flex-col justify-center items-center gap-y-5">
            <Link
              to="/about"
              className="w-full flex justify-between items-center gap-x-10 text-gray-500 dark:text-gray-300/80 hover:text-primary/80 dark:group-hover:text-gray-200 transition"
            >
              سوالات خود را با ما به اشتراک بگذارید
              <ArrowUpLeft className="h-6 w-6" />
            </Link>
            <div className="w-full border border-gray-400 group-hover:border-primary/80 dark:group-hover:border-dark-primary/80 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};
