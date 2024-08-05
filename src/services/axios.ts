import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { isArray } from "lodash";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(BASE_URL);

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);

    if (error.response && error.response.data && error.response.data.error) {
      typeof error.response.data.error === "string" && message.error(error.response.data.error);
      isArray(error.response.data.message) && error.response.data.message.forEach((value: string) => message.error(value));
    }
    return Promise.reject();
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  survey: {
    list: "/staff/v1/survey/get-all",
    add: "/staff/v1/survey/add",
    publish: (id: string) => `/staff/v1/bitrix-chat-bot/send-notification/${id}`,
    one: (id: string) => `/staff/v1/survey/get-one/${id}?withQuestions=true`,
    update: (id: string) => `/staff/v1/survey/edit/${id}`,
    delete: (id: string) => `/staff/v1/survey/delete/${id}`,
  },
  surveyQuestion: {
    list: "/staff/v1/question/get-all",
    add: "/staff/v1/question/add",
    changeOrderIndexes: "/staff/v1/question/change-order-index",
    one: (id: string) => `/staff/v1/question/get-one/${id}`,
    update: (id: string) => `/staff/v1/question/edit/${id}`,
    delete: (id: string) => `/staff/v1/question/delete/${id}`,
  },
  surveyQuestionAnswer: {
    list: "/staff/v1/answer/get-all",
    add: "/staff/v1/answer/add",
    one: (id: string) => `/staff/v1/answer/get-one/${id}`,
    update: (id: string) => `/staff/v1/answer/edit/${id}`,
    delete: (id: string) => `/staff/v1/answer/delete/${id}`,
  },
};
