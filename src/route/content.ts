export const contentMenu = [
  {
    path: "/home/article",
    component: () => import("@/views/Content/list.vue"),
    name: "article",
    meta: {
      title: "文章列表",
      icon: "el-icon-user-solid",
      roles: ["admin"]
    }
  },
  {
    path: "/home/articleSort",
    component: () => import("@/views/Content/contentType.vue"),
    name: "articleSort",
    meta: {
      title: "文章分类",
      icon: "el-icon-user-solid",
      roles: ["admin"]
    }
  },
  {
    path: "/home/article-type-info",
    component: () => import("@/views/Content/contentTypeDetail.vue"),
    name: "article-typy-info",
    meta: {
      title: "新增/编辑文章分类",
      icon: "el-icon-user-solid",
      roles: ["admin"]
    }
  },
  {
    path: "/home/carousel",
    component: () => import("@/views/Content/carousel.vue"),
    name: "carousel",
    meta: {
      title: "轮播图",
      icon: "el-icon-user-solid",
      roles: ["admin"]
    }
  }
];
