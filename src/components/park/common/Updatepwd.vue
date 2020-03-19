<template>
    <div>
        <van-nav-bar
    title="修改密码"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
  <div class="txt" align="center">请设置账号密码，你可以用账户名+密码登录，更快捷！</div>
    <div class="pwdAll" align="center">
        <input :placeholder="opwdPlaceholder" class="Pwd" v-model="u_opw"></input>
               <input :placeholder="npwdPlaceholder" class="Pwd" v-model="u_npw" type="password"></input>
    </div>
    <div class="ok" align=center style="padding-bottom:380px">
        <button class="surepwd" @click="sure_pwd">完成</button>
    </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
           u_npw:"",
            u_opw:"",
            opwdPlaceholder:"原始密码：由6~12数字、字母组合",
            npwdPlaceholder:"修改密码：",

        }
    },
     methods:{
          cancel(){
           
                this.$router.push("/Update")
           
       },
       sure_pwd(){
           var p=this.u_opw;
           var np=this.u_npw;
           var preg=/^\w{6,12}$/;
           var npreg=/^\w{6,12}$/;
           if(!preg.test(p)){
                this.$toast("密码格式不正确！");
                return;
            }else if(!npreg.test(np)){
                this.$toast("修改后的密码格式不正确！");
                return;
            }else{
            //发送请求
            var url="users/change_password";
            var obj={u_opw:p,u_npw:np};
            this.axios.get(url,{params:obj}).then(res=>{
                 console.log(res);
                 var state=res.data.state;
                 if(state!=2000){
                     this.$toast("密码修改失败！")
                 }else{
                      this.$toast("密码修改成功");
                     this.$router.push({path:"/Login4"});
                 }
             })
            }
       }
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
  .txt{
      position: relative;
      top:60px;
      font-size:14px;
      color:#999;
  }
.pwdAll{
    position: relative;
    top:70px;
    
}
.Pwd{
    width:300px;
    height: 40px;
    border: 1.5px solid rgb(126,206,244);
    margin: 0 auto;
    padding-left: 10px;
    outline: 0;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 5px;
}
.ok{
    position:relative;
    top:70px;
}
.surepwd{
    color: #fff;
    background: rgb(126,206,244);
    width:300px;
    height: 40px;
    text-align: center;
    border-radius: 5px;
    outline: 0;
    border:0;
    font-size: 18px;
}

</style>