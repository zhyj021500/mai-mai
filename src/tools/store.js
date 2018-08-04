import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
//使用路由中间件
Vue.use(Vuex);
// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList'))||{};
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

  // 注册一些逻辑
window.onbeforeunload = function () {
    // alert('onbeforeunload');
    // window.localStorage.setItem('onbeforeunload',123);
    window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
  }

  export default store;