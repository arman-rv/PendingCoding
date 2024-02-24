import * as z from "zod";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { useModal } from "../../hooks/use-modal-store";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";
import { scrollToTop } from "../../../libs/scroll-to-top";

import { SeasonsAccordion } from "./seasons-accordion";

import { addComment } from "../../core/services/api/get-courses";

import { CommentCard } from "./comment-card";
import { Banner } from "../../components/banner";

import defaultProfileImage from "../../assets/my-profile.jpg";
import { useUser } from "../../hooks/use-user";

const backdrop = {
  hidden: {
    x: "25px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "25px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const formSchema = z.object({
  subject: z
    .string()
    .min(5, {
      message: `عنوان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(20, {
      message: `عنوان باید کمتر از ${getPersianNumbers(20)} کلمه باشد`,
    }),
  message: z
    .string()
    .min(10, {
      message: `پاسختان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(100, {
      message: `پاسختان باید کمتر از ${getPersianNumbers(100)} کلمه باشد`,
    }),
});

export const Description = ({ teacher, details, selected }) => {
  const { id: courseId } = useParams();
  const { onOpen } = useModal();
  const { userData } = useUser();

  let Info;

  const form = useForm({
    defaultValues: {
      subject: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      const Obj = {
        CourseId: courseId,
        Title: values.subject,
        Describe: values.message,
      };
      await addComment(Obj).then(() => {
        form.reset();
        scrollToTop(900);
        toast.success("نظرتان ثبت شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    }
  };

  if (selected === details.label && details.label === "توضیحات") {
    Info = (
      <motion.p
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="border-2 border-gray-300 dark:border-gray-500 px-5 py-4 rounded-xl text-gray-500 dark:text-gray-300 leading-10 text-justify"
      >
        {details.value}
      </motion.p>
    );
  } else if (selected === details.label && details.label === "سرفصل‌ ها") {
    Info = (
      <motion.ul className="border-2 border-gray-300 dark:border-gray-500 p-4 rounded-xl flex flex-col items-start justify-center gap-5">
        {details?.seasons?.map((season) => (
          <motion.li
            key={season.name}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-gray-500 dark:text-gray-300 leading-5 text-justify w-full"
          >
            <SeasonsAccordion season={season} courseId={courseId} />
          </motion.li>
        ))}
      </motion.ul>
    );
  } else if (selected === details.label && details.label === "درباره استاد") {
    Info = (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="border-2 border-gray-300 dark:border-gray-500 p-4 rounded-xl flex flex-col xl:flex-row justify-center items-center gap-x-10"
      >
        <div className="w-full xl:max-w-xs flex flex-col justify-center items-center gap-y-3 pb-5 xl:pl-5 border-b xl:border-l xl:border-b-0 border-gray-300 dark:border-gray-400">
          <img
            className="object-cover w-24 h-24 rounded-full"
            src={teacher?.pictureAddress || defaultProfileImage}
            alt="teacherAvatar"
          />
          <h3 className="text-gray-700 dark:text-gray-200 text-lg text-center">
            {teacher?.fullName}
          </h3>
          <Link
            to={`/teachers/${teacher?.teacherId}`}
            className="w-full sm:w-1/3 xl:w-full py-2 text-center bg-primary dark:bg-dark-primary hover:bg-primary/80 dark:hover:bg-dark-primary/80 text-gray-100 hover:text-gray-100/90 disabled:text-white/90 disabled:bg-primary/80 disabled:cursor-not-allowed transition rounded-full "
          >
            نمایش پروفایل
          </Link>
          <button
            onClick={() => onOpen("sendRespond")}
            className="w-full sm:w-1/3 xl:w-full py-2 border-2 border-primary dark:border-dark-primary bg-white/20 dark:bg-gray-300 dark:hover:bg-gray-300/90 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
          >
            ارسال پیام
          </button>
        </div>
        <p className="w-full self-start leading-9 text-gray-600 dark:text-gray-300 text-justify">
          {`👨‍💻 ${teacher?.fullName || "در اینجا"} استادی حرفه‌ای در حوزه ${
            teacher?.skills.length !== 0
              ? teacher?.skills.join(", ")
              : "مهندسی نرم‌افزار"
          } است! با اطلاعات کم، می‌توانم اینگونه توانایی‌های استاد را معرفی کنم:`}
          <br />
          {`🌟 تخصص در مهندسی نرم‌افزار`}
          <br />
          {"💡 دانش گسترده در طراحی، پیاده‌سازی و توسعه نرم‌افزارها"}
          <br />
          {"📚 تجربه چندساله در تدریس مباحث مهندسی نرم‌افزار"}
          <br />
          {"🔬 تحقیقات و توسعه‌های فعال در زمینه‌های نوآوری و فناوری‌های جدید"}
          <br />
          {"💻 آشنایی با زبان‌ها و فریم‌ورک‌های مختلف برنامه‌نویسی"}
          <br />
          {
            "🔧 مهارت در استفاده از ابزارها و تکنولوژی‌های پیشرفته در مهندسی نرم‌افزار"
          }
          <br />
          {"👨‍🏫 ارائه بهترین روش‌ها و شیوه‌های آموزشی به دانشجویان"}
          <br />
          {
            "✨ این استاد با تمام شغف، دانش خود را برای رشد و پیشرفت دانشجویان به کار می‌گیرد."
          }
        </p>
      </motion.div>
    );
  } else if (selected === details.label && details.label === "نظرات") {
    Info = (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center justify-center gap-y-10"
      >
        <div className="w-full border-2 border-gray-300 dark:border-gray-500 px-3 py-2 sm:px-5 sm:py-4 rounded-xl">
          {/* {isLoading ? (
            <Loading />
          ) : (
            <>
              {comments?.length > 0 ? (
                <>
                  {filteredData?.slice(0, count).map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      user={data}
                      updateFn={refetch}
                    />
                  ))}
                  {comments.length > 4 && (
                    <div className="w-full flex items-center justify-center mt-2">
                      <button
                        onClick={handleMore}
                        className="flex items-center justify-center gap-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-900 transition bg-gray-300/40 hover:bg-gray-300/60 dark:bg-gray-300 dark:hover:bg-gray-300/80 hover:shadow-md px-4 py-3 rounded-xl"
                      >
                        {count >= comments?.length ? (
                          <>
                            نمایش کمتر
                            <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          </>
                        ) : (
                          <>
                            نمایش بیشتر
                            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-lg text-gray-500 dark:text-gray-300">
                  نظری برای این دوره تاکنون ثبت نشده است
                </p>
              )}
            </>
          )}
          {isError && <Error />} */}
          {details?.comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              // user={data}
              // updateFn={refetch}
            />
          ))}
        </div>
        {userData.user && (
          <div className="w-full flex flex-col justify-center items-start gap-y-7">
            <Banner
              title="دیدگاه خود را با ما به اشتراک بگذارید"
              height="h-8"
              className="text-lg"
            />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-2"
            >
              <label
                htmlFor="respond"
                className="text-sm text-gray-500 dark:text-gray-300 px-1"
              >
                عنوان
              </label>
              <input
                className={cn(
                  "resize-none w-full max-w-sm disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-9 py-3 duration-200 border-gray-300 focus:border-gray-400",
                  form.formState.errors.subject &&
                    "border-destructive dark:border-dark-destructive focus:border-destructive dark:focus:border-dark-destructive"
                )}
                placeholder="عنوان پیام"
                {...form.register("subject")}
              />
              <p
                className={cn(
                  "opacity-0 text-destructive dark:text-dark-destructive",
                  form.formState.errors.subject && "opacity-100"
                )}
              >
                {form.formState.errors.subject
                  ? form.formState.errors.subject.message
                  : "ss"}
              </p>
              <label
                htmlFor="respond"
                className="text-sm text-gray-500 dark:text-gray-300 px-1"
              >
                پاسخ
              </label>
              <textarea
                className={cn(
                  "resize-none w-full h-40 disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400",
                  form.formState.errors.message &&
                    "border-destructive dark:border-dark-destructive focus:border-destructive dark:focus:border-dark-destructive"
                )}
                placeholder="متن پیام"
                {...form.register("message")}
              />
              <p
                className={cn(
                  "opacity-0 text-destructive dark:text-dark-destructive",
                  form.formState.errors.message && "opacity-100"
                )}
              >
                {form.formState.errors.message
                  ? form.formState.errors.message.message
                  : "ss"}
              </p>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="text-white hover:text-white/80 bg-[#505050] hover:bg-[#505050]/80 disabled:bg-[#505050]/80 disabled:text-white/80 disabled:cursor-not-allowed py-2 text-lg self-start my-4 mr-5 px-10 rounded-xl transition"
              >
                ارسال پیام
              </button>
            </form>
          </div>
        )}
      </motion.div>
    );
  }
  return <div className={selected !== details.label && "hidden"}>{Info}</div>;
};
