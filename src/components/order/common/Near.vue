<template>
  <div>
    <div class="page-head">
      <input class="sou" placeholder="请输入您要搜索的内容" type="text" v-model="keyword" id="search" v-on:input ="inputFunc">
       <!-- @blur="animateWidth('search_value','blur')" @focus="animateWidth('search_value','focus')" -->
        <img  @click="search_cancel" class="searchImg" v-if="!showNear" src="../../../assets/cancel.png" >
         <span class="cancel" @click="closeSearch" v-show="showsearch">取消</span>
        
    </div>
    <div class="searchList" v-show="!showNear">
      <div  class="content">
        <ul >
            <!-- <span class="poi-name">{{item.name}}</span>
            <span class=" poi-address">{{item.location}}</span> -->
             <div class="rootstyle" v-for="(item,i) of list1" >
             <div class="leftstyle" @click="Order(item.lotId,item.name,item.location,item.price,item.lotPhone)" > 
             <div class="item" ><h3>名称：{{item.name}}</h3></div>
             <div class="item" >
              <img src="../../../assets/ic_location.png" alt="">
              <h3 class="location">地址：{{item.location}}</h3>
            </div>
             <div class="item" >
             <h3>距您{{item.distance}}m&nbsp;|&nbsp;剩余：{{item.empty}}&nbsp;|&nbsp;收费：{{item.price}}/h</h3>
              </div>
             </div>
              <div class="rightstyle" @click="Order(item.lotId,item.name,item.location,item.price,item.lotPhone)">
               <a href="#"><img src="../../../assets/ic_goto.png" alt="">
               <div class="goto">预约</div></a>
             </div>
             </div>
        </ul>
         <div class="empty">
          试试搜索其他？
        </div> 
        </div>
       </div>
    <div v-show=" showimg" class="jiazai"><img src="../../../assets/jiazai.png"><p>正在努力加载中...</p></div>
    <div v-show="!showimg"> 
    <div class="nearItem" v-show="showNear" >
    <div class="rootstyle" v-for="(item,i) of list" :key="i">
      <div class="leftstyle" @click="Order(item.lotId,item.name,item.location,item.price,item.lotPhone)" > 
        <div class="item" ><h3>名称：{{item.name}}</h3></div>
        <div class="item" >
          <img src="../../../assets/ic_location.png" alt="">
          <h3 class="location">地址：{{item.location}}</h3>
        </div>
        <div class="item" >
          <h3>距您{{item.distance}}m&nbsp;|&nbsp;剩余：{{item.empty}}&nbsp;|&nbsp;收费：{{item.price}}/h</h3>
        </div>
      </div>
      <div class="rightstyle" @click="Order(item.lotId,item.name,item.location,item.price,item.lotPhone)">
        <a href="#"><img src="../../../assets/ic_goto.png" alt="">
        <div class="goto">预约</div></a>
      </div>
     
    </div>
    <!-- <mt-button type="danger" size="large" @click="loadMore">
      加载更多
    </mt-button> -->
    </div>
   </div>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  data(){
    return {
      keyword:"",
      list:[],//停车场的列表数组
      showNear:true,
      showsearch:false,
      showimg:true
    }
  },
  methods:{
    inputFunc(){
      // if(this.keyword>0){  
      //   this.showNear = false;
      //   this.showsearch = true;    
      // }else{    
      //   this.showsearch= false;   
      // }
      this.showNear=false;
      this.showsearch=true;
      this.hideshow=false;
  
    },
    closeSearch(){
      this.showNear=true;
      this.showsearch=false;
      this.keyword="";
    },
    search_cancel(){  
      // var inputObj = document.getElementById('search');
      //   if(inputObj.value !== ''){
      //     this.showNear=false;
      //     this.showsearch=true;
      //   }
      //   if(inputObj.value==''&&this.showsearch==true){
      //     this.showsearch=true;
      //   }
      this.keyword="";
    },
  
    Order(lotId,name,location,price,lotPhone){
       var u_name=localStorage.getItem("u_name");
           this.u_name=u_name;
        if(u_name==""||u_name==null){
         this.$messagebox.confirm("您还没登录请先登录！").then(action=>{
         this.$router.push("/Login4")
       })
      }else{
        this.$router.push(
        {
          path:"/Order",
          query: {lotId,name,location,price,lotPhone}
        });
      }
    },
    loadMore(){
      //功能：获取商品分页的数据
      // 1.发送请求
      var url="lists/list";
       //this.$indicator.open('加载中...');
      //发送ajax请求，获取当前页的内容
      // setInterval(()=>{
      //   this.axios.get(url).then(res=>{
      //   // 2.获取服务器返回结果s
      //   //console.log(res);
      //   var state=res.data.state;
      //   var list=res.data.data;
      //   // console.log(list);
      //   if(state!=2000){
      //     this.$toast("获取失败！");
      //   }else{
      //     // this.$toast("获取成功！");
      //   // this.$indicator.open('加载中...');
      //     this.list=list; 
      //    var name=list[0].name;
      //    // console.log(name)
      //   //  this.$indicator.close();
      //    //console.log(list)
      //   }
      //  })
      // },1000)
      // this.$indicator.close();
        this.axios.get(url).then(res=>{
        // 2.获取服务器返回结果s
        //console.log(res);
        var state=res.data.state;
        var list=res.data.data;
        // console.log(list);
        if(state!=2000){
          this.$toast("获取失败！");
        }else{
          // this.$toast("获取成功！");
        // this.$indicator.open('加载中...');
          this.list=list; 
         var name=list[0].name;
         // console.log(name)
        //  this.$indicator.close();
       //  console.log(list)
        }
       })
    },
     nowTimes() {
      this.loadMore();
      this.timer = setTimeout(this.nowTimes, 0.5 * 1000);
    },

    showjiazai(){
     if(this.showNear==true){
          this.showimg=false
      }
    }
    
  },
  //计算属性，当输入内容的时候下面的方法就会根据你输入的内容来过滤list数组中的数据  
  computed: {
    list1() {   
      var keyword = this.keyword;  
      if (keyword) {     
        return this.list.filter(function(product) {   
          return Object.keys(product).some(function(key) {   
            return String(product[key]).toLowerCase().indexOf(keyword) > -1
          })    
        })   
      }   
      return this.products; 
    } 
  },


  created(){
    this.loadMore();
    this.nowTimes();
    this.showjiazai();
  },
  // mounted(){
  //   this.loadMore();   
  // }
  beforeDestroy: function() {
    if (this.timer) {
       // console.log("销毁定时器")
       clearTimeout(this.timer); //在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>
<style scoped>
  a{
    text-decoration: none;
  }
  /*最外层父元素*/
  .page-head{
    display:flex;
    position:fixed;
    top: 0px;
    z-index:999;
    width:100%;
    justify-content: space-between;
    align-items:center;
    background-color:rgb(126,206,244);
    padding-left:7px;
    padding-right:7px;
    height:55px;
    color:#fff;
    font-size:18px;
    overflow:auto;/*溢出显示轮动条*/
  }
  .sou{
    position:fixed;
    top:14px;
    left:70px;
    width:65%;
    border-radius:20px;
    border:none;
    font-size:14px;
    /* text-align: center; */
  }
  .searchImg{
    position: relative;
    left: 79%;
    width: 15px;
    height: 15px;
  }
  .mint-cell{
    min-height:35px;
  }
  .nearItem{
    position: relative;
    top:55px;
    margin-bottom:30px;
    z-index: 1;
  }
  .imgstyle{
    width:30px;
    height:30px;
  }
  .rootstyle{
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1px solid #ccc;
    height:95px;
  }
  .leftstyle{
    width:80%;
    height:95px;
    padding:10px 0 10px 15px;
  }
  .leftstyle img{
    position: relative;
    top: -6px;
    width: 35px;
    height: 35px;
  }
  .item{
    height:23px;
    margin-bottom:5px;
  }
  .item .location{
    position: relative;
    top: -32px;
    left: 32px;
  }
  .rightstyle{
    display:flex;
    position: relative;
    left: -5px;
    font-size: 16px;
    height: 100px;
    width: 60px;
  }
  .rightstyle img{
    position: relative;
    top:20px;
    left:27%;
    width:35px;
    height:35px;
  }
  .goto{
    height: 25px;
    color:#303030;


    
    position: relative;
    top: 25px;
    left:10px;
  }
  /*主标题*/
  h3{
    color:#303030;
    font-size:16px;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    margin-block-start: 0em;
    margin-block-end: 0em;
    font-weight:normal;
  }
  .mint-button{
    position: relative;
    height:50px;
  }
  .searchList {
    width: 100%;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    background-color: #f0f0f0;
    z-index: 999;
    top: 52px;}
    
    .content {
      background: #f0f0f0;
      padding: 10px;
      /* .empty {
        width: 100%;
        text-align: center; */
        /* img {
          margin-top: 80px;
          width: 158px;
        /* } */
        margin-top: 55px;
      } 
      ul {
        background: #fff;
        padding-left: 0px;
      }
      li {
        text-align: left;
        position: relative;
        padding-left: 40px;
        font-size: 15px;
        border-bottom: 1px solid #f1f1f6;
       
      }
     .content span {
        width: 99.9%;
        display: block;
        font-size: 15px;
        line-height: 28px;
      }
      .poi-name {
        font-size: 16px;
      }
      .poi-address {
        font-size: 13px;
        color: #90909b;
        min-height: 28px;
      }
      .cancel {
      position: relative;
      display: block;
      font-size: 15px;
      right: 15px;
      top: 3px;
      z-index: 10;
      color: #2c3e50;
    }
  .empty{
    text-align: center
  }
 .jiazai{
   position: relative;
   top: 160px;
   width: 100%;
   height: 400px;
    text-align: center;
 }   
.jiazai img{
  width: 100px;
  height: 100px;
}
 </style>
