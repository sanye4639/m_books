<template>
    <div class="wrap">
        <div class="section">
            <div class="login">
                <input type="hidden" name="sid" value="-jlfcT4pLcKDMWGdK6tas1" />
                <ul class="blist">
                    <li class="item">
                        <div class="item_box">
                            <span class="icons icon_log fl" :style="bg">
                            </span>
                            <span class="item_inp">
                                <input placeholder="请输入用户名" v-model="name" class="t_i" type="text">
                            </span>
                        </div>
                    </li>
                    <li class="item">
                        <div class="item_box">
                            <span class="icons icon_pass" :style="bg">
                            </span>
                            <span class="item_inp">
                                <input placeholder="请输入密码" v-model="password" class="t_i" type="password">
                            </span>
                        </div>
                    </li>
                    <li class="item">
                        <input class="t_b btn_log" value="注册" type="submit" v-on:click="doReg">
                    </li>
                    <li class="item">
                        <router-link :to="{path:'/login'}" class="t_b btn_reg">
                            已有账号点此登陆
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="block">
            <ul class="blist">
                <li class="item">
                    <a href="javascript:void(0)" class="t_b">
                        <i class="icons icon_qq" :style="bg">
                        </i>
                        QQ登录
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                name:'',
                password:'',
                bg:{
                    backgroundImage:'url('+require('@/assets/img/icon_ks.png')+')',
                    backgroundRepeat:'no-repeat',
                },
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'reg'){
                    this.$store.commit('headTitle', '注册');
                }
            }
        },
        mounted:function () {
            this.$store.commit('headTitle', '注册');
        },
        methods : {
            doReg(){
                let _this = this;
                this.$http.post('http://www.sanye666.top/api/doReg',{name:this.name,password:this.password},{emulateJSON: true}).then((response) => {
                    response = response.body;
                    console.log(response);
                    if(response.status === 1){
                        _this.$layer.msg(response.msg);
                        _this.$store.commit('setLogin', response.data.id);
                        _this.$store.commit('setStorage', response.data);
                        // if(_this.$route.query.redirect){
                        //     _this.$router.push({path:_this.$route.query.redirect});
                        // }else{
                            _this.$router.push({path:'/my'});
                        // }
                    }else{
                        _this.$layer.msg(response.msg);
                    }
                },(response)=>{
                    console.log(response);
                });
            }
        },
    }
</script>

<style scoped>
    .section {
        margin:10px 10px;
        padding: 10px;
        background-color: #ffffff;
        border-radius: 5px;
    }
    .blist li, .clist li {
        position: relative;
        /*border-bottom: 1px dashed #dddddd;*/
        padding: 10px 0;
    }
    .item, .blist{
        padding-bottom: 0;
        line-height: 36px;
        border-bottom: 0 none;
        position: relative;
    }
    .item .item_box {
        height: 40px;
        position: relative;
        border: 1px solid #f7f7f7;
        background-color: #f5f5f5;
    }
    .item .item_box .icons {
        width: 40px;
        height: 40px;
        background-color: #eeeeee;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 40px;
    }
    .item .item_inp {
        padding-left: 40px;
    }
    .blist span {
        height: 36px;
        line-height: 36px;
    }
    .t_i {
        height: 40px;
        line-height: 40px;
        padding: 0 2%;
        width: 96%;
        background: none;
        /*font-size: 1em;*/
        color: #666666;
    }
    .item .item_box .t_i {
        padding: 0 4%;
        width: 92%;
    }
    .item .t_b.btn_log, .item .t_b.btn_charge, .formitem .t_b {
        background-color: #e98110;
        border-radius: 20px;
    }
    input[type=button], input[type=submit] {
        cursor: pointer;
        -webkit-appearance: none;
        border-radius: 0;
    }
    .t_b {
        display: inline-block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 1em;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
    }
    input {
        -webkit-transition: box-shadow 0.30s ease-in-out;
        -moz-transition: box-shadow 0.30s ease-in-out;
    }
    input, button, select, textarea {
        outline: none;
    }
    input, textarea, img {
        border: 0 none;
        resize: none;
        font-family: 微软雅黑;
    }
    .item .t_b.btn_reg {
        background-color: #1abc9c;
        border-radius: 20px;
    }
    .blist li a {
        font-size: 1em;
    }
    .block {
        margin: 10px;
        background-color: #dfe1ed;
    }
    .block .item a {
        color: #295278;
    }
    .blist li a {
        font-size: 1em;
    }
    .block .icon_qq {
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        position: relative;
    }
    .icon_qq {
        background-position: 8px -200px;
    }
    .icon_pass {
        background-position: 8px -158px;
    }
    .icon_log {
        background-position: 8px -120px;
    }
    .icons {
        display: block;
    }
</style>