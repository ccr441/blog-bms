<template>
  <div class="main-wrap" v-loading="loading">
    <el-input
      v-model.trim="search.keyword"
      placeholder="输入用户名"
      class="marginr20"
    ></el-input>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-search"
      @click.prevent="getUserList"
    >
      搜索
    </el-button>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-plus"
      @click.prevent="addUser"
    >
      新增用户
    </el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top: 20px;">
      <el-table-column fixed prop="id" label="uid" width="150">
      </el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="up_ip" label="登录ip地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{ row }">
          <el-tag
            :type="row.status == '启用' ? 'success' : 'warning'"
            disable-transitions
          >
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="{ row }">
          <el-button @click="editUser(row)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click="deleteUser(row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total > pageNum"
      background
      layout="prev, pager, next"
      :page-size.sync="pageNum"
      @current-change="handleCurrentChange"
      :total="total"
      class="margint20 text-right"
    ></el-pagination>
    <el-drawer
      title="新增用户"
      :visible.sync="showUserPopup"
      :direction="'rtl'"
      :before-close="handleClose"
    >
      <div class="demo-drawer__content padding20">
        <el-form :model="addForm" :label-position="'right'" label-width="80px">
          <el-form-item label="用户名" class="add-item">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="add-item">
            <el-input v-model="addForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="add-item">
            <el-select v-model="addForm.status" placeholder="请选择用户状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button
            type="primary"
            class="paddingh20"
            @click="addManager"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="demo-drawer__content padding20">
        <el-form :model="editForm" :label-position="'right'" label-width="80px">
          <el-form-item label="用户名" class="add-item">
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码" class="add-item">
            <el-input v-model="editForm.password" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="状态" class="add-item">
            <el-select v-model="editForm.status" placeholder="请选择用户状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            class="paddingh20"
            @click="editManager"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  managerList,
  addManager,
  editManager,
  deleteManager
} from "@/api/user";
@Component
export default class User extends Vue {
  loading = false;
  showUserPopup = false;
  dialogVisible = false;
  pageNum = 2;
  search: Parms = {
    page: 1, // 当前页数
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_size: this.pageNum,
    keyword: ""
  };
  addForm: Parms = {
    name: "",
    password: "",
    status: 1
  };
  editForm: Parms = {};
  tableData: any[] = [];
  total = 0;

  created() {
    this.getUserList();
  }

  getUserList() {
    managerList(this.search)
      .then(({ data }: any) => {
        this.tableData = data.list;
        this.total = Number(data.total);
      })
      .catch(() => {
        this.tableData = [];
      });
  }

  handleCurrentChange(val: any) {
    this.search.page = val;
    this.getUserList();
  }

  handleClose() {
    this.showUserPopup = false;
    this.dialogVisible = false;
  }

  addUser() {
    this.showUserPopup = true;
  }

  addManager() {
    this.loading = true;
    const param = new FormData();
    param.append("name", this.addForm.name);
    param.append("pass_word", this.addForm.password);
    param.append("status", this.addForm.status);
    addManager(param)
      .then(() => {
        this.loading = false;
        this.initAdd();
        this.getUserList();
      })
      .catch(() => {
        this.loading = false;
        this.tableData = [];
      });
  }

  initEdit() {
    this.editForm.name = "";
    this.editForm.password = "";
    this.dialogVisible = false;
  }

  initAdd() {
    this.addForm.name = "";
    this.addForm.password = "";
    this.showUserPopup = false;
  }

  editUser(row: any) {
    this.dialogVisible = true;
    this.editForm = Object.assign({}, row);
  }

  editManager() {
    this.loading = true;
    const param = new FormData();
    const status: any = this.editForm.status == "启用" ? 1 : 2;
    param.append("name", this.editForm.name);
    param.append("status", status);
    editManager(this.editForm.id, param)
      .then(() => {
        this.loading = false;
        this.initEdit();
        this.getUserList();
      })
      .catch(() => {
        this.loading = false;
        this.tableData = [];
      });
  }

  deleteManager(id: any) {
    deleteManager(id).then(() => {
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.getUserList();
    });
  }

  deleteUser(row: any) {
    this.$confirm("确定要删除次用户吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteManager(row.id);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
}
</script>
<style>
.el-drawer__header > :first-child:focus {
  outline: none;
}
</style>
<style lang="scss" scoped>
.el-input {
  width: auto;
}
.add-btn {
  padding: 10px 30px;
  margin-left: 80px;
}
.demo-drawer__footer {
  margin-left: 80px;
}
.add-item {
  .el-input {
    width: 80%;
  }
}
</style>
