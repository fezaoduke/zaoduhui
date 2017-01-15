<template>
    <div class="loading_box">
        <span class="loading" :class="{hide : !visible}">
            <i class="icon_load"></i>
            加载中......
        </span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props: {
            "visible": {
                type: Boolean,
                required: true
            }
        }
    }
</script>
<style>
.loading_box{
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: center;
    /*padding: 15px 0px;*/
    font-size: 14px;
    color: #9b9b9b;
}
/*.loading_box.hide{
    display: none;
}*/
.loading{
    position: absolute;
    top: 50%;
    left:50%;
    text-align:center;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.icon_load {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    vertical-align: middle;
    background: url("../../../img/ico_loading.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 10px;
}

.icon_load {
    -webkit-transform: rotate(0deg) translateZ(0);
    -webkit-transition-duration: 0ms;
    -webkit-animation-name: ico_loading;
    -webkit-animation-duration: 1.5s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
}

@-webkit-keyframes ico_loading {
    from {
        -webkit-transform: rotate(0deg) translateZ(0);
    }
    to {
        -webkit-transform: rotate(360deg) translateZ(0);
    }
}
</style>