1.安装node 最新版本


2.进入工程根目录：

  npm install -g grunt-cli

  npm install
  
  grunt


3.说明：
  
  app 目录是源码
  
  dist 目录是编译压缩后的文件，最终只需要这个目录作为线上生产文件，运行grunt dist可以打包至此目录

  vender 是第三方依赖
  
  interface 内是接口文件，是mock数据