export default {
     entry: 'src/scripts/index.js', //希望Rollup处理的文件路径
     dest: 'build/js/index.min.js', //编译完的文件需要被存放的路径
     format: 'iife', //RollUp支持多种输出格式。iife--立即执行函数表达式
     sourceMap: 'inline',//方便调试，会在生成文件中添加一个sourceMap，让开发更方便
 };
