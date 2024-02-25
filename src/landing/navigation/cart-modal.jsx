import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Seperator } from "../../components/seperator";

import { CartItem } from "./cart-item";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../hooks/use-user";
import { cn } from "../../../libs/utils";

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

export const CartModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { userData } = useUser();
  const cart = useMemo(() => userData.cart, [userData.cart]);
  const isModalOpen = isOpen && type === "cartModal";

  return (
    <AnimatePresence mode="wait">
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-400/70 dark:bg-gray-700/70 z-40"
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
            className={cn(
              "overflow-hidden fixed inset-0 w-11/12 max-w-xs md:w-fit md:max-w-full h-[450px] m-auto bg-gray-50 dark:bg-gray-200 rounded-xl px-2 pb-10 pt-1 z-10",
              cart.length === 0 && "h-fit"
            )}
          >
            <X
              className=" self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />

            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "w-full h-full m-auto rounded-xl px-3 z-50",
                cart.length > 1 && "overflow-y-auto"
              )}
            >
              <div
                className={cn(
                  "my-5 px-5 flex flex-col justify-center items-center gap-y-10",
                  cart.length > 1 && "overflow-y-auto"
                )}
              >
                {cart.length > 0 ? (
                  cart.map((course, index) => (
                    <>
                      {index !== cart.length - 1 ? (
                        <>
                          <CartItem key={course.id} course={course} />
                          <Seperator />
                        </>
                      ) : (
                        <CartItem key={course.id} course={course} />
                      )}
                    </>
                  ))
                ) : (
                  <div className="flex items-center justify-center">
                    <h1 className="text-xl text-gray-700">
                      سبد خرید شما خالی است!
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
