import Vue from 'vue'
import App from './App.vue'

import './assets/statics/site/css/style.css';
//导入路由
import router from './tools/router'
//导入 store
import store from './tools/store'
import'./tools/libs'

import {
  log
} from 'core-js';

Vue.config.productionTip = false

new Vue({
  // 选择器
  el: "#app",
  // 挂载 路由
  router,
  // 渲染 App组件
  render: h => h(App),
  // 挂载
  store,
  //创建前调用
  beforeCreate() {
    //判断是否登录
    this.axios.get('/site/account/islogin').then(response => {
      //解决刷新页面 store.state.isLogin回到默认值
      store.state.isLogin = response.data.code == 'logined';
    }).catch(error => {

    })
  }

});