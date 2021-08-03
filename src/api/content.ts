import request from "@/utils/request";

export const getArticleList = (params?: any) => {
  return request({
    url: "/api/article/list",
    method: "get",
    params
  });
};

export const deleteArticle = (id?: any) => {
  return request({
    url: `/api/article/delete/${id}`,
    method: "delete"
  });
};

export const getArticleTypeList = (params?: any) => {
  return request({
    url: "/api/article/sort/list",
    method: "get",
    params
  });
};

export const deleteArticleType = (id?: any) => {
  return request({
    url: `/api/article/sort/delete/${id}`,
    method: "delete"
  });
};

export const carouselList = (params?: any) => {
  return request({
    url: "/api/slide/list",
    method: "get",
    params
  });
};

export const setArticleType = (data?: any) => {
  return request({
    url: `/api/article/sort/create`,
    method: "post",
    data
  });
};
