<template>
    <div>
        <div class="categoryList">
            <!--<h4>分类</h4>-->
            <div class="wrap categoryWrap">
                <div class="category" v-for="item in typeList" v-show="viewType === 'type'">
                    <router-link :to="{name: 'bookList', query: {type: 'type',param: item.id}}" class="main">
                        <div class="name">{{item.name}}</div>
                        <div class="toDetail"><i class="i iG iG_B1"></i></div>
                    </router-link>
                </div>
                <div class="category" v-for="item in rankList" v-show="viewType === 'rank'">
                    <router-link :to="{name: 'bookList', query: {type: 'rank',param: item.id}}" class="main">
                        <div class="name">{{item.name}}</div>
                        <div class="toDetail"><i class="i iG iG_B1"></i></div>
                    </router-link>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data () {
            return {
                'headTitle':'',
                'viewType' :'',
                'rankList' : [],
                'typeList' : [],
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'typeList'){
                    this.viewType = to.query.type;
                    this.getHeadTitle(to.query.type);
                }
            },
        },
        mounted:function () {
            this.rankList = this.$common.get_bookType('rank',0);
            this.typeList = this.$common.get_bookType('type',0);
            this.viewType = this.$route.query.type;
            this.getHeadTitle(this.$route.query.type);
        },
        methods:{
            getHeadTitle (type){
                /*设置vuex公共title*/
                if (type === 'type'){
                    this.$store.commit('headTitle', '分类');
                }else if(type === 'rank'){
                    this.$store.commit('headTitle', '排行');
                }
            }
        }
    };
</script>

<style>
</style>
