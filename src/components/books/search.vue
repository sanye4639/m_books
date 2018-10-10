<template>
    <div>
        <section id="search" class="bk">
            <input type="button" class="go dise" :style="bg" @click="searchSubmit">
            <input id="s_key" class="bk" type="text" v-model="searchText">
            <div class="bk type" v-show="searchType==='name'" @click="changeSearchType">书名</div>
            <div class="bk type" v-show="searchType==='writer'" @click="changeSearchType">作者</div>
            <div class="cc"></div>
        </section>
        <div class="cc"></div>
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
            <div class="loadMore" v-show="isBookData">
                <i class="i iG iG_D7 iLoadingAnim"></i>
                <a href="javascript:void(0)" class="more">暂无更多书籍</a>
                <span></span>
            </div>
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
                searchText:'',
                searchType : 'name',
                bg:{
                    backgroundImage:'url('+require('@/assets/img/search_icon.png')+')',
                    backgroundRepeat:'no-repeat',
                    backgroundPosition:'center',
                    backgroundSize:'20px 20px',
                },
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'search'){
                    this.$store.commit('headTitle', '搜索');
                }
            }
        },
        mounted:function () {
            this.$store.commit('headTitle', '搜索');
        },
        methods : {
            dataGet (type,param){
                /*请求列表数据*/
                this.$http.post('http://www.sanye666.top/api/search',{type:type,param:param},{emulateJSON: true}).then((response) => {
                    response = response.body;
                    if(response.status === 1){
                        this.bookData = response.data;
                        this.isBookData = true;
                    }else{
                        this.bookData = [];
                        this.isBookData = true;
                    }
                },(response)=>{
                    console.log(response);
                });
            },
            changeSearchType () {
                this.searchType = this.searchType==='name'?'writer':'name';
            },
            searchSubmit (){
                if(this.searchText === ''){
                   this.$layer.alert('请输入搜索内容','确定');
                   return;
                }
                this.dataGet(this.searchType,this.searchText);
            },
        },


    };
</script>

<style scoped>
    #search {
        margin: 20px 40px 0 10px;
        padding: 1px 0 10px;
    }
    input, textarea {
        font-size: 12px;
        font-family: Microsoft YaHei;
    }
    #search .go {
        display: block;
        float: right;
        width: 15%;
        height: 32px;
        border-width: 0px;
        border-radius: 0px 2px 2px 0px;
    }
    /*输入框*/
    #search #s_key {
        display: block;
        float: right;
        width: 55%;
        padding: 0 1%;
        margin-top: 0;
        height: 30px;
        text-align: left;

        border-radius: 2px 0 0 2px;
        border-width: 1px;
        color: #999;
    }
    /*切换*/
    #search .type {
        border-width: 1px;
        border-style: solid;
        float: right;
        width: 18%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        margin-right: 1%;
    }
    .dise {
        background-color: #FCCC03;
    }
    .bk {
        color: #999;
        border-color: #CCC;
    }
    .feedBook .main {
        display: block;
        position: relative;
        top: 60px;
        padding: 8px 10px 6px 65px;
        min-height: 67px;
        background: #fafaf6;
        border: 1px solid #dfdbce;
        border-radius: 5px;
        -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.1);
        -moz-box-shadow: 0 1px 3px rgba(0,0,0,.1);
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
    }
    .loadMore {
        position: relative;
        margin: 75px 0;
        text-align: center;
        font-size: 14px;
        color: #555;
    }
</style>
