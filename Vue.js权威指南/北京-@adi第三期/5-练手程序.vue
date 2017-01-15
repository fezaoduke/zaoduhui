<template>
    <div class="my-swipe">
        <div class="my-swipe-item-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { once } from 'wind-dom/src/event';
    import { addClass, removeClass } from 'wind-dom/src/class';

    export default {
        name: "swipe",
        created(){
            // console.log('swipe组件初始化ing...');
            //存储滑动状态
            this.dragState = {
                // startTime: null,
                // startLeft: null,
                // currentLeft: null,
                // startTop: null,
                // currentTop: null,
                // startTopAbsolute: null,
                // currentTopAbsolute: null,
                // pageWidth: null,
                // pageHeight: null
            };
        },
        data(){
            return {
                ready: false,
                index: 0,
                dragging: false,//判断用户是否在进行滑动行为
                userScrolling: false,//是否是用户滚动条事件
                animating: false,//判断是否处于动画过渡中
                pages: []
            }
        },
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            }
        },
        methods: {
            //暂时无用
            swipeItemCreated: function(){
                if(!this.ready) return;
                clearTimeout(this.reInitTimer);
                this.reInitTimer = setTimeout(() => {
                    this.initPages();
                }, 100);
            },
            initPages: function(){
                let children = this.$children;
                let pages = [];
                let intDefaultIndex = Math.floor(this.defaultIndex);
                let defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0;
                this.index = defaultIndex;

                children.forEach(function(child, index){
                    pages.push(child.$el);
                    removeClass(child.$el, 'active');
                    if (index === defaultIndex) {
                        addClass(child.$el, 'active');
                    }
                })
                this.pages = pages;
                // console.log('init ready, now to listening touch event')
            },
            touchStartAction: function(event){
                let element = this.$el,
                    index = this.index,
                    children = this.$children, 
                    touch = event.touches[0],
                    dragState = this.dragState;
                
                dragState.startTime = new Date();
                dragState.startLeft = touch.pageX;
                dragState.startTop = touch.pageY;
                dragState.max_X = 0;
                dragState.startTopAbsolute = touch.clientY;

                dragState.pageWidth = element.offsetWidth;
                dragState.pageHeight = element.offsetHeight;

                let prevPage = children[index -1],
                    dragPage = children[index],
                    nextPage = children[index + 1];

                dragState.prevPage = prevPage ? prevPage.$el : null;
                dragState.dragPage = dragPage ? dragPage.$el : null;
                dragState.nextPage = nextPage ? nextPage.$el : null;
                
                if(dragState.prevPage) dragState.prevPage.style.display = 'block';
                if(dragState.nextPage) dragState.nextPage.style.display = 'block';
            },
            touchMoveAction: function(event){
                let dragState = this.dragState,
                    touch = event.touches[0];

                dragState.currentLeft = touch.pageX;
                dragState.currentTop = touch.pageY;
                dragState.currentTopAbsolute = touch.clientY;

                let offsetLeft = dragState.currentLeft - dragState.startLeft,
                    offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

                let distanceX = Math.abs(offsetLeft),
                    distanceY = Math.abs(offsetTop);
                let max_X = Math.max(distanceX, dragState.max_X) 
                dragState.max_X = max_X;
                
                offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);//兼容PC端模拟器的界限处理
                dragState.offsetLeft = offsetLeft;
                let towards = offsetLeft < 0 ? 'next' : 'prev';
                dragState.towards = this.$children.length < 2?null:towards;
                if (max_X < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
                    this.userScrolling = true;
                    return;
                } else {
                    this.userScrolling = false;
                    event.preventDefault();
                }  

                if(dragState.prevPage && towards === 'prev'){
                    this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth)
                }

                this.translate(dragState.dragPage, offsetLeft);

                if (dragState.nextPage && towards === 'next') {
                    this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
                }

            },
            touchEndAction: function(event){
                let index = this.index,
                    dragState = this.dragState,
                    offsetLeft = dragState.offsetLeft,
                    currentLeft = dragState.currentLeft,
                    towards = dragState.towards,
                    dragTime = new Date() - dragState.startTime,                      
                    offsetTop = dragState.currentTop - dragState.startTop,
                    pageWidth = dragState.pageWidth,
                    pageCount = this.pages.length; 
                let element = null,
                    flag = null;
                
                if(dragTime < 300){
                    let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
                    if (isNaN(offsetLeft) || isNaN(offsetTop)) {
                        fireTap = true;
                    }
                    if (fireTap) {
                        this.$children[this.index].$emit('tap');
                    }
                    if(currentLeft === undefined) return;
                }

                if(dragTime < 300 || Math.abs(offsetLeft) > pageWidth / 2){
                    // console.log('可以翻页')
                }else{
                    towards = null;
                    // console.log('回到原来的状态')
                }
                //此处可以扩展轮播的判断条件
                if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
                    towards = null;
                }
                if (this.$children.length < 2) {
                    towards = null;
                }

                this.animateFn(towards, dragState)

                this.dragState = {};//清除本次滑动数据
            },
            translate: function(element, offset, speed, callback){
                if(speed){
                    this.animating = true;
                    element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
                    setTimeout(() => {
                        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
                    }, 50);

                    let called = false;

                    let transitionEndCallback = () => {
                        if (called) return;
                        called = true;
                        this.animating = false;
                        element.style.webkitTransition = '';
                        element.style.webkitTransform = '';
                        if (callback) {
                        callback.apply(this, arguments);
                        }
                    };

                    once(element, 'webkitTransitionEnd', transitionEndCallback);
                    setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
                }else{
                    element.style.webkitTransition = '';
                    element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
                }
            },
            animateFn: function(towards, option){
                let _option = option,
                    speed = this.speed || 300,
                    index = this.index,
                    pages = this.pages,
                    pageCount = pages.length;

                let prevPage, nextPage, dragPage, pageWidth, offsetLeft;
                let element, flag;

                let oldPage = this.$children[index].$el,
                    newIndex;

                prevPage = _option.prevPage;
                dragPage = _option.dragPage;
                nextPage = _option.nextPage;
                pageWidth = _option.pageWidth;
                offsetLeft = _option.offsetLeft;

                if(towards === "prev"){
                    if (index > 0) {
                        newIndex = index - 1;
                    }
                }else if(towards == "next"){
                    if (index < pageCount - 1) {
                        newIndex = index + 1;
                    }
                }

                let callback = () => {
                    if (newIndex !== undefined) {
                        var newPage = this.$children[newIndex].$el;
                        removeClass(oldPage, 'active');
                        addClass(newPage, 'active');

                        this.index = newIndex;
                    }

                    if (prevPage) {
                        prevPage.style.display = '';
                    }

                    if (nextPage) {
                        nextPage.style.display = '';
                    }
                }

                if(towards){
                    element = towards === 'prev'?prevPage : nextPage;
                    flag = towards === 'prev'? 1 : -1;
                    this.translate(element, 0 ,speed);
                    this.translate(dragPage, flag * pageWidth, speed, callback)

                }else{
                    //留在本页
                    this.translate(dragPage, 0, speed, callback);
                    
                    if (typeof offsetLeft !== 'undefined') {
                        if (prevPage && offsetLeft > 0) {
                            this.translate(prevPage, pageWidth * -1, speed);
                        }
                        if (nextPage && offsetLeft < 0) {
                            this.translate(nextPage, pageWidth, speed);
                        }
                    } else {
                        if (prevPage) {
                            this.translate(prevPage, pageWidth * -1, speed);
                        }
                        if (nextPage) {
                            this.translate(nextPage, pageWidth, speed);
                        }
                    }
                }
            }
        },
        mounted(){
            console.log("component is ready")
            this.ready = true;
            this.initPages();

            let element = this.$el;

            element.addEventListener("touchstart", (event) => {
                //箭头函数可以保证当前作用域在父级下
                if (this.animating) return;                
                this.dragging = true;
                this.touchStartAction(event);
            })
            element.addEventListener("touchmove", (event) => {
                if (!this.dragging) return;
                this.touchMoveAction(event)

            })
            element.addEventListener("touchend", (event) => {
                if (this.userScrolling) {
                    this.dragging = false;
                    this.dragState = {};
                    return;
                }
                if (!this.dragging) return;                
                this.dragging = false;
                this.touchEndAction(event);
            })
        }
    }
</script>

<style>
my-swipe,my-swipe-item-wrap{
    overflow: hidden;
    position: relative;
    height: 100%;
}
my-swipe-item-wrap > div {
    position: absolute;
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none;
}
my-swipe-item-wrap > div.active {
    transform: none;
    display: block;
}
</style>