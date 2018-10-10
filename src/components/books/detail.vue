<template>
    <div class="book-detail">
        <div class="default-box">
            <div class="summary">
                <div class="cover">
                    <img v-bind:src="bookData.pic" />
                </div>
                <div class="info">
                    <h2>{{bookData.name}}</h2>
                    <p>作者 ：<router-link :to="{path:'/search',query:{type:'writer',param:bookData.writer}}">{{bookData.writer}}</router-link></p>
                    <p>类型 ：<router-link :to="{path:'/bookList',query:{type:'type',param:bookData.type}}">{{bookData.typeCn}}</router-link></p>
                    <p>状态 ：<router-link :to="{path:'/bookList',query:{type:'over',param:bookData.over}}">{{bookData.overCn}}</router-link></p>
                    <p>更新时间 ：{{bookData.updated_at}}</p>
                </div>
            </div>

            <div class="ablum_read">
                <span class="margin_right">
                    <router-link :to="{name:'bookContent',params:{id:bookData.id,chapter_id:bookData.first_chapter_id}}">开始阅读</router-link>
                </span>
                <span>
                    <a href="javascript:void (0)">加入书架</a>
                </span>
            </div>

            <div class="intro">
                <a href="javascript:void(0)" class="">
                    <span>{{bookData.intro}}</span>
                </a>
            </div>
        </div>
        <ul class="list-box catalog">
            <li class="addon">最新章节</li>
            <li v-bind:data-chapter-id="item.id" v-bind:data-chapter-index="index+1" class="addon" v-for="(item, index) in bookData.new_chapterList">
                <router-link :to="{name:'bookContent',params:{id:bookData.id,chapter_id:item.id}}">{{item.title}}
                    <span class="aR">
                        <i class="i iG iG_B1"></i>
                    </span>
                </router-link>
            </li>
        </ul>
        <a href="javascript:void(0)" class="btn btnA btnBlock"><i class="i iG iG_F7"></i>正文开始</a>
        <ul class="list-box catalog">
            <li class="addon">目录
                <a href="javascript:void(0)" @click="chapterSort(bookData.id,bookData.orderBy)" class="aR">
                    <i class="i iG iG_C6"></i>
                </a>
            </li>

            <li v-bind:data-chapter-id="item.id" v-bind:data-chapter-index="index+1" class="addon" v-for="(item, index) in bookData.chapterList">
                <router-link :to="{name:'bookContent',params:{id:bookData.id,chapter_id:item.id}}">{{item.title}}
                    <span class="aR">
                        <i class="i iG iG_B1"></i>
                    </span>
                </router-link>
            </li>
            <li class="pager">
                <a href="javascript:void(0)" @click="dataGet(bookData.id,bookData.lastPage,orderBy)" class="btn btnB btnBlock">上一页</a>
                <div class="select-wrap btn btnB">
                    <select class="btnB" v-model="bookData.thisPage" @change="getSelectData">
                        <option :value="index" v-for="index in bookData.total_page">{{index}}/{{bookData.total_page}}</option>
                    </select>
                </div>
                <a href="javascript:void(0)" @click="dataGet(bookData.id,bookData.nextPage,orderBy)" class="btn btnB btnBlock">下一页</a>
            </li>
        </ul>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
               id : '',
               bookData:'',
               page:'',
               orderBy:'',
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'detail' && Number(this.id) !== Number(to.query.id)){
                    this.id = to.query.id;
                    this.page = 1;
                    this.dataGet(to.query.id,this.page,this.orderBy);
                }
            },
        },
        mounted:function () {
            this.id = this.$route.query.id;
            this.page = this.$route.query.page?this.$route.query.page:1;
            this.orderBy = this.$route.query.orderBy?this.$route.query.orderBy:1;
            this.dataGet(this.id,this.page,this.orderBy);
        },
        methods : {
            dataGet (id,page,orderBy){
                /*请求列表数据*/
                this.$http.post('http://www.sanye666.top/api/detail',{id:id,page:page,orderBy:orderBy},{emulateJSON: true}).then((response) => {
                    response = response.body;
                    if(response.status === 1){
                        this.bookData = response.data;
                        /*设置vuex公共title*/
                        this.$store.commit('headTitle', response.data.name);
                    }
                },(response)=>{
                    console.log(response);
                });
            },
            chapterSort : function(id,orderBy){
                this.orderBy = (orderBy==='1')?2:1;
                this.dataGet(id,1,this.orderBy);
            },
            getSelectData :function (obj) {
                this.page = obj.target.value;
                this.dataGet(this.id,obj.target.value,this.orderBy);
            },
        },
    };
</script>

<style scoped>
    .ablum_read {
        height: auto;
        padding: 5px 0 5px 0;
        overflow: hidden;
        border-bottom: 1px solid #e1e1dd;
    }
    .ablum_read span {
        background: #1ABC9C;
        border-radius: 3px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 45%;
        float: left;
        margin: 0 2%;
    }
    .ablum_read span a {
        color: #fff;
        display: block;
        line-height: 40px;
    }
</style>