import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { useModal } from "../hooks/use-modal-store";
import { useUser } from "../hooks/use-user";

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
    y: "-200px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const ConfirmModal = () => {
  const { isOpen, onClose, type, data: course } = useModal();
  const { addToCart } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "confirmModal";

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await addToCart(course);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-400/70 dark:bg-gray-700/70 z-10"
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
            className="fixed inset-0 w-96 h-fit m-auto bg-gray-50 dark:bg-gray-200 rounded-xl p-3 z-50"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col justify-center items-center gap-y-10 my-5">
              <h1 className="text-xl text-gray-700">
                آیا از خرید این دوره مطمئنید؟
              </h1>
              <div className="w-full flex items-center justify-start gap-x-3 px-5 py-2">
                <button
                  disabled={isLoading}
                  onClick={handleConfirm}
                  className="px-5 py-2 text-lg bg-primary hover:bg-primary/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-primary/90 disabled:cursor-not-allowed rounded-xl"
                >
                  تائید
                </button>
                <button
                  disabled={isLoading}
                  onClick={onClose}
                  className="px-5 py-2 text-lg bg-destructive hover:bg-destructive/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-destructive/90 disabled:cursor-not-allowed rounded-xl"
                >
                  لغو
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
