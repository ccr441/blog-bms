<template>
  <div class="article-warp padding20">
    <el-form
      :model="columnForm"
      ref="columnForm"
      label-width="120px"
      class="class-form"
    >
      <el-form-item
        label="栏目名称"
        prop="sort_name"
        :rules="{
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }"
      >
        <el-input
          type="text"
          v-model.trim="columnForm.sort_name"
          autocomplete="off"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
        :rules="{
          required: true,
          message: '类型不能为空',
          trigger: 'blur'
        }"
      >
        <el-select v-model="columnForm.status" @change="changeCtype">
          <el-option
            v-for="item in statusMap"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="栏目描述" prop="description">
        <el-input
          type="text"
          v-model.trim="columnForm.description"
          autocomplete="off"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-input
          type="text"
          v-model.trim="columnForm.keyword"
          autocomplete="off"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submit('columnForm')"
          style="padding: 12px 60px;"
          >发布</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import editor from "@/components/editor.vue";
// import inputSearch from "@/components/inputSearch.vue";
// import classTag from "@/components/classTag.vue";
// import { getUserList } from "@/api/user";
import { setArticleType } from "@/api/content";
// import { editArticleType } from "@/api/content";

@Component({
  components: {
    // editor,
    // inputSearch,
    // classTag
  }
})
export default class EditArticle extends Vue {
  loading = false;
  columnForm: Parms = {
    sort_name: "",
    status: "",
    description: "",
    keyword: ""
  };
  statusMap = [
    {
      id: 1,
      text: "启用"
    },
    {
      id: 2,
      text: "禁用"
    }
  ];
  articleId = "";

  get isEdit() {
    // type为1是编辑
    return this.$route.query.type === "1" && !!this.articleId;
  }

  created() {
    this.isEdit && this.getContentInfo();
  }

  getContentInfo() {
    // getContentInfo({
    //   id: this.articleId,
    //   type: "1"
    // }).then(({ data }) => {
    //   this.columnForm = data;
    //   this.showClass = this.columnForm.ctype === "1" ? true : false;
    //   this.content = data.content;
    //   this.tagInfo = data.cate_info;
    // });
  }

  submit(formName: string) {
    (this.$refs[formName] as any).validate((valid: any) => {
      valid
        ? this.setArticleType()
        : this.$message({
            message: "带*为必填项，请仔细核对!",
            center: true,
            type: "error"
          });
    });
  }

  changeCtype() {
    console.log(11);
  }

  setArticleType() {
    setArticleType(this.columnForm).then(() => {
      this.$message({
        message: this.isEdit ? "修改成功" : "创建成功",
        type: "success"
      });
      this.$router.push("articleSort");
    });
  }
}
</script>

<style scoped lang="scss">
.article-warp {
  .el-input {
    width: 30%;
    min-width: 324px;
  }
}
</style>
