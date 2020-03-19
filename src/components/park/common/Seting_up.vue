<template>
    <div id="Div3">
        <van-nav-bar
    title="设置"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
        <div class="Listdiv">
            <ul>
                <li @click="update"><a>账号与安全
                    <img src="../../../assets/right.png" class="right"></a></li>
                <li><a>隐私
                    <img src="../../../assets/right.png" class="right"></a></li>
                    
                <li><a>用户指南
                    <img src="../../../assets/right.png" class="right"></a></li>
                <li @click="min"><a>关于我们
                    <img src="../../../assets/right.png" class="right">
                    </a></li>
            </ul>
        </div>
        <div v-if="u_name!=''&&u_name!=null">
          <div class="qandt">
          <mt-button @click="change" size="large" class="qh">切换账号</mt-button>
        <div class="page-actionsheet-wrapper">
      <button class="mint-button mint-button--default mint-button--large" @click="actionSheet">
        <label class="mint-button-text">退出</label>
      </button>  
        </div>
</div>
<mt-actionsheet
  :actions="data"
  v-model="sheetVisible">退出账号
</mt-actionsheet>   
        </div>
       

    </div>
</template>
<script>
export default {
    data(){
        return{
        data:[{
            name:"退出账号",
            method:this.exit
        }],
        sheetVisible:false,
        u_name:""
        }
    },
    methods:{
        actionSheet(){
            this.sheetVisible=true;
        },
        exit(){
            this.$messagebox.confirm("退出后不会删除任何历史数据，下次登录依然可以使用本账号。")
            .then(action=>{
                this.$store.commit("LOGOUT");
                this.$router.push("/");
            })
            .catch(err=>{
                console.log("no");
            })
        },
        update(){
                this.$router.push("/Update")
            
        },
        change(){
            this.$router.push("/Change")
        },
        min(){
            this.$router.push("/Min")
        },
        cancel(){   
            this.$router.push("/")
            localStorage.setItem("changestate","geren")
       },
       load(){
           var u_name=localStorage.getItem("u_name");
           this.u_name=u_name;
          // console.log(u_name);

       }
    },
    created(){
        this.load();
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
.Listdiv{
    position: relative;
    top:55px;
    /* height: 300px; */
}
div.Listdiv>ul{
    list-style: none;
    padding: 0px;
    margin: 0px;
}
div.Listdiv>ul>li{
    border-bottom: 1px solid #ddd;
    padding:10px;
    padding-left: 20px;
    
}
div.Listdiv>ul>li:active{
    background: rgb(126,206,244);
}
div.Listdiv>ul>li>a{
    font-size: 16px;
}
.right{
    float: right;
   padding: 2px;
   width:16px;
   height:16px;
   margin-top:5px;
}
.page-actionsheet-wrapper{
    margin-top:10px;
 
}
.mint-button-text{
    color: #f45;
}

.qh{
    color:#f45;
}
.qandt{
    position: fixed;
    width:100%;
    bottom:0;
}
</style>