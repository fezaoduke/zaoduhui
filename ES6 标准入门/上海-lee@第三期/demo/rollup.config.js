// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss'; //支持css打包
import resolve from 'rollup-plugin-node-resolve'; //与commonjs合用，使三方的node模块在rollup中正确加载
import commonjs from 'rollup-plugin-commonjs';
// import replace from 'rollup-plugin-replace'; //本质为查找、替换变量
// import uglify from 'rollup-plugin-uglify'; //压缩减小生成代码体积

// PostCSS plugins
import simplevars from 'postcss-simple-vars'; // 变量
import nested from 'postcss-nested'; // css嵌套
import cssnext from 'postcss-cssnext';  //编译，编译后的css或许还可以在不支持新特性的浏览器中生效
import cssnano from 'cssnano'; // 压缩

export default {
    entry: 'src/scripts/main.js', //希望Rollup处理的文件路径
    dest: 'build/js/main.min.js', //编译完的文件需要被存放的路径
    format: 'iife', //RollUp支持多种输出格式。iife--立即执行函数表达式
    moduleName: 'LI', //打包后的模块名
    sourceMap: 'inline', //方便调试，会在生成文件中添加一个sourceMap，让开发更方便
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        postcss({
            plugins: [
                simplevars(),
                nested(),
                cssnext({ warnForDuplicates: false }),
                cssnano()
            ],
            extensions: ['.css'] //编译css文件
        }),
        babel({
            exclude: 'node_modules/**' //忽略第三方脚本，避免被编译
        }),
        eslint({
            exclude: [
                'src/scripts/main.js',
                'src/styles/**'
            ]
        })
        // replace({
        //     exclude: 'node_modules/**',
        //     ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        // }),
        // (process.env.NODE_ENV === 'production' && uglify()),
    ]
    // 注: 在 cssnext() 中配置了 { warnForDuplicates: false } 是因为它和 cssnano()
    //  都使用了 Autoprefixer ，会导致一个警告。不用计较配置, 我们只需要知道它被执行
    // 了两次(在这个例子中没什么坏处)并且取消了警告。
};

// options.moduleName
