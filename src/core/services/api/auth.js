import { apiCall } from "../interceptor/api-call";

// >>>>>> login API  <<<<<< \\

export const loginAPI = async (user) => {
  try {
    const response = await apiCall.post("/Sign/Login", user);

    return response;
  } catch (error) {
    return false;
  }
};

// >>>>>> register API  <<<<<< \\

// first step : SendVerifyMessage
export const sendVerifyMessage = async (user) => {
  try {
    const response = await apiCall.post("/Sign/SendVerifyMessage", user);

    return response;
  } catch (error) {
    return false;
  }
};

// second step : VerifyMessage
export const verifyMessage = async (user) => {
  try {
    const response = await apiCall.post("/Sign/VerifyMessage", user);

    return response;
  } catch (error) {
    return false;
  }
};

// third step : Register
export const registerAPI = async (user) => {
  try {
    const response = await apiCall.post("/Sign/Register", user);

    return response;
  } catch (error) {
    return false;
  }
};

// >>>>>> reset password API  <<<<<< \\

// first step : Forget Password
export const forgetPasswordAPI = async (data) => {
  try {
    const response = await apiCall.post("/Sign/ForgetPassword", data);

    return response;
  } catch (error) {
    return false;
  }
};

// second step : reset confirm value
export const resetConfirmValue = async (data) => {
  try {
    const response = await apiCall.get(`/Sign/Reset/${data}`);

    return response;
  } catch (error) {
    return false;
  }
};

// third step : Forget Password
export const resetPasswordAPI = async (data) => {
  try {
    const response = await apiCall.post("/Sign/Reset", data);

    return response;
  } catch (error) {
    return false;
  }
};
