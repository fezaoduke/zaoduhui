import '../../styles/main.css'

const _rendPageContent = () => $(`
    <div class="lists">
        <p>AAA</p>
        <p>BBB</p>
        <p>CCC</p>
    </div>
`)
export default class Wrap1 {
    constructor() {
        this._bindDom()
    }
    dom(){
        return this.$wrap
    }

    _bindDom(){
        this.$wrap = _rendPageContent()
        $('.wrap_1').append(this.$wrap)
    }
}

 // Enable LiveReload 命令行进程监听文件变化，然后通过websockets向客户端脚本发送消息触发重加载。ctrl+c结束监听
   document.write(
     '<script src="http://' + (location.host || 'localhost').split(':')[0] +
     ':35729/livereload.js?snipver=1"></' + 'script>'
   );
