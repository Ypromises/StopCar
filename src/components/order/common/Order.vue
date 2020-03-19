<template>
  <div class="page-tabbar">
    <!-- 1.OrderTitle -->
    <van-nav-bar
      :title="name"
      left-text="返回"
      left-arrow
      @click-left="cancel"
    />
    <van-swipe class="image" vertical :autoplay="3000">
      <van-swipe-item><img src="../../../assets/1.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../../../assets/2.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../../../assets/3.jpg" alt=""></van-swipe-item>
      <van-swipe-item><img src="../../../assets/4.jpg" alt=""></van-swipe-item>
    </van-swipe>
    <div class="page-body">
      <div class="place">
        <van-notice-bar
          color="#1989fa"
          background="#ecf9ff"
          left-icon="info-o">
        请选择车位
        </van-notice-bar>
        <div class="choose" >
         <div v-for="(item,index) of allSpace" :key="index">
           <div v-if="listid[item-1]===0">
             <button class="button" :class="{ liBackground:changeLeftBackground == index}" @click="setActive(index)">{{item}}</button>
           </div>
           <div v-else="listid[item-1]===1">
             <button class="button1" :class="{ liBackground1:changeLeftBackground == index}" @click="setActive(index)" disabled>{{item}}</button>
           </div>
             
       </div> 
       </div>
      </div>
      <hr>
      <div class="time">
        <van-cell v-model="pickerVisible" @click="openPicker" class="pickerTime" title="到达时间" is-link arrow-direction="down" value="pickerVisible"/>
        <mt-datetime-picker 
          ref="picker" 
          type="time" 
          v-model="pickerVisible" 
          hour-format="{value} 时"
          minute-format="{value} 分"input
          :startHour="startHour"
          :endHour="endHour"
          @confirm="handleConfirm">
        </mt-datetime-picker>
      </div>
      <hr>
      <div class="car">
        <div class="carId">
          <span>车牌号码：</span>
          <span class="carPai">
            <a @click="carPai(price,location,name,lotId,lotPhone)">我的车辆></a> 
          </span>
        </div>
        <div class="input">
          <div class="input-box">  
            <p>{{list.u_car_num}}</p>
          </div>
        </div>
      </div>
      <hr>
		  <div class="write">
        <input type="checkbox" v-bind:checked="isChecked" v-on:click="handleDisabled">
        <a @click="write">我已阅读《预定标准》条例</a>
		  </div>
      <div class="reserve">
        <van-button class="btn_money">
          <img src="../../../assets/ic_gouwuche.png" alt="">
          <span class="sum" v-model="yuprice">￥{{this.yuprice}}</span>
        </van-button>
        <van-button size="small" class="btn_car" @click="buySeat(pickerVisible,spaceId,name)" v-bind:disabled="isDisabled">预定车位</van-button>
        <van-popup v-model="show" closeable position="bottom" :style="{ height: '60%' }">
          <van-nav-bar
            title="确认付款"
          />
          <hr>
          <div class="money">￥{{this.yuprice}}</div>
          <div class="text">
            <p>
              <span class="left">订单信息</span>
              <span class="right">{{name}}</span>
            </p>
            <p>
              <span class="left">订单车位</span>
              <span class="right" v-model="chepai">{{chepai}}号</span>
            </p>
          </div>
          <div class="liji">
            <van-button class="fu" size="large" @click="yuding(pickerVisible)">立即付款</van-button>
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
//   var num = Number( localStorage.getItem("num"))
//  console.log(typeof( num))
export default {
   inject:['reload'],
  data(){
    return {
      name:"",
      chepai:"",
      price:"",
      lotId:"",
      location:"",
      lotPhone:"",
      spaceId:"",
      list:[],
      pickerVisible:"",
      yuprice:"",
      startHour:0,
      endHour:4,
      isDisabled:true,
      isChecked:false,
      changeLeftBackground: 0,
      allSpace:"",
      listid:[],
      show:false,
      show1:false,
      input: "",
      showKeyboard: true
    }
  },
  // watch: {
  //     '$route': 'getParams'
  //   },
  methods:{
   
  first(){
       var url="/orders/findNoCompleteOrder";
       this.axios.get(url).then(res=>{
       //  console.log(res);
        var list1=res.data.data;  
        // console.log(list1)
        if(list1!=null){
           this.$messagebox.confirm("您有一份订单正在进行，不可重复预订,是否进入").then(action=>{
            this.$router.push(           
             '/Cutdown'           
            ) 
          })

          
        }
      });
       var url="orders/findEffectiveOrder";
            this.axios.get(url).then(res=>{
                var state=res.data.state;
               // console.log(res);
                          
            //4.获取数据成功
                var list3=res.data.data;
                if(list3!=null){
           this.$messagebox.confirm("您有一份订单正在进行，不可重复预订,是否进入").then(action=>{
            this.$router.push(           
             '/Money'           
            ) 
          })
        }     
                   
         })
        
  },
    setActive(index){
      this.changeLeftBackground = index;
     // console.log(index+1);
      var spaceId=index+1;
       localStorage.setItem("spaceId",spaceId)
      // console.log(localStorage.getItem("spaceId"))
      this.chepai=spaceId;
    },
    carPai(price,name,location,lotId,lotPhone){
       this.$router.push(
          {
          path:"/Mycar",
          query: {lotId,name,location,price,lotPhone}
          }); 
    },
    handleDisabled:function(){
      this.isChecked = !this.isChecked;
      if(this.isChecked==true){
        this.isDisabled = false;
      }
      else{
        this.isDisabled = true;
      }
    },
    write(){
      this.$messagebox.alert(`<p>1、在预定到达时间内到达指定位置，超时则取消预定车位并扣除预定费用;</p><p>2、预定5分钟到达不收取任何费用，一小时以内收取预定时间的3%的预定费用，超过一小时后的时间收取2%的预定费用;</p><p>3、预定成功五分钟内，可免费取消预定订单；</p><p>4、新能源汽车在路内临时停车泊位每天一次免收2小时停车服务费。</p>`,"预约标准")
      this.isChecked=true;
      this.isDisabled=false;
    },

    cancel(){
    
      this.$router.push("/"); 
      localStorage.setItem("changestate","fujin") 
      this.reload();
    
    },
    buySeat(pickerVisible,spaceId,name){
     var chepai=this.chepai;
      if(pickerVisible==""){
       this.$messagebox("请选择预订到达时间！")
      }else if(chepai==""){
        this.$messagebox("请选择停车位！")
      }else{
         this.$router.push(
      {
        query:{pickerVisible,spaceId,name}
      });
      this.show=true;
      }

      // //2.1请求服务器地址
      // var url="/orders/insert";
      // //2.2请求参数
      // var obj={lotId:lid,spaceId:carid};
      // //3.获取返回的结果
      // this.axios.get(url,{params:obj}).then(res=>{
      //   //3.1如果-1提示用户登录
      //   },
    },
    yuding(){
      this.show1=true;
    },
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm(){
      var price=this.price;
      var str=this.pickerVisible;
      var pickerVisible = this.pickerVisible
      localStorage.setItem("time",pickerVisible)
      // this.pickerVisible = pickerVisible;
     // console.log(str);
      var pick=str.split(':');
      var h=pick[0]*60;
      var m=pick[1];
      var total=parseInt(h)+parseInt(m);
      if(total<=5){
        var yuprice=0;
      //  console.log(yuprice);
      }else if(total>5&&total<=60){
        var yuprice=parseFloat(total*price*0.005).toFixed(2);
      //  console.log(yuprice);
      }else if(total>60){
        var yuprice=parseFloat(1.5+((total-60)*price*0.003)).toFixed(2);
        // console.log(yuprice);
      }
      this.yuprice=yuprice;
      localStorage.setItem("yuprice",yuprice)
    },
    loadMore(){
       var url="users/findByUid";
      //发送ajax请求，获取当前页的内容
      this.axios.get(url).then(res=>{
        // 2.获取服务器返回结果s
        var state=res.data.state;
        var list=res.data.data;
        //  console.log(res);
        if(state!=2000){
          this.$toast("获取失败！");
          this.$router.push("/Login4")
        }else{
          this.list=list; 
        }
      })
      //获取停车场车位数量，车位状态
      var lotld=this.lotId;
      //console.log(lotld);
      var url="lots/get_lot_by";
      var obj={lotId:lotld}
      this.axios.get(url,{params:obj}).then(res=>{
      //console.log(res);
       var allSpace=res.data.data.allSpace
       //获得allspace值
       this.allSpace = allSpace;
      // console.log(allSpace)
       var listid=res.data.data.borrowed;
     // console.log(listid);
       this.listid=listid;
      })
    
    },
    onInput(key) {
      this.input = (this.input + key).slice(0, 6);
      var input=this.input;
      //console.log(input.length);
      if(input.length==6){
        //发送预订请求
        var lotId=this.lotId;
        var spaceId=Number(localStorage.getItem("spaceId")) ;
        var price  =Number(localStorage.getItem("yuprice")*100)
        //console.log(price)
        var url = "/orders/insert";
        var obj ={lotId:lotId,spaceId:spaceId,price:price}
        this.axios.get(url,{params:obj}).then(res=>{       
          var url="/orders/findNoCompleteOrder";
          this.axios.get(url).then(res=>{
           //console.log(res);
          var list1=res.data.data;
          this.list1=list1;
          for(var item of list1){
          // console.log(item)
           var timefirst = item.stopTime;
           this.timefirst = timefirst
         //  console.log("初始时间"+timefirst)
           localStorage.setItem("timefirst",timefirst)
           }
          });
          var state=res.data.state
          //console.log(state);       
          if(state==2000){
             setTimeout(()=>{
                this.$toast({
                message:'支付成功',
                iconClass:'iconfont icon-check'
               });
             this.$router.push('/Cutdown'); 
             },500)
           
          }else if(state==5003){
              this.$messagebox.confirm("您没有填写车牌号，请去我的车辆进行添加！").then(action=>{
              this.$router.push("/addCar")
            })
          }else if(state===6008){
            this.$messagebox("您创建订单次数过多视为恶意创建,请您明天再试！！！")
          }else if(state===5006){
            this.show1=false;
            this.show=false;
            this.$messagebox("您下手太慢啦！该车位已被预订，请重新选择");
            this.$router.push("/Order")
          }else{
            this.$toast("预订失败，请稍后再试！")
          }
        })
      }
    },
    onDelete() {
      this.input = this.input.slice(0, this.input.length - 1);
    },
  },
  created(){
    this.first();
    var name=this.$route.query.name;
    this.name=name;
    var price=this.$route.query.price;
    this.price=price;
    localStorage.setItem("price",price);
    var lotId=this.$route.query.lotId;
    this.lotId=lotId;
    var location=this.$route.query.location;
    this.location=location;
    localStorage.setItem("location",location)
    // console.log(localStorage.getItem("location"))
    var lotPhone=this.$route.query.lotPhone;
    this.lotPhone=lotPhone;
    this.loadMore();
    //console.log("2.create 组件创建成功")
    // console.log(lotId)
  },
}
</script>
<style scoped>
  a{
    text-decoration: none;
  }
  .page-tabbar{
    position:absolute;
    /*overflow:hidden;溢出隐藏*/
    width:100%;
  }
  .van-nav-bar {
    position: fixed;
    height: 55px;
    width: 100%;
    line-height: 55px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
  .image{
    position: relative;
    top:55px;
    height:200px;
  }
  .image img{
    width:100%;
    height:100%;
  }
	.page-body{
    position:relative;
    height:100%;
	  font-size:16px;
		top:55px;
		list-style:none;
		border:0; 
		box-sizing:border-box;
	}
  .pickerTime{
    position:relative;
    padding:0;
    font-size:16px;

  }
  .selectCar{
    position:relative;
    right:10px;
  }
	.car_input{
		margin:20px 10px;
	}
	.carInput{
		width:35px;
		height:40px;
		border-radius: 5px;
    text-align: center;
		margin-right:4px;
		border: 1px solid #cdc;
	}
	.time,.car,.write{
		margin:15px 10px;
	}
  .place{
    position:relative;
    /* height:250px; */
  }
  .time{
    position:relative;
    height:15px;
  }
  .car{
    position: relative;
    height:100px;
  }
  .write{
    position:relative;
    text-align:left;
  }
  .write input{
    position: relative;
    width: 20px;
    height: 20px;
    top: 4px;
  }
	.reserve{
		position: relative;
    width: 100%;
    height: 55px;
	}
  .btn_money{
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 65%;
    height: 55px;
    background: #ddd;
  }
  .btn_money img{
    position: relative;
    float:left;
    top:5px;
  }
  .btn_money .sum{
    position: relative;
    font-size: 22px;
    top:5px;
    width: 150px;
    height: 50px;
    display:table-cell; 
    vertical-align:middle;
    text-align:center;
  }
  .btn_car{
    position: fixed;
    bottom: 0;
    right:0;
    width: 35%;
    height: 55px;
    background: #7ecef4;
  }
  .carItem{
    height:340px;
  }
  .carId{
    position:relative;
    margin-bottom:15px;
  }
  .carPai{
    position: relative;
    float: right;
    font-size: 15px;
  }
  .input{
    position: relative;
    display: flex;
    justify-content:center;
  }
  .input-box{
    position: relative;
    width: 350px;
    height: 50px;
    box-shadow: 0px 6px 8px 0px rgba(96,100,112,0.1);
    border: 1px solid rgba(206,208,210,1);
    text-align: center;
    display:table-cell;
    vertical-align: middle;
  }
  .input-box p{
    position: relative;
    font-size:18px;
    top:10px;
    margin:0 auto;
  }
  .mint-button{
    border-radius:0px;
  }
  .choose{
    display: flex;
    margin-top:2px;
    width: 100%;
    /* border: 1px solid red; */
    flex-wrap: wrap;
    justify-content:center;
  }
  .button{
    width: 30px;
    height: 30px;
    margin: 3px 5px;
    text-align: center;
    border: 0;
    outline: 0;
    background-color:#befabe;
    border-radius: 5px;
  }
  .button1{
    width: 30px;
    height: 30px;
    margin: 3px 5px;
    text-align: center;
    border: 0;
    outline: 0;
    background-color:rgb(253, 211, 211);;
    border-radius: 5px;
  }
  .liBackground {
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#a0a6d8), to(#6b9de9));
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
  .van-cell:not(:last-child)::after{
    position: relative;
  }
</style>