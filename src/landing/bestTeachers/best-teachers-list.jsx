import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";

import { Heading } from "../../components/heading";
import { BestTeachersMobile } from "./best-teachers-mobile";
import { BestTeachers } from "./best-teachers";
import { Error } from "../../components/error";
import { Loading } from "../../components/loading";

import { getAllTeachers } from "../../core/services/api/get-teacher";

export const BestTeachersList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
    staleTime: 5000,
    enabled: false,
  });

  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      refetch();
    }
  }, [isMounted, refetch]);

  if (!isMounted) return null;
  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <Heading
        title="برترین اساتید خبره"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/teachers"
      />
      <BestTeachers teachers={data?.slice(0, 4)} />

      <BestTeachersMobile teachers={data?.slice(0, 4)} />
    </>
  );
};
