import { MoveDown, MoveUp } from "lucide-react";

import teacher1 from "../../assets/teacher1.svg";
import teacher2 from "../../assets/teacher2.svg";

export const BestTeachers = ({ teachers }) => {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="hidden lg:flex flex-row-reverse items-center justify-evenly bg-white dark:bg-gray-500 h-16 rounded-full my-64 gap-x-44">
        {teachers.map((teacher, index) => {
          return index % 2 === 0 ? (
            <div
              key={teacher.id}
              className="flex flex-col items-center justify-center lg:mt-10 xl:mt-16 gap-y-10"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
                {teacher.fullName || "TeacherName"}
                <MoveUp className="text-gray-400/70 dark:text-gray-400 mx-auto h-16 w-16" />
              </p>
                <img
                  src={teacher.image || teacher1}
                  alt="TeacherProf"
                  className="object-cover w-40 h-[120px] lg:h-40 rounded-full"
                />
            </div>
          ) : (
            <div
              key={teacher.id}
              className="flex flex-col items-center justify-center lg:mb-10 xl:mb-16 gap-y-10"
            >
                <img
                  src={teacher.image || teacher2}
                  alt="TeacherProf"
                  className="object-cover w-40 h-[120px] lg:h-40 rounded-full"
                />
              <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
                <MoveDown className="text-gray-400/70 dark:text-gray-400 mx-auto h-16 w-16" />
                {teacher.fullName || "TeacherName"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
