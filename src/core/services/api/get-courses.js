import { apiCall } from "../interceptor/api-call";

const getTopCourses = async (count) =>
  await apiCall(`/Home/GetCoursesTop?Count=${count}`);

const getAllCourses = async (params) =>
  await apiCall("/Home/GetCoursesWithPagination", { params });

const getCategories = async () => await apiCall("/Home/GetTechnologies");

const getCourseById = async (id) =>
  await apiCall(`/Home/GetCourseDetails?CourseId=${id}`);

const getCourseComments = async (courseId) =>
  await apiCall(`/Course/GetCourseCommnets/${courseId}`);

const likeCourse = async (courseId) =>
  await apiCall.post(`/Course/AddCourseLike?CourseId=${courseId}`);

const deleteCourseLike = async (user_like_id) => {
  const formData = new FormData();
  formData.append("CourseLikeId", user_like_id);
  return await apiCall.delete("/Course/DeleteCourseLike", { data: formData });
};

const addCourseToFavorites = async (courseId) => {
  const body = { courseId };
  return await apiCall.post("/Course/AddCourseFavorite", body);
};

const deleteCourseFavorite = async (user_favorite_id) => {
  const formData = new FormData();
  formData.append("CourseFavoriteId", user_favorite_id);
  return await apiCall.delete("/Course/DeleteCourseFavorite", {
    data: formData,
  });
};

const dissLikeCourse = async (courseId) =>
  apiCall.post(`/Course/AddCourseDissLike?CourseId=${courseId}`);

const likeComment = async (params) => {
  return await apiCall.post("/Course/AddCourseCommentLike", {}, { params });
};

const disLikeComment = async (params) =>
  await apiCall.post("/Course/AddCourseCommentDissLike", {}, { params });

const addComment = async (obj) => {
  const formData = new FormData();
  for (const key in obj) formData.append(key, obj[key]);
  return await apiCall.post("/Course/AddCommentCourse", formData);
};

const editComment = async (obj) => {
  const formData = new FormData();
  for (const key in obj) formData.append(key, obj[key]);
  return await apiCall.put("/Course/UpdateCourseComment", formData);
};

const replyComment = async (body) => {
  const formData = new FormData();
  for (const attr in body) formData.append(attr, body[attr]);
  return await apiCall.post("/Course/AddReplyCourseComment", formData);
};

const getCommentReplies = async (courseId, commentId) =>
  await apiCall(`/Course/GetCourseReplyCommnets/${courseId}/${commentId}`);

const rateCourse = async (params) =>
  await apiCall.post(`/Course/SetCourseRating`, {}, { params });

export {
  getTopCourses,
  getAllCourses,
  getCategories,
  getCourseById,
  likeCourse,
  deleteCourseLike,
  dissLikeCourse,
  addCourseToFavorites,
  deleteCourseFavorite,
  getCourseComments,
  likeComment,
  disLikeComment,
  addComment,
  editComment,
  replyComment,
  getCommentReplies,
  rateCourse,
};
