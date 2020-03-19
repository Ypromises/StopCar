<template>
    <div>
    <van-nav-bar
    title="我的车辆"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div v-show="car_id">
        
           <div class="divImg" align="center">
            <img src="../../../assets/no.png" alt="">
        </div>
        <div class="ptxt">
            暂无车牌，去添加吧！
        </div>
       <div align="center" class="btndiv">
           <button @click="addCar" class="btntianjia">添加车牌+</button>
       </div>
    
        </div>
         
    <div v-show="!car_id" class="showchepai">
        <div v-if="Userlist.u_car_num!=null">
             <div class="carhaoma">
            <div align="center" class="carId">
               {{Userlist.u_car_num}}
            </div>
            <div class="moren1">
            <div style="color:red">已为默认车牌号</div> 
        </div>
         
       </div>
        </div>
        <div style="color:red;" align="center" v-show="showmoren">还没有默认车牌</div>
        
    <div>
        <div class="carhaoma" v-for="(carnum,i) of carlist" :key="i">
            <div align="center" class="carId">
                {{carnum.u_car_num}}
            </div>
            <div class="moren">
           <button class="shiyong" @click="choose"
           :data-c_id="carnum.c_id">使用</button>   
           <button class="shanchu" @click="delecar" :data-c_id="carnum.c_id">删除</button> 
        </div>
       </div> 
       
    </div>
        <div align="center">
             <button @click="addCar" class="tianjia">添加车牌+</button>  
        </div>

    </div>
      
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return{
            car_id:true,
            Userlist:[],
            carlist:[],
            showmoren:false
        }
    },
    methods:{
        addCar(){
            this.$router.push('/addCar')
        },
         cancel(){
           
                this.$router.push("/")
                localStorage.setItem("changestate","geren")
           
       },
       Morecar(){
            var u_name=localStorage.getItem("u_name");
           this.u_name=u_name;
        if(u_name==""||u_name==null){
         this.$messagebox.confirm("您还没登录请先登录！").then(action=>{
         this.$router.push("/Login4")
       })
      }else{
           var url="users/findByUid";
           this.axios.get(url).then(res=>{
              // console.log(res);
               var state=res.data.state;
               if(state!=2000){
                   this.$messagebox("对不起，请先登录").ten(res=>{
                       this.$router.push("/Login4");
                   })
               }else{
                   var Userlist=res.data.data;
                 //  console.log(Userlist.u_car_num);
                   if(Userlist.u_car_num==null){
                       this.showmoren=true;
                   }
                       this.Userlist=Userlist;                                          
                   }
           });
          var url="cars/findByUid";
           this.axios.get(url).then(res=>{
            //    console.log(res);
               var state=res.data.state;
               if(state!=2000){
                   this.$messagebox("对不起，请先登录").ten(res=>{
                       this.$router.push("/Login4");
                   })
               }else{
                   var carlist=res.data.data;
                  // console.log(carlist);
                   if(carlist!=""){
                       this.car_id=false;
                   }
                   this.carlist=carlist;            
               }
           });
      }
          
    
       },
  
   
       choose(e){
           var c_id=e.target.dataset.c_id;
         //  console.log(c_id);
           var url="users/setC_id";
           var obj={c_id:c_id}
           this.axios.get(url,{params:obj}).then(res=>{
            //   console.log(res);
               var state=res.data.state;
           //    console.log(state);
               if(state!=2000){
                   this.$toast("无法使用！")
               }else{
                   this.$messagebox.confirm("确定使用此车牌号码")
                   .then(action=>{
                   var name=this.$route.query.name;
                   this.name=name;
                   //console.log(name)
                   var price=this.$route.query.price;
                   this.price=price;
                   var lotId=this.$route.query.lotId;
                   this.lotId=lotId;
                   var location=this.$route.query.location;
                   this.location=location;
                   var lotPhone=this.$route.query.lotPhone;
                   this.lotPhone=lotPhone;
                  // console.log(price)
                  if(name==null){
                      this.$messagebox("已设为默认车牌！")
                       .then(action=>{
                           this.reload();
                    //       localStorage.setItem("changestate","shouye")
                    //       this.$router.push("/")
                      })
                  }else{
                    this.$router.push(
              {
                path:"/Order",
                 query: {lotId,name,location,price,lotPhone}
               });
                this.Morecar();  
                  }
                
            })
            .catch(err=>{
                console.log("no");
            })
               }
           });
       },
       delecar(e){
           var c_id=e.target.dataset.c_id;
         //  console.log(c_id);
           var url="cars/delete";
           var obj={c_id:c_id};
           this.axios.get(url,{params:obj}).then(res=>{
             //  console.log(res);
               var state=res.data.state;
             //  console.log(state);
               if(state!=2000){
                   this.$toast("删除失败！");
               }else{
                   this.$toast("删除成功！");
                   this.Morecar();
               }
           })
    //    console.log("删除");
       }
    },
    created(){
         this.Morecar();
         var name=this.$route.query.name;
         this.name=name;
         var price=this.$route.query.price;
         this.price=price;
         var lotId=this.$route.query.lotId;
         this.lotId=lotId;
         var location=this.$route.query.location;
         this.location=location;
         var lotPhone=this.$route.query.lotPhone;
         this.lotPhone=lotPhone;
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

.divImg{
    position: relative;
    top:170px;

}
.ptxt{
   position: relative;
   top:170px;
    margin-top:20px;
    text-align: center;
    font-size: 18px;
    color:rgb(28, 57, 221);

}
.btndiv{
    position: relative;
    top:170px;
   margin-top:20px;
}
.btntianjia{
    width:200px;
    height:40px;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    outline: 0;
    border:0;
    background: rgb(126,206,244);
}
.tianjia{
    margin-top:20px;
     width:200px;
    height:40px;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    outline: 0;
    border:0;
    background: rgb(126,206,244);
}
.showchepai{
    /* margin-top:20px; */
    position: relative;
    top:70px;
}
.carhaoma{
    position: relative;
    display: flex;
    vertical-align: middle;
    background: rgb(234, 240, 243);
    border-radius: 5px;
    font-size:16px;
    width: 300px;
    height: 60px;
    margin: 0 auto;
    margin-bottom: 10px;
}
.carId{
    position: relative;
    width:120px;
    height: 25px;
    top:20px;
    left: 20px;
}
.moren1{
    position: relative;
    top:20px;
    right:-40px;
}
.moren{
    position: relative;
    float: right;
    left: 100px;
}
.shanchu{
    position: relative; 
    top: 30px;
    left:-58px;
    height: 25px;
    width: 60px;
    background: rgb(126,206,244);
    outline: 0;
    border: 0;
    border-radius: 5px;
}
.shiyong{
    position: relative; 
    top: 3px;
    left: 5px;
    height: 25px;
    width: 60px;
    background: rgb(126,206,244);
    outline: 0;
    border: 0;
    border-radius: 5px;
}
.shiyong1{
    width:40px;
    height: 30px;
    background: rgb(126,206,244);
    outline: 0;
    border:0;
    margin-left:85px
}


</style>
