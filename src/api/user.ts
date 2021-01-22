import request from "@/utils/request";

export const userLogin = (data?: any) => {
  return request({
    url: "/api/login",
    method: "post",
    data
  });
};

export const userLogout = (params?: any) => {
  return request({
    url: "/api/logout",
    method: "get",
    params
  });
};

export const managerList = (params?: any) => {
  return request({
    url: "/api/manager/list",
    method: "get",
    params
  });
};

export const addManager = (data?: any) => {
  return request({
    url: "/api/manager/create",
    method: "post",
    data
  });
};

export const editManager = (id: any, data?: any) => {
  return request({
    url: `/api/manager/update/${id}`,
    method: "post",
    data
  });
};

export const deleteManager = (id: any, data?: any) => {
  return request({
    url: `/api/manager/delete/${id}`,
    method: "post",
    data
  });
};

export const menuList = (params?: any) => {
  return request({
    url: `/api/menu/side_menu`,
    method: "get",
    params
  });
};
