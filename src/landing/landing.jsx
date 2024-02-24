import { BestTeachersList } from "./bestTeachers/best-teachers-list";
import { Courses } from "./courses/courses";
import { Intro } from "./heroic/intro/intro";
import { Latest } from "./heroic/latest/latest";
import { Info } from "./info/info";

import { Services } from "./services/services";

export const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-center px-0 xl:px-12 py-10">
        <Intro />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center p-0 sm:px-20 2xl:px-32 py-10">
        <Latest />
      </div>
      <div className="flex flex-col justify-center items-center mt-14 mb-10 gap-20">
        <Services />
      </div>
      <div className="sm:p-6 my-20 flex items-center justify-center">
        <Courses />
      </div>
      <div className="sm:p-6 sm:px-44 my-20 flex items-center justify-center">
        <Info />
      </div>
      <div className="sm:p-6 mt-20 flex flex-col items-center justify-center">
        <BestTeachersList />
      </div>
    </div>
  );
};
