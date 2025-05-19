/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import environment from "configs/environemt";
import { maxReqTimeout } from "constants/main";
import { cypherText, decypherText, logout } from "utils/auth";
import { getToken } from "./token";
import { showToast } from "utils/notify";
import ToastContainer from "components/molecules/Toast";

const resolve = (response: any) => {
  let { data } = response;

  if (data?.data?.secure) {
    data = JSON.parse(decypherText(data?.data?.payload).toString());
  }
  return { ...response, data: undefined, body: data };
};

const reject = (error: any) => {
  //url is the backend endpoint that was called
  const url = error?.response?.config?.url;
  //status is the response status code
  const errorStatus = error?.response?.status;
  const errorCode = error?.response?.data?.message?.errorCode;
  const serverErrorMessage = error?.response?.data?.message;

  // on expired, or invalid token
  if (errorStatus === 401 && url !== "/auth/login" && url !== "/auth/reset") {
    return logout();
  }

  if (error.message === "timeout") {
    return showToast(
      <ToastContainer
        title="Timeout"
        description="Oh, Sorry! This is taking longer than expected. Please, try again later"
      />,
      "info"
    );
  }
  const { data, status } = error.response || {};

  if (status === 401) {
    // logout();
  }
  if (error.code == "ERR_BAD_RESPONSE") {
    return showToast(
      <ToastContainer title="Bad Response" description={serverErrorMessage} />,
      "error"
    );
  }
  if (status === 500) {
    const isOnline = navigator.onLine;
    return isOnline
      ? showToast(
          <ToastContainer
            title="Something went wrong. Please try again later"
            description={`Error code: ${errorCode ?? error?.message}`}
          />,
          "error"
        )
      : showToast(
          <ToastContainer
            title="No internet connections"
            description="Please make sure your device is connected to the internet and try again"
          />,
          "warning"
        );
  }
  if (error.code == "ERR_NETWORK") {
    return showToast(
      <ToastContainer
        title="Network Error"
        description="Please check your internet connection and try again"
      />,
      "warning"
    );
  }

  const message = data.message || error.message;

  const errorMessage = (errorMessage: any) => {
    if (status == 403 || status == 409) {
      const title = status == 403 ? "Access Issue" : "Data Conflict";
      showToast(
        <ToastContainer title={title} description={errorMessage} />,
        "warning"
      );
    } else {
      showToast(
        <ToastContainer title="Error" description={errorMessage} />,
        "error"
      );
    }
  };

  if (Array.isArray(message)) {
    const errorList = (
      <ul>
        {message.map((item, i) => {
          return <li key={i}> {item} </li>;
        })}
      </ul>
    );
    return errorMessage(errorList);
  }

  errorMessage(message?.message || message?.error || message);

  return error;
};

const instance = axios.create({
  baseURL: environment.baseUrl,
  timeout: 120000,
  timeoutErrorMessage: "timeout",
  responseType: "json",
  validateStatus: (status) => status < 400,
  withCredentials: true,
});

instance.interceptors.request.use((config: any) => {
  const { data, Authorization } = config;
  const authRoute = config.url.includes("auth");
  const token = getToken();
  config.headers = Authorization
    ? {
        authorization: Authorization, // for special APIs with unique authorization
      }
    : {
        authorization: token ? `Bearer ${getToken()}` : "", // for all APIs
      };
  if (data && authRoute && import.meta.env.VITE_ENV !== "development") {
    const encryptedData = cypherText(JSON.stringify(data));
    config.data = { payload: encryptedData };
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${getToken()}` : "",
    };
    if (import.meta.env.VITE_ENV !== "development") {
      config.headers = {
        ...config.headers,
        encryption: true,
      };
    }
  }
  // increase timeout for export requests since they take longer
  if (config.type === "export") {
    config.timeout = maxReqTimeout || 300000;
  }

  return config;
});
instance.interceptors.response.use(resolve, reject);

export default instance;
