import { useState, useEffect } from "react";

import { Loading } from "../../components/loading";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { Slider } from "./slider";
import { teachers } from "../../static-data/teachers";
import { courses } from "../../static-data/courses";
import { useParams } from "react-router-dom";

export const TeacherInfo = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const teacher = teachers[id];

  const teacherCountFind = (name, category) => {
    let x = [];
    for (let i in category) {
      if (name === category.at(i).teacherName) {
        x.push(category[i]);
      }
    }
    return x;
  };
  const currentCourse = teacherCountFind("آرمان رضوانی", courses);

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
      courses: currentCourse,
    },
    {
      id: 3,
      label: "تمام دوره ها",
      courses: currentCourse,
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
            className="rounded-xl w-[85%] h-[600px] object-cover self-center"
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
