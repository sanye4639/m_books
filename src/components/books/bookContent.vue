<template>
    <div :class="{'BackStatusOff':isBackStatus==='off'}">
        <section class="zj">
            <div class="nr_shezhi bk">
                <div class="shezhi1">
                    <div class="tmpc dise">字体</div>
                    <div class="tmpc dise" @click="changeFontSize('b')">大</div>
                    <div class="tmpc dise" @click="changeFontSize('m')">中</div>
                    <div class="tmpc dise" @click="changeFontSize('s')">小</div>
                </div>
                <div class="shezhi2">
                    <div class="tmpc dise" @click="changeBackground('off')" v-show="isBackStatus === 'on'">关灯</div>
                    <div class="tmpc dise" @click="changeBackground('on')" v-show="isBackStatus === 'off'">开灯</div>
                </div>
                <div class="cc"></div>
            </div>
            <div class="nr_page">
                <router-link :to="{name:'bookContent',params:{id:bookContent.id,chapter_id:bookContent.last_chapterId}}" class="tmpc dise" style="width:22%;">上一页</router-link>
                <router-link :to="{name:'detail',query:{id:bookContent.id}}" class="tmpc dise" style="width:22%;">目录</router-link>
                <router-link :to="{name:'bookContent',params:{id:bookContent.id,chapter_id:bookContent.next_chapterId}}" class="tmpc dise" style="width:22%;">下一页</router-link>
                <a class="tmpc dise" style="width:22%;" href="javascript:void(0)">存书签</a>
                <div class="cc"></div>
            </div>
            <article class="nr" v-html="bookContent.content" :class="{'sSize':isFontStatus==='s','mSize':isFontStatus==='m','bSize':isFontStatus==='b'}">
            </article>
            <div class="nr_page">
                <router-link :to="{name:'bookContent',params:{id:bookContent.id,chapter_id:bookContent.last_chapterId}}" class="tmpc dise" style="width:22%;">上一页</router-link>
                <router-link :to="{name:'detail',query:{id:bookContent.id}}" class="tmpc dise" style="width:22%;">目录</router-link>
                <router-link :to="{name:'bookContent',params:{id:bookContent.id,chapter_id:bookContent.next_chapterId}}" class="tmpc dise" style="width:22%;">下一页</router-link>
                <a class="tmpc dise" style="width:22%;" href="javascript:void(0)">存书签</a>
                <div class="cc"></div>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                id : '',
                chapter_id:'',
                bookContent:[],
                isBackStatus:'',
                isFontStatus:'',
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'bookContent'){
                    this.id = to.params.id;
                    this.chapter_id = to.params.chapter_id;
                    if(to.params.chapter_id === 0){
                        this.$router.push({name: 'detail', query: {id: to.params.id}});
                    }else{
                        this.dataGet(to.params.id,to.params.chapter_id);
                    }
                }
            },
        },
        mounted:function () {
            this.id = this.$route.params.id;
            this.chapter_id = this.$route.params.chapter_id;
            this.dataGet(this.id,this.chapter_id);

            /*获取缓存中的样式*/
            this.isBackStatus = localStorage.getItem('isBackStatus')?localStorage.getItem('isBackStatus'):'on';
            this.isFontStatus = localStorage.getItem('isFontStatus')?localStorage.getItem('isFontStatus'):'m';
        },
        methods : {
            dataGet (id,chapter_id){
                if(chapter_id !== 0){
                    /*请求列表数据*/
                    this.$http.post('http://www.sanye666.top/api/bookContent',{id:id,chapter_id:chapter_id},{emulateJSON: true}).then((response) => {
                        response = response.body;
                        if(response.status === 1){
                            this.bookContent = response.data;
                            /*设置vuex公共title*/
                            this.$store.commit('headTitle', response.data.title);
                        }
                    },(response)=>{
                        console.log(response);
                    });
                }
            },
            changeBackground (backStatus) {
                 this.isBackStatus = backStatus;
                localStorage.setItem('isBackStatus',backStatus);
            },
            changeFontSize (fontStatus) {
                this.isFontStatus = fontStatus;
                localStorage.setItem('isFontStatus',fontStatus);
            },
        },
    };
</script>

<style scoped>
    body {
        color: #666;
        font: 14px/1.5 'microsoft yahei';
    }
    .zj {
        padding: 2%;
    }
    .nr_shezhi {
        padding-bottom: 10px;
        font-size: 12px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }
    /*字体按钮*/
    .nr_shezhi .shezhi1 div {
        float: left;
        padding: 1% 2%;
        margin-left: 1%;
        color: #fff;
        border-radius: 2px;
    }
    /*开灯关灯按钮*/
    .nr_shezhi .shezhi2 div {
        float: right;
        padding: 1% 2%;
        margin-right: 1%;
        color: #fff;
        border-radius: 2px;
    }
    /*按钮颜色*/
    .dise {
        background-color: #1ABC9C;
    }
    /*上一页 下一页 目录 样式*/
    .nr_page {
        margin-bottom: 10px;
    }
    .nr_page a {
        display: block;
        float: left;
        color: #fff;
        width: 31%;
        text-align: center;
        padding: 5px 0;
        margin-left: 2%;
        margin-top: 10px;
        border-radius: 2px;
    }
    /*文章内容*/
    .nr {
        margin: 10px 0;
        position: relative;
    }
    .sSize{
        font-size: 14px;
    }
    .mSize{
        font-size: 17px;
    }
    .bSize{
        font-size: 19px;
    }
    /*背景颜色*/
    .BackStatusOff{
        background: #333;
        color: #fff;
    }
    .cc {
        height: 0;
        clear: both;
    }
</style>