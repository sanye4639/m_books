<template>
    <div class="stream bookList">
        <div class="wrap streamWrap">
            <div class="feed feedBook">
                <router-link :to="{name: 'detail', query: {id: item.id}}" class="main" v-for="(item, index) in bookData" :key="index">
                    <h4>{{item.name}}</h4>
                    <div class="cover">
                        <div class="img"><img v-bind:data-src="item.pic" v-bind:src="item.pic" alt=""/></div>
                    </div>
                    <div class="info">{{item.writer}} | {{item.type}} | {{item.over}}</div>

                    <div class="desc">{{item.intro}}</div>
                </router-link>
            </div>
        </div>
        <!--<div class="loadMore" v-show="isBookData">
            <i class="i iG iG_D7 iLoadingAnim"></i>
            <a href="javascript:void(0)" class="more">暂无更多数据</a>
        </div>-->
        <div class="loadMore" v-show="isBookData">
            <i class="i iG iG_D7 iLoadingAnim"></i>
            <a href="javascript:void(0)" class="more">暂无更多数据</a>
            <span></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                type : '',
                param : '',
                bookData : [],
                isBookData : false,
                page : 1,
                scrollTop:'',
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'bookList'){
                    this.type = to.query.type;
                    this.param = to.query.param;
                    this.page = 1;
                    this.getHeadTitle(to.query.type,to.query.param);
                    this.dataGet(to.query.type,to.query.param,1);
                }
            }
        },
        mounted:function () {
            this.type = this.$route.query.type;
            this.param = this.$route.query.param;
            this.getHeadTitle(this.type,this.param);
            // 缓存指针
            let _this = this;
            // 设置一个开关来避免重负请求数据
            let sw = true;
            /*请求列表数据*/
            this.dataGet(this.type,this.param,this.page);
            // 注册scroll事件并监听
            window.addEventListener('scroll',function(){
                // 判断是否滚动到底部
                /* 页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement
                   页面没有DTD，即没指定DOCTYPE时，使用document.body    */
                var scrollTop = document.documentElement.scrollTop ||  document.body.scrollTop;
                if(scrollTop + window.innerHeight >= document.body.offsetHeight) {
                    // 如果开关打开则加载数据
                    if(sw === true){
                        _this.page++;
                        // 将开关关闭
                        sw = false;
                        _this.$http.post('http://www.sanye666.top/api/bookList',{type:_this.type,param:_this.param,page:_this.page},{emulateJSON: true}).then((response) => {
                            response = response.body;
                            if(response.status === 1){
                                for (let i = 0; i < response.data.length; i++) {
                                    _this.bookData.push(response.data[i]);
                                }
                                if(response.data.length< 10){
                                    _this.isBookData = true;
                                }else{
                                    _this.isBookData = false;
                                }
                            }else{
                                _this.isBookData = true;
                            }
                            // 数据更新完毕，将开关打开
                            sw = true;
                        },(response)=>{
                            console.log(response);
                        });
                    }
                }
            });
        },
        methods : {
            dataGet (type,param,page){
                /*请求列表数据*/
                this.$http.post('http://www.sanye666.top/api/bookList',{type:type,param:param,page:page},{emulateJSON: true}).then((response) => {
                    response = response.body;
                    if(response.status === 1){
                        this.bookData = response.data;
                        if(this.bookData.length< 10){
                            this.isBookData = true;
                        }else{
                            this.isBookData = false;
                        }
                    }else{
                        this.bookData = [];
                        this.isBookData = true;
                    }
                },(response)=>{
                    console.log(response);
                });
            },
            getHeadTitle (type,param){
                let headTitle = '';
                headTitle = this.$common.get_bookType(type,Number(param));
                /*设置vuex公共title*/
                this.$store.commit('headTitle', headTitle);
            }
        },
    };
</script>

<style>
</style>
