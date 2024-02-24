import { MoveLeft, MoveRight } from "lucide-react";

import teacher1 from "../../assets/teacher1.svg";
import teacher2 from "../../assets/teacher2.svg";

export const BestTeachersMobile = ({ teachers }) => {
  return (
    <div className="lg:hidden relative flex flex-col items-center justify-evenly my-32">
      <div className="w-8 sm:w-16 h-full bg-white dark:bg-gray-500 rounded-full absolute z-10" />
      {teachers.map((teacher, index) => {
        return index % 2 === 0 ? (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-16"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center sm:gap-5 justify-center">
              {teacher.fullName || "TeacherName"}
              <MoveRight className="text-gray-400/70 dark:text-gray-400 sm:mx-auto w-8 h-8 sm:h-20 sm:w-20" />
            </p>
              <img
                className="object-cover w-24 h-24 sm:w-32 sm:h-32 rounded-full"
                src={teacher.image || teacher1}
                alt="TeacherPic"
              />
          </div>
        ) : (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-16"
          >
              <img
                className="object-cover w-24 h-24 sm:w-32 sm:h-32 rounded-full"
                src={teacher.image || teacher2}
                alt="TeacherPic"
              />
            <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center sm:gap-5 justify-center">
              <MoveLeft className="text-gray-400/70 dark:text-gray-400 mx-auto w-8 h-8 sm:h-20 sm:w-20" />
              {teacher.fullName || "TeacherName"}
            </p>
          </div>
        );
      })}
    </div>
  );
};
