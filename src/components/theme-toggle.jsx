import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./providers/theme-provider";

import { cn } from "../../libs/utils";

export const ThemeToggle = () => {
  const darkMode = useAnimationControls();
  const lighMode = useAnimationControls();
  const { isDarkTheme, toggleThemeHandler } = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      darkMode.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
      lighMode.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });
    } else {
      darkMode.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });
      lighMode.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    }
  }, [isDarkTheme, lighMode, darkMode]);

  const handleTheme = () => {
    toggleThemeHandler();
    if (isDarkTheme) {
      darkMode.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
      lighMode.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });
    } else {
      darkMode.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
      lighMode.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });
    }
  };

  return (
    <button
      onClick={handleTheme}
      className="group relative flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={darkMode}
        className={cn(
          "text-gray-200 dark:group-hover:text-gray-300/80 transition",
          !isDarkTheme && "hidden"
        )}
      >
        <Moon className="w-8 h-8" />
      </motion.div>
      <motion.div
        animate={lighMode}
        className={cn(
          "text-yellow-400 group-hover:text-yellow-500/80 transition",
          isDarkTheme && "hidden"
        )}
      >
        <Sun className="w-8 h-8" />
      </motion.div>
    </button>
  );
};
