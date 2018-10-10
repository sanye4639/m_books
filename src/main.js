// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import store from './store'
import layer from 'vue-layer'
import common from '@/assets/js/common.js'
import md5 from 'js-md5';

router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.prototype.$layer = layer(Vue);

Vue.prototype.$common = common

Vue.prototype.$md5 = md5;


router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth)) {
        if (window.localStorage.isLogin > '0') {
            next()
        } else if (to.path !== '/') {
            next({
                path: '/login',
                query:{redirect: to.fullPath}
            })
            // Vue.prototype.$message.warning('检测到您还未登录,请登录后操作！')
        }
    } else {
        next()
    }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  VueResource,
  store,
  components: { App },
  template: '<App/>'
});
