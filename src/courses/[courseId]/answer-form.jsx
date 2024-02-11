import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";
import { replyComment } from "../../core/services/api/get-courses";

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

export const AnswerForm = ({ comment, setIsAnswering, updateFn }) => {
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
      const Obj = {
        CommentId: comment?.id,
        CourseId: comment?.courseId,
        Title: values.subject,
        Describe: values.message,
      };
      await replyComment(Obj).then(() => {
        updateFn();
        toast.success("پاسختان ثبت شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      form.reset();
      setIsAnswering(false);
    }
  };

  const handleClose = () => {
    setIsAnswering(false);
    form.reset();
  };
  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full border-y-2 border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2"
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
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
        <div className="mr-auto flex justify-center items-center gap-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="bg-primary text-gray-100 hover:bg-primary/80 hover:text-gray-100/80 disabled:bg-primary/80 disabled:text-gray-100/80 disabled:cursor-not-allowed rounded-lg px-3 py-2"
          >
            ارسال
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-600 hover:bg-gray-300/80 hover:text-gray-600/80 shadow-lg px-3 py-2 rounded-lg"
          >
            لغو
          </button>
        </div>
      </form>
    </motion.div>
  );
};
