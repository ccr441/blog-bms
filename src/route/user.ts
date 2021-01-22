export const userMenu = [
  {
    path: "/user",
    component: () => import("@/views/User/user.vue"),
    name: "user",
    meta: {
      title: "用户列表",
      icon: "el-icon-user-solid",
      roles: ["admin"]
    }
  }
];

export const userRoute = [
  {
    path: "/user-detail",
    component: () => import("@/views/User/detail.vue"),
    name: "user-detail",
    meta: {
      title: "用户详情"
    }
  }
];
