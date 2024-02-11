import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "../hooks/use-modal-store";

import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { PriceRange } from "../components/price-range";
import { CapacityItems } from "./capacity-items";
import { CategoryItem } from "./category-item";
import { Select } from "../components/select";

const backdrop = {
  hidden: {
    x: "100px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const categories = [
  {
    id: "physics",
    label: "فیزیک",
  },
  {
    id: "math",
    label: "ریاضی",
  },
  {
    id: "chemistry",
    label: "شیمی",
  },
  {
    id: "computer",
    label: "کامپیوتر",
  },
  {
    id: "industry",
    label: "صنعت",
  },
  {
    id: "architecture",
    label: "معماری",
  },
  {
    id: "electricity",
    label: "برق",
  },
  {
    id: "paper",
    label: "بازار سهام",
  },
];

const capacities = [
  {
    id: "finished",
    label: "تکمیل شده",
  },
  {
    id: "not-finished",
    label: "تکمیل نشده",
  },
];

const orderBy = [
  {
    id: 19,
    label: "مرتب سازی بر اساس",
    value: "",
  },
  {
    id: 20,
    label: "گران ترین",
    value: "expensive",
  },
  {
    id: 21,
    label: "ارزان ترین",
    value: "cheapest",
  },
  {
    id: 22,
    label: "محبوب ترین",
    value: "popular",
  },
];

export const MobileFilter = ({ values, setValues }) => {
  const { isOpen, onClose, type } = useModal();

  const isDialogOpen = isOpen && type === "filterDialog";

  return (
    isDialogOpen && (
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-300/50 xl:hidden z-10"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="h-full fixed top-0 right-0 flex flex-col items-center justify-start gap-y-5 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 shadow-md p-5 z-[99999]"
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col items-center justify-center gap-y-5">
              <div className="w-full flex flex-col items-start justify-between gap-x-16 gap-y-3">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-base text-gray-500 dark:text-gray-300/90 mb-2">
                    دسته بندی
                  </h1>
                  <div className="w-5 border border-gray-500 dark:border-gray-300/80 self-center" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      label={category.label}
                      value={category.label}
                    />
                  ))}
                </div>
              </div>
              <Seperator />
              <div className="w-full flex flex-col justify-start items-start gap-y-3">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-base text-gray-500 dark:text-gray-300/90">
                    ظرفیت
                  </h1>
                  <div className="w-5 border border-gray-500 dark:border-gray-300/80" />
                </div>
                <div className="flex items-center justify-center gap-4">
                  {capacities.map((capacity) => (
                    <CapacityItems
                      key={capacity.id}
                      label={capacity.label}
                      value={capacity.label}
                    />
                  ))}
                </div>
              </div>

              <Seperator />
              <div className="relative w-full flex justify-between items-start">
                <PriceRange values={values} setValues={setValues} />
                <div className="w-5 absolute left-0 border border-gray-500 mt-3" />
              </div>
              <Seperator />
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-center items-start gap-y-2 w-full">
                  <h1 className="text-base text-gray-500 dark:text-gray-300/90 mb-2">
                    استاد
                  </h1>
                  <SearchInput
                    queryName="teacher_name"
                    className="w-full text-sm py-2 px-4"
                    placeholder="جستجو استاد مورد نظر. . ."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center w-full gap-y-5">
              <div>
                <SearchInput
                  queryName="course_name"
                  placeholder="جستجو کنید ..."
                  className="px-4 py-2"
                />
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <Select
                  queryName="courseFilterBy"
                  placeholder="جستجو بر اساس"
                  filters={orderBy}
                  className="py-3 px-5"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
