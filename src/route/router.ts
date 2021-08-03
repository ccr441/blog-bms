import Vue from "vue";
import Router from "vue-router";
import { userMenu } from "./user"; // 用户路由
import { contentMenu } from "./content"; // 内容路由
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
      children: [...userMenu, ...contentMenu]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/login.tsx")
    }
  ]
});

// export { asyncRoute };
