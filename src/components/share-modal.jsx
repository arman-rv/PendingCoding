import { Copy, CopyCheck, X } from "lucide-react";
import { useModal } from "../hooks/use-modal-store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ToolTip } from "./tool-tip";

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

export const ShareModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [copied, setCopied] = useState(false);

  const pageHref = window.location.href;

  const isModalOpen = isOpen && type === "shareModal";

  const handleCopy = () => {
    navigator.clipboard.writeText(pageHref);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
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
            className="fixed inset-0 w-96 h-fit m-auto bg-gray-50 dark:bg-gray-200 rounded-xl px-2 py-1"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col justify-center items-center gap-2 my-5">
              <div className="w-full flex flex-row-reverse justify-center items-center gap-x-2">
                <input
                  value={pageHref}
                  type="text"
                  disabled={true}
                  className="text-left w-full bg-gray-200/50 rounded-md p-2"
                />

                {!copied ? (
                  <Copy
                    className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-800 transition"
                    onClick={handleCopy}
                  />
                ) : (
                  <ToolTip name=" کپی شد">
                    <CopyCheck className="h-7 w-7" />
                  </ToolTip>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
