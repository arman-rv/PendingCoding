import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import circle from "../../assets/circle.svg";

export const Services = () => {
  const divRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "center start"],
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <h1 className="text-4xl xl:text-3xl text-gray-600 dark:text-gray-300">
          ویژگی ها و خدمات
        </h1>
        <h4 className="text-lg xl:text-sm text-gray-400 dark:text-gray-300/80">
          تمام آنچه شما به آن برای رسیدن به موفقیت نیاز دارید
        </h4>
      </div>
      <div
        ref={divRef}
        className="relative flex justify-center items-center gap-x-8 xl:gap-x-28 2xl:gap-x-28"
      >
        <div className="w-60 2xl:w-80 flex flex-col items-end justify-center gap-y-16">
          <div className="flex flex-col items-end justify-center gap-y-2">
            <span className="bg-primary dark:bg-dark-primary text-white dark:text-gray-100 w-12 h-12 rounded-full text-xl flex items-center justify-center ml-4">
              {getPersianNumbers(1)}
            </span>
            <h2 className="text-2xl text-gray-600 dark:text-gray-300">
              مشاوره تحصیلی
            </h2>
            <h4 className="text-md text-gray-400 dark:text-gray-300/80 text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از .صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطر .آنچنان که لازم است
            </h4>
          </div>
          <img src={circle} alt="Circle" className="self-center" />
          <div className="flex flex-col items-end justify-center gap-y-2">
            <span className="bg-primary dark:bg-dark-primary text-white dark:text-gray-100 w-12 h-12 rounded-full text-xl flex items-center justify-center ml-4">
              {getPersianNumbers(3)}
            </span>
            <h2 className="text-2xl text-gray-600 dark:text-gray-300">
              پشتیبانی ۲۴ ساعته
            </h2>
            <h4 className="text-md text-gray-400 text-justify dark:text-gray-300/80">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از .صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطر .آنچنان که لازم است
            </h4>
          </div>
        </div>

        {/* Progress Line */}
        <div className="absolute w-1 h-full bg-gray-200 dark:bg-gray-400" />

        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute w-1 h-full origin-top bg-primary/80 dark:bg-dark-primary/80"
        />

        <div className="w-60 2xl:w-80 flex flex-col items-end justify-center gap-y-16">
          <img src={circle} alt="Circle" className="self-center" />
          <div className="flex flex-col items-start justify-center gap-y-2">
            <span className="bg-primary dark:bg-dark-primary text-white dark:text-gray-100  w-12 h-12 rounded-full text-xl flex items-center justify-center mr-2">
              {getPersianNumbers(2)}
            </span>
            <h2 className="text-2xl text-gray-600 dark:text-gray-300 mr-2">
              ارائه مدرک معتبر
            </h2>
            <h4 className="text-md text-gray-400 dark:text-gray-300/80 text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از .صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطر .آنچنان که لازم است
            </h4>
          </div>
          <img src={circle} alt="Circle" className="self-center" />
        </div>
      </div>
    </>
  );
};
