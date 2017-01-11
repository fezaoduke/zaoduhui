
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
//data 修改
function mapData(filterData) {
    return filterData.map(item => {
        return { id: item.id, text: item.name }
    })
}
const filterSelectData = (data, initIndex) => {
    let results = [
            { id: 0, text: '全部' },
            { title: ' 大班', children: [] },
            { title: ' 小班', children: [] },
        ]

    results[initIndex].children     = mapData( data.filter(item => item.self === 1) )
    results[initIndex + 1].children = mapData( data.filter(item => item.self !== 1) )

    return results
}

data = filterSelectData(data, 1)
console.log(data)
var _renderLi = function (listData) {
    return listData.map(function (li) {
         return ("\n  <li class=\"select__li\" data-id=\"" + (li.id) + "\">" + (li.text) + "</li>\n");
     }).join(''); };

var _renderHasTitleLi = function (listData) {
    return listData.map(function (li) {
    if ( ! li.title)
      { return ("<li class=\"select__li\" data-id=\"" + (li.id) + "\">" + (li.text) + "</li>") }
    return ("\n      <li>\n        <span class=\"select__title\">" + (li.title) + "</span>\n      <ul data-title=\"" + (li.title) + "\">\n          " + (_renderLi(li.children)) + "\n        </ul>\n          </li>\n    ")
}).join(''); };

var _renderSelect = function (data) {
     return $(("\n  <div class=\"m-form-select\">\n        <div class=\"select__input\">\n      <span class=\"select__text\">" + (data.text) + "</span>\n           <i class=\"select__icon\"></i>\n    </div>\n    <ul class=\"select__list\">\n      " + (data.hasTitle ? _renderHasTitleLi(data.listData) : _renderLi(data.listData)) + "\n    </ul>\n  </div>\n")); };




const _renderClassLi3 = data => data.map(item => _renderSelect(item))
const _renderClassUl3 = (data) => $(`
    <h4>修改data值</h4>
    <ul class="class_ul_1">
        ${_renderClassLi3(data)}
    </ul>
`)

class Wrap3 {
    constructor() { 
        this._bindDom(data)
    }

    dom() {
        return this.$wrap
    }

    _bindDom(data) {
        this.$wrap = _renderClassUl3(data)
        $('.wrap_3').append(this.$wrap)
    }

}
