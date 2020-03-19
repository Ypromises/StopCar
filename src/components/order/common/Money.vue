<template>
<div class="page-tab">
  <van-nav-bar
    title="您的订单"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
  <div class="pageBody">
    <van-notice-bar class="notice" color="#1989fa" background="#ecf9ff" left-icon="info-o" mode="closeable">
      您已成功开锁，请停入车辆，并在离开时进行结算
    </van-notice-bar>
    <div class="yuImg">
      <img src="../../../assets/ic_loading.gif" alt="">
    </div>
    <div class="yuFont">
      <div class="timer">
        <div v-model="jishi1">{{jishi1}}</div>
      </div>
      <div v-for="(item,i) of list" :key="i">
      <p>名称：{{item.name}}</p>
      <p>地点：{{item.location}}</p>
      <p>车位号：{{item.spaceId}}号</p>
      <p>联系方式：{{item.lotPhone}}</p>
      <p>停入时间：{{item.stopTime}}</p>
      </div>
    
    </div>
    <div class="next">
      <van-button class="btn_next" @click="next">结算</van-button>
      <van-popup v-model="show" closeable position="bottom" :style="{ height: '60%' }">
        <van-nav-bar
          title="确认付款"
        />
        <hr>
        <div class="money">￥{{this.yuprice}}</div>
        <div class="text">
          <p>
            <span class="left">订单信息</span>
            <span class="right">{{location}}</span>
          </p>
          <p>
            <span class="left">订单车位</span>
            <span class="right">{{spaceId}}号</span>
          </p>
        </div>
        <div class="liji">
          <van-button class="fu" size="large" @click="yuding(spaceId,name)">立即付款</van-button>
        </div>
      </van-popup>
      <van-popup v-model="show1" closeable position="bottom" :style="{ height: '60%' }">
        <van-nav-bar
          title="请输入支付密码"
        />
        <!--密码输入框-->
        <van-password-input 
          :value="input"
          info="密码为 6 位数字"
          :focused="showKeyboard" @focus="showKeyboard = true"/>
          <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"/>
      </van-popup>
    </div>
  </div>
</div>
</template>
<script>
export default {
  inject:['reload'],
  name:'Timer',
  data(){
    return {
      timer: "",
      content: "",
      hour: 0,
      minutes: 0,
      seconds: 0,
      name:"",
      location:"",
      spaceId:"",
      lotPhone:"",
      yuprice:"",
      price:"",
      show:false,
      list:[],
      date:"",
      jishi1:"",
      show1:false,
      input: "",
      showKeyboard: true
    }
  },
  methods:{
     More(){
      var url="/orders/findEffectiveOrder";
      this.axios.get(url).then(res=>{
        //  console.log(res);
        var list=res.data.data;
        this.list=list;
        // for(var item of list){
        //   // console.log(item)
        //    var timefirst1 = item.mtime;
        //    this.timefirst1 = timefirst1
        //  // console.log("停泊时间"+timefirst1)
        //    localStorage.setItem("timefirst1",timefirst1)
        // }
      })
    },
     timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      this.date = year + "-" + month + "-" + date +" "+hh+":"+mm;
      //console.log(this.date);
      localStorage.setItem("timeend",this.date)
    },
      nowTimes() {
      this.timeFormate(new Date());
      this.timer = setTimeout(this.nowTimes, 0.5 * 1000);
    },

   
   jisuan(){
     //计算时间差
     // console.log("停泊时间"+localStorage.getItem("timefirst1"));
      var timefirst =String( localStorage.getItem("timefirst1"));
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
      //console.log(minter)

      //console.log("系统时间"+localStorage.getItem("timeend"))
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
     //   console.log(hour1)
      //console.log(minter1)

      var zongminter = 0
      
      //两个日期时间差 总分钟数
      if(month1-month!==0){
        //  if(12<hour<24){
        //      if(hour1<12){
        //        hour1 =hour1+12
        //       }
        //     }
        if(month==9){
            zongminter =((30-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
            // localStorage.setItem("zongminter",zongminter)
        }else if(month==1){
             zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
            // localStorage.setItem("zongminter",zongminter)
        }else if(month==2){
            var zongminter =((28-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
            // localStorage.setItem("zongminter",zongminter)
        }else if(month==3){
            zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
          //  localStorage.setItem("zongminter",zongminter)
        }else if(month==4){
            zongminter =((30-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else if(month==5){
            zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else if(month==6){
            zongminter =((30-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else if(month==7){
            zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else if(month==8){
            zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else if(month==10){
            zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else if(month==11){
            zongminter =((30-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }else{
           zongminter =((31-day)*24*60+(24-hour-1)*60+(60-minter1) ) +    ((day1-1)*24*60+hour1*60+minter1)
        }
      }else{ 
        // if(12<hour<24){
        //      if(hour1<12){
        //        hour1 =hour1+12
        //       }
        //  }
         if(day!=day1){
            zongminter =( (day1-day-1)*24*60+(24-hour-1)*60+(60-minter)) +(hour1*60+minter1)
         }else{   
           if(hour1!=hour){
              zongminter =( (hour1-hour-1)*60 )+ (60-minter)+minter1
             //console.log("总分钟数"+zongminter)
            //  localStorage.setItem("zongminter",zongminter)
           }else{
             zongminter = minter1-minter
            //console.log("总分钟数"+zongminter)
            //  localStorage.setItem("zongminter",zongminter)
           }

         }
      }

      // var time =  localStorage.getItem("time")
      // console.log(time)
      //  var zongminter = localStorage.getItem("zongminter")
       var h = parseInt(zongminter /60) 
       if(h<10){
         h = "0"+h
       }
       var m = parseInt(zongminter%60)
       if(m<10){
         m="0"+m
       }
       //console.log("小时"+h)
       //console.log("分钟"+m)
      var jishi1 = localStorage.getItem("jishi1")
       jishi1 = h +":" +m
       //console.log(jishi1);
       this.jishi1 = jishi1  
   },
    nowTimes1() {
      this.jisuan();
      this.timer = setTimeout(this.nowTimes1, 0.1 * 1000);
    },
    yuding(spaceId,name){
      this.show1=true;
      this.$router.push(
      {
        query:{spaceId,name}
      });
    },
    next(){
      this.show = true;
      // 停车场收费
      var spaceId = localStorage.getItem("spaceId")
      //console.log(spaceId)
      this.spaceId=spaceId;
      var price = localStorage.getItem("price");
      //console.log(price)
      var location = localStorage.getItem("location")
      this.location = location;
      //console.log(location)
      // var str=this.time;
      // console.log(str);
      var time=this.jishi1;
      var pick=time.split(':');
      //console.log(pick)
      var h=Number(pick[0]);
      //console.log(h)
      var m=pick[1];
      //console.log(m)
      if(!h){
        var dan = 1;
        var yuprice = dan * price;
        //console.log(yuprice);
      }else{
        var dan = h+1
        var yuprice = dan * price;
        //console.log(yuprice)
      }
      this.yuprice=yuprice;
    },
    finished() {
      this.$toast('倒计时结束');
    },
    cancel(){
      this.$router.push("/");
      localStorage.setItem("changestate","geren")
    },
    onInput(key) {
      this.input = (this.input + key).slice(0, 6);
      var input=this.input;
      //console.log(input.length);
      if(input.length==6){
        this.$toast({
          message:'支付成功',
          iconClass:'iconfont icon-check'
        });
        var url="/orders/findEffectiveOrder";
        this.axios.get(url).then(res=>{
          // console.log(res);
          var list=res.data.data;
          // console.log(list);
          for(var item of list){
           // console.log(item)
          }
          var oid=item.oid;
          //console.log(oid)
          var url="/orders/finishOrder";
          var obj={oid:oid}
          this.axios.get(url,{params:obj}).then(res=>{
              // console.log(res)
              var state=res.data.state;
              // console.log(state)
              if(state==2000){
                // console.log("取消")
                //this.$toast("订单已完成");
                localStorage.setItem("changestate","shouye")
                this.$router.push("/");
              }
            }
          )
        })
      }
    },
    onDelete() {
      this.input = this.input.slice(0, this.input.length - 1);
    },
    localStorage(){
      var jishi1="00"+":"+"00"
     // this.jishi1 = jishi1;
      localStorage.setItem("jishi1",jishi1)
     // this.reload();
    }
  },
  created(){
    this.timer = setInterval(this.startTimer, 1000);
    var name=this.$route.query.name;
    this.name=name;
    var location=this.$route.query.location;
    this.location=location;
    var spaceId=this.$route.query.spaceId;
    this.spaceId=spaceId;
    var lotPhone=this.$route.query.lotPhone;
    this.lotPhone=lotPhone;
    this.More();
    this.localStorage();
    this.timeFormate(new Date());
    //调用定时器
    this.nowTimes();
    this.nowTimes1();
    this.jisuan();
 //   this.lodeMore();
  
  },
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
  .yuFont .timer{
    position: relative;
    height: 30px;
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
  .ok{
    position: relative;
    top:15px;
    text-align: center;
  }
  .ok img{
    height:25px;
    width: 25px;
  }
  hr{
    position: relative;
    top:5px;
  }
  .money{
    position: relative;
    top:55px;
    text-align:center;
    font-size:24px;
  }
  .text{
    position: relative;
    top:55px;
    margin:15px;
  }
  .text p{
    position: relative;
    padding:5px;
    border-bottom:1px solid #ddd;
  }
  .text p .left{
    position: relative;
    color:#9a9a9a;
  }
  .text p .right{
    position: relative;
    left:30px;
  }
  .liji{
    position: fixed;
    bottom:0px;
    width: 92%;
    margin:15px;
    border-radius:5px;
  }
  .liji .fu{
    background-color: #009fe8;
    color:#fff;
  }
  .van-password-input {
    top: 70px;
  }
</style>