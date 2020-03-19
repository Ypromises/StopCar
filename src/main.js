import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAMap from 'vue-amap'
import $ from 'jquery'

// 引入第三方的组件库 mint ui
// 1.完整引入mint-ui组件库中的所有组件
import MintUI from "mint-ui"
// 2.单独引入mint-ui组件库中的样式文件
import "mint-ui/lib/style.css"
// 3.将mint-ui注册vue实例中
Vue.use(MintUI)
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// //引用popup弹出层
// import { Popup } from 'mint-ui';
// Vue.component(Popup.name, Popup);

// 4.将字体图标引入到当前项目中
import "./font/iconfont.css"
// 5.引入axios第三方ajax模块
import axios from "axios"
// 6.配置axios基础路径
// axios.defaults.baseURL="http://10.1.180.132:8080/"
  //  axios.defaults.baseURL="http://10.1.180.120:8080/"
  //axios.defaults.baseURL="http://10.1.180.140:8080/"
 axios.defaults.baseURL="http://47.94.217.89:8080/"
// 7.配置axios，保存session的信息
axios.defaults.withCredentials=true
// 8.将axios注册在vue实例中
// 由于axios不支持use将实例添加到vue原型
Vue.prototype.axios=axios;

Vue.config.productionTip = false
// 引入vue-amap
// 初始化vue-amap
/* AMap.initAMapApiLoader({
  // 高德的key
  key: '4746a37c6890d066a3194cec26fcb1fd',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
}); */

// 引入高德地图
    // 高德地图组件使用
 /*  import { AMapManager } from 'vue-amap';
    Vue.use(AMapManager)*/

 /* import AMap from 'vue-amap';
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '4746a37c6890d066a3194cec26fcb1fd',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor', 'AMap.Geolocation'],
    uiVersion: '1.0.11'
});*/
    Vue.use(VueAMap);
    VueAMap.initAMapApiLoader({
      key: '4746a37c6890d066a3194cec26fcb1fd',
      plugin: [
      'AMap.Autocomplete', 
      'AMap.PlaceSearch', 
      'AMap.Scale', 
      'AMap.OverView', 
      'AMap.ToolBar',
      'AMap.MapType',
      'AMap.PolyEditor',
      'AMap.CircleEditor',
      'AMap.Geolocation',
      'AMap.Geocoder'],
      uiVersion: '1.0.11',
      v: '1.4.4'
    });
//................
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify); 


//引入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'

import Vuex from "vuex"
Vue.use(Vuex)

var store = new Vuex.Store({
  state:{u_name:"",u_pw:""},
  mutations:{
  //   getUser(state,u_name){//保存修改共享数据函数
  //    localStorage.setItem("getUname",u_name);
  //     // sessionStorage.setItem("getUname", u_name);
  //     state.u_name=u_name;
  //   },
  //   getUpwd(state, u_pw) {
  //     localStorage.setItem("getUpwd", u_pw);
  //     state.u_pw = u_pw;
  // },
  LOGOUT (state){
    // sessionStorage.clear();
    // state.u_name = "";
    // state.u_pw = ""
    localStorage.setItem("u_name","");
    localStorage.setItem("u_pw","")
  },
  },
  getters:{
    getUname(state){
      return state.u_name;
    },
    getUpssword(state){
      return state.u_pw;
    }
  },
  actions:{
    getUser (ctx, u_name) {
      ctx.commit('getUser', u_name)
    },
    getUpwd (ctx, u_pw) {
      ctx.commit(' getUpwd', u_pw)
    }
  }
});

router.beforeEach((to, from, next) => {
  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");
  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){
    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()
  //如果登录标志不存在，即未登录
  }else{
    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.isLogin){
      next({
        path: '/Login4',
      })
    }else{
      next()
    }

  }
 
});
 
router.afterEach(route => {
  window.scroll(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  //store1,
  components: { App },
  template: '<App/>'
})
