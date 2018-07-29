import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index组件
import index from './components/index.vue'
// 引入css
import './assets/statics/site/css/style.css';
// 导入ui框架
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
//导入axios
import axios from "axios";
import moment from "moment";
//引入iview框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//导入vuex
import Vuex from 'vuex'


//给全局axios默认值每个请求的配置默认值
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//把axios对象放入vue的原型中 公用
Vue.prototype.axios = axios;
// 注册
Vue.filter('cuttime', function (value) {
  
    return moment(value).format("YYYY-MM-DD");

});

// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入goodsinfo组件
import goodsinfo from './components/goodsinfo.vue'

// 使用路由中间件
Vue.use(VueRouter);
// 使用ui中间件
Vue.use(ElementUI);
// 使用懒加载中间件
Vue.use(VueLazyload, {
  loading: require('./assets/statics/lib/images/01.gif')
});
// 使用路由中间件
Vue.use(iView);
//使用路由中间件
Vue.use(Vuex);

// 注册路由规则
const router = new VueRouter({
  routes: [{

      path: '/',
      redirect: '/index' //重定向
    },
    {
      path: '/index',
      component: index
    },
    {
      path: "/goodsinfo/:id",
      component: goodsinfo
    }
  ]
})

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state,num) {
      state.count+=num
    }
  }
})

Vue.config.productionTip = false

new Vue({
  // 选择器
  el: "#app",
  // 挂载 路由
  router,
  // 渲染 App组件
  render: h => h(App),
  // 挂载
  store
})