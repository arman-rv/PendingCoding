import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

import Navbar from "./navigation/navbar";
import { Footer } from "./footer/footer";
import { ModalProvider } from "../components/providers/modal-provider";
import { useModal } from "../hooks/use-modal-store";

const backdrop = {
  hidden: {
    y: "-100px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    y: "-100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const LayoutPage = () => {
  const { pathname } = useLocation();
  const { onClose } = useModal();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onClose();
  }, [pathname, onClose]);

  return (
    <div className="w-full h-full bg-[#EEEEEE] dark:bg-gray-800">
      <ModalProvider />
      <div className="flex justify-center items-center px-6 py-3 relative z-[2]">
        <Navbar />
      </div>
      <motion.main
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-[#EEEEEE] dark:bg-gray-800"
      >
        <Outlet />
      </motion.main>
      <div className="flex justify-center items-center sm:px-6 py-2 bg-[#464646] dark:bg-gray-700">
        <Footer />
      </div>
    </div>
  );
};
