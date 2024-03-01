import Amir from "../assets/amir.jpg";
import Arman from "../assets/arman.jpg";
import Hania from "../assets/hania.jpg";

import { courses } from "./courses";
import { blogs } from "./blogs";

const teacherCountFind = (name, category) => {
  let x = 0;
  for (let i in category) {
    if (name === category.at(i)?.teacherName) {
      x += 1;
    } else if (name === category.at(i)?.addUserFullName) {
      x += 1;
    }
  }
  return x;
};

export const teachers = [
  {
    teacherId: 0,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 1,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: teacherCountFind("امیرعباس بابائی", blogs),
    courseCounts: teacherCountFind("امیرعباس بابائی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 2,
    fullName: "هانیا حبیبی",
    pictureAddress: Hania,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 3,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: teacherCountFind("امیرعباس بابائی", blogs),
    courseCounts: teacherCountFind("امیرعباس بابائی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 4,
    fullName: "هانیا حبیبی",
    pictureAddress: Hania,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 5,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 6,
    fullName: "هانیا حبیبی",
    pictureAddress: Hania,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 7,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: teacherCountFind("امیرعباس بابائی", blogs),
    courseCounts: teacherCountFind("امیرعباس بابائی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 8,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 9,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: teacherCountFind("امیرعباس بابائی", blogs),
    courseCounts: teacherCountFind("امیرعباس بابائی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 10,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 11,
    fullName: "هانیا حبیبی",
    pictureAddress: Hania,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 12,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 13,
    fullName: "هانیا حبیبی",
    pictureAddress: Hania,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 14,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 15,
    fullName: "امیرعباس بابائی",
    pictureAddress: Amir,
    newsCount: teacherCountFind("امیرعباس بابائی", blogs),
    courseCounts: teacherCountFind("امیرعباس بابائی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 16,
    fullName: "آرمان رضوانی",
    pictureAddress: Arman,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    teacherId: 17,
    fullName: "هانیا حبیبی",
    pictureAddress: Hania,
    newsCount: teacherCountFind("آرمان رضوانی", blogs),
    courseCounts: teacherCountFind("آرمان رضوانی", courses),
    skills: ["ReactJS", "HTML5", "CSS3", "JavaScript"],
  },
];
