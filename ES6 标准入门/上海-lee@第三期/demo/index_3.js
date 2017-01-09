
//数组成员为对象
var data=[
            {
                "id":"345",
                "name":"(01)班",
                "self":1
            },
            {
                "id":"346",
                "name":"(02)班",
                "self":1
            },
            {
                "id":"347",
                "name":"(03)班",
                "self":2
            }
        ]

for(let i in data){
    data[i]
}

var items = [
  ['name', '张三'],
  ['title', 'Author']
];
var map = new Map();
items.forEach(([key, value]) => map.set(key, value));console.log(items)
const _renderClassLi = data => data.map((item, index) => {
    `
        <li data-id="${item.id}">${item.name}</li>
    `
}).join('')

const _renderClassUl = (data) =>
`
    <h4>data为数组</h4>
    <ul class="class_ul_1">
        ${_renderClassLi(data)}
    </ul>
`
class Wrap2 {
    constructor(data) {
        this._bindDom(data)
    }
    dom(){
        return this.$wrap
    }
    _bindDom(data){
        this.$wrap = _renderClassUl(data)
        $('.wrap_2').append(this.$wrap)
    }
    _bindEvent(){

    }
}
