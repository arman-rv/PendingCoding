import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

import { CommentRespondCard } from "./comment-respond-card";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import { getCommentReplies } from "../../core/services/api/get-courses";

import Amir from "../../assets/amir.jpg";
import { useEffect, useState } from "react";

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

const responds = [
  {
    id: 1,
    insertDate: "2024-02-16T05:34:42.901Z",
    title: "متشکرم از دوره خوبتنون",
    describe: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
  .در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
  کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
  برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام
  و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
   .سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
    pictureAddress: Amir,
    author: "امیرعباس",
    currentUserEmotion: "LIKED",
    likeCount: 4,
    disslikeCount: 1,
    acceptReplysCount: 1,
  },
];

export const CommentResponds = ({ commentId }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const { id } = useParams();
  // const {
  //   data: responds,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["course_comment_responds", commentId],
  //   queryFn: () => getCommentReplies(id, commentId),
  //   staleTime: 5000,
  // });

  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) return <Loading />;

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
          // updateFn={refetch}
        />
      ))}
    </motion.div>
  );
};
