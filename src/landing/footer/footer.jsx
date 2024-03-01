import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";

import map from "../../assets/map.svg";
import mail from "../../assets/mail.svg";
import check from "../../assets/check.svg";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "ایمیل نامعتبر" })
    .min(1, { message: "ایمیل خود را وارد کنید" }),
  message: z.string().min(1, { message: "پیام خود را وارد کنید" }),
});

export const Footer = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className="w-full overflow-hidden relative flex flex-col items-center justify-center p-10 gap-10">
      {/* Circles divs */}
      <div className="absolute top-16 xl:-right-9 xl:-top-9 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#4D4D4D] to-[#676767] opacity-80 dark:from-slate-600 dark:to-slate-500">
        <div className="absolute right-28 top-32 w-[250px] h-[250px] rounded-full bg-[#5F5F5F] dark:bg-slate-500" />
      </div>

      {/* map and comment div */}
      <div className="flex items-center justify-center p-10">
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <img style={{filter: "sepia(100%) hue-rotate(170deg) saturate(40%) brightness(0.88)"}} src={map} alt="MapPic" className="hidden xl:block dark:filter dark:" />
            <div className="xl:absolute xl:left-32 bg-white dark:bg-gray-300 flex flex-col justify-center items-center px-4 py-5 rounded-t-[250px] rounded-b-lg">
              <div className="relative bg-[#808BF2] dark:bg-dark-primary/80 w-16 h-16 sm:w-[96px] sm:h-[96px] rounded-full flex items-center justify-center">
                <img src={mail} alt="MailPic" className="w-10 h-10 sm:w-16 sm:h-16" />
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full absolute sm:right-3 right-2 top-9 sm:top-[52px]">
                  <img src={check} alt="CheckPic" />
                </div>
              </div>
              <p className="text-xl text-gray-500">با ما سخت بگویید</p>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col items-start justify-start gap-2"
              >
                <input
                  className="sm:w-80 disabled:cursor-not-allowed outline-none bg-[#EEEEEE] dark:bg-gray-200 text-gray-500 dark:text-gray-800 border-2 rounded-full px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400"
                  placeholder="پست الکترونیکی"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-destructive/90 mr-5 text-base">
                    {form.formState.errors.email.message}
                  </p>
                )}
                <textarea
                  className="sm:w-80 resize-none h-40 disabled:cursor-not-allowed outline-none bg-[#EEEEEE] dark:bg-gray-200 text-gray-500 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400"
                  placeholder="متن پیام"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-destructive/90 mr-5 text-base">
                    {form.formState.errors.message.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="text-white hover:text-white/80 bg-primary dark:bg-dark-primary hover:bg-primary/80 dark:bg-dark-primary/80 disabled:bg-primary/80 dark:disabled:bg-dark-primary/70 disabled:text-white/80 py-2 text-lg w-2/4 self-center my-4 rounded-full transition"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* bottom div */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-y-20">
        <div className="flex flex-wrap gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-32 lg:gap-x-20">
          <div className="flex flex-col items-start gap-y-5">
            <h1 className="text-white text-2xl">آدرس مجموعه</h1>
            <div className="flex flex-col justify-center items-start gap-y-2">
              <h5 className="text-sm text-white">
                میدان خزر، جاده دریا، جنب دنیای آرزو
              </h5>
              <h5 className="text-sm text-white">استان مازندران، شهر ساری</h5>
              <h5 className="text-sm text-white">ایران</h5>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-y-5">
            <h1 className="text-white text-2xl">دسترسی سریع</h1>
            <div className="flex flex-col justify-center items-start gap-y-2">
              <Link
                to="/courses"
                className="text-sm text-white/80 hover:text-white transition"
              >
                دوره ها
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-white/80 hover:text-white transition"
              >
                حریم خصوصی
              </Link>
              <Link
                to="/qa"
                className="text-sm text-white/80 hover:text-white transition"
              >
                سوالات متداول
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-y-5">
            <h1 className="text-white text-2xl">لینک های مرتبط</h1>
            <div className="flex flex-col justify-center items-start gap-y-2">
              <Link
                to="/rules"
                className="text-sm text-white/80 hover:text-white transition"
              >
                قوانین و مقررات
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-white/80 hover:text-white transition"
              >
                حریم خصوصی
              </Link>
              <Link
                to="/qa"
                className="text-sm text-white/80 hover:text-white transition"
              >
                سوالات متداول
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-evenly gap-x-10">
            <Link
              to="/instagram"
              className="text-white/80 hover:text-white transition cursor-pointer"
            >
              <Instagram className="w-8 h-8" />
            </Link>
            <Link
              to="/linkedIn"
              className="text-white/80 hover:text-white transition cursor-pointer"
            >
              <Linkedin className="w-8 h-8" />
            </Link>
            <Link
              to="/linkedIn"
              className="text-white/80 hover:text-white transition cursor-pointer"
            >
              <Twitter className="w-8 h-8" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-x-2 text-gray-600">
            <span className="w-16 h-[4px] mt-1 bg-gray-400 rounded-full" />
            <p className="text-gray-400">ما را در فضای مجازی دنبال کنید</p>
          </div>
        </div>
      </div>
    </div>
  );
};
