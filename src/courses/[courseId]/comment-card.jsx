import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  ThumbsDown,
  ThumbsUp,
  Pencil,
  User,
} from "lucide-react";

import {
  disLikeComment,
  editComment,
  likeComment,
} from "../../core/services/api/get-courses";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";

import { CommentResponds } from "./comment-responds";
import { AnswerForm } from "./answer-form";

const formSchema = z.object({
  message: z
    .string()
    .min(15, {
      message: `پاسختان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(100, {
      message: `پاسختان باید کمتر از ${getPersianNumbers(100)} کلمه باشد`,
    }),
});

export const CommentCard = ({ comment, updateFn, user }) => {
  const { onOpen } = useModal();
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fullName = `${user?.fName}-${user?.lName}`;

  const form = useForm({
    defaultValues: {
      message: comment?.describe,
    },
    resolver: zodResolver(formSchema),
  });

  const differenceInDays = Math.round(
    (new Date().getTime() - new Date(comment?.insertDate).getTime()) /
      (1000 * 3600 * 24)
  );
  const postDate = new Date(comment?.insertDate)
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

  const onSubmit = async (values) => {
    try {
      const Obj = {
        CommentId: comment?.id,
        CourseId: comment?.courseId,
        Title: comment?.title,
        Describe: values.message,
      };
      await editComment(Obj).then(() => {
        updateFn();
        toast.success("نظرتان ویرایش شد");
        setIsEditing(false);
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    }
  };

  const handleLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsLoading(true);
      const params = {
        CourseCommandId: comment.id,
      };
      await likeComment(params).then((res) => {
        updateFn();
        if (res.success) toast.success("نظر پسندیده شد");
        else toast.error(res.message);
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDisLike = async () => {
    try {
      if (!userData.user) return onOpen("unauthorizedModal");
      setIsLoading(true);
      const params = {
        CourseCommandId: comment?.id,
      };
      await disLikeComment(params).then((res) => {
        updateFn();
        if (res.success) toast.success("نظر نقد شد");
        else toast.error(res.message);
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = () => {
    if (userData.user) setIsAnswering(true);
    else onOpen("unauthorizedModal");
  };

  const handleEdit = () => {
    if (userData.user) setIsEditing(true);
    else onOpen("unauthorizedModal");
  };

  const handleClose = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center py-2 gap-x-10">
        <div className="shadow-md dark:shadow-gray-600 bg-gray-300/20 dark:bg-gray-700 rounded-lg w-full flex flex-col justify-center items-start px-4 py-2">
          {/* Title and Author div */}
          <div className="flex justify-between items-center gap-x-5 py-5 border-b-2 border-gray-400/50 dark:border-gray-400 rounded-xl w-full">
            <span className="flex items-center justify-center gap-x-3">
              {comment?.pictureAddress ? (
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={comment?.pictureAddress}
                  alt="asda"
                />
              ) : (
                <User className="dark:text-gray-300 text-gray-500" />
              )}
              <h2 className="text-gray-600 dark:text-gray-200">
                {comment?.author}
              </h2>
            </span>
            <h4 className="text-gray-600 dark:text-gray-200 ml-5">{`عنوان : ${comment?.title}`}</h4>
          </div>
          <div className="w-full my-2">
            {/* Comment,likes,dislikes */}
            <div className="flex items-center justify-between py-2 pb-7 px-4">
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
                <p className="dark:text-gray-300 text-gray-500">
                  {comment?.describe}
                </p>
              )}
              {!isEditing && !isAnswering && (
                <div className="flex items-center justify-center gap-x-3">
                  <button
                    onClick={handleLike}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-x-1 dark:text-dark-primary text-primary hover:text-primary dark:hover:text-dark-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ThumbsUp
                      className={cn(
                        "h-7 w-7 md:h-5 md:w-5 mt-2",
                        comment?.currentUserEmotion === "LIKED" &&
                          "fill-primary dark:fill-dark-primary"
                      )}
                    />
                    <p className="text-2xl md:text-lg mt-2 dark:text-gray-300 text-gray-500">
                      {getPersianNumbers(comment?.likeCount)}
                    </p>
                  </button>
                  <button
                    onClick={handleDisLike}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-x-1 dark:text-dark-destructive text-destructive hover:text-destructive/80 dark:hover:text-dark-destructive/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ThumbsDown
                      className={cn(
                        "h-7 w-7 md:h-5 md:w-5 mt-2",
                        comment?.currentUserEmotion === "DISSLIKED" &&
                          "fill-destructive dark:fill-dark-destructive"
                      )}
                    />
                    <p className="text-2xl md:text-lg mt-2 dark:text-gray-300 text-gray-500">
                      {getPersianNumbers(comment?.disslikeCount)}
                    </p>
                  </button>
                </div>
              )}
            </div>
            {isAnswering && (
              <AnswerForm
                comment={comment}
                setIsAnswering={setIsAnswering}
                updateFn={updateFn}
              />
            )}
            {!isAnswering && !isEditing && (
              <div className="w-full flex items-center justify-between">
                {fullName === comment?.author ? (
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
            <div className="flex flex-row-reverse items-center justify-between mt-5">
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
            {comment.acceptReplysCount !== 0 && (
              <>
                {showReplies ? (
                  <>
                    <button
                      onClick={() => setShowReplies(false)}
                      className="flex mt-4 text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-4 py-3"
                    >
                      {comment.acceptReplysCount > 1
                        ? `پنهان کردن پاسخ‌ها`
                        : comment.acceptReplysCount === 1 && "پنهان کردن پاسخ‌"}
                      <ChevronUp className="h-4 w-4 mt-[2px]" />
                    </button>
                    <CommentResponds commentId={comment?.id} />
                  </>
                ) : (
                  <button
                    onClick={() => setShowReplies(true)}
                    className="flex mt-4 text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-4 py-3"
                  >
                    {comment.acceptReplysCount > 1
                      ? `نمایش پاسخ‌ها (${getPersianNumbers(
                          comment.acceptReplysCount
                        )})`
                      : comment.acceptReplysCount === 1 && "نمایش  پاسخ‌"}
                    <ChevronDown className="h-4 w-4 mt-[2px]" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
