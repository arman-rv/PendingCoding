import { useState } from "react";
import * as z from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

import { scrollToTop } from "../../../libs/scroll-to-top";
import { getUserProfile } from "../../core/services/api/user";

import { CommentCard } from "./comment-card";
import { Banner } from "../../components/banner";
import { addComment } from "../../core/services/api/get-blogs";
import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

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
  title: z
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

export const Description = ({ details, updateFn, selected }) => {
  const [count, setCount] = useState(4);
  const { id } = useParams();
  let Info;

  const form = useForm({
    defaultValues: {
      title: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const Obj = {
        newsId: id,
        title: values.title,
        describe: values.message,
      };
      await addComment(Obj).then((res) => {
        if (res.success) {
          updateFn();
          form.reset();
          scrollToTop(900);
          toast.success("نظرتان ثبت شد");
        } else toast.error(res.message);
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  //fetch User
  const { data } = useQuery({
    queryKey: ["user_info"],
    queryFn: () => getUserProfile(),
  });

  const handleMore = () => {
    if (count >= details.comments?.length) {
      scrollToTop(900);
      setCount(4);
    } else setCount((c) => c + 4);
  };

  const filteredData = details?.comments?.sort(
    (a, b) => new Date(b.inserDate) - new Date(a.inserDate)
  );

  if (selected === details.label && details.label === "توضیحات") {
    Info = (
      <motion.p
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="border-2 border-gray-300 dark:border-gray-500 px-5 py-4 rounded-xl text-gray-500 dark:text-gray-300 leading-10 text-sm text-justify"
      >
        {details.value}
      </motion.p>
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
        <div className="w-full border-2 border-gray-300 dark:border-gray-500 px-5 py-4 rounded-xl">
          {filteredData?.length > 0 ? (
            <>
              {filteredData?.slice(0, count).map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  updateFn={updateFn}
                  user={data}
                />
              ))}
              <div className="w-full flex items-center justify-center mt-2">
                <button
                  onClick={handleMore}
                  className="flex items-center justify-center gap-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-900 transition bg-gray-300/40 hover:bg-gray-300/60 dark:bg-gray-300 dark:hover:bg-gray-300/80 hover:shadow-md px-4 py-3 rounded-xl"
                >
                  {count >= filteredData?.length ? (
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
            </>
          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-300">
              نظری برای این دوره تاکنون ثبت نشده است
            </p>
          )}
        </div>
        <div className="w-full flex flex-col justify-center mt-8 mb-5 items-start gap-y-7">
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
              htmlFor="title"
              className="text-sm text-gray-500 dark:text-gray-300 px-1"
            >
              عنوان
            </label>
            <input
              className={cn(
                "resize-none w-full max-w-sm disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-9 py-3 duration-200 border-gray-300 focus:border-gray-400",
                form.formState.errors.title &&
                  "border-destructive dark:border-dark-destructive focus:border-destructive dark:focus:border-dark-destructive"
              )}
              placeholder="عنوان پیام"
              {...form.register("title")}
            />
            <p
              className={cn(
                "opacity-0 text-destructive dark:text-dark-destructive",
                form.formState.errors.title && "opacity-100"
              )}
            >
              {form.formState.errors.title
                ? form.formState.errors.title.message
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
              placeholder="متن پیام..."
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
      </motion.div>
    );
  }

  return <div className={selected !== details.label && "hidden"}>{Info}</div>;
};
