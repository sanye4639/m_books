<template>
  <div id="app">
      <v-header></v-header>
      <nav class="tabs navTabs">
          <div class="fixedWrap">
              <ul class="wrap tabWrap">
                  <li class="tab"><router-link to="/"><b>首页</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/typeList', query: {type: 'type'}}"><b>分类</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/typeList', query: {type: 'rank'}}"><b>排行</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/bookList', query: {type: 'over',param: 1}}"><b>连载</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/bookList', query: {type: 'tj',param: 1}}"><b>精品</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/bookList', query: {type: 'tj',param: 2}}"><b>推荐</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/bookList', query: {type: 'tj',param: 3}}"><b>热门</b></router-link></li>
                  <li class="tab"><router-link :to="{path: '/bookList', query: {type: 'over',param: 2}}"><b>完结</b></router-link></li>
              </ul>
          </div>
      </nav>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header';
  import index from './components/books/index';
  import typeList from './components/books/typeList';
  import bookList from './components/books/bookList';
  import detail from './components/books/detail';
  import bookContent from './components/books/bookContent';
  import search from './components/books/search';
  import my from './components/books/my';
  import login from './components/books/login';
  import reg from './components/books/reg';

  export default {
      data () {
          return {

          }
      },
      components : {
          'v-header':header,
          index,
          typeList,
          bookList,
          detail,
          bookContent,
          search,
          my,
          login,
          reg,
      },
      watch: {
          '$route' (to, from) {

          }
      },
      mounted () {
         
      },
      methods: {

      }
  };
</script>

<style>
    .router-link-exact-active b{
        padding: 0 10% 8px;
        border-bottom: 2px solid #7c5c40;
    }
</style>
