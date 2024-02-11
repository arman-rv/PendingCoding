import RangeSlider from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";

export const PriceRange = ({ values, setValues }) => {
  const handleMin = (event) => {
    const newArray = [...values];
    newArray[0] = Number(event.target.value);
    setValues(newArray);
  };
  const handleMax = (event) => {
    const newArray = [...values];
    newArray[1] = Number(event.target.value);
    setValues(newArray);
  };

  return (
    <div className="w-full rounded-xl">
      <h1 className="text-base text-gray-500 dark:text-gray-300/90 mb-2">
        قیمت
      </h1>
      <div className="my-10">
        <RangeSlider
          className="bg-gray-200 dark:bg-gray-300/80"
          value={values}
          min={0}
          max={4000000}
          onInput={(newValue) => setValues(newValue)}
          step={100000}
        />
      </div>
      <div className="flex items-center justify-center gap-x-2">
        {/* MIN */}
        <div className="flex flex-col items-start justify-center gap-y-1">
          <h1 className="text-sm text-gray-500 dark:text-gray-300/90 mb-2">
            حداقل
          </h1>
          <div className="flex justify-between items-center gap-x-3 outline-none bg-gray-100 dark:bg-gray-300 text-primary dark:text-gray-800 border-2 rounded-full py-2 px-3 duration-200 border-gray-300 focus:border-gray-400">
            <h4 className="text-sm text-gray-500">تومان</h4>
            <input
              value={values?.[0]}
              onChange={handleMin}
              type="number"
              className="disabled:cursor-not-allowed w-20 text-left outline-none bg-gray-100 dark:bg-gray-300 text-primary dark:text-gray-800 rounded-full duration-200"
            />
          </div>
        </div>

        <div className="w-6 border border-gray-500 mt-6" />

        {/* MAX */}
        <div className="flex flex-col items-start justify-center gap-y-1">
          <h1 className="text-sm text-gray-500 dark:text-gray-300/90 mb-2">
            حداکثر
          </h1>
          <div className="flex justify-between items-center gap-x-3 outline-none bg-gray-100 dark:bg-gray-300 text-primary dark:text-gray-800 border-2 rounded-full py-2 px-3 duration-200 border-gray-300 focus:border-gray-400">
            <h4 className="text-sm text-gray-500">تومان</h4>
            <input
              value={values?.[1]}
              onChange={handleMax}
              type="number"
              className="disabled:cursor-not-allowed w-20 text-left outline-none bg-gray-100 dark:bg-gray-300 text-primary dark:text-gray-800 rounded-full duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
