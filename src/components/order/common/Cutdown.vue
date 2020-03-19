<template>
<div class="page-tab">
  <van-nav-bar
    title="预定中"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
  <div class="pageBody">
    <van-notice-bar class="notice" color="#1989fa" background="#ecf9ff" left-icon="info-o" mode="closeable">
      您已成功预定车位，请在指定时间内到达预定位置停放车辆
    </van-notice-bar>
    <div class="yuImg">
      <img src="../../../assets/ic_loading.gif" alt="">
    </div>
    <div class="yuFont">
      <!-- <van-count-down @finish="finished" class="load" :time="this.time" format="HH : mm"/> -->
      <div class="load" v-model="shenyu1">{{shenyu1}}</div>
      <div  v-for="(item,i) of list1" :k=i>
      <p>名称：{{item.name}}</p>
      <p>地点：{{item.location}}</p>
      <p>车位号：{{item.spaceId}}号</p>
      <p>联系方式：{{item.lotPhone}}</p>
      <p>预订时间：{{item.ctime}}</p>
    </div></div>
    <div class="next">
      <mt-button class="btn_next" @click="next()">车位开锁</mt-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  inject:['reload'],
  data(){
    return {
      pickerVisible:"",
      name:"",
      location:"",
      spaceId:"",
      lotPhone:"",
      time:"",
      list:[],
      list1:[],
      date:"",
      shenyu1:""

    }
  },
  methods:{
    //异步执行
     async  first(){
       var url="/orders/findNoCompleteOrder";
       this.axios.get(url).then(res=>{
        //console.log(res);
        var list1=res.data.data;
        this.list1=list1;
      });
    
    },
    
      timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      this.date = year + "-" + month + "-" + date +" "+hh+":"+mm;
     // console.log(this.date);
      localStorage.setItem("timeend",this.date)
     
    },
     nowTimes() {
      this.timeFormate(new Date());
      this.timer = setTimeout(this.nowTimes, 0.5* 1000);
    },
   jisuan(){
     //计算时间差
      // console.log("预订时间"+localStorage.getItem("timefirst"));
      var timefirst = localStorage.getItem("timefirst");
    //  console.log("预定时间"+timefirst)
      var allfist = timefirst.split(" ")
      var riqi =allfist[0]
      var shijian =allfist[1]
      // console.log(riqi)
      //console.log(shijian)
      var  allfist1 = riqi.split("-")
      var  month =Number( allfist1[1])
      var  day = Number( allfist1[2])
     // console.log(month)
      //console.log(day)
      var allfist2 = shijian.split(":")
      var hour =Number( allfist2[0])
      var minter = Number( allfist2[1])
      //console.log(hour)
     // console.log(minter)

     //  console.log("系统时间"+localStorage.getItem("timeend"))
      var timeend =String( localStorage.getItem("timeend"));
      var allend = timeend.split(" ")
      var riqi1 = allend[0]
      var shijian1 = allend[1]
      // console.log(riqi)
      //console.log(shijian)
      var  allend1= riqi1.split("-")
      var  month1 = Number( allend1[1])
      var  day1 = Number( allend1[2])
      //console.log(month1)
      //console.log(day1)
      var allend2 = shijian1.split(":")
      var hour1 =Number(allend2[0]) 
      var minter1 =Number( allend2[1])
      //console.log(hour1)
     // console.log(minter1)
      var zongminter=0;
      // 两个日期时间差 总分钟数
        if(hour1!=hour){
              zongminter =( (hour1-hour-1)*60 )+ (60-minter)+minter1
             //console.log("总分钟数"+zongminter)
            //  localStorage.setItem("zongminter",zongminter)
           }else{
             zongminter = minter1-minter
            //console.log("总分钟数"+zongminter)
            //  localStorage.setItem("zongminter",zongminter)
           }

      var time =  localStorage.getItem("time")
      // console.log(time)
      // var zongminter = localStorage.getItem("zongminter")
      var daojishi = time.split(":")
      var h1 =Number( daojishi[0])
      var m1 =Number( daojishi[1])
      var zongdaojishi  = h1*60 + m1
      // console.log(zongdaojishi)
      var shenyu = zongdaojishi - zongminter;
      // console.log(shenyu);
      var h2 = "0"+ parseInt(shenyu /60) ;
      var m2 = parseInt(shenyu%60);
      if(m2<10){
        m2="0"+m2
      }
      var shenyu1 =  localStorage.getItem("shenyu1")
      //console.log(shenyu1)
      // console.log("剩余小时"+h2)
      // console.log("剩余分钟"+m2)
      shenyu1 = h2 +":" +m2
      // console.log(shenyu1);
      this.shenyu1 = shenyu1
    // console.log(shenyu1)
      this.finished();

      
   },
    nowTimes1() {
      this.jisuan();
      this.timer = setTimeout(this.nowTimes1, 0.5 * 1000);
    },

  next(){//name,location,spaceId,lotPhone
      var url="/orders/findNoCompleteOrder";
      this.axios.get(url).then(res=>{
        // console.log(res);
        var list=res.data.data;
        // console.log(list);
        for(var item of list){
        //  console.log(item)
        }
        var oid=item.oid;
        //console.log(oid)
        var url="/orders/completeOrder";
        var obj={oid:oid}
        this.axios.get(url,{params:obj}).then(res=>{
            // console.log(res)
            var state=res.data.state;
            // console.log(state)
            if(state==2000){
             // console.log("执行")
              // this.$toast("订单已取消");
              // this.$router.push("/");
              this.$messagebox.confirm("你是否确认开锁，开锁后将进行计费").then(action=>{
                  var url="/orders/findEffectiveOrder";
                  this.axios.get(url).then(res=>{
                  var list=res.data.data;
                  this.list=list;
                  for(var item of list){
              // console.log(item)
                  var timefirst1 = item.stopTime;
                  this.timefirst1 = timefirst1
                  localStorage.setItem("timefirst1",timefirst1)
          }
       })  
          setTimeout(()=>{
              this.$router.push(
              "/Money"
                // path:'/Money',
                // query:{name,location,spaceId,lotPhone}
              )
         },800)
             
            })
            }
          }
        )
      })
    },
    finished(){
      var shenyu1 =this.shenyu1 ;
      //console.log(shenyu1)
      if(shenyu1 == "00:00"){
        var url="/orders/findNoCompleteOrder";
      this.axios.get(url).then(res=>{
        // console.log(res);
        var list=res.data.data;
       // console.log(list);
        for(var item of list){
         // console.log(item)
        }
        var oid=item.oid;
        console.log(oid)
        var url="/orders/endOfOrderByOid";
        var obj={oid:oid}
        this.axios.get(url,{params:obj}).then(res=>{
           // console.log(res)
            var state=res.data.state;
          //  console.log(state)
            if(state==2000){
            //  console.log("取消")
              this.$toast("订单已取消");
              this.$router.push("/");
            }
          }
        )
      })
      }
    },
    cancel(){
      this.$router.push("/");
      localStorage.setItem("changestate","geren")
    },
    localStorage(){
      //     var url="/orders/findNoCompleteOrder";
      //    this.axios.get(url).then(res=>{
      //   //console.log(res);
      //   var list1=res.data.data;
      //   this.list1=list1;
      //   // for(var item of list1){
      //   //   // console.log(item)
      //   //    var timefirst = item.ctime;
      //   //    this.timefirst = timefirst
      //   //    //console.log("初始时间"+timefirst)
      //   //    localStorage.setItem("timefirst",timefirst)
      //   // }
      // });
     var shenyu1 = "00" +":" +"01";
     this.shenyu1=shenyu1
     localStorage.setItem("shenyu1",shenyu1)
     //console.log(localStorage.getItem("shenyu1"))
     //this.reload();

    },
  },
  mounted(){
  
    
  },
 
  created(){
    var pickerVisible=this.$route.query.pickerVisible;
     this.pickerVisible=pickerVisible;
   this.localStorage()  
    this.first();
      this.timeFormate(new Date());
   // console.log(pickerVisible)
     this.jisuan();
    //调用定时器
    this.nowTimes();
    this.nowTimes1();

    // console.log(pickerVisible);
    // localStorage.setItem("time",pickerVisible)
    // console.log(localStorage.getItem("time")) 
    //this.lodeMore();
    
    // var all=pickerVisible.split(":");
    // // console.log(all)
    // var h=parseInt(all[0]);
    // // console.log(h);
    // var m=parseInt(all[1]);

    // // console.log(m)
    // var time=h*60*60*1000+m*60*1000;
    // this.time=time;
    //console.log(time)
    // var name=this.$route.query.name;
    // this.name=name;
    // // console.log(name);
    // var location=this.$route.query.location;
    // this.location=location;
    // var spaceId=this.$route.query.spaceId;
    // this.spaceId=spaceId;
    // var lotPhone=this.$route.query.lotPhone;
    // this.lotPhone=lotPhone;
  },
    //销毁定时器
  beforeDestroy: function() {
    if (this.timer) {
        //console.log("销毁定时器")
       clearTimeout(this.timer); //在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>
<style scoped>
  .page-tab{
    position:absolute;
    width:100%;
  }
  .van-nav-bar {
    position: fixed;
    width:100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
  .pageBody{
    position: relative;
    width: 100%;
  }
  .notice{
    position: relative;
    top: 55px;
    z-index:1;
  }
  .yuImg{
    position: relative;
    top:10px;
    height:200px;
    text-align: center;
  }
  .yuImg img{
    position: relative;
    width: 100%;
  }
  .yuFont{
    position: relative;
    top:-8px;
    margin: 10px 20px;
  }
  .yuFont .load{
    position: relative;
    font-size: 18px;
    text-align: center;
  }
  .yuFont p{
    position: relative;
    top:10px;
    font-size:16px;
  }
  .next{
		position: fixed;
    width: 100%;
    bottom:0;
    height: 55px;
	}
  .btn_next{
    position: fixed;
    border-radius:0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 55px;
    background: #7ecef4;
  }
</style>