/**
 * arg[0] = node, arg[1] = this_file.js
 * 使用Node运行，用于复制dist目录到对应的文件夹
 * 下载ncp来复制
 * npm install ncp
 * 下载fs来操作文件
 * npm install fs
 * 使用方式
 * node distribute.js <des_path> <isDeleteFolder: boolean>
 */

const log = console.log;
const errlog = console.error;

(function() {
  if (process.argv.length < 2) {
    errlog('node distribute.js <des_path>');
  }
})();

const srcPathJS = './dist/mathlive.mjs';
const srcPathCoreCss = './dist/mathlive.core.css';
const srcPathCss = './dist/mathlive.css';
const srcPathFonts = './dist/fonts';
const desPath = process.argv[2];
const isDeleteFolder = process.argv[3];

const fs = require('fs')
function deleteFolder(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

(function() {
  if (isDeleteFolder) {
    deleteFolder(desPath)
  }
})();

const ncp = require('ncp').ncp;

fs.mkdir(desPath, function(err) {});
fs.copyFileSync(srcPathJS, desPath + '/mathlive.min.js')
fs.copyFileSync(srcPathCoreCss, desPath + '/mathlive.core.css')
fs.copyFileSync(srcPathCss, desPath + '/mathlive.css')
const fontDesPath = desPath + '/fonts';
fs.mkdir(fontDesPath, function(err) {});
ncp(srcPathFonts, fontDesPath, function(err) {
  if (err) {
    return errlog(err);
  }
  log('done fonts!');
});