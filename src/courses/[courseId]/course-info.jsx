import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
// import { useMemo } from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
import {
  Book,
  Bookmark,
  Clock,
  Tags,
  ThumbsDown,
  ThumbsUp,
  User,
  User2,
  Users2,
} from "lucide-react";
import toast from "react-hot-toast";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";

import { StarRate } from "../../components/starRate";
import { Loading } from "../../components/loading";
import NavigatorTracer from "../../components/navigator-tracer";
import { NewCourseCard } from "../../components/new-course-card";
import { Banner } from "../../components/banner";
import { Header } from "./header";
import { Description } from "./description";
import { Slider } from "./slider";

import Amir from "../../assets/amir.jpg";
import Arman from "../../assets/arman.jpg";

import { useParams } from "react-router-dom";
import { courses } from "../../static-data/courses";
import { blogs } from "../../static-data/blogs";

const fade = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export const CourseInfo = () => {
  const { id } = useParams();

  const courseDetail = courses[id];
  const courseDescription = blogs[id];

  const categories = [
    { label: "فرانت اند", value: "FrontEnd" },
    { label: "بک اند", value: "BackEnd" },
    { label: "جاوا اسکریپت", value: "JavaScript" },
    { label: "پایتون", value: "Python" },
    { label: "مهارت نرم", value: "Soft Skill" },
  ];

  const handleCategory = () => {
    for (let i in categories) {
      console.log(categories.at(i).value);
      if (courseDetail.technologyList === categories.at(i).value) {
        return categories.at(i).label;
      }
    }
  };
  const techCategory = handleCategory();

  const course = {
    courseId: 0,
    createdAt: "2024-02-16T05:34:42.901Z",
    startTime: courseDetail.lastUpdate,
    endTime: "2025-03-20T05:34:42.901Z",
    imageAddress: courseDetail.tumbImageAddress,
    likeCount: courseDetail.likeCount,
    dissLikeCount: 10,
    title: courseDetail.title,
    currentRegistrants: courseDetail.currentRegistrants,
    statusName: courseDetail.statusName,
    teacherName: courseDetail.teacherName,
    levelName: courseDetail.levelName,
    cost: courseDetail.cost,
    courseRate: courseDetail.courseRate,
    currentRate: courseDetail.currentRate,
    technologyList: courseDetail.technologyList,
    currentUserDissLike: 0,
    currentUserLike: 0,
    describe: JSON.stringify([
      {
        name: "مقدمات",
        videos: [
          {
            title: "مقدمات",
            videoLink:
              "https://www.youtube.com/watch?v=j942wKiXFu8&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d",
          },
        ],
      },
      {
        name: "فصل 1",
        videos: [
          {
            title: "فصل 1",
            videoLink:
              "https://www.youtube.com/watch?v=kVeOpcw4GWY&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=2",
          },
        ],
      },
      {
        name: "فصل 2",
        videos: [
          {
            title: "فصل 2",
            videoLink:
              "https://www.youtube.com/watch?v=9D1x7-2FmTA&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=3",
          },
        ],
      },
    ]),
    // miniDescribe:
    //   "در این دوره شما استاد طراحی فرانت اند با ابزار فوق العاده قدرت مند React خواهید شد. ما در این دوره حتی اگر صفر باشید شما را به سطح استادی میرسانیم و با اتمام این دوره خیلی راحت میتوانید به بازار کار وارد شوید."
    miniDescribe: courseDescription.description,
    techs: techCategory,
    capacity: parseInt(
      courseDetail.currentRegistrants + courseDetail.currentRegistrants / 3
    ),
  };

  // const { id } = useParams();
  const { isOpen, onOpen } = useModal();
  const { userData, courseBookmark, removeCourseBookmark } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  // const [isBookmarked, setIsBookmarked] = useState(false);
  // const [teacher, setTeacher] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const [isMounted, setIsMounted] = useState(false);
  const [likeCount, setLikeCount] = useState(course.likeCount);
  const [dissLikeCount, setDisLikeCount] = useState(course.dissLikeCount);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [isUserDisliked, setIsUserDisliked] = useState(false);

  // const {
  //   data: course,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["course_id", id],
  //   queryFn: () => getCourseById(id),
  //   staleTime: 5000,
  //   enabled: false,
  // });
  // useMemo(() => {
  //   if (isSuccess) {
  //     getTeacherById(course?.teacherId).then((res) => setTeacher(res));
  //     setLikeCount(course?.likeCount);
  //     setDisLikeCount(course?.dissLikeCount);
  //     m;
  //   }
  // }, [isSuccess, course?.teacherId, course?.likeCount, course?.dissLikeCount]);

  const handleAvatar = () => {
    const TeacherAvatar = {
      "آرمان رضوانی": Arman,
      "امیرعباس بابائی": Amir,
    };
    let x;
    for (const i in TeacherAvatar) {
      if (course.teacherName === i) {
        x = TeacherAvatar[i];
      }
    }
    return x;
  };
  const teacherAvatar = handleAvatar();

  const handleTeacherId = () => {
    let x;
    if (course.teacherName === "آرمان رضوانی") {
      x = 0;
    } else if (course.teacherName === "امیرعباس بابائی") {
      x = 1;
    }
    return x;
  };

  const teacher = {
    teacherId: handleTeacherId(),
    fullName: course.teacherName,
    pictureAddress: teacherAvatar,
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript", "C#", "Python"],
  };

  const details = course && [
    {
      id: 1,
      label: "توضیحات",
      value: course?.miniDescribe,
    },
    {
      id: 2,
      label: "سرفصل‌ ها",
      seasons: JSON.parse(course?.describe),
    },
    {
      id: 3,
      label: "درباره استاد",
      value: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون 
      .و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
      کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
      .طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
      در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروف چینی
      .دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
      teacher: {
        id: course?.teacherId,
        name: course?.teacher,
        image: course?.teacherAvatar,
      },
    },
    {
      id: 4,
      label: "نظرات",
      comments: [
        {
          id: 1,
          title: "متشکرم از دوره خوبتنون",
          describe: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
          .در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
          کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
          برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام
          و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
           .سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
          insertDate: course?.createdAt,
          pictureAddress: Amir,
          author: "امیرعباس",
          currentUserEmotion: "",
          likeCount: 4,
          disslikeCount: 1,
          acceptReplysCount: 1,
        },
      ],
    },
  ];
  const [selected, setSelected] = useState("توضیحات");

  const startDate = new Date(course?.startTime)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const endDate = new Date(course?.endTime)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const months = [
    "فروردين",
    "ارديبهشت",
    "خرداد",
    "تير",
    "مرداد",
    "شهريور",
    "مهر",
    "آبان",
    "آذر",
    "دي",
    "بهمن",
    "اسفند",
  ];
  const registered = course?.currentRegistrants;

  const handleBookmark = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      if (isBookmarked) await removeCourseBookmark(course.courseId);
      else await courseBookmark(course);
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };

  const isBookmarked = useMemo(
    () => userData.favoriteCourse.some((c) => c.courseId === course.courseId),
    [userData.favoriteCourse]
  );

  const isInCart = useMemo(
    () => userData.cart.some((c) => c.courseId === course.courseId),
    [userData.cart]
  );
  const isPurchased = useMemo(
    () => userData.myCourses.some((c) => c.courseId === course.courseId),
    [userData.myCourses]
  );

  const handleLike = async () => {
    try {
      setIsPending(true);
      if (isUserLiked) {
        setIsUserLiked(false);
        setLikeCount((c) => c - 1);
      }
      if (isUserDisliked) {
        setIsUserLiked(true);
        setIsUserDisliked(false);
        setLikeCount((c) => c + 1);
        setDisLikeCount((c) => c - 1);
      }
      if (!isUserDisliked && !isUserLiked) {
        setIsUserLiked(true);
        setLikeCount((c) => c + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };
  const handleDisslike = () => {
    try {
      setIsPending(true);
      if (isUserDisliked) {
        setIsUserDisliked(false);
        setDisLikeCount((c) => c - 1);
      }
      if (isUserLiked) {
        setIsUserDisliked(true);
        setIsUserLiked(false);
        setDisLikeCount((c) => c + 1);
        setLikeCount((c) => c - 1);
      }
      if (!isUserDisliked && !isUserLiked) {
        setIsUserDisliked(true);
        setDisLikeCount((c) => c + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;
  return (
    <motion.div
      variants={fade}
      initial="initial"
      animate="animate"
      className="max-w-[1700px] mx-auto flex flex-col justify-center items-start gap-y-10 px-5 py-5 pt-20"
    >
      <div>
        <NavigatorTracer />
      </div>
      {/* BookMark and Teacher Pic */}
      <div className="w-full flex flex-col sm:flex-row px-12 justify-between items-start sm:items-center gap-10 mt-5 mb-10">
        <div className="flex justify-center items-center gap-x-2">
          <button
            disabled={isPending}
            onClick={handleBookmark}
            className="text-primary hover:text-primary/80 dark:text-dark-primary dark:hover:text-dark-primary/80 disabled:text-primary/70 dark:disabled:text-dark-primary/70 disabled:cursor-not-allowed  transition cursor-pointer"
          >
            <Bookmark
              className={cn(
                "h-12 w-12",
                isBookmarked && "fill-primary dark:fill-dark-primary"
              )}
            />
          </button>
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-lg text-gray-400 dark:text-gray-300">
              دسته بندی
            </h5>
            <h5 className="text-xl text-gray-600/80 dark:text-gray-300/80">
              {/* {course?.techs.join(",")} */}
              {course?.techs}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          {teacher?.pictureAddress ? (
            <img
              // src={teacher?.pictureAddress}
              src={teacherAvatar}
              alt="teacherPic"
              className="object-cover h-[72px] w-[72px] rounded-full"
            />
          ) : (
            <User className="dark:text-gray-300/80" />
          )}
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-xl text-gray-400 dark:text-gray-300">
              استاد :
            </h5>
            <h5 className="text-2xl text-gray-600/80 dark:text-gray-300/80">
              {teacher?.fullName}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-5 self-end">
          <button
            onClick={handleLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2  dark:text-dark-primary text-primary hover:text-primary/80 dark:hover:text-dark-primary/80 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <ThumbsUp
              className={cn(
                "h-7 w-7 md:h-8 md:w-8",
                isUserLiked && "fill-primary dark:fill-dark-primary"
              )}
            />
            <p className="text-2xl md:text-2xl dark:text-gray-300 text-gray-500">
              {getPersianNumbers(likeCount)}
            </p>
          </button>
          <button
            onClick={handleDisslike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <ThumbsDown
              className={cn(
                "h-7 w-7 md:h-8 md:w-8",
                isUserDisliked && "fill-destructive dark:fill-dark-destructive"
              )}
            />
            <p className="text-2xl md:text-2xl dark:text-gray-300 text-gray-500">
              {getPersianNumbers(dissLikeCount)}
            </p>
          </button>
          <div className="flex flex-row-reverse items-start justify-center">
            <StarRate
              id="CourseId"
              data={course}
              queryKey="course_id"
              rateFn={() => {}}
              size={26}
            />
          </div>
        </div>
      </div>

      {/* Title & Add */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-10 px-10">
        {/* Title Div */}
        <div>
          <h1 className="text-3xl text-gray-700 dark:text-gray-200">
            {course?.title}
          </h1>
        </div>
        {/* Add Div */}
        <div className=" flex flex-col items-center justify-center gap-y-3">
          {isInCart ? (
            <button
              onClick={() =>
                onOpen(
                  userData.user ? "confirmDeleteModal" : "unauthorizedModal",
                  course.courseId
                )
              }
              className="w-full px-20 py-2 bg-destructive dark:bg-dark-destructive hover:bg-destructive/80 dark:hover:bg-dark-destructive/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-destructive/80 disabled:cursor-not-allowed transition rounded-full "
            >
              حذف از سبد خرید
            </button>
          ) : isPurchased ? (
            <p className="w-full px-20 py-2 bg-emerald-500 dark:bg-emerald-700 cursor-default text-gray-100 dark:text-gray-200 rounded-full">
              شما این دوره را خریده‌اید
            </p>
          ) : (
            <button
              onClick={() =>
                onOpen(
                  userData.user ? "confirmModal" : "unauthorizedModal",
                  course
                )
              }
              className="w-full px-20 py-2 bg-primary dark:bg-dark-primary hover:bg-primary/80 dark:hover:bg-dark-primary/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-primary/80 disabled:cursor-not-allowed transition rounded-full "
            >
              افزودن به سبد خرید
            </button>
          )}
          <button
            onClick={() => onOpen("shareModal")}
            disabled={isOpen}
            className="w-full px-20 py-2 border-2 border-primary dark:border-dark-primary bg-white/20 dark:bg-gray-300 dark:hover:bg-gray-300/90 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
          >
            اشتراک گذاری
          </button>
        </div>
      </div>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5 gap-y-20">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <div className="relative w-full mx-auto h-[500px]">
            <img
              className="rounded-xl w-full h-full object-fill"
              // src={defaultCourseThumbnail || course?.imageAddress}
              src={course.imageAddress}
              alt="courseImage"
            />
          </div>
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
                teacher={teacher}
                key={detail.id}
                details={detail}
                selected={selected}
              />
            ))}
          </div>
        </div>

        {/* Course Infos */}
        <div className="w-full xl:w-1/4 flex flex-col sm:flex-row xl:flex-col flex-wrap items-center sm:items-start xl:items-start justify-evenly gap-y-10">
          <div className="flex flex-col items-start gap-7 ">
            <Banner title="مشخصات دوره" className="text-xl" height="h-9" />
            <span className="flex justify-between items-center text-gray-500 dark:text-gray-300 text-sm gap-x-2">
              <User2 className="text-primary dark:text-gray-300/80 h-6 w-6" />
              <h5 className="text-gray-600 dark:text-gray-300/80">
                {`ظرفیت: ${getPersianNumbers(course?.capacity)}`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 dark:text-gray-300 text-sm gap-x-2">
              <Clock className="text-primary dark:text-gray-300/80 h-6 w-6" />
              <h5 className="text-gray-600 dark:text-gray-300/80">
                {`تاریخ شروع : ${getPersianNumbers(startDate?.[2], true)} ${
                  months[startDate?.[1] - 1]
                } ${getPersianNumbers(startDate?.[0], true)}`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 dark:text-gray-300 text-sm gap-x-2">
              <Clock className="text-primary dark:text-gray-300/80 h-6 w-6" />
              <h5 className="text-gray-600 dark:text-gray-300/80">
                {`تاریخ پایان : ${getPersianNumbers(endDate?.[2])} ${
                  months[endDate?.[1] - 1]
                } ${getPersianNumbers(endDate?.[0], true)}`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 dark:text-gray-300 text-sm gap-x-2">
              <Tags className="text-primary dark:text-gray-300/80 h-6 w-6" />
              قیمت:
              <h5 className="text-gray-600 dark:text-gray-300/80">
                {`${getPersianNumbers(course?.cost, false)} تومان`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 dark:text-gray-300 text-sm gap-x-2">
              <Users2 className="text-primary dark:text-gray-300/80 h-6 w-6" />
              ظرفیت پر شده:
              <h5 className="text-gray-600 dark:text-gray-300/80">
                {getPersianNumbers(registered, false)}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 dark:text-gray-300 text-sm gap-x-2">
              <Book className="text-primary dark:text-gray-300/80 h-6 w-6" />
              تعداد فصول:
              <h5 className="text-gray-600 dark:text-gray-300/80">
                {getPersianNumbers(details?.[1].seasons.length, false)}
              </h5>
            </span>
          </div>
          <div className="flex flex-col justify-center items-center xl:items-start w-full sm:w-1/4 xl:w-full">
            <Banner
              title="جدید ترین دوره ها"
              className="text-xl"
              height="h-9"
            />
            <NewCourseCard />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-10 2xl">
        <Banner title="دوره های مشابه" />
        <Slider />
        <div></div>
      </div>
    </motion.div>
  );
};
