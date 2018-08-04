import Vue from 'vue'
// 导入ui框架
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
//引入iview框架
import iView from 'iview';
import 'iview/dist/styles/iview.css'
// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
// 使用ui中间件
Vue.use(ElementUI);
// 使用懒加载中间件
Vue.use(VueLazyload, {
  loading: require('../assets/statics/lib/images/01.gif')
});


// 注册
Vue.filter('cuttime', function (value,myFormat) {
    if(myFormat){
      return moment(value).format(myFormat);
    }
      return moment(value).format("YYYY-MM-DD");
  
  });
// 使用路由中间件
Vue.use(iView);