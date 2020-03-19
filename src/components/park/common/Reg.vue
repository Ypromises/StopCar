<template>
    <div id="bgdiv">
        <van-nav-bar
    title="注册"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
        <div class="regdiv" align="center">
            <input :placeholder="userPlaceholder" class="Username" v-model="u_name"></input>
            <input :placeholder="phonePlaceholder" class="Phone" v-model="u_phone" ></input>
              <input :placeholder="pwdPlaceholder" class="Pwd" v-model="u_pw" type="password"></input>
               <input :placeholder="repwdPlaceholder" class="Pwd" v-model="reupwd" type="password"></input>
               <div class="yz" align="center">
                  <slide-verify :l="60"
            :r="10"
            :w="310"
            :h="200"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :slider-text="text" class="yz">
            </slide-verify>
            <div class="divmsg">{{msg}}</div>
               </div>
               <div align="center">
                  <button  class="zc" @click="Reg" v-bind:disabled="isDisabled">注册</button> 
               </div>
               
               <div class="labeldiv">
                 <input type="checkbox" v-bind:checked="isChecked" v-on:click="handleDisabled" id="agree">
                 <label for="agree">我已同意并阅读“服务条款”</label>
               </div>
        </div>
    </div>
    <!-- npm install --save vue-monoplasty-slide-verify -->
</template>

<script>
export default{
    data(){
        return{
            u_name:"",
            u_pw:"",
            reupwd:"",
            u_phone:"",
            userPlaceholder:"用户名",
            phonePlaceholder:"手机号",
            pwdPlaceholder:"密码：由6~12数字、字母组合",
            repwdPlaceholder:"再次确认密码：",
            // recode:"验证码：",
            isDisabled:true,
            isChecked:false,
            //sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
           msg: '',
            text: '向右滑',
        }
    },
    methods:{
        cancel(){
                this.$router.push("/")
           
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
        Reg(){
            var u=this.u_name;
            var pho=this.u_phone;
            var p=this.u_pw;
            var rp=this.reupwd;
            var ureg=/^[\w\u4e00-\u9fa5]{2,12}$/i;
            var phoreg=/^1[3-9][0-9]{9}$/
            var preg=/^\w{6,12}$/;
            if(!ureg.test(u)){
                this.$toast("用户名格式不正确！");
                return;
            }else if(!phoreg.test(pho)){
                this.$toast("手机号码格式不正确！");
                return;
            }else if(!preg.test(p)){
                this.$toast("密码格式不正确！");
                return;
            }else if(rp!=p){
                this.$toast("确认密码与上面输入的密码不一致！");
                return;
            }else{    
                // this.$toast('注册成功');
            
            // 发送ajax请求
             var url="users/reg";
            var obj={u_name:u,u_phone:pho,u_pw:p};
             this.axios.get(url,{params:obj}).then(res=>{
              //   console.log(res);
                 var state=res.data.state;
                 console.log(state);
                 if(state!=2000){
                     this.$toast("注册失败！用户名已存在！")
                 }else{
                     this.$toast('注册成功');
                     this.$router.push({path:"/Login4"});
                 }
             })
            }
        },
          onSuccess(){
            this.msg = 'success'
        },
        onFail(){
            this.msg = ''
        },
        onRefresh(){
            this.msg = ''
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
.regdiv{
    position: absolute;
    top:70px;
   
}
.Username,.Pwd,.Phone{
    width:300px;
    height: 40px;
    border:none;
    border-bottom: 1.5px solid rgb(126,206,244);
    margin: 0 auto;
    outline: 0;
    padding-left:10px;
    align-items: center;
    margin-bottom: 15px;
}


.divmsg{
    text-align: center;
    font-size: 18px;
    color: green;
}
.yz{
    font-family: "华文隶书" ;
    font-size:5px;
}
.zc{
    width:250px;
    height: 40px;
    /* margin-left:37px; */
    color: #fff;
    background: rgb(126,206,244);
    margin-top:20px;
    margin-bottom:20px;
    padding: 0;
    outline: 0;
    border: 0;
    border-radius: 5px;
    font-size:16px;
}
.labeldiv{
    text-align: center;
}

</style>