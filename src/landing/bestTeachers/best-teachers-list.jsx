import { useLayoutEffect, useState } from "react";
// import { useQuery } from "react-query";

import { Heading } from "../../components/heading";
import { BestTeachersMobile } from "./best-teachers-mobile";
import { BestTeachers } from "./best-teachers";
// import { Error } from "../../components/error";
import { Loading } from "../../components/loading";

// import { getAllTeachers } from "../../core/services/api/get-teacher";

import Amir from "../../assets/amir.jpg";
import Arman from "../../assets/arman.jpg";

const teachers = [
  { id: 1, fullName: "امیرعباس بابائی", image: Amir },
  { id: 2, fullName: "آرمان رضوانی", image: Arman },
  { id: 3, fullName: "امیرعباس بابائی", image: Amir },
  { id: 4, fullName: "آرمان رضوانی", image: Arman },
];

export const BestTeachersList = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [isMounted, setIsMounted] = useState(false);
  // const { data, isLoading, isError, refetch } = useQuery({
  //   queryKey: ["teachers"],
  //   queryFn: () => getAllTeachers(),
  //   staleTime: 5000,
  //   enabled: false,
  // });

  // useLayoutEffect(() => {
  //   if (!isMounted) {
  //     setIsMounted(true);
  //     refetch();
  //   }
  // }, [isMounted, refetch]);

  // if (!isMounted) return null;
  // if (isError) return <Error />;

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Heading
        title="برترین اساتید خبره"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/teachers"
      />
      <BestTeachers teachers={teachers} />

      <BestTeachersMobile teachers={teachers} />
    </>
  );
};
