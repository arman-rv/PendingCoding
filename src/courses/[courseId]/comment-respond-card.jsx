import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";

import { replyComment } from "../../core/services/api/get-courses";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";
import { CommentResponds } from "./comment-responds";
import { AnswerForm } from "./answer-form";

const backdrop = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
};

const formSchema = z.object({
  subject: z
    .string()
    .min(10, {
      message: `عنوان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(20, {
      message: `عنوان باید کمتر از ${getPersianNumbers(20)} کلمه باشد`,
    }),
  message: z
    .string()
    .min(15, {
      message: `پاسختان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(100, {
      message: `پاسختان باید کمتر از ${getPersianNumbers(100)} کلمه باشد`,
    }),
});
export const CommentRespondCard = ({ respond, updateFn }) => {
  const { onOpen } = useModal();
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [likeCount, setLikeCount] = useState(respond.likeCount);
  const [dissLikeCount, setDisLikeCount] = useState(respond.disslikeCount);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [isUserDisliked, setIsUserDisliked] = useState(false);
  const form = useForm({
    defaultValues: {
      subject: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const fullName = `${userData.user?.fName}-${userData.user?.lName}`;

  const differenceInDays = Math.round(
    (new Date().getTime() - new Date(respond?.insertDate).getTime()) /
      (1000 * 3600 * 24)
  );
  const postDate = new Date(respond.insertDate)
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

  const handleLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };
  const handleDisslike = () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const Obj = {
        CommentId: respond.id,
        CourseId: respond.courseId,
        Title: values.subject,
        Describe: values.message,
      };
      await replyComment(Obj).then((res) => {
        toast.success("نظرتان ثبت شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsAnswering(false);
    form.reset();
  };
  const handleEdit = () => {
    if (userData.user) setIsEditing(true);
    else onOpen("unauthorizedModal");
  };

  const handleAnswer = () => {
    if (userData.user) setIsAnswering(true);
    else onOpen("unauthorizedModal");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-2 gap-10">
      <div className="shadow-md dark:shadow-gray-600 bg-gray-300/20 dark:bg-gray-700 rounded-lg w-full flex flex-col justify-center items-start px-4 py-2">
        {/* Title and Author div */}
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-5 py-5 border-b-2 border-gray-400/50 dark:border-gray-400 rounded-xl w-full">
          <span className="flex items-center justify-center gap-x-3">
            {respond?.pictureAddress ? (
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={respond?.pictureAddress}
                alt="asda"
              />
            ) : (
              <User className="dark:text-gray-300 text-gray-500" />
            )}
            <h2 className="text-gray-600 dark:text-gray-200">
              {respond?.author}
            </h2>
          </span>
          <h4 className="text-gray-600 dark:text-gray-200 mr-5 sm:ml-5">{`عنوان : ${respond?.title}`}</h4>
        </div>
        <div className="w-full my-2 space-y-2">
          {/* Comment,likes,dislikes */}
          <div className="py-2 pb-7 px-4 flex flex-wrap justify-end sm:justify-between items-center space-y-4">
            {isEditing ? (
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex items-center justify-start gap-x-5">
                  <input
                    id="message"
                    name="message"
                    className={cn(
                      "resize-none w-full max-w-sm disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-9 py-3 duration-200 border-gray-300 focus:border-gray-400",
                      form.formState.errors.message &&
                        "border-destructive dark:border-dark-destructive focus:border-destructive dark:focus:border-dark-destructive"
                    )}
                    placeholder="عنوان پیام"
                    {...form.register("message")}
                  />
                  <button
                    type="submit"
                    className="bg-primary text-gray-100 hover:bg-primary/80 hover:text-gray-100/80 disabled:bg-primary/80 disabled:text-gray-100/80 disabled:cursor-not-allowed rounded-lg px-3 py-2"
                  >
                    ذخیره
                  </button>
                  <button
                    onClick={handleClose}
                    className="bg-gray-300 text-gray-600 hover:bg-gray-300/80 hover:text-gray-600/80 shadow-lg px-3 py-2 rounded-lg"
                  >
                    لغو
                  </button>
                </div>

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
              </form>
            ) : (
              <p className="w-full sm:w-[80%] md:w-[83%] lg:w-[86%] xl:w-[90%] text-justify dark:text-gray-300 text-gray-500">
                {respond?.describe}
              </p>
            )}
            {!isEditing && !isAnswering && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleLike}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-x-1 dark:text-dark-primary text-primary hover:text-primary dark:hover:text-dark-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ThumbsUp
                    className={cn(
                      "h-5 w-5",
                      isUserLiked && "fill-primary dark:fill-dark-primary"
                    )}
                  />
                  <p className="text-xl md:text-lg dark:text-gray-300 text-gray-500">
                    {getPersianNumbers(likeCount)}
                  </p>
                </button>
                <button
                  onClick={handleDisslike}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-1 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ThumbsDown
                    className={cn(
                      "h-5 w-5",
                      isUserDisliked &&
                        "fill-destructive dark:fill-dark-destructive"
                    )}
                  />
                  <p className="text-xl md:text-lg dark:text-gray-300 text-gray-500">
                    {getPersianNumbers(dissLikeCount)}
                  </p>
                </button>
              </div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {isAnswering && (
              <AnswerForm
                comment={respond}
                setIsAnswering={setIsAnswering}
                updateFn={updateFn}
              />
            )}
          </AnimatePresence>
          {!isAnswering && !isEditing && (
            <div className="w-full flex items-center justify-between">
              {fullName === respond?.author ? (
                <button
                  onClick={handleEdit}
                  className="flex justify-center items-center gap-x-2 text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-3 py-3"
                >
                  <Pencil className="h-4 w-4" />
                  ویرایش
                </button>
              ) : (
                <div></div>
              )}
              <button
                onClick={handleAnswer}
                className="text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-4 py-3"
              >
                پاسخ
              </button>
            </div>
          )}
          {/* post_date */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-between">
            <p className="dark:text-gray-300 text-gray-500">
              {`${getPersianNumbers(postDate?.[2], true)} ${
                months[postDate?.[1] - 1]
              } ${getPersianNumbers(postDate?.[0], true)}`}
            </p>
            <span className="flex gap-x-1">
              <Clock className="text-gray-500 dark:text-gray-300" />
              <p className="dark:text-gray-300 text-gray-500">
                {differenceInDays === 0
                  ? "لحظه‌ای پیش"
                  : `${getPersianNumbers(differenceInDays)} روز پیش`}
              </p>
            </span>
          </div>
          {respond?.acceptReplysCount !== 0 && (
            <>
              {showReplies ? (
                <>
                  <button
                    onClick={() => setShowReplies(false)}
                    className="flex mt-4 text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-4 py-3"
                  >
                    {respond?.acceptReplysCount > 1
                      ? `پنهان کردن پاسخ‌ها`
                      : respond?.acceptReplysCount === 1 && "پنهان کردن پاسخ‌"}
                    <ChevronUp className="h-4 w-4 mt-[2px]" />
                  </button>
                  <CommentResponds commentId={respond?.id} />
                </>
              ) : (
                <button
                  onClick={() => setShowReplies(true)}
                  className="flex mt-4 text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-4 py-3"
                >
                  {respond?.acceptReplysCount > 1
                    ? `نمایش پاسخ‌ها (${getPersianNumbers(
                        respond?.acceptReplysCount
                      )})`
                    : respond?.acceptReplysCount === 1 && "نمایش  پاسخ‌"}
                  <ChevronDown className="h-4 w-4 mt-[2px]" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
