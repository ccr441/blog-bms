// <template>
//   <div class="edit-box">
//     <el-upload
//       class="dis-n"
//       action=""
//       accept="image/png, image/jpeg, image/gif"
//       :http-request="uploadImg"
//       :show-file-list="false"
//     >
//       <i class="el-icon-plus avatar-uploader-icon" ref="filElem"></i>
//     </el-upload>

//     <el-upload
//       class="dis-n"
//       action=""
//       accept="video/mp4"
//       :http-request="uploadVideo"
//       :show-file-list="false"
//     >
//       <i class="el-icon-plus avatar-uploader-icon" ref="videoFile"></i>
//     </el-upload>
//     <quill-editor
//       v-model="editorTxt"
//       :options="editorOption"
//       @blur="editorLength"
//       @change="editorChange"
//       ref="quillEditor"
//     ></quill-editor>
//   </div>
// </template>

// <script lang="ts">
// import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
// // import TcVod from "vod-js-sdk-v6";
// // import { getVodSignature } from "@/api/course";
// // import { uploadImgApi } from "@/api/content";
// import quillConfig from "@/utils/quillConfig";

// @Component
// export default class editor extends Vue {
//   editorTxt: string | undefined = "";
//   addRange: any = null;
//   loading: boolean = false;

//   @Prop(String)
//   value?: string;

//   @Prop({ default: false })
//   isBlur?: boolean;

//   @Prop({
//     type: Array,
//     default: () => {
//       return [];
//     }
//   })
//   toolbar: any;

//   @Watch("value")
//   introChanged(val: string) {
//     this.editorTxt = val;
//   }

//   @Watch("isBlur")
//   inBlurChanged(val: boolean) {
//     val && this.editorLength();
//   }

//   @Prop({
//     type: String,
//     default: "请输入详细介绍..."
//   })
//   placeholder: any;

//   editorOption = {
//     placeholder: this.placeholder,
//     modules: {
//       toolbar: {
//         container: [
//           ["bold", "italic", "underline", "strike", "background"],
//           [{ list: "bullet" }, { list: "ordered" }],
//           [{ indent: "-1" }, { indent: "+1" }],
//           [{ align: [] }],
//           [{ direction: "rtl" }],
//           [{ header: [1, 2, 3, 4, 5, 6, false] }],
//           [{ color: [] }],
//           [{ size: quillConfig.initFontSize() }],
//           [{ lineHeight: quillConfig.initLineHeight() }],
//           [...this.toolbar]
//         ]
//       }
//     }
//   };

//   created() {
//     this.editorTxt = this.value;
//   }

//   mounted() {
//     const toolbarMoudle = (this.$refs.quillEditor as any).quill.getModule(
//       "toolbar"
//     );
//     toolbarMoudle.addHandler("image", this.imgHandler); // 添加图片模块
//     toolbarMoudle.addHandler("video", this.uploadVideoHandler); // 添加视频模块
//   }

//   imgHandler(state: any) {
//     if (state) {
//       (this.$refs.filElem as any).click();
//     }
//   }

//   uploadVideoHandler(val: any) {
//     val && (this.$refs.videoFile as any).click();
//   }

//   getSignature() {
//     let classId: number =
//       process.env.VUE_APP_MODE === "production" ? 655356 : 655357;
//     return getVodSignature({
//       type: 16,
//       resource_id: 0,
//       class_id: classId
//     }).then(({ data }) => {
//       return data.sign;
//     });
//   }

//   async upload(file: any) {
//     try {
//       const tcVod = new TcVod({ getSignature: this.getSignature });
//       const uploader = tcVod.upload({ videoFile: file });
//       // uploader.on("video_progress", info => {
//       //   this.progress = parseInt(info.percent * 100);
//       // });
//       const {
//         fileId,
//         video: { url }
//       } = await uploader.done();
//       this.insertEl(url, "video");
//       this.loading = false;
//     } catch (error) {
//       this.$message({
//         message: error.message,
//         type: "error"
//       });
//     }
//   }

//   uploadVideo(e: any) {
//     this.upload(e.file);
//   }

//   uploadImg(e: any) {
//     const param = new FormData();
//     param.append("type", "6");
//     param.append("image", e.file);
//     uploadImgApi(param).then(({ data }: any) => {
//       this.insertEl(data.src, "img");
//     });

//     // const files: any = e.file;
//     // let coverImg = URL.createObjectURL(files);

//     // let oImg = document.createElement("img");
//     // oImg.src = coverImg;
//     // document.body.appendChild(oImg);

//     // oImg.onload = () => {
//     //   let imgWidth = oImg.offsetWidth;

//     //   if (Number(imgWidth) > 500 && Number(imgWidth) < 1500) {
//     //     const param = new FormData();
//     //     param.append("type", "content");
//     //     param.append("image", e.file);
//     //     uploadImg(param).then(({ data }: any) => {
//     //       this.insertEl(data[0]);
//     //     });
//     //   } else {
//     //     this.$message("图片规格不符合：宽度大于500px 并且 小于1500px！");
//     //   }
//     // };
//   }

//   insertEl(dataUrl: string, type: string) {
//     let dataEl: any;
//     let dataObj: any;
//     if (type === "img") {
//       dataEl = "image";
//       dataObj = dataUrl;
//     } else {
//       dataEl = "simpleVideo";
//       dataObj = {
//         url: dataUrl,
//         controls: "controls",
//         width: "100%",
//         height: "100%"
//       };
//     }
//     const quillObj = (this.$refs.quillEditor as any).quill;
//     this.addRange = quillObj.getSelection();
//     quillObj.insertEmbed(
//       this.addRange !== null ? this.addRange.index : 0,
//       dataEl,
//       dataObj
//     );
//     // 设置图片宽度
//     type === "img" &&
//       quillObj.formatText(this.addRange.index, 1, {
//         width: "100%"
//       });
//   }

//   @Emit("editorLength")
//   editorLength() {
//     return (this.$refs.quillEditor as any).quill.getLength() - 1;
//   }
//   @Emit("input")
//   editorChange() {
//     return this.editorTxt;
//   }
// }
// </script>

// <style scoped lang="scss">
// .edit-box {
//   color: #606266;
// }

// /deep/ .ql-formats {
//   line-height: 24px;
// }
// </style>
