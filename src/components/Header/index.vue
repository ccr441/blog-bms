<template>
  <div class="header-wrap dis-f align-center justify-between">
    <div class="user-breadcrumb">
      <i
        :class="$store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="setCollapse"
      >
      </i>
      <span class="paddingh10 el-breadcrumb">{{ routeName || "" }}</span>
    </div>
    <div class="user-wrap">
      <img class="user-pic" src="../../assets/logo.png" />
      <el-dropdown @command="commandItem">
        <span class="user-name">
          {{ userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="editInfo">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { userLogout } from "@/api/user";
import "./index.scss";

@Component
export default class Header extends Vue {
  // isCollapse: boolean = false;
  routerTitle = "";

  get userName() {
    return localStorage.getItem("user-name") || "";
  }

  get routeName() {
    const pageRoute: any = this.$route.matched || "";
    const routeParent: any =
      pageRoute && pageRoute[pageRoute.length - 1].parent;
    this.routerTitle = pageRoute[pageRoute.length - 1].meta.title;
    return routeParent && routeParent.meta.title
      ? `${routeParent.meta.title}/${
          pageRoute[pageRoute.length - 1].meta.title
        }`
      : pageRoute[pageRoute.length - 1].meta.title;
  }

  setCollapse() {
    console.log(11);
  }

  commandItem(command: string) {
    if (command === "logout") {
      this.logout();
    }
  }

  logout() {
    userLogout().then(() => {
      this.$router.push("login");
    });
  }
}
</script>
