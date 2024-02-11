import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { getTeacherById } from "../../core/services/api/get-teacher";
import { getAllCourses } from "../../core/services/api/get-courses";

import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { Slider } from "./slider";

export const TeacherInfo = () => {
  const { id } = useParams();

  const {
    data: teacher,
    isLoading: isTeacherLoading,
    isError: isTeacherError,
  } = useQuery({
    queryKey: ["teacher_id", id],
    queryFn: () => getTeacherById(id),
    staleTime: 5000,
  });

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery({
    queryKey: ["teacher_course"],
    queryFn: () => getAllCourses({ TeacherId: id }),
    staleTime: 5000,
  });
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
      courses: courses?.courseFilterDtos,
    },
    {
      id: 3,
      label: "تمام دوره ها",
      courses: courses?.courseFilterDtos,
    },
    // {
    //   id: 4,
    //   label: "نظرات",
    //   comments: [
    //     {
    //       id: 1,
    //       comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
    //       .در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
    //       کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
    //       برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام
    //       و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
    //        .سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
    //       createdAt: teacher?.createdAt,
    //       user: {
    //         name: teacher?.studentName,
    //         image: teacher??.studentImage,
    //       },
    //       responds: [
    //         {
    //           id: teacher?.teacherId,
    //           name: teacher?.teacher,
    //           image: teacher??.studentImage,
    //           respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
    //           چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
    //           .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
    //           role: "student",
    //         },
    //         {
    //           id: teacher?.studentId || 1234,
    //           name: teacher?.studentName,
    //           image: teacher??.studentImage,
    //           respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
    //           چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
    //           .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
    //           role: "student",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  const [selected, setSelected] = useState(details[0].label);

  if (isTeacherLoading && coursesLoading) return <Loading />;
  if (isTeacherError && coursesError) return <Error />;

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
            className="rounded-xl w-full h-[475px] object-fill"
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
