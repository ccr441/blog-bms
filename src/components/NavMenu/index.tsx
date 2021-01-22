import { Component, Vue } from "vue-property-decorator";
import { menuList } from "@/api/user";
import "./index.scss";

@Component
export default class Nav extends Vue {
  zIndex = "";
  menuData: any[] = [];
  menu: any[] = [];

  created() {
    menuList().then(({ data }) => {
      this.menuData = data;
    });
  }

  get menuActive() {
    return this.$route.path;
  }

  get isCollapse() {
    return this.$store.state.isCollapse;
  }

  render() {
    return (
      <div class="nav-wrap">
        <el-row>
          <el-col>
            <h5 class="nav-title">
              <img class="title-logo" src={require("../../assets/logo.png")} />
              个人博客
            </h5>
            <el-menu
              collapse={this.isCollapse}
              default-active={this.menuActive}
              class="el-menu-vertical-demo"
              background-color="#304156"
              text-color="#fff"
            >
              {this.menuData.map((item: any) => {
                if (item.children.length) {
                  return (
                    <el-submenu index={item.url}>
                      <template slot="title">
                        <i class={item.icon}></i>
                        <span>{item.title}</span>
                      </template>
                      {item.children.map((child: any) => {
                        return (
                          <el-menu-item
                            index={child.url}
                            on-click={() => {
                              this.$route.path !== child.url &&
                                this.$router.push(child.url);
                            }}
                          >
                            {child.title}
                          </el-menu-item>
                        );
                      })}
                    </el-submenu>
                  );
                } else {
                  return (
                    <el-menu-item
                      index={item.url}
                      on-click={() => {
                        this.$route.path !== item.url &&
                          this.$router.push(item.url);
                      }}
                    >
                      <i class={item.icon}></i>
                      <span slot="title">{item.title}</span>
                    </el-menu-item>
                  );
                }
              })}
            </el-menu>
          </el-col>
        </el-row>
      </div>
    );
  }
}
