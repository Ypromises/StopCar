<template>
    <div>
        <van-nav-bar
    title="修改手机号"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div class="xia">
        <div class="txtp" align="center">
            <p>更改手机号后，手机号就会变为当前修改的号码</p>
            <p>当前手机号：{{phone}}</p>
        </div>
      <div class="updateAll" align="center">
            <input :placeholder="phonePlaceholder" class="Phone" v-model="u_phone"></input>
    </div>
    <div style="padding-bottom:380px" align=center>
        <button class="sureupdate" @click="sure">完成</button>
    </div>
      
    </div>
    
    </div>
</template>
<script>
export default {
    data(){
        return{
            u_phone:"",
            phonePlaceholder:"手机号",
            phone:""
        }
    },
    methods:{
          cancel(){
           this.$messagebox.confirm("确定退出更改手机号？").then(action=>{
               this.$router.push("/Update")
           })
                
           
       },
       sure(){
           var phone=this.u_phone;
           var phoreg=/^1[3-9][0-9]{9}$/;
           if(!phoreg.test(phone)){
                this.$toast("手机号码格式不正确！");
                return;
            }else{
            //发送请求
            var url="users/change_info";
            var obj={u_phone:phone};
            this.axios.get(url,{params:obj}).then(res=>{
                 console.log(res);
                 var state=res.data.state;
                 if(state!=2000){
                     this.$toast("手机号修改失败！")
                 }else{
                     this.$toast("修改成功！");
                     this.$router.push({path:"/Update"});
                     this.loadp();
                 }
             })
            }
       },
       loadp(){
           var url="users/findByUid"
            this.axios.get(url).then(res=>{
                // console.log(res);
                var phone=res.data.data.u_phone;
                this.phone=phone;
                // console.log(phone);
            })
       }
    },
    created(){
        this.loadp();
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
  .xia{
      position: relative;
      top:60px;
  }
  .txtp{
      color:#999;
      font-size: 14px;
  }
  .txtp>p{
      margin: 0;
  }
.updateAll{
    position: relative;
    top:10px;
}
.Username{
    width:300px;
    height: 40px;
    border: 1.5px solid rgb(126,206,244);
    margin: 0 auto;
    padding-left: 10px;
    outline: 0;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 20px;
}
.Phone{
    width:300px;
    height: 40px;
    border: 1.5px solid rgb(126,206,244);
    margin: 0 auto;
    padding-left: 10px;
    outline: 0;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 20px;
}
.sureupdate{
    color: #fff;
    background: rgb(126,206,244);
    width:300px;
    height: 40px;
    outline: 0;
    border: 0;
    font-size: 18px;
    text-align: center;
    font-size:18px;
    border-radius: 5px;
   
}

</style>