<template>
    <div>
         <van-nav-bar
    title="个人信息"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
  <div class="Allinfo">
  <ul>
      <li class="liimg">头像
           <img class="rightimg" id="loadImg" :src="'http://47.94.217.89:8080'+avatar"  ref="pic" alt="">
      </li>
      <li>姓名
          <p class="right">{{u_name}}</p>
      </li>
      <li>手机号
          <p class="right">{{u_phone}}</p>
      </li>
  </ul>

  </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
         u_name:"",
         u_phone:"",
         avatar:"",  
        }
    },
    methods:{
         cancel(){
                this.$router.push("/")
                localStorage.setItem("changestate","geren")
       },
       loadInfo(){
            var url="users/findByUid"
            this.axios.get(url).then(res=>{
                // console.log(res);
                var list=res.data.data;
                this.avatar=list.avatar;
                this.u_name=list.u_name;
                this.u_phone=list.u_phone;

            })
       }
    },
    created(){
        this.loadInfo();
    }
}
</script>
<style scoped>
.van-nav-bar {
    position: fixed;
    height: 55px;
    top: 0;
    width: 100%;
    line-height: 55px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
  .Allinfo{
      position: relative;
      width: 100%;
      top:80px;
  }
  ul>li{
      border-bottom: 1px solid #ddd;
      padding: 10px;
      padding-left:20px;

  }
  .liimg{
      height: 70px;
  }
  .rightimg{
      width:50px;
      height:50px;
      border-radius: 50%;
      float: right;
      margin-top:-15px;
  }
  .right{
      float: right;
  }
</style>