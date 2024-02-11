import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "../hooks/use-modal-store";

import { SearchInput } from "../components/search";
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

const orderBy = [
  {
    id: 19,
    label: "مرتب سازی بر اساس",
    value: "",
  },
  {
    id: 20,
    label: "با سابقه ترین",
    value: "professional",
  },
  {
    id: 21,
    label: "جوان ترین",
    value: "youngest",
  },
  {
    id: 22,
    label: "محبوب ترین",
    value: "popular",
  },
];

export const MobileFilter = () => {
  const { isOpen, onClose, type } = useModal();

  const isDialogOpen = isOpen && type === "filterTeacherDialog";

  return (
    isDialogOpen && (
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-300/50 xl:hidden z-40"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="h-full fixed top-0 right-0 flex flex-col items-center justify-start gap-y-5 bg-gray-50 border-r border-gray-200 shadow-md px-8 py-5 z-50"
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
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-center items-start gap-y-2 w-full">
                  <h4 className="text-sm text-gray-500">استاد</h4>
                  <SearchInput
                    queryName="teacher_name"
                    className="w-full text-sm py-2 pl-20 pr-4"
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
                  className="text-sm py-2 pl-20 pr-4"
                />
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <Select
                  queryName="courseFilterBy"
                  placeholder="جستجو بر اساس"
                  filters={orderBy}
                  className="w-full py-2 pl-24 pr-5 text-sm"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
