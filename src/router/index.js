import Vue from 'vue'
import Router from 'vue-router'
import Vant from "vant"
Vue.use(Vant)
//import HelloWorld from '@/components/HelloWorld'
//#为组件指定访问路径
//1.在router.js引入组件
import Home from "../components/order/Home.vue"
import Order from "../components/order/common/Order.vue"
// import Near from "../components/order/common/Near.vue"
import Cutdown from "../components/order/common/Cutdown.vue"
import Money from "../components/order/common/Money.vue"
//个人中心

import Login4 from "../components/park/common/Login.vue"
import Reg from "../components/park/common/Reg.vue"
import Help from "../components/park/common/Help.vue"
import History from "../components/park/common/History.vue"
import Set from "../components/park/common/Seting_up.vue"
import myCar from '../components/park/common/myCar.vue'
import  addCar from '../components/park/common/addCar.vue'
import Picture_upload from '../components/park/common/Picture_upload.vue'
import Change from '../components/park/common/Change.vue'
import Min from '../components/park/common/Min.vue'
import Update from '../components/park/common/Update.vue'
import UpdateInfo from "../components/park/common/UpdateInfo.vue"
import Updatepwd from "../components/park/common/Updatepwd.vue"
import Update_phone from "../components/park/common/Update_phone.vue"
import Info from "../components/park/common/Info.vue"

//首页
import  myMap from '../components/fist-page/common/myMap'

Vue.use(Router)

export default new Router({
  routes: [
   // { path: '/',name: 'HelloWorld', component: HelloWorld },
   {
     path:'/Near',
     name:'Near',
     component:reslove => require(['../components/order/common/Near.vue'],reslove)
   },
   {
    path:'/',
    name:'Home',
    component:reslove => require(['../components/order/Home.vue'],reslove)
  },
    // {path:'/Near',component:Near},
    {path:'/Order',component:Order},
    {path:'/cutdown',component:Cutdown,meta:{
      isLogin:true
    }},
    {path:'/money',component:Money},

    //个人中心
    {path:'/Login4',component:Login4},
    {path:'/Reg',component:Reg},
    {path:'/Help',component:Help},
    {path:'/History',component:History},
    {path:'/Set',component:Set},
    {path:'/myCar',component:myCar},
    {path:'/addCar',component:addCar},
    {path:'/Picture_upload',component:Picture_upload},
    {path:'/Change',component:Change},
    {path:'/Min',component:Min},
    {path:'/Update',component:Update},
    {path:'/UpdateInfo',component:UpdateInfo},
    {path:'/Updatepwd',component:Updatepwd},
    {path:'/Update_phone',component:Update_phone},
    {path:'/Info',component:Info},

    //首页定位
    {path:'/myMap',component:myMap},


  ]
})
