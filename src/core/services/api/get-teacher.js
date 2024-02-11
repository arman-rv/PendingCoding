import { apiCall } from "../interceptor/api-call";

const getAllTeachers = async () => await apiCall("/Home/GetTeachers");

const getTeacherById = async (id) =>
  await apiCall(`/Home/GetTeacherDetails?TeacherId=${id}`);

export { getAllTeachers, getTeacherById };
