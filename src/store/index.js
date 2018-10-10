import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        headTitle:'',
        isLogin:0,
        user:null,
    },
    getters: {
        getStorage: function (state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem('user'))
                state.isLogin = localStorage.getItem('isLogin')
            }
            return state.user
        }
    },
    mutations: {
        headTitle(state,value) {
            state.headTitle = value;
        },
        setLogin(state,value) {
            state.isLogin = value;
            localStorage.setItem('isLogin', value)
        },
        setStorage (state, value) {
            state.user = value
            localStorage.setItem('user', JSON.stringify(value))
        },
        removeStorage (state) {
            state.user = null
            localStorage.removeItem('user')
        }
    }
});