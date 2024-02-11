import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useModal } from "../hooks/use-modal-store";
import { X } from "lucide-react";

const backdrop = {
  hidden: {
    y: "-200px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    y: "100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const UnauthorizedModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "unauthorizedModal";

  return (
    isModalOpen && (
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-300/50 z-10"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 w-96 h-fit m-auto bg-gray-50 rounded-xl p-3 z-50"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col justify-center items-center gap-y-10 my-5">
              <h1 className="text-xl">ابتدا وارد حساب خود شوید</h1>
              <Link
                to="/sign-in"
                className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
              >
                ورود به حساب
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
