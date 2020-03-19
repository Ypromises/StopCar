<template>
  <div class="page-tabbar">
    <div class="page-all">
    <!-- 3.nearlist -->
    <mt-tab-container class="page-tabbar-container " v-model="active" >
      <mt-tab-container-item id="shouye">
        <mymap></mymap>
      </mt-tab-container-item>
      <mt-tab-container-item id="fujin" >
        <near></near>
      </mt-tab-container-item>
      <mt-tab-container-item id="geren">
        <person></person>
      </mt-tab-container-item>
    </mt-tab-container>
    <!--4:tabbar列表-->
    <!--为每个按钮绑定点击事件-->
    <!--当前按钮isSelect:true-->
    <!--其它按钮isSelect:false-->
    <mt-tabbar v-model="active" fixed  v-show="hideshow"> 
      <mt-tab-item id="shouye" @click.native="changeState(0)">
        <tabbaricon
        :selectedImage="require('../../assets/ic_shouye_selected.png')"
        :normalImage="require('../../assets/ic_shouye.png')"
        :focused="currentIndex[0].isSelect">
        </tabbaricon>
        首页
      </mt-tab-item>
      <mt-tab-item id="fujin" @click.native="changeState(1)" >
        <tabbaricon  
        :normalImage="require('../../assets/ic_fujin.png')"
        :selectedImage="require('../../assets/ic_fujin_selected.png')"
        :focused="currentIndex[1].isSelect">
        </tabbaricon>
        附近
      </mt-tab-item>
      <mt-tab-item id="geren" @click.native="changeState(2)">
        <tabbaricon
        :normalImage="require('../../assets/ic_geren.png')"
        :selectedImage="require('../../assets/ic_geren_selected.png')"
        :focused="currentIndex[2].isSelect">
        </tabbaricon>
        我的
      </mt-tab-item>
    </mt-tabbar>
    </div>
  </div>
</template>
<script>
import Near from "./common/Near.vue"
import TabBarIcon from "./common/TabBarIcon.vue"
import Person from "../park/common/Person.vue"
import myMap from "../fist-page/common/myMap"
var changestate=localStorage.getItem('changestate')
export default {
  data(){
   
    return {
      active: localStorage.getItem('changestate')     
      ,
      currentIndex:[
        {isSelect:localStorage.getItem('changestate')=="shouye"?true:false},
        {isSelect:localStorage.getItem('changestate')=="fujin"?true:false},
        {isSelect:localStorage.getItem('changestate')=="geren"?true:false}
      ],
       docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
	    showHeight: document.documentElement.clientHeight,   //实时屏幕高度
	    hideshow:true,  //显示或者隐藏footer

      
    }
  },
  methods:{
    changeState(n){
      //函数功能:将当前参数下标
      //对应数组值修改true其它修改false
      //1:创建循环,循环数组中内容
      for(var i=0;i<this.currentIndex.length;i++){
        //2:判断如果循环下标与n相等 20
        if(n==i){
          //3:当前下标元素true
          this.currentIndex[i].isSelect=true;
          if(n==1){
              //发送axios请求
            var url = "lots/distance"
            var longitude=localStorage.getItem("longitude");
            var latitude=localStorage.getItem("latitude");
          //  console.log(longitude)
           // console.log(latitude)
            var obj={longitude:longitude,latitude:latitude};
           this.axios.get(url,{params:obj}).then(res=>{
               //  console.log(res);
                var state = res.data.state
                //console.log(state);
                if(state==2000){
               //   console.log("发送成功")
                }else{
                  console.log("发送失败")
                }
             })
          }
        }else{
          //4:其它元素修改false
          this.currentIndex[i].isSelect=false;
        }
      }
     // console.log(localStorage.getItem("r_lng"))
     // console.log(localStorage.getItem("r_lat"))
    },
  
    
  },
  components:{
    "near":Near,
    "tabbaricon":TabBarIcon,
    "person":Person,
    "mymap":myMap
  },
  mounted() {
  // window.onresize监听页面高度的变化
  window.onresize = ()=>{
    return(()=>{
      this.showHeight = document.body.clientHeight;
    })()
  }
},
//监听
watch:{
  showHeight:function() {
    if(this.docmHeight > this.showHeight){
      this.hidshow=false
    }else{
      this.hidshow=true
    }
  }
},

}


</script>
<style scoped>
  .page-tabbar{
    overflow:hidden;/*溢出隐藏*/
  }
  .page-all{
    position: relative;
  }
  /*修改 tabbar 默认文字颜色*/
  .mint-tabbar>.mint-tab-item{
    color:#999999;
  }
  /*修改默认tab选中文字样式*/
  .mint-tabbar>.mint-tab-item.is-selected{
    background-color:transparent;
    color:rgb(126,206,244);
  }
  .mint-tabbar.is-fixed {
    position: flex;
    margin-bottom: 0;
  }
  .mint-tab-container{
    position: relative;
    padding-bottom: 60px;
  }
</style>
