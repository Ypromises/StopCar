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
      您已成功预定车位，请在指定时间内到达预定位置停放车辆
    </van-notice-bar>
    <div class="yuImg">
      <img src="../../../assets/ic_loading.gif" alt="">
      <!-- <img src="../../../assets/ic_success.png" alt="">
      <p>预约成功</p> -->
    </div>
    <div class="yuFont">
      <van-count-down @finish="finished" class="load" :time="this.time" format="HH : mm : ss"/>
      <!-- <p></p> -->
      <!-- <h3>预约地点：</h3>
      <h3>到达时间：</h3>
      <h3>车牌号码：</h3>
      <h3>电话号码：</h3> -->
    </div>
    <div class="next">
      <mt-button class="btn_next" @click="next">下一步</mt-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      pickerVisible:"",
      name:"",
      time:""
    }
  },
  methods:{
    next(){
      console.log('下一步');
    },
    finished() {
      this.$toast('倒计时结束');
    },
    cancel(){
      this.$router.push("/");
      localStorage.setItem("changestate","geren")
    },
  },
  created(){
    var pickerVisible=this.$route.query.pickerVisible;
    this.pickerVisible=pickerVisible;
    console.log(pickerVisible);
    var all=pickerVisible.split(":");
    console.log(all)
    var h=parseInt(all[0]);
    console.log(h);
    var m=parseInt(all[1]);
    console.log(m)
    var time=h*60*60*1000+m*60*1000;
    console.log(time)
    this.time=time;
    var name=this.$route.query.title;
    this.name=name;
    console.log(name);
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
  }
  .yuImg{
    position: relative;
    top:55px;
    height:200px;
    text-align: center;
  }
  .yuImg img{
    position: relative;
    width: 100%;
  }
  .yuFont{
    position: relative;
    top:55px;
    margin: 10px 20px;
  }
  .yuFont .load{
    position: relative;
    font-size: 18px;
    text-align: center;
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