import { Slider } from "../slider/slider";
export const Latest = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-y-10 2xl:gap-x-60">
      <div className="w-80 flex flex-col gap-5 items-center justify-center">
        <h1 className="text-4xl text-gray-600 dark:text-gray-300">
          جدید ترین اخبار روز
        </h1>
        <h5 className="text-base text-gray-400 dark:text-gray-300/80">
          اطلاعاتت رو بروز کن
        </h5>
      </div>
      <Slider />
    </div>
  );
};
