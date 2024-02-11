import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

import { CommentRespondCard } from "./comment-respond-card";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import { getCommentReplies } from "../../core/services/api/get-courses";

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

export const CommentResponds = ({ commentId }) => {
  const { id } = useParams();
  const {
    data: responds,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["course_comment_responds", commentId],
    queryFn: () => getCommentReplies(id, commentId),
    staleTime: 5000,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {responds?.map((respond) => (
        <CommentRespondCard
          key={respond.id}
          respond={respond}
          updateFn={refetch}
        />
      ))}
    </motion.div>
  );
};
