import axios from "axios";

const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_API_URL,
  headers: {
    Accept: "application/json",
  },
});

export { uploadApi };
