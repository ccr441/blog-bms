import Vue from "vue";
import Router from "vue-router";
// import { userMenu, userRoute } from "./user"; // 用户路由
Vue.use(Router);

// const asyncRoute = [...userMenu];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home/home.tsx"),
      children: [
        {
          path: "/home/users",
          component: () => import("@/views/User/user.vue"),
          name: "user",
          meta: {
            title: "用户列表",
            icon: "el-icon-user-solid",
            roles: ["admin"]
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/login.tsx")
    }
  ]
});

// export { asyncRoute };
