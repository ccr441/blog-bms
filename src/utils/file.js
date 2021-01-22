// /* eslint-disable prettier/prettier */
// /* eslint-disable no-console */
// // 腾讯云 COS 的使用
// const fs = require('fs');
// const co = require('co'); // 异步流程控制co 模块;
// const path = require('path');
// const filePathRoot = path.resolve(__dirname, '../../dist');
// const COS = require('cos-nodejs-sdk-v5');

// const files = [];
// const uploadFlagList = [];

// const cos = new COS({
//   SecretId: 'AKIDckgPs5d88tWw96Jsc6OaVEqKcibIHQbk',
//   SecretKey: 'DOQNH0Z0HOL8h0C8vV8uzoNhU2JJ2Wkk'
// });

// const remotePath =
//   process.env.APP_MODE && process.env.APP_MODE.includes("pro")
//     ? "koib-bms"
//     : "koib-bms-test";

// console.log('静态资源上传中...');
// console.log(remotePath);

// (() => {
//   // 递归取出 打包后./dist 文件夹下所有文件的路径
//   function readDirSync(filePath) {
//     const filePaths = fs.readdirSync(filePath);
//     filePaths.forEach(item => {
//       const cur_path = `${filePath}/${item}`;
//       const info = fs.statSync(cur_path);
//       if (info.isDirectory()) {
//         readDirSync(cur_path);
//       } else {
//         if (cur_path.indexOf('html') !== -1) {
//           return false;
//         }
//         files.push(cur_path);
//       }
//     });
//   }
//   readDirSync(filePathRoot);

//   co(function () {
//     try {
//       for (let index = 0; index < files.length; index++) {
//         const fileObj = files[index];
//         uploadFlagList.push(new Promise(function (resolve, reject) {
//           cos.putObject({
//             Bucket: 'koib-web-static-test-1259656400',
//             Region: 'ap-chengdu',
//             Key: fileObj.replace(filePathRoot, remotePath),
//             Body: fs.readFileSync(fileObj)
//           }, function (err, data) {
//             if (data && data.statusCode === 200) {
//               resolve(data)
//             } else {
//               reject(err)
//             }
//           })
//         }));
//       }
//       Promise.all(uploadFlagList).then(() => {
//         console.log('上传成功');
//       }).catch(() => {
//         console.log('上传失败');
//       })
//     } catch (e) {
//       console.log('上传失败,请查看日志: ', e);
//     }
//   })
// })();
