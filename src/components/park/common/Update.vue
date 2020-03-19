<template>
    <div>
         <van-nav-bar
    title="账号安全"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div class="phone">
        <ul>
            <li @click="Update_Info">手机号
                <img src="../../../assets/right.png" class="right">
            </li>
            <li @click="Update_pw">密码
                <img src="../../../assets/right.png" class="right">
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
     methods:{
        cancel(){ 
        this.$router.push("/Set");  
       },
    Update_Info(){
            var u_name=localStorage.getItem("u_name");
            if(u_name==""||u_name==null){
                this.$messagebox.confirm("对不起，您已掉线，请重新登录！")
                .then(action=>{
                    this.$router.push("/Login4");
                })
            }else{
                this.$router.push("/Update_phone")
            }   
        },
        Update_pw(){
            var u_name=localStorage.getItem("u_name");
            if(u_name==""||u_name==null){
                this.$messagebox.confirm("对不起，您已掉线，请重新登录！")
                .then(action=>{
                    this.$router.push("/Login4");
                })
            }else{
                this.$router.push("/updatepwd")
            }
        },
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
ul{
    list-style: none;
    font-size:16px;
    padding:0px;
}
ul>li{
    border-bottom: 1px solid #ddd;
     padding: 10px;
    padding-left:20px;
   
}
.phone{
    position: relative;
    top:55px;
}
.right{
    float: right;
   padding: 2px;
   width: 16px;
   height: 16px;
   margin-top:5px;
}
</style>