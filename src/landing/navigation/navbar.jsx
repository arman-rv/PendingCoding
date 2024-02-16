import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Dot, Menu, ShoppingCart } from "lucide-react";

import { useModal } from "../../hooks/use-modal-store";
import { useScrollTop } from "../../hooks/use-scroll-top";
import { useUser } from "../../hooks/use-user";

import { NavbarMobile } from "./navbar-mobile";
import { ThemeToggle } from "../../components/theme-toggle";

import { cn } from "../../../libs/utils";

import { useTheme } from "../../components/providers/theme-provider";
import {
  removeItem,
  setItem,
} from "../../core/services/common/storage.services";

import { routes } from "../../components/routes/routes";
import defaultImage from "../../assets/my-profile.jpg";

const backdrop = {
  hidden: {
    y: "-40px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    y: "-40px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropDownRef = useRef(null);
  const { isDarkTheme } = useTheme();
  const { userData, setUserData } = useUser();
  const { onOpen } = useModal();

  const count = useMemo(() => userData?.cart?.length, [userData?.cart?.length]);
  const scrolled = useScrollTop();

  useEffect(() => {
    const handler = (event) =>
      !dropDownRef?.current?.contains(event.target) && setDropdown(false);

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    const newObj = {
      ...userData,
      user: null,
    };
    setUserData(newObj);
    setItem("user", newObj);
    removeItem("token");
    toast.success("با موفقیت خارج شدید");
  };

  const handleDropdown = () => {
    setDropdown((c) => !c);
  };

  return (
    <nav
      className={cn(
        "max-w-[1900px] w-full fixed top-0 bg-[#EEEEEE] dark:bg-gray-800 flex items-center justify-between px-5 md:px-4 lg:px-16 xl:px-28 2xl:px-32 2xl:pr-52 py-6 md:py-2",
        scrolled && "border-b border-gray-200 dark:border-gray-600 shadow-md"
      )}
    >
      <div className="flex w-full items-center justify-between mx-auto ">
        <div className="flex justify-center items-center gap-x-2 lg:gap-x-6">
          {routes.map((route) => (
            <div key={route.id} className="hidden md:block">
              <NavLink
                className="transition-all delay-75 p-1 text-lg"
                style={({ isActive }) => ({
                  borderBottom: isActive
                    ? isDarkTheme
                      ? "2px solid #939393"
                      : "2px solid #505050"
                    : "",
                  color: isActive
                    ? isDarkTheme
                      ? "#cecece"
                      : "#7b7b7b"
                    : isDarkTheme
                    ? "#909090"
                    : "#bfbfbf",
                })}
                to={route.path}
              >
                {route.label}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center justify-center gap-x-4 lg:gap-x-6">
          {userData.user ? (
            <div
              ref={dropDownRef}
              onClick={handleDropdown}
              className={cn(
                "w-12 h-12 rounded-full relative cursor-pointer opacity-80 hover:opacity-100 transition",
                dropdown && "opacity-100"
              )}
            >
              <img
                className="object-cover rounded-full"
                src={userData.user.currentPictureAddress || defaultImage}
                alt={defaultImage}
              />
              <AnimatePresence mode="wait">
                {dropdown && (
                  <motion.div
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={handleDropdown}
                    className="absolute -left-12 top-11 px-2 py-3 w-32 bg-gray-100 dark:bg-gray-500 border border-gray-200/80 dark:border-gray-500 shadow-xl rounded-lg flex flex-col items-center justify-center gap-y-1"
                  >
                    <Link
                      to="/dashboard"
                      className="border-[3px] border-primary dark:border-dark-primary w-full text-center rounded-full bg-gray-100 dark:bg-gray-400 dark:hover:bg-gray-300 dark:text-dark-primary/80 dark:hover:text-dark-primary hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold"
                    >
                      داشبورد
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="border-[3px] border-primary dark:border-dark-primary w-full text-center rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/80 dark:text-gray-200/80 dark:hover:text-gray-200 hover:text-white/80 transition"
                    >
                      خروج
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              className="border-[3px] border-primary dark:border-dark-primary px-5 py-1 rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition font-semibold text-[16px]"
              to="/auth"
            >
              ورود / ثبت نام
            </Link>
          )}
          <div
            onClick={() => onOpen("cartModal")}
            className="group relative cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6 group-hover:text-black/60 dark:text-gray-400 dark:group-hover:text-gray-300 transition" />
            {count > 0 && (
              <Dot className="h-14 w-14 absolute -inset-6 z-10 text-primary group-hover:text-primary/60 dark:text-dark-primary dark:group-hover:text-dark-primary/60 transition" />
            )}
          </div>
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <Menu
            onClick={() => onOpen("navDialog")}
            className="h-8 w-8 cursor-pointer hover:text-black/60 dark:text-gray-300 dark:hover:text-gray-200 transition"
          />
          <NavbarMobile count={count} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
