<template>
    <div>
         <van-nav-bar
    title="版本信息"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div>
        <div class="logodiv" align="center">
            <img src="../../../assets/logo.png" class="imglogo">
        <div style="margin-top:10px;font-size:16px;">
            v 3.1.3.007
        </div>
        </div>
        <ul class="uldiv">
            <li class="firli">
                版本更新
             <span class="right">已是最新版本</span>
            </li>
            <li>
                官网
            </li>
            <li>
                反馈
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
            this.$router.push("/Set")
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
.logodiv{
    position: relative;
    top:130px;
    /* margin-top:100px; */
}
.imglogo{
    width: 100px;
    height:100px;
}
.uldiv{
    position: relative;
    top: 200px;
    list-style: none;
    margin-top:20px;
    padding:0;
}
ul.uldiv>li.firli{
    border-top:1px solid #ddd;
}
ul.uldiv>li{
    border-bottom:1px solid #ddd;
    font-size:16px;
    padding:10px;
    padding-left:20px;
}
.right{
    float: right;
    padding-right:20px;
    font-size:14px;
    color:#666;
}
</style>