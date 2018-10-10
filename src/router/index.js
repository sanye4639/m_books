import Vue from 'vue';
import Router from 'vue-router';
import App from  '@/App.vue';

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          component: App.components.index,
          name: 'index'
      },  {
          path: '/typeList',
          component: App.components.typeList,
          name: 'typeList',
          children: [
              {
                  path: 'bookList',
                  component: App.components.bookList,
                  name: 'bookList'
              }
          ]
      },  {
          path: '/bookList',
          component: App.components.bookList,
          name: 'bookList'
      },  {
          path: '/detail',
          component: App.components.detail,
          name: 'detail'
      },  {
          path: '/bookContent/:id/:chapter_id',
          component: App.components.bookContent,
          name: 'bookContent'
      },  {
          path: '/search',
          component: App.components.search,
          name: 'search'
      },  {
          path: '/my',
          component: App.components.my,
          name: 'my',
          meta: {
              auth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
      },  {
          path: '/login',
          component: App.components.login,
          name: 'login',
      },  {
          path: '/reg',
          component: App.components.reg,
          name: 'reg',
      }
  ]
});
