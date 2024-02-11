import { MoveLeft, MoveRight } from "lucide-react";

import teacher1 from "../../assets/teacher1.svg";
import teacher2 from "../../assets/teacher2.svg";

export const BestTeachersMobile = ({ teachers }) => {
  return (
    <div className="lg:hidden relative flex flex-col items-center justify-evenly my-32">
      <div className="w-16 h-full bg-white dark:bg-gray-500 rounded-full absolute z-10" />
      {teachers.map((teacher, index) => {
        return index % 2 === 0 ? (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-x-16"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center justify-center gap-x-5">
              {teacher.fullName || "TeacherName"}
              <MoveRight className="text-gray-400/70 dark:text-gray-400 mx-auto h-20 w-20" />
            </p>
            <span>
              <img src={teacher.image || teacher1} alt="TeacherPic" />
            </span>
          </div>
        ) : (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-x-16"
          >
            <span>
              <img src={teacher.image || teacher2} alt="TeacherPic" />
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center justify-center gap-x-5">
              <MoveLeft className="text-gray-400/70 dark:text-gray-400 mx-auto h-20 w-20" />
              {teacher.fullName || "TeacherName"}
            </p>
          </div>
        );
      })}
    </div>
  );
};
