import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index组件
import index from './components/index.vue'
// 导入ui框架
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
//导入axios
import axios from "axios";
import moment from "moment";
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

// 引入css
import './assets/statics/site/css/style.css';

Vue.config.productionTip = false

new Vue({
  // 选择器
  el: "#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App)
})