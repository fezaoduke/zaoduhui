
//数组成员为对象
const person = {
    name: 'lee',
    age: 16,
    address: '上海',
    hobby: '哈哈哈'
}

const _renderEm = data => {
    const arr = []

    for (const i in data)
        arr.push(data[i])
        //  return arr.map(item => `<dt>${item.key}</dt><dd>${item.val}</dd>`).join('')
    return arr.map(item => `<dd>${item}</dd>`).join('')
}

const _renderDiv = (data) =>
`
    <div class="person-info-output">
        <h4>person对象 for&in输出,export与import使用</h4>
        <dl class="class_ul_1">
            <dt>person info<dt>
            ${_renderEm(data)}
        </dl>
    </div>
`

export class Wrap21 {
    constructor() {
        this._bindDom()
    }

    dom(){
        return this.$wrap
    }

    _bindDom(){
        this.$wrap = _renderDiv(person)
    //    $('.wrap_2').append( this.$wrap )
    }

    // createFor(){
    //     this.$wrap = _renderClassUl2(person);
    // }
}
