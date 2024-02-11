import { motion } from "framer-motion";

const backdrop = {
  hidden: {
    x: "-25px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "-25px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const Header = ({ label, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(label)}
      className="w-full flex flex-col justify-center items-center gap-y-2"
    >
      <p className="text-xl text-gray-500 dark:text-gray-300">{label}</p>
      {label === selected && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="w-full border-2 border-primary dark:border-dark-primary rounded-t-full"
        />
      )}
    </button>
  );
};
