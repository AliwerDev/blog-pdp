import { message } from "antd";
import axios from "axios";
import { isArray } from "lodash";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(BASE_URL);

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      isArray(error.response.data.errors) && error.response.data.errors.forEach((value: any) => message.error(value?.errorMsg));
    }
    return Promise.reject();
  }
);

interface DownloadFileParams {
  url: string;
  autoDownload?: boolean;
  fileName?: string;
  mimeType?: string;
  fileNameWithMimeType?: string;
}

export const downloadFile = async ({ url, autoDownload = true, fileName = "file.xlsx" }: DownloadFileParams): Promise<string> => {
  try {
    const res = await axiosInstance.get(url, { responseType: "blob" });
    const newUrl = window.URL.createObjectURL(res.data);

    if (autoDownload && fileName) {
      const link = document.createElement("a");
      link.href = newUrl;
      link.setAttribute("download", fileName);
      link.click();
    }

    return newUrl;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default axiosInstance;

export const endpoints = {
  department: { list: "staff/v1/bitrix-chat-bot/department-options" },
  survey: {
    list: "/staff/v1/survey/get-all",
    add: "/staff/v1/survey/add",
    publish: "/staff/v1/bitrix-chat-bot/send-notification",
    exel: (id: string) => `/staff/v1/survey/download-excel/${id}`,
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
