import * as z from "zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { useModal } from "../hooks/use-modal-store";

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

const formSchema = z.object({
  message: z.string().min(1, { message: "پیام خود را وارد کنید" }),
});

export const RespondModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "sendRespond";

  const form = useForm({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
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
            className="fixed inset-0 w-96 h-fit m-auto bg-gray-50 dark:bg-gray-200 rounded-xl p-3"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col justify-center items-center gap-2 my-5">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center gap-y-3"
              >
                <textarea
                  className="resize-none h-40 disabled:cursor-not-allowed outline-none w-80 bg-[#EEEEEE] text-gray-500 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400"
                  placeholder="متن پیام"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-rose-600/90 mr-5 text-base">
                    {form.formState.errors.message.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="text-white hover:text-white/80 bg-primary hover:bg-primary/80 disabled:bg-primary/80 disabled:text-white/80 py-2 text-lg w-2/4 self-center my-4 rounded-full transition"
                >
                  ارسال پیام
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
