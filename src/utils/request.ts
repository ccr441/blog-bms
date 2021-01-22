import axios from "axios";
import { Message, Loading } from "element-ui";
// import qs from "qs";
import router from "@/route/router";

const hasError = (res: any) => {
  return Number(res.code) === 2000;
};

const baseUrl = "http://test.aiproclub.com";

let loading: any;
// let closeLoading = false;

const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 20000 // 请求超时时间
});

service.interceptors.request.use(
  (config: any) => {
    if (
      config.data &&
      Object.prototype.toString.call(config.data).includes("FormData")
    ) {
      Object.assign(config.headers, {
        "Content-Type": "multipart/form-data"
      });
    } else {
      Object.assign(config.headers, {
        "Content-Type": "application/json"
      });
      // if (config.method === "post") {
      //   // config.data = qs.stringify(config.data);
      //   // config.data = qs.stringify(config.data);
      // }
    }
    loading = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });

    const userToken = localStorage.getItem("user-token");

    if (userToken) {
      config.headers["Authorization"] = userToken;
    }

    console.log(config);
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response: any) => {
    const { data } = response;
    const code = response.data.code;
    const msg = response.data.msg;

    loading.close();

    // 登录失效
    if (Number(code) === 5000) {
      router.replace({ name: "login" });
    }
    if (hasError(response.data)) {
      return Promise.resolve(data);
    } else {
      Message({
        message: msg,
        type: "warning"
      });
      return Promise.reject(response.data);
    }
  },
  (err: any) => {
    loading.close();
    Message({
      message: err.error_msg || "请求错误",
      type: "error"
    });
    return Promise.reject(err);
  }
);

export default service;
