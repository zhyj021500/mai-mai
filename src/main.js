import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index组件
import index from './components/index.vue'
import buyCar from './components/buyCar.vue'
import payOrder from './components/payOrder.vue'
import login from './components/login.vue'
import orderinfo from './components/orderInfo.vue'
import paySuccess from './components/paySuccess.vue'
import personageCenter from './components/personageCenter.vue'
import buyCenter from './components/buyCenter.vue'
import lookOrder from './components/lookOrder.vue'
// 引入csslookOrder
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
//让ajax携带cookie
axios.defaults.withCredentials=true;
//把axios对象放入vue的原型中 公用
Vue.prototype.axios = axios;
// 注册
Vue.filter('cuttime', function (value,myFormat) {
  if(myFormat){
    return moment(value).format(myFormat);
  }
    return moment(value).format("YYYY-MM-DD");

});

// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入goodsinfo组件
import goodsinfo from './components/goodsinfo.vue'
import { log } from 'core-js';

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
    },
    {
      path:'/buyCar',
      component: buyCar,
      meta: { changelogin: true }
    },
    {
      path:'/payOrder/:ids',
      component: payOrder,
     // 路由元信息
      meta: { changelogin: true }
    },
    {
      path:'/login',
      component: login
    },
    {
      path:'/orderinfo/:orderid',
      component: orderinfo,
      //路由元信息
      meta: { changelogin: true }
    },
    {
      path:'/paySuccess',
      component: paySuccess,
      //路由元信息
      meta: { changelogin: true }
    },
    {
      path:'/personageCenter',
      component: personageCenter,
      //路由元信息
      meta: { changelogin: true }
    },
    //交易订单
    {
      path:'/buyCenter',
      component: buyCenter,
      //路由元信息
      meta: { changelogin: true }
    },
    //查看订单
    {
      path:'/lookOrder/:orderId',
      component: lookOrder,
      //路由元信息
      meta: { changelogin: true }
    }
  ]
});


// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList'))||{};

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //购物车数据
   buyList,
   //登录状态
   isLogin:false,
   // 来的路由
   fromPath:''
  },
  mutations: {
   buyGoods(state,info){
    if (state.buyList[info.goodId]) {
      // 解决字符串累加问题
      let oldNum = parseInt(state.buyList[info.goodId]);
      oldNum += parseInt(info.goodNum);
      // 重新赋值
      state.buyList[info.goodId] = oldNum;
    } else {
      // 没有 直接赋值这种方法 vue不会跟踪属性
      // state.buyList[info.goodId]=info.goodNum;
      // 需要使用 Vue.set(obj, 'newProp', 123) 替代
      Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
    }
    
   },
    // 直接更新 某个id对应的数值
   changeCount(state,info){
    state.buyList[info.goodId] = info.goodNum;
   },
   //删除某个id对应的数值
   delGoodById(state,id){
     // 告诉Vue我已经删除了这个属性
     Vue.delete(state.buyList,id);
   },
   //修改登录状态
   changeLogin(state,isLogin){
     state.isLogin = isLogin;
   },
    // 修改来时的路由
    rememberFromPath(state,path){
      state.fromPath = path;
    }

  },
  getters:{
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  }
});
//路由守卫
router.beforeEach((to, from, next) => {
 // console.log(from);
  // 保存数据
  store.commit('rememberFromPath',from.path);
  // 去订单支付页
   if(to.meta.changelogin){
     axios.get('/site/account/islogin')
     .then(response=>{
        console.log(response);
        console.log(store.state.isLogin);
        
        if(response.data.code == "nologin"){
         next('/login');
        }else{
          next();
        }
     })
     .catch(error=>{

     })
   }else{
     next();
   }
});
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
beforeCreate(){
  //判断是否登录
  axios.get('/site/account/islogin').then(response=>{
    //解决刷新页面 store.state.isLogin回到默认值
    store.state.isLogin = response.data.code == 'logined';
  }).catch(error=>{

  })
}
  
});
// 注册一些逻辑
window.onbeforeunload = function () {
  // alert('onbeforeunload');
  // window.localStorage.setItem('onbeforeunload',123);
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
}

