import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Bookmark, Heart, User } from "lucide-react";
import toast from "react-hot-toast";

import {
  addBlogToFavorite,
  getBlogById,
  likeBlog,
} from "../../core/services/api/get-blogs";
import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";

import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { NewCourseCard } from "../../components/new-course-card";
import { NewBlogCard } from "../../components/new-blog-card";
import { Slider } from "./slider";
import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

export const BlogInfo = () => {
  const { id } = useParams();

  const { isOpen, onOpen } = useModal();

  const { userData} = useUser();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isPending, setIsPending] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  // const [dissLikeCount, setDisLikeCount] = useState(0);

  const {
    data: blog,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blog_id", id],
    queryFn: () => getBlogById(id),
    staleTime: 5000,
  });

  const details = [
    {
      id: 1,
      label: "توضیحات",
      value: blog?.detailsNewsDto.describe,
    },
    {
      id: 2,
      label: "نظرات",
      comments: blog?.commentDtos.filter(
        (c) => c.parentId === "00000000-0000-0000-0000-000000000000"
      ),
    },
  ];
  // [
  //   {
  //     id: 1,
  //     comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
  //     .در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
  //     کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
  //     برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام
  //     و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
  //      .سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
  //     createdAt: blog?.detailsNewsDto.createdAt,
  //     user: {
  //       name: blog?.detailsNewsDto.studentName,
  //       image: blog?.detailsNewsDto?.studentImage,
  //     },
  //     responds: [
  //       {
  //         id: blog?.detailsNewsDto.teacherId,
  //         name: blog?.detailsNewsDto.teacher,
  //         image: blog?.detailsNewsDto?.teacherAvatar,
  //         respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
  //         چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
  //         .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
  //         role: "admin",
  //       },
  //       {
  //         id: blog?.detailsNewsDto.studentId || 1234,
  //         name: blog?.detailsNewsDto.studentName,
  //         image: blog?.detailsNewsDto?.studentImage,
  //         respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
  //         چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
  //         .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
  //         role: "student",
  //       },
  //     ],
  //   },
  // ],
  const [selected, setSelected] = useState(details[0].label);

  useMemo(() => {
    setIsBookMarked(blog?.detailsNewsDto.isCurrentUserFavorite);
  }, [blog?.detailsNewsDto.isCurrentUserFavorite]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const handleBookmark = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsPending(true);
      if (isBookMarked) return;
      else {
        await addBlogToFavorite(blog?.detailsNewsDto.id).then((res) => {
          if (res.success) {
            refetch();
            toast.success("به علاقه مندی اضافه شد");
          }
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
      await likeBlog(blog?.detailsNewsDto.id).then((res) => {
        if (res.success) {
          toast.success("بلاگ پسندیده شد");
          refetch();
        } else toast.error(res.message);
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsPending(false);
    }
  };
  // const handleDisLike = async () => {
  //   try {
  //     if (!userData.user) return onOpen("unauthorizedModal");
  //     setIsPending(true);
  //     await likeCourse(blog?.detailsNewsDto.id).then(() => {
  //       setDisLikeCount((c) => c + 1);
  //       toast.success("نظر پسندیده شد");
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("مشکلی پیش آمده دوباره امتحان کنید");
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

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
              "h-9 w-9 text-primary hover:text-primary/80 dark:text-dark-primary dark:hover:text-dark-primary/80 transition cursor-pointer",
              isBookMarked && "fill-primary dark:fill-dark-primary"
            )}
          />
          <span className="flex flex-col justify-center items-center gap-y-2">
            <h5 className="text-sm text-gray-400 dark:text-gray-300">
              دسته بندی
            </h5>
            <h5 className="text-sm text-gray-600/80 dark:text-gray-300/80">
              {blog?.detailsNewsDto.newsCatregoryName}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          {blog?.teacherAvatar ? (
            <img
              src={blog?.teacherAvatar}
              alt="teacherAvatar"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <User className="dark:text-gray-300/80 self-center" />
          )}
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400 dark:text-gray-300">
              استاد :
            </h5>
            <h5 className="text-sm text-gray-600/80 dark:text-gray-300/80">
              {blog?.detailsNewsDto.addUserFullName}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-3 self-end md:self-center">
          <button
            onClick={handleLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-1 dark:text-gray-300 text-gray-500 hover:text-primary dark:hover:text-dark-primary transition disabled:opacity-50 dark:disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <p className="text-2xl dark:text-gray-300 text-gray-500">
              {getPersianNumbers(blog?.detailsNewsDto.currentLikeCount)}
            </p>
            <Heart
              className={cn(
                "h-7 w-7 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition",
                blog?.detailsNewsDto.currentUserIsLike &&
                  "fill-destructive dark:fill-dark-destructive"
              )}
            />
          </button>
          {/* <button
            onClick={handleDisLike}
            disabled={isPending}
            className="flex items-center justify-center gap-x-2"
          >
            <ThumbsDown className="h-7 w-7 md:h-5 md:w-5 mt-2 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition " />
            <p className="text-2xl md:text-lg mt-2 dark:text-gray-300 text-gray-500">
              {getPersianNumbers(dissLikeCount)}
            </p>
          </button> */}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl text-gray-700 dark:text-gray-200">
        {blog?.detailsNewsDto.title}
      </h1>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5 gap-y-14">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <img
            className="rounded-xl w-full h-[475px] object-fill"
            src={blog?.detailsNewsDto.currentImageAddress}
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
                updateFn={refetch}
              />
            ))}
          </div>
        </div>

        {/* blog Infos */}
        <div className="w-full xl:w-1/4 flex flex-col items-center xl:items-start justify-center gap-y-10">
          <Banner title="جدید ترین بلاگ ها" className="text-xl" height="h-9" />
          <div className="flex flex-col items-start justify-center gap-y-5">
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
          <Banner title="جدیدترین دوره ها" className="text-xl" height="h-9" />
          <div className="flex flex-col justify-center items-start">
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
