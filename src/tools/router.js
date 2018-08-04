
import Vue from 'vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index组件
import index from '../components/index.vue'
import buyCar from '../components/buyCar.vue'
import payOrder from '../components/payOrder.vue'
import login from '../components/login.vue'
import orderinfo from '../components/orderInfo.vue'
import paySuccess from '../components/paySuccess.vue'
import personageCenter from '../components/personageCenter.vue'
import buyCenter from '../components/buyCenter.vue'
import lookOrder from '../components/lookOrder.vue'
// 引入goodsinfo组件
import goodsinfo from '../components/goodsinfo.vue'

import store from './store'

//导入axios
import axios from "axios";
//给全局axios默认值每个请求的配置默认值
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
axios.defaults.withCredentials=true;
//把axios对象放入vue的原型中 公用
Vue.prototype.axios = axios;
// 使用路由中间件
Vue.use(VueRouter);
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
      },
    
    ]
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
        //    console.log(response);
        //    console.log(store.state.isLogin);
           
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

  export default router; //export default
  