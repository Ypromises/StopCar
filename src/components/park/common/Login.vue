<template>
<div>
    <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div class="Inputdiv" align="center">
    <input :placeholder="unameholder" v-model="u_name" class="User" type="text"></input>
    <input :placeholder="upwdholder" v-model="u_pw" type="password" class="Pwd"></input>
    <div align="center">
        <button class="denglu" @click="Nearbay">登录</button>
        </div> 
    
</div>
<div class="sanfdiv">
    <p>第三方账号登录</p>
    <img src="../../../assets/微信.png" alt="">
</div>
<div class="regandpwd">
    <p @click="reg">注册账号|</p>
    <p >忘记密码</p>
</div>
</div>

    
</template>
<script>
export default{
    data(){
        return{
           u_name:"",
           u_pw:"",
           unameholder:"用户名",
           upwdholder:"密码：",
//             note: {
//        backgroundImage: "url(" + require("../../../assets/bgmap.png") + ")",
//        backgroundRepeat: "no-repeat",
//        backgroundSize: "100% 100%",
//    },

        }

    },
    methods:{
        Nearbay(){
            //功能：完成用户登录
            // 1.获取用户输入名
            var u=this.u_name;
            // 2.获取用户输入密码
            var p=this.u_pw;
            // 3.创建正则表达式验证用户名和密码
            var ureg=/^[\w\u4e00-\u9fa5]{2,12}$/i;
            var preg=/^\w{6,12}$/;
            // 4.用户验证失败发送短消息
            if(!ureg.test(u)){
                this.$toast("用户名格式不正确！");
                return;
            }else if(!preg.test(p)){
                // 5.密码验证失败，提示短消息
                this.$toast("密码格式不正确！");
                return;
            }else{
                 
            //    this.$toast('登录成功！');
            
            //6. 发送ajax请求axios?
            var url="users/login";
            var obj={u_name:u,u_pw:p};
             this.axios.get(url,{params:obj}).then(res=>{
                // console.log(res);
                 var state=res.data.state;
                 if(state===4001){
                     this.$toast("用户名不存在！")
                 }else if(state===4002){
                     this.$toast("密码错误！");
                 }else{
                      this.$toast('登录成功！');
                    var uname=res.data.data.u_name;
                    localStorage.setItem("u_name",uname);
                    var upwd=res.data.data.u_pw;
                    localStorage.setItem("u_pw",upwd)
                   //  console.log(uname);
                   //  console.log(upwd);
                      this.$store.commit('getUser',uname);
                      this.$store.commit('getUpwd',upwd);
                      this.$store.dispatch("userLogin",true);
                      localStorage.setItem("Flag","isLogin")
                      localStorage.setItem("changestate","geren");
                      this.$router.replace({path:"/"});
                 }
             })
            }
            },
        reg(){
            this.$router.push('/Reg')
        },
        
        cancel(){   
            this.$router.push("/")
            localStorage.setItem("changestate","geren")
       }
    },
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
.Inputdiv{
    position: relative;
    top:100px;
}
.User{
    width:250px;
    height: 40px;
    border: 1.5px solid rgb(126,206,244);
    margin: 0 auto;
    padding-left: 40px;
    outline: 0;
    align-items: center;
    margin-bottom: 20px;
    background-image: url(../../../assets/zh.png);
    background-repeat: no-repeat;
    background-position: 0% 50%;
    border-radius: 20px;
}
.Pwd{
    width:250px;
    height: 40px;
    border: 1.5px solid rgb(126,206,244);
    margin: 0 auto;
    padding-left: 40px;
    outline: 0;
    align-items: center;
    margin-bottom: 25px;
    background-image: url(../../../assets/pwd.png);
    background-repeat: no-repeat;
    background-position: 0% 50%;
     border-radius: 20px;
}
.denglu{
    color: #fff;
    background: rgb(126,206,244);
    width:250px;
    height: 40px;
    text-align: center;
    text-decoration: none;
    /* margin-left: 63px; */
    font-size: 18px;
    padding: 0;
    outline: 0;
    border: 0;
    border-radius: 20px;
}
.sanfdiv{
    margin-top:130px;
    color: rgb(126,206,244);
    text-align: center;
    font-size:18px;
}
img{
    padding: 5px;
}
.regandpwd{
    display: flex;
    justify-content: center;
    color:rgb(126,206,244);
    margin-top:145px;
    padding-bottom: 70px;
    font-size:18px;

}


</style>