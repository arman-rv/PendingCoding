import { apiCall } from "../interceptor/api-call";

const getAllBlogs = async () => await apiCall("/News");

const getBlogById = async (id) => await apiCall(`/News/${id}`);

const likeBlog = async (blogId) =>
  await apiCall.post(`/News/NewsLike/${blogId}`);

const addBlogToFavorite = async (id) =>
  await apiCall.post(`/News/AddFavoriteNews?NewsId=${id}`);

const rateBlog = async (params) =>
  await apiCall.post("/News/NewsRate", {}, { params });

const getBlogComments = async (id) =>
  await apiCall(`/News/GetNewsComments?NewsId=${id}`);

const getCommentReplies = async (id) =>
  await apiCall(`/News/GetRepliesComments?Id=${id}`);

const likeComment = async (commentId) =>
  await apiCall.post(`/News/CommentLike/${commentId}?LikeType=true`);

const addComment = async (obj) =>
  await apiCall.post("/News/CreateNewsComment", obj);

const replyComment = async (obj) => {
  await apiCall.post(`/News/CreateNewsReplyComment`, obj);
};

const editComment = async (obj) =>
  await apiCall.put("/News/UpdateNewsComment", obj);

export {
  getAllBlogs,
  getBlogById,
  likeBlog,
  addBlogToFavorite,
  rateBlog,
  getBlogComments,
  getCommentReplies,
  likeComment,
  addComment,
  replyComment,
  editComment,
};
