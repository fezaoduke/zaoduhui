
//数组成员为对象

// var arr = new Map()
// data.forEach(([key, value]) => arr.set(key, value))
// let dataM = new Map([
//   [1, 'one'],
//   [2, 'two'],
//   [3, 'three'],
// ]);

var dataM = new Map(
  [
      ["id","345"],
      ["id","346"],
      ["id","347"]
  ]
)
console.log(dataM)
const _renderClassLi = (dataM) => dataM.map((item) =>
    `
        <li data-id="${item.value}">${item.value}</li>
    `
).join('')

const _renderClassUl = (dataM) =>$(`
    <h4>data为map结构</h4>
    <ul class="class_ul_1">
        ${_renderClassLi(dataM)}
    </ul>
`)

class Wrap2 {
    constructor(dataM) {
        this._bindDom(dataM)
    }

    dom(){
        return this.$wrap
    }

    _bindDom(data){
        this.$wrap = _renderClassUl(dataM)
        $('.wrap_2').append(this.$wrap)
    }

}
