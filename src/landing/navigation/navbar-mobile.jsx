import { Link, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "../../hooks/use-modal-store";

import { routes } from "../../components/routes/routes";
import { useUser } from "../../hooks/use-user";
import { ThemeToggle } from "../../components/theme-toggle";

const backdrop = {
  hidden: {
    x: "-100px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "-100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const NavbarMobile = () => {
  const { userData } = useUser();
  const { isOpen, onClose, type } = useModal();
  const isDialogOpen = isOpen && type === "navDialog";

  return (
    <AnimatePresence mode="wait">
      {isDialogOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-400/70 dark:bg-gray-700/70 z-10"
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
            className="h-full fixed top-0 left-0 z-20 flex flex-col items-center justify-start gap-y-5 bg-gray-50 dark:bg-gray-800 border-r-2 border-gray-200 dark:border-gray-600 shadow-md p-5"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <button
              onClick={() => onClose()}
              className="flex items-center justify-center my-3"
            >
              <ThemeToggle />
            </button>
            {routes.map((route) => (
              <div key={route.id}>
                <NavLink
                  className="transition-all delay-75 p-1 text-lg"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "2px solid #505050" : "",
                    color: isActive ? "#7b7b7b" : "#bfbfbf",
                  })}
                  to={route.path}
                  onClick={onClose}
                >
                  {route.label}
                </NavLink>
              </div>
            ))}
            {userData.user ? (
              <Link
                to="/dashboard"
                className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
              >
                داشبورد
              </Link>
            ) : (
              <>
                <Link
                  className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
                  to="/sign-in"
                >
                  ورود
                </Link>
                <Link
                  className="border-[3px] border-primary px-8 py-1 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white/90 transition font-semibold text-[16px]"
                  to="/sign-up"
                >
                  ثبت نام
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
