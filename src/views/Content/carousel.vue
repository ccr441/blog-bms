<template>
  <div class="main-wrap" v-loading="loading">
    <el-input
      v-model.trim="search.keyword"
      placeholder="输入文章标题"
      class="marginr20"
    ></el-input>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-search"
      @click.prevent="getArticleList"
    >
      搜索
    </el-button>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-plus"
      @click.prevent="addUser"
    >
      新增文章
    </el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top: 20px;">
      <el-table-column fixed prop="id" label="uid" width="150">
      </el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{ row }">
          <el-tag
            :type="row.status_str == '启用' ? 'success' : 'warning'"
            disable-transitions
          >
            {{ row.status_str }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="views" label="阅读量"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="{ row }">
          <el-button @click="editUser(row)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click="deleteArticle(row)" type="text" size="small">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { carouselList, deleteArticle } from "@/api/content";
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
    this.carouselList();
  }

  carouselList() {
    carouselList(this.search)
      .then(({ data }: any) => {
        console.log(data);
        // this.tableData = data.list;
        // this.total = Number(data.total);
      })
      .catch(() => {
        this.tableData = [];
      });
  }

  handleCurrentChange(val: any) {
    this.search.page = val;
    this.carouselList();
  }

  deleteArticle(row: any) {
    console.log(row);
    this.$confirm("确定要删除文章吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        deleteArticle(row.id)
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.carouselList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
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
