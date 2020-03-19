<template>
    <div id="Div1">
        <pheader Title="个人中心"></pheader>
        <div class="note" :style ="note">
            <!-- <div class="logo" > -->
        <!-- <div class="modify_body" v-if="u_name!=''&&u_name!=null"> -->
           <div class="update"  v-if="u_name!=''&&u_name!=null">
            <div class="load">
                       <input type="file"  name="avatar" id="avatar" @change="load($event)" accept="image/gif,image/jpg,image/jpeg,image/png" class="load_btn" ref="box" multiple="multiple" />
            </div>
            <label class="modify_pic" for="avatar">
                <img id="loadImg" src="../../../assets/touxiang1.png" alt="" v-show="picture">
               <img id="loadImg" :src="'http://47.94.217.89:8080'+avatar"  ref="pic" alt="" v-show="!picture">
           </label>
           
           </div>
           
       <!-- </div> -->
      <!-- </div> -->
        <!-- npm i vuex -S -->
        <div class="All" v-if="u_name==''||u_name==null">
             <div class="tx" v-if="u_name==''||u_name==null">
            <img src="../../../assets/touxiang.png" >
        </div>
        <!-- <div v-if="u_name==''||u_name==null"> -->
          <div class="btndiv" align="center" v-if="u_name==''||u_name==null">
            <span class="denglu" @click="login">登录|</span>
            <span class="zhuce" @click="reg">注册</span>
        </div>  
        </div>
       
        <!-- </div> -->
        <div class="btntxt" align="center" v-if="u_name!=''&&u_name!=null" @click="Info()">
             <span class="nic" v-model="u_name">{{u_name}}</span> 
        </div>
        </div>
        <div class="Imgdiv">
            <div class="bgkong">
        <ul class="list">
            <li @click="history">
                <a>
                    <img src="../../../assets/mytem.png" style="width:25px;height:25px">
                    <span class="text">订单</span> 
                    <img src="../../../assets/right.png" class="right">
                </a>
                </li>
            <li @click="myCar">
                <a>
                    <img src="../../../assets/mycar.png" style="width:25px;height:25px">
                    <span class="text">我的车辆</span>
                    <img src="../../../assets/right.png" class="right">
                    </a>
                    </li>
                    <li @click="youhui">
                <a href="#">
                    <img src="../../../assets/mypage.png" style="width:25px;height:25px">
                    <span class="text">优惠券</span>
                    <img src="../../../assets/right.png" class="right">
                    </a>
                    </li>
                <li @click="help">
                <a>
                    <img src="../../../assets/help.png" style="width:25px;height:25px">
                    <span class="text">客服服务</span>
                    <img src="../../../assets/right.png" class="right">
                     </a>
                    </li>
            <li @click="seting">
                <a>
                    <img src="../../../assets/sz.png" style="width:25px;height:25px">
                    <span class="text">设置</span>
                    <img src="../../../assets/right.png" class="right">
                     </a>
                    </li>
                <li @click="doing" style="border:none">
                <a>
                    <img src="../../../assets/doing.png" style="width:25px;height:25px">
                    <span class="text">小编正在开发</span>
                    <img src="../../../assets/right.png" class="right">
                     </a>
                    </li>
        </ul>
        </div>
        </div>
    </div>
</template>
<script>
import Pheader from "./Pheader.vue"
// import Pictureupload from "./Picture_upload.vue"
export default {
    data(){
        return{
            u_name:"",
            avatar:"",
            picture:true,
            note: {
                backgroundImage: "url(" + require("../../../assets/bg.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                  },
                //   showAll:true

        }
    },
    methods:{
        Info(){
            this.$router.push("/Info")
        },
       load(e){
          this.file=e.target.files[0];
          // let obj=this.$refs.box;
          // let file=obj.files[0];
          let loadImg=document.getElementById("loadImg");
          let reader=new FileReader();
          var that=this
          reader.readAsDataURL(this.file)  
         reader.onload=function(e){
            loadImg.src=this.result;
         }
         console.log(loadImg.src);
         if(document.getElementById("avatar").value.length==""){
              this.$toast('请上传图片');
         }else{
             this.$messagebox.confirm("是否上传").then(action=>{
                 this.submit(event);
             })
         }
        },
        submit(event){
         event.preventDefault();
         let loadImg=document.getElementById("loadImg");
        //  console.log(loadImg);
          let avatar=new FormData();
         avatar.append("uid",sessionStorage.uid)
          avatar.append("file",this.file);
          var url="users/change_avatar";
        //   var obj={avatar:loadImg}
          this.axios.post(url,avatar,{emulateJSON:false}).then(res=>{
            // console.log(res);
            var state=res.data.state
            // var avatar=res.data.data;
            // console.log(state)
          if(state==2000){
              this.$toast("上传成功");
              }else{
                  this.$toast("上传失败");
              }
          

        })
        },
        MoreImg(){
            var url="users/findByUid"
            this.axios.get(url).then(res=>{
                // console.log(res);
                var avatar=res.data.data.avatar;
                this.avatar=avatar;
                if(avatar==null){
                     this.picture=true;
                }else{
                    this.picture=false;
                }
               
                // console.log(avatar)
            })
        },
        login(){
            this.$router.push("/Login4");
            
        },
        reg(){
            this.$router.push("/Reg")
        },
        myCar(){
            this.$router.push("/myCar");
        },
        help(){
            this.$router.push("/Help")
        },
        history(){
            this.$router.push("/History")
        },
        youhui(){
            this.$messagebox("亲，还没有优惠券哟！")
        },
        doing(){
            this.$messagebox("我们正在努力完善!!!")
        },
        seting(){
            this.$router.push("/Set")
        },
        loadmore(){
            var u_name=localStorage.getItem("u_name");
            this.u_name=u_name;
            //console.log(u_name);
            if(u_name==""||u_name==null){
                //  this.showAll=true;
                this.$messagebox.confirm("对不起，您已掉线，请重新登录！").then(action=>{
                this.$router.push("/Login4");
                });
               

        }
        //else{
        //     this.showAll=false;
        // }
        }
       
    },
    components:{
        "pheader":Pheader,
        
    },
//      mounted: function() {
//     this.$nextTick(function() {
//       this.great();
//     });
     
//   },
  created(){
      this.loadmore();
    //   this.submit();
    setInterval(() => {
        this.MoreImg();
    }, 1000);
    
  },
  
  
  
}
</script>
<style scoped>
.note{
    display: flex;
    position: relative;
    top:55px;
    height:180px;

}
.Imgdiv{
    position: relative;
    width: 100%;
    top: 55px;
    height:450px;
    display: flex;
    align-items:center;
    justify-content: center;
    background: #f8f9fa;
}
.modify_pic{
    position: relative;
    left: -75px;
}
.load{
     width:75px;
     height: 75px;
     border-radius: 50%;
     display: none;
     
}
#avatar{
    /* position: relative;
    top:10px; */
    width:1px;
    height:1px;
    border-radius: 50%;
    margin-top:10px;
    background: transparent;
}

#loadImg{
     width:75px;
     height:75px;
     /* margin-top:20px; */
     border-radius: 50%;
}


.update{
    display:flex;
    justify-content: center;
    align-items:center;
    position: relative;
    left:75px;
    width: 100%;
    height: 140px;
    border-radius: 50%  50%;
    
}

.tx{
    /* margin: 10% 43%; */
    display: flex;
    justify-content: center;
    width:100%;
    align-items: center;
} 
@media (min-width: 411px) and ( max-width: 413px) {
     /* .tx{
         margin: 10% 43% !important;
     }
     .btndiv{
         left: 174px !important;
     }
     .update{
        left:169px !important;
    } */
  }
@media (min-width:411px) and (max-height:825px){
    .Imgdiv{
        height:540px !important;
    }
    .bgkong{
        top:-60px !important;
    }
}

@media (min-width:360px) and (max-height:641px){
    .Imgdiv{
        height:350px !important;
    }
    .bgkong{
        top:-15px !important;
    }
    ul.list>li{
        padding:10px !important;
    }
}
@media (min-width:320px) and (max-height:570px){
    .Imgdiv{
        height:350px !important;
    }
    .bgkong{
        top:-15px !important;
    }
    ul.list>li{
        padding:10px !important;
    }
}
@media (min-width:375px) and (max-height:668px){
    .Imgdiv{
        height:400px !important;
    }
    .bgkong{
        top:-35px !important;
    }
    ul.list>li{
        padding:10px !important;
    }
}
@media (min-width:414px) and (max-height:740px){
    .Imgdiv{
        height:450px !important;
    }
    .bgkong{
        top:-35px !important;
    }
}
@media (min-width:450px) and (max-height:737px){
  /* #loadImag{
      margin-left: 20px !important;
  } */
}
@media (min-width:375px) and (max-height:815px){
    .Imgdiv{
        height:525px !important;
    }
    .bgkong{
        top:-65px !important;
    }
}
@media (min-width: 361px) and (max-height: 755px) {
    .Imgdiv{
        height:450px !important;
    }
    .bgkong{
        top:-35px !important;
    }
}
@media (min-width:768px) and (max-height:1025px){
    .Imgdiv{
        height:740px !important;
    }
    .bgkong{
        top:-165px !important;
    }
}
@media (min-width:1024px) and (max-height:1370px){
    .Imgdiv{
        height:1080px !important;
    }
    .bgkong{
        top:-325px !important;
    }
}
@media screen and (max-width:410px) {
      /* .update{
    left:150px !important;
    
} */
  }
  @media screen and (max-width:320px) {
      /* .update{
    left:125px !important;
    
} */
/* .btndiv{
    left:135px !important;
    top:120px !important;
} */
  }
  @media (min-width:320px) and (max-width:374px) {
      /* .update{
    left:124px !important;
    
} */
  }
  @media (max-width:410px) and (min-width:375px) {
      /* .update{
    left:152px !important;
    
} */
 @media screen and (max-width:375px) {
       /* #loadImg{
    margin-left:0px !important; 
     } */
    
}
/* .btndiv{
    left:158px !important;
} */
 /* #loadImg{
    margin-left:0px !important; 
     } */
  }
  @media screen and (min-width: 414px) {
     /* label.text{
         left: 29px !important;
     }
     .btndiv{
         left: 176px !important;
     }
     .update{
    left:172px !important;
    
} */
  }
  @media screen and (min-width: 768px) {
     /* .btndiv{
         top: 142px !important;
         left: 325px !important;
     }
     .update{
    left:349px !important; 
     } */
}
@media (min-width: 360px) and (max-height: 640px) {
    /* .update{
    left:145px !important; 
     }
      #loadImg{
    margin-left:0px !important; 
     } */
  }
@media (min-width: 1024px) and (min-height: 1366px) {
    /* .update{
    left:477px !important; 
     } */
  }

  @media (min-width: 361px) and (max-height: 734px) {
    /* #loadImg{
    margin-left:20px !important; 
     } */
     /* .btn_d1{
         top:-12px;
     } */
  }
  @media (min-width: 361px) and (max-width:374px) {
    /* #loadImg{
    margin-left:26px !important; 
     }
     */
  }
   @media (min-width: 361px) and (max-width: 374px) {
   
     /* .btn_d1{
         top:-12px;
     } */
  }
  @media screen and (max-width: 361px) {
      /* #loadImg{
    margin-left:0px !important; 
     } */
      
  }
    @media (min-width: 411px) and (max-height: 736px) {
    /* #loadImg{
    margin-left:0px !important; 
     } */
  }
.nic{
    color: #000;
    text-align: center;
    font-size:16px;
}
.All{
    width:100%;
    margin-top:30px;
}
.btndiv{
   margin-top:20px;
    /* width:100%; */
    font-size:16px;
}
.denglu{
    background: transparent;
    border: 0;
}
.btntxt{
    position: absolute;
    top:120px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}
ul.list{
     position: relative; 
    list-style: none;
    padding: 0; 
    margin: 0;
}
ul.list>li>a{
    text-decoration: none;
    color: #000;
    position: relative;
    left:0px;
    
} 
.bgkong{
    position: relative;
    top:-55px;
    width:95%;
    border:1px solid #ddd;
    border-radius:10px;
    background: #fff;
}
ul.list>li{
    border-bottom: 1px solid #ddd;
    padding:15px 10px;
    padding-left:25px;
}
ul.list>li:active{
    background: rgb(126,206,244);
}
.right{
    float: right;
   padding: 2px;
   margin-top:5px;
   width:16px;
   height:16px;
}
span.text{
    position: relative;
    top:3px;
    left:10px;
    font-size: 16px;

}
</style>


