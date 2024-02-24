import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { CommentRespondCard } from "./comment-respond-card";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

const backdrop = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
};

export const CommentResponds = ({ commentId, respond }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* {responds?.map((respond) => ( */}
      <CommentRespondCard
        key={respond.id}
        respond={respond}
        // updateFn={refetch}
      />
      {/* ))} */}
    </motion.div>
  );
};
