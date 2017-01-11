
//数组成员为对象
var data = [
            {
                id:"345",
                name : '数组成员是对象'
            },
            {
                id:"346",
                name : '这是一个对象'
            },
            {
                id:"347",
                name : '347'
            }
        ]

const _renderClassLi = data => data.map((item, index) =>
    `
        <li data-id="${item.id}">${item.name}</li>
    `
).join('')

const _renderClassUl = (data) =>
`
    <h4>data为数组</h4>
    <ul class="class_ul_1">
        ${_renderClassLi(data)}
    </ul>
`
class Wrap2 {
    constructor() {
        this._bindDom(data)
    }

    dom(){
        return this.$wrap
    }

    _bindDom(data){
        this.$wrap = $(_renderClassUl(data))
        $('.wrap_2').append(this.$wrap)
    }

}
