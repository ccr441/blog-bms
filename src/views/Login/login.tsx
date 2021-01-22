import { Component, Vue } from "vue-property-decorator";
import { Form, Button, Input } from "element-ui";
import { userLogin } from "@/api/user";
// import md5 from "js-md5";

import "./login.scss";

interface FromValue {
  [propName: string]: any;
}

@Component({
  components: {
    "el-button": Button,
    "el-form": Form,
    "el-input": Input,
    "el-form-item": Form
  }
})
export default class Login extends Vue {
  LoginFrom: FromValue = {
    name: "",
    password: ""
  };
  loading = false;

  submit() {
    this.loading = true;
    const param = new FormData();
    param.append("name", this.LoginFrom.name);
    param.append("password", this.LoginFrom.password);
    userLogin(param)
      .then(({ data }) => {
        console.log(data);
        this.loading = false;
        localStorage.setItem("user-token", `Bearer ${data.access_token}`);
        localStorage.setItem("user-name", data.user.name);
        this.$message({
          message: "登录成功！",
          center: true,
          type: "success"
        });
        this.$router.push("/");
      })
      .catch(() => {
        this.loading = false;
      });
  }
  render() {
    return (
      <div class="login-wrap">
        <div class="login-content">
          <h2 class="login-title">博客后台管理系统</h2>
          <el-form onSubmit={this.submit}>
            <el-form-item class="input-item" label="用户名">
              <el-input
                type="text"
                v-model={this.LoginFrom.name}
                placeholder="请输入用户名"
                maxlength="11"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model={this.LoginFrom.password}
                placeholder="请输入密码"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type={
                  !this.LoginFrom.name || !this.LoginFrom.password
                    ? "info"
                    : "primary"
                }
                onClick={this.submit}
                loading={this.loading}
                native-type="submit"
                disabled={!this.LoginFrom.name || !this.LoginFrom.password}
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    );
  }
}
