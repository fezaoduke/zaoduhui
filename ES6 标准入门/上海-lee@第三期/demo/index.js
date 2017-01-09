
const _rendPageContent = () => $(`
    <div class="lists">
        <p>AAA<p>
        <p>BBB<p>
        <p>CCC<p>
    </div>
`)
class Wrap1 {
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
