import { useEffect, useMemo, useState } from "react";
import { Bookmark, Heart, User } from "lucide-react";
import toast from "react-hot-toast";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";

import { Loading } from "../../components/loading";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { NewCourseCard } from "../../components/new-course-card";
import { NewBlogCard } from "../../components/new-blog-card";
import { Slider } from "./slider";
import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import Amir from "../../assets/amir.jpg";
import Arman from "../../assets/arman.jpg";

import { blogs } from "../../static-data/blogs";
import { useParams } from "react-router-dom";

export const BlogInfo = () => {
  const { id } = useParams();
  const blogsItems = blogs[id];

  const handleAvatar = () => {
    const TeacherAvatar = {
      "آرمان رضوانی": Arman,
      "امیرعباس بابائی": Amir,
    };
    let x;
    for (const i in TeacherAvatar) {
      if (blogsItems.addUserFullName === i) {
        x = TeacherAvatar[i];
      }
    }
    return x;
  };
  const teacherAvatar = handleAvatar();


  const blog = {
    courseId: 0,
    updatedAt: blogsItems.updateDate,
    startTime: "2024-02-16T05:34:42.901Z",
    endTime: "2024-02-16T05:34:42.901Z",
    currentImageAddress: blogsItems.currentImageAddressTumb,
    likeCount: blogsItems.likeCount,
    dissLikeCount: 10,
    title: "ری اکت",
    currentRegistrants: blogsItems.currentRegistrants,
    statusName: blogsItems.statusName,
    addUserFullName: blogsItems.addUserFullName,
    levelName: blogsItems.levelName,
    cost: blogsItems.cost,
    courseRate: blogsItems.courseRate,
    currentRate: blogsItems.currentRate,
    technologyList: blogsItems.technologyList,
    currentUserDissLike: 0,
    currentUserLike: 0,
    describe: blogsItems.description,
    miniDescribe: blogsItems.description,
    techs: ["ReactJS", "HTML5", "CSS3"],
    capacity: 40,
    teacherAvatar: teacherAvatar,
    newsCatregoryName: blogsItems.newsCatregoryName,
  };

  console.log(blogsItems)
  const { isOpen, onOpen } = useModal();

  const { userData, blogBookmark, removeBlogBookmark } = useUser();
  const [isPending, setIsPending] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likeCount);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const details = [
    {
      id: 1,
      label: "توضیحات",
      value: blog.describe,
    },
    {
      id: 2,
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
          insertDate: blog?.updatedAt,
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
  const [selected, setSelected] = useState(details[0].label);

  const isBookMarked = useMemo(
    () => userData.favoriteBlog.some((b) => b.id === blog.id),
    [userData.favoriteBlog]
  );

  const handleBookmark = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      if (isBookMarked) await removeBlogBookmark(blog.id);
      else await blogBookmark(blog);
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };

  const handleLike = async () => {
    try {
      setIsPending(true);
      if (isUserLiked) {
        setIsUserLiked(false);
        setLikeCount((c) => c - 1);
      }
      if (!isUserLiked) {
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1900px] mx-auto flex flex-col justify-center items-start gap-y-10 px-5 md:px-28 py-5 pt-20">
      <div className="flex  justify-center items-center">
        <NavigatorTracer />
      </div>
      {/* BookMark and Teacher Pic */}
      <div className="w-11/12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 mt-5 mb-10">
        <div className="flex justify-center items-center gap-x-2">
          <Bookmark
            onClick={handleBookmark}
            className={cn(
              "h-12 w-12 text-primary hover:text-primary/80 dark:text-dark-primary dark:hover:text-dark-primary/80 transition cursor-pointer",
              isBookMarked && "fill-primary dark:fill-dark-primary"
            )}
          />
          <span className="flex flex-col justify-center items-center gap-y-2">
            <h5 className="text-lg text-gray-400 dark:text-gray-300">
              دسته بندی
            </h5>
            <h5 className="text-xl text-gray-600/80 dark:text-gray-300/80">
              {blog.newsCatregoryName}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          {blog?.teacherAvatar ? (
            <img
              src={blog?.teacherAvatar}
              alt="teacherAvatar"
              className="h-[72px] w-[72px] rounded-full"
            />
          ) : (
            <User className="dark:text-gray-300/80 self-center" />
          )}
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-xl text-gray-400 dark:text-gray-300">
              استاد :
            </h5>
            <h5 className="text-xl text-gray-600/80 dark:text-gray-300/80">
              {blog.addUserFullName}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-3 self-end md:self-center">
          <button
            onClick={handleLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2 dark:text-gray-300 text-gray-500 hover:text-primary dark:hover:text-dark-primary transition disabled:opacity-50 dark:disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <p className="text-2xl dark:text-gray-300 text-gray-500">
              {getPersianNumbers(likeCount)}
            </p>
            <Heart
              className={cn(
                "h-9 w-9 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition",
                isUserLiked && "fill-destructive dark:fill-dark-destructive"
              )}
            />
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl text-gray-700 dark:text-gray-200">
        {blog.title}
      </h1>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5 gap-y-14">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <img
            className="rounded-xl w-full h-[475px] object-fill"
            src={blog.currentImageAddress}
            alt="blogImage"
          />
          <div className="flex justify-cneter items-center gap-x-20">
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
                // updateFn={refetch}
              />
            ))}
          </div>
        </div>

        {/* blog Infos */}
        <div className="w-full xl:w-1/4 flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-evenly gap-10">
          <div className="flex flex-col items-start justify-center gap-5">
            <Banner
              title="جدید ترین بلاگ ها"
              className="text-xl"
              height="h-9"
            />
            <div className="flex flex-col justify-center items-start">
              <NewBlogCard />
            </div>
            <button
              onClick={() => onOpen("shareModal")}
              disabled={isOpen}
              className="w-full py-2 border-2 border-primary dark:border-dark-primary bg-white/20 dark:bg-gray-300 dark:hover:bg-gray-300/90 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
            >
              اشتراک گذاری
            </button>
          </div>
          <div className="flex flex-col justify-center items-start">
            <Banner title="جدیدترین دوره ها" className="text-xl" height="h-9" />
            <NewCourseCard />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-10 2xl">
        <Banner title="اخرین خبر ها" />
        <Slider />
        <div></div>
      </div>
    </div>
  );
};
