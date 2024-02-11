import axios from "axios";
import { getItem, removeItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiCall = axios.create({
  baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  console.log(err);

  if (err.response.status === 401) removeItem("token");

  if (err.response.status >= 400 && err.response.status < 500) {
    console.log(err.message);
  }

  return Promise.reject(err);
};

apiCall.interceptors.response.use(onSuccess, onError);
apiCall.interceptors.request.use((opt) => {
  const token = getItem("token");

  if (token) opt.headers.Authorization = "Bearer " + token;

  return opt;
});

export { apiCall };
