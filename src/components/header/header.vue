<template>
    <div>
        <header class="sogou_coop h_min h_fixed">
            <div class="h_min_w ">
                <h1 class="logo_min">
                    <router-link :to="{path:'/my'}">
                        <i class="img">
                            <!--<img src="static/img/user.png"/>-->
                        </i>
                    </router-link>
                </h1>
                <div class="zhong"><b>{{$store.state.headTitle}}</b></div>
                <div class="sogou">
                    <router-link :to="{path:'/search'}" class="toSOGOU">
                        <i class="img"></i>
                    </router-link>
                </div>
            </div>
        </header>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped>
    .zhong {
        position: absolute;
        left: 50px;
        right: 50px;
        top:0;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 40px;
        line-height: 40px;
        color: #505251;
    }
    .zhong b{
        font-family:Microsoft YaHei;
    }

</style>