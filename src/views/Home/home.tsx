import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header/index.vue";
import NavMenu from "@/components/NavMenu/index";

import "./home.scss";

@Component
export default class Home extends Vue {
  render() {
    return (
      <div class="home-wrap">
        <NavMenu></NavMenu>
        <div class="home-main">
          <Header></Header>
          <router-view />
        </div>
      </div>
    );
  }
}
