<template>
    <div>
        <van-nav-bar
    title="绑定手机号"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
  <div class="Phone">
      <img src="../../../assets/phone.png" alt="">
      <p class="pp">当前绑定的手机号：{{u_phone}}</p>
      <p class="tp">当前是您的手机号，您可进行以下操作进行更改</p>
      <button class="gai" @click="change_phone()">更改手机号</button>
  </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            u_phone:""
        }
    },
    methods:{
        cancel(){
           
                this.$router.push("/Update")
           
       },
       change_phone(){
           this.$router.push("/updateInfo")
       },
        loadphone(){
            var url="users/findByUid"
            this.axios.get(url).then(res=>{
                // console.log(res);
                var u_phone=res.data.data.u_phone;
                this.u_phone=u_phone;
                // console.log(u_phone);
            })
        }
    },
    created(){
        this.loadphone();
    }
}
</script>
<style scoped>
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
  .Phone{
      position: relative;
      top: 150px;
      width: 100%;
      text-align: center;
  }
  .pp{
      margin-top:20px;
      color: #000;
      font-size: 16px;
  }
  .tp{
      color: #999;
      font-size:14px;
  }
  .gai{
      border: 1px solid rgb(126,206,244);
      width: 300px;
      height: 40px;
      background: transparent;
      border-radius: 5px;
      color: green;
      margin-top:20px;
  }
  .gai:hover{
      color: #fff;
      background: rgb(126,206,244);
  }
</style>