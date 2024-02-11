import { apiCall } from "../interceptor/api-call";

const getUserProfile = async () => await apiCall("/SharePanel/GetProfileInfo");

const getUserById = async (id) => apiCall(`/User/UserDetails/${id}`);

const reserveCourse = async (courseId) => {
  const body = {
    courseId,
  };
  return await apiCall.post("/CourseReserve/ReserveAdd", body);
};
const deleteReservedCourse = async (reserveId) => {
  return await apiCall.delete("/CourseReserve", { data: { id: reserveId } });
};

const getUserReservedCourses = async () =>
  await apiCall("/SharePanel/GetMyCoursesReserve");

const getUserFavoriteCourses = async () =>
  await apiCall("/SharePanel/GetMyFavoriteCourses");

const getUserFavoriteBlogs = async () =>
  await apiCall("/SharePanel/GetMyFavoriteNews");

const getUserCourses = async (params) =>
  await apiCall("/SharePanel/GetMyCourses", { params });

const addProfileImage = async (image) => {
  const formData = new FormData();
  formData.append("formFile", image);
  return await apiCall.post("/SharePanel/AddProfileImage", formData);
};

const updateUserProfile = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);
  return await apiCall.put("/SharePanel/UpdateProfileInfo", formData);
};

export {
  getUserProfile,
  getUserById,
  reserveCourse,
  deleteReservedCourse,
  getUserReservedCourses,
  getUserFavoriteCourses,
  getUserFavoriteBlogs,
  getUserCourses,
  addProfileImage,
  updateUserProfile,
};
