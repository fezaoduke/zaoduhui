import { Wrap21 } from './index_2_1'

//数组成员为对象
const data = [
    {
        id: 345,
        name: '数组成员是对象'
    },
    {
        id: 111,
        name: '这是一个对象'
    },
    {
        id: 550,
        name: '哈哈哈'
    }
]

const _renderClassLi = data => data.map((item) =>
    `
        <li data-id="${item.id}">${item.name}</li>
    `).join('')

const _renderClassUl = (data) =>
`
    <h4>data为数组(模板字符串)</h4>
    <ul class="class_ul_1">
        ${_renderClassLi(data)}
    </ul>
`

export class Wrap2 {
    constructor() {
        this._bindDom()
    }

    dom(){
        return this.$wrap
    }

    _bindDom(){
        this.$wrap = _renderClassUl(data)
        $('.wrap_2').append(this.$wrap)

        this.$DataFor = new Wrap21().dom();
        $('.wrap_2').append(this.$DataFor)
    }


}
