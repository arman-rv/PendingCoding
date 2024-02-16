import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useUser } from "../../hooks/use-user";
import { Unlock, Lock, Video } from "lucide-react";
import { Link } from "react-router-dom";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function SeasonsAccordion({ season, courseId }) {
  const { userData } = useUser();
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const boughtCourse = userData.cart.some((c) => c.courseId === courseId);
  const getId = (videoLink) => {
    const id =
      videoLink.split("?")[1].split("&")[0].split("=")[1] || "2g811Eo7K8U";

    return id;
  };
  return (
    <>
      <Accordion
        open={open === 1}
        animate={CUSTOM_ANIMATION}
        icon={<Icon id={1} open={open} />}
      >
        <AccordionHeader
          className="text-lg text-gray-500 dark:text-gray-400"
          onClick={() => handleOpen(1)}
        >
          <div className="flex items-center gap-5">
            <Video className="w-6 h-6" />
            {season.name}
          </div>
        </AccordionHeader>
        {season.videos.map((video, index) => (
          <AccordionBody
            key={video.videoLink}
            className="border border-t-0 rounded-lg rounded-t-none p-4 "
          >
            <div className="w-full flex items-center justify-between text-gray-500 dark:text-gray-400 px-3">
              {boughtCourse ? (
                <Link
                  to={`/courses/${courseId}/${getId(video.videoLink)}`}
                  className="text-base hover:text-gray-900 dark:hover:text-gray-200 transition"
                >
                  <Video className="w-6 h-6" />
                  {`${index + 1}.${video.title}`}
                </Link>
              ) : (
                <span className="flex items-center gap-5">
                  <Video className="w-6 h-6" />
                  <p className="text-[17px]"> {`${index + 1}. ${video.title}`}</p>
                </span>
              )}
              {boughtCourse ? (
                <Unlock className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
          </AccordionBody>
        ))}
      </Accordion>
    </>
  );
}
