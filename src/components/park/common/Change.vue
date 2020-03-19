<template>
    <div>
        <van-nav-bar
    title="切换账号"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
            <div class="qiehuan">
                <p class="text">轻触头像以切换账号</p>
                <div class="hasImg" align="center" style="padding-bottom:220px">
                    <ul class="ulImg">
                        <li @click="changeUser()"><a class="yImg">
                            <img class="tx" src="../../../assets/tx.png" v-show="showtx" >
                            <img class="tx" :src="'http://47.94.217.89:8080'+avatar" v-show="!showtx">
                        </a>
                        <p v-model="u_name">{{u_name}}</p>
                        <div class="imgands" v-show="showtuchu">
                            <img src="../../../assets/hs.png" style="height:8px;
                          margin-top:5px; margin-right:5px;">
                        <p class="text_p2">正在退出...</p>
                        </div>      
                        <div class="imgands" v-show="!showtuchu">
                            <img src="../../../assets/ls.png" style="height:8px;
                          margin-top:5px; margin-right:5px;">
                        <p class="text_p1">当前使用</p>
                        </div>           
                        </li>
                        <li @click="changeUser"><a class="gImg"><img src="../../../assets/qh.png" ></a>
                        <p class="text_p"> 切换账号 </p> 
                        </li>
                    </ul>
                    
                
                </div>
                  
                
            </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            showtuchu:false,
            u_name:"",
            avatar:"",
            showtx:true
        }
    },
    methods:{
        cancel(){
            this.$router.push("/Set");
        },
        changeUser(){
             this.$messagebox.confirm("是否确定切换账号。")
            .then(action=>{
                this.showtuchu=true;
                setTimeout(()=>{
                    // console.log(111);
                    this.$router.push("/Login4");
                },2000)
                
            })
            .catch(err=>{
                console.log("no");
            })
        },
         touxiang(){
             var url="users/findByUid"
            this.axios.get(url).then(res=>{
                console.log(res);
                var avatar=res.data.data.avatar;
                this.avatar=avatar;
                if(avatar==null||avatar==""){
                    this.showtx=true;
                }else{
                    this.showtx=false;
                }
            })
        }
    },
    created(){
        this.touxiang();
        var u_name=localStorage.getItem("u_name");
        this.u_name=u_name;
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
.qiehuan{
    position: relative;
    top:155px;
}
.text{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}
.hasImg{
    margin-top: 100px;
}
.ulImg{
    list-style: none;
    display: flex;
    justify-content:center;
    padding: 0;
}
.imgands{
    display: flex;
    justify-content: center;
    padding:5px;
}
.tx{
    border-radius: 50%;
    width:64px;
    height:64px;

}
.yImg{
 padding: 8px;
}
.gImg{
  padding:20px;
}
.text_p{
    text-align: center;
    margin-top:5px;
    margin-left:20px;
}
.text_p1{
    text-align: center;
}
.text_p2{
    text-align: center;
}

</style>