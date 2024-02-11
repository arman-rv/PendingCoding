import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
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

import {
  addCourseToFavorites,
  deleteCourseFavorite,
  deleteCourseLike,
  dissLikeCourse,
  getCourseById,
  likeCourse,
  rateCourse,
} from "../../core/services/api/get-courses";
import { getTeacherById } from "../../core/services/api/get-teacher";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";

import { StarRate } from "../../components/starRate";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import NavigatorTracer from "../../components/navigator-tracer";
import { NewCourseCard } from "../../components/new-course-card";
import { Banner } from "../../components/banner";
import { Header } from "./header";
import { Description } from "./description";
import { Slider } from "./slider";

import defaultCourseThumbnail from "../../assets/typescript.jpeg";

export const CourseInfo = () => {
  const { id } = useParams();
  const { isOpen, onOpen } = useModal();
  const { userData } = useUser();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dissLikeCount, setDisLikeCount] = useState(0);

  const {
    data: course,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["course_id", id],
    queryFn: () => getCourseById(id),
    staleTime: 5000,
    enabled: false,
  });
  useMemo(() => {
    if (isSuccess) {
      getTeacherById(course?.teacherId).then((res) => setTeacher(res));
      setLikeCount(course?.likeCount);
      setDisLikeCount(course?.dissLikeCount);
      setIsBookMarked;
    }
  }, [isSuccess, course?.teacherId, course?.likeCount, course?.dissLikeCount]);
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
          comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
          .در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
          کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
          برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام
          و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
           .سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
          createdAt: course?.createdAt,
          user: {
            name: course?.studentName,
            image: course?.studentImage,
          },
          responds: [
            {
              id: course?.teacherId,
              name: course?.teacher,
              image: course?.teacherAvatar,
              respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
              role: "admin",
            },
            {
              id: course?.studentId || 1234,
              name: course?.studentName,
              image: course?.studentImage,
              respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
              role: "student",
            },
          ],
        },
      ],
    },
  ];
  const [selected, setSelected] = useState("توضیحات");

  const isInCart = useMemo(
    () => course?.courseReseveId !== "00000000-0000-0000-0000-000000000000",
    [course?.courseReseveId]
  );
  const isPurchased = useMemo(
    () => +course?.isCourseUser,
    [course?.isCourseUser]
  );

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      refetch();
    }
  }, [isMounted, refetch]);

  useMemo(() => {
    const isBookMarked =
      course?.userFavoriteId !== "00000000-0000-0000-0000-000000000000";
    setIsBookMarked(isBookMarked);
  }, [course?.userFavoriteId]);

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
      if (isBookMarked)
        await deleteCourseFavorite(course?.userFavoriteId).then((res) => {
          if (res.success)
            refetch().then(() => toast.success("از علاقه مندی حذف شد"));
          else toast.error("مشکلی پیش آمده دوباره امتحان کنید");
        });
      else {
        await addCourseToFavorites(course?.courseId).then((res) => {
          if (res.success)
            refetch().then(() => toast.success("به علاقه مندی اضافه شد"));
          else toast.error("مشکلی پیش آمده دوباره امتحان کنید");
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };

  const handleLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      if (+course?.currentUserLike)
        await deleteCourseLike(course?.userLikeId).then(() => {
          toast.success("لایک پس گرفته شد");
          refetch();
        });
      else
        await likeCourse(course?.courseId).then(() => {
          toast.success("دوره پسندیده شد");
          refetch();
        });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };
  const handleDisLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      await dissLikeCourse(course?.courseId).then(() => {
        toast.success("دوره نقد شد");
        refetch();
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };

  if (!isMounted) return null;
  if (isLoading && !teacher) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="max-w-[1700px] mx-auto flex flex-col justify-center items-start gap-y-10 px-5 py-5 pt-20">
      <div>
        <NavigatorTracer />
      </div>
      {/* BookMark and Teacher Pic */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 mt-5 mb-10">
        <div className="flex justify-center items-center gap-x-2">
          <button
            disabled={isPending}
            onClick={handleBookmark}
            className="text-primary hover:text-primary/80 dark:text-dark-primary dark:hover:text-dark-primary/80 disabled:text-primary/70 dark:disabled:text-dark-primary/70 disabled:cursor-not-allowed  transition cursor-pointer"
          >
            <Bookmark
              className={cn(
                "h-9 w-9",
                isBookMarked && "fill-primary dark:fill-dark-primary"
              )}
            />
          </button>
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400 dark:text-gray-300">
              دسته بندی
            </h5>
            <h5 className="text-sm text-gray-600/80 dark:text-gray-300/80">
              {course?.techs.join(",")}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          {teacher?.pictureAddress ? (
            <img
              src={teacher?.pictureAddress}
              alt="teacherPic"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <User className="dark:text-gray-300/80" />
          )}
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400 dark:text-gray-300">
              استاد :
            </h5>
            <h5 className="text-sm text-gray-600/80 dark:text-gray-300/80">
              {teacher?.fullName}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-3 self-end">
          <button
            onClick={handleLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2  dark:text-dark-primary text-primary hover:text-primary/80 dark:hover:text-dark-primary/80 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <ThumbsUp
              className={cn(
                "h-7 w-7 md:h-5 md:w-5",
                +course?.currentUserLike &&
                  "fill-primary dark:fill-dark-primary"
              )}
            />
            <p className="text-2xl md:text-lg dark:text-gray-300 text-gray-500">
              {getPersianNumbers(likeCount)}
            </p>
          </button>
          <button
            onClick={handleDisLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <ThumbsDown
              className={cn(
                "h-7 w-7 md:h-5 md:w-5",
                +course?.currentUserDissLike &&
                  "fill-destructive dark:fill-dark-destructive"
              )}
            />
            <p className="text-2xl md:text-lg dark:text-gray-300 text-gray-500">
              {getPersianNumbers(dissLikeCount)}
            </p>
          </button>
          <div className="flex flex-row-reverse items-start justify-center">
            <StarRate
              id="CourseId"
              data={course}
              queryKey="course_id"
              rateFn={rateCourse}
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
                  {
                    course: course && course,
                    reserveId: course?.courseReseveId,
                  }
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
                onOpen(userData.user ? "confirmModal" : "unauthorizedModal", {
                  course: course && course,
                })
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
          <div className="relative w-full h-[475px]">
            <img
              className="rounded-xl w-full h-full object-fill"
              src={defaultCourseThumbnail || course?.imageAddress}
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
        <div className="w-full xl:w-1/4 flex flex-col items-center xl:items-start justify-center gap-y-10">
          <div className="flex flex-col items-start justify-center gap-y-5">
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
          <div className="flex flex-col justify-center items-start w-1/4 xl:w-full">
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
    </div>
  );
};
