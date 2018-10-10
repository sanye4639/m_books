<template>
    <div>
        <div class="stream bookList">
            <div class="wrap streamWrap">
                <div class="recommendList">
                    <div class="wrap">
                        <!--本站推荐-start-->
                        <div class="feed feedBook_recommend recommendBoy">
                            <div class="main">
                                <div class="topic">
                                    <h3>本站推荐</h3>
                                </div>
                                <ul class="books">
                                    <li class="book" v-for="(item,index) in bookData.recommend" v-show="index <= 2">
                                        <router-link :to="{name: 'detail', query: {id: item.id}}">
                                            <img v-bind:src="item.pic">
                                            <span>{{item.name}}</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--本站推荐-end-->
                    </div>
                </div>
                <div class="feed feedBook" v-for="(item,index) in bookData.recommend" v-show="index >= 3">
                    <router-link :to="{name: 'detail', query: {id: item.id}}" class="main">
                        <h4>{{item.name}}</h4>
                        <div class="cover">
                            <div class="img"><img v-bind:src="item.pic"/></div>
                        </div>
                        <div class="info">{{item.writer}} | {{item.type}} | {{item.over}}</div>

                        <div class="desc">{{item.intro}}</div>
                        <div class="sign"><i class="i i_iHigh"></i></div>
                    </router-link>
                </div>

                <div v-for="(items,key) in bookData.home_zone">
                    <div class="feed feedBook feedBook_list">
                        <a href="javascript:void(0)" class="main">
                            <div class="image"><img v-bind:src="items.pic"></div>
                            <p>{{items.title}}</p>
                        </a>
                    </div>
                    <div class="feed feedBook" v-for="(item,index) in items.datas">
                        <router-link :to="{name: 'detail', query: {id: item.id}}" class="main">
                            <h4>{{item.name}}</h4>
                            <div class="cover">
                                <div class="img"><img v-bind:src="item.pic"/></div>
                            </div>
                            <div class="info">{{item.writer}} | {{item.type}} | {{item.over}}</div>

                            <div class="desc">{{item.intro}}</div>
                            <div class="sign"><i class="i i_iHigh"></i></div>
                        </router-link>
                    </div>
                </div>
                <!--<div class="feed feedBook feedBook_list">
                    <a href="javascript:void(0)" class="main">
                        <div class="image"><img src="http://s7.rr.itc.cn/org/wapChange/20167_5_10/b0l04b9539090666538.jpg" alt=""></div>
                        <p>只要有机会，一定可以改写命运。
                        </p>
                    </a>
                </div>
                <div class="feed feedBook">
                    <router-link :to="{name: 'detail', query: {id: item.id}}" class="main" v-for="(item,index) in bookData.home_zone" v-show="index >= 3">
                        <h4>{{item.name}}</h4>
                        <div class="cover">
                            <div class="img"><img v-bind:src="item.pic"/></div>
                        </div>
                        <div class="info">{{item.writer}} | {{item.type}} | {{item.over}}</div>

                        <div class="desc">{{item.intro}}</div>
                        <div class="sign"><i class="i i_iHigh"></i></div>
                    </router-link>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                bookData:{},
            }
        },
        watch :{
           '$route' (to,form){
               if(to.name === 'index'){
                   this.$store.commit('headTitle', '首页');
                   this.dataGet();
               }
           }
        },
        mounted:function () {
            this.$store.commit('headTitle', '首页');
            this.dataGet();
        },
        methods : {
            dataGet (){
                /*请求首页数据*/
                this.$http.post('http://www.sanye666.top/api/index',{},{emulateJSON: true}).then((response) => {
                    response = response.body;
                    if(response.status === 1){
                        this.bookData = response.data;
                    }
                },(response)=>{
                    console.log(response);
                });
            },
        },
    }
</script>

<style>

</style>