import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { Loading } from "../../components/loading";
import { SeasonsAccordion } from "./seasons-accordion";
import { getCourseById } from "../../core/services/api/get-courses";
import { getTeacherById } from "../../core/services/api/get-teacher";

export const VideoPlayer = () => {
  const { id, url } = useParams();
  const opts = {
    height: "720",
    width: "1200",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const { data, isLoading } = useQuery({
    queryKey: ["course_id", id],
    queryFn: () => getCourseById(id),
    staleTime: 5000,
    enabled: false,
  });
  const { data: teacher } = useQuery({
    queryKey: ["teacher_id"],
    queryFn: () => getTeacherById(data?.teacherId),
  });
  if (isLoading) return <Loading />;

  return (
    data && (
      <div className="p-28">
        <div className="w-full bg-white shadow-sm py-2 px-2 rounded-xl dark:bg-gray-600 flex items-start justify-between gap-3">
          <div className="w-full px-2 py-5">
            {JSON.parse(data.describe).map((season) => (
              <SeasonsAccordion
                key={season.name}
                season={season}
                courseId={id}
              />
            ))}
          </div>
          <div className="flex flex-col items-start justify-center gap-2 px-10">
            <YouTube videoId={url} opts={opts} />
            <h1 className="">مقدمه و راه اندازی</h1>
            <div className="flex items-center justify-center gap-3">
              <img
                className="object-cover w-14 h-14 rounded-full"
                src={teacher?.pictureAddress}
                alt=""
              />
              <div className="flex flex-col justify-center items-center gap-2">
                <h1>{teacher?.fullName}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
